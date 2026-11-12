#!/usr/bin/env python3
"""Genera pages/<ruta>.html (copia de index.html con <title>, description,
canonical y og:/twitter: propios de cada caso) y sitemap.xml.

Por qué: los crawlers de vista previa (LinkedIn, Slack, WhatsApp) no ejecutan
JavaScript, así que sin esto todos los casos se comparten con el meta del home.
vercel.json enruta /<slug> a pages/<slug>.html.

Correr después de cambiar index.html o el título/descripción de un caso:
    python3 scripts/build_pages.py
"""
import json, html, re, pathlib, datetime
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = 'https://diegolavandero.com'
home = json.loads((ROOT / 'data/home.json').read_text())
slugs = [home['featured']['slug']] + [p['slug'] for p in home['projects'] if not p.get('externalUrl')]
index = (ROOT / 'index.html').read_text()

def clip(s, n=160):
    s = re.sub(r'\s+', ' ', s).strip()
    return s if len(s) <= n else s[:n - 1].rsplit(' ', 1)[0] + '…'

def page(title, desc, path):
    t, d, u = html.escape(title, quote=True), html.escape(clip(desc), quote=True), BASE + path
    out = index
    out = re.sub(r'<title>.*?</title>', f'<title>{t}</title>', out)
    out = re.sub(r'(<meta name="description" content=")[^"]*', rf'\g<1>{d}', out)
    out = re.sub(r'(<link rel="canonical" href=")[^"]*', rf'\g<1>{u}', out)
    out = re.sub(r'(<meta property="og:title" content=")[^"]*', rf'\g<1>{t}', out)
    out = re.sub(r'(<meta property="og:description" content=")[^"]*', rf'\g<1>{d}', out)
    out = re.sub(r'(<meta property="og:url" content=")[^"]*', rf'\g<1>{u}', out)
    out = re.sub(r'(<meta name="twitter:title" content=")[^"]*', rf'\g<1>{t}', out)
    out = re.sub(r'(<meta name="twitter:description" content=")[^"]*', rf'\g<1>{d}', out)
    return out

(ROOT / 'pages').mkdir(exist_ok=True)
for s in slugs:
    d = json.loads((ROOT / f'data/{s}.json').read_text())
    desc = (d.get('hero') or {}).get('descriptionEn') or d.get('subtitleEn') or ''
    (ROOT / f'pages/{s}.html').write_text(page(f"{d.get('titleEn') or d['title']} · Diego Lavandero", desc, f'/{s}'))
(ROOT / 'pages/about.html').write_text(page('About · Diego Lavandero',
    'Diego Lavandero, Senior AI Product Designer: experience, approach and skills in product design, UX research and design systems.', '/about'))

today = datetime.date.today().isoformat()
urls = ['/', '/about'] + [f'/{s}' for s in slugs]
(ROOT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join(f'  <url><loc>{BASE}{u}</loc><lastmod>{today}</lastmod></url>\n' for u in urls) + '</urlset>\n')
print('pages:', len(slugs) + 1, '· sitemap:', len(urls), 'urls')
