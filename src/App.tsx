import { MOOD_INFO, nextMood, type Mood } from "./mood";
import { useEffect, useState, useSyncExternalStore } from "react";
import { isMuted, setMuted, subscribe } from "./audio";
import { useClickChimes } from "./useClickChimes";
import SparkleTrail from "./SparkleTrail";
import { ArrowIcon } from "./lib";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Projects, type Project } from "./components/Projects";
import { RouteMap } from "./components/RouteMap";
import { About } from "./components/About";
import { GuestbookSection, GuestbookModal } from "./components/Guestbook";
import { ProjectModal, SecretModal } from "./components/Modals";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [dawnMode, setDawnMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestSubmitted, setGuestSubmitted] = useState(false);
  const [glow, setGlow] = useState(0);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return undefined;
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
          aria-label="Pip's Midnight Nursery home"
          onClick={closeMobileMenu}
        >
          <span className="brand-mark">
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        {/* HERO */}
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
                src="/pip_dream_lantern.png"
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

        {/* DISCOVERY STRIP */}
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

        {/* STORY */}
        <section className="story-section section-padding" id="story">
          <div className="section-label" data-reveal>
            <span>01 / A SMALL BEGINNING</span>
            <span>EVERY LITTLE WORLD STARTS SOMEWHERE</span>
          </div>

          <div className="story-heading-grid" data-reveal>
            <h2>
              Every dream
              <br />
              has a <em>beginning.</em>
            </h2>
            <p className="section-intro">
              This is the story of a little place built for big feelings,
              wild imaginations and the wonderful art of simply being.
            </p>
          </div>

          <div className="story-timeline">
            <article
              className="story-stop"
              data-reveal
              style={{ "--reveal-delay": "0ms" } as CSSProperties}
            >
              <span className="timeline-marker">01</span>
              <div className="story-card story-card-one">
                <span className="story-kicker">ONCE UPON A NIGHT</span>
                <h3>A little spark</h3>
                <p>
                  It started with a simple thought: what if the internet
                  had a softer corner? Somewhere you could wander without
                  needing to be anything other than yourself.
                </p>
                <div className="story-doodle" aria-hidden="true">
                  <DoodleMoon />
                </div>
              </div>
            </article>

            <article
              className="story-stop"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as CSSProperties}
            >
              <span className="timeline-marker">02</span>
              <div className="story-card story-card-two">
                <span className="story-kicker">A WORLD TAKES SHAPE</span>
                <h3>Room for wonder</h3>
                <p>
                  Little stories found their way in. Colours became
                  constellations, quiet moments became treasures, and
                  ordinary days grew a sprinkle of magic.
                </p>
                <div className="story-clouds" aria-hidden="true">
                  <CloudCluster />
                </div>
              </div>
            </article>

            <article
              className="story-stop"
              data-reveal
              style={{ "--reveal-delay": "280ms" } as CSSProperties}
            >
              <span className="timeline-marker">03</span>
              <div className="story-card story-card-three">
                <span className="story-kicker">AND NOW, YOU&apos;RE HERE</span>
                <h3>Your own little corner</h3>
                <p>
                  And now there&apos;s room for you, too. Bring your
                  curiosity, your half-finished dreams and whatever
                  happens to be on your mind tonight.
                </p>
                <div className="story-signature">
                  With love, <strong>Pip</strong> ✧
                </div>
              </div>
            </article>
          </div>

          <p className="story-footnote" data-reveal>
            <span className="tiny-moon">☾</span>
            The best stories are the ones we get to keep adding to.
          </p>
        </section>

        {/* LITTLE THINGS */}
        <section className="work-section section-padding" id="work">
          <div className="section-wrap">
            <div className="section-label" data-reveal>
              <span>02 / LITTLE THINGS</span>
              <span>SMALL WORLDS, ENDLESS POSSIBILITIES</span>
            </div>

            <div className="work-heading-grid" data-reveal>
              <h2>
                A shelf full
                <br />
                of <em>wonder.</em>
              </h2>
              <p className="section-intro">
                Little ideas, dreamy places and stories waiting to be
                discovered. Pick whichever one calls your name.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <div
                  className="project-reveal"
                  data-reveal
                  key={project.number}
                  style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
                >
                  <button
                    className={`project-card project-card-${project.number.slice(-1)}`}
                    onClick={() => setSelectedProject(project)}
                    onPointerMove={(event) => handleTilt(event, 8)}
                    onPointerLeave={resetTilt}
                  >
                    <span className="project-card-top">
                      <span>NO. {project.number}</span>
                      <span className="project-open">↗</span>
                    </span>

                    <span className="project-image">
                      <span className="image-orbit orbit-project" />
                      <img
                        className="project-art-image"
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          right: "17%",
                          top: "18%",
                          color: "#b294c5",
                          fontSize: "22px",
                        }}
                      >
                        ✦
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "15%",
                          bottom: "15%",
                          color: "#c19ab8",
                          fontSize: "18px",
                        }}
                      >
                        ✧
                      </span>
                    </span>

                    <span className="project-copy">
                      <span className="project-category">{project.category}</span>
                      <span
                        style={{
                          fontFamily: "var(--display)",
                          fontSize: "25px",
                          fontWeight: 500,
                          letterSpacing: "-.035em",
                          margin: "12px 0 8px",
                        }}
                      >
                        {project.title}
                      </span>
                      <span className="project-description-text">
                        {project.description}
                      </span>
                      <span className="project-read-more">
                        Take a closer look <ArrowIcon />
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </div>

            <p className="work-caption" data-reveal>
              <span>✦</span> Made for curious minds and wonderfully wandering hearts <span>✦</span>
            </p>
          </div>
        </section>

        {/* ROUTE MAP */}
        <RouteMap moon={<MapMoon />} onNext={() => scrollToSection("about")} />

        {/* ABOUT PIP */}
        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-art" data-reveal>
              <div
                className="about-art-circle"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, #fff8e9, #e5cfe7 65%, #c3a6d4)",
                }}
              >
                <div style={{ width: "100%", aspectRatio: "1", padding: "6%" }}>
                  <img
                    src="/pip_portrait.png"
                    alt="Pip, the little dreamer"
                    className="about-art-image"
                  />
                </div>
              </div>
              <span className="about-sparkle sparkle-one">✦</span>
              <span className="about-sparkle sparkle-two">✧</span>
              <span className="about-art-label">A LITTLE LOVE LETTER TO WONDER</span>
            </div>

            <div
              className="about-copy"
              data-reveal
              style={{ "--reveal-delay": "150ms" } as CSSProperties}
            >
              <div className="section-label">
                <span>04 / A NOTE FROM PIP</span>
              </div>

              <h2>
                A little softer.
                <br />
                A little <em>closer.</em>
              </h2>

              <p className="about-lead">
                I think there should always be a place where you can
                put the world down for a while.
              </p>

              <p>
                Pip&apos;s Midnight Nursery is a tiny reminder that you
                don&apos;t have to have everything figured out. You can
                be a work in progress. You can change your mind. You
                can start again tomorrow.
              </p>

              <div className="trait-list">
                <span>Curiosity first</span>
                <span>Softness always</span>
                <span>Wonder without limits</span>
              </div>

              <blockquote className="about-quote">
                “You are allowed to grow at your own pace.”
                <span>— A LITTLE REMINDER FROM PIP</span>
              </blockquote>
            </div>
          </div>
        </section>

        {/* GUESTBOOK */}
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

      {/* FOOTER */}
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

      {/* THEME AND SOUND CONTROLS */}
      <div className="utility-controls">
        <button
          className="utility-button"
          onClick={() => setDawnMode(!dawnMode)}
          aria-label={dawnMode ? "Switch to midnight theme" : "Switch to dawn theme"}
        >
          <span>{dawnMode ? "☾" : "☼"}</span>
          <small>{dawnMode ? "Midnight" : "Dawn mode"}</small>
        </button>

        <button
          className={`utility-button ${soundOn ? "sound-on" : ""}`}
          onClick={() => setSoundOn(!soundOn)}
          aria-label="Toggle sound preference"
          title={soundOn ? "Turn lullaby sound off" : "Allow lullaby sound"}
        >
          <span>{soundOn ? "♫" : "♪"}</span>
          <small>{soundOn ? "Sound on" : "Sound off"}</small>
        </button>
      </div>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className={`modal-backdrop ${selectedProject.title === "Nightlight Collection" ? "lights-backdrop" : ""}`}
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
              <span className="project-category">
                {selectedProject.category}
              </span>
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
                  const toRoute = selectedProject.title === "Dream Delivery Routes";
                  setSelectedProject(null);
                  if (toRoute) window.setTimeout(() => scrollToSection("route"), 60);
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

      {/* SECRET STAR MODAL */}
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

      {/* GUESTBOOK MODAL */}
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
                  <label htmlFor="guest-name" style={{ fontSize: "11px", color: "#e7d6ed" }}>
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

                  <label htmlFor="guest-message" style={{ fontSize: "11px", color: "#e7d6ed" }}>
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