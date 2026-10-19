import "../hero.css";

const CHIPS = ["Curious", "Sleepy", "A little clumsy", "Easily delighted", "Giggly", "Hates silence"];

export function ProfileCard() {
  return (
    <article className="profile-card" aria-label="Pip's profile card">
      <div className="profile-photo">
        <img
          src="/pip_portrait.webp"
          alt="Pip, a baby skull in a starry nightcap with a pink bow, holding a glowing lantern and a unicorn music box"
          width={682}
          height={1024}
          loading="lazy"
        />
      </div>

      <div className="profile-body">
        <h3 className="profile-name">Pip</h3>
        <p className="profile-role">Junior Dream Engineer, Midnight Nursery</p>

        <dl className="profile-facts">
          <div>
            <dt>Age</dt>
            <dd>Baby</dd>
          </div>
          <div>
            <dt>Look</dt>
            <dd>
              Smooth round skull, huge soft eyes with glowing pinpricks, a
              tiny crooked smile, and a starry nightcap with a pink bow.
            </dd>
          </div>
        </dl>

        <ul className="profile-chips">
          {CHIPS.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>

        <p className="profile-tagline">
          “I build the dreams you fall asleep inside.”
        </p>
      </div>
    </article>
  );
}