# Pip's Midnight Nursery ☾

A dreamy, storybook-style website for curious souls, soft thoughts and the magic hiding in the ordinary. Built with React, TypeScript and Vite, with hand-drawn SVG artwork and a midnight plum, lavender and blush-pink palette.

<!-- Add a screenshot: save it as screenshot.png in the repo root, then uncomment the line below -->
<!-- ![Pip's Midnight Nursery](./screenshot.png) -->

**Live site:** [https://pips-midnight-nursery-five.vercel.app/](https://pips-midnight-nursery-five.vercel.app/) <!-- replace with your real Vercel URL -->

## Features

- **Illustrated hero** with an SVG crescent moon, clouds and twinkling stars
- **Story timeline** with three storybook cards
- **"Little Things" shelf** of project cards, each with its own SVG icon and a detail modal
- **Animated route map** of a dreamy village with a glowing path
- **Guestbook** where visitors can leave a note (shown for the visit only, not saved to a server)
- **Secret star** hidden in the hero that opens a small wish
- **Dawn mode** toggle that switches the site to a lighter theme
- **Sound toggle**, currently a visual preference only (no audio yet)
- Responsive layout, keyboard-friendly focus states, and support for `prefers-reduced-motion`

## Tech stack

- [React](https://react.dev/) with TypeScript
- [Vite](https://vitejs.dev/)
- Plain CSS (no UI framework)
- Inline SVG illustrations (no image assets)
- Google Fonts: Playfair Display, DM Sans, DM Mono

## Getting started

You'll need [Node.js](https://nodejs.org/) installed.

```bash
# clone the repo
git clone https://github.com/manas765/pips-midnight-nursery.git
cd pips-midnight-nursery

# install dependencies
npm install

# start the dev server
npm run dev
```

Then open http://localhost:5173 in your browser.

### Other commands

```bash
npm run build     # create a production build in dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  App.tsx       # all components, SVG illustrations and page sections
  styles.css    # global styles, themes and animations
  main.tsx      # app entry point
index.html
package.json
```

## Deployment

The site is deployed on [Vercel](https://vercel.com/). Every push to the `main` branch triggers a new deployment automatically.

## Roadmap

- Replace the moon with a full illustration of Pip
- Add real audio behind the sound toggle
- Save guestbook notes to a backend

## License

Add a license of your choice here (for example MIT), or remove this section.