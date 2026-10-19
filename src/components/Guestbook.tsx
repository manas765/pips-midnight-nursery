import { useState } from "react";
import { ArrowIcon } from "../lib";

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
    </section>
  );
}

type GuestbookModalProps = {
  onClose: () => void;
};

export function GuestbookModal({ onClose }: GuestbookModalProps) {
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestSubmitted, setGuestSubmitted] = useState(false);

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
              Thank you for leaving a little kindness in Pip&apos;s
              corner of the world. Your note is shown here for this
              visit, but it hasn&apos;t been saved to a server.
            </p>

            <div className="secret-signature">“{guestMessage.trim()}”</div>

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

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (guestMessage.trim()) setGuestSubmitted(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                textAlign: "left",
                maxWidth: "340px",
                margin: "0 auto",
              }}
            >
              <label
                htmlFor="guest-name"
                style={{ fontSize: "11px", color: "#e7d6ed" }}
              >
                Your name (optional)
              </label>

              <input
                id="guest-name"
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder="A little wanderer"
                maxLength={60}
                style={{
                  width: "100%",
                  padding: "12px",
                  color: "#fff5f2",
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(235,210,255,.35)",
                  outlineOffset: "3px",
                }}
              />

              <label
                htmlFor="guest-message"
                style={{ fontSize: "11px", color: "#e7d6ed" }}
              >
                Your little note
              </label>

              <textarea
                id="guest-message"
                value={guestMessage}
                onChange={(event) => setGuestMessage(event.target.value)}
                placeholder="Tonight, I'm wishing for..."
                rows={4}
                maxLength={500}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  resize: "vertical",
                  color: "#fff5f2",
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(235,210,255,.35)",
                  font: "inherit",
                  fontSize: "12px",
                }}
              />

              <button className="button button-light" type="submit">
                Leave my little note <ArrowIcon />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}