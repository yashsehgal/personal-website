import type { MusicTrack } from "@/common/music";
import { useSyncExternalStore } from "react";

type MusicPlayerState = {
  currentTrack: MusicTrack | null;
  hasNextTrack: boolean;
  isPlaying: boolean;
  volume: number;
};

const INITIAL_STATE: MusicPlayerState = {
  currentTrack: null,
  hasNextTrack: false,
  isPlaying: false,
  volume: 0.5,
};

const RESTART_THRESHOLD_SECONDS = 3;

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

function getQueueIndex() {
  return queue.findIndex((track) => track.id === state.currentTrack?.id);
}

function syncHasNextTrack() {
  const index = getQueueIndex();
  const hasNextTrack = index !== -1 && index < queue.length - 1;

  if (hasNextTrack !== state.hasNextTrack) {
    setState({ hasNextTrack });
  }
}

function getAudio() {
  if (audio) {
    return audio;
  }

  audio = new Audio();
  audio.preload = "auto";
  audio.volume = state.volume;
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
    navigator.mediaSession.setActionHandler("nexttrack", playNextTrack);
    navigator.mediaSession.setActionHandler(
      "previoustrack",
      playPreviousTrack,
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
  setState({ currentTrack: track });
  syncHasNextTrack();

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
  const index = getQueueIndex();
  const nextTrack = index === -1 ? undefined : queue[index + offset];

  if (!nextTrack) {
    return false;
  }

  playTrack(nextTrack);
  return true;
}

export function setMusicQueue(tracks: readonly MusicTrack[]) {
  queue = tracks;
  syncHasNextTrack();
}

export function toggleTrack(track: MusicTrack, tracks: readonly MusicTrack[]) {
  queue = tracks;

  if (state.currentTrack?.id !== track.id) {
    playTrack(track);
    return;
  }

  togglePlayback();
}

export function togglePlayback() {
  if (!state.currentTrack) {
    return;
  }

  if (state.isPlaying) {
    getAudio().pause();
    return;
  }

  resume();
}

export function playNextTrack() {
  skipTrack(1);
}

export function playPreviousTrack() {
  const player = getAudio();

  if (player.currentTime > RESTART_THRESHOLD_SECONDS || !skipTrack(-1)) {
    player.currentTime = 0;
  }
}

export function setMusicVolume(volume: number) {
  setState({ volume });

  if (audio) {
    audio.volume = volume;
  }
}

const PROGRESS_EVENTS = [
  "timeupdate",
  "seeked",
  "durationchange",
  "emptied",
] as const;

export function subscribeToPlaybackProgress(listener: () => void) {
  const player = getAudio();

  PROGRESS_EVENTS.forEach((event) => player.addEventListener(event, listener));
  return () =>
    PROGRESS_EVENTS.forEach((event) =>
      player.removeEventListener(event, listener),
    );
}

export function getPlaybackProgress() {
  return {
    currentTime: audio?.currentTime ?? 0,
    duration: audio && Number.isFinite(audio.duration) ? audio.duration : 0,
  };
}

export function useMusicPlayer() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL_STATE,
  );
}
