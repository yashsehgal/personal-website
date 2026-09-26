const KEYBOARD_CLICK_SECONDS = 0.022;
const EMAIL_COPIED_SECONDS = 0.26;
const SCRUB_SECONDS = 0.07;
const SCRUB_GRAIN_SECONDS = 0.0016;
const SCRUB_MIN_INTERVAL_MS = 35;
const SCRUB_FAST_POINTER_SPEED = 1.6;

let audioContext;
let pointerSpeed = 0;
let lastPointerSample = null;
let lastScrubAt = 0;

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

function scrubNoiseBuffer(context, seconds) {
  const length = Math.max(1, Math.floor(context.sampleRate * seconds));
  const grainLength = Math.max(1, Math.floor(context.sampleRate * SCRUB_GRAIN_SECONDS));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const samples = buffer.getChannelData(0);
  let grainLevel = 1;
  let smoothed = 0;

  for (let index = 0; index < length; index += 1) {
    if (index % grainLength === 0) {
      grainLevel = 0.35 + Math.random() * 0.65;
    }

    const white = Math.random() * 2 - 1;
    smoothed = smoothed * 0.6 + white * 0.4;
    samples[index] = smoothed * grainLevel;
  }

  return buffer;
}

function playScrub(context, intensity) {
  const now = context.currentTime;
  const duration = SCRUB_SECONDS * (0.85 + Math.random() * 0.3);
  const peak = (0.018 + intensity * 0.05) * (0.85 + Math.random() * 0.3);

  const source = context.createBufferSource();
  source.buffer = scrubNoiseBuffer(context, duration);
  source.playbackRate.value = 0.92 + Math.random() * 0.16;

  const highpass = context.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 280;
  highpass.Q.value = 0.5;

  const band = context.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(
    900 + intensity * 900 + Math.random() * 300,
    now,
  );
  band.frequency.exponentialRampToValueAtTime(700, now + duration);
  band.Q.value = 0.6;

  const lowpass = context.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 3400;
  lowpass.Q.value = 0.3;

  const level = context.createGain();
  level.gain.setValueAtTime(0.0001, now);
  level.gain.exponentialRampToValueAtTime(peak, now + 0.004);
  level.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(highpass);
  highpass.connect(band);
  band.connect(lowpass);
  lowpass.connect(level);
  level.connect(context.destination);
  source.start(now);
  source.stop(now + duration);
}

function onInterfacePointerMove(event) {
  const sample = { x: event.clientX, y: event.clientY, time: event.timeStamp };

  if (lastPointerSample) {
    const elapsed = Math.max(sample.time - lastPointerSample.time, 1);
    const distance = Math.hypot(
      sample.x - lastPointerSample.x,
      sample.y - lastPointerSample.y,
    );
    pointerSpeed = pointerSpeed * 0.6 + (distance / elapsed) * 0.4;
  }

  lastPointerSample = sample;
}

function onInterfacePointerOver(event) {
  if (event.pointerType !== "mouse" || !(event.target instanceof Element)) {
    return;
  }

  const row = event.target.closest("[data-scrub-sound]");
  const previous =
    event.relatedTarget instanceof Element
      ? event.relatedTarget.closest("[data-scrub-sound]")
      : null;

  if (!row || row === previous) {
    return;
  }

  const nowMs = performance.now();

  if (nowMs - lastScrubAt < SCRUB_MIN_INTERVAL_MS) {
    return;
  }

  lastScrubAt = nowMs;
  playScrubSound(Math.min(Math.max(pointerSpeed / SCRUB_FAST_POINTER_SPEED, 0.15), 1));
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

export function playScrubSound(intensity) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  playScrub(context, intensity);
}

const INTERFACE_LISTENERS = [
  ["click", onInterfaceClick],
  ["pointermove", onInterfacePointerMove],
  ["pointerover", onInterfacePointerOver],
];

export function startInterfaceSounds() {
  const previous = window.__interfaceSoundListeners;

  if (Array.isArray(previous)) {
    previous.forEach(([type, listener]) =>
      document.removeEventListener(type, listener, true),
    );
  }

  window.__interfaceSoundListeners = INTERFACE_LISTENERS;
  INTERFACE_LISTENERS.forEach(([type, listener]) =>
    document.addEventListener(type, listener, { capture: true, passive: true }),
  );

  return () => {
    INTERFACE_LISTENERS.forEach(([type, listener]) =>
      document.removeEventListener(type, listener, true),
    );

    if (window.__interfaceSoundListeners === INTERFACE_LISTENERS) {
      delete window.__interfaceSoundListeners;
    }
  };
}
