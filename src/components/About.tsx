import type { CSSProperties } from "react";
import { ProfileCard } from "./ProfileCard";

export function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner section-wrap">
        <div className="profile-slot" data-reveal>
          <ProfileCard />
        </div>

        <div
          className="about-copy"
          data-reveal
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
        >
          <div className="section-label">
            <span>04 / MEET PIP</span>
          </div>

          <h2>
            A little sleepy.
            <br />
            Very <em>curious.</em>
          </h2>

          <p className="about-lead">
            Somebody has to wire the lullabies. Apparently it&apos;s me.
          </p>

          <p>
            I draw blueprints for dreams, stitch them together at night
            and deliver them before sunrise. Sometimes I trip on the
            wires. Hehe.
          </p>

          <blockquote className="about-quote">
            “Silence is just a lullaby that hasn&apos;t started yet.”
            <span>PIP, ENGINEER OF DREAMS</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}