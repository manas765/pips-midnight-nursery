# Pip's Midnight Nursery ☾

A dreamy, storybook-style portfolio for **Pip**, the baby skull and Junior Dream Engineer at the Midnight Nursery. Built for the hax.baby "baby problem" hackathon, Track 1.

> "I build the dreams you fall asleep inside."

**Live site:** https://pips-midnight-nursery-five.vercel.app/

## What's inside

- **Meet Pip:** an illustrated hero with eye-tracking pupils, a giggle on click, and a profile card (look, personality, profession).
- **Origin story:** a scroll-driven story told in short scenes, not a wall of text.
- **What Pip makes:** a shelf of project cards with a detail modal for each.
- **Dream route map:** an animated village map with a glowing path.
- **Mood toggle:** switch the whole site between dreamy, sleepy and dawn moods.
- **Hidden Easter egg:** a secret star in the hero wakes Pip up.
- **Mobile friendly:** layouts for phones, tablets and desktops, tested from 320 to 1440 px.

## Side quests

- **Click sounds and mute switch:** real Web Audio chimes on buttons and cards. Sound is off by default and the choice is remembered.
- **Responsive Chaos Mode:** a retro, whimsical layer that reshapes to the screen. Desktop gets tilted cards, edge stickers and a marquee ribbon. Tablets get a lighter version. Phones get stacked, wobbly cards with big tap targets.
- **Live guestbook wall:** visitors leave notes that appear as sticky notes for everyone (latest 20). Notes are limited to 300 characters, filtered for rude words, rate limited to one every 30 seconds, and shown as plain text only.
- **Sparkle cursor trail:** a pooled, lightweight trail that turns off on touch devices and for reduced-motion users.
- **Hit counter odometer:** a rolling counter in the footer that counts once per visit session.

## Tech stack

- [React](https://react.dev/) and TypeScript
- [Vite](https://vitejs.dev/)
- Plain CSS, inline SVG and WebP artwork
- [Supabase](https://supabase.com/) for the guestbook and the counter
- Web Audio API for sound
- Deployed on [Vercel](https://vercel.com/)

## Getting started

You will need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/manas765/pips-midnight-nursery.git
cd pips-midnight-nursery
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build     # production build in dist/
npm run preview   # preview the production build
```

### Optional: Supabase (guestbook and counter)

The site works without Supabase. The counter shows a fallback number and the guestbook explains that notes are only shown for the visit. To turn the live features on:

1. Create a free project at supabase.com.
2. In the SQL editor, create the tables:

```sql
create table guestbook (
  id bigint generated always as identity primary key,
  name text,
  message text not null check (char_length(message) <= 300),
  created_at timestamptz default now()
);
alter table guestbook enable row level security;
create policy "public read" on guestbook for select using (true);
create policy "public insert" on guestbook for insert with check (true);

create table counter (id int primary key, count bigint not null);
alter table counter enable row level security;
create policy "public read" on counter for select using (true);
insert into counter values (1, 1204);

create or replace function increment_counter() returns bigint
language sql security definer as $$
  update counter set count = count + 1 where id = 1 returning count;
$$;
```

3. Create `.env.local` in the project root (never commit it):

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

4. On Vercel, add the same two variables under Settings, Environment Variables, then redeploy. Use the anon key only, never the service role key.

## Project structure

```
src/
  App.tsx             # layout and shared state
  components/         # Hero, Story, Projects, RouteMap, About, Guestbook, Modals
  audio.ts            # Web Audio manager and mute state
  useClickChimes.ts   # click sounds on buttons and cards
  SparkleTrail.tsx    # cursor sparkle trail
  Counter.tsx         # footer hit counter odometer
  supabase.ts         # Supabase client (null when keys are missing)
  useViewport.ts      # sets viewport tier and CSS variables for Chaos Mode
  ChaosLayer.tsx      # stickers and marquee ribbon
  useModalA11y.ts     # Escape to close, focus trap and focus return
  *.css               # styles, one file per area
public/               # Pip artwork (WebP and PNG)
```

## Accessibility and performance

- Keyboard friendly: visible focus states, modals close with Escape and keep focus inside.
- Respects `prefers-reduced-motion` and turns decorative motion off.
- Lighthouse (mobile): Performance 88, Accessibility 100, Best Practices 96, SEO 100.

## Credits

Pip is the official hax.baby canon character. Written, designed and built by the Pip's Midnight Nursery team.
