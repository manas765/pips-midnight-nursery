import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "../lib";
import { supabase } from "../supabase";
import { useModalA11y } from "../useModalA11y";
import "../systems.css";

const MAX_MESSAGE = 300;
const MAX_NAME = 40;
const COOLDOWN_MS = 30_000;
const COOLDOWN_KEY = "pip-guestbook-last";
const REFRESH_EVENT = "pip-guestbook-refresh";

// Simple client-side filter. Extend as needed.
const BANNED = [
  "fuck", "shit", "bitch", "asshole", "bastard", "dick", "cunt",
  "slut", "whore", "nigger", "faggot", "retard", "kys",
  "kill yourself", "porn", "nazi",
];

type Note = {
  id: number | string;
  name: string | null;
  message: string;
  created_at?: string;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/[@]/g, "a")
    .replace(/[$]/g, "s")
    .replace(/[^a-z\s]/g, "");
}

function hasBannedWord(text: string) {
  const clean = ` ${normalize(text).replace(/\s+/g, " ")} `;
  return BANNED.some((word) => clean.includes(` ${word} `));
}

function tidy(text: string) {
  // Strip control characters and collapse whitespace. Rendered as plain text only.
  // eslint-disable-next-line no-control-regex
  return text.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

function cooldownLeft(): number {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    return Math.max(0, COOLDOWN_MS - (Date.now() - last));
  } catch {
    return 0;
  }
}

function startCooldown() {
  try {
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

const NOTE_COLORS = ["#fff1a8", "#ffd1e3", "#d6e4ff", "#d9f5df"];

function GuestbookWall() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) {
      setNotes([]);
      return;
    }
    const { data, error } = await supabase
      .from("guestbook")
      .select("id,name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error || !data) {
      setFailed(true);
      setNotes([]);
      return;
    }
    setFailed(false);
    setNotes(data as Note[]);
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(REFRESH_EVENT, load);
    return () => window.removeEventListener(REFRESH_EVENT, load);
  }, [load]);

  if (notes === null) {
    return <p className="gb-status">Pip is fetching the notes...</p>;
  }

  if (notes.length === 0) {
    return (
      <p className="gb-status">
        {failed
          ? "The wall is napping right now. Try again in a bit."
          : "The wall is empty and I hate silence. Be the first to say hi!"}
      </p>
    );
  }

  return (
    <ul className="gb-wall" aria-label="Notes left for Pip">
      {notes.map((note, i) => {
        const seed = typeof note.id === "number" ? note.id : i;
        const tilt = ((seed * 37) % 7) - 3;
        return (
          <li
            key={note.id}
            className="gb-note"
            style={{
              background: NOTE_COLORS[Math.abs(seed) % NOTE_COLORS.length],
              transform: `rotate(${tilt}deg)`,
            }}
          >
            <p className="gb-note-text">{note.message}</p>
            <span className="gb-note-name">
              {note.name?.trim() || "A little wanderer"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

type GuestbookSectionProps = {
  onOpen: () => void;
};

export function GuestbookSection({ onOpen }: GuestbookSectionProps) {
  return (
    <section className="guestbook-section section-wrap">
      <div className="guestbook-card" data-reveal>
        <div className="guestbook-cloud cloud-left" />
        <div className="guestbook-cloud cloud-right" />

        <div className="guestbook-stars">✦　✧　☾　✧　✦</div>
        <span className="guestbook-kicker">BEFORE YOU WANDER OFF</span>

        <h2>
          Leave a little
          <br />
          <em>stardust.</em>
        </h2>

        <p>
          Tell Pip a thought, a wish or just a tiny hello.
          Every little note belongs somewhere.
        </p>

        <button className="button button-light" onClick={onOpen}>
          Leave a little note <ArrowIcon />
        </button>
      </div>

      <GuestbookWall />
    </section>
  );
}

type GuestbookModalProps = {
  onClose: () => void;
};

export function GuestbookModal({ onClose }: GuestbookModalProps) {
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [guestSubmitted, setGuestSubmitted] = useState(false);
  const [savedOnline, setSavedOnline] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  useModalA11y(onClose, false);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const message = tidy(guestMessage).slice(0, MAX_MESSAGE);
    const name = tidy(guestName).slice(0, MAX_NAME);

    if (trap) return; // honeypot, bots fill hidden fields
    if (!message) {
      setError("Please write a little note first.");
      return;
    }
    if (hasBannedWord(message) || hasBannedWord(name)) {
      setError("Let's keep Pip's wall kind and cozy. Please reword your note.");
      return;
    }
    const wait = cooldownLeft();
    if (wait > 0) {
      setError(
        `Pip is still reading your last note. Try again in ${Math.ceil(wait / 1000)}s.`
      );
      return;
    }

    setBusy(true);
    if (supabase) {
      const { error: insertError } = await supabase
        .from("guestbook")
        .insert({ name: name || null, message });
      if (insertError) {
        setBusy(false);
        setError("Pip dropped your note. Please try again in a moment.");
        return;
      }
      setSavedOnline(true);
      window.dispatchEvent(new Event(REFRESH_EVENT));
    } else {
      setSavedOnline(false);
    }
    startCooldown();
    setGuestName(name);
    setGuestMessage(message);
    setBusy(false);
    setGuestSubmitted(true);
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="secret-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guestbook-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          aria-label="Close guestbook"
          onClick={onClose}
        >
          ×
        </button>

        {guestSubmitted ? (
          <>
            <div className="secret-moon">✧</div>
            <span className="guestbook-kicker">YOUR NOTE IS RIGHT HERE</span>

            <h2 id="guestbook-title">
              Thank <em>you.</em>
            </h2>

            <p>
              {guestName.trim() ? `Dear ${guestName.trim()}, ` : ""}
              {savedOnline
                ? "your note is now pinned to Pip's wall."
                : "Pip can only show your note for this visit right now."}
            </p>

            <div className="secret-signature">“{guestMessage}”</div>

            <button className="button button-light" onClick={onClose}>
              Back to the nursery <ArrowIcon />
            </button>
          </>
        ) : (
          <>
            <div className="secret-constellation">✦ · ☾ · ✧</div>

            <h2 id="guestbook-title">
              A note for <em>Pip.</em>
            </h2>

            <p>
              A little hello, a wish for the world, or a thought
              you want to leave beneath the stars.
            </p>

            <form className="gb-form" onSubmit={submit} noValidate>
              <label htmlFor="guest-name">Your name (optional)</label>
              <input
                ref={firstField}
                id="guest-name"
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder="A little wanderer"
                maxLength={MAX_NAME}
                autoComplete="nickname"
              />

              <label htmlFor="guest-message">Your little note</label>
              <textarea
                id="guest-message"
                value={guestMessage}
                onChange={(event) => setGuestMessage(event.target.value)}
                placeholder="Tonight, I'm wishing for..."
                rows={4}
                maxLength={MAX_MESSAGE}
                required
              />
              <span className="gb-count" aria-live="polite">
                {guestMessage.length}/{MAX_MESSAGE}
              </span>

              <input
                className="gb-trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={trap}
                onChange={(event) => setTrap(event.target.value)}
                name="website"
              />

              {error && (
                <p className="gb-error" role="alert">
                  {error}
                </p>
              )}

              <button className="button button-light" type="submit" disabled={busy}>
                {busy ? "Sending..." : "Leave my little note"} <ArrowIcon />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
