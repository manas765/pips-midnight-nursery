import { useEffect, useRef, useState } from "react";
import { ArrowIcon, handleTilt, resetTilt } from "../lib";
import { tone } from "../audio";
import type { Mood } from "../mood";
import { PipFace } from "./PipFace";
import "../hero.css";

type HeroProps = {
  onSecret: () => void;
  onScrollTo: (id: string) => void;
  mood: Mood;
};

// A soft, slow lullaby hum (only audible when sound is on)
const HUM = [392, 440, 523.25, 440, 392, 329.63];

export function Hero({ onSecret, onScrollTo, mood }: HeroProps) {
  const [awake, setAwake] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  function wakePip() {
    if (awake) return;
    setAwake(true);
    HUM.forEach((freq, index) => tone(freq, 0.6, "sine", 0.05, index * 0.38));
    timers.current.push(window.setTimeout(onSecret, 1800));
    timers.current.push(window.setTimeout(() => setAwake(false), 5200));
  }

  return (
    <>
      {/* HERO */}
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            THE MIDNIGHT NURSERY
            <span>✦</span>
          </div>

          <h1>
            Hi, I&apos;m
            <br />
            <em>Pip</em>
            <span className="heading-period">.</span>
          </h1>

          <p className="hero-pretitle">Junior Dream Engineer</p>

          <p className="pip-tagline">
            “I build the dreams you fall asleep inside.”
          </p>

          <p className="hero-description">
            I stitch lullabies into blueprints. Please ignore the wobbling.
          </p>

          <div className="hero-actions">
            <button
              className="button button-primary"
              onClick={() => onScrollTo("story")}
            >
              Meet my story <ArrowIcon />
            </button>

            <button className="text-link" onClick={() => onScrollTo("work")}>
              <span className="play-symbol">▷</span>
              See what I&apos;m building
            </button>
          </div>

          <div className="hero-signoff">
            <div className="mini-avatars" aria-hidden="true">
              <span>☾</span>
              <span>✿</span>
              <span>✦</span>
            </div>

            <span>
              Hates silence. <strong>Giggles at everything.</strong>
            </span>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          className="hero-art-area"
          onPointerMove={(event) => handleTilt(event, 9)}
          onPointerLeave={resetTilt}
        >
          <div className="hero-art-halo" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="hero-art-card">
            <PipFace awake={awake} mood={mood} />
            <div className="card-glare" aria-hidden="true" />
          </div>

          <div className="floating-note note-lantern">
            <span className="note-icon">☼</span>
            <span>
              <strong>Now stitching</strong>
              <small>One very wobbly lullaby</small>
            </span>
          </div>

          <div className="floating-note note-dream">
            <span className="note-icon note-sparkle">✧</span>
            <span>
              <strong>Hates silence</strong>
              <small>So please say hi</small>
            </span>
          </div>

          <span className="hero-twinkle twinkle-a">✦</span>
          <span className="hero-twinkle twinkle-b">✧</span>
          <span className="hero-twinkle twinkle-c">✳</span>

          <button
            className="secret-star"
            aria-label="Discover a secret"
            title="Psst... tap me"
            onClick={wakePip}
          >
            ✦
          </button>

          <div className="hero-stamp">
            <span>✿</span>
            <small>
              Made with
              <br />a little magic
            </small>
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
          <span>
            <i>✦</i> BLUEPRINTS
          </span>
          <span>☾ LULLABIES</span>
          <span>
            <i>✦</i> NIGHTLIGHTS
          </span>
          <span>♡ DREAM DELIVERIES</span>
          <span>
            <i>✦</i> BLUEPRINTS
          </span>
          <span>☾ LULLABIES</span>
        </div>
      </div>
    </>
  );
}