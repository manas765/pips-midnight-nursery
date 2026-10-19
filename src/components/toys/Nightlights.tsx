import { useEffect, useState, type ReactNode } from "react";
import { chime } from "./chime";
import "../projects.css";

type Lamp = {
  id: string;
  name: string;
  art: (lit: boolean) => ReactNode;
};

function StarJar({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="32" y="10" width="36" height="11" rx="4" fill={lit ? "#c9a0d8" : "#9a86ad"} />
      <path
        d="M35 21h30q9 6 9 20v35q0 14-24 14t-24-14V41q0-14 9-20z"
        fill={lit ? "#fff0b4" : "#d4cae0"}
        stroke={lit ? "#d7b0e3" : "#a999bb"}
        strokeWidth="3"
      />
      <path
        d="M50.0 43.0 L54.7 55.5 L68.1 56.1 L57.6 64.5 L61.2 77.4 L50.0 70.0 L38.8 77.4 L42.4 64.5 L31.9 56.1 L45.3 55.5Z"
        fill={lit ? "#ffc93d" : "#a99bc0"}
      />
      <ellipse cx="39" cy="50" rx="2.8" ry="11" fill="#fff" opacity={lit ? 0.7 : 0.3} />
    </svg>
  );
}

function CloudLamp({ lit }: { lit: boolean }) {
  const base = lit ? "#c9a0d8" : "#9a86ad";
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="90" rx="22" ry="5" fill={base} />
      <rect x="45" y="74" width="10" height="16" rx="3" fill={base} />
      <g fill={lit ? "#fff7d6" : "#ddd5e9"}>
        <ellipse cx="50" cy="58" rx="34" ry="14" />
        <circle cx="32" cy="50" r="15" />
        <circle cx="52" cy="40" r="19" />
        <circle cx="70" cy="52" r="13" />
      </g>
      <g stroke={lit ? "#a1739c" : "#8e7ea3"} strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M38 54q3.500 3 7 0" />
        <path d="M55 54q3.500 3 7 0" />
        <path d="M46 62q4 3.500 8 0" />
      </g>
    </svg>
  );
}

function FireflyJar({ lit }: { lit: boolean }) {
  const dots: Array<[number, number, number]> = [
    [42, 50, 4],
    [58, 62, 3.4],
    [46, 74, 3],
  ];
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="32" y="10" width="36" height="11" rx="4" fill={lit ? "#c9a0d8" : "#9a86ad"} />
      <path
        d="M35 21h30q9 6 9 20v35q0 14-24 14t-24-14V41q0-14 9-20z"
        fill={lit ? "#fff6d8" : "#d4cae0"}
        stroke={lit ? "#d7b0e3" : "#a999bb"}
        strokeWidth="3"
      />
      {dots.map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          {lit && <circle cx={x} cy={y} r={r * 2.6} fill="#ffe27a" opacity="0.4" />}
          <circle cx={x} cy={y} r={r} fill={lit ? "#ffd23d" : "#a99bc0"} />
        </g>
      ))}
      <ellipse cx="39" cy="42" rx="2.8" ry="9" fill="#fff" opacity={lit ? 0.7 : 0.3} />
    </svg>
  );
}

const LAMPS: Lamp[] = [
  {
    id: "moon",
    name: "Moon Lantern",
    art: () => (
  <img
    src="/pip_dream_lantern.webp"
    alt=""
    loading="lazy"
    onError={(event) => {
      const image = event.currentTarget;
      image.style.display = "none";
    }}
  />
),
  },
  { id: "star", name: "Star Jar", art: (lit) => <StarJar lit={lit} /> },
  { id: "cloud", name: "Cloud Lamp", art: (lit) => <CloudLamp lit={lit} /> },
  { id: "firefly", name: "Firefly Jar", art: (lit) => <FireflyJar lit={lit} /> },
];

type NightlightsProps = {
  /** Whether the site's sound switch is on. */
  soundEnabled: boolean;
  /** Reports how lit the room is, from 0 to 1. Used to warm up the modal. */
  onGlow: (value: number) => void;
};

export function Nightlights({ soundEnabled, onGlow }: NightlightsProps) {
  const [lit, setLit] = useState<string[]>([]);
  const total = LAMPS.length;

  useEffect(() => {
    onGlow(lit.length / total);
  }, [lit.length, total, onGlow]);

  // When the modal closes, put the room back to normal.
  useEffect(() => () => onGlow(0), [onGlow]);

  function toggle(id: string) {
    setLit((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
    chime(soundEnabled);
  }

  const status =
    lit.length === 0
      ? "Tap a lamp to light it."
      : lit.length === total
        ? "All lit! Hear that? That's the dark going cozy."
        : `${lit.length} of ${total} glowing. Keep going!`;

  return (
    <div className="nightlights">
      <div className="nightlights-grid" role="group" aria-label="Pip's nightlights">
        {LAMPS.map((lamp) => {
          const isLit = lit.includes(lamp.id);
          return (
            <button
              key={lamp.id}
              type="button"
              className={`lamp ${isLit ? "is-lit" : ""}`}
              aria-pressed={isLit}
              onClick={() => toggle(lamp.id)}
            >
              <span className="lamp-art">
                <span className="lamp-glow" aria-hidden="true" />
                {lamp.art(isLit)}
              </span>
              <span className="lamp-name">{lamp.name}</span>
            </button>
          );
        })}
      </div>
      <p className="nightlights-status" role="status">
        {status}
      </p>
    </div>
  );
}