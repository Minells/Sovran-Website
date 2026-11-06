# Asset provenance

All product images and brand artwork originate from the sibling SOVRAN extension repository,
`https://github.com/Minells/sovran`, under its existing MIT license. The original logo is unchanged.

| Website file | Extension source |
|---|---|
| `public/brand/sovran-logo-on-dark.svg` | `media/brand/sovran-logo-on-dark.svg` |
| `public/brand/sovran-mark-on-dark.svg` | `media/brand/sovran-mark-on-dark.svg` |
| `public/screenshots/editor-tab-dark.png` | `media/screenshots/editor-tab-dark.png` |
| `public/screenshots/onboarding-dark.png` | `media/screenshots/onboarding-dark.png` |

Screenshots show example sessions from the repository's gallery, not measured outcomes or a live demo.
WebP variants are compressed from the original PNGs without changing the UI. Run `npm run assets` to regenerate them,
favicons, and the 1200 × 630 social image. It uses the checked-in assets; no sibling checkout is needed.

The website's connection diagram explains the existing architecture. It is not a screenshot of an extension feature.
Manrope is self-hosted from `@fontsource-variable/manrope` under the SIL Open Font License. Lucide icons are supplied by
`@lucide/astro` under the ISC License, with MIT notices for Feather-derived icons. Full notices are copied from the
installed packages into `public/THIRD_PARTY_NOTICES.txt` and included in the static deployment.
