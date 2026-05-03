---
name: peak-scale-design
description: Use this skill to generate well-branded interfaces and assets for Peak Scale (Cloud Native Consulting & Platform Engineering, Switzerland), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `colors_and_type.css` — drop-in CSS variables (Work Sans + cool blue/white + warm rope-yellow accents, shadcn-compatible HSL tokens).
- `assets/` — vendored logos and reference photography. Do NOT redraw.
- `preview/` — single-concept design-system cards (type, colors, spacing, components).
- `ui_kits/website/` — JSX components recreating the marketing site; `index.html` is an interactive walkthrough.

Tone: Swiss understatement, technical, pragmatic. German primary (formal "Sie"), English secondary. No emoji. Headlines are `font-weight: 300`. Reds and oranges are out of palette.
