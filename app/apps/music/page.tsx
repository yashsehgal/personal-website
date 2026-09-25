import { MusicTrackList } from "@/components/music-track-list";
import { getMusicTracks } from "@/lib/apple-music";

export default async function Music() {
  const tracks = await getMusicTracks();

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6 px-1 wide:mt-16">
      <h1 className="font-medium tracking-tight">Music</h1>
      <MusicTrackList tracks={tracks} />
    </div>
  );
}
