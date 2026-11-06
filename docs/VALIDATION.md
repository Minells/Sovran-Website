# Implementation and validation report

Validated on **6 November 2026**. Implementation and validation were completed locally before publication approval.
The owner subsequently authorized the website's first commit and push to `main`, and the extension documentation
commit and push to `feature/website`. The owner will open the extension pull request. No releases, repository
settings changes, or new repositories are part of that authorization.

## Repository inspection

| Item | Verified state |
|---|---|
| Extension checkout | `/Users/luca.minelli/sovran/Sovran` |
| Extension remote | `https://github.com/Minells/sovran.git` (public GitHub canonical name: `Minells/Sovran`) |
| Website checkout | `/Users/luca.minelli/sovran/Sovran-Website` |
| Website remote | `https://github.com/Minells/Sovran-Website.git` |
| Branches | Both `main`; website initialized with no prior commits |
| Extension manifest | `sovran`, publisher `minells`, version `0.1.0`, MIT, VS Code `^1.95.0`, Node `>=20` |
| Marketplace | `minells.sovran` derived from the manifest; its listing currently returns HTTP 404 |
| Pages | Website repository is public; `has_pages: false` |
| Community settings | Issues enabled; Discussions disabled; private vulnerability reporting disabled |
| Extension architecture | Portable TypeScript core, authoritative VS Code host, validated protocol, sandboxed React webview |
| Existing build | esbuild host/document worker, Vite webview, vsce packaging; existing CI on Linux, Windows, macOS |
| Activation | Contributed view/commands plus `onWebviewPanel:sovran.chatPanel` restoration |
| Branding | Existing bracket/dot mark, orange `#FF5A36`, ink `#0F1012`, paper `#F4F2EE`; VS Code system fonts in the product |

The two working repositories are siblings inside an enclosing workspace that also contains pre-existing Git
metadata and an already-deleted outer README. That enclosing repository was left untouched. No directories were moved.

Inspected the manifest, commands/settings, source composition and tool policy, README, MIT license, architecture,
development/release/roadmap documentation, CI/release workflows, governance files, branding, screenshots, build scripts,
and package dependencies. No extension behavior, architecture, dependencies, or manifest fields were changed.

## Website implementation

- Complete homepage with installation/source CTAs, an animated direct-connection diagram, original product screenshots,
  Plan/Act comparison, context/recovery/MCP features, guided setup, privacy details, and contribution links.
- Substantive `/documentation/` and `/community/` pages, plus a custom `404.html` and robots endpoint. Feature details
  are on the homepage rather than duplicated on a superficial fourth content page.
- Static Astro 7.4.7, TypeScript 6.0.3, Tailwind 4.3.5, Lucide 1.70.0. No browser framework or backend. The compatible
  TypeScript major is intentional: the Astro checker does not currently accept TypeScript 7.
- Original logo geometry and palette; self-hosted Manrope, system monospace, CSS token system, restrained orange
  lighting, readable hierarchy, two-column desktop hero, stacked mobile presentation, and lightweight CSS motion.
- The connection animation has a finite run. Reduced-motion CSS disables animations and transitions. Page content and
  navigation are available without JavaScript; JavaScript progressively enhances the mobile menu.
- Existing screenshots are labeled as example sessions. The main screenshot opens at full size for small screens.
  WebP variants reduce transfer size while PNG originals remain available.
- Page-specific titles/descriptions/canonicals, Open Graph and Twitter cards, 1200 × 630 PNG social image, SVG/PNG
  favicon, Apple touch icon, sitemap, robots, and noindex on the error page. Font/icon licenses ship with the output.
- `site: https://minells.github.io`, `base: /Sovran-Website`, trailing slashes. Metadata, navigation, assets, and fonts
  resolve below the real case-sensitive project directory.
- GitHub Actions builds PRs with read-only permission. A successful main-branch build uploads the Pages artifact;
  a separate deployment job receives only Pages/OIDC permissions. Main-only deployment, concurrency, and timeouts
  prevent accidental PR publication and overlapping deployment races.

## Extension documentation and governance

The README is condensed around installation, the actual features, setup, settings, examples, safety, architecture,
development/testing, and contribution links. Static license/VS Code badges and the existing CI badge carry no invented
statistics. The complete previous reference is retained in `docs/USER_GUIDE.md` with repaired relative paths.

Contribution guidance now matches the existing `npm ci --ignore-scripts` workflow. Security reporting describes the
conditional private route without an invented address or response-time promise. Community standards, issue forms,
a PR template, and modest monthly Dependabot updates fill the governance gaps. The existing roadmap and changelog
were retained; an unreleased presentation/governance note was added to the changelog.

## Validation results

| Check | Result |
|---|---|
| Website clean lockfile install | PASS: `npm ci --ignore-scripts --offline` from the populated npm cache |
| Website dependency audit | PASS: 0 vulnerabilities after selecting patched sharp 0.35.5 |
| Astro/TypeScript | PASS: 13 files, 0 errors, 0 warnings, 0 hints |
| Static build | PASS: home, documentation, community, 404, robots, sitemap, assets |
| Generated-output validator | PASS: 4 HTML pages, 115 local references, anchors, metadata, CSS/font assets, sitemap, robots |
| OG image | PASS: 1200 × 630 PNG, visually inspected |
| Responsive production preview | PASS: home/docs/community at 320, 390, 768, 1024, 1440px, no page-level horizontal overflow |
| Mobile navigation | PASS: opens, closes with Escape, updates `aria-expanded`, returns focus |
| Browser console | No warning/error entries observed on the production pages |
| Accessibility review | Skip link, landmarks, one H1 per page, image alternatives, named controls, visible focus, scrollable labeled tables |
| Reduced motion / no-JS | Styles and progressive-enhancement markup reviewed; no OS preference was changed |
| Extension `npm run check` | PASS: TypeScript, ESLint, 23 test files / 392 tests |
| Extension real VS Code smoke tests | PASS, VS Code 1.145.2, exit 0; activation, commands, defaults, config sync, view, editor-tab chats |
| Extension build and packaging | PASS: `npm run package -- --out /private/tmp/sovran-review-0.1.0.vsix`, 24 files, 1,175,863 bytes |
| Packaged README assets | PASS: vsce rewrites image links to repository URLs |
| Extension source/dependency diff | Empty for `package.json`, lockfile, `src`, `webview`, `scripts`, `tests` |
| Relative documentation/image links | PASS: 56 references across 5 documents |
| Public README links | Existing GitHub, Issues, CI, and badge links return 200; Marketplace and unpublished Pages links return 404 as disclosed |
| New YAML configurations | PASS: all 6 parsed successfully |
| Whitespace checks | `git diff --check` clean in both repositories |

Execution used Node 25.9.0 and npm 11.12.1 on macOS. Website CI is configured for Node 24; existing extension CI remains
on Node 22. The first sandboxed integration run could not bind localhost sockets; the authorized rerun passed all tests.
Astro verification used `ASTRO_TELEMETRY_DISABLED=1` to avoid writing telemetry preferences outside the workspace.

Browser review images: [desktop](preview-desktop.jpg), [mobile](preview-mobile.jpg). These are QA captures, not
extension screenshots. Local preview servers were stopped after validation.

Deployment was not run during local validation. The website push can trigger its configured workflow; GitHub Pages
still requires the owner configuration below. Remote CI, cross-platform builds, and future model-server compatibility
use their existing owner/CI processes. Website links to the new extension documents on `main` become available after
the owner merges the `feature/website` pull request.

## Remaining owner configuration

1. Open and merge the extension's `feature/website` pull request, so website links to the new user guide and conduct
   policy on `main` can resolve.
2. In **Minells/Sovran-Website → Settings → Pages → Build and deployment**, choose **GitHub Actions**. Then push the
   website to `main`. Expected URL: `https://minells.github.io/Sovran-Website/`.
3. Confirm Actions are allowed and the `github-pages` environment can deploy from `main`.
4. Enable **private vulnerability reporting** in the extension repository if you want to accept confidential reports.
   The policy currently explains what to do while it is unavailable.
5. Complete the extension's existing Marketplace release prerequisites separately. No publication was attempted.
   After the listing is confirmed, update the preview availability notes in both repositories.
6. Optional: GitHub's public repository metadata currently restricts pull-request creation to collaborators. Review that
   setting if you intend to accept outside pull requests. GitHub Discussions is not enabled and no link was invented.

The Pages setup follows the [official Astro guide](https://docs.astro.build/en/guides/deploy/github/). Current official
workflow actions are checkout v7, setup-node v7, upload-pages-artifact v5, and deploy-pages v5, verified against their
official documentation/releases. These settings changes remain for the owner.

## Run locally

Website (Node.js 24 recommended):

```bash
cd /Users/luca.minelli/sovran/Sovran-Website
npm ci --ignore-scripts
npm run dev
# Open http://localhost:4321/Sovran-Website/
# Validate with: npm run verify
# Stop the background server with: npx astro dev stop
```

Extension (Node.js 22 is the current CI version):

```bash
cd /Users/luca.minelli/sovran/Sovran
npm ci --ignore-scripts
npm run check
npm run build
npm run test:extension
npm run package
```

## Approved commit and push targets

The owner approved these publication targets. Commands belong in the independent checkouts, not in the enclosing
workspace. Review `git diff` and untracked files before staging. The extension PR is left to the owner.

Extension:

```bash
cd /Users/luca.minelli/sovran/Sovran
git status --short
git switch -c feature/website
git add README.md CONTRIBUTING.md SECURITY.md CHANGELOG.md CODE_OF_CONDUCT.md docs/USER_GUIDE.md .github/ISSUE_TEMPLATE .github/dependabot.yml .github/pull_request_template.md
git commit -m "docs: polish project presentation and contribution guidance"
git push -u origin feature/website
```

Website:

```bash
cd /Users/luca.minelli/sovran/Sovran-Website
git status --short
git add .
git commit -m "feat: add official SOVRAN website and Pages deployment"
git push -u origin main
```

If branch protection requires pull requests, create a `codex/` branch before committing and push that branch instead.

## Extension file inventory

Modified:

- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CHANGELOG.md`

Created:

- `CODE_OF_CONDUCT.md`
- `docs/USER_GUIDE.md`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/pull_request_template.md`
- `.github/dependabot.yml`

## Website file inventory

All website files are new in the previously empty repository. Generated/cache directories (`node_modules`, `dist`,
`.astro`) are ignored.

- `.github/dependabot.yml`
- `.github/workflows/deploy.yml`
- `.gitignore`
- `.nvmrc`
- `LICENSE`
- `README.md`
- `astro.config.mjs`
- `docs/ASSETS.md`
- `docs/DESIGN.md`
- `docs/VALIDATION.md`
- `docs/preview-desktop.jpg`
- `docs/preview-mobile.jpg`
- `package-lock.json`
- `package.json`
- `public/.nojekyll`
- `public/THIRD_PARTY_NOTICES.txt`
- `public/apple-touch-icon.png`
- `public/brand/sovran-logo-on-dark.svg`
- `public/brand/sovran-mark-on-dark.svg`
- `public/favicon-32.png`
- `public/favicon.svg`
- `public/og.png`
- `public/screenshots/editor-tab-dark.png`
- `public/screenshots/editor-tab-dark.webp`
- `public/screenshots/onboarding-dark.png`
- `public/screenshots/onboarding-dark.webp`
- `scripts/generate-assets.mjs`
- `scripts/verify-build.mjs`
- `src/components/Connection.astro`
- `src/components/InstallCTA.astro`
- `src/layouts/Layout.astro`
- `src/lib/project.ts`
- `src/pages/404.astro`
- `src/pages/community.astro`
- `src/pages/documentation.astro`
- `src/pages/index.astro`
- `src/pages/robots.txt.ts`
- `src/styles/global.css`
- `tsconfig.json`
