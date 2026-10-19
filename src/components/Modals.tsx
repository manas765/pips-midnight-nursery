import { ArrowIcon } from "../lib";
import type { Project } from "./Projects";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
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
          onClick={onClose}
        >
          ×
        </button>

        <div
          className="modal-art"
          style={{
            background: "radial-gradient(circle, #fff7e8, #e8d6ed)",
          }}
        >
          <img
            className="modal-art-image"
            src={project.image}
            alt={project.title}
            loading="lazy"
          />
        </div>

        <div className="modal-content">
          <span className="project-category">{project.category}</span>

          <h2 id="project-modal-title">{project.title}</h2>
          <p>{project.details}</p>

          <div className="modal-note">
            <span>✧</span>
            {project.note}
          </div>

          <button className="button button-primary" onClick={onClose}>
            Back to the little things <ArrowIcon />
          </button>
        </div>
      </section>
    </div>
  );
}

type SecretModalProps = {
  onClose: () => void;
};

export function SecretModal({ onClose }: SecretModalProps) {
  return (
    <div
      className="modal-backdrop secret-backdrop"
      onClick={onClose}
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
          onClick={onClose}
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
          Keep this close, <strong>little wanderer.</strong>
        </div>

        <button className="button button-light" onClick={onClose}>
          I&apos;ll remember that ✦
        </button>
      </section>
    </div>
  );
}