import type { CSSProperties } from "react";

export function About() {
  return (
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
  );
}