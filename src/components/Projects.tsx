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
    category: "DREAM JOURNAL",
    title: "The Cloud Keeper",
    description: "A little collection of dreams, clouds and things worth remembering.",
    symbol: "☁️",
    image: "/pip_avatar_cloud.webp",
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
    image: "/pip_lullaby_box.png",
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
    image: "/pip_dream_lantern.png",
    details:
      "The Star Collector is a story concept about collecting moments of wonder. Every star represents a memory, a lesson or a small act of kindness.",
    note: "Every little light has a story.",
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