# Peak Scale website

Hugo source for [peakscale.ch](https://peakscale.ch/).

## Requirements

- Hugo extended `0.161.1`, pinned in `.hugo-version`
- SVGO, optional for SVG optimisation

## Nix

Nix is optional. It requires `nix-command` and `flakes` to be enabled.
Use it to enter a shell with the pinned tooling:

```sh
nix develop
```

## Development

```sh
hugo server
```

Build the site:

```sh
hugo --minify
```

The generated site is written to `public/`.

## Structure

```text
assets/css/   Global and site CSS, processed by Hugo Pipes
assets/js/    Vanilla JavaScript bundled by Hugo
content/      Markdown pages, German default plus English siblings
data/         Customers, partners, team and testimonials
i18n/         German and English UI strings
layouts/      Hugo templates and partials
static/       Images, favicons and other static assets
hugo.toml     Site config, languages, menus and SEO defaults
```

## Content

German is the default language. English content uses `.en.md` sibling files.

```text
content/_index.md
content/services/_index.md
content/produkte/_index.md
content/team/_index.md
content/impressum.md
content/datenschutz.md
```

Shared structured content lives in `data/*.yaml`. UI strings live in
`i18n/de.toml` and `i18n/en.toml`.

## Assets

Optimise SVGs before adding them:

```sh
svgo -p 1 path/to/image.svg
```

## Deployment

GitHub Actions builds and deploys the site to GitHub Pages.
