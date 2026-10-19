import type { CSSProperties } from "react";
import { CloudCluster, DoodleMoon } from "./SvgArt";

export function Story() {
  return (
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
  );
}