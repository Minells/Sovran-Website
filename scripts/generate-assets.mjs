import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const logo = await readFile(new URL('../public/brand/sovran-logo-on-dark.svg', import.meta.url));
const mark = await readFile(new URL('../public/brand/sovran-mark-on-dark.svg', import.meta.url), 'utf8');
const publicPath = (path) => new URL(`../public/${path}`, import.meta.url);
const manropeLicense = await readFile(new URL('../node_modules/@fontsource-variable/manrope/LICENSE', import.meta.url), 'utf8');
const lucideLicense = await readFile(new URL('../node_modules/@lucide/astro/LICENSE', import.meta.url), 'utf8');
await writeFile(publicPath('THIRD_PARTY_NOTICES.txt'), `SOVRAN website — third-party font and icon notices\n\nManrope\n-------\n${manropeLicense}\n\nLucide (including Feather-derived icons)\n--------------------------------------\n${lucideLicense}`);

// Preserve the original logo geometry. The background gives raster favicons a useful dark tile.
const favicon = mark.replace('<svg ', '<svg style="background:#0F1012" ');
await writeFile(publicPath('favicon.svg'), favicon);
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
  await sharp(Buffer.from(favicon)).resize(size, size).png().toFile(publicPath(name).pathname);
}

const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><radialGradient id="light"><stop stop-color="#FF5A36" stop-opacity=".12"/><stop offset="1" stop-color="#0F1012" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="630" fill="#0F1012"/><ellipse cx="1070" cy="220" rx="530" ry="480" fill="url(#light)"/>
<path d="M960 86H910V370H960M1080 86H1130V370H1080" fill="none" stroke="#F4F2EE" stroke-opacity=".10" stroke-width="24"/><circle cx="1020" cy="228" r="29" fill="#FF5A36"/>
<path d="M72 491H1128" stroke="#35373D"/>
<g fill="#F4F2EE" font-family="Helvetica,Arial,sans-serif"><text x="72" y="305" font-size="65" font-weight="600" letter-spacing="-2">AI coding,</text><text x="72" y="382" font-size="65" font-weight="600" letter-spacing="-2">on your terms.</text>
<text x="72" y="444" font-size="24" fill="#A3A6AE">An open-source VS Code agent for the models you control.</text>
<text x="72" y="547" font-size="20" fill="#BFC1C8">Local models. Self-hosted inference. Your company gateway.</text>
<text x="72" y="585" font-size="15" fill="#A3A6AE">MIT licensed / github.com/Minells/sovran</text></g></svg>`;
await sharp(Buffer.from(background)).composite([{ input: await sharp(logo).resize(500).png().toBuffer(), left: 72, top: 72 }]).png().toFile(publicPath('og.png').pathname);

for (const name of ['editor-tab-dark', 'onboarding-dark']) {
  await sharp(publicPath(`screenshots/${name}.png`).pathname).webp({ quality: 85 }).toFile(publicPath(`screenshots/${name}.webp`).pathname);
}
console.log('Generated 1200 × 630 social image, favicons, and WebP screenshot variants.');
