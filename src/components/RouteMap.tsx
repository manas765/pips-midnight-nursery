import { ArrowIcon } from "../lib";
import { MapMoon } from "./SvgArt";

type RouteMapProps = {
  onScrollTo: (id: string) => void;
};

export function RouteMap({ onScrollTo }: RouteMapProps) {
  return (
    <section className="route-section section-padding" id="route">
      <div className="section-wrap">
        <div className="section-label" data-reveal>
          <span>03 / FIND YOUR WAY</span>
          <span>FOLLOW THE LITTLE LIGHTS</span>
        </div>

        <div className="route-layout">
          <div className="route-copy" data-reveal>
            <span className="route-label">
              <span className="route-live-dot" />
              YOUR OWN LITTLE ADVENTURE
            </span>

            <h2>
              Where will
              <br />
              you <em>wander?</em>
            </h2>

            <p>
              There&apos;s no map for the things that make you feel
              alive. Just a few little signposts to help you begin.
              Pick a path, follow a star and see where you end up.
            </p>

            <div className="route-stats">
              <div>
                <strong>01</strong>
                <span>TAKE A BREATH</span>
              </div>

              <div>
                <strong>02</strong>
                <span>FOLLOW A STAR</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>KEEP WANDERING</span>
              </div>
            </div>

            <button
              className="button button-outline"
              onClick={() => onScrollTo("about")}
            >
              Find your next stop <ArrowIcon />
            </button>
          </div>

          <div
            className="route-map"
            data-reveal
            aria-label="Illustrated map of a dreamy village"
          >
            <div className="map-sky-glow" />
            <span className="map-constellation constellation-a">· ✦ · ✧</span>
            <span className="map-constellation constellation-b">✧ · ✦ ·</span>

            <span className="map-moon" aria-hidden="true">
              <MapMoon />
            </span>

            <svg
              className="route-path"
              viewBox="0 0 500 415"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M45 280 C85 270, 115 210, 170 230 S235 285, 275 205 S350 130, 435 100"
                fill="none"
                className="route-path-base"
              />

              <path
                d="M45 280 C85 270, 115 210, 170 230 S235 285, 275 205 S350 130, 435 100"
                fill="none"
                className="route-path-runner"
              />
            </svg>

            <div className="map-roof roof-one">
              <span className="roof-chimney" />
              <span className="roof-window" />
              <span className="roof-window" />
            </div>

            <div className="map-roof roof-two">
              <span className="roof-chimney" />
              <span className="roof-window" />
              <span className="roof-window" />
            </div>

            <div className="map-roof roof-three">
              <span className="roof-chimney" />
              <span className="roof-window" />
              <span className="roof-window" />
            </div>

            <div className="map-stop stop-one">
              <span>01</span>
              <small>THE BEGINNING</small>
            </div>

            <div className="map-stop stop-two">
              <span>02</span>
              <small>THE DREAM GARDEN</small>
            </div>

            <div className="map-stop stop-three">
              <span>03</span>
              <small>STARLIGHT HILL</small>
            </div>

            <span className="map-flying-star">✦</span>

            <div className="map-map-label">
              <span className="map-pin">⌖</span>
              <span>
                <strong>Somewhere magical</strong>
                <small>Just beyond your imagination</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}