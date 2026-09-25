import { MUSIC_TRACKS, type MusicTrack } from "@/common/music";

const LOOKUP_URL = "https://itunes.apple.com/lookup";
const REVALIDATE_SECONDS = 86400;
const ARTWORK_SIZE_PATTERN = /\/\d+x\d+bb\.(jpg|png)$/;

type AppleMusicLookupResult = {
  wrapperType: string;
  trackId?: number;
  artworkUrl100?: string;
  previewUrl?: string;
};

function resizeArtwork(artworkUrl: string, size: number) {
  return artworkUrl.replace(ARTWORK_SIZE_PATTERN, `/${size}x${size}bb.$1`);
}

export async function getMusicTracks(): Promise<MusicTrack[]> {
  const url = new URL(LOOKUP_URL);
  url.searchParams.set(
    "id",
    MUSIC_TRACKS.map((track) => track.appleMusicId).join(","),
  );
  url.searchParams.set("entity", "song");

  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Apple Music lookup failed with ${response.status}`);
  }

  const { results }: { results: AppleMusicLookupResult[] } =
    await response.json();
  const catalog = new Map(
    results
      .filter((result) => result.wrapperType === "track")
      .map((result) => [String(result.trackId), result]),
  );

  return MUSIC_TRACKS.flatMap((track) => {
    const result = catalog.get(track.appleMusicId);

    if (!result?.previewUrl || !result.artworkUrl100) {
      return [];
    }

    return {
      id: track.id,
      title: track.title,
      artist: track.artist,
      artworkUrl: resizeArtwork(result.artworkUrl100, 60),
      largeArtworkUrl: resizeArtwork(result.artworkUrl100, 512),
      previewUrl: result.previewUrl,
    };
  });
}
