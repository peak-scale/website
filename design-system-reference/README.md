# Peak Scale Design System

Cloud Native Consulting & Platform Engineering, based in Bern, Switzerland.
Hands-on partner for platform-engineering teams: strategy → architecture →
engineering → operations, with a focus on Kubernetes, GitOps and platform
operations.

> **Tonality.** Technical, pragmatic, precise. Swiss understatement, not
> marketing pathos. Quiet confidence, no superlatives.

---

## Sources

| Source | Where | Status |
| --- | --- | --- |
| **Hi-fi Figma — "Peak Scale (DEV).fig"** | mounted at `/Homepage/...` (DM Sans, bright Swiss blue, icy-white surfaces, soft brand-tinted shadows) | **Source of truth.** All tokens, type, colour, layout decisions in this system follow the Hi-fi. |
| Lo-fi prototype (early Lovable build) | `ooliv Design System/peakscale-lofi.html` | Historical. Used Work Sans + shadcn defaults; superseded by the Hi-fi. Kept for content / copy reference only. |
| ooliv design briefs (PDF, German) | `ooliv Design System/Phase 1_…pdf`, `Phase 2_…pdf`, `Narrativ und Bildsprache Bergsteigen.pdf`, `Feedback Startseite…pdf` | Strategy + visual narrative. |
| Hugo legacy site | `https://github.com/peak-scale/website` (default branch `main`) | Source of original wordmark / logo SVGs. |

> **Note for future agents.** When the lo-fi prototype, the legacy site, or
> default shadcn tokens disagree with the Hi-fi Figma, follow the Hi-fi.
> The lo-fi was an experimental direction; the Figma is the agreed
> visual system.

---

## Index

- `README.md` — this file.
- `SKILL.md` — Agent-Skill metadata so this folder is portable to Claude Code.
- `colors_and_type.css` — design tokens (CSS custom properties) + base
  semantic styles. Drop-in via `<link rel="stylesheet" href="colors_and_type.css">`.
- `assets/` — logos, icons, photography. Use these directly; never redraw.
- `preview/` — design-system preview cards (one HTML file per concept).
- `ui_kits/website/` — high-fidelity recreation of the Peak Scale marketing
  site as composable JSX components + an interactive `index.html`.

---

## Brand at a glance

**Name.** Peak Scale — *Peak* = summit / outcome, *Scale* = load-bearing
capacity / growth. The mountain reference is a **technical metaphor**, not
an outdoor-lifestyle aesthetic. Think topographic lines, route check-points,
co-ordinate grids — never dramatic summit photography or guide-book clichés.

**Voice.** German is the primary language (Swiss-German market).
- Sober, declarative sentences. No exclamation marks.
- "Wir" (we) for Peak Scale, "Sie" (formal you) for clients.
- Concrete deliverables, no marketing inflation. Examples preferred over
  adjectives.
- Tech vocabulary stays English when that's the field convention
  (Kubernetes, GitOps, Argo CD, Capsule, OpenTofu, SLSA, Killercoda).
- No emoji. Bullets use an em-dash or en-dash glyph rather than `•`.

**Lifecycle metaphor.** Strategy → Architecture → Engineering → Operations.
Used as a route / stage motif. Service tiers map to climbing stages:
Architecture (highest stage) → Platform Engineering → Assessments →
Training & Enablement.

**Pages.** Startseite (home), Services, Produkte, Team. Plus Impressum &
Datenschutz.

---

## Visual foundations (Hi-fi)

**Colour vibe.** Cool, Swiss, optimistic. Built on an icy blue-white
surface — never pure `#fff` for the page — with one bright Swiss blue as
the only primary accent. A very-dark navy carries inverse surfaces (the
footer, the dark gradient hero card). Body lives in a cool desaturated
gray. Sage green and warm gold appear in tiny doses (status pings, tag
chips, illustration details), never as section backgrounds.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `rgb(240,248,252)` | Page background — the icy blue-white. |
| `--bg-white` | `rgb(255,255,255)` | Card surface. |
| `--brand` | `rgb(5,128,196)` | Primary accent — eyebrows, dots, CTAs, links. |
| `--brand-deep` | `rgb(26,69,156)` | Strong text on light, hover state. |
| `--fg` | `rgb(9,24,54)` | Display ink. |
| `--fg-deep` | `rgb(7,19,44)` | Footer / inverse surface. |
| `--fg-muted` | `rgb(81,87,99)` | Body copy (cool gray). |
| `--accent-sage` | `rgb(144,202,125)` | Reserved for status. |
| `--accent-gold` | `rgb(184,169,120)` | Reserved for tag detail. |

Reds and oranges are explicitly out of palette.

**Type.** **DM Sans** for everything except small UI labels, which use
**Inter Bold** uppercase with `0.1em` tracking. Display headlines use
DM Sans **Light (300)** and run very large — the home page section header
"Warum Peak Scale?" is set at **128 px Light**, the hero headline at
**86 px Medium**. Body is DM Sans Regular 18 px in `--fg-muted`. Lead text
is 24 px. The lo-fi's Work Sans + 300-weight headline rule is **out**; the
Hi-fi uses Light only at display sizes, Medium at body-headline sizes, and
the eyebrow flips to Inter so it reads as a different family.

**Eyebrows.** Two flavours:
- **Plain** — Inter Bold 12-14 px, uppercase, `0.1em` tracking, in
  `--brand` blue. Sits flush above a headline.
- **Pill** — same type, wrapped in a white rounded-pill (`--radius-pill`,
  60 px) with `12px 16px` padding. Used in the hero stack.

**Backgrounds.** No gradients on body sections. The page sits on `--bg`
with white cards floating on top. The dark gradient (`rgb(5,128,196)` →
`rgb(9,24,54)`) appears only inside specific feature cards or behind the
hero photographic block. Decorative motifs: large soft-blue circles + thin
abstract vector arcs at low opacity, used as background art.

**Imagery vibe.** Cool / desaturated photography. Mountain references read
as terrain or topography — never a hero summit-shot. We've imported two
muted alpine reference photos (`assets/topo-mountain-1.jpg`,
`topo-mountain-2.jpg`); prefer placeholder blocks when in doubt.

**Animation.** Minimal. `.18s ease` on links, `.2s ease` on cards.
Section reveal is a fade + 10 px translate. Hover = colour shift on links;
cards lift `2 px` and tint their border `--brand-mid`. Nothing bounces.

**Hover states.**
- Pill / button: primary darkens `--brand` → `--brand-deep`.
- Cards: border `--border` → `--brand-mid`, lifts 2 px, shadow stays.
- Nav links (inactive): muted-foreground → `--brand`.

**Press / active.** `transform: scale(.98)` on buttons. No colour flash.

**Borders.** 1 px `--border` (`rgb(208,214,227)`). Hover lifts to
`--brand-mid`. Section dividers use a 1 px hairline, not a band.

**Shadows — the signature elevation.** A four-stop layered RGBA-blue
shadow (`--shadow-brand`) is used on cards. It fades from a sharp 6 px
blur to a wide 17 px halo, all in `rgb(5,128,196)` at low alpha. This is
what separates Hi-fi cards from generic card-with-shadow patterns; do
not replace with `--shadow-md` or a neutral drop-shadow.

```
--shadow-brand:
   0   3px  6px 0 rgba(5,128,196,.10),
   0  11px 11px 0 rgba(5,128,196,.09),
   0  24px 14px 0 rgba(5,128,196,.05),
   0  43px 17px 0 rgba(5,128,196,.01);
```

**Transparency / blur.** The "glass" card variant uses
`backdrop-filter: blur(60px)` over a near-transparent white. Used
sparingly — typically one per row.

**Corner radii.**
- `--radius-lg` (16 px) — canonical card / hero block radius.
- `--radius-pill` (60 px) — pills, buttons, eyebrow pills, contact button.
- `--radius-md` (8 px) — inputs, small chips.
- `--radius-sm` (4 px) — code blocks, micro-tags.

Buttons that look like *actions* are full-pill; buttons that look like
*boxes* (form fields, tags) are `--radius-md`.

**Cards.** White background, 1 px border, 16 px radius, `--shadow-brand`
at rest. Padding is `var(--space-8)` (32 px) standard. Three variants:
- `.card` — default white-on-icy.
- `.card--glass` — translucent + 60 px backdrop blur.
- `.card--brand` — dark gradient (brand → deep), white text, used for
  one feature tile per row max.

**Nav separator.** A small **6 px blue square rotated 45°** sits between
nav items in the header, replacing the usual middle-dot. Implemented as
`.dot-square`.

**Layout rules.**
- Container max-width is `1200 px`.
- Hero is 2-column desktop (text + image/placeholder), single-column mobile.
- Floating header lives 12–16 px from top, full-width pill chrome.
- Floating contact button sits bottom-right with safe-area inset padding.
- Section padding scales: `py-12 sm:py-16 lg:py-24` (48 → 96 → 120 px).

**Mobile menu.** Hamburger → fullscreen overlay (no slide-in drawer).
Big light-weight links, language toggle, contact block. Closes with `×`.

---

## Content fundamentals

How copy is written, with examples drawn from both the lo-fi prototype and
the Figma Hi-fi.

**Sentence shape.** Short → medium → short. Ends often drop into a clause
introduced by an em-dash, naming the reason or the trade-off.
- "Wir begleiten Sie von technischer Orientierung und Architektur bis zur
  Umsetzung — damit Cloud Native Plattformen stabil, sicher und langfristig
  betreibbar sind."
- "Pragmatisch und iterativ: evidenzbasierte Entscheidungen und
  Architekturen, die tragen und mitwachsen."

**Eyebrows / micro-copy.** Set in uppercase, wide-tracking (`0.1em`), Inter
Bold. Used to label a phase, route, or process — never as a slogan.
- `STRATEGIE → ARCHITEKTUR → ENGINEERING → BETRIEB`
- `WARUM PEAK SCALE`

**Headline weight.** Display sizes (≥ 64 px) use DM Sans Light 300; body
headlines use DM Sans Medium 500. Tracking pulled in tight (`-0.02em`).

**Lists.** Short, parallel, ideally three to five items. Bullet glyph is
`–` (en-dash), not `•`.

**Testimonials.** Italic muted quote, then `— Role, Organisation` on its
own line. Quotation mark rendered as a centred 12 px round chip on the
left. No avatars.

**Contact register.** "welcome@peakscale.ch", "Ryffligässchen 5,
CH-3011 Bern", "Peak Scale GmbH". German formal register.
`welcome@` (not `hello@`).

**Casing.** German nouns capitalised. Anglicisms keep their conventional
capitalisation (Cloud Native, GitOps, Kubernetes Security Assessment).
Section headings are sentence-case, not Title-Case.

**Casing for buttons.** Sentence case in the prototype:
"Produkte ansehen", "Kontakt", "Menü öffnen".

**Casing for tabs/nav.** Title-case singular German nouns: Services,
Produkte, Team.

---

## Iconography

The brand uses **Lucide** stroke icons. Stroke width `2`, square caps,
square joins. Sizes: 16 px for inline-with-text, 24 px for inline labels,
48 px (`w-12 h-12`) for section markers.

Specific icons observed in the prototype, mapped to sections:
- `cloud`            — *Cloud & Architektur*
- `code`             — *Engineering*
- `clipboard-check`  — *Assessments*
- `graduation-cap`   — *Training & Enablement*
- `mail`             — floating contact button
- `menu` / `x`       — mobile nav
- `linkedin`         — footer social
- `arrow-right`      — CTA

**Logo glyph.** A custom 24-grid SVG: two summit triangles (one tall, one
short) overlaid with a dotted route line and a route-start dot. Used in
the header at 20–24 px next to the wordmark. Vendored at
`assets/peakscale-icon.svg`.

**Emoji.** Not used. Anywhere. Including microsite UI. Use a Lucide icon
or omit.

**Unicode glyphs.**
- En-dash `–` for list bullets.
- Em-dash `—` for sentence breaks ("— Senior IT Architect, …").
- Centred dot `•` for inline footer separators.
- Quote `"…"` for testimonials (typographic curly when in body copy).

---

## Logos & brand assets

| Asset | Path | Notes |
| --- | --- | --- |
| Wordmark + glyph (light bg) | `assets/peakscale-logo.svg` | Original from Hugo site. Bright Swiss blue (matches Hi-fi `--brand`). |
| Wordmark (dark bg) | `assets/peakscale-logo-dark.svg` | White on dark. |
| Square logo (PNG) | `assets/peakscale-logo-square.png` | Social / favicon source. |
| Square logo (transparent PNG) | `assets/peakscale-logo-square-transparent.png` | Use on photography. |
| Glyph only | `assets/peakscale-icon.svg` | Two-summit chevron. |
| Apple-touch icon | `assets/apple-touch-icon.png` | 180×180. |
| 192 px PNG icon | `assets/icon-192.png` | PWA. |
| Topographic photo 1 | `assets/topo-mountain-1.jpg` | Cool-toned alpine reference. |
| Topographic photo 2 | `assets/topo-mountain-2.jpg` | Cool-toned alpine reference. |

---

## Caveats

- **Lo-fi vs. Hi-fi.** The lo-fi was an early Lovable experiment built on
  shadcn defaults + Work Sans. The agreed visual system is the Figma
  Hi-fi: DM Sans, bright Swiss blue, icy-white surfaces, brand-tinted
  shadow stack, Inter for eyebrows. Earlier iterations of this README
  inverted that priority — they have been corrected.
- **Sage / gold accents.** Defined as `--accent-sage` and `--accent-gold`,
  reserved for status / illustration detail. Not for marketing flash.
- **Fonts.** DM Sans + Inter are loaded from Google Fonts. No local TTFs
  are shipped; for offline use drop the families into `fonts/` and rewire
  the `@import` rule to `@font-face`.
- **Iconography.** Lucide is canonical. If Peak Scale standardises on a
  different icon set, the swap is one line.
