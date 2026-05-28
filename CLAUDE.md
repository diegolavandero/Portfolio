# CLAUDE.md — Portfolio Diego Lavandero

> Este archivo es leído automáticamente por Claude Code al iniciar cualquier sesión en este repositorio. Contiene todo el contexto necesario para trabajar en el proyecto sin re-explicar.

---

## 🎯 Sobre el Proyecto

**Portfolio interactivo** para Diego Lavandero — Senior AI Product Designer.

- **Objetivo:** Demostrar seniority en Product Design para roles **Senior AI Product Designer FAANG** en logística, SaaS y sistemas AI-powered.
- **Stack:** HTML minimalista + CSS puro + Vanilla JS + JSON (sin frameworks)
- **Idiomas:** ES + EN (bilingüismo nativo con `data-es` / `data-en`)
- **Fuente de verdad de copy:** Figma `GHSGRkqNK5DofoCvCatRfU`
- **Dominio:** `diegolavandero.com` (GoDaddy, sin tráfico actual)
- **Deploy planificado:** GitHub → Vercel → DNS GoDaddy

---

## 🏗️ Arquitectura: JSON + JavaScript Modular

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
- ❌ No usa frameworks (React, Vue, etc.)
- ❌ No usa Tailwind (CSS puro con variables)

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
| **Featured project** | Proyecto con case study completo (actualmente Unified Routing) |
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
