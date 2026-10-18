
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  details: string;
  note: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "LULLABY LAB",
    title: "The Lullaby Lab",
    description: "A tiny music box filled with sleepy little melodies.",
    image: "/pip_lullaby_box.png",
    details:
      "Welcome to my Lullaby Lab! Wind the little music box, play a few notes, and create a melody for dreamers across the night sky.",
    note: "Every dream deserves its own little tune.",
  },
  {
    number: "02",
    category: "NIGHTLIGHT COLLECTION",
    title: "Nightlight Collection",
    description: "Little lights to make bedtime feel warm and wonderful.",
    image: "/pip_dream_lantern.png",
    details:
      "Handmade dream lights, each with its own colour and character. Choose your favourite and make the night feel a little softer.",
    note: "A little light goes a long way.",
  },
  {
    number: "03",
    category: "DREAM DELIVERY",
    title: "Dream Delivery Routes",
    description: "Follow Pip as he delivers dreams to sleepy neighbours.",
    image: "/pip_avatar_cloud.png",
    details:
      "Every night, Pip follows a winding route through the village, visiting sleepy rooftops, the dream garden, and starlight hill.",
    note: "Dream delivery in progress. Please stay cozy.",
  },
];

const destinations = [
  {
    name: "The Beginning",
    subtitle: "Where every adventure starts",
    description:
      "Pip packs a little bag of dreams and checks his lantern before setting off.",
    x: 12,
    y: 70,
    symbol: "⌂",
  },
  {
    name: "The Dream Garden",
    subtitle: "A garden full of possibilities",
    description:
      "Floating flowers and sleepy fireflies help Pip find the loveliest dreams.",
    x: 39,
    y: 52,
    symbol: "✿",
  },
  {
    name: "Moonlit Village",
    subtitle: "A little warmth for every home",
    description:
      "Pip leaves tiny dream parcels at the windows of the quiet village.",
    x: 63,
    y: 66,
    symbol: "⌂",
  },
  {
    name: "Starlight Hill",
    subtitle: "The last stop beneath the stars",
    description:
      "At the top of the hill, Pip sends one final wish into the night sky.",
    x: 87,
    y: 22,
    symbol: "✦",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

function MoonIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="moonGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff1ca" />
          <stop offset="100%" stopColor="#dfc5ed" />
        </linearGradient>
      </defs>
      <path
        d="M42 7a25 25 0 1 0 15 43A25 25 0 0 1 42 7Z"
        fill="url(#moonGradient)"
      />
      <path
        d="M48 12l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"
        fill="#d7a7d2"
      />
      <circle cx="16" cy="15" r="2" fill="#c7a6d8" />
    </svg>
  );
}

function App() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dawnMode, setDawnMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const [selectedDestination, setSelectedDestination] = useState(0);
  const [completedStops, setCompletedStops] = useState<number[]>([]);
  const [routeStarted, setRouteStarted] = useState(false);

  const [secretOpen, setSecretOpen] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestSubmitted, setGuestSubmitted] = useState(false);

  const [selectedLight, setSelectedLight] = useState(0);
  const [lightOn, setLightOn] = useState(true);
  const [activeNote, setActiveNote] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<AudioContext | null>(null);
  const routeRef = useRef<HTMLElement | null>(null);

  const notes = [
    { name: "C", frequency: 261.63 },
    { name: "D", frequency: 293.66 },
    { name: "E", frequency: 329.63 },
    { name: "G", frequency: 392 },
    { name: "A", frequency: 440 },
  ];

  const lights = [
    { name: "Moonbeam", symbol: "☾", color: "#ffe6a3" },
    { name: "Dream Rose", symbol: "✿", color: "#f4b8d5" },
    { name: "Stardust", symbol: "✦", color: "#cdb7ff" },
  ];

  const currentDestination = destinations[selectedDestination];
  const progress = (completedStops.length / destinations.length) * 100;

  function scrollToSection(id: string) {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function playTone(frequency: number) {
    if (!soundOn) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return;

      const context = audioRef.current ?? new AudioContextClass();
      audioRef.current = context;

      if (context.state === "suspended") {
        void context.resume();
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.06,
        context.currentTime + 0.04
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.45
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.46);
    } catch {
      // The visual experience remains available without audio.
    }
  }

  function startRoute() {
    setRouteStarted(true);
    setCompletedStops([]);
    setSelectedDestination(0);
    scrollToSection("route");
  }

  function visitDestination(index: number) {
    setSelectedDestination(index);
    setRouteStarted(true);
    playTone(440);
  }

  function completeCurrentStop() {
    setCompletedStops((previous) =>
      previous.includes(selectedDestination)
        ? previous
        : [...previous, selectedDestination]
    );

    if (selectedDestination < destinations.length - 1) {
      setSelectedDestination((previous) => previous + 1);
    }
  }

  function resetRoute() {
    setCompletedStops([]);
    setSelectedDestination(0);
    setRouteStarted(false);
  }

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-reveal]"
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
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
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;

    let step = 0;

    const timer = window.setInterval(() => {
      const note = notes[step % notes.length];
      setActiveNote(step % notes.length);
      playTone(note.frequency);
      step++;
    }, 600);

    return () => window.clearInterval(timer);
  }, [playing, soundOn]);

  useEffect(() => {
    if (!soundOn && audioRef.current) {
      void audioRef.current.suspend();
    } else if (soundOn && playing && audioRef.current) {
      void audioRef.current.resume();
    }
  }, [soundOn, playing]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        void audioRef.current.close();
      }
    };
  }, []);

  return (
    <div className={`site-shell ${dawnMode ? "theme-dawn" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

        :root {
          font-family: 'DM Sans', sans-serif;
          color: #33283f;
          background: #fcf8f1;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          --ink: #33283f;
          --muted: #82758a;
          --purple: #77548e;
          --purple-dark: #513b67;
          --lavender: #eadcf0;
          --cream: #fcf8f1;
          --pink: #f3dce6;
          --display: 'Playfair Display', Georgia, serif;
        }

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          min-width: 320px;
          background: var(--cream);
        }

        button, input, textarea { font: inherit; }

        button, a { -webkit-tap-highlight-color: transparent; }

        button { color: inherit; }

        a { color: inherit; text-decoration: none; }

        button:focus-visible, a:focus-visible, input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid #a982bd;
          outline-offset: 4px;
        }

        button:disabled { opacity: .45; cursor: not-allowed; }

        .site-shell {
          overflow: clip;
          background: var(--cream);
          color: var(--ink);
          transition: background .35s, color .35s;
        }

        .theme-dawn {
          --cream: #fffdf7;
          --lavender: #f4e7e8;
          --purple: #8e647c;
          --purple-dark: #634454;
        }

        .announcement-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 13px;
          padding: 11px 18px;
          background: #33263f;
          color: #f7eaf5;
          font-size: 9px;
          letter-spacing: .17em;
          text-align: center;
        }

        .announcement-soft { color: #c7b1ce; letter-spacing: .05em; }
        .star-glyph { color: #dcb8d6; }

        .site-header {
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 20px max(5.5%, calc((100vw - 1240px)/2));
          border-bottom: 1px solid #e9e0e9;
          background: var(--cream);
          position: relative;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .brand-mark {
          position: relative;
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #eee1f0;
          color: var(--purple);
          font-size: 25px;
        }

        .brand-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 12px;
        }

        .brand-copy { display: grid; gap: 5px; }

        .brand-copy strong {
          font-size: 11px;
          letter-spacing: .12em;
        }

        .brand-copy small {
          color: var(--muted);
          font-size: 8px;
          letter-spacing: .12em;
        }

        .navigation {
          display: flex;
          align-items: center;
          gap: clamp(14px, 2.2vw, 30px);
          font-size: 12px;
        }

        .navigation > a {
          color: var(--muted);
          transition: color .2s;
        }

        .navigation > a:hover { color: var(--purple); }

        .nav-cta, .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          border: 0;
          cursor: pointer;
          transition: transform .2s, background .2s, box-shadow .2s;
        }

        .nav-cta {
          padding: 13px 17px;
          background: #e8d5e9;
          color: #3d2e4b;
          font-size: 11px;
        }

        .nav-cta:hover, .button:hover { transform: translateY(-2px); }

        .mobile-menu-button {
          display: none;
          border: 1px solid #e5d6e7;
          background: transparent;
          padding: 10px;
          cursor: pointer;
        }

        .section-wrap {
          width: min(1180px, 89%);
          margin-inline: auto;
        }

        .hero {
          min-height: 660px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 5%;
          padding-top: 72px;
          padding-bottom: 92px;
          position: relative;
        }

        .hero-copy { max-width: 530px; }

        .eyebrow, .section-label, .project-category, .story-kicker {
          font-size: 9px;
          letter-spacing: .19em;
          color: var(--purple);
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .eyebrow-line {
          width: 35px;
          height: 1px;
          background: #bda2c9;
        }

        .hero-pretitle {
          margin: 0 0 12px;
          color: var(--muted);
          font-size: 14px;
        }

        h1, h2, h3, p { overflow-wrap: anywhere; }

        h1, h2, .project-title {
          font-family: var(--display);
          font-weight: 400;
          letter-spacing: -.045em;
        }

        h1 {
          margin: 0;
          font-size: clamp(58px, 7.1vw, 94px);
          line-height: .99;
        }

        h1 em, h2 em { color: var(--purple); font-weight: 400; }

        .heading-period { color: #c79dbf; }

        .hero-description {
          max-width: 420px;
          margin: 25px 0 27px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.95;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 22px;
        }

        .button {
          padding: 15px 21px;
          font-size: 12px;
          font-weight: 500;
        }

        .button-primary {
          background: var(--purple-dark);
          color: #fff9f7;
        }

        .button-primary:hover { background: #694b7e; }

        .button-outline {
          border: 1px solid #d8c6dd;
          background: transparent;
        }

        .button-light {
          background: #f5e3ee;
          color: #382840;
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 0;
          border: 0;
          background: none;
          color: var(--muted);
          font-size: 12px;
          cursor: pointer;
        }

        .play-symbol { color: var(--purple); font-size: 18px; }

        .hero-signoff {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 37px;
          color: var(--muted);
          font-size: 11px;
        }

        .hero-signoff strong { color: var(--ink); }

        .mini-avatars { display: flex; }

        .mini-avatars span {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          margin-left: -5px;
          border: 2px solid var(--cream);
          border-radius: 50%;
          background: #ead8ec;
          color: var(--purple);
        }

        .mini-avatars span:first-child { margin-left: 0; }

        .hero-art-area {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 470px;
          isolation: isolate;
        }

        .hero-art-halo {
          position: absolute;
          z-index: -1;
          width: min(90%, 450px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, #f4dfed 0%, #f6e8ed 43%, transparent 72%);
        }

        .hero-art-card {
          position: relative;
          width: min(78%, 355px);
          aspect-ratio: .88;
          overflow: hidden;
          border: 8px solid #fffaf4;
          background: #ead9ec;
          box-shadow: 0 35px 90px #61446c22, 0 8px 20px #61446c10;
          transform: rotate(-2deg);
          transition: transform .5s;
        }

        .hero-art-card:hover { transform: rotate(0deg) translateY(-5px); }

        .hero-art-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .orbit {
          position: absolute;
          width: 88%;
          height: 72%;
          border: 1px solid #cdb6d5;
          border-radius: 50%;
          transform: rotate(-25deg);
          pointer-events: none;
        }

        .orbit-two {
          width: 94%;
          height: 82%;
          border-color: #d9c8d8;
          transform: rotate(25deg);
        }

        .floating-note {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 17px;
          border: 1px solid #ffffffb8;
          background: #fffaf2ed;
          box-shadow: 0 10px 35px #61446c12;
          backdrop-filter: blur(15px);
        }

        .note-lantern { top: 14%; left: -1%; }
        .note-dream { right: -2%; bottom: 15%; }

        .note-icon { color: #a779a6; font-size: 24px; }

        .floating-note strong, .floating-note small {
          display: block;
        }

        .floating-note strong { font-size: 10px; font-weight: 600; }
        .floating-note small { margin-top: 5px; color: var(--muted); font-size: 9px; }

        .hero-twinkle {
          position: absolute;
          color: #b98fbd;
          pointer-events: none;
        }

        .twinkle-a { top: 6%; right: 13%; font-size: 26px; }
        .twinkle-b { bottom: 17%; left: 5%; font-size: 22px; }
        .twinkle-c { top: 28%; left: 6%; font-size: 15px; }

        .secret-star {
          position: absolute;
          top: 5%;
          right: 6%;
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          border: 1px solid #d7c1df;
          border-radius: 50%;
          background: #fffaf2;
          color: #b38ab9;
          cursor: pointer;
          transition: transform .3s;
        }

        .secret-star:hover { transform: rotate(45deg) scale(1.1); }

        .hero-bottom-line {
          position: absolute;
          bottom: 32px;
          left: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--muted);
          font-size: 8px;
          letter-spacing: .18em;
        }

        .scroll-line { width: 32px; height: 1px; background: #bfa8c9; }

        .intro-strip {
          padding: 19px 5%;
          background: #eee0ef;
          color: #695174;
          overflow: hidden;
        }

        .strip-inner {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px 35px;
          font-size: 9px;
          letter-spacing: .13em;
        }

        .strip-inner i { font-style: normal; color: #b78cb5; }

        .section-padding { padding-block: 110px; }

        .section-label {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 36px;
        }

        .section-label span:last-child {
          color: #a397a9;
          text-align: right;
        }

        .story-heading-grid, .work-heading-grid {
          display: grid;
          grid-template-columns: 1fr .65fr;
          gap: 50px;
          align-items: end;
        }

        h2 {
          margin: 0;
          font-size: clamp(40px, 5vw, 63px);
          line-height: 1.08;
        }

        .section-intro {
          max-width: 410px;
          margin: 0 0 5px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.95;
        }

        .story-timeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 19px;
          margin-top: 65px;
        }

        .story-card {
          position: relative;
          min-height: 290px;
          padding: 30px 27px;
          border: 1px solid #e9dce9;
          background: #fffaf5;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s;
        }

        .story-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px #62456d10;
        }

        .story-card-two { background: #f3e8f3; }
        .story-card-three { background: #f8e9eb; }

        .timeline-marker {
          display: grid;
          place-items: center;
          width: 35px;
          height: 35px;
          margin-bottom: 35px;
          border: 1px solid #ddc9e2;
          border-radius: 50%;
          color: var(--purple);
          font-size: 10px;
        }

        .story-kicker { font-size: 8px; }

        .story-card h3 {
          margin: 13px 0;
          font-family: var(--display);
          font-size: 27px;
          font-weight: 400;
        }

        .story-card p {
          position: relative;
          z-index: 1;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .story-decoration {
          position: absolute;
          right: 15px;
          bottom: 0;
          color: #c5a6d0;
          opacity: .35;
          font-size: 82px;
          pointer-events: none;
        }

        .story-footnote {
          margin-top: 35px;
          color: var(--muted);
          text-align: center;
          font-size: 11px;
        }

        .tiny-moon { margin-right: 9px; color: var(--purple); }

        .work-section { background: #f6edf4; }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          margin-top: 55px;
        }

        .project-card {
          width: 100%;
          padding: 0;
          border: 1px solid #e7d9e7;
          background: #fffaf4;
          text-align: left;
          cursor: pointer;
          transition: transform .3s, box-shadow .3s;
        }

        .project-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 25px 55px #63456e15;
        }

        .project-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 21px 12px;
          color: #8d7b96;
          font-size: 9px;
          letter-spacing: .13em;
        }

        .project-open { color: var(--purple); font-size: 20px; }

        .project-image {
          position: relative;
          display: grid;
          place-items: center;
          height: 255px;
          margin: 0 12px;
          overflow: hidden;
          background: linear-gradient(145deg, #f4e7e8, #e8daf2);
        }

        .project-card-2 .project-image {
          background: linear-gradient(145deg, #f5e3dc, #efe0f2);
        }

        .project-card-3 .project-image {
          background: linear-gradient(145deg, #e6e1f5, #f4e2ef);
        }

        .project-art-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          transition: transform .4s;
        }

        .project-card:hover .project-art-image { transform: scale(1.045); }

        .project-copy { display: block; padding: 23px 22px 25px; }

        .project-category {
          display: block;
          font-size: 8px;
        }

        .project-title {
          display: block;
          margin: 12px 0 8px;
          font-size: 27px;
          line-height: 1.2;
        }

        .project-description-text {
          display: block;
          min-height: 44px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .project-read-more {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 22px;
          padding-top: 15px;
          border-top: 1px solid #eee3ed;
          color: var(--purple);
          font-size: 11px;
        }

        .work-caption {
          margin: 36px 0 0;
          color: var(--muted);
          text-align: center;
          font-size: 10px;
        }

        .work-caption span { color: #bd95bc; padding-inline: 8px; }

        .route-section { background: var(--cream); }

        .route-layout {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          align-items: center;
          gap: 6%;
          margin-top: 50px;
        }

        .route-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--purple);
          font-size: 9px;
          letter-spacing: .15em;
        }

        .route-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #b39ac6;
          box-shadow: 0 0 0 4px #e9dcef;
        }

        .route-copy h2 { margin: 22px 0; font-size: clamp(38px, 4vw, 53px); }

        .route-copy > p {
          color: var(--muted);
          font-size: 13px;
          line-height: 2;
        }

        .route-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 23px;
          margin: 31px 0;
        }

        .route-stats div { display: grid; gap: 7px; }

        .route-stats strong {
          font-family: var(--display);
          font-size: 27px;
          font-weight: 400;
        }

        .route-stats span {
          color: var(--muted);
          font-size: 8px;
          letter-spacing: .1em;
        }

        .route-map {
          position: relative;
          min-height: 440px;
          overflow: hidden;
          border: 1px solid #e6d8e8;
          background:
            radial-gradient(ellipse at 22% 80%, #f0d9e8 0%, transparent 45%),
            radial-gradient(ellipse at 88% 18%, #ded8f3 0%, transparent 45%),
            linear-gradient(145deg, #f8f0f2, #eee7f5);
          isolation: isolate;
        }

        .map-sky-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 52% 43%, #fffaf4aa, transparent 60%);
          pointer-events: none;
        }

        .map-caption {
          position: absolute;
          top: 20px;
          left: 22px;
          z-index: 2;
          color: #9b87a4;
          font-size: 8px;
          letter-spacing: .15em;
        }

        .map-moon {
          position: absolute;
          top: 30px;
          right: 42px;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #fff5d5;
          box-shadow: 0 0 50px #fff4ce8c;
        }

        .map-stars {
          position: absolute;
          top: 28%;
          left: 12%;
          color: #bba0ca;
          font-size: 13px;
          letter-spacing: 14px;
        }

        .map-route-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }

        .map-route-base {
          fill: none;
          stroke: #d0bddb;
          stroke-width: 2;
          stroke-dasharray: 4 7;
          vector-effect: non-scaling-stroke;
        }

        .map-route-progress {
          fill: none;
          stroke: #8d6ca7;
          stroke-width: 2.8;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          transition: stroke-dashoffset .5s ease;
        }

        .map-destination {
          position: absolute;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          padding: 0;
          border: 1px solid #d7c3df;
          border-radius: 50%;
          background: #fffaf4;
          color: #79558f;
          font-size: 18px;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: background .2s, color .2s, transform .2s, box-shadow .2s;
        }

        .map-destination:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        .map-destination.is-active {
          border-color: #74528c;
          background: #74528c;
          color: white;
          box-shadow: 0 0 0 6px #d7c1e480, 0 5px 20px #74528c33;
        }

        .map-destination.is-complete {
          border-color: #a2a8a0;
          background: #e2e8df;
          color: #52664f;
        }

        .destination-label {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          width: 125px;
          color: #6e5a7c;
          font-size: 9px;
          line-height: 1.5;
          text-align: center;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .destination-label small {
          display: block;
          margin-top: 2px;
          color: #a193ab;
          font-size: 8px;
        }

        .pip-marker {
          position: absolute;
          z-index: 4;
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          border: 2px solid #fff9f4;
          border-radius: 50%;
          background: #e5d2ec;
          color: #65457a;
          font-size: 21px;
          box-shadow: 0 5px 20px #65457a30;
          transform: translate(-50%, -50%);
          transition: left .65s cubic-bezier(.2,.8,.2,1), top .65s cubic-bezier(.2,.8,.2,1);
          pointer-events: none;
        }

        .map-bottom-label {
          position: absolute;
          bottom: 15px;
          left: 15px;
          right: 15px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #9a879f;
          font-size: 8px;
          letter-spacing: .09em;
        }

        .route-dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 20px;
        }

        .destination-card, .route-progress-card {
          padding: 22px;
          border: 1px solid #e6d9e8;
          background: #fffaf5;
        }

        .destination-overline {
          color: #957ca0;
          font-size: 8px;
          letter-spacing: .15em;
        }

        .destination-card h3 {
          margin: 10px 0;
          font-family: var(--display);
          font-size: 26px;
          font-weight: 400;
        }

        .destination-card p {
          color: var(--muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .route-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 17px;
        }

        .route-actions .button { padding: 12px 14px; font-size: 10px; }

        .route-progress-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: var(--muted);
          font-size: 10px;
        }

        .progress-top strong { color: var(--ink); }

        .progress-track {
          height: 5px;
          margin: 15px 0;
          overflow: hidden;
          border-radius: 9px;
          background: #eadfec;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #9b78ae, #d1a7c9);
          transition: width .4s;
        }

        .progress-caption {
          color: var(--muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .about-section {
          padding-block: 100px;
          background: #f0e5f1;
        }

        .about-inner {
          display: grid;
          grid-template-columns: .9fr 1fr;
          align-items: center;
          gap: 9%;
        }

        .about-art {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 370px;
        }

        .about-art-circle {
          display: grid;
          place-items: center;
          width: min(100%, 350px);
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 35%, #fff8e9, #e5cfe7 65%, #c3a6d4);
        }

        .about-art-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .about-art-label {
          position: absolute;
          bottom: 2px;
          left: 50%;
          width: max-content;
          max-width: 90%;
          padding: 12px 16px;
          background: #fffaf2;
          color: var(--purple);
          font-size: 8px;
          letter-spacing: .15em;
          text-align: center;
          transform: translateX(-50%);
        }

        .about-copy h2 { margin: 22px 0; }

        .about-copy p {
          color: var(--muted);
          font-size: 13px;
          line-height: 2;
        }

        .about-lead { color: var(--ink) !important; font-size: 16px !important; }

        .trait-list {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 25px;
        }

        .trait-list span {
          padding: 10px 13px;
          border: 1px solid #d9c3dd;
          color: #755681;
          font-size: 10px;
        }

        .about-quote {
          margin: 30px 0 0;
          padding: 20px 0 0 18px;
          border-top: 1px solid #d8c5de;
          border-left: 2px solid #b59bc6;
          font-family: var(--display);
          font-size: 20px;
          font-style: italic;
        }

        .about-quote span {
          display: block;
          margin-top: 12px;
          font-family: 'DM Sans', sans-serif;
          color: var(--muted);
          font-size: 8px;
          font-style: normal;
          letter-spacing: .13em;
        }

        .guestbook-section { padding-block: 90px; }

        .guestbook-card {
          position: relative;
          padding: 70px 25px;
          overflow: hidden;
          background: #4a3659;
          color: #fff7f4;
          text-align: center;
          isolation: isolate;
        }

        .guestbook-card::before, .guestbook-card::after {
          content: '';
          position: absolute;
          z-index: -1;
          width: 330px;
          height: 330px;
          border: 1px solid #ffffff14;
          border-radius: 50%;
        }

        .guestbook-card::before { top: -220px; left: -100px; }
        .guestbook-card::after { right: -100px; bottom: -240px; }

        .guestbook-stars {
          margin-bottom: 25px;
          color: #dfc0de;
          font-size: 18px;
          letter-spacing: .2em;
        }

        .guestbook-kicker {
          color: #ddc5e5;
          font-size: 9px;
          letter-spacing: .18em;
        }

        .guestbook-card h2 {
          margin: 18px 0;
          font-size: clamp(42px, 5vw, 62px);
        }

        .guestbook-card h2 em { color: #e8c9e5; }

        .guestbook-card p {
          max-width: 400px;
          margin: 0 auto 25px;
          color: #d5c5dc;
          font-size: 12px;
          line-height: 1.9;
        }

        .site-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding: 26px 5.5%;
          border-top: 1px solid #e8dce8;
          color: var(--muted);
          font-size: 9px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--ink);
          font-size: 9px;
          letter-spacing: .1em;
        }

        .footer-brand .brand-mark { width: 28px; height: 28px; font-size: 18px; }

        .footer-credit { letter-spacing: .1em; }

        .utility-controls {
          position: fixed;
          z-index: 20;
          right: 18px;
          bottom: 18px;
          display: flex;
          gap: 8px;
        }

        .utility-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 13px;
          border: 1px solid #e4d4e6;
          background: #fffaf2ed;
          box-shadow: 0 4px 20px #45314d12;
          backdrop-filter: blur(12px);
          cursor: pointer;
        }

        .utility-button span { color: var(--purple); font-size: 16px; }
        .utility-button small { font-size: 9px; }

        .modal-backdrop {
          position: fixed;
          z-index: 100;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 22px;
          overflow-y: auto;
          background: #21192a;
          background: #21192ae0;
          backdrop-filter: blur(9px);
          animation: fade-in .2s ease both;
        }

        .project-modal {
          position: relative;
          display: grid;
          grid-template-columns: .95fr 1.05fr;
          width: min(900px, 100%);
          max-height: min(88vh, 820px);
          overflow-y: auto;
          background: #fffaf0;
          box-shadow: 0 30px 100px #0003;
          animation: modal-in .3s ease both;
        }

        .modal-art {
          display: grid;
          place-items: center;
          min-height: 390px;
          overflow: hidden;
          background: #ead9ec;
        }

        .modal-art-image {
          width: 100%;
          height: 100%;
          max-height: 580px;
          object-fit: contain;
          mix-blend-mode: multiply;
        }

        .modal-content { padding: 55px 38px 38px; }

        .modal-content h2 {
          margin: 13px 0;
          font-size: clamp(32px, 4vw, 42px);
        }

        .modal-content > p {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .modal-close {
          position: absolute;
          z-index: 5;
          top: 14px;
          right: 14px;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid #dfccdf;
          border-radius: 50%;
          background: #fffaf0;
          color: #5b456a;
          font-size: 21px;
          cursor: pointer;
        }

        .modal-note {
          display: flex;
          gap: 12px;
          align-items: center;
          margin: 24px 0;
          padding: 18px;
          background: #efe1f0;
          color: #6d527a;
          font-size: 10px;
          line-height: 1.7;
        }

        .modal-note span { color: #b27fae; font-size: 18px; }

        .mini-lab {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #e4d2e7;
          background: linear-gradient(145deg, #fffaf3, #f1e4f5);
          text-align: center;
        }

        .mini-lab h3 {
          margin: 0 0 7px;
          font-family: var(--display);
          font-size: 25px;
          font-weight: 400;
        }

        .mini-lab > p {
          color: var(--muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .music-symbol { margin: 10px 0; color: #a984b5; font-size: 37px; }

        .note-buttons, .light-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin: 16px 0;
        }

        .note-button, .light-button {
          padding: 10px 13px;
          border: 1px solid #dbc6e3;
          border-radius: 999px;
          background: #fff;
          color: #77548e;
          font-size: 11px;
          cursor: pointer;
        }

        .note-button.is-active, .light-button.is-active {
          background: #77548e;
          color: white;
        }

        .light-stage {
          display: grid;
          place-items: center;
          min-height: 145px;
          margin: 16px 0;
          border-radius: 12px;
          background: radial-gradient(circle, var(--light-color), #f0e3f2 70%);
          transition: background .3s;
        }

        .light-stage.is-off {
          background: #e9e1eb;
        }

        .light-symbol {
          color: #82658e;
          font-size: 66px;
          transition: filter .3s;
        }

        .light-stage:not(.is-off) .light-symbol {
          filter: drop-shadow(0 0 24px var(--light-color));
        }

        .secret-modal {
          position: relative;
          width: min(480px, 100%);
          padding: 55px 35px 40px;
          background: #4a3659;
          color: #fff8f5;
          text-align: center;
          box-shadow: 0 30px 100px #0004;
        }

        .secret-constellation { color: #dfc4e4; letter-spacing: .2em; }

        .secret-moon {
          margin: 15px 0;
          color: #ead1e8;
          font-size: 54px;
        }

        .secret-modal h2 {
          margin: 18px 0;
          font-family: var(--display);
          font-size: 40px;
          font-weight: 400;
        }

        .secret-modal h2 em { color: #e8c9e5; }

        .secret-modal > p {
          color: #d7c9dd;
          font-size: 12px;
          line-height: 1.95;
        }

        .secret-signature {
          margin: 23px 0;
          color: #e8d5ed;
          font-family: var(--display);
          font-size: 17px;
          font-style: italic;
          line-height: 1.8;
        }

        .guest-form {
          display: grid;
          gap: 12px;
          max-width: 350px;
          margin: 25px auto 0;
          text-align: left;
        }

        .guest-form label {
          color: #e4d2eb;
          font-size: 10px;
        }

        .guest-form input, .guest-form textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #b6a0c1;
          border-radius: 0;
          background: #ffffff0c;
          color: white;
          font-size: 12px;
        }

        .guest-form input::placeholder, .guest-form textarea::placeholder {
          color: #c4b1ce;
        }

        .guest-form textarea { resize: vertical; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity .7s ease, transform .7s ease;
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-in {
          from { opacity: 0; transform: translateY(12px) scale(.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }

          [data-reveal] { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .site-header { min-height: 75px; padding-inline: 5%; }

          .mobile-menu-button {
            display: grid;
            gap: 5px;
          }

          .mobile-menu-button span {
            width: 19px;
            height: 1px;
            background: var(--ink);
          }

          .navigation {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            display: none;
            align-items: stretch;
            gap: 0;
            padding: 10px 5% 22px;
            border-bottom: 1px solid #e9ddea;
            background: var(--cream);
          }

          .navigation.navigation-open { display: flex; flex-direction: column; }

          .navigation > a { padding: 15px 0; }

          .nav-cta { justify-content: center; margin-top: 10px; }

          .hero { min-height: auto; padding-top: 65px; padding-bottom: 90px; gap: 2%; }

          .hero-art-area { min-height: 370px; }

          .floating-note { padding: 11px; gap: 8px; }
          .floating-note small { font-size: 8px; }

          .story-card { padding: 23px 18px; }

          .route-layout { grid-template-columns: 1fr; gap: 35px; }

          .route-copy { max-width: 600px; }

          .route-map { min-height: 420px; }

          .project-image { height: 210px; }

          .about-inner { gap: 5%; }

          .modal-content { padding: 55px 25px 30px; }
        }

        @media (max-width: 620px) {
          .announcement-bar { gap: 8px; font-size: 8px; }

          .announcement-soft, .announcement-divider { display: none; }

          .brand-copy strong { font-size: 10px; }

          .brand-copy small { font-size: 7px; }

          .section-wrap { width: 89%; }

          .hero {
            grid-template-columns: 1fr;
            padding-top: 55px;
            padding-bottom: 70px;
          }

          h1 { font-size: clamp(63px, 15vw, 84px); }

          .hero-description { font-size: 13px; }

          .hero-art-area {
            width: 100%;
            min-height: 360px;
            margin-top: 25px;
          }

          .hero-art-card { width: min(70%, 290px); }

          .floating-note strong { font-size: 9px; }

          .note-lantern { left: 0; }
          .note-dream { right: 0; }

          .hero-bottom-line { bottom: 24px; }

          .strip-inner { justify-content: center; gap: 14px 22px; font-size: 8px; }

          .section-padding { padding-block: 72px; }

          .section-label {
            flex-direction: column;
            gap: 9px;
            margin-bottom: 26px;
          }

          .section-label span:last-child { text-align: left; }

          .story-heading-grid, .work-heading-grid {
            grid-template-columns: 1fr;
            gap: 19px;
          }

          h2 { font-size: 45px; }

          .story-timeline {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-top: 35px;
          }

          .story-card { min-height: 235px; }

          .timeline-marker { margin-bottom: 22px; }

          .project-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 35px;
          }

          .project-image { height: 270px; }

          .project-description-text { min-height: auto; }

          .route-layout { margin-top: 30px; }

          .route-map { min-height: 350px; }

          .map-moon { top: 24px; right: 24px; width: 52px; height: 52px; }

          .map-destination { width: 35px; height: 35px; font-size: 15px; }

          .destination-label { width: 91px; font-size: 8px; }

          .destination-label small { font-size: 7px; }

          .route-dashboard { grid-template-columns: 1fr; }

          .about-section { padding-block: 70px; }

          .about-inner { grid-template-columns: 1fr; gap: 45px; }

          .about-art { min-height: 290px; }

          .about-art-circle { width: min(80%, 290px); }

          .about-copy h2 { font-size: 43px; }

          .guestbook-section { padding-block: 55px; }

          .guestbook-card { padding: 55px 20px; }

          .site-footer {
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 85px;
          }

          .utility-controls { right: 10px; bottom: 10px; }

          .utility-button { padding: 9px 10px; }

          .project-modal {
            grid-template-columns: 1fr;
            max-height: 90vh;
          }

          .modal-art { min-height: 230px; height: 230px; }

          .modal-art-image { max-height: 230px; }

          .modal-content { padding: 30px 22px 25px; }

          .modal-content h2 { font-size: 34px; }

          .modal-close { top: 10px; right: 10px; }

          .secret-modal { padding: 50px 22px 30px; }
        }
      `}</style>

      <div className="announcement-bar">
        <span className="star-glyph">✦</span>
        <span>A LITTLE CORNER OF THE INTERNET</span>
        <span className="announcement-divider">/</span>
        <span className="announcement-soft">
          Made of dreams and stardust
        </span>
        <span className="star-glyph">✦</span>
      </div>

      <header className="site-header">
        <a
          href="#home"
          className="brand"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="brand-mark">
            <span>☾</span>
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
          <a href="#story" onClick={() => setMobileMenuOpen(false)}>
            The Story
          </a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)}>
            Little Things
          </a>
          <a href="#route" onClick={() => setMobileMenuOpen(false)}>
            Dream Routes
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>
            About Pip
          </a>
          <button
            className="nav-cta"
            onClick={() => {
              setMobileMenuOpen(false);
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
              A dreamy little hideaway for curious souls, soft thoughts,
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
            <div className="orbit" />
            <div className="orbit orbit-two" />

            <div className="hero-art-card">
              <img
                src="/pip_dream_lantern.png"
                alt="Pip's magical dream lantern"
                className="hero-art-image"
              />
            </div>

            <div className="floating-note note-lantern">
              <span className="note-icon">☼</span>
              <span>
                <strong>A little warmth</strong>
                <small>For your midnight thoughts</small>
              </span>
            </div>

            <div className="floating-note note-dream">
              <span className="note-icon">✧</span>
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
          </div>
        </div>

        <section className="story-section section-padding" id="story">
          <div className="section-wrap">
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
                wild imaginations, and the wonderful art of simply being.
              </p>
            </div>

            <div className="story-timeline">
              <article className="story-card" data-reveal>
                <span className="timeline-marker">01</span>
                <span className="story-kicker">ONCE UPON A NIGHT</span>
                <h3>A little spark</h3>
                <p>
                  It started with a simple thought: what if the internet
                  had a softer corner? Somewhere you could wander without
                  needing to be anything other than yourself.
                </p>
                <span className="story-decoration" aria-hidden="true">☾</span>
              </article>

              <article className="story-card story-card-two" data-reveal>
                <span className="timeline-marker">02</span>
                <span className="story-kicker">A WORLD TAKES SHAPE</span>
                <h3>Room for wonder</h3>
                <p>
                  Little stories found their way in. Colours became
                  constellations, quiet moments became treasures, and
                  ordinary days grew a sprinkle of magic.
                </p>
                <span className="story-decoration" aria-hidden="true">☁</span>
              </article>

              <article className="story-card story-card-three" data-reveal>
                <span className="timeline-marker">03</span>
                <span className="story-kicker">AND NOW, YOU&apos;RE HERE</span>
                <h3>Your own little corner</h3>
                <p>
                  There&apos;s room for you, too. Bring your curiosity,
                  your half-finished dreams, and whatever is on your
                  mind tonight.
                </p>
                <span className="story-decoration" aria-hidden="true">✿</span>
              </article>
            </div>

            <p className="story-footnote" data-reveal>
              <span className="tiny-moon">☾</span>
              The best stories are the ones we get to keep adding to.
            </p>
          </div>
        </section>

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
                Little ideas, dreamy places, and stories waiting to be
                discovered. Pick whichever one calls your name.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <div
                  key={project.number}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                >
                  <button
                    className={`project-card project-card-${project.number.slice(-1)}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="project-card-top">
                      <span>NO. {project.number}</span>
                      <span className="project-open">↗</span>
                    </span>

                    <span className="project-image">
                      <img
                        className="project-art-image"
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                    </span>

                    <span className="project-copy">
                      <span className="project-category">{project.category}</span>
                      <span className="project-title">{project.title}</span>
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
              <span>✦</span>
              Made for curious minds and wonderfully wandering hearts
              <span>✦</span>
            </p>
          </div>
        </section>

        <section
          className="route-section section-padding"
          id="route"
          ref={routeRef}
        >
          <div className="section-wrap">
            <div className="section-label" data-reveal>
              <span>03 / DREAM DELIVERY</span>
              <span>YOUR NEXT LITTLE ADVENTURE</span>
            </div>

            <div className="route-layout">
              <div className="route-copy" data-reveal>
                <span className="route-label">
                  <span className="route-live-dot" />
                  AN INTERACTIVE LITTLE ADVENTURE
                </span>

                <h2>
                  Little dreams,
                  <br />
                  <em>beautifully delivered.</em>
                </h2>

                <p>
                  Join Pip on a journey through a sleepy village. Choose
                  your destinations, follow the dotted path, and deliver
                  a little magic to every stop.
                </p>

                <div className="route-stats">
                  <div>
                    <strong>04</strong>
                    <span>MAGICAL STOPS</span>
                  </div>
                  <div>
                    <strong>{completedStops.length.toString().padStart(2, "0")}</strong>
                    <span>STOPS VISITED</span>
                  </div>
                  <div>
                    <strong>{Math.round(progress)}%</strong>
                    <span>JOURNEY COMPLETE</span>
                  </div>
                </div>

                <button className="button button-primary" onClick={startRoute}>
                  {routeStarted ? "Start the journey again" : "Begin the journey"}
                  <ArrowIcon />
                </button>
              </div>

              <div>
                <div
                  className="route-map"
                  aria-label="Interactive illustrated dream delivery map"
                >
                  <div className="map-sky-glow" />
                  <div className="map-caption">
                    PIP&apos;S DREAM DELIVERY MAP
                  </div>
                  <div className="map-moon" aria-hidden="true">
                    <MoonIcon />
                  </div>
                  <div className="map-stars" aria-hidden="true">
                    ✧ · ✦ · ✧
                  </div>

                  <svg
                    className="map-route-svg"
                    viewBox="0 0 500 440"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className="map-route-base"
                      d="M60 308 Q105 290 135 270 T195 229 T315 292 T435 97"
                    />
                    <path
                      className="map-route-progress"
                      d="M60 308 Q105 290 135 270 T195 229 T315 292 T435 97"
                      pathLength="100"
                      strokeDasharray="100"
                      strokeDashoffset={100 - progress}
                    />
                  </svg>

                  {destinations.map((destination, index) => {
                    const isComplete = completedStops.includes(index);
                    const isActive = selectedDestination === index;

                    return (
                      <button
                        key={destination.name}
                        className={`map-destination ${
                          isActive ? "is-active" : ""
                        } ${isComplete ? "is-complete" : ""}`}
                        style={{
                          left: `${destination.x}%`,
                          top: `${destination.y}%`,
                        }}
                        aria-label={`Visit ${destination.name}`}
                        aria-pressed={isActive}
                        onClick={() => visitDestination(index)}
                      >
                        {isComplete ? "✓" : destination.symbol}
                        <span className="destination-label">
                          {destination.name}
                          <small>
                            {isComplete ? "VISITED" : `STOP 0${index + 1}`}
                          </small>
                        </span>
                      </button>
                    );
                  })}

                  <div
                    className="pip-marker"
                    style={{
                      left: `${currentDestination.x}%`,
                      top: `${currentDestination.y}%`,
                    }}
                    aria-label={`Pip is at ${currentDestination.name}`}
                    title={`Pip: ${currentDestination.name}`}
                  >
                    ☾
                  </div>

                  <div className="map-bottom-label">
                    <span>FOLLOW THE LITTLE LIGHTS</span>
                    <span>{completedStops.length}/4 DESTINATIONS</span>
                  </div>
                </div>

                <div className="route-dashboard">
                  <div className="destination-card">
                    <span className="destination-overline">
                      STOP 0{selectedDestination + 1} / YOUR DESTINATION
                    </span>

                    <h3>{currentDestination.name}</h3>

                    <p>{currentDestination.subtitle}</p>
                    <p>{currentDestination.description}</p>

                    <div className="route-actions">
                      <button
                        className="button button-primary"
                        onClick={completeCurrentStop}
                        disabled={completedStops.includes(selectedDestination)}
                      >
                        {completedStops.includes(selectedDestination)
                          ? "Stop completed ✓"
                          : "Deliver this dream"}
                        {!completedStops.includes(selectedDestination) && (
                          <ArrowIcon />
                        )}
                      </button>

                      {completedStops.length > 0 && (
                        <button
                          className="button button-outline"
                          onClick={resetRoute}
                        >
                          Reset route
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="route-progress-card">
                    <div className="progress-top">
                      <span>Journey progress</span>
                      <strong>{Math.round(progress)}%</strong>
                    </div>

                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-label="Dream delivery progress"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="progress-caption">
                      {completedStops.length === destinations.length
                        ? "Every dream has been delivered. Pip can finally rest beneath the stars. ✦"
                        : completedStops.length === 0
                        ? "Choose any destination on the map, then deliver your first little dream."
                        : `${completedStops.length} of ${destinations.length} stops visited. Keep going, little wanderer.`}
                    </p>

                    {completedStops.length === destinations.length && (
                      <button
                        className="button button-outline"
                        onClick={resetRoute}
                      >
                        Explore again <ArrowIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-art" data-reveal>
              <div className="about-art-circle">
                <img
                  src="/pip_portrait.png"
                  alt="Pip, the little dreamer"
                  className="about-art-image"
                  loading="lazy"
                />
              </div>
              <span className="about-art-label">
                A LITTLE LOVE LETTER TO WONDER
              </span>
            </div>

            <div className="about-copy" data-reveal>
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

        <section className="guestbook-section section-wrap" id="guestbook">
          <div className="guestbook-card" data-reveal>
            <div className="guestbook-stars">✦　✧　☾　✧　✦</div>
            <span className="guestbook-kicker">BEFORE YOU WANDER OFF</span>

            <h2>
              Leave a little
              <br />
              <em>stardust.</em>
            </h2>

            <p>
              Tell Pip a thought, a wish, or just a tiny hello.
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

      <footer className="site-footer">
        <a className="footer-brand" href="#home">
          <span className="brand-mark">☾</span>
          PIP&apos;S MIDNIGHT NURSERY
        </a>
        <span className="footer-note">
          A tiny reminder to keep dreaming.
        </span>
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
          className="utility-button"
          onClick={() => setSoundOn((on) => !on)}
          aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
          aria-pressed={soundOn}
        >
          <span>{soundOn ? "♫" : "♪"}</span>
          <small>{soundOn ? "Sound on" : "Sound off"}</small>
        </button>
      </div>

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

            <div className="modal-art">
              <img
                className="modal-art-image"
                src={selectedProject.image}
                alt={selectedProject.title}
              />
            </div>

            <div className="modal-content">
              <span className="project-category">
                {selectedProject.category}
              </span>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p>{selectedProject.details}</p>

              {selectedProject.title === "The Lullaby Lab" && (
                <div className="mini-lab">
                  <h3>Wind a little wonder</h3>
                  <p>Tap a note and make a sleepy little melody.</p>
                  <div className="music-symbol" aria-hidden="true">♫</div>

                  <div className="note-buttons">
                    {notes.map((note, index) => (
                      <button
                        key={`${note.name}-${index}`}
                        className={`note-button ${
                          activeNote === index ? "is-active" : ""
                        }`}
                        aria-pressed={activeNote === index}
                        onClick={() => {
                          setActiveNote(index);
                          playTone(note.frequency);
                        }}
                      >
                        {note.name}
                      </button>
                    ))}
                  </div>

                  <button
                    className="button button-primary"
                    onClick={() => setPlaying((value) => !value)}
                  >
                    {playing ? "■ Stop lullaby" : "▶ Play my lullaby"}
                  </button>

                  <p>
                    {playing
                      ? soundOn
                        ? "A little song for sleepy dreamers…"
                        : "The stars are dancing silently… Turn sound on to hear the notes."
                      : "Your music box is waiting."}
                  </p>
                </div>
              )}

              {selectedProject.title === "Nightlight Collection" && (
                <div className="mini-lab">
                  <h3>Pick your bedtime glow</h3>
                  <p>Every little light has a different kind of magic.</p>

                  <div
                    className={`light-stage ${lightOn ? "" : "is-off"}`}
                    style={
                      {
                        "--light-color": lights[selectedLight].color,
                      } as CSSProperties
                    }
                  >
                    <span className="light-symbol">
                      {lights[selectedLight].symbol}
                    </span>
                  </div>

                  <div className="light-buttons">
                    {lights.map((light, index) => (
                      <button
                        key={light.name}
                        className={`light-button ${
                          selectedLight === index ? "is-active" : ""
                        }`}
                        aria-pressed={selectedLight === index}
                        onClick={() => setSelectedLight(index)}
                      >
                        {light.symbol} {light.name}
                      </button>
                    ))}
                  </div>

                  <button
                    className="button button-primary"
                    onClick={() => setLightOn((on) => !on)}
                  >
                    {lightOn ? "☾ Turn the light off" : "✦ Turn the light on"}
                  </button>

                  <p>
                    {lightOn
                      ? `${lights[selectedLight].name} is glowing softly. Sweet dreams!`
                      : `${lights[selectedLight].name} is resting until you need it.`}
                  </p>
                </div>
              )}

              {selectedProject.title === "Dream Delivery Routes" && (
                <div className="mini-lab">
                  <h3>Ready for a little adventure?</h3>
                  <p>
                    Visit the interactive map to guide Pip through all
                    four destinations and complete the dream delivery.
                  </p>
                  <button
                    className="button button-primary"
                    onClick={() => {
                      setSelectedProject(null);
                      startRoute();
                    }}
                  >
                    Explore dream routes <ArrowIcon />
                  </button>
                </div>
              )}

              <div className="modal-note">
                <span>✧</span>
                {selectedProject.note}
              </div>

              <button
                className="button button-outline"
                onClick={() => setSelectedProject(null)}
              >
                Back to the little things <ArrowIcon />
              </button>
            </div>
          </section>
        </div>
      )}

      {secretOpen && (
        <div
          className="modal-backdrop"
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
              Keep this close, little wanderer.
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
                <span className="guestbook-kicker">
                  YOUR NOTE IS RIGHT HERE
                </span>

                <h2 id="guestbook-title">
                  Thank <em>you.</em>
                </h2>

                <p>
                  {guestName.trim()
                    ? `Dear ${guestName.trim()}, `
                    : ""}
                  Thank you for leaving a little kindness in Pip&apos;s
                  corner of the world.
                </p>

                <div className="secret-signature">
                  “{guestMessage.trim()}”
                </div>

                <p>
                  Your note is shown for this visit only. It has not
                  been saved to a server.
                </p>

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
                  className="guest-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (guestMessage.trim()) setGuestSubmitted(true);
                  }}
                >
                  <label htmlFor="guest-name">
                    Your name (optional)
                  </label>
                  <input
                    id="guest-name"
                    value={guestName}
                    onChange={(event) => setGuestName(event.target.value)}
                    placeholder="A little wanderer"
                    maxLength={60}
                  />

                  <label htmlFor="guest-message">
                    Your little note
                  </label>
                  <textarea
                    id="guest-message"
                    value={guestMessage}
                    onChange={(event) =>
                      setGuestMessage(event.target.value)
                    }
                    placeholder="Tonight, I'm wishing for..."
                    rows={4}
                    maxLength={500}
                    required
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
