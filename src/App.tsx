import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import { isMuted, setMuted, subscribe } from "./audio";
import { GrowthChart } from "./components/GrowthChart";
import { useClickChimes } from "./useClickChimes";
import SparkleTrail from "./SparkleTrail";
import { ArrowIcon, handleTilt, resetTilt } from "./lib";

import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Projects, type Project } from "./components/Projects";
import RouteMap from "./components/RouteMap";
import { About } from "./components/About";
import { GuestbookSection, GuestbookModal } from "./components/Guestbook";
import { ProjectModal, SecretModal } from "./components/Modals";
import LullabyLab from "./components/LullabyLab";
import { Nightlights } from "./components/toys/Nightlights";

function DoodleMoon() {
  return <span className="doodle-moon">☾</span>;
}

function CloudCluster() {
  return <span className="cloud-cluster">☁</span>;
}

function MapMoon() {
  return <span aria-hidden="true" className="map-moon">☾</span>;
}

function ChaosLayer() {
  return <SparkleTrail />;
}

function Counter() {
  return <span className="visitor-counter">A little corner of wonder ✦</span>;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [dawnMode, setDawnMode] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestSubmitted, setGuestSubmitted] = useState(false);
  const [glow, setGlow] = useState(0);

  const muted = useSyncExternalStore(subscribe, isMuted, isMuted);
  const soundOn = !muted;

  useClickChimes();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function scrollToSection(id: string) {
    closeMobileMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleSound() {
    setMuted(soundOn);
  }

  return (
    <div className={`site-shell ${dawnMode ? "theme-dawn" : ""}`}>
      <div className="announcement-bar">
        <span className="star-glyph">✦</span>
        <span>A LITTLE CORNER OF THE INTERNET</span>
        <span className="announcement-divider">/</span>
        <span className="announcement-soft">Made of dreams and stardust</span>
        <span className="star-glyph">✦</span>
      </div>

      <header className="site-header">
        <a
          href="#home"
          className="brand"
          onClick={closeMobileMenu}
        >
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-moon">☾</span>
            <span className="brand-dot">✦</span>
          </span>
          <span className="brand-copy">
            <strong>PIP&apos;S MIDNIGHT</strong>
            <small>A NURSERY FOR LITTLE WONDERS</small>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`navigation ${mobileMenuOpen ? "navigation-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#story" onClick={closeMobileMenu}>The Story</a>
          <a href="#work" onClick={closeMobileMenu}>Little Things</a>
          <a href="#route" onClick={closeMobileMenu}>Find Your Way</a>
          <a href="#about" onClick={closeMobileMenu}>About Pip</a>
          <button
            className="nav-cta"
            onClick={() => {
              closeMobileMenu();
              setGuestbookOpen(true);
              setGuestSubmitted(false);
            }}
          >
            Leave a little note <ArrowIcon />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              A TINY UNIVERSE OF ITS OWN
              <span>✦</span>
            </div>

            <p className="hero-pretitle">Hello, little wanderer.</p>

            <h1>
              Pip&apos;s
              <br />
              Midnight
              <br />
              <em>Nursery</em>
              <span className="heading-period">.</span>
            </h1>

            <p className="hero-description">
              A dreamy little hideaway for curious souls, soft thoughts
              and the magic hiding in the ordinary. Take a breath.
              You&apos;re right where you belong.
            </p>

            <div className="hero-actions">
              <button
                className="button button-primary"
                onClick={() => scrollToSection("story")}
              >
                Come on in <ArrowIcon />
              </button>

              <button
                className="text-link"
                onClick={() => scrollToSection("work")}
              >
                <span className="play-symbol">▷</span>
                Explore the little things
              </button>
            </div>

            <div className="hero-signoff">
              <div className="mini-avatars" aria-hidden="true">
                <span>☾</span>
                <span>✿</span>
                <span>✦</span>
              </div>
              <span>
                A little space to <strong>dream out loud.</strong>
              </span>
            </div>
          </div>

          <div
            className="hero-art-area"
            onPointerMove={(event) => handleTilt(event, 9)}
            onPointerLeave={resetTilt}
          >
            <div className="hero-art-halo" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="hero-art-card">
              <img
                src="/pip_dream_lantern.webp"
                alt="Pip's magical dream lantern"
                className="hero-art-image"
              />
              <div className="card-glare" aria-hidden="true" />
            </div>

            <div className="floating-note note-lantern">
              <span className="note-icon">☼</span>
              <span>
                <strong>A little warmth</strong>
                <small>For your midnight thoughts</small>
              </span>
            </div>

            <div className="floating-note note-dream">
              <span className="note-icon note-sparkle">✧</span>
              <span>
                <strong>Dream something lovely</strong>
                <small>There is no rush here</small>
              </span>
            </div>

            <span className="hero-twinkle twinkle-a">✦</span>
            <span className="hero-twinkle twinkle-b">✧</span>
            <span className="hero-twinkle twinkle-c">✳</span>

            <button
              className="secret-star"
              aria-label="Discover a secret"
              title="Psst... tap me"
              onClick={() => setSecretOpen(true)}
            >
              ✦
            </button>

            <div className="hero-stamp">
              <span>✿</span>
              <small>Made with<br />a little magic</small>
            </div>
          </div>

          <div className="hero-bottom-line">
            <span className="scroll-line" />
            SCROLL SLOWLY, THERE&apos;S NO RUSH
          </div>
        </section>

        <div className="intro-strip">
          <div className="strip-inner">
            <span><i>✦</i> SOFT THOUGHTS</span>
            <span>☾ MIDNIGHT MAGIC</span>
            <span><i>✦</i> LITTLE DISCOVERIES</span>
            <span>♡ A PLACE TO BELONG</span>
            <span><i>✦</i> SOFT THOUGHTS</span>
            <span>☾ MIDNIGHT MAGIC</span>
          </div>
        </div>

        <Story />
        <Projects onSelect={setSelectedProject} />
        <RouteMap
          moon={<MapMoon />}
          onNext={() => scrollToSection("about")}
        />
        <GrowthChart />
        <About />
        
        <section className="guestbook-section section-wrap" id="guestbook">
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

            <button
              className="button button-light"
              onClick={() => {
                setGuestbookOpen(true);
                setGuestSubmitted(false);
              }}
            >
              Leave a little note <ArrowIcon />
            </button>
          </div>
        </section>
      </main>

      <ChaosLayer />

      <footer className="site-footer">
        <a className="footer-brand" href="#home">
          <span className="brand-mark">
            <span className="brand-moon">☾</span>
            <span className="brand-dot">✦</span>
          </span>
          PIP&apos;S MIDNIGHT NURSERY
        </a>

        <span className="footer-note">A tiny reminder to keep dreaming.</span>
        <Counter />
        <span className="footer-credit">MADE WITH ♡ AND A LITTLE MAGIC</span>
      </footer>

      <div className="utility-controls">
        <button
          className="utility-button"
          onClick={() => setDawnMode((mode) => !mode)}
          aria-label={dawnMode ? "Switch to midnight theme" : "Switch to dawn theme"}
        >
          <span>{dawnMode ? "☾" : "☼"}</span>
          <small>{dawnMode ? "Midnight" : "Dawn mode"}</small>
        </button>

        <button
          className={`utility-button ${soundOn ? "sound-on" : ""}`}
          onClick={toggleSound}
          aria-label="Toggle sound preference"
          title={soundOn ? "Turn lullaby sound off" : "Allow lullaby sound"}
        >
          <span>{soundOn ? "♫" : "♪"}</span>
          <small>{soundOn ? "Sound on" : "Sound off"}</small>
        </button>
      </div>

      {selectedProject && (
        <div
          className={`modal-backdrop ${
            selectedProject.title === "Nightlight Collection"
              ? "lights-backdrop"
              : ""
          }`}
          style={{ "--glow": glow } as CSSProperties}
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>

            <div
              className="modal-art"
              style={{
                background: "radial-gradient(circle, #fff7e8, #e8d6ed)",
              }}
            >
              <img
                className="modal-art-image"
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
              />
            </div>

            <div className="modal-content">
              <span className="project-category">{selectedProject.category}</span>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p>{selectedProject.details}</p>

              {selectedProject.title === "The Lullaby Lab" && (
                <LullabyLab soundEnabled={soundOn} />
              )}

              {selectedProject.title === "Nightlight Collection" && (
                <Nightlights soundEnabled={soundOn} onGlow={setGlow} />
              )}

              <div className="modal-note">
                <span>✧</span>
                {selectedProject.note}
              </div>

              <button
                className="button button-primary"
                onClick={() => {
                  const toRoute =
                    selectedProject.title === "Dream Delivery Routes";

                  setSelectedProject(null);

                  if (toRoute) {
                    window.setTimeout(() => scrollToSection("route"), 60);
                  }
                }}
              >
                {selectedProject.title === "Dream Delivery Routes"
                  ? "Follow my route"
                  : "Back to the little things"}{" "}
                <ArrowIcon />
              </button>
            </div>
          </section>
        </div>
      )}

      {secretOpen && (
        <div
          className="modal-backdrop secret-backdrop"
          onClick={() => setSecretOpen(false)}
          role="presentation"
        >
          <section
            className="secret-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close secret"
              onClick={() => setSecretOpen(false)}
            >
              ×
            </button>

            <div className="secret-constellation">✧ · ✦ · ✧ · ✦ · ✧</div>
            <div className="secret-moon">☾</div>
            <span className="guestbook-kicker">YOU FOUND A LITTLE SECRET</span>
            <h2 id="secret-title">
              A wish for <em>you.</em>
            </h2>
            <p>
              May you find a little magic in an ordinary day, a little
              peace in a noisy world, and a reason to smile when you
              least expect it.
            </p>
            <div className="secret-signature">
              Keep this close, <strong>little wanderer.</strong>
            </div>
            <button
              className="button button-light"
              onClick={() => setSecretOpen(false)}
            >
              I&apos;ll remember that ✦
            </button>
          </section>
        </div>
      )}

      {guestbookOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setGuestbookOpen(false)}
          role="presentation"
        >
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
              onClick={() => setGuestbookOpen(false)}
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
                <div className="secret-signature">
                  “{guestMessage.trim()}”
                </div>
                <button
                  className="button button-light"
                  onClick={() => setGuestbookOpen(false)}
                >
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
      )}
    </div>
  );
}

export default App;
