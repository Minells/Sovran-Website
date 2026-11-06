# SOVRAN website

The official static website for [SOVRAN](https://github.com/Minells/sovran), an open-source VS Code coding agent for
user-controlled models. Built for GitHub Pages at **<https://minells.github.io/Sovran-Website/>**.

The URL becomes available after the owner enables Pages and pushes this repository. Marketplace publication is
marked pending in the extension documentation; the site includes the manifest-derived listing URL and a source/VSIX
installation path. Update that availability note only after confirming publication.

## Stack

- Astro 7, static output, strict TypeScript 6 (compatible with the Astro checker)
- Tailwind CSS 4 through the official Vite plugin, custom CSS design tokens and animation
- Lucide SVG icons, self-hosted Manrope, existing SOVRAN logo and screenshots
- GitHub Actions and GitHub Pages; no backend or runtime framework

## Local development

Use Node.js 24 LTS (`.nvmrc`). Astro requires Node.js 22.23.4 or newer.

```bash
nvm use
npm ci --ignore-scripts
npm run dev
```

Open **<http://localhost:4321/Sovran-Website/>**. Keep the project subdirectory in the URL.

```bash
npm run verify    # Astro/TypeScript check, static build, generated-output checks
npm run preview   # serve dist at the same project path
npm run assets    # optional: regenerate OG, favicons, compressed screenshots
```

Astro 7 starts development and preview servers in the background. Use `npx astro dev stop` or
`npx astro preview stop` to stop them. Preview uses the next free port (usually 4322 when dev is running).

Generated image assets are committed, so the regular build does not need fonts or images from another repository.
See [asset provenance](docs/ASSETS.md) and [design decisions](docs/DESIGN.md).

## Structure

```text
src/components/    shared CTA and direct-connection illustration
src/layouts/       navigation, footer, metadata, accessible mobile menu
src/pages/         homepage, documentation, community, 404, robots endpoint
src/lib/           verified project URLs and base-path helper
src/styles/        Tailwind, tokens, responsive styles, reduced-motion handling
public/            original brand assets, screenshot variants, favicons, social image
scripts/           deterministic image generation and built-output validation
.github/           Pages build/deploy workflow and dependency updates
```

## Deployment

One-time owner configuration, after reviewing and pushing:

1. In **Minells/Sovran-Website → Settings → Pages**, select **Build and deployment → Source → GitHub Actions**.
2. Ensure Actions are allowed for the repository. If needed, allow the standard `github-pages` deployment environment
   to deploy from `main`.
3. Push to `main`, or run **Build and deploy website** manually from `main`.

Pull requests run `npm ci --ignore-scripts` and `npm run verify` with read-only permissions. Pushes to `main` run the
same checks, upload `dist`, and deploy in a separate job with `pages: write` and `id-token: write`. A failed build blocks
deployment. No personal access token, third-party host, or paid service is needed.

`astro.config.mjs` deliberately sets `site: https://minells.github.io` and `base: /Sovran-Website`, matching the actual
case-sensitive repository name. `withBase()` prefixes internal page/asset links. The generated canonical, Open Graph,
Twitter, sitemap, and robots URLs include that path. If the repository is renamed, update the config, build validator,
and this README together.

The workflow follows the [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) and the official
[Pages artifact](https://github.com/actions/upload-pages-artifact) and
[deployment actions](https://github.com/actions/deploy-pages).

## Relationship to the extension

This is an independent repository. Extension code, packaging, settings, and tests live in
[Minells/sovran](https://github.com/Minells/sovran). Only brand assets and existing screenshot images are copied here;
no extension source or dependencies are shared. The website builds with no sibling checkout.

When product behavior changes, verify the extension source, update website documentation and screenshots, and keep
the extension README consistent. Do not describe roadmap items as available features. Use GitHub Issues for project
discussion; no GitHub Discussions link is assumed.

## Review, commit, and push

Review changes before committing. From this repository:

```bash
git status --short
git add .
git commit -m "feat: add official SOVRAN website and Pages deployment"
git push -u origin main
```

For validation results and remaining release checks see [VALIDATION.md](docs/VALIDATION.md).

## License

[MIT](LICENSE). Existing SOVRAN artwork remains attributed to Minells and SOVRAN contributors. Font and icon package
licenses are noted in [ASSETS.md](docs/ASSETS.md).
