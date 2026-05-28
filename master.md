# 🗂️ MASTER.md — Portafolio Diego Lavandero
> **Bitácora de proyecto + Sistema de versionado por sesión**
> Adjuntar este archivo al inicio de cada chat con Claude para mantener continuidad.

---

## 📌 0. METADATA

| Campo | Valor |
|---|---|
| **Owner** | Diego Lavandero |
| **Proyecto** | Portafolio interactivo — Senior AI Product Designer |
| **Versión actual** | `v0.2.0` |
| **Última sesión** | 2026-04-28 (Sesión 02) |
| **Próxima sesión** | Sesión 03 — Contenido (Personas, Card Sorting, Solución, Resultados) |
| **Stack** | HTML + CSS + Vanilla JS (single-file, ~1283 líneas) |
| **Idiomas** | ES (EN pendiente sesión 05) |
| **Output principal** | `portfolio-diego-lavandero.html` (renombrado a `index.html` para GitHub/Vercel) |
| **Fuente de verdad de copy** | Figma `GHSGRkqNK5DofoCvCatRfU` |
| **Entorno local** | VSCode en Mac, carpeta `Diego Lavandero/Portfolio html/` |
| **Deploy** | GitHub + Vercel (diferido a post-Sesión 04) |

---

## 🎯 1. NORTH STAR

### Objetivo
Portafolio web tipo **case study FAANG** que demuestre seniority en Product Design para roles de **Senior AI Product Designer** en logística, SaaS y sistemas AI-powered.

### Principios de diseño (no negociables)
1. **Estética 2026**: editorial, premium, product-first.
2. **Claridad sobre decoración**: cada elemento justifica su presencia.
3. **Bilingüe nativo**: cualquier cambio se aplica en ES y EN simultáneamente.
4. **Storytelling con data**: métricas accionables, no estética hueca.
5. **Microinteracciones con propósito**: scroll reveal, hover — nunca distracción.
6. **Copy de Figma es la fuente de verdad**: no inventar contenido; replicar exacto.

### No-goals (qué NO es este portafolio)
- ❌ No es un blog
- ❌ No es un showcase de UI sin contexto
- ❌ No es una landing page comercial
- ❌ No incluye CMS ni backend
- ❌ No incluye copy inventado por Claude — todo viene del Figma

### Referentes visuales
Stripe · Linear · Vercel · Apple Newsroom · Mercury

---

## 📸 2. ESTADO ACTUAL (Snapshot vigente)

**Versión activa:** `v0.2.0`
**Archivo:** `portfolio-diego-lavandero.html`

### Decisión tipográfica final (sesión 02)
- **Display / hero / títulos de proyecto:** `Instrument Serif` (Google Fonts, gratis, italic disponible)
- **Body / UI / specs / métricas:** `Plus Jakarta Sans` (Google Fonts, weights 300/400/500/600)
- **Razón:** Plus Jakarta Sans ya estaba en el Figma (premium, no-genérica). Instrument Serif añade contraste editorial defendible para 2026 sin caer en moda pasajera. Combinación tipo Mercury/Linear-editorial.
- **Sustituye a:** Inter (mencionado en master.md v0.1.0 pero no era lo real del Figma)

### Estructura implementada
```
Header (sticky + blur)
├── Brand "Diego Lavandero" (Instrument Serif italic)
├── Nav: Proyectos | Sobre mí
└── Toggle ES/EN

PAGE Home (✅ exacto desde Figma)
├── Hero (eyebrow + título serif + subtítulo)
├── Featured project: Sistema de Ruteo Unificado
│   ├── Título, descripción, métrica pill ↓50%
│   └── Mockup placeholder
└── Grid 5 proyectos con copy y métricas exactas

PAGE Sistema de Ruteo Unificado (✅ exacto desde Figma — secciones críticas)
├── Hero (PLATAFORMA LOGÍSTICA SAAS / De automatización a control operacional)
├── ProjectSpecs (6 specs reales)
├── Por qué importa (3 metric cards con valores reales -35/-42/-65%)
├── Problema y Objetivos (PlannerPro vs DispatchTrack + 3 goals numerados)
├── Investigación UX (Hipótesis + Metodología + Insights cualitativos/cuantitativos)
├── 🟡 Personas (placeholder honesto — pendiente sesión 03)
├── 🟡 Card Sorting (placeholder)
└── 🟡 Solución y Resultados (placeholder)

PAGES Proyectos 2-6 (🟡 hero placeholder con copy del home)

PAGE Sobre mí (🟡 placeholder)
```

### Design Tokens activos (consolidados desde Figma)
```css
/* Color */
--indigo-500: #6366f1;        /* Acento principal */
--indigo-700: #4f39f6;         /* Hover/strong */
--indigo-100: #e0e7ff;         /* Goal numbers bg */
--gray-50:  #fafaf9;           /* Hero bg */
--gray-75:  #f9fafb;           /* Section alt */
--gray-200: #e5e7eb;           /* Borders */
--gray-500: #6a7282;           /* Body secondary */
--gray-600: #4a5565;           /* Body */
--gray-700: #364153;           /* Body strong */
--gray-900: #101828;           /* Display */
--red-50:   #fef2f2;           /* Sub-cards problema */
--red-200:  #ffc9c9;           /* Borde problema */

/* Tipografía */
--font-sans:  'Plus Jakarta Sans', sans-serif;
--font-serif: 'Instrument Serif', serif;

/* Spacing escala 4px (--space-1 a --space-32) */
/* Radius: sm 6px, md 10px, lg 14px, xl 16px */
```

### Proyectos cargados
| # | Proyecto | Estado contenido | Métrica destacada |
|---|---|---|---|
| 1 | **Sistema de Ruteo Unificado** | ✅ ~70% (faltan personas/cardsorting/resultados) | ↓ 50% planificación |
| 2 | Sistema de Captura de Leads en Tiempo Real | 🟡 Solo card en home + hero | ↑ 40% conversión |
| 3 | On-Demand Routing | 🟡 Solo card en home + hero | ↓ 38% asignación |
| 4 | Validación de Carga | 🟡 Solo card en home + hero | ↓ 45% errores |
| 5 | Reportes Asincrónicos | 🟡 Solo card en home + hero | ↓ 70% interrupción |
| 6 | Driver AI | 🟡 Solo card en home + hero | -10-20% tiempo en sitio |

---

## 🧠 3. DECISIONES DE DISEÑO (ADRs)

### ADR-001 · Single-file HTML vs React (vigente)
**Contexto:** El portafolio podría construirse en React/Next o como HTML monolítico.
**Decisión:** Single-file HTML con vanilla JS.
**Razón:** Portabilidad total, cero deploy, fácil de adjuntar y previsualizar.
**Reversible si:** crece a 20+ proyectos o se requiere SEO con SSR.

### ADR-002 · SVG/placeholders en lugar de imágenes Figma (vigente, revisar sesión 04)
**Contexto:** Figma exporta `figma:asset/...` con URLs que expiran a 7 días.
**Decisión:** Mockups placeholder con CSS gradients en sesión 02.
**Razón:** Independencia total. Trade-off: menor fidelidad visual.
**Próximo paso:** Sesión 04 — exportar PNGs reales desde Figma y embedirlos como base64 o subirlos a CDN.

### ADR-003 · Toggle ES/EN con `data-es` / `data-en` (parcialmente diferido)
**Contexto:** Necesidad de bilingüismo sin frameworks de i18n.
**Decisión actual (v0.2.0):** Toggle visual funciona pero NO cambia contenido. Solo ES.
**Razón:** Levantar copy EN del Figma (frames 4:2235, 4:3591, 4:2845, etc.) requiere ~30 tool calls extra. Diferido a sesión 05.
**Reversible si:** se decide migrar a framework con i18n nativo.

### ADR-004 · Plus Jakarta Sans + Instrument Serif (NUEVA, sesión 02)
**Contexto:** Master v0.1.0 mencionaba Inter, pero Figma real usa Plus Jakarta Sans. Diego pidió tipografía 2026.
**Decisión:** Mantener Plus Jakarta Sans (ya en Figma) + agregar Instrument Serif para display.
**Razón:** Plus Jakarta Sans es premium, no genérica. Instrument Serif añade contraste editorial defendible (similar a Mercury/Stripe) sin caer en moda pasajera.
**Reversible si:** se decide single-family con Geist o se migra a Söhne/GT America.

### ADR-005 · Copia exacta de Figma como fuente de verdad (NUEVA, sesión 02)
**Contexto:** Diego pidió "copia exacta total".
**Decisión:** Todo el copy del HTML viene literalmente del Figma vía MCP. No se inventa, no se "mejora", no se interpreta.
**Implicancia:** Cuando una sección no se ha levantado del Figma, va como placeholder honesto (no como invención).
**Reversible si:** Diego solicita iterar sobre el copy en sesiones futuras.

---

## 📜 4. CHANGELOG VERSIONADO

### `v0.2.0` — 2026-04-28 · Sesión 02 — _Tipografía premium + Home y Proyecto 1 exactos_

**Snapshot:** Cambio tipográfico estratégico. Home y Proyecto 1 (Sistema de Ruteo Unificado) con copy exacto desde Figma en las 5 secciones críticas. Proyectos 2-6 como hero placeholders.

#### ✅ Agregado
- Sistema tipográfico Plus Jakarta Sans + Instrument Serif vía Google Fonts
- Tokens de color completos extraídos de Figma (12 grises + 3 rojos + 2 verdes + 4 indigos)
- Página **Inicio** completa con copy literal del Figma:
  - Hero: "Diseñando productos impulsados por IA y sistemas complejos"
  - Featured: Sistema de Ruteo Unificado con métrica ↓50%
  - Grid 5 proyectos con metas, descripciones y métricas exactas
- Página **Sistema de Ruteo Unificado** con 5 secciones exactas:
  - Hero: "Rediseñando la Experiencia de Ruteo Unificada / De automatización a control operacional"
  - ProjectSpecs (6): Senior UX/UI Designer, Logística·SaaS·IA, 8 semanas, Multidisciplinario, 2026, Web·Escritorio
  - Por qué importa: -35% / -42% / -65% (Negocio / Usuario / Sistema)
  - Problema (PlannerPro vs DispatchTrack pros/cons + 3 consecuencias) y Objetivos (3 numerados)
  - Investigación UX: 3 hipótesis + 4 métodos + 3 quotes cualitativas + 3 stats cuantitativas
- Router SPA simple con navegación sin reload
- Reveal on scroll con IntersectionObserver y delays escalonados
- Placeholders honestos para secciones pendientes (no inventan contenido)

#### 🔧 Modificado
- Tipografía Inter → Plus Jakarta Sans (cuerpo) + Instrument Serif (display) — _ADR-004_
- Brand del header ahora usa Instrument Serif italic — más editorial
- Eliminadas las "tarjetas con ilustraciones de calidad insuficiente" — reemplazadas por mocks CSS
- Estructura de páginas pasó a SPA con `data-page` (antes había navegación con anchors)

#### 🗑️ Eliminado
- Wireframes SVG inline del proyecto Unified Routing — _se rehacen con copy exacto en sesión 03_
- Case study fabricado de Unified Routing v0.1.0 — _reemplazado por copy real_

#### 🐛 Corregido
- Master.md decía "Inter" pero Figma usa Plus Jakarta Sans — corregido en v0.2.0
- Eliminado uso inconsistente de `--gray-900` y `--text-primary` — ahora hay tokens semánticos claros

#### 🔄 Cómo revertir a esta versión
1. Solicita: _"Revertir a v0.2.0 según master.md"_
2. Adjunta este `master.md` v0.2.0 + el HTML output de la sesión 02
3. Copy fuente de verdad: Figma `GHSGRkqNK5DofoCvCatRfU`, frames 1:2 (Inicio) y 1:1446-2172 (Unified Routing)

#### 📎 Archivos generados en esta sesión
- `portfolio-diego-lavandero.html` (output principal — v0.2.0)

#### 📊 Frames Figma levantados en esta sesión
- ✅ `1:2` — Inicio completo
- ✅ `1:1450` — Hero Unified Routing
- ✅ `1:1459` — ProjectSpecs Unified Routing
- ✅ `1:1492` — Por qué importa
- ✅ `1:1520` — Problema y Objetivos
- ✅ `1:1603` — Investigación UX
- 🟡 `1:1681` — Personas (pendiente sesión 03)
- 🟡 `1:1847` — Card Sorting (pendiente sesión 03)
- 🟡 `1:1904` — Solución (pendiente sesión 03)
- 🟡 `1:1990` — Resultados detallados (pendiente sesión 03)
- 🟡 `1:2103` — Aprendizajes (pendiente sesión 03)

---

### `v0.1.0` — 2026-04-28 · Sesión 01 — _Génesis_

**Snapshot:** Versión inicial con boilerplate y un proyecto featured con contenido inventado.

#### ✅ Agregado (en sesión 01)
- Estructura HTML completa con 6 proyectos
- Header sticky con blur + nav + toggle idioma
- Sistema de scroll reveal con IntersectionObserver
- Parallax en heroes de proyecto
- Wireframes SVG inline para Unified Routing
- Tokens de color, tipografía Inter (incorrecta), sistema de transiciones
- Case study de Unified Routing con contenido **inventado por Claude** (no del Figma)

#### 🟡 Conocido (cerrado en v0.2.0)
- ⚠️ Contenido era ficción, no copia del Figma → resuelto en v0.2.0
- ⚠️ Tipografía Inter no coincidía con Figma → resuelto en v0.2.0
- ⚠️ SVGs hechos a mano sin referencia real → diferido a sesión 04

---

### `v0.X.X` — _próxima sesión (plantilla)_

```markdown
### `vX.Y.Z` — YYYY-MM-DD · Sesión NN — _Título descriptivo_

**Snapshot:** [1 línea]

#### ✅ Agregado / 🔧 Modificado / 🗑️ Eliminado / 🐛 Corregido

#### 📊 Frames Figma levantados
- ✅ `X:Y` — descripción

#### 🔄 Cómo revertir
[Instrucciones]

#### 📎 Archivos
- portfolio-diego-lavandero.html
```

---

## 🗺️ 5. BACKLOG (Próximos pasos sugeridos)

### Sesión 03 — Profundizar Unified Routing + arrancar Lead Capture
- [ ] Levantar **Personas** del Unified Routing (frame 1:1681) — 3 PersonaCards
- [ ] Levantar **Card Sorting** (frame 1:1847) — 6 categorías
- [ ] Levantar **Solución** (frame 1:1904) — wireframes + highlights
- [ ] Levantar **Resultados detallados** (frame 1:1990) y **Aprendizajes** (frame 1:2103)
- [ ] Arrancar **Sistema de Captura de Leads** completo (frames 1:2189 → 1:2907)

### Sesión 04 — Proyectos 4-6 + assets reales
- [ ] **Validación de Carga** completo (frames 4:603 → 4:1203)
- [ ] **Reportes Asincrónicos** completo (frames 2:3473 → 2:3988)
- [ ] **Driver AI** completo (frames 3:2 → 3:586)
- [ ] **Reemplazar mocks CSS por imágenes reales** exportadas desde Figma (PNG → base64 inline o CDN)

### Sesión 05 — Bilingüismo + About + Polish final
- [ ] Implementar `data-es` / `data-en` real para todos los strings
- [ ] Levantar versiones EN de cada proyecto desde Figma (frames 4:2235, 4:3591, 4:2845, 4:4329, 4:4856)
- [ ] **Page About / Sobre mí** con bio, experiencia, herramientas, contacto (frames 4:1218 + 4:1420)
- [ ] Polish: responsive testing, lighthouse, a11y check

### Riesgos / deuda técnica
- ⚠️ **URLs de assets de Figma expiran a 7 días** — no embedir directamente desde MCP, usar export PNG
- ⚠️ Bilingüismo manual: cada texto nuevo requiere `data-es` Y `data-en`
- ⚠️ Si el archivo supera ~3.000 líneas, considerar split por proyecto en bundle externo
- ⚠️ Performance: cuando se agreguen mockups reales en base64, evaluar si conviene CDN

---

## 📚 6. GLOSARIO Y REFERENCIAS

### Glosario del proyecto
| Término | Significado |
|---|---|
| **Featured project** | Proyecto con case study completo (actualmente Unified Routing al 70%) |
| **Stagger** | Animación escalonada con delays incrementales en grupos de elementos |
| **Token primitivo** | Valor base sin contexto (ej: `#6366f1`) |
| **Token semántico** | Token con propósito (ej: `--accent`, `--bg-subtle`) |
| **Placeholder honesto** | Sección con texto que admite "pendiente sesión X" en vez de contenido fabricado |
| **Frame Figma** | Nodo del archivo `GHSGRkqNK5DofoCvCatRfU` referenciado por su ID `X:Y` |

### Heurísticas aplicadas (Nielsen)
- ✅ **Consistencia:** sistema de tokens unificado y nomenclatura predecible
- ✅ **Visibilidad de estado:** active states en nav + toggle idioma
- ✅ **Reconocimiento sobre recuerdo:** navegación tipo tabs persistente
- ✅ **Match con el mundo real:** copy del Figma habla idioma del operador logístico
- ⚠️ **Pendiente: Ayuda y documentación** — no aplica aún en portafolio

### Referencias externas
- Stripe.com — jerarquía tipográfica
- Linear.app — uso de gradientes sutiles
- Vercel.com — sistema de cards y grid
- Mercury.com — combinación serif display + sans body (referente más cercano a v0.2.0)
- Apple Newsroom — storytelling con scroll

---

## 🔧 INSTRUCCIONES DE USO

### Sesión 03 — Workflow confirmado

**Setup local:**
- VSCode en Mac con `index.html` abierto
- Guardado local funciona (`Cmd+S`)
- Sin GitHub/Vercel hasta después de Sesión 04

**Procedimiento Sesión 03:**
1. Claude levanta frames del Figma (1681, 1847, 1904, 1990)
2. Claude genera código con `str_replace` para insertar en placeholders
3. Diego copia/pega código en VSCode, presiona `Cmd+S` para guardar
4. Resultado: HTML actualizado con Personas, Card Sorting, Solución, Resultados

**Sin distracciones técnicas:** solo contenido puro del Figma.

### Al iniciar una nueva sesión con Claude:
1. Adjunta este `master.md` (v0.2.0)
2. Adjunta el último HTML output (`portfolio-diego-lavandero.html`)
3. Si vas a levantar más contenido del Figma: ten a mano el link `https://www.figma.com/design/GHSGRkqNK5DofoCvCatRfU/...`
4. Comienza con: _"Continuamos sesión NN. Lee master.md, conecta el Figma vía MCP y propón qué resolver hoy."_

### Al terminar una sesión:
1. Pide a Claude: _"Actualiza master.md con los cambios de esta sesión a la versión vX.Y.Z según el formato del changelog"_
2. Guarda el nuevo `master.md` y el HTML actualizado juntos
3. Si algo salió mal: pide _"Revertir a vX.Y.Z según master.md"_

### Si Claude pierde contexto:
- Este archivo es la **fuente de verdad**. Lo que no esté aquí, no existió.
- El **Figma es la fuente de verdad para copy**. Lo que no esté en Figma, no existe en el portafolio.

---

_Última actualización: 2026-04-28 — Sesión 02 — v0.2.0_
