import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./systems.css";

const FALLBACK = 1204;
const SESSION_KEY = "pip-counted";

let pending: Promise<number> | null = null;

async function loadCount(): Promise<number> {
  if (!supabase) return FALLBACK;
  try {
    let counted = false;
    try {
      counted = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!counted) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      const { data, error } = await supabase.rpc("increment_counter");
      if (!error && data != null) return Number(data);
    }
    const { data, error } = await supabase
      .from("counter")
      .select("count")
      .eq("id", 1)
      .single();
    if (!error && data) return Number(data.count);
  } catch {
    /* fall through */
  }
  return FALLBACK;
}

function Digit({ value }: { value: number }) {
  return (
    <span className="odo-digit" aria-hidden="true">
      <span
        className="odo-strip"
        style={{ transform: `translateY(${-value}em)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  );
}

export default function Counter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    pending ??= loadCount();
    pending.then((n) => {
      if (!cancelled) setCount(n);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = count ?? 0;
  const text = shown.toLocaleString("en-US");
  // Before the number loads, show zeros sized like the fallback.
  const chars =
    count === null ? FALLBACK.toLocaleString("en-US").replace(/\d/g, "0") : text;

  return (
    <span
      className="odometer"
      role="status"
      aria-label={`Dreams delivered: ${text}`}
    >
      <span className="odo-label">Dreams delivered:</span>
      <span className="odo-digits">
        {chars.split("").map((ch, i) =>
          /\d/.test(ch) ? (
            <Digit key={i} value={Number(ch)} />
          ) : (
            <span key={i} className="odo-sep" aria-hidden="true">
              {ch}
            </span>
          )
        )}
      </span>
    </span>
  );
}
