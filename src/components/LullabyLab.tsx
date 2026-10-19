
import { useState } from "react";
import { tone } from "../audio";
import "./projects.css";


type LullabyLabProps = {
  soundEnabled: boolean;
};

const NOTES = [
  { label: "C", frequency: 261.63 },
  { label: "D", frequency: 293.66 },
  { label: "E", frequency: 329.63 },
  { label: "G", frequency: 392.0 },
  { label: "A", frequency: 440.0 },
];

const MELODY = [0, 2, 4, 2, 1, 3, 2, 0];

export default function LullabyLab({ soundEnabled }: LullabyLabProps) {
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);

  function playNote(note: (typeof NOTES)[number]) {
    if (soundEnabled) {
      tone(note.frequency);
    }

    setPlayedNotes((previous) => [...previous.slice(-7), note.label]);
  }

  function playLullaby() {
    if (playing) return;

    setPlaying(true);

    MELODY.forEach((noteIndex, index) => {
      window.setTimeout(() => {
        const note = NOTES[noteIndex];

        if (soundEnabled) {
          tone(note.frequency);
        }

        setPlayedNotes((previous) => [
          ...previous.slice(-7),
          note.label,
        ]);

        if (index === MELODY.length - 1) {
          window.setTimeout(() => setPlaying(false), 350);
        }
      }, index * 350);
    });
  }

  return (
    <div className="lullaby-lab">
      <div className="lullaby-box-art" aria-hidden="true">
        <span className="lullaby-orbit">✧</span>
        <span className="lullaby-music-note">♫</span>
        <span className="lullaby-sparkle">✦</span>
      </div>

      <p className="lullaby-instruction">
        Tap a note and make a little dream of your own.
      </p>

      <div className="lullaby-keys" role="group" aria-label="Music box notes">
        {NOTES.map((note) => (
          <button
            key={note.label}
            type="button"
            className="lullaby-key"
            onClick={() => playNote(note)}
            aria-label={`Play ${note.label} note`}
          >
            <span>{note.label}</span>
            <small>♪</small>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="button button-primary lullaby-play"
        onClick={playLullaby}
        disabled={playing}
      >
        {playing ? "Playing your lullaby..." : "Play Pip's lullaby ♫"}
      </button>

      <p className="lullaby-status" role="status">
        {playedNotes.length
          ? `Your music box played: ${playedNotes.join(" · ")}`
          : "Your little melody is waiting."}
      </p>

      {!soundEnabled && (
        <p className="lullaby-muted">
          Sound is off. Turn it on using the sound control to hear your notes.
        </p>
      )}
    </div>
  );
}
