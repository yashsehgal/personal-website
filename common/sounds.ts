export const SOUND_EFFECTS = {
  SINGLE_KEYBOARD_KEY_PRESS: "single-keyboard-key-press.mp3",
  MESSAGE_REPLY_SEND: "message-reply-send.mp3",
} as const;

export type SoundEffectKey = keyof typeof SOUND_EFFECTS;

export function getSoundEffectSrc(effectKey: SoundEffectKey): string {
  return `/sounds/${SOUND_EFFECTS[effectKey]}`;
}
