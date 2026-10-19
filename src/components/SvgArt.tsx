export function DoodleMoon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <defs>
        <mask id="doodleMoonMask">
          <rect width="64" height="64" fill="white" />
          <circle cx="36" cy="24" r="17" fill="black" />
        </mask>
      </defs>

      <g mask="url(#doodleMoonMask)">
        <circle cx="26" cy="32" r="20" fill="#b79bc4" />
      </g>

      <path
        d="M50 12 l2.2 6 l6 2.2 l-6 2.2 l-2.2 6 l-2.2 -6 l-6 -2.2 l6 -2.2Z"
        fill="#c9849f"
      />

      <path
        d="M52 42 l1.2 3.2 l3.2 1.2 l-3.2 1.2 l-1.2 3.2 l-1.2 -3.2 l-3.2 -1.2 l3.2 -1.2Z"
        fill="#d9b3c9"
      />
    </svg>
  );
}

export function CloudCluster() {
  return (
    <svg viewBox="0 0 160 70" width="100%" height="100%" aria-hidden="true">
      <g fill="#c7a3c4" opacity="0.45">
        <ellipse cx="50" cy="52" rx="44" ry="13" />
        <circle cx="32" cy="42" r="15" />
        <circle cx="54" cy="33" r="20" />
        <circle cx="76" cy="43" r="13" />
      </g>

      <g fill="#c7a3c4" opacity="0.35">
        <ellipse cx="112" cy="56" rx="36" ry="10" />
        <circle cx="98" cy="48" r="12" />
        <circle cx="116" cy="41" r="16" />
        <circle cx="134" cy="49" r="10" />
      </g>
    </svg>
  );
}

export function MapMoon() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="mapMoonFill" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fbeefc" />
          <stop offset="100%" stopColor="#d9c2f0" />
        </radialGradient>

        <mask id="mapMoonMask">
          <rect width="100" height="100" fill="white" />
          <circle cx="64" cy="38" r="30" fill="black" />
        </mask>
      </defs>

      <g mask="url(#mapMoonMask)">
        <circle cx="48" cy="52" r="36" fill="url(#mapMoonFill)" />
        <circle cx="30" cy="62" r="5" fill="#bfa6d8" opacity="0.5" />
        <circle cx="38" cy="38" r="3" fill="#bfa6d8" opacity="0.45" />
      </g>
    </svg>
  );
}

export function AboutMoon() {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="aboutMoonFill" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="65%" stopColor="#f7e3c4" />
          <stop offset="100%" stopColor="#e8cadb" />
        </radialGradient>

        <radialGradient id="aboutHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6dc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff6dc" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="aboutCloudFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e3d0ec" />
        </linearGradient>

        <mask id="aboutMoonMask">
          <rect width="300" height="300" fill="white" />
          <circle cx="178" cy="98" r="52" fill="black" />
        </mask>

        <path
          id="aboutStar"
          d="M0,-10 C1.5,-3 3,-1.5 10,0 C3,1.5 1.5,3 0,10 C-1.5,3 -3,1.5 -10,0 C-3,-1.5 -1.5,-3 0,-10Z"
        />
      </defs>

      <circle cx="140" cy="118" r="100" fill="url(#aboutHalo)" />

      <g mask="url(#aboutMoonMask)">
        <circle cx="138" cy="120" r="64" fill="url(#aboutMoonFill)" />
        <circle cx="98" cy="160" r="9" fill="#d9bfd0" opacity="0.5" />
        <circle cx="120" cy="82" r="6" fill="#d9bfd0" opacity="0.45" />
        <circle cx="88" cy="100" r="4" fill="#d9bfd0" opacity="0.4" />
      </g>

      <path
        d="M88 128 q8 7 16 0"
        stroke="#8a6a8f"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M98 154 q6 5 12 0"
        stroke="#d58fa8"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      <circle cx="84" cy="144" r="7" fill="#f2b5c6" opacity="0.6" />

      <g fill="#fff3c9" stroke="#e8cf9a" strokeWidth="0.5">
        <use href="#aboutStar" transform="translate(216 72) scale(1.3)" />
        <use href="#aboutStar" transform="translate(236 150) scale(0.7)" />
        <use href="#aboutStar" transform="translate(70 66) scale(0.8)" />
      </g>

      <g fill="url(#aboutCloudFill)">
        <g transform="translate(62 186) scale(0.95)">
          <ellipse cx="60" cy="40" rx="62" ry="20" />
          <circle cx="38" cy="28" r="20" />
          <circle cx="70" cy="20" r="26" />
          <circle cx="98" cy="32" r="18" />
        </g>

        <g transform="translate(150 204) scale(0.6)">
          <ellipse cx="60" cy="40" rx="62" ry="20" />
          <circle cx="38" cy="28" r="20" />
          <circle cx="70" cy="20" r="26" />
          <circle cx="98" cy="32" r="18" />
        </g>
      </g>

      <text
        x="150"
        y="268"
        textAnchor="middle"
        style={{
          fontFamily: "var(--display)",
          fontSize: 22,
          fill: "#72547f",
        }}
      >
        little by little
      </text>
    </svg>
  );
}