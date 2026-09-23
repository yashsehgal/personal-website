const KEYBOARD_CLICK_SECONDS = 0.022;
const EMAIL_COPIED_SECONDS = 0.26;

let audioContext;

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  return audioContext;
}

function noiseBuffer(context, seconds) {
  const length = Math.max(1, Math.floor(context.sampleRate * seconds));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    const remaining = 1 - index / length;
    samples[index] = (Math.random() * 2 - 1) * remaining * remaining;
  }

  return buffer;
}

function playMagicKeyboardClick(context) {
  const now = context.currentTime;
  const tickPitch = 1120 + Math.random() * 40;

  const tick = context.createOscillator();
  const tickFilter = context.createBiquadFilter();
  const tickGain = context.createGain();
  tick.type = "sine";
  tick.frequency.setValueAtTime(tickPitch, now);
  tick.frequency.exponentialRampToValueAtTime(tickPitch * 0.94, now + 0.016);
  tickFilter.type = "lowpass";
  tickFilter.frequency.value = 1600;
  tickFilter.Q.value = 0.4;
  tickGain.gain.setValueAtTime(0.0001, now);
  tickGain.gain.exponentialRampToValueAtTime(0.11, now + 0.003);
  tickGain.gain.exponentialRampToValueAtTime(0.0001, now + KEYBOARD_CLICK_SECONDS);
  tick.connect(tickFilter);
  tickFilter.connect(tickGain);
  tickGain.connect(context.destination);
  tick.start(now);
  tick.stop(now + KEYBOARD_CLICK_SECONDS);

  const bed = context.createOscillator();
  const bedGain = context.createGain();
  bed.type = "sine";
  bed.frequency.setValueAtTime(220 + Math.random() * 12, now);
  bed.frequency.exponentialRampToValueAtTime(190, now + 0.016);
  bedGain.gain.setValueAtTime(0.0001, now);
  bedGain.gain.exponentialRampToValueAtTime(0.1, now + 0.002);
  bedGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
  bed.connect(bedGain);
  bedGain.connect(context.destination);
  bed.start(now);
  bed.stop(now + 0.02);

  const scrape = context.createBufferSource();
  const scrapeFilter = context.createBiquadFilter();
  const scrapeGain = context.createGain();
  scrape.buffer = noiseBuffer(context, 0.012);
  scrapeFilter.type = "lowpass";
  scrapeFilter.frequency.value = 1400;
  scrapeFilter.Q.value = 0.3;
  scrapeGain.gain.setValueAtTime(0.0001, now);
  scrapeGain.gain.exponentialRampToValueAtTime(0.026, now + 0.003);
  scrapeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);
  scrape.connect(scrapeFilter);
  scrapeFilter.connect(scrapeGain);
  scrapeGain.connect(context.destination);
  scrape.start(now);
}

function playEmailCopiedTone(context) {
  const now = context.currentTime;
  const filter = context.createBiquadFilter();
  const level = context.createGain();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3200, now);
  filter.frequency.exponentialRampToValueAtTime(1400, now + EMAIL_COPIED_SECONDS);
  filter.Q.value = 0.35;

  level.gain.setValueAtTime(0.0001, now);
  level.gain.exponentialRampToValueAtTime(0.16, now + 0.016);
  level.gain.exponentialRampToValueAtTime(0.0001, now + EMAIL_COPIED_SECONDS);

  filter.connect(level);
  level.connect(context.destination);

  const tone = context.createOscillator();
  tone.type = "sine";
  tone.frequency.setValueAtTime(659.25, now);
  tone.frequency.exponentialRampToValueAtTime(783.99, now + EMAIL_COPIED_SECONDS);
  tone.connect(filter);
  tone.start(now);
  tone.stop(now + EMAIL_COPIED_SECONDS);

  const third = context.createOscillator();
  const thirdGain = context.createGain();
  third.type = "sine";
  third.frequency.setValueAtTime(830.61, now);
  third.frequency.exponentialRampToValueAtTime(987.77, now + EMAIL_COPIED_SECONDS);
  thirdGain.gain.value = 0.28;
  third.connect(thirdGain);
  thirdGain.connect(filter);
  third.start(now);
  third.stop(now + EMAIL_COPIED_SECONDS);

  const whisper = context.createBufferSource();
  const whisperFilter = context.createBiquadFilter();
  const whisperGain = context.createGain();
  whisper.buffer = noiseBuffer(context, EMAIL_COPIED_SECONDS);
  whisperFilter.type = "bandpass";
  whisperFilter.frequency.value = 2800;
  whisperFilter.Q.value = 0.5;
  whisperGain.gain.value = 0.05;
  whisper.connect(whisperFilter);
  whisperFilter.connect(whisperGain);
  whisperGain.connect(level);
  whisper.start(now);
}

function isPlainPrimaryClick(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function isInternalAnchor(anchor) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#")) {
    return false;
  }

  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

function onInterfaceClick(event) {
  const anchor = event.target instanceof Element ? event.target.closest("a") : null;

  if (!anchor) {
    return;
  }

  const href = anchor.getAttribute("href") ?? "";

  if (href.startsWith("mailto:")) {
    const isDesktopLayout = window.matchMedia("(width > 64rem)").matches;

    if (isDesktopLayout && (event.metaKey || event.ctrlKey)) {
      playEmailCopiedSound();
    }
    return;
  }

  if (!isPlainPrimaryClick(event) || !isInternalAnchor(anchor)) {
    return;
  }

  playInternalLinkSound();
}

export function playInternalLinkSound() {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  playMagicKeyboardClick(context);
}

export function playEmailCopiedSound() {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  playEmailCopiedTone(context);
}

export function startInterfaceSounds() {
  const previous = window.__interfaceSoundClick;

  if (typeof previous === "function") {
    document.removeEventListener("click", previous, true);
  }

  window.__interfaceSoundClick = onInterfaceClick;
  document.addEventListener("click", onInterfaceClick, true);

  return () => {
    document.removeEventListener("click", onInterfaceClick, true);

    if (window.__interfaceSoundClick === onInterfaceClick) {
      delete window.__interfaceSoundClick;
    }
  };
}
