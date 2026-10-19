import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import "./projects.css";

// The path and its coordinate space (same numbers as the old decorative map).
const PATH_D = "M45 280 C85 270, 115 210, 170 230 S235 285, 275 205 S350 130, 435 100";
const VB_W = 500;
const VB_H = 415;

// `at` is how far along the path each stop sits (0 to 1).
const STOPS = [
  {
    id: "rooftop-1",
    label: "ROOFTOP 1",
    at: 0.1,
    caption: "A dream about flying fish, delivered to Rooftop 1.",
  },
  {
    id: "rooftop-2",
    label: "ROOFTOP 2",
    at: 0.38,
    caption: "A dream about a cloud made of pillows, delivered to Rooftop 2.",
  },
  {
    id: "rooftop-3",
    label: "ROOFTOP 3",
    at: 0.66,
    caption: "A dream about dancing teacups, delivered to Rooftop 3.",
  },
  {
    id: "starlight-hill",
    label: "STARLIGHT HILL",
    at: 0.97,
    caption: "My last dream tonight, a quiet one, delivered to Starlight Hill.",
  },
] as const;

type Point = { x: number; y: number };

function Arrow() {
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

/** A tiny Pip riding his cloud. Drawn in SVG so it stays crisp at any size. */
function PipRider() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g fill="#ffffff">
        <ellipse cx="40" cy="67" rx="30" ry="9" />
        <circle cx="21" cy="62" r="9" />
        <circle cx="39" cy="57" r="12" />
        <circle cx="57" cy="62" r="9" />
      </g>
      <ellipse cx="40" cy="53" rx="11" ry="8" fill="#f6dfe9" />
      <circle cx="40" cy="35" r="17" fill="#fbf1e2" stroke="#d9c2dc" strokeWidth="1.5" />
      <ellipse cx="33.500" cy="37" rx="5.500" ry="6.500" fill="#33254a" />
      <ellipse cx="46.500" cy="37" rx="5.500" ry="6.500" fill="#33254a" />
      <circle cx="33.500" cy="38" r="2.200" fill="#ffe9a6" />
      <circle cx="46.500" cy="38" r="2.200" fill="#ffe9a6" />
      <path d="M34 46q6 4.500 12 .5" stroke="#8a6a8f" strokeWidth="1.800" fill="none" strokeLinecap="round" />
      <circle cx="29" cy="44" r="2.600" fill="#f4b6c8" opacity="0.7" />
      <circle cx="51" cy="44" r="2.600" fill="#f4b6c8" opacity="0.7" />
      <path d="M23.500 29C23 12 41 4 58 14 46 13 35 18 23.500 29Z" fill="#7b5ca8" />
      <path d="M22 29Q40 19 58 29" stroke="#f3e6f7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path
        d="M44 14.500l1.300 3.300 3.500.3-2.700 2.200.9 3.400-3-1.900-3 1.900.9-3.400-2.700-2.200 3.500-.3z"
        fill="#ffd966"
      />
      <g fill="#f08fb4">
        <path d="M58 14l-8-4 1 8z" />
        <path d="M58 14l8-4-1 8z" />
        <circle cx="58" cy="14" r="2.400" />
      </g>
    </svg>
  );
}

type RouteMapProps = {
  /** The moon illustration for the sky, for example <MapMoon />. */
  moon: ReactNode;
  /** Called when the visitor taps the button under the copy. */
  onNext: () => void;
};

export default function RouteMap({ moon, onNext }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const doneRef = useRef<SVGPathElement>(null);
  const pipRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [delivered, setDelivered] = useState(0);

  // Put every stop exactly on the path before the first paint.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    setPoints(
      STOPS.map((stop) => {
        const point = path.getPointAtLength(length * stop.at);
        return { x: point.x, y: point.y };
      })
    );
  }, []);

  // Move Pip along the path as the visitor scrolls.
  useEffect(() => {
    const map = mapRef.current;
    const path = pathRef.current;
    const done = doneRef.current;
    const pip = pipRef.current;
    if (!map || !path || !done || !pip) return undefined;

    const length = path.getTotalLength();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    done.style.strokeDasharray = String(length);

    let target = 0;
    let current = 0;
    let raf = 0;
    let lastCount = -1;

    const place = (progress: number) => {
      const point = path.getPointAtLength(length * progress);
      pip.style.left = `${(point.x / VB_W) * 100}%`;
      pip.style.top = `${(point.y / VB_H) * 100}%`;
      done.style.strokeDashoffset = String(length * (1 - progress));

      let count = 0;
      STOPS.forEach((stop) => {
        if (progress >= stop.at) count += 1;
      });
      if (count !== lastCount) {
        lastCount = count;
        setDelivered(count);
      }
    };

    // 0 when the map is just entering from the bottom, 1 once it is mostly past.
    const measure = () => {
      const rect = map.getBoundingClientRect();
      const vh = window.innerHeight;
      const distance = vh * 0.35 + rect.height;
      target = Math.min(1, Math.max(0, (vh * 0.8 - rect.top) / distance));
    };

    const frame = () => {
      raf = 0;
      const diff = target - current;
      current = reduceMotion || Math.abs(diff) < 0.0008 ? target : current + diff * 0.14;
      place(current);
      if (current !== target) raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    measure();
    current = target;
    place(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = STOPS.length;
  const title = delivered === 0 ? "Ready for take-off" : "Dream delivered ✦";
  const caption =
    delivered === 0 ? "Scroll down and ride along with me!" : STOPS[delivered - 1].caption;

  return (
    <section className="route-section section-padding" id="route">
      <div className="section-wrap">
        <div className="section-label" data-reveal>
          <span>03 / DREAM DELIVERY</span>
          <span>FOLLOW MY LITTLE LIGHTS</span>
        </div>

        <div className="route-layout">
          <div className="route-copy" data-reveal>
            <span className="route-label">
              <span className="route-live-dot" />
              MY NIGHTLY FLIGHT PLAN
            </span>

            <h2>
              Ride along
              <br />
              on my <em>route.</em>
            </h2>

            <p>
              Every night I load dreams onto my cloud and fly them over the
              rooftops. Scroll, and watch the stops glow as I pass!
            </p>

            <div className="route-stats">
              <div>
                <strong>
                  {delivered}/{total}
                </strong>
                <span>DREAMS DELIVERED</span>
              </div>
              <div>
                <strong>{String(total).padStart(2, "0")}</strong>
                <span>ROOFTOP STOPS</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>NIGHTS TO GO</span>
              </div>
            </div>

            <button className="button button-outline" onClick={onNext}>
              Meet me properly <Arrow />
            </button>
          </div>

          <div
            className="route-map"
            data-reveal
            ref={mapRef}
            role="group"
            aria-label="Illustrated map of Pip's dream delivery route"
          >
            <div className="map-sky-glow" />
            <span className="map-constellation constellation-a">· ✦ · ✧</span>
            <span className="map-constellation constellation-b">✧ · ✦ ·</span>
            <span className="map-moon" aria-hidden="true">
              {moon}
            </span>

            <svg
              className="route-path"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d={PATH_D} fill="none" className="route-path-base" ref={pathRef} />
              <path d={PATH_D} fill="none" className="route-path-done" ref={doneRef} />
              <path d={PATH_D} fill="none" className="route-path-runner" />
            </svg>

            <div className="map-roof roof-one">
              <span className="roof-chimney" />
              <span className="roof-window" />
              <span className="roof-window" />
            </div>
            <div className="map-roof roof-two">
              <span className="roof-chimney" />
              <span className="roof-window" />
              <span className="roof-window" />
            </div>
            <div className="map-roof roof-three">
              <span className="roof-chimney" />
              <span className="roof-window" />
              <span className="roof-window" />
            </div>

            {points.map((point, index) => (
              <div
                key={STOPS[index].id}
                className={`map-stop dd-stop ${index === total - 1 ? "dd-stop-end" : ""} ${
                  index < delivered ? "is-lit" : ""
                }`}
                style={{
                  left: `${(point.x / VB_W) * 100}%`,
                  top: `${(point.y / VB_H) * 100}%`,
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{STOPS[index].label}</small>
              </div>
            ))}

            <div className="dd-pip" ref={pipRef} style={{ left: "9%", top: "67.5%" }} aria-hidden="true">
              <PipRider />
            </div>

            <div className="map-map-label dd-caption" aria-live="polite" aria-atomic="true">
              <span className="map-pin">⌖</span>
              <span>
                <strong>{title}</strong>
                <small>{caption}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}