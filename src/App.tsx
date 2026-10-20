import { MOOD_INFO, nextMood, type Mood } from "./mood";
import { GrowthChart } from "./components/GrowthChart";
import { useEffect, useState, useSyncExternalStore } from "react";
import { isMuted, setMuted, subscribe } from "./audio";
import { useClickChimes } from "./useClickChimes";
import SparkleTrail from "./SparkleTrail";
import Counter from "./Counter";
import ChaosLayer from "./ChaosLayer";
import { ArrowIcon } from "./lib";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Projects, type Project } from "./components/Projects";
import RouteMap from "./components/RouteMap";
import LullabyLab from "./components/LullabyLab";
import { Nightlights } from "./components/toys/Nightlights";
import { About } from "./components/About";
import { GuestbookSection, GuestbookModal } from "./components/Guestbook";
import { ProjectModal, SecretModal } from "./components/Modals";

function App() {
  const [glow, setGlow] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [mood, setMood] = useState<Mood>(() => {
     try {
      const saved = sessionStorage.getItem("pip-mood");
       return saved === "sleepy" || saved === "dawn" || saved === "dreamy" ? saved : "dreamy";
      } catch {
       return "dreamy";
      }
  });
  useEffect(() => {
    try {
      sessionStorage.setItem("pip-mood", mood);
     } catch {
      /* storage blocked, ignore */
    }
  }, [mood]);

  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const muted = useSyncExternalStore(subscribe, isMuted);
  useClickChimes();

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
    <div className={`site-shell mood-${mood} ${mood === "dawn" ? "theme-dawn" : ""}`}>
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
            }}
          >
            Leave a little note <ArrowIcon />
          </button>
        </nav>
      </header>

      <main>
        <Hero
          onSecret={() => setSecretOpen(true)}
          onScrollTo={scrollToSection}
          mood={mood}
        />
        <Story />
        <Projects onSelect={setSelectedProject} />
        <RouteMap moon={<MapMoon />} onNext={() => scrollToSection("about")} />
        <GrowthChart />
        <About />
        <GuestbookSection onOpen={() => setGuestbookOpen(true)} />
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

      <SparkleTrail />

      {/* THEME AND SOUND CONTROLS */}
      <div className="utility-controls">
        <button
          className="utility-button"
          onClick={() => setMood(nextMood(mood))}
          aria-label={`Mood: ${MOOD_INFO[mood].label}. Tap to change.`}
        >
          <span>{MOOD_INFO[mood].icon}</span>
          <small>{MOOD_INFO[mood].label}</small>
        </button>

        <button
          className={`utility-button ${!muted ? "sound-on" : ""}`}
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          aria-pressed={!muted}
        >
          <span>{muted ? "♪" : "♫"}</span>
          <small>{muted ? "Sound off" : "Sound on"}</small>
        </button>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          glow={glow}
          extra={
            selectedProject.title === "The Lullaby Lab" ? (
              <LullabyLab soundEnabled={!muted} />
            ) : selectedProject.title === "Nightlight Collection" ? (
              <Nightlights soundEnabled={!muted} onGlow={setGlow} />
            ) : null
          }
        />
      )}

      {secretOpen && <SecretModal onClose={() => setSecretOpen(false)} />}

      {guestbookOpen && (
        <GuestbookModal onClose={() => setGuestbookOpen(false)} />
      )}
    </div>
  );
}

function MapMoon() {
  return <span aria-hidden="true" className="map-moon">☾</span>;
}

export default App;