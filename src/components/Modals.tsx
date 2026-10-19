import { useEffect } from "react";
import { ArrowIcon } from "../lib";
import type { Project } from "./Projects";

function useEscape(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
}

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEscape(onClose);

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
  useEscape(onClose);

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
        <span className="guestbook-kicker">YOU WOKE ME UP</span>

        <h2 id="secret-title">
          You found my <em>wish star.</em>
        </h2>

        <p>
          It fell into my nightcap one night and has been humming ever
          since. I hum along because I hate silence. Hehe. Keep it close.
        </p>

        <div className="secret-signature">
          Sleep tight, <strong>Pip</strong> ✧
        </div>

        <button className="button button-light" onClick={onClose}>
          Hehe, okay ✦
        </button>
      </section>
    </div>
  );
}