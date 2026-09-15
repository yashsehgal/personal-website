import Image from "next/image";
import { PHOTOS } from "@/modules/photos-page/photos";

type Photo = (typeof PHOTOS)[number];

function packPhotoRows(photos: readonly Photo[]) {
  const rows: Photo[][] = [];
  let index = 0;

  while (index < photos.length) {
    const remaining = photos.length - index;

    if (remaining <= 5) {
      rows.push(photos.slice(index));
      break;
    }

    const take = remaining - 5 >= 4 ? 5 : 4;
    rows.push(photos.slice(index, index + take));
    index += take;
  }

  return rows;
}

export function PhotosGallerySection() {
  const rows = packPhotoRows(PHOTOS);

  return (
    <section aria-label="Photo gallery" className="flex flex-col gap-1.5">
      {rows.map((row) => (
        <div
          key={row.map((photo) => photo.src).join("-")}
          className="grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:flex"
        >
          {row.map((photo, index) => {
            const aspect = photo.width / photo.height;

            return (
              <figure
                key={photo.src}
                className="m-0 min-w-0"
                style={{ flex: `${aspect} 1 0%` }}
              >
                <Image
                  src={photo.src}
                  alt={`Photograph ${photo.src.replace("/photos/", "").replace(".jpg", "")}`}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 768px) 50vw, 20vw"
                  quality={80}
                  preload={index < 5 && row === rows[0]}
                  className="block h-auto w-full"
                />
              </figure>
            );
          })}
        </div>
      ))}
    </section>
  );
}
