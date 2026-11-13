/**
 * Después de `vite build`: crea dist/<ruta>/index.html con <title>, description,
 * canonical y og:/twitter: propios de cada página, más sitemap.xml y 404.html.
 * Los crawlers de vista previa (LinkedIn, Slack, WhatsApp) no ejecutan JavaScript.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BASE = 'https://diegolavandero.com';
const json = (f) => JSON.parse(readFileSync(join(ROOT, 'src/content', f), 'utf8'));
const home = json('home.json');
const slugs = [home.featured.slug, ...home.projects.filter((p) => !p.externalUrl).map((p) => p.slug)];
const index = readFileSync(join(DIST, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const clip = (s, n = 160) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…'; };
const page = (title, desc, path) => {
  const t = esc(title), d = esc(clip(desc)), u = BASE + path;
  return index
    .replace(/<title>.*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${u}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${u}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`);
};
const out = (path, html) => { const dir = join(DIST, path); mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, 'index.html'), html); };

for (const s of slugs) {
  const d = json(`${s}.json`);
  out(s, page(`${String(d.titleEn || d.title).trim()} · Diego Lavandero`, d.hero?.descriptionEn || d.subtitleEn || '', `/${s}`));
}
out('about', page('About · Diego Lavandero', 'Diego Lavandero, Senior AI Product Designer: experience, approach and skills in product design, UX research and design systems.', '/about'));
writeFileSync(join(DIST, '404.html'), index.replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'));

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', '/about', ...slugs.map((s) => `/${s}`)];
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`meta: ${slugs.length + 1} páginas · sitemap: ${urls.length} URLs`);
