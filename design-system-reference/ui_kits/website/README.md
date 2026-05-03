# Peak Scale — Website UI kit

High-fidelity recreation of the Peak Scale marketing site. Built against the
**Hi-fi Figma** ("Peak Scale (DEV).fig", mounted at `/Homepage/...`) — the
agreed visual system. Tokens come from `../../colors_and_type.css` (DM Sans,
bright Swiss blue, icy-white surfaces, brand-tinted shadow stack, Inter
eyebrows). Earlier iterations of this kit were built against the lo-fi
prototype + shadcn defaults; those have been migrated.

## Files
- `index.html` — interactive demo. Toggle between Services / Produkte / Team
  in the pill nav, open the floating contact modal (mail button bottom-right),
  switch language (DE/EN), navigate via section dots on the right.
- `Header.jsx` — floating pill header w/ blur backdrop, pill nav, language
  toggle, primary CTA.
- `Hero.jsx` — 2-column hero + the topographic visual (grid + topo lines +
  route checkpoints).
- `Section.jsx` — reusable section shell + 4-pillar grid + Lucide-style
  inline `Icon`.
- `WhyUs.jsx` — 5-tile "why" grid + `Testimonial` figure + `Lifecycle`
  4-stage strip + `PartnerLogos`.
- `Footer.jsx` — dark footer, floating contact button, contact modal,
  right-edge section dots.
- `HomePage.jsx`, `ServicesPage.jsx` — composed routes.

## Component coverage
- Floating header, pill nav, DE/EN toggle pill — ✓
- Hero (2-column with topographic visual placeholder) — ✓
- Pillar / service cards w/ icons — ✓
- Lifecycle strip (Strategie → Betrieb) — ✓
- Testimonial block — ✓
- Partner logo strip — ✓
- Floating contact button + modal — ✓
- Section dot-nav (right-edge fixed) — ✓
- Footer with menu / legal / contact columns — ✓

## Not built (intentionally)
- Form pages — copy exists in the prototype's i18n bundle; we omit forms in
  this kit because no marketing form is shown above the fold.
- Career / Wissen / Kunden routes — same content vocabulary, would just
  reshuffle existing components.
