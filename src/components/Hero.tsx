import { ArrowIcon, handleTilt, resetTilt } from "../lib";

type HeroProps = {
  onSecret: () => void;
  onScrollTo: (id: string) => void;
};

export function Hero({ onSecret, onScrollTo }: HeroProps) {
  return (
    <>
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
              onClick={() => onScrollTo("story")}
            >
              Come on in <ArrowIcon />
            </button>

            <button className="text-link" onClick={() => onScrollTo("work")}>
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
            onClick={onSecret}
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
            <i>✦</i> SOFT THOUGHTS
          </span>
          <span>☾ MIDNIGHT MAGIC</span>
          <span>
            <i>✦</i> LITTLE DISCOVERIES
          </span>
          <span>♡ A PLACE TO BELONG</span>
          <span>
            <i>✦</i> SOFT THOUGHTS
          </span>
          <span>☾ MIDNIGHT MAGIC</span>
        </div>
      </div>
    </>
  );
}