import { useEffect, useRef, useState } from "react";
import { play } from "../audio";
import { MOOD_INFO, type Mood } from "../mood";
import "../hero.css";
import "../mood.css";

const HINT = "Tap me. I giggle at everything.";
const GIGGLES = [
  "Hehe!",
  "Teehee, that tickles!",
  "Again, again!",
  "Hee hee hee!",
  "Careful, I wobble!",
];
const AWAKE_LINE = "You found my wish star! Hmm hmm hmmm...";

// Sparkle positions (percent of the picture) for the awake moment
const SPARKS: Array<[number, number, string, number]> = [
  [22, 18, "✦", 0],
  [76, 14, "✧", 120],
  [10, 44, "✧", 240],
  [88, 50, "✦", 360],
  [34, 6, "✦", 480],
  [64, 5, "✧", 600],
];

type PipFaceProps = {
  awake: boolean;
  mood: Mood;
};

export function PipFace({ awake, mood }: PipFaceProps) {
  const stageRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const tickles = useRef(0);
  const [line, setLine] = useState(HINT);
  const shownMood = useRef(mood);

  // Pip says something whenever the mood changes (not on first load)
  useEffect(() => {
    if (shownMood.current === mood) return;
    shownMood.current = mood;
    setLine(MOOD_INFO[mood].line);
  }, [mood]);

  // Eye tracking: mouse only, off for touch and reduced motion
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || reduce.matches || !stage) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.4;
        const dx = Math.max(-1, Math.min(1, (event.clientX - cx) / 400));
        const dy = Math.max(-1, Math.min(1, (event.clientY - cy) / 400));
        stage.style.setProperty("--ex", dx.toFixed(3));
        stage.style.setProperty("--ey", dy.toFixed(3));
      });
    }

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  function tickle() {
    play.giggle();
    setLine(GIGGLES[tickles.current % GIGGLES.length]);
    tickles.current += 1;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bodyRef.current?.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { transform: "translateY(-4%) scale(0.97, 1.04)" },
        { transform: "translateY(0) scale(1.04, 0.96)" },
        { transform: "translateY(-1.5%) scale(1, 1)" },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      { duration: 650, easing: "ease-out" }
    );
  }

  const shown = awake ? AWAKE_LINE : line;

  return (
    <div className="pip-wrap">
      <button
        ref={stageRef}
        type="button"
        className={`pip-stage pip-mood-${mood} ${awake ? "is-awake" : ""}`}
        onClick={tickle}
        aria-label="Tickle Pip"
      >
        <span ref={bodyRef} className="pip-body">
          <img
            className="pip-img"
            src="/pip_avatar_cloud.png"
            alt="Pip, a baby skull in a starry nightcap with a pink bow, waving from a cloud"
            width={896}
            height={1090}
          />

          <span className="pip-eye pip-eye-left" aria-hidden="true">
            <span className="pip-glint" />
          </span>
          <span className="pip-eye pip-eye-right" aria-hidden="true">
            <span className="pip-glint" />
          </span>

          <span className="pip-lid pip-lid-left" aria-hidden="true" />
          <span className="pip-lid pip-lid-right" aria-hidden="true" />

          {mood === "sleepy" && (
            <span className="pip-zzz" aria-hidden="true">
              z z z
            </span>
          )}
          {mood === "dreamy" && (
            <>
              <span className="pip-dream" aria-hidden="true" style={{ left: "17%", top: "27%" }}>
                ✦
              </span>
              <span
                className="pip-dream"
                aria-hidden="true"
                style={{ left: "80%", top: "30%", animationDelay: "1.4s" }}
              >
                ✧
              </span>
            </>
          )}

          {awake &&
            SPARKS.map(([left, top, glyph, delay], index) => (
              <span
                key={index}
                className="pip-spark"
                aria-hidden="true"
                style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}ms` }}
              >
                {glyph}
              </span>
            ))}
        </span>
      </button>

      <p className="pip-bubble" key={shown} aria-live="polite">
        {shown}
      </p>
    </div>
  );
}