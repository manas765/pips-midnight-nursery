let ctx: AudioContext | null = null;

function readMuted(): boolean {
  try {
    return localStorage.getItem("pip-muted") !== "false";
  } catch {
    return true;
  }
}

let muted = readMuted();
const listeners = new Set<() => void>();

export const isMuted = () => muted;

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function getCtx(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    return ctx;
  } catch {
    return null;
  }
}

export function setMuted(v: boolean) {
  muted = v;
  try {
    localStorage.setItem("pip-muted", String(v));
  } catch {
    /* storage unavailable, keep in memory */
  }
  if (!v) {
    // Unmuting is the user gesture browsers need before audio can start.
    const c = getCtx();
    c?.resume();
  }
  listeners.forEach((fn) => fn());
}

export function tone(
  f: number,
  dur = 0.4,
  type: OscillatorType = "sine",
  vol = 0.08,
  when = 0
) {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const t = c.currentTime + when;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = f;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur);
}

const SCALE = [523.25, 587.33, 659.25, 783.99, 880];

export const play = {
  chime: () => tone(SCALE[Math.floor(Math.random() * 5)], 0.9),
  rattle: () =>
    [0, 0.04, 0.08].forEach((w) =>
      tone(200 + Math.random() * 100, 0.06, "square", 0.03, w)
    ),
  giggle: () =>
    [0, 0.09, 0.18, 0.27].forEach((w, i) =>
      tone(600 + i * 70, 0.08, "triangle", 0.06, w)
    ),
};
