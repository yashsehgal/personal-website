"use client";

import { SOUND_EFFECTS, type SoundEffectKey, getSoundEffectSrc } from "@/common/sounds";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

type SoundEffectsContextValue = {
  playSoundEffect: (effectKey: SoundEffectKey) => void;
};

const SoundEffectsContext = createContext<SoundEffectsContextValue | null>(null);

export function SoundEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const soundEffectAudioMapRef = useRef<Map<SoundEffectKey, HTMLAudioElement>>(
    new Map(),
  );

  useEffect(() => {
    const soundEffectAudioMap = soundEffectAudioMapRef.current;
    (Object.keys(SOUND_EFFECTS) as SoundEffectKey[]).forEach((effectKey) => {
      if (soundEffectAudioMap.has(effectKey)) return;

      const audio = new Audio(getSoundEffectSrc(effectKey));
      audio.preload = "auto";
      audio.load();
      soundEffectAudioMap.set(effectKey, audio);
    });
  }, []);

  const playSoundEffect = useCallback((effectKey: SoundEffectKey) => {
    const soundEffectAudioMap = soundEffectAudioMapRef.current;
    const audio = soundEffectAudioMap.get(effectKey);
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore autoplay and decode failures; callers don't need to handle this.
    });
  }, []);

  return (
    <SoundEffectsContext.Provider value={{ playSoundEffect }}>
      {children}
    </SoundEffectsContext.Provider>
  );
}

export function useSoundEffectsContext(): SoundEffectsContextValue {
  const soundEffectsContext = useContext(SoundEffectsContext);
  if (!soundEffectsContext) {
    throw new Error("useSoundEffectsContext must be used within SoundEffectsProvider");
  }
  return soundEffectsContext;
}
