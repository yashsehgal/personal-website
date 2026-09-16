export type PhotoInput = {
  src: string;
  width: number;
  height: number;
};

export type PhotoRestRect = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const PHOTO_GAP = 6;
export const LG_BREAKPOINT = 1024;
export const MD_BREAKPOINT = 768;

export function photoAlt(src: string) {
  return `Photograph ${src.replace("/photos/", "").replace(".jpg", "")}`;
}

export function packPhotoRows<T>(photos: readonly T[]): T[][] {
  const rows: T[][] = [];
  let index = 0;

  while (index < photos.length) {
    const remaining = photos.length - index;

    if (remaining <= 5) {
      rows.push(photos.slice(index) as T[]);
      break;
    }

    const take = remaining - 5 >= 4 ? 5 : 4;
    rows.push(photos.slice(index, index + take) as T[]);
    index += take;
  }

  return rows;
}

export function layoutPhotoRects(
  photos: readonly PhotoInput[],
  containerWidth: number,
): { rects: PhotoRestRect[]; height: number } {
  if (containerWidth <= 0) {
    return { rects: [], height: 0 };
  }

  const rows = packPhotoRows(photos);
  const justified = containerWidth >= LG_BREAKPOINT;
  const columns = containerWidth >= MD_BREAKPOINT ? 3 : 2;
  const rects: PhotoRestRect[] = [];
  let y = 0;

  for (const row of rows) {
    if (justified) {
      const aspects = row.map((photo) => photo.width / photo.height);
      const sumAspect = aspects.reduce((sum, aspect) => sum + aspect, 0);
      const rowHeight =
        (containerWidth - PHOTO_GAP * (row.length - 1)) / sumAspect;
      let x = 0;

      row.forEach((photo, index) => {
        const width = rowHeight * aspects[index];
        rects.push({
          id: photo.src,
          src: photo.src,
          alt: photoAlt(photo.src),
          x,
          y,
          w: width,
          h: rowHeight,
        });
        x += width + PHOTO_GAP;
      });

      y += rowHeight + PHOTO_GAP;
      continue;
    }

    const cellWidth = (containerWidth - PHOTO_GAP * (columns - 1)) / columns;
    let column = 0;
    let lineY = y;
    let lineHeight = 0;

    for (const photo of row) {
      if (column === columns) {
        column = 0;
        lineY += lineHeight + PHOTO_GAP;
        lineHeight = 0;
      }

      const aspect = photo.width / photo.height;
      const height = cellWidth / aspect;
      rects.push({
        id: photo.src,
        src: photo.src,
        alt: photoAlt(photo.src),
        x: column * (cellWidth + PHOTO_GAP),
        y: lineY,
        w: cellWidth,
        h: height,
      });
      lineHeight = Math.max(lineHeight, height);
      column += 1;
    }

    y = lineY + lineHeight + PHOTO_GAP;
  }

  return { rects, height: Math.max(0, y - PHOTO_GAP) };
}
