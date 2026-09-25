import type { MusicTrack } from "@/common/music";
import { useSyncExternalStore } from "react";

type MusicPlayerState = {
  currentTrackId: string | null;
  isPlaying: boolean;
};

const INITIAL_STATE: MusicPlayerState = {
  currentTrackId: null,
  isPlaying: false,
};

let state = INITIAL_STATE;
let audio: HTMLAudioElement | null = null;
let queue: readonly MusicTrack[] = [];
const listeners = new Set<() => void>();

function setState(next: Partial<MusicPlayerState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getAudio() {
  if (audio) {
    return audio;
  }

  audio = new Audio();
  audio.preload = "auto";
  audio.addEventListener("play", () => setState({ isPlaying: true }));
  audio.addEventListener("pause", () => {
    if (!audio?.ended) {
      setState({ isPlaying: false });
    }
  });
  audio.addEventListener("ended", () => {
    if (!skipTrack(1)) {
      setState({ isPlaying: false });
    }
  });
  audio.addEventListener("error", () => setState({ isPlaying: false }));

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", () => resume());
    navigator.mediaSession.setActionHandler("pause", () => audio?.pause());
    navigator.mediaSession.setActionHandler("nexttrack", () => skipTrack(1));
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      skipTrack(-1),
    );
  }

  return audio;
}

function resume() {
  void getAudio()
    .play()
    .catch((error: unknown) => {
      // Switching tracks aborts the pending play() of the previous source.
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setState({ isPlaying: false });
    });
}

function playTrack(track: MusicTrack) {
  getAudio().src = track.previewUrl;
  setState({ currentTrackId: track.id });

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      artwork: [
        { src: track.largeArtworkUrl, sizes: "512x512", type: "image/jpeg" },
      ],
    });
  }

  resume();
}

function skipTrack(offset: 1 | -1) {
  const index = queue.findIndex((track) => track.id === state.currentTrackId);
  const nextTrack = index === -1 ? undefined : queue[index + offset];

  if (!nextTrack) {
    return false;
  }

  playTrack(nextTrack);
  return true;
}

export function toggleTrack(track: MusicTrack, tracks: readonly MusicTrack[]) {
  queue = tracks;

  if (state.currentTrackId !== track.id) {
    playTrack(track);
    return;
  }

  if (state.isPlaying) {
    getAudio().pause();
    return;
  }

  resume();
}

export function useMusicPlayer() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL_STATE,
  );
}
