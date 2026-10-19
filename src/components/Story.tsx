import { useEffect, useRef, useState } from "react";
import "../story.css";

const STAR = "M0 -14 L4 -5 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -5 Z";

const SKY_STARS: Array<[number, number, number, number]> = [
  [40, 40, 1.6, 0],
  [90, 90, 1.2, 0.6],
  [150, 30, 1.8, 1.1],
  [210, 70, 1.2, 0.3],
  [260, 28, 1.6, 0.9],
  [360, 120, 1.4, 0.5],
  [30, 150, 1.4, 1.3],
  [120, 150, 1.2, 0.2],
  [300, 170, 1.6, 1],
  [380, 40, 1.2, 0.7],
];

const CAPTIONS = [
  "I was a tiny skull in a very big night. Too sleepy to be scared.",
  "A star fell into my nightcap. It hummed. I giggled.",
  "The Midnight Nursery hired me on the spot. I hate silence, so I fit right in.",
  "Now I wire lullabies and stitch dreams. Sometimes I trip on the wires.",
];

function Sky({ id, top, bottom }: { id: string; top: string; bottom: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      {SKY_STARS.map(([x, y, r, d], i) => (
        <circle
          key={i}
          className="story-twinkle"
          cx={x}
          cy={y}
          r={r}
          fill="#fff3c9"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </>
  );
}

type MiniPipProps = {
  x: number;
  y: number;
  s?: number;
  tilt?: number;
  glintClass?: string;
};

function MiniPip({ x, y, s = 1, tilt = 0, glintClass }: MiniPipProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
      <ellipse cx="0" cy="64" rx="30" ry="24" fill="#f6e3c8" />
      <ellipse cx="0" cy="6" rx="46" ry="42" fill="#fbf3e6" />
      <path d="M-45 -8 C-42 -52 -12 -82 38 -90 C26 -64 40 -34 45 -8 Z" fill="#fbe9c4" />
      <path d="M-47 -8 Q0 -24 47 -8 L47 4 Q0 -12 -47 4 Z" fill="#f1d9a3" />
      <circle cx="40" cy="-92" r="9" fill="#e9d4b2" />
      <circle cx="-12" cy="-48" r="2.4" fill="#e3b960" />
      <circle cx="8" cy="-66" r="2.4" fill="#e3b960" />
      <circle cx="22" cy="-40" r="2" fill="#e3b960" />
      <path d="M-26 -28 L-42 -38 L-42 -18 Z M-26 -28 L-10 -38 L-10 -18 Z" fill="#f2a9bd" />
      <circle cx="-26" cy="-28" r="4" fill="#e88aa4" />
      <ellipse cx="-17" cy="8" rx="13" ry="15" fill="#3b2623" />
      <ellipse cx="17" cy="6" rx="13" ry="15" fill="#3b2623" />
      <circle className={glintClass} cx="-14" cy="10" r="3.2" fill="#ffefb8" />
      <circle className={glintClass} cx="20" cy="8" r="3.2" fill="#ffefb8" />
      <ellipse cx="0" cy="21" rx="3" ry="2.4" fill="#5a3b34" />
      <path d="M-9 28 Q0 35 10 26" fill="none" stroke="#5a3b34" strokeWidth="2" strokeLinecap="round" />
      <circle cx="-31" cy="24" r="7" fill="#f6b8c2" opacity="0.55" />
      <circle cx="31" cy="22" r="7" fill="#f6b8c2" opacity="0.55" />
    </g>
  );
}

function SceneNight() {
  return (
    <svg className="pip-scene-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <Sky id="sk1" top="#1b1233" bottom="#3d2a63" />
      <path d="M332 34 A28 28 0 1 0 332 90 A40 40 0 0 1 332 34 Z" fill="#fbe9b8" />
      <path d="M0 262 Q120 222 240 252 T400 240 V300 H0 Z" fill="#241a3e" />
      <MiniPip x={200} y={205} s={0.55} />
      <g fill="#cdb8ee" fontFamily="var(--display), serif" fontSize="20">
        <text className="story-float" x="236" y="190">z</text>
        <text className="story-float" x="250" y="170" style={{ animationDelay: "0.8s" }}>z</text>
        <text className="story-float" x="266" y="148" style={{ animationDelay: "1.6s" }}>z</text>
      </g>
    </svg>
  );
}

function SceneStar() {
  return (
    <svg className="pip-scene-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <Sky id="sk2" top="#2a1a4d" bottom="#5b3b82" />
      <path d="M0 270 Q120 240 240 262 T400 252 V300 H0 Z" fill="#2e2150" />
      <MiniPip x={200} y={190} s={0.95} glintClass="story-glint" />
      <g transform="translate(240 112)">
        <g className="story-fall">
          <path d={STAR} fill="#ffe08a" />
          <circle r="22" fill="#ffe08a" opacity="0.25" />
        </g>
      </g>
      <g fill="#ffe7a8" fontFamily="var(--display), serif" fontSize="22">
        <text className="story-float" x="92" y="170">♪</text>
        <text className="story-float" x="304" y="190" style={{ animationDelay: "0.7s" }}>♫</text>
        <text className="story-float" x="70" y="120" style={{ animationDelay: "1.4s" }}>♪</text>
      </g>
    </svg>
  );
}

function SceneNursery() {
  return (
    <svg className="pip-scene-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <Sky id="sk3" top="#20163a" bottom="#47306f" />
      <path d="M0 268 Q140 246 260 262 T400 256 V300 H0 Z" fill="#2a1d45" />
      <rect x="245" y="92" width="16" height="30" fill="#5b4690" />
      <rect x="120" y="130" width="160" height="116" fill="#5b4690" />
      <polygon points="104,134 200,78 296,134" fill="#7a5fb0" />
      <rect className="story-lit" x="138" y="156" width="28" height="26" rx="6" fill="#ffd98a" />
      <rect className="story-lit" x="234" y="156" width="28" height="26" rx="6" fill="#ffd98a" style={{ animationDelay: "1.2s" }} />
      <rect x="186" y="210" width="28" height="36" rx="14" fill="#2a1d45" />
      <rect x="126" y="188" width="148" height="18" rx="7" fill="#f6e3c8" />
      <text x="200" y="201" textAnchor="middle" fontSize="11" letterSpacing="0.8" fill="#4a3550" fontFamily="var(--display), serif">
        MIDNIGHT NURSERY
      </text>
      <path d="M104 134 Q150 160 200 134 T296 134" fill="none" stroke="#c9a85a" strokeWidth="1.5" />
      {[130, 165, 200, 235, 270].map((x, i) => (
        <circle
          key={x}
          className="story-twinkle"
          cx={x}
          cy={i % 2 === 0 ? 146 : 150}
          r="3.4"
          fill={i % 2 === 0 ? "#ffd98a" : "#f2a9bd"}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <MiniPip x={336} y={216} s={0.5} />
    </svg>
  );
}

function SceneWires() {
  return (
    <svg className="pip-scene-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <Sky id="sk4" top="#1c1636" bottom="#3b2c66" />
      <g fill="none" stroke="#f0b95c" strokeWidth="2" strokeLinecap="round">
        <path className="story-dash" d="M0 90 Q100 40 200 100 T400 70" />
        <path className="story-dash" d="M0 150 Q110 110 210 160 T400 130" style={{ animationDelay: "0.6s" }} />
        <path className="story-dash" d="M0 210 Q90 180 190 220 T400 200" style={{ animationDelay: "1.2s" }} />
      </g>
      <g transform="translate(70 84)"><path d={STAR} fill="#ffe08a" transform="scale(0.8)" /></g>
      <g transform="translate(330 76)"><path d={STAR} fill="#f2a9bd" transform="scale(0.7)" /></g>
      <g transform="translate(320 196)"><path d={STAR} fill="#cdb8ee" transform="scale(0.8)" /></g>
      <g transform="translate(60 204)"><path d={STAR} fill="#ffe08a" transform="scale(0.7)" /></g>
      <MiniPip x={200} y={150} s={0.8} tilt={-10} />
      <path d="M150 170 Q200 200 250 168" fill="none" stroke="#f0b95c" strokeWidth="2.5" strokeLinecap="round" />
      <text className="story-float" x="268" y="118" fontSize="18" fill="#ffe7a8" fontFamily="var(--display), serif">
        oops!
      </text>
    </svg>
  );
}

const SCENES = [SceneNight, SceneStar, SceneNursery, SceneWires];

export function Story() {
  const rootRef = useRef<HTMLElement>(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      setScene(Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function jumpTo(index: number) {
    const root = rootRef.current;
    if (!root) return;
    const top = window.scrollY + root.getBoundingClientRect().top;
    const range = root.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + range * ((index + 0.5) / SCENES.length),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <section
      ref={rootRef}
      className="pip-story"
      id="story"
      aria-labelledby="story-title"
    >
      <div className="pip-story-sticky">
        <div className="pip-story-head">
          <span className="pip-story-label">01 / HOW I GOT HERE</span>
          <h2 id="story-title" className="pip-story-title">
            Once upon a <em>midnight.</em>
          </h2>
        </div>

        <div className="pip-scenes">
          {SCENES.map((Art, index) => (
            <figure
              key={index}
              className={`pip-scene ${index === scene ? "is-active" : ""} ${
                index < scene ? "is-past" : ""
              }`}
              aria-hidden={index !== scene}
            >
              <Art />
              <figcaption>{CAPTIONS[index]}</figcaption>
            </figure>
          ))}
        </div>

        <div className="pip-dots" role="group" aria-label="Story scenes">
          {SCENES.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`pip-dot ${index === scene ? "is-active" : ""}`}
              aria-label={`Scene ${index + 1} of ${SCENES.length}`}
              aria-current={index === scene}
              onClick={() => jumpTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}