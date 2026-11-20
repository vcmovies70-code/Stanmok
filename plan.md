# Stanmok Videography — implementation plan

## Product
A four-page React portfolio for Stanmok Videography, focused on video editing first and videography second. Pages: Home, About, Works / Collection, and Contact. The supplied photographs are the primary visual assets and are curated across the site.

## Project structure
- `src/main.jsx`: React entry point and lightweight pathname-based routing.
- `src/styles.css`: complete responsive visual system, layout, motion, and accessibility states.
- `public/manus-routes.json`: route manifest for the four pages.
- `index.html`: document shell and metadata.
- `plan.md`, `TODO.md`: project decisions and delivery outcomes.

## Design

### Design movement
Cinematic editorial / post-production studio — 0.06 probability.
Neo-noir portfolio — 0.03 probability.
Warm documentary journal — 0.07 probability.

### Chosen direction
**Design Movement:** Cinematic editorial post-production studio.

**Core Principles:** Let the imagery breathe; make typography feel like production credits; foreground editing craft over generic “creative agency” language; use restrained motion and intentional asymmetry.

**Color Philosophy:** Near-black graphite creates a dark-room editing-suite mood. Bone white keeps the work legible. A single amber-gold accent references timeline markers, practical light, and the warmth of a finished grade.

**Layout Paradigm:** Offset editorial compositions: oversized hero type on the left, image windows that break the grid, project cards with metadata rails, and generous horizontal rules that feel like a timeline.

**Signature Elements:** Amber “REC” indicator; thin timeline rules; compact all-caps metadata labels paired with oversized serif display type.

**Interaction Philosophy:** Navigation is immediate and quiet. Hover states reveal metadata and shift an image subtly rather than adding noisy effects. Buttons read like production notes: direct, specific, confident.

**Animation:** 220–500ms ease-out reveals, image scale from 1.02 to 1.0 on hover, route-level fade-up, and a slow ambient grain layer. Respect `prefers-reduced-motion`.

**Typography System:** `DM Sans` for UI, labels, and body copy; `Bodoni Moda` for display headlines and editorial emphasis. All caps labels use generous tracking. Keep headings short and high contrast.

**Brand Essence:** Stanmok Videography turns raw footage into images with rhythm, atmosphere, and intent. Personality: observant, exacting, cinematic.

**Brand Voice:** Clear, craft-led, and confident. Example lines: “Every frame earns its place.” / “Bring the footage. Leave with a film.”

**Wordmark & Logo:** A compact `ST /` monogram paired with the Stanmok name; the slash evokes an edit point and doubles as the site’s recurring mark.

**Signature Brand Color:** Edit Amber `#E9A45B`.

## Asset mapping
- `Enhance_image_quality_9f457c80_92b9168b.jpg`: About portrait / editor at work.
- `Enhance_image_quality_d4264c4c_6f3bbff7.jpg`: Works / timeline and edit suite.
- `Remove_TikTok_logo_and_quality_edec5a86_e7d07c91.jpg`: Home hero / color grading atmosphere.
- `Enhance_image_quality_c94a9d44_a536d941.jpg`: Works detail / finishing workflow.

## Implementation
Use Vite + React with a minimal dependency footprint. Client-side navigation is handled by pathname mapping so the four routes work cleanly in Preview and remain linkable. The contact CTA uses a `mailto:` inquiry link and the form is intentionally lightweight and accessible without a backend.
