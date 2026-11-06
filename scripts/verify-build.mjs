import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root = resolve('dist');
const origin = 'https://minells.github.io';
const base = '/Sovran-Website/';
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}
const files = await walk(root);
const pages = files.filter(file => extname(file) === '.html');
let references = 0;
const errors = [];
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const relative = file.slice(root.length).replace(/index\.html$/, '');
  const pageUrl = new URL(base.slice(0, -1) + relative, origin);
  const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
  try {
    assert.match(html, /<html[^>]*lang="en"/);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'one h1');
    for (const key of ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'twitter:card', 'twitter:image']) {
      assert.ok([...html.matchAll(/<meta\b[^>]*>/g)].some(([tag]) => { const a = attributes(tag); return (a.name === key || a.property === key) && a.content; }), `metadata: ${key}`);
    }
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).find(a => a.rel === 'canonical');
    assert.equal(canonical?.href, pageUrl.href, 'canonical URL');
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.ok('alt' in attributes(tag), 'all images have alt text');
    for (const [tag] of html.matchAll(/<(?:a|link|img|script|source|meta)\b[^>]*>/g)) {
      const a = attributes(tag);
      const refs = [a.href, a.src, ...(a.srcset ? a.srcset.split(',').map(s => s.trim().split(/\s/)[0]) : []), ...((a.property === 'og:image' || a.name === 'twitter:image') ? [a.content] : [])].filter(Boolean);
      for (const ref of refs) {
        if (/^(?:data:|mailto:|tel:)/.test(ref)) continue;
        const url = new URL(ref.replaceAll('&amp;', '&'), pageUrl);
        if (url.origin !== origin) continue;
        assert.ok(url.pathname.startsWith(base), `base path: ${ref}`);
        const local = join(root, decodeURIComponent(url.pathname.slice(base.length)));
        const target = url.pathname.endsWith('/') ? join(local, 'index.html') : local;
        assert.ok((await stat(target)).isFile(), `missing target: ${ref}`);
        if (url.hash && target.endsWith('.html')) {
          const targetHtml = await readFile(target, 'utf8');
          assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `missing anchor: ${ref}`);
        }
        references++;
      }
    }
  } catch (error) { errors.push(`${relative}: ${error.message}`); }
}
for (const file of files.filter(file => extname(file) === '.css')) {
  const css = await readFile(file, 'utf8');
  for (const [, ref] of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (ref.startsWith('data:')) continue;
    const local = ref.startsWith(base) ? join(root, ref.slice(base.length)) : resolve(file, '..', ref);
    assert.ok((await stat(local)).isFile(), `missing CSS asset: ${ref}`);
    references++;
  }
}
assert.deepEqual(errors, [], errors.join('\n'));
const social = await sharp(join(root, 'og.png')).metadata();
assert.equal(social.width, 1200); assert.equal(social.height, 630);
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`${origin}${base}sitemap-index.xml`));
const sitemap = await readFile(join(root, 'sitemap-0.xml'), 'utf8');
for (const route of ['', 'documentation/', 'community/']) assert.ok(sitemap.includes(`${origin}${base}${route}</loc>`));
assert.ok(!sitemap.includes('/404'), '404 must not be indexed');
console.log(`Verified ${pages.length} HTML pages, ${references} local references, metadata, anchors, CSS assets, sitemap, robots, and 1200 × 630 OG image.`);
