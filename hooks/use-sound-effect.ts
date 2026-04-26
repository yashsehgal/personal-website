"use client";

import type { SoundEffectKey } from "@/common/sounds";
import { useSoundEffectsContext } from "@/providers/sound-effects-provider";

export function useSoundEffect() {
  const { playSoundEffect } = useSoundEffectsContext();

  const play = (effectKey: SoundEffectKey) => {
    playSoundEffect(effectKey);
  };

  return { playSoundEffect: play };
}
