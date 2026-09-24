import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import path from "node:path";

const roots = ["public/photography", "public/about"];
const entries = [];

for (const root of roots) {
  const files = (await fs.readdir(root)).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file),
  );

  for (const file of files) {
    const buffer = await fs.readFile(path.join(root, file));
    const src = `/${root.replace(/^public\//, "")}/${file}`;
    const { base64, metadata } = await getPlaiceholder(buffer, { size: 10 });
    entries.push([
      src,
      {
        blurDataURL: base64,
        width: metadata.width,
        height: metadata.height,
      },
    ]);
  }
}

entries.sort(([a], [b]) => a.localeCompare(b));

const body = `export const IMAGE_PLACEHOLDERS = ${JSON.stringify(Object.fromEntries(entries), null, 2)} as const;\n\nexport type ImagePlaceholderSrc = keyof typeof IMAGE_PLACEHOLDERS;\n`;

await fs.writeFile("common/image-placeholders.ts", body);
console.log(`${entries.length} placeholders`);
