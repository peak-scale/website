// SVGO settings for the inline icon set in `assets/icons/`.
//
// The icons ship inlined into the HTML by `layouts/partials/icon.html`, once per
// use — the check mark alone appears 30 times on /services/ — so every byte in a
// source file is paid for many times over in the document. The Figma exports
// carried 4 decimal places of coordinate precision on shapes that render at
// 24–30px, which is roughly ten thousand times finer than a pixel.
//
// Rounding to 2 decimals takes the set from 136 KB to 54 KB and cuts the
// /services/ document from 31 KB to 14 KB brotli. It is not bit-identical: it
// shifts anti-aliasing on curve edges by a fraction of a pixel, measured at
// ~123 changed pixels out of 13 million on the largest page, indistinguishable
// at 700% zoom. Everything that could actually move or reshape a glyph — path
// merging, shape conversion, curve straightening — stays off.
//
// Re-run after adding or replacing an icon:
//   npx svgo -f assets/icons -o assets/icons
export default {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          mergePaths: false,
          convertShapeToPath: false,
          convertPathData: {
            floatPrecision: 2,
            transformPrecision: 3,
            straightCurves: false,
            curveSmoothShorthands: false,
          },
        },
      },
    },
  ],
};
