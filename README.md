# ⚡ Oakenfull Alternate

> An immersive, game-inspired portfolio site inspired by Paragon's UI aesthetics.

---

## Potential Features

- AAA game-style UI inspired by Paragon
- Fully responsive layout with dynamic parallax and particle effects
- Glassmorphism with holographic layers
- Dark sci-fi palette with neon gradient accents
- Toggleable performance modes (low-end friendly)
- Global sound effects with mute option
- Animated day/night theme switching
- Code-splitting and lazy loading for performance

---

## Current state

![Current State](/Screenshot%202025-07-20%20at%2011-24-22.png "Current State")

---

## Tech Stack

- **React** (core framework)
- **Tailwind CSS** (utility-first styling)

---

## Project Structure

```bash
src/
├── assets/          # Images, audio, shaders
├── components/      # Reusable UI elements (buttons, cards, nav)
├── features/        # Major sections like Hero, About, Projects
├── hooks/           # Custom React hooks
├── styles/          # Tailwind config and custom overrides
├── utils/           # Helpers (e.g., animation configs)
└── App.jsx          # Entry point
```

---

## Modules

| Section       | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **Hero**      | A responsive, dark‑themed game home screen with a semi‑transparent top navigation bar, a full‑width promotional hero banner featuring title, subtitle and View Projects button, a four‑column grid of feature cards for various developer related items, and a footer displaying command prompts and status info.|
| **About**     | Character‑select layout, showing a grid of hero portraits with a framework/type of development (e.g front-end) selected, and hovering over it brings up an overlay displaying the developers stats based.|
| **Projects**  | Major Projects: Similar to the About character page, a grid of cards for each project, cinematic reveal, mouse‑responsive tilt, expand to full case study. Minor Projects: Holographic cards that tilt on pointer move, animated filters, modal quick view underneath major projects.|
| **Contact**   | Command‑center panel, materialising form fields, game‑style success and error feedback.|
| **Footer**    | Game-style status bar with keyboard shortcut hints                          |

---

## Performance Goals

- 60 FPS on mid-tier hardware
- Smart resource loading (intersection observers, lazy routes)
- Reduced motion fallbacks for accessibility

---

## Roadmap Highlights

- [ ] Animated theme toggle (light/dark)
- [ ] Parallax with pointer + gyroscope support
- [ ] AI-generated holograms as easter eggs
- [ ] Localized audio reactivity
- [ ] Save state for toggles/preferences using localStorage

---

## Live Preview

> Coming Soon...

---

## Background & Inspiration

This project was born from a desire to blend immersive game UI with professional portfolio storytelling. Inspired by the UI style of **Paragon** by Epic Games, it reimagines standard web navigation as an interactive, cinematic experience for developers and digital creatives.
