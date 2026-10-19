import { useViewport } from "./useViewport";
import "./chaos.css";

const STICKERS = [
  { text: "☾", label: "moon", cls: "s1" },
  { text: "✦", label: "star", cls: "s2" },
  { text: "♡", label: "heart", cls: "s3" },
  { text: "★", label: "big star", cls: "s4" },
  { text: "✧", label: "sparkle", cls: "s5" },
  { text: "☁", label: "cloud", cls: "s6" },
];

const RIBBON = [
  "PIP'S MIDNIGHT NURSERY",
  "DREAMS UNDER CONSTRUCTION",
  "PLEASE IGNORE THE WOBBLING",
  "NO SILENCE ALLOWED",
];

// Retro, whimsical decoration that scales with the screen:
// desktop = 6 stickers + marquee, tablet = 3 stickers + marquee, phone = neither.
export default function ChaosLayer() {
  const tier = useViewport();
  if (tier === "phone") return null;

  const count = tier === "desktop" ? 6 : 3;
  const items = [...RIBBON, ...RIBBON];

  return (
    <>
      <div className="chaos-stickers" aria-hidden="true">
        {STICKERS.slice(0, count).map((s) => (
          <span key={s.cls} className={`chaos-sticker ${s.cls}`}>
            {s.text}
          </span>
        ))}
      </div>

      <div className="chaos-ribbon" aria-hidden="true">
        <div className="chaos-ribbon-track">
          {[0, 1].map((copy) => (
            <div className="chaos-ribbon-set" key={copy}>
              {items.map((t, i) => (
                <span key={i}>
                  {t} <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
