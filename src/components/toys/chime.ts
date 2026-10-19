// TEMPORARY helper for Person 2's toys.
// When Person 3's src/audio.ts lands on main, delete this file and use
// `play.chime()` from "../../audio" instead (same idea, same sound).

let ctx: AudioContext | null = null;
const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0];

export function chime(enabled: boolean) {
  if (!enabled) return;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx ??= new Ctor();
    if (ctx.state === "suspended") void ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = SCALE[Math.floor(Math.random() * SCALE.length)];
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.95);
  } catch {
    // Audio is a bonus. The visuals still work without it.
  }
}