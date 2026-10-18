import { useEffect, useRef } from "react";
import "./systems.css";

const POOL_SIZE = 20;
const GLYPHS = ["✦", "✧", "★", "☾"];
const COLORS = ["#f0b4d1", "#e3c3f3", "#fff1c9", "#c9b8ff"];
const LIFE_MS = 700;
const MIN_DIST = 14;

type Particle = {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  active: boolean;
};

export default function SparkleTrail() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const noHover = window.matchMedia("(hover: none), (pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (noHover.matches || reduced.matches) return undefined;

    const pool: Particle[] = Array.from({ length: POOL_SIZE }, () => {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.style.opacity = "0";
      root.appendChild(el);
      return { el, x: 0, y: 0, vx: 0, vy: 0, born: 0, active: false };
    });

    let next = 0;
    let raf = 0;
    let lastX = -999;
    let lastY = -999;

    function spawn(x: number, y: number) {
      const p = pool[next];
      next = (next + 1) % POOL_SIZE;
      p.x = x;
      p.y = y;
      p.vx = (Math.random() - 0.5) * 0.5;
      p.vy = 0.25 + Math.random() * 0.4;
      p.born = performance.now();
      p.active = true;
      p.el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      p.el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.el.style.fontSize = `${10 + Math.random() * 10}px`;
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick(now: number) {
      let anyActive = false;
      for (const p of pool) {
        if (!p.active) continue;
        const age = (now - p.born) / LIFE_MS;
        if (age >= 1) {
          p.active = false;
          p.el.style.opacity = "0";
          continue;
        }
        anyActive = true;
        p.x += p.vx * 16;
        p.y += p.vy * 16 * 0.5;
        const scale = 1 - age * 0.6;
        p.el.style.opacity = String(1 - age);
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${age * 120}deg)`;
      }
      raf = anyActive ? requestAnimationFrame(tick) : 0;
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return;
      lastX = event.clientX;
      lastY = event.clientY;
      spawn(event.clientX, event.clientY);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      pool.forEach((p) => p.el.remove());
    };
  }, []);

  return <div ref={rootRef} className="sparkle-trail" aria-hidden="true" />;
}
