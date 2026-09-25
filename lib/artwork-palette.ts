type Rgb = [number, number, number];

const SAMPLE_SIZE = 24;
const PALETTE_SIZE = 3;
const MIN_COLOR_DISTANCE = 64;
const MIN_ALPHA = 128;

const paletteCache = new Map<string, Promise<string[]>>();

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load ${url}`));
    image.src = url;
  });
}

function rgbToHsl([red, green, blue]: Rgb): Rgb {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return [0, 0, lightness];
  }

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue: number;

  if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }

  return [(hue * 60 + 360) % 360, saturation, lightness];
}

function hslToRgb([hue, saturation, lightness]: Rgb): Rgb {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - chroma / 2;
  const [r, g, b] =
    hue < 60
      ? [chroma, x, 0]
      : hue < 120
        ? [x, chroma, 0]
        : hue < 180
          ? [0, chroma, x]
          : hue < 240
            ? [0, x, chroma]
            : hue < 300
              ? [x, 0, chroma]
              : [chroma, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function colorDistance(a: Rgb, b: Rgb) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function toHighlight(color: Rgb): Rgb {
  const [hue, saturation, lightness] = rgbToHsl(color);
  const isNeutral = saturation < 0.12;

  return hslToRgb([
    hue,
    isNeutral ? saturation : Math.max(saturation, 0.45),
    Math.min(Math.max(lightness, 0.5), 0.68),
  ]);
}

function pickPalette(pixels: Uint8ClampedArray): Rgb[] {
  const buckets = new Map<number, { count: number; sum: Rgb }>();

  for (let index = 0; index < pixels.length; index += 4) {
    if (pixels[index + 3] < MIN_ALPHA) {
      continue;
    }

    const red = pixels[index];
    const green = pixels[index + 1];
    const blue = pixels[index + 2];
    const key = ((red >> 5) << 6) | ((green >> 5) << 3) | (blue >> 5);
    const bucket = buckets.get(key) ?? { count: 0, sum: [0, 0, 0] };

    bucket.count += 1;
    bucket.sum[0] += red;
    bucket.sum[1] += green;
    bucket.sum[2] += blue;
    buckets.set(key, bucket);
  }

  const candidates = [...buckets.values()]
    .map(({ count, sum }) => {
      const color: Rgb = [sum[0] / count, sum[1] / count, sum[2] / count];
      const [, saturation, lightness] = rgbToHsl(color);
      const lightnessWeight = Math.max(1 - Math.abs(lightness - 0.5) * 1.6, 0.05);

      return { color, score: count * (0.25 + saturation) * lightnessWeight };
    })
    .sort((a, b) => b.score - a.score);

  const palette: Rgb[] = [];

  for (const { color } of candidates) {
    if (palette.every((picked) => colorDistance(picked, color) >= MIN_COLOR_DISTANCE)) {
      palette.push(color);
    }

    if (palette.length === PALETTE_SIZE) {
      break;
    }
  }

  const highlights = palette.map(toHighlight);

  if (highlights.length === 0) {
    return [];
  }

  const [hue, saturation, lightness] = rgbToHsl(highlights[0]);
  const shades = [lightness + 0.12, lightness - 0.12].map((shade) =>
    hslToRgb([hue, saturation, Math.min(Math.max(shade, 0.35), 0.8)]),
  );

  return [...highlights, ...shades].slice(0, PALETTE_SIZE);
}

async function extractPalette(url: string) {
  const image = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;

  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return [];
  }

  context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const { data } = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

  return pickPalette(data).map(([r, g, b]) => `${r} ${g} ${b}`);
}

export function getArtworkPalette(url: string) {
  const cached = paletteCache.get(url);

  if (cached) {
    return cached;
  }

  const palette = extractPalette(url).catch((error: unknown) => {
    paletteCache.delete(url);
    throw error;
  });

  paletteCache.set(url, palette);
  return palette;
}
