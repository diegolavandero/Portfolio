/**
 * RENDER.JS — Motor de renderizado JSON → HTML
 *
 * GUÍA DE NAVEGACIÓN
 * ═══════════════════════════════════════════════════════════════════
 * Cada sección tiene marcador `// ━━━ SECTION: NOMBRE ━━━`.
 * Cada section renderizada lleva `data-section="nombre"` para inspección.
 *
 * Orden de renderizado (en renderPage):
 *   1. hero               — tagline + h1 con accent + subtitle + descripción
 *   2. projectSpecs       — 6 specs en row
 *   3. heroImage          — mockup grande post-specs
 *   4. whyItMatters       — 3 cards (icon + label + metric + descripción)
 *   5. problemAndObjectives — 2 cols (problema con sub-cards rojas | objetivos numerados)
 *   6. uxResearch         — fila 1: hipótesis | métodos. Fila 2: insights cuali | cuanti
 *   7. personas           — 3 cards user persona
 *   7b. quantitativeAnalysis — stats row + patterns card con barras (async-reports)
 *   7c. abTesting         — variantes A/B + resultados del test (async-reports)
 *   8. journeyMap         — 1 card con N stages horizontales
 *   9. cardSorting        — clusters + decisión arquitectónica
 *   10. solution          — principios + decisiones de UX
 *   11. designs           — galería de mockups con badges
 *   12. results           — impacto + aprendizajes + next steps
 *   13. cta               — pregunta + botón
 *
 * BILINGÜISMO
 * ═══════════════════════════════════════════════════════════════════
 * Cada texto sale como `data-es="..." data-en="..."` vía helper bi().
 * Si falta la versión EN, hace fallback a la ES.
 */

// Helper: bilingual fallback
const t = (es, en) => en || es || '';

// Helper: escape de comillas para inyectar en HTML attributes
const esc = (str) => String(str || '').replace(/"/g, '&quot;');

// Helper: emite atributos data-es / data-en
const bi = (es, en) => `data-es="${esc(es)}" data-en="${esc(t(es, en))}"`;

const Renderer = {
  renderPage: async (slug) => {
    const app = document.getElementById('app');
    try {
      const response = await fetch(`data/${slug}.json`);
      const data = await response.json();

      let html = '';
      if (data.hero)                  html += Renderer.renderHero(data.hero);
      if (data.projectSpecs)          html += Renderer.renderProjectSpecs(data.projectSpecs);
      if (data.heroImage)             html += Renderer.renderHeroImage(data.heroImage);
      if (data.whyItMatters)          html += Renderer.renderWhyItMatters(data.whyItMatters);
      if (data.problemAndObjectives)  html += Renderer.renderProblemAndObjectives(data.problemAndObjectives);
      if (data.uxResearch)            html += Renderer.renderUXResearch(data.uxResearch);
      if (data.personas)              html += Renderer.renderPersonas(data.personas);
      if (data.quantitativeAnalysis)  html += Renderer.renderQuantitativeAnalysis(data.quantitativeAnalysis);
      if (data.abTesting)             html += Renderer.renderABTesting(data.abTesting);
      if (data.taskAnalysis)          html += Renderer.renderTaskAnalysis(data.taskAnalysis);
      if (data.treeTesting)           html += Renderer.renderTreeTesting(data.treeTesting);
      if (data.journeyMap)            html += Renderer.renderJourneyMap(data.journeyMap);
      if (data.cardSorting)           html += Renderer.renderCardSorting(data.cardSorting);
      if (data.solution)              html += Renderer.renderSolution(data.solution);
      if (data.designs)               html += Renderer.renderDesigns(data.designs);
      if (data.results)               html += Renderer.renderResults(data.results);
      if (data.cta)                   html += Renderer.renderCTA(data.cta);

      app.innerHTML = html;
      Renderer.attachListeners();
    } catch (error) {
      console.error(`Error cargando ${slug}:`, error);
      app.innerHTML = `<section class="error"><p>Error cargando la página</p></section>`;
    }
  },

  // ━━━ SECTION: Hero ━━━
  renderHero: (data) => {
    const tagline = data.tagline
      ? `<p class="hero-tagline" ${bi(data.tagline, data.taglineEn)}>${data.tagline}</p>`
      : '';
    const accent = data.titleAccent
      ? `<span class="accent" ${bi(data.titleAccent, data.titleAccentEn)}>${data.titleAccent}</span>`
      : '';
    const title = data.title
      ? `<span ${bi(data.title, data.titleEn)}>${data.title}</span>`
      : '';
    const subtitle = data.subtitle
      ? `<p class="hero-subtitle-secondary" ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>`
      : '';
    const description = data.description
      ? `<p class="hero-description" ${bi(data.description, data.descriptionEn)}>${data.description}</p>`
      : '';

    return `
      <section class="hero-project" data-section="hero">
        <div class="container">
          <div class="hero-content">
            ${tagline}
            <h1 class="hero-title">${title}${accent}</h1>
            ${subtitle}
            ${description}
          </div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Project Specs ━━━
  renderProjectSpecs: (specs) => {
    const items = specs.map(spec => `
      <div class="spec-item">
        <span class="spec-label" ${bi(spec.label, spec.labelEn)}>${spec.label}</span>
        <span class="spec-value" ${bi(spec.value, spec.valueEn)}>${spec.value}</span>
      </div>
    `).join('');

    return `
      <section class="specs-section" data-section="projectSpecs">
        <div class="container">
          <div class="specs-grid">${items}</div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Hero Image ━━━
  renderHeroImage: (data) => {
    const inner = data.src
      ? `<img class="hero-image-img" src="${esc(data.src)}" alt="${esc(data.placeholder || '')}">`
      : `<div class="image-placeholder" ${bi(data.placeholder, data.placeholderEn)}>${data.placeholder}</div>`;
    return `
      <section class="hero-image-section" data-section="heroImage">
        <div class="container">
          <div class="hero-image-frame">${inner}</div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Why It Matters ━━━
  // Cards con icon top-left, label uppercase, metric grande negro, desc gris.
  // Acepta tanto array directo (legacy lead-capture) como {title, subtitle, items}.
  renderWhyItMatters: (data) => {
    const items = Array.isArray(data) ? data : (data.items || []);
    const title = (Array.isArray(data) ? null : data.title) || 'Por qué importa';
    const titleEn = (Array.isArray(data) ? null : data.titleEn) || 'Why It Matters';
    const subtitle = Array.isArray(data) ? null : data.subtitle;
    const subtitleEn = Array.isArray(data) ? null : data.subtitleEn;

    const cards = items.map(item => `
      <div class="impact-card">
        ${item.icon ? `<div class="impact-icon">${item.icon}</div>` : ''}
        <p class="impact-eyebrow" ${bi(item.label, item.labelEn)}>${item.label}</p>
        <p class="impact-metric">${item.metric}</p>
        <p class="impact-desc" ${bi(item.description, item.descriptionEn)}>${item.description}</p>
      </div>
    `).join('');

    return `
      <section class="why-matters" data-section="whyItMatters">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(title, titleEn)}>${title}</h2>
            ${subtitle ? `<p ${bi(subtitle, subtitleEn)}>${subtitle}</p>` : ''}
          </div>
          <div class="impact-grid">${cards}</div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Problem & Objectives ━━━
  // 2 cols. Soporta nuevo schema (products + consequences + objectives objetos)
  // y legacy (competitors + objectives strings).
  renderProblemAndObjectives: (data) => {
    const problemTitle    = data.problemTitle    || 'El Problema';
    const problemTitleEn  = data.problemTitleEn  || 'The Problem';
    const objectivesTitle    = data.objectivesTitle    || 'Objetivos Medibles';
    const objectivesTitleEn  = data.objectivesTitleEn  || 'Measurable Objectives';

    // PROBLEM CARD ─────────────────────────────────────
    let problemBody = '';

    if (data.problemIntro) {
      problemBody += `<p class="problem-intro" ${bi(data.problemIntro, data.problemIntroEn)}>${data.problemIntro}</p>`;
    }

    // Nuevo schema: products[] con pros/cons
    if (data.products) {
      problemBody += data.products.map(p => {
        const pros = (p.pros || []).map((line, i) => {
          const en = (p.prosEn || [])[i] || line;
          return `<li class="prod-pro"><span class="prod-icon prod-icon-pos">+</span><span ${bi(line, en)}>${line}</span></li>`;
        }).join('');
        const cons = (p.cons || []).map((line, i) => {
          const en = (p.consEn || [])[i] || line;
          return `<li class="prod-con"><span class="prod-icon prod-icon-neg">−</span><span ${bi(line, en)}>${line}</span></li>`;
        }).join('');
        return `
          <div class="product-card">
            <h4 class="product-name" ${bi(p.name, p.nameEn)}>${p.name}</h4>
            <ul class="product-list">${pros}${cons}</ul>
          </div>
        `;
      }).join('');
    }
    // Legacy: competitors[] con name + description
    else if (data.competitors) {
      problemBody += data.competitors.map(c => `
        <div class="product-card legacy">
          <h4 class="product-name" ${bi(c.name, c.nameEn)}>${c.name}</h4>
          <p class="product-desc" ${bi(c.description, c.descriptionEn)}>${c.description}</p>
        </div>
      `).join('');
    }

    if (data.consequences) {
      const items = data.consequences.map((line, i) => {
        const en = (data.consequencesEn || [])[i] || line;
        return `<li ${bi(line, en)}>${line}</li>`;
      }).join('');
      const label = data.consequencesLabel || 'Esto generaba:';
      const labelEn = data.consequencesLabelEn || 'This generated:';
      problemBody += `
        <div class="problem-consequences">
          <p class="consequences-label" ${bi(label, labelEn)}>${label}</p>
          <ul class="consequences-list">${items}</ul>
        </div>
      `;
    }

    // OBJECTIVES CARD ──────────────────────────────────
    let objectivesBody = '';

    if (data.objectives && data.objectives.length && typeof data.objectives[0] === 'object') {
      // Nuevo schema: objects con number + title + meta + description
      objectivesBody = data.objectives.map(o => `
        <div class="objective-row">
          <div class="objective-badge">${o.number}</div>
          <div class="objective-text">
            <h4 class="objective-title" ${bi(o.title, o.titleEn)}>${o.title}</h4>
            ${o.meta ? `<p class="objective-meta" ${bi(o.meta, o.metaEn)}>${o.meta}</p>` : ''}
            <p class="objective-desc" ${bi(o.description, o.descriptionEn)}>${o.description}</p>
          </div>
        </div>
      `).join('');
    } else if (data.objectives) {
      // Legacy: array de strings
      const items = data.objectives.map((obj, i) => {
        const en = (data.objectivesEn || [])[i] || obj;
        return `<li ${bi(obj, en)}>${obj}</li>`;
      }).join('');
      objectivesBody = `<ol class="objectives-list-legacy">${items}</ol>`;
    }

    return `
      <section class="problem-objectives" data-section="problemAndObjectives">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="po-grid">
            <article class="po-card po-problem">
              <h3 class="po-card-title" ${bi(problemTitle, problemTitleEn)}>${problemTitle}</h3>
              ${problemBody}
            </article>
            <article class="po-card po-objectives">
              <h3 class="po-card-title" ${bi(objectivesTitle, objectivesTitleEn)}>${objectivesTitle}</h3>
              <div class="objectives-stack">${objectivesBody}</div>
            </article>
          </div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: UX Research ━━━
  // Soporta 2 layouts:
  //   - Estándar (UR/LC): hypothesis + methods + insights con quotes/stats
  //   - Method cards (OD): 3 cards con descripción + hallazgo
  renderUXResearch: (data) => {
    // Shared: quotes/stats se reusan en ambos layouts
    const insTitle    = data.insightsTitle      || 'Insights Clave';
    const insTitleEn  = data.insightsTitleEn    || 'Key Insights';
    const qualLabel   = data.qualitativeLabel   || 'Cualitativos';
    const qualLabelEn = data.qualitativeLabelEn || 'Qualitative';
    const quanLabel   = data.quantitativeLabel  || 'Cuantitativos';
    const quanLabelEn = data.quantitativeLabelEn|| 'Quantitative';

    const quotes = (data.quotes || []).map(q => {
      const authorLine  = q.author  ? `<p class="quote-author" ${bi(q.author, q.authorEn)}>— ${q.author}</p>` : '';
      const contextLine = q.context ? `<p class="quote-context" ${bi(q.context, q.contextEn)}><em>${q.context}</em></p>` : '';
      return `
        <div class="quote-box">
          <p class="quote-text" ${bi(q.text, q.textEn)}>"${q.text}"</p>
          ${authorLine}
          ${contextLine}
        </div>
      `;
    }).join('');

    const stats = (data.stats || []).map(s => `
      <div class="stat-item">
        <p class="stat-value">${s.value}</p>
        <p class="stat-label" ${bi(s.description, s.descriptionEn)}>${s.description}</p>
      </div>
    `).join('');

    // Variante: method cards + insights opcionales debajo
    if (data.methodCards) {
      const cards = data.methodCards.map(c => `
        <article class="method-card">
          <h3 class="method-name" ${bi(c.name, c.nameEn)}>${c.name}</h3>
          <p class="method-desc" ${bi(c.description, c.descriptionEn)}>${c.description}</p>
          <div class="method-finding">
            <p class="method-finding-label" ${bi(c.findingLabel || 'Hallazgo', c.findingLabelEn || 'Finding')}>${c.findingLabel || 'Hallazgo'}</p>
            <p class="method-finding-text" ${bi(c.finding, c.findingEn)}>${c.finding}</p>
          </div>
        </article>
      `).join('');

      let insightsBlock = '';
      if (data.quotes?.length || data.stats?.length) {
        insightsBlock = `
          <article class="insights-card">
            <h3 ${bi(insTitle, insTitleEn)}>${insTitle}</h3>
            <div class="insights-cols">
              ${quotes ? `<div class="insights-block"><p class="insights-eyebrow" ${bi(qualLabel, qualLabelEn)}>${qualLabel}</p>${quotes}</div>` : ''}
              ${stats  ? `<div class="insights-block"><p class="insights-eyebrow" ${bi(quanLabel, quanLabelEn)}>${quanLabel}</p><div class="stats-stack">${stats}</div></div>` : ''}
            </div>
          </article>`;
      }

      return `
        <section class="ux-research" data-section="uxResearch">
          <div class="container">
            <div class="section-header">
              <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
              ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
            </div>
            <div class="method-cards">${cards}</div>
            ${insightsBlock}
          </div>
        </section>
      `;
    }

    // Layout estándar
    const hypTitle    = data.hypothesisTitle    || 'Hipótesis';
    const hypTitleEn  = data.hypothesisTitleEn  || 'Hypotheses';
    const metTitle    = data.methodsTitle       || 'Metodología';
    const metTitleEn  = data.methodsTitleEn     || 'Methodology';

    const hyp = (data.hypothesis || []).map((h, i) => {
      const en = (data.hypothesisEn || [])[i] || h;
      return `<li><span class="research-num">${i + 1}.</span><span ${bi(h, en)}>${h}</span></li>`;
    }).join('');

    const met = (data.methods || []).map((m, i) => {
      const en = (data.methodsEn || [])[i] || m;
      return `<li><span class="research-bullet">•</span><span ${bi(m, en)}>${m}</span></li>`;
    }).join('');

    return `
      <section class="ux-research" data-section="uxResearch">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="research-row">
            <article class="research-card">
              <h3 ${bi(hypTitle, hypTitleEn)}>${hypTitle}</h3>
              <ul class="hypothesis-list">${hyp}</ul>
            </article>
            <article class="research-card">
              <h3 ${bi(metTitle, metTitleEn)}>${metTitle}</h3>
              <ul class="methods-list">${met}</ul>
            </article>
          </div>
          <article class="insights-card">
            <h3 ${bi(insTitle, insTitleEn)}>${insTitle}</h3>
            <div class="insights-cols">
              <div class="insights-block">
                <p class="insights-eyebrow" ${bi(qualLabel, qualLabelEn)}>${qualLabel}</p>
                ${quotes}
              </div>
              <div class="insights-block">
                <p class="insights-eyebrow" ${bi(quanLabel, quanLabelEn)}>${quanLabel}</p>
                <div class="stats-stack">${stats}</div>
              </div>
            </div>
          </article>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Personas ━━━
  // Acepta tanto array (legacy LC) como {title, subtitle, items}.
  renderPersonas: (data) => {
    const items = Array.isArray(data) ? data : (data.items || []);
    const title = (Array.isArray(data) ? null : data.title) || 'User Personas';
    const titleEn = (Array.isArray(data) ? null : data.titleEn) || 'User Personas';
    const subtitle = (Array.isArray(data) ? null : data.subtitle) || 'Perfiles de usuario basados en investigación cualitativa';
    const subtitleEn = (Array.isArray(data) ? null : data.subtitleEn) || 'User profiles based on qualitative research';

    const cards = items.map(p => {
      const goals = (p.goals || []).map((g, i) =>
        `<li class="goal-item"><span class="goal-icon">→</span><span ${bi(g, (p.goalsEn || [])[i])}>${g}</span></li>`
      ).join('');
      const pains = (p.painPoints || []).map((x, i) =>
        `<li class="pain-item"><span class="pain-icon">✕</span><span ${bi(x, (p.painPointsEn || [])[i])}>${x}</span></li>`
      ).join('');
      const behaviors = (p.behaviors || []).map((b, i) =>
        `<li class="behavior-item"><span class="behavior-icon">•</span><span ${bi(b, (p.behaviorsEn || [])[i])}>${b}</span></li>`
      ).join('');

      return `
        <article class="persona-card">
          <header class="persona-header">
            <img src="${esc(p.avatar)}" alt="${esc(p.name)}" class="persona-avatar">
            <h3 class="persona-name">${p.name}</h3>
            <p class="persona-role" ${bi(p.role, p.roleEn)}>${p.role}</p>
          </header>
          <div class="persona-block">
            <p class="persona-eyebrow" ${bi('Objetivos', 'Goals')}>Objetivos</p>
            <ul>${goals}</ul>
          </div>
          <div class="persona-block">
            <p class="persona-eyebrow" ${bi('Puntos de Dolor', 'Pain Points')}>Puntos de Dolor</p>
            <ul>${pains}</ul>
          </div>
          <div class="persona-block">
            <p class="persona-eyebrow" ${bi('Comportamientos', 'Behaviors')}>Comportamientos</p>
            <ul>${behaviors}</ul>
          </div>
          ${p.quote ? `<div class="persona-block persona-quote-block">
            <p class="persona-eyebrow" ${bi(p.quoteLabel || 'Cita', p.quoteLabelEn || 'Quote')}>${p.quoteLabel || 'Cita'}</p>
            <p class="persona-quote" ${bi(p.quote, p.quoteEn)}>"${p.quote}"</p>
          </div>` : ''}
        </article>
      `;
    }).join('');

    return `
      <section class="personas-section" data-section="personas">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(title, titleEn)}>${title}</h2>
            <p ${bi(subtitle, subtitleEn)}>${subtitle}</p>
          </div>
          <div class="personas-grid">${cards}</div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Quantitative Analysis ━━━
  renderQuantitativeAnalysis: (data) => {
    const stats = (data.stats || []).map(s => {
      const colorClass = s.color === 'red' ? 'qa-stat-value--red' : '';
      return `
        <div class="qa-stat">
          <p class="qa-stat-value ${colorClass}">${s.value}</p>
          <p class="qa-stat-label" ${bi(s.label, s.labelEn)}>${s.label}</p>
        </div>
      `;
    }).join('');

    const behaviors = (data.behaviors || []).map(b => `
      <li class="qa-behavior-item">
        <span class="qa-behavior-dot"></span>
        <span ${bi(b.text, b.textEn)}>${b.text}</span>
      </li>
    `).join('');

    const barColors = { green: 'var(--green-500)', amber: 'var(--yellow-500)', red: 'var(--red-500)' };
    const distribution = (data.distribution || []).map(d => {
      const color = barColors[d.color] || 'var(--gray-400)';
      return `
        <div class="qa-dist-row">
          <span class="qa-dist-range">${d.range}</span>
          <div class="qa-dist-bar-wrap">
            <div class="qa-dist-bar" data-fill="${d.value}" style="width:0; background:${color};"></div>
          </div>
          <span class="qa-dist-pct">${d.value}%</span>
        </div>
      `;
    }).join('');

    const pTitle   = data.patternsTitle   || 'Patrones Identificados en Session Recordings';
    const pTitleEn = data.patternsTitleEn || 'Patterns Identified in Session Recordings';

    return `
      <section class="qa-section" data-section="quantitativeAnalysis">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="qa-stats-row">${stats}</div>
          <article class="qa-patterns-card">
            <h3 class="qa-patterns-title" ${bi(pTitle, pTitleEn)}>${pTitle}</h3>
            <div class="qa-patterns-grid">
              <div class="qa-behaviors-col">
                <p class="qa-col-eyebrow" ${bi(data.behaviorsLabel, data.behaviorsLabelEn)}>${data.behaviorsLabel}</p>
                <ul class="qa-behaviors-list">${behaviors}</ul>
              </div>
              <div class="qa-dist-col">
                <p class="qa-col-eyebrow" ${bi(data.distributionLabel, data.distributionLabelEn)}>${data.distributionLabel}</p>
                <div class="qa-dist-bars">${distribution}</div>
                ${data.distributionNote ? `<p class="qa-dist-note" ${bi(data.distributionNote, data.distributionNoteEn)}>${data.distributionNote}</p>` : ''}
              </div>
            </div>
          </article>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: A/B Testing ━━━
  renderABTesting: (data) => {
    const iconMap = { positive: '✓', negative: '✗', neutral: '–' };
    const classMap = { positive: 'ab-item--pos', negative: 'ab-item--neg', neutral: 'ab-item--neutral' };

    const renderVariant = (variant, side) => {
      const items = (variant.items || []).map(it => `
        <li class="ab-item ${classMap[it.type] || ''}">
          <span class="ab-item-icon">${iconMap[it.type] || '•'}</span>
          <span ${bi(it.text, it.textEn)}>${it.text}</span>
        </li>
      `).join('');
      return `
        <div class="ab-variant ab-variant--${side}">
          <p class="ab-variant-label" ${bi(variant.label, variant.labelEn)}>${variant.label}</p>
          <ul class="ab-items-list">${items}</ul>
        </div>
      `;
    };

    const metrics = (data.results || []).map(m => `
      <div class="ab-metric">
        <p class="ab-metric-value ab-metric-value--${m.color || 'indigo'}">${m.value}</p>
        <p class="ab-metric-label" ${bi(m.label, m.labelEn)}>${m.label}</p>
      </div>
    `).join('');

    const rTitle   = data.resultsTitle   || 'Resultados del Test';
    const rTitleEn = data.resultsTitleEn || 'Test Results';

    return `
      <section class="ab-section" data-section="abTesting">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="ab-variants-grid">
            ${data.variantA ? renderVariant(data.variantA, 'a') : ''}
            ${data.variantB ? renderVariant(data.variantB, 'b') : ''}
          </div>
          <article class="ab-results-card">
            <h3 class="ab-results-title" ${bi(rTitle, rTitleEn)}>${rTitle}</h3>
            <div class="ab-metrics-row">${metrics}</div>
            ${data.insight ? `<p class="ab-insight" ${bi(data.insight, data.insightEn)}>${data.insight}</p>` : ''}
          </article>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Task Analysis ━━━
  renderTaskAnalysis: (data) => {
    const badgeClass = { high: 'ta-badge--high', 'very-high': 'ta-badge--very-high', medium: 'ta-badge--medium', low: 'ta-badge--low' };
    const barColors  = { red: 'var(--red-500)', amber: 'var(--yellow-500)', green: 'var(--green-500)' };

    const rows = (data.tasks || []).map(t => `
      <div class="ta-row">
        <span class="ta-num">${t.number}</span>
        <span class="ta-subtask" ${bi(t.subtask, t.subtaskEn)}>${t.subtask}</span>
        <span class="ta-badge ${badgeClass[t.loadLevel] || ''}" ${bi(t.load, t.loadEn)}>${t.load}</span>
        <span class="ta-friction" ${bi(t.friction, t.frictionEn)}>${t.friction}</span>
      </div>
    `).join('');

    const tableHeader = `
      <div class="ta-header">
        <span>${data.headerNumber || '#'}</span>
        <span ${bi(data.headerSubtask || 'SUBTAREA', data.headerSubtaskEn || 'SUBTASK')}>${data.headerSubtask || 'SUBTAREA'}</span>
        <span ${bi(data.headerLoad || 'CARGA COGNITIVA', data.headerLoadEn || 'COGNITIVE LOAD')}>${data.headerLoad || 'CARGA COGNITIVA'}</span>
        <span ${bi(data.headerFriction || 'FRICCIÓN IDENTIFICADA', data.headerFrictionEn || 'FRICTION IDENTIFIED')}>${data.headerFriction || 'FRICCIÓN IDENTIFICADA'}</span>
      </div>
    `;

    let distribBlock = '';
    const dist = data.distribution;
    if (dist) {
      const bars = (dist.bars || []).map(b => {
        const color = barColors[b.color] || 'var(--gray-400)';
        return `
          <div class="ta-dist-group">
            <div class="ta-dist-header">
              <span class="ta-dist-label" ${bi(b.label, b.labelEn)}>${b.label}</span>
              <span class="ta-dist-pct">${b.value}%</span>
            </div>
            <div class="ta-dist-track">
              <div class="ta-dist-fill" data-fill="${b.value}" style="width:0; background:${color};"></div>
            </div>
          </div>
        `;
      }).join('');

      const dTitle   = dist.title   || 'Distribución de tiempo';
      const dTitleEn = dist.titleEn || 'Time distribution';

      distribBlock = `
        <article class="ta-distrib-card">
          <div class="ta-distrib-main">
            <h3 class="ta-distrib-title" ${bi(dTitle, dTitleEn)}>${dTitle}</h3>
            <div class="ta-distrib-bars">${bars}</div>
            ${dist.note ? `<p class="ta-distrib-note" ${bi(dist.note, dist.noteEn)}>${dist.note}</p>` : ''}
          </div>
          <div class="ta-insight-callout">
            ${dist.insightLabel ? `<p class="ta-insight-label" ${bi(dist.insightLabel, dist.insightLabelEn)}>${dist.insightLabel}</p>` : ''}
            <p class="ta-insight-text" ${bi(dist.insight, dist.insightEn)}>${dist.insight}</p>
          </div>
        </article>
      `;
    }

    return `
      <section class="ta-section" data-section="taskAnalysis">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <article class="ta-table-card">
            ${tableHeader}
            <div class="ta-rows">${rows}</div>
          </article>
          ${distribBlock}
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Tree Testing ━━━
  renderTreeTesting: (data) => {
    const barColors = { red: 'var(--red-500)', amber: 'var(--yellow-500)', green: 'var(--green-500)' };
    const barNote   = data.barNote   || '% éxito en primer intento';
    const barNoteEn = data.barNoteEn || '% first-try success';
    const learnLabel   = data.learningLabel   || 'APRENDIZAJE';
    const learnLabelEn = data.learningLabelEn || 'LEARNING';

    const cards = (data.tasks || []).map(t => {
      const bars = (t.bars || []).map(b => {
        const color = barColors[b.color] || 'var(--gray-400)';
        return `
          <div class="qa-dist-row">
            <span class="qa-dist-range">${b.version}</span>
            <div class="qa-dist-bar-wrap">
              <div class="qa-dist-bar" data-fill="${b.value}" style="width:0; background:${color};"></div>
            </div>
            <span class="qa-dist-pct">${b.value}%</span>
          </div>
        `;
      }).join('');

      return `
        <article class="tt-task-card">
          <h3 class="tt-task-title" ${bi(t.task, t.taskEn)}>${t.task}</h3>
          <div class="qa-dist-bars tt-bars">${bars}</div>
          <p class="tt-bar-note" ${bi(barNote, barNoteEn)}>${barNote}</p>
          <div class="tt-learning">
            <p class="tt-learn-label" ${bi(learnLabel, learnLabelEn)}>${learnLabel}</p>
            <p class="tt-learn-text" ${bi(t.learning, t.learningEn)}>${t.learning}</p>
          </div>
        </article>
      `;
    }).join('');

    let decisionBlock = '';
    const dec = data.decision;
    if (dec) {
      decisionBlock = `
        <article class="tt-decision-card">
          <p class="tt-decision-label" ${bi(dec.label, dec.labelEn)}>${dec.label}</p>
          <p class="tt-decision-text" ${bi(dec.text, dec.textEn)}>${dec.text}</p>
        </article>
      `;
    }

    return `
      <section class="tt-section" data-section="treeTesting">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="tt-tasks-grid">${cards}</div>
          ${decisionBlock}
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Journey Map ━━━
  // Un solo card grande con N stages como columnas internas.
  renderJourneyMap: (data) => {
    const stages = data.stages.map(s => `
      <div class="journey-stage">
        <div class="stage-number">${s.id}</div>
        <p class="stage-name" ${bi(s.name, s.nameEn)}>${s.name}</p>
        <p class="stage-problem">
          <span class="stage-icon-x">✕</span>
          <span ${bi(s.problem, s.problemEn)}>${s.problem}</span>
        </p>
        <p class="stage-solution">
          <span class="stage-icon-check">✓</span>
          <span ${bi(s.solution, s.solutionEn)}>${s.solution}</span>
        </p>
      </div>
    `).join('');

    return `
      <section class="journey-map-section" data-section="journeyMap">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="journey-card">
            <div class="journey-stages">${stages}</div>
          </div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Card Sorting ━━━
  renderCardSorting: (data) => {
    const clusters = (data.clusters || []).map(c => {
      const colorClass = `cluster-color-${c.color || 'indigo'}`;
      const items = (c.items || []).map((it, i) => {
        const en = (c.itemsEn || [])[i] || it;
        return `<li><span class="cluster-dot ${colorClass}"></span><span ${bi(it, en)}>${it}</span></li>`;
      }).join('');
      return `
        <article class="cluster-card">
          <h3 class="cluster-name" ${bi(c.name, c.nameEn)}>${c.name}</h3>
          <ul class="cluster-items">${items}</ul>
        </article>
      `;
    }).join('');

    let decisionHTML = '';
    const decision = data.decision;
    if (decision) {
      const principleLabel    = decision.principleLabel    || 'Principio de diseño:';
      const principleLabelEn  = decision.principleLabelEn  || 'Design principle:';
      const tradeoffsTitle    = decision.tradeoffsTitle    || 'Intercambios';
      const tradeoffsTitleEn  = decision.tradeoffsTitleEn  || 'Tradeoffs';
      const mitigationLabel   = decision.mitigationLabel   || 'Mitigación:';
      const mitigationLabelEn = decision.mitigationLabelEn || 'Mitigation:';

      // Columna izquierda: title + descripción (+ párrafo extra opcional) + principio
      const extraDesc = decision.descriptionExtra
        ? `<p class="decision-desc" ${bi(decision.descriptionExtra, decision.descriptionExtraEn)}>${decision.descriptionExtra}</p>`
        : '';
      const principleBlock = decision.principle
        ? `<div class="decision-principle">
            <p class="principle-label" ${bi(principleLabel, principleLabelEn)}>${principleLabel}</p>
            <p class="principle-text" ${bi(decision.principle, decision.principleEn)}><em>"${decision.principle}"</em></p>
          </div>`
        : '';

      // Columna derecha: variante tradeoffs (UR/LC) o variante insights numéricos (OD)
      let rightCol = '';
      if (decision.insights) {
        const insightsTitle = decision.insightsTitle || 'Insights del ejercicio';
        const insightsTitleEn = decision.insightsTitleEn || 'Exercise Insights';
        const insightsList = decision.insights.map(i => `
          <li class="insight-row">
            <span class="insight-value">${i.value}</span>
            <span class="insight-text" ${bi(i.text, i.textEn)}>${i.text}</span>
          </li>
        `).join('');
        rightCol = `
          <div class="decision-col">
            <p class="insights-eyebrow" ${bi(insightsTitle, insightsTitleEn)}>${insightsTitle}</p>
            <ul class="decision-insights">${insightsList}</ul>
          </div>
        `;
      } else if (decision.tradeoffs) {
        const positives = decision.tradeoffs.filter(x => x.type === 'positive');
        const negatives = decision.tradeoffs.filter(x => x.type === 'negative');
        const tradeoffsList = `
          ${positives.map(x => `<li class="trade-pos"><span class="trade-icon">+</span><span ${bi(x.text, x.textEn)}>${x.text}</span></li>`).join('')}
          ${negatives.map(x => `<li class="trade-neg"><span class="trade-icon">−</span><span ${bi(x.text, x.textEn)}>${x.text}</span></li>`).join('')}
        `;
        const mitigationBlock = decision.mitigation
          ? `<div class="decision-mitigation">
              <p class="mitigation-label" ${bi(mitigationLabel, mitigationLabelEn)}>${mitigationLabel}</p>
              <p class="mitigation-text" ${bi(decision.mitigation, decision.mitigationEn)}>${decision.mitigation}</p>
            </div>`
          : '';
        rightCol = `
          <div class="decision-col">
            <h3 class="decision-title" ${bi(tradeoffsTitle, tradeoffsTitleEn)}>${tradeoffsTitle}</h3>
            <ul class="tradeoffs-list">${tradeoffsList}</ul>
            ${mitigationBlock}
          </div>
        `;
      }

      decisionHTML = `
        <article class="decision-card">
          <div class="decision-col">
            <h3 class="decision-title" ${bi(decision.title, decision.titleEn)}>${decision.title}</h3>
            <p class="decision-desc" ${bi(decision.description, decision.descriptionEn)}>${decision.description}</p>
            ${extraDesc}
            ${principleBlock}
          </div>
          ${rightCol}
        </article>
      `;
    }

    return `
      <section class="card-sorting-section" data-section="cardSorting">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="clusters-grid">${clusters}</div>
          ${decisionHTML}
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Solution ━━━
  // Soporta:
  //   - principles + decisions (UR/LC)
  //   - components (OD): grid 2x2 de cards descriptivas
  renderSolution: (data) => {
    // Variante: components 2x2 (con decisiones opcionales abajo)
    if (data.components) {
      const cards = data.components.map(c => `
        <article class="component-card">
          <h3 class="component-title" ${bi(c.title, c.titleEn)}>${c.title}</h3>
          ${c.tagline ? `<p class="component-tagline" ${bi(c.tagline, c.taglineEn)}><em>${c.tagline}</em></p>` : ''}
          <p class="component-desc" ${bi(c.description, c.descriptionEn)}>${c.description}</p>
        </article>
      `).join('');

      // Principios de diseño opcionales antes del grid
      let principlesBlock = '';
      if (data.principles && data.principles.length) {
        const pTitle   = data.principlesTitle   || 'Principios de Diseño';
        const pTitleEn = data.principlesTitleEn || 'Design Principles';
        const cols = data.principles.map(p => `
          <div class="principle-col">
            <p class="principle-number">${p.number}</p>
            <h4 class="principle-heading" ${bi(p.title, p.titleEn)}>${p.title}</h4>
            <p class="principle-desc" ${bi(p.description, p.descriptionEn)}>${p.description}</p>
          </div>
        `).join('');
        principlesBlock = `
          <article class="principles-card">
            <h3 class="card-inner-title" ${bi(pTitle, pTitleEn)}>${pTitle}</h3>
            <div class="principles-row">${cols}</div>
          </article>
        `;
      }

      // Decisiones de diseño opcionales debajo del grid (ej. async-reports)
      let decisionsBlock = '';
      if (data.decisions && data.decisions.length) {
        const dTitle    = data.decisionsTitle    || 'Decisiones de Diseño Clave';
        const dTitleEn  = data.decisionsTitleEn  || 'Key Design Decisions';
        const labelA    = data.decisionLabelA    || 'Decisión:';
        const labelAEn  = data.decisionLabelAEn  || 'Decision:';
        const labelB    = data.decisionLabelB    || 'Razonamiento:';
        const labelBEn  = data.decisionLabelBEn  || 'Reasoning:';
        const decItems = data.decisions.map(d => `
          <div class="decision-item">
            <h4 class="decision-item-title" ${bi(d.title, d.titleEn)}>${d.title}</h4>
            <p class="decision-line">
              <strong ${bi(labelA, labelAEn)}>${labelA}</strong>
              <span ${bi(d.justification, d.justificationEn)}>${d.justification}</span>
            </p>
            <p class="decision-line">
              <strong ${bi(labelB, labelBEn)}>${labelB}</strong>
              <span ${bi(d.tradeoff, d.tradeoffEn)}>${d.tradeoff}</span>
            </p>
          </div>
        `).join('');
        decisionsBlock = `
          <article class="decisions-card">
            <h3 class="card-inner-title" ${bi(dTitle, dTitleEn)}>${dTitle}</h3>
            <div class="decisions-stack">${decItems}</div>
          </article>
        `;
      }

      return `
        <section class="solution-section" data-section="solution">
          <div class="container">
            <div class="section-header">
              <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
              ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
            </div>
            ${principlesBlock}
            <div class="components-grid">${cards}</div>
            ${decisionsBlock}
          </div>
        </section>
      `;
    }

    const principlesTitle   = data.principlesTitle   || 'Principios de Diseño';
    const principlesTitleEn = data.principlesTitleEn || 'Design Principles';
    const decisionsTitle    = data.decisionsTitle    || 'Decisiones Clave de UX';
    const decisionsTitleEn  = data.decisionsTitleEn  || 'Key UX Decisions';

    const principles = (data.principles || []).map(p => `
      <div class="principle-col">
        <p class="principle-number">${p.number}</p>
        <h4 class="principle-heading" ${bi(p.title, p.titleEn)}>${p.title}</h4>
        <p class="principle-desc" ${bi(p.description, p.descriptionEn)}>${p.description}</p>
      </div>
    `).join('');

    // Labels parametrizables. UR usa Justificación/Intercambio, LC usa Descripción/Beneficio.
    const labelA    = data.decisionLabelA    || 'Justificación:';
    const labelAEn  = data.decisionLabelAEn  || 'Justification:';
    const labelB    = data.decisionLabelB    || 'Intercambio:';
    const labelBEn  = data.decisionLabelBEn  || 'Tradeoff:';

    const decisions = (data.decisions || []).map(d => `
      <div class="decision-item">
        <h4 class="decision-item-title" ${bi(d.title, d.titleEn)}>${d.title}</h4>
        <p class="decision-line">
          <strong ${bi(labelA, labelAEn)}>${labelA}</strong>
          <span ${bi(d.justification, d.justificationEn)}>${d.justification}</span>
        </p>
        <p class="decision-line">
          <strong ${bi(labelB, labelBEn)}>${labelB}</strong>
          <span ${bi(d.tradeoff, d.tradeoffEn)}>${d.tradeoff}</span>
        </p>
      </div>
    `).join('');

    return `
      <section class="solution-section" data-section="solution">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <article class="principles-card">
            <h3 class="card-inner-title" ${bi(principlesTitle, principlesTitleEn)}>${principlesTitle}</h3>
            <div class="principles-row">${principles}</div>
          </article>
          <article class="decisions-card">
            <h3 class="card-inner-title" ${bi(decisionsTitle, decisionsTitleEn)}>${decisionsTitle}</h3>
            <div class="decisions-stack">${decisions}</div>
          </article>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Designs ━━━
  renderDesigns: (data) => {
    const screenContent = (src, ph, phEn) =>
      src ? `<img src="${esc(src)}" alt="${esc(ph || '')}">` :
            `<div class="image-placeholder" ${bi(ph || 'Mockup pendiente', phEn || 'Mockup pending')}>${ph || 'Mockup pendiente'}</div>`;
    const items = (data.items || []).map(item => {
      const badgeClass = `design-badge-${item.badgeStyle || 'indigo'}`;
      const device = item.device || data.device;
      const imageClass = `design-image${device === 'mobile' ? ' design-image--mobile' : ''}`;
      let imageInner;
      if (device === 'desktop') {
        imageInner = `<div class="device device-desktop">${screenContent(item.src, item.placeholder, item.placeholderEn)}</div>`;
      } else if (device === 'mobile') {
        imageInner = `<div class="device device-mobile"><div class="device-screen">${screenContent(item.src, item.placeholder, item.placeholderEn)}</div></div>`;
      } else if (device === 'both') {
        imageInner = `<div class="device-duo">
          <div class="device device-desktop">${screenContent(item.src, item.placeholder, item.placeholderEn)}</div>
          <div class="device device-mobile"><div class="device-screen">${screenContent(item.srcMobile, item.placeholder, item.placeholderEn)}</div></div>
        </div>`;
      } else {
        imageInner = screenContent(item.src, item.placeholder, item.placeholderEn);
      }
      return `
        <article class="design-item">
          ${item.badge ? `<span class="design-badge ${badgeClass}" ${bi(item.badge, item.badgeEn)}>${item.badge}</span>` : ''}
          <h3 class="design-title" ${bi(item.title, item.titleEn)}>${item.title}</h3>
          ${item.description ? `<p class="design-desc" ${bi(item.description, item.descriptionEn)}>${item.description}</p>` : ''}
          <div class="${imageClass}">${imageInner}</div>
        </article>
      `;
    }).join('');

    return `
      <section class="designs-section" data-section="designs">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          <div class="designs-stack">${items}</div>
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: Results ━━━
  // Soporta:
  //   - Verde grande + learnings + nextSteps (UR/LC, default)
  //   - Metric cards estilo Why (icon + label + metric + desc) sin learnings/nextSteps (OD)
  // Detecta automáticamente: si los items de impact tienen `icon`, usa metric-cards.
  renderResults: (data) => {
    const impactTitle      = data.impactTitle      || 'Impacto Esperado';
    const impactTitleEn    = data.impactTitleEn    || 'Expected Impact';
    const learningsTitle   = data.learningsTitle   || 'Aprendizajes Clave';
    const learningsTitleEn = data.learningsTitleEn || 'Key Learnings';
    const nextStepsTitle   = data.nextStepsTitle   || 'Próximos Pasos';
    const nextStepsTitleEn = data.nextStepsTitleEn || 'Next Steps';

    const items = data.impact || [];
    const isMetricCards = items.length > 0 && !!items[0].icon;

    const impact = isMetricCards
      ? items.map(i => `
          <div class="impact-card">
            ${i.icon ? `<div class="impact-icon">${i.icon}</div>` : ''}
            <p class="impact-eyebrow" ${bi(i.label, i.labelEn)}>${i.label}</p>
            <p class="impact-metric">${i.metric}</p>
            <p class="impact-desc" ${bi(i.description, i.descriptionEn)}>${i.description}</p>
          </div>
        `).join('')
      : items.map(i => `
          <div class="impact-result">
            <p class="impact-result-metric">${i.metric}</p>
            <h4 class="impact-result-label" ${bi(i.label, i.labelEn)}>${i.label}</h4>
            <p class="impact-result-desc" ${bi(i.description, i.descriptionEn)}>${i.description}</p>
          </div>
        `).join('');

    const hasLearnings = data.learnings && data.learnings.length;
    const hasNextSteps = data.nextSteps && data.nextSteps.length;

    const learnings = (data.learnings || []).map(l => `
      <div class="learning-item">
        <h4 ${bi(l.title, l.titleEn)}>${l.title}</h4>
        <p ${bi(l.description, l.descriptionEn)}>${l.description}</p>
      </div>
    `).join('');

    const nextSteps = (data.nextSteps || []).map(n => `
      <div class="nextstep-item">
        <h4 ${bi(n.title, n.titleEn)}>${n.title}</h4>
        <p ${bi(n.description, n.descriptionEn)}>${n.description}</p>
      </div>
    `).join('');

    const impactWrapper = isMetricCards
      ? `<div class="impact-grid">${impact}</div>`
      : `<article class="impact-card-wrap">
          <h3 class="card-inner-title" ${bi(impactTitle, impactTitleEn)}>${impactTitle}</h3>
          <div class="impact-row">${impact}</div>
        </article>`;

    const bottom = (hasLearnings || hasNextSteps)
      ? `<div class="results-bottom">
          ${hasLearnings ? `<article class="learnings-card">
            <h3 class="card-inner-title" ${bi(learningsTitle, learningsTitleEn)}>${learningsTitle}</h3>
            <div class="learnings-stack">${learnings}</div>
          </article>` : ''}
          ${hasNextSteps ? `<article class="nextsteps-card">
            <h3 class="card-inner-title" ${bi(nextStepsTitle, nextStepsTitleEn)}>${nextStepsTitle}</h3>
            <div class="nextsteps-stack">${nextSteps}</div>
          </article>` : ''}
        </div>`
      : '';

    return `
      <section class="results-section" data-section="results">
        <div class="container">
          <div class="section-header">
            <h2 ${bi(data.title, data.titleEn)}>${data.title}</h2>
            ${data.subtitle ? `<p ${bi(data.subtitle, data.subtitleEn)}>${data.subtitle}</p>` : ''}
          </div>
          ${impactWrapper}
          ${bottom}
        </div>
      </section>
    `;
  },

  // ━━━ SECTION: CTA Final ━━━
  renderCTA: (data) => `
    <section class="cta-section" data-section="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-question" ${bi(data.question, data.questionEn)}>${data.question}</h2>
          ${data.description ? `<p class="cta-description" ${bi(data.description, data.descriptionEn)}>${data.description}</p>` : ''}
          <a class="cta-button" href="${esc(data.buttonHref || '#/about')}" ${bi(data.buttonLabel, data.buttonLabelEn)}>${data.buttonLabel}</a>
        </div>
      </div>
    </section>
  `,

  attachListeners: () => {
    // Microinteracciones: reveal-on-scroll, counters, parallax (ver interactions.js)
    if (typeof Interactions !== 'undefined') {
      Interactions.bindAll();
    }
  }
};
