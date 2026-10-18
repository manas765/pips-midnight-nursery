import { useState } from "react";

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  symbol: string;
  details: string;
  note: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "DREAM JOURNAL",
    title: "The Cloud Keeper",
    description: "A little collection of dreams, clouds and things worth remembering.",
    symbol: "☁️",
    details:
      "The Cloud Keeper is a gentle dream-journaling concept. Collect little moments, save the things you dream about and turn fleeting thoughts into a tiny personal archive.",
    note: "A place for your thoughts to land softly.",
  },
  {
    number: "02",
    category: "CREATIVE PLAY",
    title: "Moonlight Garden",
    description: "A whimsical little world where every night brings a new discovery.",
    symbol: "🌷",
    details:
      "Moonlight Garden explores a magical garden that comes alive after sunset. Discover tiny details, follow glowing paths and find something new every time you visit.",
    note: "For curious minds and midnight wanderers.",
  },
  {
    number: "03",
    category: "LITTLE STORIES",
    title: "The Star Collector",
    description: "A story about small wonders, faraway places and finding your own light.",
    symbol: "🌟",
    details:
      "The Star Collector is a story concept about collecting moments of wonder. Every star represents a memory, a lesson or a small act of kindness.",
    note: "Every little light has a story.",
  },
];

function ArrowIcon() {
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

function HeroMoon() {
  return (
    <svg
      viewBox="0 0 400 440"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="60%" stopColor="#f7e6c8" />
          <stop offset="100%" stopColor="#e9cfdc" />
        </radialGradient>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6dc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff6dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cloudFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e6d4ee" />
        </linearGradient>
        <mask id="crescentMask">
          <rect width="400" height="440" fill="white" />
          <circle cx="232" cy="150" r="82" fill="black" />
        </mask>
        <path
          id="star4"
          d="M0,-10 C1.5,-3 3,-1.5 10,0 C3,1.5 1.5,3 0,10 C-1.5,3 -3,1.5 -10,0 C-3,-1.5 -1.5,-3 0,-10Z"
        />
      </defs>

      {/* halo */}
      <circle cx="190" cy="165" r="150" fill="url(#haloGlow)" />

      {/* crescent moon with craters */}
      <g mask="url(#crescentMask)">
        <circle cx="190" cy="165" r="95" fill="url(#moonGlow)" />
        <circle cx="140" cy="190" r="10" fill="#d9bfd0" opacity="0.5" />
        <circle cx="158" cy="125" r="6" fill="#d9bfd0" opacity="0.45" />
        <circle cx="128" cy="150" r="4" fill="#d9bfd0" opacity="0.4" />
      </g>

      {/* sleepy face on the crescent */}
      <path d="M128 168 q8 7 16 0" stroke="#8a6a8f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M140 196 q6 5 12 0" stroke="#d58fa8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="122" cy="186" r="7" fill="#f2b5c6" opacity="0.6" />

      {/* stars */}
      <g fill="#fff3c9" stroke="#e8cf9a" strokeWidth="0.5">
        <use href="#star4" transform="translate(300 80) scale(1.4)" />
        <use href="#star4" transform="translate(88 82) scale(0.9)" />
        <use href="#star4" transform="translate(320 200) scale(0.7)" />
        <use href="#star4" transform="translate(70 230) scale(0.6)" />
      </g>

      {/* clouds */}
      <g fill="url(#cloudFill)">
        <g transform="translate(40 300)">
          <ellipse cx="60" cy="40" rx="62" ry="20" />
          <circle cx="38" cy="28" r="20" />
          <circle cx="70" cy="20" r="26" />
          <circle cx="98" cy="32" r="18" />
        </g>
        <g transform="translate(205 335) scale(0.85)">
          <ellipse cx="60" cy="40" rx="62" ry="20" />
          <circle cx="38" cy="28" r="20" />
          <circle cx="70" cy="20" r="26" />
          <circle cx="98" cy="32" r="18" />
        </g>
      </g>

      <text
        x="200"
        y="415"
        textAnchor="middle"
        style={{ fontFamily: "var(--display)", fontSize: 28, fill: "#6f587f" }}
      >
        sweet dreams
      </text>
    </svg>
  );
}

function ProjectIcon({ number }: { number: string }) {
  const common = { viewBox: "0 0 100 100", width: "100%", height: "100%" };
  if (number === "01") {
    return (
      <svg {...common} aria-hidden="true">
        <defs>
          <linearGradient id="pc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d9c4ec" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="64" rx="36" ry="13" fill="url(#pc)" />
        <circle cx="34" cy="55" r="15" fill="url(#pc)" />
        <circle cx="54" cy="46" r="20" fill="url(#pc)" />
        <circle cx="72" cy="58" r="12" fill="url(#pc)" />
        <path d="M42 58 q4 4 8 0 M58 58 q4 4 8 0" stroke="#8a6a8f" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (number === "02") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M50 92 V52" stroke="#7fae8e" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 78 q-18 -2 -22 -16 q16 0 22 16Z" fill="#9cc7a8" />
        <path d="M50 70 q16 -2 20 -14 q-15 0 -20 14Z" fill="#8fbd9d" />
        <path d="M30 30 q0 26 20 26 q20 0 20 -26 l-9 8 l-11 -14 l-11 14Z" fill="#e8a2bd" />
        <path d="M50 24 q-6 14 0 32 q6 -18 0 -32Z" fill="#f4c4d6" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <circle cx="50" cy="52" r="34" fill="#fff3c9" opacity="0.5" />
      <path
        d="M50 14 l9 22 l24 2 l-18 16 l6 24 l-21 -13 l-21 13 l6 -24 l-18 -16 l24 -2Z"
        fill="#f6d77f"
        stroke="#e2b955"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="43" cy="50" r="2" fill="#8a6a8f" />
      <circle cx="57" cy="50" r="2" fill="#8a6a8f" />
    </svg>
  );
}

function DoodleMoon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <defs>
        <mask id="doodleMoonMask">
          <rect width="64" height="64" fill="white" />
          <circle cx="36" cy="24" r="17" fill="black" />
        </mask>
      </defs>
      <g mask="url(#doodleMoonMask)">
        <circle cx="26" cy="32" r="20" fill="#b79bc4" />
      </g>
      <path
        d="M50 12 l2.2 6 l6 2.2 l-6 2.2 l-2.2 6 l-2.2 -6 l-6 -2.2 l6 -2.2Z"
        fill="#c9849f"
      />
      <path
        d="M52 42 l1.2 3.2 l3.2 1.2 l-3.2 1.2 l-1.2 3.2 l-1.2 -3.2 l-3.2 -1.2 l3.2 -1.2Z"
        fill="#d9b3c9"
      />
    </svg>
  );
}

function CloudCluster() {
  return (
    <svg viewBox="0 0 160 70" width="100%" height="100%" aria-hidden="true">
      <g fill="#c7a3c4" opacity="0.45">
        <ellipse cx="50" cy="52" rx="44" ry="13" />
        <circle cx="32" cy="42" r="15" />
        <circle cx="54" cy="33" r="20" />
        <circle cx="76" cy="43" r="13" />
      </g>
      <g fill="#c7a3c4" opacity="0.35">
        <ellipse cx="112" cy="56" rx="36" ry="10" />
        <circle cx="98" cy="48" r="12" />
        <circle cx="116" cy="41" r="16" />
        <circle cx="134" cy="49" r="10" />
      </g>
    </svg>
  );
}

function MapMoon() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="mapMoonFill" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fbeefc" />
          <stop offset="100%" stopColor="#d9c2f0" />
        </radialGradient>
        <mask id="mapMoonMask">
          <rect width="100" height="100" fill="white" />
          <circle cx="64" cy="38" r="30" fill="black" />
        </mask>
      </defs>
      <g mask="url(#mapMoonMask)">
        <circle cx="48" cy="52" r="36" fill="url(#mapMoonFill)" />
        <circle cx="30" cy="62" r="5" fill="#bfa6d8" opacity="0.5" />
        <circle cx="38" cy="38" r="3" fill="#bfa6d8" opacity="0.45" />
      </g>
    </svg>
  );
}

function AboutMoon() {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="aboutMoonFill" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="65%" stopColor="#f7e3c4" />
          <stop offset="100%" stopColor="#e8cadb" />
        </radialGradient>
        <radialGradient id="aboutHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6dc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff6dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="aboutCloudFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e3d0ec" />
        </linearGradient>
        <mask id="aboutMoonMask">
          <rect width="300" height="300" fill="white" />
          <circle cx="178" cy="98" r="52" fill="black" />
        </mask>
        <path
          id="aboutStar"
          d="M0,-10 C1.5,-3 3,-1.5 10,0 C3,1.5 1.5,3 0,10 C-1.5,3 -3,1.5 -10,0 C-3,-1.5 -1.5,-3 0,-10Z"
        />
      </defs>

      <circle cx="140" cy="118" r="100" fill="url(#aboutHalo)" />

      <g mask="url(#aboutMoonMask)">
        <circle cx="138" cy="120" r="64" fill="url(#aboutMoonFill)" />
        <circle cx="98" cy="160" r="9" fill="#d9bfd0" opacity="0.5" />
        <circle cx="120" cy="82" r="6" fill="#d9bfd0" opacity="0.45" />
        <circle cx="88" cy="100" r="4" fill="#d9bfd0" opacity="0.4" />
      </g>

      <path d="M88 128 q8 7 16 0" stroke="#8a6a8f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M98 154 q6 5 12 0" stroke="#d58fa8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="84" cy="144" r="7" fill="#f2b5c6" opacity="0.6" />

      <g fill="#fff3c9" stroke="#e8cf9a" strokeWidth="0.5">
        <use href="#aboutStar" transform="translate(216 72) scale(1.3)" />
        <use href="#aboutStar" transform="translate(236 150) scale(0.7)" />
        <use href="#aboutStar" transform="translate(70 66) scale(0.8)" />
      </g>

      <g fill="url(#aboutCloudFill)">
        <g transform="translate(62 186) scale(0.95)">
          <ellipse cx="60" cy="40" rx="62" ry="20" />
          <circle cx="38" cy="28" r="20" />
          <circle cx="70" cy="20" r="26" />
          <circle cx="98" cy="32" r="18" />
        </g>
        <g transform="translate(150 204) scale(0.6)">
          <ellipse cx="60" cy="40" rx="62" ry="20" />
          <circle cx="38" cy="28" r="20" />
          <circle cx="70" cy="20" r="26" />
          <circle cx="98" cy="32" r="18" />
        </g>
      </g>

      <text
        x="150"
        y="268"
        textAnchor="middle"
        style={{ fontFamily: "var(--display)", fontSize: 22, fill: "#72547f" }}
      >
        little by little
      </text>
    </svg>
  );
}

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

          <div className="hero-art-area">
            <div className="hero-art-halo" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div
              className="hero-art-card"
              role="img"
              aria-label="A dreamy nursery illustration with a moon, clouds and stars"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 38%, #fff8e8 0%, #ead6ec 42%, #bca5d1 100%)",
              }}
            >
              <div style={{ width: "100%", height: "100%", padding: "6%" }}>
                <HeroMoon />
              </div>
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
          <div className="section-label">
            <span>01 / A SMALL BEGINNING</span>
            <span>EVERY LITTLE WORLD STARTS SOMEWHERE</span>
          </div>

          <div className="story-heading-grid">
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
            <article className="story-stop">
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

            <article className="story-stop">
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

            <article className="story-stop">
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

          <p className="story-footnote">
            <span className="tiny-moon">☾</span>
            The best stories are the ones we get to keep adding to.
          </p>
        </section>

        {/* LITTLE THINGS */}
        <section className="work-section section-padding" id="work">
          <div className="section-wrap">
            <div className="section-label">
              <span>02 / LITTLE THINGS</span>
              <span>SMALL WORLDS, ENDLESS POSSIBILITIES</span>
            </div>

            <div className="work-heading-grid">
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
              {projects.map((project) => (
                <button
                  className={`project-card project-card-${project.number.slice(-1)}`}
                  key={project.number}
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="project-card-top">
                    <span>NO. {project.number}</span>
                    <span className="project-open">↗</span>
                  </span>

                  <span className="project-image">
                    <span className="image-orbit orbit-project" />
                    <span aria-hidden="true" className="project-art">
                      <ProjectIcon number={project.number} />
                    </span>
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
              ))}
            </div>

            <p className="work-caption">
              <span>✦</span> Made for curious minds and wonderfully wandering hearts <span>✦</span>
            </p>
          </div>
        </section>

        {/* ROUTE MAP */}
        <section className="route-section section-padding" id="route">
          <div className="section-wrap">
            <div className="section-label">
              <span>03 / FIND YOUR WAY</span>
              <span>FOLLOW THE LITTLE LIGHTS</span>
            </div>

            <div className="route-layout">
              <div className="route-copy">
                <span className="route-label">
                  <span className="route-live-dot" />
                  YOUR OWN LITTLE ADVENTURE
                </span>

                <h2>
                  Where will
                  <br />
                  you <em>wander?</em>
                </h2>

                <p>
                  There&apos;s no map for the things that make you feel
                  alive. Just a few little signposts to help you begin.
                  Pick a path, follow a star and see where you end up.
                </p>

                <div className="route-stats">
                  <div>
                    <strong>01</strong>
                    <span>TAKE A BREATH</span>
                  </div>
                  <div>
                    <strong>02</strong>
                    <span>FOLLOW A STAR</span>
                  </div>
                  <div>
                    <strong>∞</strong>
                    <span>KEEP WANDERING</span>
                  </div>
                </div>

                <button
                  className="button button-outline"
                  onClick={() => scrollToSection("about")}
                >
                  Find your next stop <ArrowIcon />
                </button>
              </div>

              <div className="route-map" aria-label="Illustrated map of a dreamy village">
                <div className="map-sky-glow" />
                <span className="map-constellation constellation-a">· ✦ · ✧</span>
                <span className="map-constellation constellation-b">✧ · ✦ ·</span>
                <span className="map-moon" aria-hidden="true">
                  <MapMoon />
                </span>

                <svg
                  className="route-path"
                  viewBox="0 0 500 415"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M45 280 C85 270, 115 210, 170 230 S235 285, 275 205 S350 130, 435 100"
                    fill="none"
                    className="route-path-base"
                  />
                  <path
                    d="M45 280 C85 270, 115 210, 170 230 S235 285, 275 205 S350 130, 435 100"
                    fill="none"
                    className="route-path-runner"
                  />
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

                <div className="map-stop stop-one">
                  <span>01</span>
                  <small>THE BEGINNING</small>
                </div>
                <div className="map-stop stop-two">
                  <span>02</span>
                  <small>THE DREAM GARDEN</small>
                </div>
                <div className="map-stop stop-three">
                  <span>03</span>
                  <small>STARLIGHT HILL</small>
                </div>

                <span className="map-flying-star">✦</span>

                <div className="map-map-label">
                  <span className="map-pin">⌖</span>
                  <span>
                    <strong>Somewhere magical</strong>
                    <small>Just beyond your imagination</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT PIP */}
        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-art">
              <div
                className="about-art-circle"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, #fff8e9, #e5cfe7 65%, #c3a6d4)",
                }}
              >
                <div style={{ width: "100%", aspectRatio: "1", padding: "6%" }}>
                  <AboutMoon />
                </div>
              </div>
              <span className="about-sparkle sparkle-one">✦</span>
              <span className="about-sparkle sparkle-two">✧</span>
              <span className="about-art-label">A LITTLE LOVE LETTER TO WONDER</span>
            </div>

            <div className="about-copy">
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
          <div className="guestbook-card">
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
          title="This is a visual preference toggle; no audio is playing yet."
        >
          <span>{soundOn ? "♫" : "♪"}</span>
          <small>{soundOn ? "Sound on" : "Sound off"}</small>
        </button>
      </div>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="modal-backdrop"
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
              <span style={{ display: "block", width: "min(70%, 200px)", aspectRatio: "1" }}>
                <ProjectIcon number={selectedProject.number} />
              </span>
            </div>

            <div className="modal-content">
              <span className="project-category">
                {selectedProject.category}
              </span>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p>{selectedProject.details}</p>
              <div className="modal-note">
                <span>✧</span>
                {selectedProject.note}
              </div>
              <button
                className="button button-primary"
                onClick={() => setSelectedProject(null)}
              >
                Back to the little things <ArrowIcon />
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