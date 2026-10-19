import { useLayoutEffect, useState } from "react";

export type Tier = "phone" | "tablet" | "desktop";

const PHONE_MAX = 700;
const TABLET_MAX = 1024;

function tierFor(width: number): Tier {
  if (width < PHONE_MAX) return "phone";
  if (width < TABLET_MAX) return "tablet";
  return "desktop";
}

// Writes the viewport state onto <html> so chaos.css can reshape the whole site:
//   data-vp="phone|tablet|desktop", --vw (px), --chaos (0 at 320px up to 1 at 1440px)
function apply(width: number): Tier {
  const tier = tierFor(width);
  const root = document.documentElement;
  const chaos = Math.min(1, Math.max(0, (width - 320) / (1440 - 320)));
  root.dataset.vp = tier;
  root.style.setProperty("--vw", `${width}px`);
  root.style.setProperty("--chaos", chaos.toFixed(3));
  return tier;
}

export function useViewport(): Tier {
  const [tier, setTier] = useState<Tier>(() =>
    typeof window === "undefined" ? "desktop" : apply(window.innerWidth)
  );

  useLayoutEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTier(apply(window.innerWidth)));
    };
    setTier(apply(window.innerWidth));
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return tier;
}
