"use client";

type SoundId = "eat" | "gameover" | "click" | "pause";

const SOUND_FREQ: Record<SoundId, { freq: number; duration: number; type?: OscillatorType }> = {
  eat: { freq: 880, duration: 0.08, type: "sine" },
  gameover: { freq: 220, duration: 0.4, type: "sawtooth" },
  click: { freq: 600, duration: 0.05, type: "square" },
  pause: { freq: 440, duration: 0.06, type: "sine" },
};

let audioCtx: AudioContext | null = null;
let musicOsc: OscillatorNode | null = null;
let musicGain: GainNode | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function playSound(id: SoundId, enabled: boolean) {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const cfg = SOUND_FREQ[id];
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = cfg.type ?? "sine";
  osc.frequency.value = cfg.freq;
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + cfg.duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + cfg.duration);
}

export function startMusic(enabled: boolean) {
  if (!enabled) return;
  stopMusic();
  const ctx = getContext();
  if (!ctx) return;
  musicGain = ctx.createGain();
  musicGain.gain.value = 0.03;
  musicOsc = ctx.createOscillator();
  musicOsc.type = "triangle";
  musicOsc.frequency.value = 110;
  musicOsc.connect(musicGain);
  musicGain.connect(ctx.destination);
  musicOsc.start();
}

export function stopMusic() {
  try {
    musicOsc?.stop();
  } catch {
    /* already stopped */
  }
  musicOsc = null;
  musicGain = null;
}
