# CLAUDE.md — Portfolio Diego Lavandero

> Este archivo es leído automáticamente por Claude Code al iniciar cualquier sesión en este repositorio. Contiene todo el contexto necesario para trabajar en el proyecto sin re-explicar.

---

## 🎯 Sobre el Proyecto

**Portfolio interactivo** para Diego Lavandero — Senior AI Product Designer.

- **Objetivo:** Demostrar seniority en Product Design para roles **Senior AI Product Designer FAANG** en logística, SaaS y sistemas AI-powered.
- **Stack (v2, rama `v2`):** Vite + React 18 + Tailwind CSS 3 + JSON como fuente de contenido. v1 (vanilla JS) queda guardada en `legacy-v1/` y en la rama `v1`.
- **Idiomas:** ES + EN (bilingüismo nativo con `data-es` / `data-en`)
- **Fuente de verdad de copy:** Figma `GHSGRkqNK5DofoCvCatRfU`
- **Dominio:** `diegolavandero.com` (GoDaddy, sin tráfico actual)
- **Deploy planificado:** GitHub → Vercel → DNS GoDaddy

---

## 🧱 v2 — React + Tailwind (rama `v2`)

- **Contenido:** `src/content/*.json` (misma convención de JSON de siempre; claves `xxxEn` para inglés).
- **Código:** `src/lib.jsx` (contenido, idioma, tema, textos de interfaz `UI`), `src/ui.jsx` (layout y componentes), `src/pages/{Home,Case,About,NotFound}.jsx`.
- **Tokens:** variables RGB en `src/index.css` (`:root` y `.dark`), expuestas en `tailwind.config.js`. Acento `#CD2143` (5,03:1 sobre `#F7F7F7`); en tema noche el texto de acento usa `--acctext`.
- **Build:** `npm run build` = `vite build` + `scripts/prerender-meta.mjs` (HTML por ruta con meta OG + `sitemap.xml`). Local: `npm run dev` o `npx vite preview`.
- **Estándar de calidad (bloqueante antes de mergear a main):** WCAG 2.2 AA con axe en 11 rutas × ES/EN × día/noche × 1440/390; contraste ≥ 4,5:1 incluso sobre círculos decorativos; ningún título (h1–h4) en dos líneas en escritorio — si no cabe, cambiar el layout o la palabra, no el tamaño a ciegas; contenido a ≥ 16 px del borde en móvil; sin desborde horizontal; animaciones solo con `prefers-reduced-motion: no-preference`.
- **Producción:** `main` = v2 desde 2026-11-13 (aprobado por Diego). v1 queda en la rama `v1` y en `legacy-v1/`.

## 🏗️ Arquitectura v1 (legacy): JSON + JavaScript Modular

**Decisión clave (ADR-001):** No es single-file HTML monolítico. Es arquitectura modular donde:

1. **HTML** (`index.html`) = estructura mínima vacía con `<main id="app">`
2. **JSON** (`data/*.json`) = fuente de verdad de TODO el contenido
3. **Render.js** = motor que convierte JSON → HTML dinámicamente
4. **Router.js** = SPA hash-based routing + bilingüismo
5. **Styles.css** = design tokens + componentes (agnóstico de contenido)

### Estructura de archivos

```
portfolio-web/
├── index.html              # ~30 líneas — estructura mínima
├── styles.css              # ~800 líneas — design tokens + componentes
├── js/
│   ├── router.js          # SPA routing + idioma
│   └── render.js          # Motor JSON → HTML (9 componentes)
├── data/
│   ├── home.json          # Home + featured projects
│   ├── about.json         # About page
│   ├── unified-routing.json   # ✅ Proyecto 1 COMPLETO
│   ├── lead-capture.json      # 🟡 Pendiente Sesión 04
│   ├── on-demand-routing.json # 🟡 Pendiente Sesión 04
│   ├── load-validation.json   # 🟡 Pendiente Sesión 04
│   ├── async-reports.json     # 🟡 Pendiente Sesión 04
│   └── driver-ai.json         # 🟡 Pendiente Sesión 04
├── CLAUDE.md               # Este archivo
└── master.md               # Bitácora de sesiones
```

---

## 📐 Principios de Diseño (NO NEGOCIABLES)

1. **Estética 2026:** minimalista, premium, editorial, product-first
2. **Claridad sobre decoración:** cada elemento justifica su presencia
3. **Bilingüe nativo:** cualquier texto nuevo se agrega en ES y EN simultáneamente
4. **Storytelling con data:** métricas accionables, no estética hueca
5. **Microinteracciones con propósito:** parallax, scroll reveal, hover — nunca distracción
6. **Tipografía:** Plus Jakarta Sans (300, 400, 500, 600, 700, 800) — única familia
7. **Referentes visuales:** Stripe, Linear, Vercel, Apple Newsroom

### NO-GOALS

- ❌ No es blog
- ❌ No es showcase de UI sin contexto
- ❌ No es landing comercial
- ❌ No incluye CMS ni backend
- ❌ No agrega librerías de UI de terceros (componentes propios en `src/ui.jsx`)

---

## 🎨 Design Tokens

```css
:root {
  /* Indigo (acento principal) */
  --indigo-50: #eef2ff;
  --indigo-100: #e0e7ff;
  --indigo-500: #6366f1;
  --indigo-600: #4f46e5;
  --indigo-700: #4f39f6;

  /* Grays */
  --gray-50: #fafaf9;
  --gray-75: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-400: #99a1af;
  --gray-500: #6a7282;
  --gray-600: #4a5565;
  --gray-700: #364153;
  --gray-900: #101828;

  /* Semantic */
  --red-500: #e7000b;
  --green-500: #00a63e;

  /* Typography */
  --font-sans: 'Plus Jakarta Sans', sans-serif;

  /* Transitions */
  --transition: 0.3s cubic-bezier(0.21, 0.47, 0.32, 0.98);
}
```

---

## 🔗 Design System del Producto (DispatchTrack) — Fuente de Verdad

Distinto de los "🎨 Design Tokens" de arriba: esos son los tokens del **sitio del
portfolio** (indigo/gray, chrome del propio site). Esta sección es sobre los tokens
del **producto DispatchTrack** que aparecen DENTRO de un case study — cualquier
mockup, prototipo interactivo o pantalla que simule la app real de DT (ej. el
prototipo embebido en `load-validation`).

**Regla:** para ese tipo de contenido, los colores/tipografía NUNCA se hardcodean
acá. Se linkean en vivo desde el design system real:

```html
<link rel="stylesheet" href="https://dt-design-system-tawny.vercel.app/colors_and_type.css">
```

Si el prototipo usa nombres de variable propios (ej. `--dt-b6` en vez de `--b6`,
para no chocar con los tokens del chrome del portfolio), agregar solo un bloque
`:root` que haga *alias* (`--dt-b6: var(--b6);`) — nunca un valor hex nuevo. Ver
`prototypes/load-validation-es.html` / `-en.html` como referencia del patrón.

Por qué importa: esto ya se rompió una vez en esta sesión — un prototipo se
armó con `--dt-b6:#1F60ED` tipeado a mano, un valor que no coincidía con el
`colors_and_type.css` real del repo del design system. Un valor copiado a mano
queda desactualizado apenas el design system cambia; un `<link>` no puede
desactualizarse porque no hay copia.

Fuente real del design system: `github.com/diegolavandero/dt-design-system`
(deploy: `dt-design-system-tawny.vercel.app`). Ese repo tiene su propio
`CLAUDE.md` con las reglas de esa fuente — no se duplican acá.

---

## 📊 Estado por Sesión

### ✅ Sesión 01 (2026-04-28) — Génesis
- Single-file HTML inicial con 6 proyectos
- Sistema de scroll reveal, parallax, stagger animations
- Wireframes SVG inline para Unified Routing
- **Output:** `portfolio-diego-lavandero.html` (1283 líneas)

### ✅ Sesión 02 (2026-04-28) — Tipografía + Setup
- Decisión final: Plus Jakarta Sans pura (rechazado Instrument Serif)
- Levantamiento de frames Figma del Sistema de Ruteo Unificado
- Setup VSCode en Mac
- Plan de deploy GitHub + Vercel + GoDaddy

### ✅ Sesión 03 (2026-04-28) — **Refactor Arquitectónico**
- Migración de single-file HTML → arquitectura modular JSON + JS
- Creación de `index.html` minimalista (~30 líneas)
- Creación de `render.js` (motor JSON → HTML, 9 componentes)
- Creación de `router.js` (SPA + bilingüismo)
- Creación de `styles.css` (design tokens completos)
- **Sistema de Ruteo Unificado COMPLETO** en `data/unified-routing.json`:
  - Hero + Project Specs
  - Why It Matters (3 metrics)
  - Problem & Objectives
  - UX Research (hipótesis + métodos + quotes + stats)
  - **Personas** (3 cards: María, Nicolás, Diego)
  - **Journey Map** (6 etapas)
  - **Solución** (3 principios + 3 decisiones UX)
  - **Resultados** (impacto + aprendizajes + next steps)

### 🟡 Sesión 04 — PENDIENTE (próxima)
**Tarea:** Levantar 5 proyectos restantes del Figma siguiendo EXACTAMENTE la misma estructura de `unified-routing.json`. Imágenes pueden ser placeholders por ahora.

Frames a levantar:
- `1:2189` — **Lead Capture** (Realtime Lead Capture)
- `1:2924` — **On-Demand Routing**
- `4:603` — **Load Validation**
- `2:3473` — **Async Reports**
- `3:2` — **Driver AI Project X**

### 🟡 Sesión 05 — PENDIENTE
- About page completa (frames `4:1218` ES + `4:1420` EN)
- Bilingüismo real verificado en todos los proyectos
- Imágenes reales exportadas del Figma (PNG → base64 inline en JSON)
- Polish responsive mobile-first
- Lighthouse audit (performance, a11y)
- v1.0.0

### 🚀 Post v1.0.0 — Deploy
1. Crear GitHub repo `portfolio-web`
2. `git init && git add . && git commit -m "Initial commit v1.0.0"`
3. Push a GitHub
4. Conectar Vercel al repo (deploy automático en cada push)
5. En GoDaddy: cambiar DNS
   - Registro A `@` → IP de Vercel
   - CNAME `www` → `cname.vercel-dns.com`
6. Cancelar hosting WordPress de GoDaddy (NO el dominio)
7. Agregar OG tags + Twitter Cards + favicon antes del primer deploy

---

## 🔧 Convención de JSON (CRÍTICO para Sesión 04)

Cada proyecto sigue **exactamente** esta estructura. Para Sesión 04, copiar `unified-routing.json` como template y rellenar con datos del Figma correspondiente.

```json
{
  "page": "slug-del-proyecto",
  "slug": "slug-del-proyecto",
  "title": "Título del Proyecto",
  "subtitle": "Contexto/Industria",

  "hero": {
    "tagline": "INDUSTRIA·TIPO",
    "title": "Título principal del hero",
    "description": "Descripción de 1-2 líneas"
  },

  "projectSpecs": [
    { "label": "Mi Rol", "value": "..." },
    { "label": "Contexto", "value": "..." },
    { "label": "Duración", "value": "..." },
    { "label": "Equipo", "value": "..." },
    { "label": "Año", "value": "..." },
    { "label": "Entregables", "value": "..." }
  ],

  "whyItMatters": [
    { "metric": "-X%", "label": "...", "description": "..." }
  ],

  "problemAndObjectives": {
    "title": "...",
    "competitors": [{ "name": "...", "description": "..." }],
    "objectives": ["objetivo 1", "objetivo 2", "objetivo 3"]
  },

  "uxResearch": {
    "title": "Investigación UX",
    "hypothesis": ["..."],
    "methods": ["..."],
    "quotes": [{ "text": "...", "author": "...", "context": "..." }],
    "stats": [{ "value": "...", "description": "..." }]
  },

  "personas": [
    {
      "id": "slug-name",
      "name": "...",
      "role": "...",
      "avatar": "ruta-o-placeholder",
      "goals": ["..."],
      "painPoints": ["..."],
      "behaviors": ["..."]
    }
  ],

  "journeyMap": {
    "title": "...",
    "subtitle": "...",
    "stages": [
      { "id": 1, "name": "...", "problem": "...", "solution": "..." }
    ]
  },

  "solution": {
    "title": "...",
    "subtitle": "...",
    "principles": [
      { "number": "01", "title": "...", "description": "..." }
    ],
    "decisions": [
      { "title": "...", "justification": "...", "tradeoff": "..." }
    ]
  },

  "results": {
    "title": "...",
    "subtitle": "...",
    "impact": [{ "metric": "...", "label": "...", "description": "..." }],
    "learnings": [{ "title": "...", "description": "..." }],
    "nextSteps": [{ "title": "...", "description": "..." }]
  }
}
```

---

## 🌐 Bilingüismo

**Regla absoluta:** Cada texto en JSON debe poder traducirse a EN. Por ahora muchos textos están solo en ES; la traducción profesional al EN es parte de Sesión 05.

En el HTML renderizado, cada elemento tiene:
```html
<h3 data-es="Texto en español" data-en="English text">Texto en español</h3>
```

El `Router.applyLanguage()` recorre el DOM y reemplaza el `textContent` según el idioma activo. La preferencia del usuario se guarda en `localStorage`.

---

## 🚦 Servidor Local

El sitio NO funciona abriendo `index.html` con doble-click (CORS bloquea fetch desde `file://`). Necesita servidor local.

### Opción A — Live Server VSCode (recomendada)
1. Instalar extensión "Live Server" (Ritwick Dey)
2. Click derecho en `index.html` → "Open with Live Server"
3. Abre en `http://127.0.0.1:5500/`

### Opción B — Python http.server
```bash
cd "/Users/diegolavanderorisopatron/Desktop/Diego Lavandero/Portfolio/portfolio-web/"
python3 -m http.server 8000
# Abrir http://localhost:8000
```

---

## 🎯 Comportamiento Esperado de Claude

Diego es **Senior Product Designer FAANG-level**. Espera:

1. **Partner crítico, no asistente sumiso.** Cuestionar flujos que no estén dialogando con top de línea en design, UX research, frontend.
2. **Heurísticas de Nielsen aplicadas siempre.** Si algo viola una heurística, advertirlo aunque no se haya pedido.
3. **Auditorías con tags:** `[CRÍTICO]`, `[MAYOR]`, `[MENOR]`, `[BIEN]` con heurística violada + impacto cognitivo + solución accionable.
4. **Design Systems:** tokens primitivos → semánticos → específicos.
5. **UX Research:** RQ con hipótesis falsable, método correcto, métricas cuantitativas.
6. **AI Prompts:** estructura `[Contexto] + [Tarea] + [Restricciones] + [Estilo Visual] + [Output esperado]`.
7. **Tono:** profesional, directo, analítico, proactivo. Como mentor senior. Tablas para comparativas, code blocks para documentación técnica.
8. **Idioma:** Responder SIEMPRE en español.
9. **Iterativo:** explicaciones claras, propositivo. No hacer todo en una pasada — validar paso a paso.
10. **Ofrecer alternativas mejores** cuando detecte que un flujo no está alineado con el top de línea de la especialidad.

---

## ⚠️ Reglas Críticas

### Bilingüismo manual
Cualquier texto nuevo agregado al JSON debe poder traducirse al EN. La traducción profesional es Sesión 05, pero la estructura debe soportarlo desde el día 1.

### Imágenes Figma
Las URLs de assets de Figma MCP **expiran en 7 días**. NO embeber URLs de Figma directamente. Cuando se exporten imágenes reales (Sesión 05):
- Opción A: PNG → base64 inline en el JSON
- Opción B: Carpeta `data/images/` con PNGs locales

### Edición de archivos
- Para cambios pequeños: usar `str_replace`
- Para archivos nuevos: `create_file`
- Para grandes refactors: pedir al usuario validación antes

### Servidor local obligatorio
Recordar a Diego que necesita Live Server o `python3 -m http.server` corriendo. NO funciona con `file://`.

---

## 📝 Glosario

| Término | Significado |
|---|---|
| **Featured project** | Proyecto destacado en el home (actualmente Unified routing); misma estructura que el resto de los casos |
| **Stagger** | Animación escalonada con delays incrementales |
| **Token primitivo** | Valor base sin contexto (ej: `#6366f1`) |
| **Token semántico** | Token con propósito (ej: `--color-accent`) |
| **Slug** | ID URL-friendly del proyecto (ej: `unified-routing`) |

---

## 🔗 Referencias Externas

- **Figma File:** https://www.figma.com/design/GHSGRkqNK5DofoCvCatRfU/Portfolio-screens
- **Stripe.com** — jerarquía tipográfica
- **Linear.app** — gradientes sutiles
- **Vercel.com** — sistema de cards y grid
- **Apple Newsroom** — storytelling con scroll

---

## 🎬 Próximo Paso Inmediato

**Sesión 04** — Levantar los 5 proyectos restantes desde Figma, generando 5 archivos JSON siguiendo la estructura de `unified-routing.json`.

Comando sugerido para arrancar Sesión 04 en Claude Code:

```
Vamos a Sesión 04. Arranca leyendo el frame 1:2189 del Figma (Lead Capture) usando el MCP de Figma. Genera data/lead-capture.json siguiendo la estructura exacta de data/unified-routing.json. Imágenes pueden ser placeholders.
```

---

**Última actualización:** 2026-04-29 (handoff a Claude Code)
**Status:** 🟢 Listo para Sesión 04

---

## 🧭 Normas editoriales y técnicas (auditoría 2026-11-12)

- **Metadatos por ruta:** después de cambiar `index.html` o el título/descripción de un caso, correr `python3 scripts/build_pages.py`. Genera `pages/<slug>.html` (meta propio para LinkedIn/Slack) y `sitemap.xml`; `vercel.json` enruta `/<slug>` a esos archivos. Rutas de assets en `index.html` siempre absolutas (`/styles.css`, `/js/...`).
- **Mayúsculas:** sentence case en headings y etiquetas, en EN y ES. Nombres de proyecto y títulos: sentence case en EN y ES, siempre (solo mayúscula inicial; excepto nombres propios: DispatchTrack, LastMile, Falabella, Driver AI). El antetítulo (eyebrow) de la tarjeta del home y el tagline del hero de cada caso son idénticos.
- **ES 100% español:** en inglés solo marcas, nombres de producto (DispatchTrack, LastMile, Address Intelligence) y siglas (UX, UI, KPI, NPS, A/B). Glosario: operador (no operario), despachador (no dispatcher), asistente (no wizard), panel lateral (no sidebar), vista previa (no preview).
- **Signos:** comillas curvas “…”, × en multiplicadores, metas en positivo (“32% menos tiempo”, nunca “-32%”), decimales con coma en ES.
- **Personas:** avatar por persona (campo `avatar` en el JSON), nunca repetido entre casos; si la imagen falla, el render usa iniciales.
- **Navegación:** las tarjetas del home y los CTA son `<a href>` reales; la secuencia de casos sigue el orden del home.
