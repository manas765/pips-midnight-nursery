import { useEffect } from "react";
import { play } from "./audio";

// One delegated listener: chime on main buttons, nav links and project cards.
const SELECTOR =
  ".button, .nav-cta, .utility-button, .project-card, .modal-close, .navigation a";

export function useClickChimes() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(SELECTOR)) play.chime();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
