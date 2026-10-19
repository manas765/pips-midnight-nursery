import type { PointerEvent } from "react";

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function canTilt(event: PointerEvent<HTMLElement>) {
  return (
    event.pointerType === "mouse" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function handleTilt(event: PointerEvent<HTMLElement>, maxDeg = 10) {
  if (!canTilt(event)) return;

  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  const mx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
  const my = Math.max(-1, Math.min(1, (py - 0.5) * 2));

  element.style.setProperty("--mx", mx.toFixed(3));
  element.style.setProperty("--my", my.toFixed(3));
  element.style.setProperty("--ry", `${(mx * maxDeg).toFixed(2)}deg`);
  element.style.setProperty("--rx", `${(-my * maxDeg).toFixed(2)}deg`);
  element.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
  element.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
}

export function resetTilt(event: PointerEvent<HTMLElement>) {
  const element = event.currentTarget;

  ["--mx", "--my", "--rx", "--ry", "--gx", "--gy"].forEach((name) =>
    element.style.removeProperty(name)
  );
}