# Stanmok Videography — portable website handoff

This folder contains the complete React/Vite website source, all supplied photography, the ST mark, route manifest, project configuration, production build output, and design notes for Stanmok Videography.

## Run locally

1. Install Node.js 18+.
2. From this folder, run `npm install`.
3. Start development with `npm run dev -- --port 3000`.
4. Create a production build with `npm run build`.
5. Preview the production build with `npm run preview -- --port 3000`.

The copied source uses local assets under `public/images/`, so it does not depend on the managed `/manus-storage/` paths used by the hosted project. The Lagos map is an OpenStreetMap iframe and requires an internet connection to render.

## Contents

- `src/main.jsx` — React pages, client-side navigation, live timecode clock, collection cards, map, footer, and contact form.
- `src/styles.css` — responsive design system, vivid accents, motion graphics, typography, layout, and mobile rules.
- `public/images/` — the four supplied photographs.
- `public/mark.svg` — ST slash brand mark.
- `public/manus-routes.json` — route manifest for Home, About, Works, and Contact.
- `dist/` — generated production output.
- `plan.md` and `TODO.md` — design direction and delivery outcomes.

The display headlines use the Google Font `Syne`; body/UI copy uses `DM Sans`. Both are declared in `index.html` and load from Google Fonts when online.
