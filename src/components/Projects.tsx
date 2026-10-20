
import "./projects.css";

export interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  symbol: string;
  image: string;
  details: string;
  note: string;
}

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


interface ProjectsProps {
  onSelect: (project: Project) => void;
}

export function Projects({ onSelect }: ProjectsProps) {
  return (
    <section className="work-section" id="work">
      <div className="section-heading">
        <p className="eyebrow">A LITTLE MAGIC AFTER DARK</p>
        <h2>Things I made under the moonlight</h2>
        <p>Every little project begins with a dream. Here are a few of mine.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <button
              type="button"
              className="project-card-button"
              onClick={() => onSelect(project)}
            >
              <div className="project-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.src.endsWith(".webp")) {
                      image.src = project.image.replace(/\.webp$/, ".png");
                    }
                  }}
                />
                <span className="project-symbol" aria-hidden="true">
                  {project.symbol}
                </span>
              </div>

              <div className="project-card-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <span className="project-link">
                  Explore project <span aria-hidden="true">↗</span>
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
