# Pip's Midnight Nursery ☾

A cozy, storybook-style portfolio hosted by **Pip**, the canon skull baby and Junior Dream Engineer at the Midnight Nursery. *"I build the dreams you fall asleep inside."*

Built for **haX.baby, Track 1 (Pip's Midnight Nursery)**.

**Live site:**(https://pips-midnight-nursery-five.vercel.app/)
**Repo:** https://github.com/manas765/pips-midnight-nursery

## Meet Pip

Pip is a baby with a smooth, round skull face, huge soft eye sockets with glowing pinpricks, a tiny crooked smile, and a starry nightcap with a pink bow. He is curious, sleepy, a little clumsy, easily delighted, giggles at everything and hates silence. He narrates the whole site in the first person.

## Features

**The six required elements**
1. **What Pip is:** a hero and profile card with his look, personality chips, profession and tagline
2. **What Pip does:** three canon showcase projects (The Lullaby Lab, Nightlight Collection, Dream Delivery Routes), each with a detail view
3. **Pip's story:** a scroll-driven origin story told in pinned scenes, with no wall of text
4. **Immersion:** Pip's glowing pupils follow the cursor, tapping him makes him giggle, and every sound sits behind a mute switch (muted by default)
5. **Mobile friendly:** responsive layout for phones and tablets, with reduced-motion support
6. **Hidden Easter egg:** a secret star that wakes Pip up

**Extras**
- Mood toggle with three moods (Dreamy, Sleepy, Dawn) that change the palette and Pip's expression
- Pip's Growth Chart, his skills as a nursery height chart
- Web Audio sounds: chimes, giggles and a lullaby hum
- Sparkle cursor trail
- Guestbook wall and a "Dreams delivered" counter, saved with Supabase
- Responsive Chaos Mode that reshapes the layout by screen size
- Keyboard-friendly modals (Escape closes them) and optimised WebP artwork

## Tech stack

- React + TypeScript + Vite
- Plain CSS (one stylesheet per area: hero, mood, story, growth, chaos)
- Inline SVG scenes and decorations
- Web Audio API for all sound (no audio files)
- Supabase for the guestbook and counter
- Deployed on Vercel (auto-deploys on every push to `main`)

## Getting started

You need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/manas765/pips-midnight-nursery.git
cd pips-midnight-nursery
npm install
npm run dev
```

Open http://localhost:5173.

### Environment variables (guestbook and counter)

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without these the site still works: the counter shows a fallback number and the guestbook falls back gracefully.

### Other commands

```bash
npm run build     # production build in dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  App.tsx            # layout and shared state (mood, modals)
  audio.ts           # Web Audio manager and mute switch
  mood.ts            # mood definitions
  lib.tsx            # shared helpers
  components/        # Hero, PipFace, ProfileCard, Story, Projects,
                     # RouteMap, GrowthChart, About, Guestbook, Modals, ...
  *.css              # hero, mood, story, growth, projects, systems, chaos
public/              # Pip artwork (WebP)
scripts/to-webp.mjs  # converts the official PNGs to WebP
```

## Team

Built by a team of three during the haX.baby sprint (17 to 19 October 2026).

- **Srishti Srivastava:** Pip, hero, profile card, eye tracking, origin story, mood toggle, Easter egg, Growth Chart
- **Manashvi Sharma:** project shelf, playable Lullaby Lab, Nightlight Collection, Dream Delivery map
- **Akshata Srivastava:** audio and mute, sparkle trail, hit counter, guestbook, Chaos Mode, QA

## Credits

- Pip artwork (cloud hero, music box, dream lantern, portrait): official haX.baby **Pip Creator Asset Pack**
- Scene illustrations, decorations and Pip's mood overlays: hand-built SVG and CSS by the team
- Fonts: Playfair Display, DM Sans and DM Mono from Google Fonts
- Built with help from Claude (Anthropic) as an AI coding assistant

## License

Made for the haX.baby hackathon. Pip and the official artwork belong to haX.baby.

## Performance

Lighthouse (mobile): Performance 88, Accessibility 100, Best Practices 100, SEO 100.

