import type { CSSProperties } from "react";
import { ArrowIcon, handleTilt, resetTilt } from "../lib";


export type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  symbol: string;
  image: string;
  details: string;
  note: string;
};

export const projects: Project[] = [
  {
    number: "01",
    category: "LULLABY LAB",
    title: "The Lullaby Lab",
    description: "I built a little music box and tucked my first lullaby inside.",
    symbol: "♫",
    image: "/pip_lullaby_box.webp",
    details:
      "Welcome to my Lullaby Lab! I wind my little music box, arrange sleepy notes, and stitch them into melodies for dreamers across the night sky.",
    note: "Every dream deserves its own little tune.",
  },
  {
    number: "02",
    category: "NIGHTLIGHT COLLECTION",
    title: "Nightlight Collection",
    description: "I designed sleepy little lights to make bedtime feel cozy.",
    symbol: "✦",
    image: "/pip_dream_lantern.webp",
    details:
      "These are my handmade dream lights! Each lantern glows with a little warmth, helping the nighttime feel softer. Pick a light and let your own tiny corner glow.",
    note: "A little light goes a long way.",
  },
  {
    number: "03",
    category: "DREAM DELIVERY",
    title: "Dream Delivery Routes",
    description: "I fly freshly stitched dreams over rooftops to my sleepy neighbours.",
    symbol: "☁",
    image: "/pip_avatar_cloud.webp",
    details:
      "I'm Pip, Junior Dream Engineer, and every night I deliver dreams across the village. Follow my winding route past sleepy rooftops and glowing windows. There's always one more dream waiting!",
    note: "Dream delivery in progress. Please stay cozy.",
  },
];

type ProjectsProps = {
  onSelect: (project: Project) => void;
};

export function Projects({ onSelect }: ProjectsProps) {
  return (
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
              style={{
                "--reveal-delay": `${index * 120}ms`,
              } as CSSProperties}
            >
              <button
                className={`project-card project-card-${project.number.slice(-1)}`}
                onClick={() => onSelect(project)}
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
  );
}