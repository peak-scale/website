# Implementation Plan – peakscale.ch Relaunch

Date: 3 May 2026 · Author: Johann Gyger (with Claude) · Status: Implementation in progress (Sprints 0–5 complete, Sprint 6 in progress – hero/section imagery from the Figma export integrated; Sprint 7 open)

---

## 1. Starting Point

Peak Scale commissioned ooliv to deliver concept and design for the new
website (Quote 13122025, CHF 4'000 for Phase 1 + Phase 2). Both phases are
complete and handed over:

| Phase | Content | Deliverable | Status |
| --- | --- | --- | --- |
| 1 | Strategy, content, tone of voice, lo-fi, keyword mapping | `peakscale-lofi.html` + lo-fi preview, Phase 1 PDFs | accepted |
| 2 | High-fidelity design, responsive, design system, interactions | `Peak Scale (DEV).fig` (65 MB), HiFi JPGs (Home/Services/Produkte/Team/Impressum/Datenschutz) | accepted |

Explicitly **out of scope** for ooliv and therefore Peak Scale's task:
technical implementation, operational SEO, Google Ads / SEM / GEO. Exactly
this step – the technical implementation – is the subject of this plan.

In parallel, the **Peak Scale Design System** built with Claude Design lives
under `Claude PS Design System/`. It translates the HiFi Figma into
production-ready tokens (`colors_and_type.css`), assets, preview cards and
a first UI kit of React components (`ui_kits/website/`). The bridge between
Figma and code is therefore already in place – the implementation team
does not start from zero.

---

## 2. Goals & Success Criteria

Business goals for the relaunch (derived from Phase 1 and Basecamp
discussions):

- Swiss IT decision makers understand within 10 seconds why Peak Scale is
  different from generic cloud consultancies.
- Getting in touch is low-friction (mail CTA prominent, optionally personal
  addresses for Johann/Mathias).
- The three main pages – Services, Produkte, Team – are independently
  marketable (e.g. as direct landing pages from LinkedIn).
- Content and visuals can be edited without ooliv (Markdown, Git-based).
- No outdoor / mountain-guide vibe – technical clarity with a subtle
  mountain metaphor instead.

Measurable acceptance criteria per page see Section 14.

---

## 3. Tech Stack Decision

Decision: **Hugo (extended) + plain CSS + vanilla JS + GitHub Pages**, in
continuity with the predecessor setup. The earlier draft of this plan
called for Tailwind CSS v4 and Alpine.js; both were dropped during
implementation in favour of plain CSS and ~30 lines of vanilla JS — the
Node toolchain and runtime weight no longer earned their keep for six
mostly static pages.

| Area | Choice | Rationale |
| --- | --- | --- |
| Framework | Hugo extended (≥ 0.140) | Continuity with the existing repo `peak-scale/website`; content and asset structure already in place; very fast build; mature i18n |
| Styling | Plain CSS, concatenated by Hugo Pipes (`tokens.css` + `site.css` → minified, fingerprinted) | Tokens from `colors_and_type.css` are the source of truth; semantic component classes (`.btn`, `.card`, `.eyebrow` …) are written by hand. No Node build, no PostCSS, no Tailwind |
| Interactivity | Vanilla JS in `assets/js/peakscale.js`, bundled via `js.Build` | Mobile menu toggle and testimonial carousel are the only interactive bits; ~30 lines, no framework needed |
| Templates | Hugo Go templates | Layouts per page type (`layouts/index.html`, `layouts/{services,produkte,team}/list.html`); partials for header/footer/lang-switch/visuals; no shortcodes used |
| Content | Markdown in `content/` (DE + `.en.md`) | Existing schema is preserved; frontmatter for SEO and visuals |
| i18n | Hugo's `defaultContentLanguage = "de"` (root) + `.en.md` siblings; UI strings in `i18n/{de,en}.toml` | already proven in the predecessor |
| Forms | `mailto:welcome@peakscale.ch` only | Low-friction, no data storage, no additional server component |
| Analytics | **Plausible Cloud** (EU-hosted) | cookieless, no banner required, simple snippet |
| Hosting | **GitHub Pages** | as predecessor; free, GitHub Action deploy, custom domain `peakscale.ch` via CNAME |
| CI | GitHub Actions: build + preview deploy today (`hugo.yml`, `build-preview.yml`, `deploy-preview.yml`). htmltest, Lighthouse CI, Pa11y and Playwright are deferred to Sprint 6/7 |

Deliberately not chosen:

- **Tailwind CSS v4.** Tried in early scaffolding, removed: the design
  system already produces semantic classes (`.btn`, `.card`, `.eyebrow`),
  the page count is small, and a Node build adds dependency churn for
  little gain. Plain CSS keeps the diff readable and the build pure-Hugo.
- **Alpine.js.** Two interactive components (mobile menu, carousel) did
  not justify a 16 KB framework. Vanilla JS bundled through `js.Build`
  ships zero runtime overhead.
- **Next.js / React SPA frameworks.** The React components from the Claude
  PS Design System remain a visual specification, not a code drop-in. Six
  mostly static marketing pages do not need an RSC model, and a Vercel
  account is not a prerequisite.
- **Astro.** Would be an alternative to Hugo, but would break continuity
  with the existing repo.
- **CMS (WordPress, Strapi, Sanity).** Overkill for six pages with low
  edit frequency, and at odds with Peak Scale's engineering profile.

---

## 4. Repository and Tooling

The relaunch is being built directly on the existing repo
`peak-scale/website`. Work happens on a feature branch (today
uncommitted on a `claude/*` worktree branch; will be promoted to a
proper `relaunch-2026` branch before the first PR). The old site stays
live on `main` until the switch.

Actual structure today (Hugo, evolved from the predecessor):

```
website/
├── archetypes/
├── assets/
│   ├── css/
│   │   ├── tokens.css             # imported from the Claude PS Design System
│   │   └── site.css               # hand-written component classes (.btn, .card, …)
│   └── js/
│       └── peakscale.js           # mobile menu + testimonial carousel (vanilla)
├── content/
│   ├── _index.{md,en.md}          # Home
│   ├── services/_index.{md,en.md}
│   ├── produkte/_index.{md,en.md} # NEW
│   ├── team/_index.{md,en.md}
│   ├── impressum.{md,en.md}       # renamed from legalnotice (EN slug: imprint)
│   └── datenschutz.{md,en.md}     # renamed from privacy (EN slug: privacy)
├── data/
│   ├── customers.yaml             # logo-strip items
│   ├── partners.yaml
│   ├── team.yaml                  # six members, name/role/focus/linkedin
│   └── testimonials.yaml          # quote + author per language
├── i18n/
│   ├── de.toml                    # UI strings (skip-link, contact, focus_areas_label, …)
│   └── en.toml
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   └── single.html            # used by Impressum/Datenschutz
│   ├── partials/
│   │   ├── head.html              # SEO, OG, hreflang, JSON-LD, Plausible
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── mobile-menu.html
│   │   ├── lang-switch.html
│   │   ├── contact-floating.html
│   │   ├── brand-mark.html
│   │   ├── icon.html
│   │   └── visuals/               # compass, blocks, network, mail, mountain, topo SVGs
│   ├── index.html                 # Home
│   ├── services/list.html
│   ├── produkte/list.html
│   └── team/list.html
├── static/
│   ├── images/
│   │   ├── customers/             # bedag, bfh, bison, bund, eth, ewb, fhnw, gelan, mobiliar, postfinance
│   │   ├── partners/              # clastix, google-cloud, siderolabs, suse
│   │   ├── team/                  # six PNG headshots
│   │   ├── topo/                  # topo-mountain-{1,2}.jpg (stock, to be relicensed)
│   │   ├── peakscale-logo*.svg
│   │   └── peakscale-icon.svg
│   └── (og/ — not yet generated)
├── specs/
│   └── relaunch-plan.md           # this document
├── design-system-reference/       # read-only copy of the Claude PS DS
├── .github/workflows/
│   ├── hugo.yml                   # build + deploy to GH Pages
│   ├── build-preview.yml          # PR preview build
│   └── deploy-preview.yml         # PR preview upload
├── hugo.toml
└── README.md
```

Notes against the original draft:

- No `package.json`, no `node_modules`, no PostCSS — the build is pure
  Hugo. CSS is concatenated and minified via Hugo Pipes; JS is bundled
  via `js.Build`.
- No `layouts/shortcodes/` — sections are inlined into the page-level
  templates, fed by frontmatter blocks. This was simpler than the
  shortcode catalogue originally proposed and produces less indirection.
- No `tests/` directory yet — Playwright/Pa11y/Lighthouse are deferred
  to Sprint 6/7.
- No `static/og/` yet — OG images are deferred (a single fallback at
  `/images/peakscale-logo-square.png` is used).

Tooling setup (current):

- Hugo extended 0.161 on contributor machines and in CI
- Plain CSS via Hugo Pipes (`resources.Get "css/tokens.css" | … | minify | fingerprint`)
- Vanilla JS via `js.Build` (`{{ resources.Get "js/peakscale.js" | js.Build … }}`)
- Plausible snippet in `<head>` (cookieless, EU-hosted)

Tooling deferred:

- htmltest for link/image checks
- Pa11y CI for A11y smoke
- Playwright for visual regression on the six main pages
- Lighthouse CI
- Renovate for dependency updates

---

## 5. Design System Integration

The Claude PS Design System is **not maintained in parallel**, but
transferred into the project once:

1. **Tokens.** Import `colors_and_type.css` as a global stylesheet. The
   CSS variables stay the single source of truth for colors, spacing,
   radius, shadows.
2. **Assets.** Copy `assets/peakscale-logo*.svg`, `peakscale-icon.svg`,
   `apple-touch-icon.png`, `icon-192.png`, `topo-mountain-*.jpg` into
   `static/images/` (or `assets/images/` for processed renditions).
3. **Components.** The JSX components from `ui_kits/website/` (Header, Hero,
   WhyUs, Section, Footer, ServicesPage, HomePage) act as a visual and
   structural blueprint. Translation to Hugo Go templates: the semantic
   CSS classes from `colors_and_type.css` (`.btn`, `.card`, `.eyebrow`,
   `.dot-square` etc.) are kept unchanged and used directly inside the
   templates; layout-specific classes are written by hand in `site.css`.
   Interactive bits (DE/EN toggle as a server-rendered link, mobile menu
   overlay, testimonial carousel) are wired up with vanilla JS event
   handlers in `peakscale.js` — no client-side framework.
4. **Skill as reference.** `Claude PS Design System/` stays as a read-only
   reference inside the repo (folder `design-system-reference/`). All
   design decisions are still validated against `README.md` and
   `colors_and_type.css`.
5. **Gaps.** The following is not yet covered or only stubbed in the
   design system, and needs to be filled in from the HiFi JPGs / Figma
   file:
   - **Mountain stages visual** on the home page (Architecture top →
     Training bottom, with warm accents)
   - **Team cards** (avatar, name, role, focus areas, LinkedIn pill)
   - **Value tiles** with small accompanying images (Team page)
   - **Hero illustrations** for Services / Produkte / Team (compass,
     modular blocks, connected nodes)
   - **Mobile menu** (fullscreen overlay) – documented in the design
     system but not implemented

---

## 6. Information Architecture

Sitemap (final, per Phase 1 incl. Johann's adjustments from Dec 31):

```
/                         Home (DE = default)
/services/                Services (formerly Angebot)
/produkte/                Produkte (formerly Lösungen)            NEW
/team/                    Team (formerly Über uns + Team)
/impressum/               (formerly /legalnotice/)
/datenschutz/             (formerly /privacy/)

/en/                      Home (English)
/en/services/
/en/produkte/                                                     NEW
/en/team/
/en/imprint/                                                      (formerly /en/legalnotice/)
/en/privacy/

/sitemap.xml                                                      auto-generated by Hugo
/robots.txt
/og-image.png                                                     per page as static asset or build hook
```

Deliberately omitted (per Johann's feedback Dec 31):

- Wissen / Insights → moved to a later phase, once content exists
- Karriere → Peak Scale is not primarily growth-oriented
- Kunden → moves into a section on the home page (logo strip)
- Kontakt page → replaced by a prominent mail CTA + floating mail button;
  optionally personal addresses for Johann and Mathias

Global navigation: floating pill header with three items (Services,
Produkte, Team), DE/EN toggle and a contact pill as the primary CTA. On
mobile a fullscreen overlay. Floating mail button bottom-right (safe-area
inset).

---

## 7. Page Specifications

Content comes from the ooliv lo-fi prototype
(`peakscale.projekte-ooliv.de` or locally `peakscale-lofi.html`), the
visual layout from the HiFi JPGs.

### 7.1 Home

| Section | Component | Content / Source |
| --- | --- | --- |
| Hero | `Hero` | "Cloud-Transformationen, die gelingen." + subline + Hands-on kicker (pill). CTA "Services ansehen" |
| Mountain visual | `MountainStages` | Four stages depicted as a mountain: Architektur (top), Platform Engineering, Assessments, Training & Enablement |
| Why Peak Scale? | `WhyGrid` | 5-tile grid: Swiss-first, Hands-on, Security, Enablement, Specialised Team |
| Our customers | `LogoStrip` | Customer logos (real, from the existing site) |
| Voices from projects | `TestimonialCarousel` | 1 testimonial today, carousel-ready (3-dot pager) |
| What IT teams gain | `LifecycleCards` | Dark section, 4 stages with image + description + icon |
| Typical challenges | `ChallengesGlass` | Glass card with a mountain image background, 3 challenges |
| Technology partners | `PartnerLogos` | Clastix, Google Cloud, Sidero, SUSE |
| Next stage | `NextStepCards` | Cross-links to Services, Produkte, Team |
| Footer | `Footer` | Dark, menu / legal / contact, LinkedIn |

### 7.2 Services

| Section | Content |
| --- | --- |
| Hero | "Professional Services, die überzeugen" + subline + stage-path kicker |
| Lifecycle path | Strategie → Architektur → Engineering → Betrieb (with active state per stage) |
| Hero visual | Compass / navigation illustration (per Mathias' feedback, style-consistent with the other hero visuals) |
| Cloud & Architektur | Section block with two cards + testimonial + working-style tag |
| Engineering / Platform Engineering | Four cards (Container, GitOps, Infrastructure Automation, Security & Observability) + testimonial |
| Assessments | Dark section, three tile cards + an "Output immer:" block with a background image |
| Training & Enablement | Three cards + testimonial |
| Next stage | Cross-links to Produkte and Team |

Note: "Engineering" was renamed to "Platform Engineering" in February.
Check every occurrence (hero, nav, mountain graphic, section headlines).

### 7.3 Produkte

| Section | Content |
| --- | --- |
| Hero | "Plattformen, die funktionieren" + subline + Hands-on kicker |
| Hero visual | Modular blocks (cubes / hexagons) – consistent with hero style |
| Own solutions & products | Two detail cards: Cloud Native Multi-Tenancy, Capsule Enterprise Support |
| Technology partners & integration | Four cards: Sidero Labs, SUSE Rancher Prime, Google Cloud Platform, Clastix |
| From decision to operations | Dark section, 3 steps (Orientierung & Entscheide, Aufbau & Umsetzung, Betrieb & Skalierung) |
| Next stage | Cross-links to Services and Team |

Important: "Weitere Lösungen in Entwicklung" was removed from the lo-fi
(Johann, Jan 5). Among technology partners list only Clastix, **not**
Capsule (Capsule is open source, Clastix Enterprise Platform is a
different product).

### 7.4 Team

| Section | Content |
| --- | --- |
| Hero | "Das Engineering-Team hinter Peak Scale" + subline |
| Hero visual | Connected nodes / constellation |
| Team card (large) | "Unser Team" block with a LinkedIn pill as a side panel |
| Member list | Mathias, Johann, Oliver, Nicola, Lorenz, Philipp – each card with avatar, name, role, focus areas, LinkedIn |
| Our mission | Eyebrow block + 4 pill tags |
| How we work | Dark section, 6 cards (communication, sparring, architecture, decisions, enablement, documentation) |
| Why Cloud Native? | 5 pill cards (scaling, security, extensibility, automation, portability) |
| Our values | Dark section, 5 values with small accompanying images |
| Community engagement | Tags (Swiss Cloud Native Day, Cloud Native Bern Meetup, talks, contributions) |
| Working with us | Contact block with `welcome@peakscale.ch` and a mail visual |
| Next stage | Cross-links to Services and Produkte |

Member grid scalability: 6 today, 9 from 2026/27, 10–20 long term. The
layout must not look empty at 6 nor break at 20. Proposal: 1 column
mobile, 2 columns tablet, 2 columns desktop below 12, 3 columns from 12.
Per member card: full width or half width (not 1/4), per Johann's
feedback from Jan 9.

### 7.5 Impressum

Static page, content 1:1 from the HiFi design (information per Art. 3
Para. 1 lit. s UWG, contact, commercial register CHE-408.730.943,
managing directors, disclaimer). Implemented as Markdown.

### 7.6 Datenschutz

Static page, content from the HiFi design (12 sections per revDSG /
GDPR). Have a privacy specialist review before go-live, since the HiFi
content is generic.

---

## 8. Component Library

Build order follows dependencies (primitives first).

**Primitives** (Phase A):
Button (primary/inverse/ghost), Pill, Eyebrow + EyebrowPill, Card, GlassCard,
BrandCard (gradient), Icon wrapper (Lucide), DotSquare separator, Container.

**Layout** (Phase A):
Header (floating pill, sticky), MobileMenuOverlay, Footer (dark, 3-column +
logo column), ContactFloating (mail button + modal), SectionDots
(right-edge, scroll-spy, optional).

**Sections** (Phase B):
Hero (2-column + visual), MountainStages (custom SVG), WhyGrid (5 tiles, one
in BrandCard variant), Pillars (4-pillar grid), Lifecycle strip
(Strategie → Betrieb), TestimonialCarousel, LogoStrip (marquee or static),
PartnerLogos (4-logo grid), LifecycleCards (dark, 4 cards with image),
ChallengesGlass (glass card with bg image), NextStepCards (cross-links),
TeamMemberCard, ValueRow (value + 1-2 small images), TagPillRow,
ContactBlock (with mail visual).

**Content** (Phase B):
Markdown render config, prose styles for Impressum/Datenschutz, anchor
links for long pages.

**Visuals / Hero illustrations** (Phase C):
- Home mountain stages (warm accents, not garish)
- Services compass / navigation
- Produkte modular blocks / hexagons
- Team connected nodes / constellation

All hero visuals stylistically consistent (clean outlines, abstract,
brand palette + sage/gold sparingly). For stock images, use a uniform
license and image treatment.

---

## 9. Content and Internationalization

**Primary language:** German (Sie form, Swiss tone, "ss" instead of "ß"
– the HiFi is inconsistent, normalize on "ss"). **Secondary:** English.

**Source of DE content:** lo-fi prototype `peakscale-lofi.html` (accepted
in Phase 1, state Jan 12). Content is taken 1:1 into `content/*.md`
(German is `defaultContentLanguage`). The last 10–20 % of the copy gets
one more editorial pass before go-live.

**EN content:** initial pass with DeepL/Claude, then reviewed by a native
speaker or by Mathias. EN is not a drop-in because the "Swiss
understatement" tone does not translate 1:1 from German.

**Editability:** content as Markdown in `content/` (DE) and as `.en.md`
siblings (EN), frontmatter for SEO fields. UI strings (buttons, nav
items, labels) live in Hugo's `i18n/{de,en}.toml`. PR-based editing, no
CMS.

**Storytelling dosing** (per ooliv recommendation Jan 5):
- One central image world: mountain / route / stages
- Recurring mini kicker, not in body text
- Allowed terms: Route, Etappen, Basecamp, Seilschaft (sparingly),
  Orientierung, Sicherung, Checkpoint, Gelände, tragfähig, skalierbar
- Avoid: Höchstleistungen, Gipfel erklimmen, Bergführer, auf höchstem
  Niveau

---

## 10. Images and Assets

**Strategy:** ooliv used stock images as placeholders during the design
phase. Before go-live either license them or replace with own shots /
non-AI images (Dorinel's instruction: "no AI photos").

**Source plan:**
- Mountain images: license via Adobe Stock or Unsplash+ (no AI generated
  content; summer alpine vibe per Mathias' feedback, warm but not "garish")
- Team avatars: own photo session in Bern, uniform style (neutral
  background, brand color temperature)
- Hero illustrations (compass, blocks, nodes): custom SVG by a designer
  or generated and post-processed
- Topographic background graphics: already in the design system
  (`topo-mountain-*.jpg`)

**Optimization:** all raster images are served via Hugo's image processing
(`{{ $img.Resize "1200x" }}` plus AVIF/WebP renditions, responsive
`srcset`/`sizes`). Hero visuals as SVG. LCP image per page with fetch
priority hint.

**Asset pipeline:**
1. Originals live under `assets-source/` (not in Git, on Drive)
2. Renditions get committed to `assets/images/` (processed by Hugo Pipes)
3. A build step (htmltest) verifies every referenced image exists

**Figma extraction (3 May):** the source-of-truth `Peak Scale (DEV).fig`
is a Kiwi-encoded zip; `unzip` produces `canvas.fig`, `meta.json`,
`thumbnail.png` and `images/<sha>` (no extension — sniff with `file`).
Working copies of the 53 raster assets live in `static/_figextract/`
(gitignored, not part of the build); only the curated heroes
(`static/images/hero/`) and section/value crops
(`static/images/section/`) are committed. The four 200×200 team
headshots in the .fig are duplicates of the 360×360 PNGs already in
`static/images/team/` — kept the existing higher-res copies.

---

## 11. SEO and Discoverability

ooliv produced a keyword mapping in Phase 1 (embedded in the lo-fi,
title tag "Cloud Native Consulting & Kubernetes Beratung | Peak Scale").
The operational implementation belongs to this project's scope.

**To do:**
- Per-page `<title>` and `<meta name="description">` (DE + EN), driven
  from frontmatter
- Open Graph / Twitter cards: per-page static images in `static/og/` or
  generated at build time via a Hugo image pipeline (e.g. overlay text
  on a brand background)
- `sitemap.xml` and `robots.txt` generated automatically by Hugo
- `hreflang` tags for DE/EN counterparts
- Structured data: `Organization`, `WebSite`, `LocalBusiness` (Bern
  address), `BreadcrumbList`
- Canonical URLs (especially between `/` and `/en/` variants)
- Optional: `Article` for future Insights pages

**Important:** map existing URLs from the Hugo site and set up redirects
(see Section 13).

---

## 12. Performance, Accessibility, Compliance

**Performance targets** (Lighthouse, mobile, 4G):
- LCP ≤ 2.0 s
- CLS ≤ 0.05
- INP ≤ 200 ms
- Total Blocking Time ≤ 150 ms
- Bundle JS ≤ 5 KB initial (vanilla `peakscale.js`, minified)
- Bundle CSS ≤ 30 KB initial (`tokens.css` + `site.css`, concatenated and minified)
- Lighthouse Performance/A11y/SEO/Best-Practices ≥ 95

Measures: fully static output (Hugo SSG, no runtime rendering), Hugo
image processing with AVIF/WebP, fonts hosted locally with `font-display:
swap`, backdrop-filter (glass cards) only behind `@supports`, lazy-load
below-the-fold images.

**Accessibility (WCAG 2.2 AA):**
- Contrast checks of token pairs (especially `--brand` on `--bg-soft`,
  `--fg-muted` on `--bg`)
- Skip-to-content link
- Visible focus ring (do not override the default outline without a
  replacement)
- Mobile menu: focus trap, ESC close, ARIA roles
- Floating contact button: ARIA label, keyboard-reachable
- Respect `prefers-reduced-motion` (disable fade + translate)
- Pa11y + axe-core in CI

**Compliance:**
- revDSG (CH) and GDPR (EU): cookieless analytics, no banner needed
- Imprint per Art. 3 Para. 1 lit. s UWG (already in the HiFi)
- Have the privacy notice reviewed by a specialist before go-live
- Contact form (if any): no DB storage, only mail forward via SMTP

---

## 13. Migration from the Hugo Predecessor

Existing site: `https://peakscale.ch` (Hugo, repo
`github.com/peak-scale/website`).

**Inventory of current URLs** (from `peak-scale/website/hugo.toml` and
`content/`):

| Old URL | Status | Content |
| --- | --- | --- |
| `/` | stays | Home |
| `/services/` | stays | Angebot/Services |
| `/about/` | gone | merges into `/team/` and `/` |
| `/team/` | stays | Team |
| `/contact/` | gone | becomes the floating mail button + mailto |
| `/legalnotice/` | renamed | → `/impressum/` |
| `/privacy/` | renamed | → `/datenschutz/` |
| `/en/services/` | stays | EN Services |
| `/en/about/` | gone | → `/en/team/` and `/en/` |
| `/en/team/` | stays | EN Team |
| `/en/contact/` | gone | → mailto |
| `/en/legalnotice/` | renamed | → `/en/imprint/` |
| `/en/privacy/` | stays (or rename) | EN Privacy |

GH Pages does not natively support HTTP redirects (only Cloudflare or a
custom worker). Three options, sorted by effort:

**Option A – Hugo `aliases`** (recommended, zero cost):
declare old paths as `aliases` in the frontmatter of each new page. Hugo
then generates static `index.html` files with `<meta http-equiv="refresh">`
and `rel="canonical"` to the target URL. Works on GH Pages out of the
box. Example `/team/index.md`:

```yaml
---
title: Team
aliases:
  - /about/
url: /team/
---
```

Drawback: meta-refresh redirect instead of 301, ~50 ms slower and not a
real HTTP status code. Acceptable for a marketing site with moderate
traffic.

**Option B – Cloudflare in front of GH Pages** (recommended if SEO
protection matters):
DNS on Cloudflare proxy, then a `_redirects` file or page rules for
real 301 status codes. No additional hosting provider, but a Cloudflare
account is needed. Example `_redirects`:

```
/about/                /team/                301
/contact/              /                     301
/legalnotice/          /impressum/           301
/privacy/              /datenschutz/         301
/en/about/             /en/team/             301
/en/contact/           /en/                  301
/en/legalnotice/       /en/imprint/          301
```

**Option C – move to Cloudflare Pages** instead of GH Pages: same build
pipeline, native redirect support, free. But breaks the "like the
predecessor" requirement.

Recommended combination: **Option A as the immediate solution**, then if
an SEO drop appears, **layer Option B on top**.

**Remaining migration work:**

1. Bring static assets (logo variants, team photos, customer logos) over
   from the old repo into `assets/images/`
2. Selectively merge content from `content/about/` and `content/contact/`
   into the new pages (especially address, contact block)
3. Have Hugo generate sitemap and `robots.txt` automatically
4. Before the DNS switch, in Search Console: submit the new site's
   sitemap, leave the old sitemap as "submitted", run both for 1–2 weeks
   in parallel
5. Pull external backlinks (Search Console > Links > Top linking sites)
   and check whether the top 10 inbound links point to dropped URLs – if
   so, add explicit redirects
6. Remove the old sitemap from Search Console after 90 days without a
   404 spike

**Existing customer logos in the Hugo repo** (`content/about/customers/`):
bedag, bfh, bison, bund, eth, ewb, fhnw, gelan, mobiliar, postfinance.
Take over directly for the logo strip on the home page.

**Existing team photos** (`content/team/images/`): johanngyger,
lorenzbischof, mathiasherzog, nicolaluethi, oliverbaehler, philippgrogg.
Take over, optionally retouch uniformly (background, color tone), add
new members later.

---

## 14. Acceptance Criteria per Page

Definition of Done for every page:

- [x] Content from Markdown / data files, no hard-coded strings in
      templates
- [x] DE + EN shipped
- [x] In the sitemap, with `hreflang`
- [ ] Visually identical to the HiFi JPG at 1440 px (± 8 px tolerable) — manual today, automate in Sprint 7
- [ ] Responsive: 375, 768, 1024, 1440, 1920 (manual + Playwright) — Playwright deferred to Sprint 7
- [ ] Lighthouse Performance ≥ 95, A11y ≥ 95 — Lighthouse CI deferred to Sprint 7
- [ ] axe-core: 0 violations — deferred to Sprint 7
- [ ] OG image present (per-page, not just the fallback) — Sprint 6
- [ ] Sensible print stylesheet (header/footer hidden, content visible) — Sprint 6
- [ ] Visual regression snapshot green — Sprint 7

---

## 15. Timeline and Milestones

Assumption: 1 main developer ≈ 60 % FTE, working alongside consulting
projects. Realistic range: 6–10 weeks to production launch.

| Sprint | Duration | Content | Milestone | Status |
| --- | --- | --- | --- | --- |
| 0 – Setup | 3 days | Branch, CI, tooling, GH Pages preview, staging DNS | Hello World online | done |
| 1 – Foundation | 1 week | Import tokens, layout skeleton, header, footer, container, primitives | Skeleton app with nav | done |
| 2 – Home | 1.5 weeks | All sections of Home, mountain visual, testimonial carousel, logo strip | Home in staging | done |
| 3 – Services + Produkte | 1.5 weeks | Both pages with sections, hero visuals as placeholders | 3 pages in staging | done |
| 4 – Team + Legal | 1 week | Team page with member cards, values, mission; Impressum + Datenschutz | 6 pages complete | done |
| 5 – i18n + Content | 1 week | EN translation, Markdown migration of all DE content, copy edits | All content final | done (initial pass; Mathias EN review still open) |
| 6 – Polish | 1 week | Hero visuals final, images licensed, OG generator, sitemap, redirects, performance tuning | Release candidate | in progress (hero/section imagery integrated from `Peak Scale (DEV).fig`; OG, redirects, perf tune still open) |
| 7 – QA + Launch | 3 days | Lighthouse, A11y, visual regression, DNS switch | Live | open |

Sprints 5–7 may overlap once 3 pages are stable in staging.

---

## 16. Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Hero visuals (compass, blocks, nodes) are stock and not stylistically consistent | medium | medium | Commission custom SVG early or draw in-house; placeholders in MVP |
| Image licenses unclear – stock images in the HiFi are placeholders | high | medium | **Deferred to end of Sprint 6** (decision 3 May): the Figma exports stay in production until we've identified replacement stock that actually fits the brand. Picking new images is the bottleneck, not the licensing step itself; revisit once everything else in Sprint 6 is closed |
| Privacy notice in HiFi is generic, not legally reviewed | high | high | Have a specialist review before go-live |
| EN translation costs time and tone of voice gets lost | medium | medium | DE-only soft launch is an option; EN as a follow-up iteration |
| Team cards do not scale from 6 to 20 | low | low | Layout test with 20 dummy members in Sprint 4 |
| Performance of glass cards (backdrop blur) on older mobiles | medium | low | Fallback without blur for `prefers-reduced-transparency` and `not (backdrop-filter)` |
| Mountain stages visual (warm accents) needs to be reconstructed in code, since it is not in the DS | medium | medium | Export SVG straight from Figma instead of rebuilding |
| URL migration causes SEO dip | medium | high | Full 301 map, Search Console monitoring, sitemap submit on launch day |

---

## 17. Decisions (resolved on 3 May)

1. **Customer logos:** take over from the existing Hugo site – available
   are bedag, bfh, bison, bund, eth, ewb, fhnw, gelan, mobiliar,
   postfinance (`content/about/customers/`).
2. **Personal mails:** do not publish. Sole address
   `welcome@peakscale.ch`, prominent as the floating button and in the
   contact block.
3. **Testimonials:** keep generic for now ("Senior IT Architect, Schweizer
   Bundesverwaltung", "CTO, Swiss Fintech Startup", "Engineering Lead,
   BFH"). Real attributions can be added later via frontmatter, no code
   change needed.
4. **Hosting:** GitHub Pages (custom domain `peakscale.ch`), like the
   predecessor.
5. **Analytics:** Plausible Cloud. Snippet in `<head>`, no cookie banner
   needed.
6. **Redirect map:** proposal in Section 13 (Option A: Hugo `aliases` as
   the immediate solution).
7. **EN scope:** included at launch. Translation initially with
   DeepL/Claude, then polished by Mathias.
8. **Image acquisition:** extract images from the Figma file
   (`Peak Scale (DEV).fig`, with a `.fig` reader or via Figma export) and
   complement from the Drive folder provided by ooliv
   (`drive.google.com/drive/folders/1Mnn2M26paQ8-wUM2biyxWwDFnJg7dFJZ`).
   License: clarification per image expected from ooliv, otherwise
   replace with stock licenses before go-live.
9. **Brand extension:** keep `--accent-sage` and `--accent-gold` as the
   end form. Possible refinement later as a token update (single place
   in `colors_and_type.css`).
10. **Insights / knowledge page:** later, not in scope. Structurally
    `content/insights/` is not pre-built – can be added without a code
    change when needed.
11. **Stack revision (during Sprint 1):** Tailwind v4 and Alpine.js were
    dropped in favour of plain CSS (`tokens.css` + `site.css`) and ~30
    lines of vanilla JS. Rationale: the design system already provides
    semantic component classes, only two interactive bits exist (mobile
    menu, carousel), and removing the Node toolchain made the build
    purely Hugo-driven. Performance budgets in §12 were tightened
    accordingly.
12. **Image licensing deferred to end of Sprint 6** (3 May):
    the Figma exports we currently ship are stock placeholders per
    ooliv's note. We are not licensing them as-is; instead we will
    select replacement stock (or commission an in-house alpine shoot,
    per Mathias) once the rest of Sprint 6 is closed, then license
    only the chosen final set. Reason: picking images that actually
    fit the brand is the bottleneck, not the license step itself, and
    licensing the placeholders would burn budget on imagery we may
    swap out anyway. Risk row in §16 updated; punch-list item 2 in
    §18 keeps the open follow-up.

### Remaining open points

- **Privacy notice** (HiFi content) reviewed by a privacy specialist
  before go-live. Owner: Peak Scale.
- **Image extraction from Figma:** who does this technically (plugin /
  Figma export) – the main developer in Sprint 1.
- **Custom hero visuals** (compass / blocks / nodes): SVG export from
  Figma is enough if stylistic consistency in Figma is already final –
  otherwise custom vectors by a designer.

---

## 18. Open Punch List (toward go-live)

The original Week-1 bootstrap is done. The list below tracks what's
still in front of go-live, grouped by theme.

**Sprint 6 – Polish**

1. Promote the current uncommitted work to a `relaunch-2026` branch and
   open a tracking PR; add branch protection and a PR template.
2. ~~Replace stock topo / hero imagery with licensed or in-house photos
   (or commission custom SVGs for compass / blocks / nodes).~~
   *Done 3 May:* extracted 53 raster images from
   `Peak Scale (DEV).fig` (the file is a Kiwi-encoded zip; SHA-named
   files unzip cleanly) into `static/_figextract/` (gitignored —
   `.gitignore` updated). The four selected hero photos and seven
   section/value crops are committed under `static/images/hero/` and
   `static/images/section/`. Layouts now reference them: home hero
   (`home-mountain.jpg`, low-poly mountain with the four stage pills),
   services hero (`services-compass.jpg`), produkte hero
   (`produkte-blocks.jpg`, replacing `visuals/blocks-large.html`), team
   hero (`team-network.jpg`, replacing `visuals/network-large.html`),
   the four lifecycle row crops on home, the five values row crops on
   team, the two challenges-glass backgrounds (home + services), and
   the produkte mid-page banner. The "Peak steht für technische
   Tiefe" featured tile in the Why grid was added back as a 6th item
   with the dark-blue topographic abstract anchored to the bottom of
   the card. Image extension for the produkte/team SVG visuals
   (`compass`, `blocks`, `network`, `mountain`, `topo`,
   `*-large` variants) are now unused; only `visuals/mail.html`
   remains in service. The other `visuals/*.html` partials are
   **kept on purpose** — they are hand-coded brand-token SVGs
   (~300 lines total, no external deps), candidates for the OG
   generator (item 3), the print stylesheet (§14), and any
   second-opinion fallback for a raster that doesn't survive review.
   Do not prune. **Open within this item:**
   (a) final review of the `topo-abstract` choice for the Why feature
   tile;
   (b) **deferred to end of Sprint 6** (decision §17 #12): replace
   the Figma stock mountain photography with selected stock (or an
   in-house shoot per §10) and license only the final set. Picking
   imagery that fits the brand is the bottleneck — we do that pass
   last, after OG / perf / EN / privacy are settled, so we don't
   license placeholders we end up swapping out.
3. Generate per-page OG images (Hugo image pipeline) and drop them in
   `static/og/`; wire them through frontmatter `image:`.
4. Native EN review of all copy (Mathias).
5. Privacy-notice review by external specialist.
6. Performance tune: confirm LCP/CLS/INP budgets on real devices,
   self-host fonts with `font-display: swap`, lazy-load below-the-fold
   images.

**Done in copy / styling on 3 May (out-of-band but worth recording):**

- DE em-dashes ("—") replaced with en-dashes ("–") across all six
  German pages, `i18n/de.toml`, `data/testimonials.yaml` (DE only),
  the footer about-line and three hard-coded testimonial citation
  markers in `layouts/{index,services/list,team/list}.html` (now
  lang-conditional). EN keeps em-dashes. Added as a feedback memory
  so future edits don't reintroduce them.
- `.display-xl` ("Warum Peak Scale?") cap reduced from 128 px to
  88 px (`clamp(44px, 6vw, 88px)`), since the original Figma value
  rendered too large in the live page width.

**Sprint 7 – QA + Launch**

7. Add CI gates: htmltest (link/image), Pa11y or axe-core (A11y),
   Lighthouse CI (perf budgets), Playwright visual regression for the
   six main pages at 375 / 1024 / 1440.
8. Search Console: submit new sitemap, keep old sitemap registered, run
   in parallel for 1–2 weeks before the DNS cut.
9. Top-10 backlinks audit — add explicit aliases for any inbound links
   that point at dropped URLs.
10. DNS switch to the new GH Pages site; smoke test redirects and
    canonical/hreflang on production.

---

## Sources and References

- ooliv quote 13122025 (`ooliv Angebot Website.pdf`)
- Phase 1: Strategisches Website-Konzept inkl. Inhalte
  (`ooliv Phase 1 - Konzept Website/Phase 1_…pdf`)
- Phase 2: Visual Design (`ooliv Phase 2 - Design HiFi/Phase 2_ Visual Design.pdf`)
- Phase 2: Figma-Design Dorinel (`Phase 2_ Figma-Design (Dorinel).pdf`)
- Narrativ und Bildsprache Bergsteigen
  (`ooliv Phase 1 - Konzept Website/Narrativ und Bildsprache Bergsteigen.pdf`)
- Feedback Startseite (Claim/Slogan/Angebot)
  (`ooliv Phase 1 - Konzept Website/Feedback Startseite (Claim_Slogan_Angebot).pdf`)
- HiFi screenshots (`ooliv Phase 2 - Design HiFi/ooliv Peak Scale HiFi/*.jpg`)
- Lo-fi prototype (`ooliv Phase 1 - Konzept Website/peakscale-lofi.html`)
- Figma source file (`ooliv Phase 2 - Design HiFi/ooliv Peak Scale HiFi/Figma/Peak Scale (DEV).fig`)
- Peak Scale Design System (`Claude PS Design System/`)
- Hugo predecessor site: `https://github.com/peak-scale/website`
