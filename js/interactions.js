/**
 * INTERACTIONS.JS — Microinteracciones del portfolio
 *
 * Incluye:
 *   1. Reveal-on-scroll        → cards aparecen con fade + translateY al entrar al viewport
 *   2. Counter animation       → números (-35%, +70%, 100%) animan desde 0 al valor real
 *   3. Parallax sutil          → hero-image y mockups se desplazan más lento que el scroll
 *   4. Hover state attribute   → marca al body con [data-scrolled] tras 60px de scroll
 *
 * Respeta prefers-reduced-motion (si el usuario lo tiene activo, todo se desactiva).
 *
 * USO: Renderer.attachListeners() llama a Interactions.bindAll() después de cada render.
 */

const Interactions = {
  // Cache de observers para poder desconectar al re-renderizar
  _revealObserver: null,
  _counterObserver: null,
  _barObserver: null,
  _parallaxRAF: null,
  _parallaxBound: false,

  // Detectar si el usuario quiere menos animación
  _reducedMotion: () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  /**
   * Punto de entrada. Se llama tras cada render para que pille los nodos nuevos.
   */
  bindAll: () => {
    Interactions._cleanup();
    if (Interactions._reducedMotion()) {
      // Sin animación: simplemente revelar todo de una.
      document.querySelectorAll('[data-section] .impact-card, [data-section] .po-card, [data-section] .product-card, [data-section] .research-card, [data-section] .insights-card, [data-section] .persona-card, [data-section] .journey-card, [data-section] .cluster-card, [data-section] .decision-card, [data-section] .principles-card, [data-section] .decisions-card, [data-section] .design-item, [data-section] .impact-card-wrap, [data-section] .learnings-card, [data-section] .nextsteps-card, [data-section] .cta-content')
        .forEach(el => el.classList.add('is-revealed'));
      return;
    }
    Interactions.bindReveal();
    Interactions.bindCounters();
    Interactions.bindBars();
    Interactions.bindParallax();
    Interactions.bindScrollState();
  },

  _cleanup: () => {
    if (Interactions._revealObserver)  Interactions._revealObserver.disconnect();
    if (Interactions._counterObserver) Interactions._counterObserver.disconnect();
    if (Interactions._barObserver)     Interactions._barObserver.disconnect();
    if (Interactions._parallaxRAF)     cancelAnimationFrame(Interactions._parallaxRAF);
  },

  // ━━━ Reveal on scroll ━━━
  bindReveal: () => {
    // Selectores que reciben fade-in. Buscamos solo dentro de [data-section] para
    // no animar el header ni el home.
    const targets = document.querySelectorAll(`
      [data-section] .impact-card,
      [data-section] .po-card,
      [data-section] .product-card,
      [data-section] .research-card,
      [data-section] .insights-card,
      [data-section] .persona-card,
      [data-section] .journey-card,
      [data-section] .cluster-card,
      [data-section] .decision-card,
      [data-section] .principles-card,
      [data-section] .decisions-card,
      [data-section] .design-item,
      [data-section] .impact-card-wrap,
      [data-section] .learnings-card,
      [data-section] .nextsteps-card,
      [data-section] .cta-content,
      [data-section] .hero-image-frame
    `);

    if (!targets.length) return;

    Interactions._revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger leve por orden de aparición dentro del mismo padre
          const idx = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(idx, 5) * 80}ms`;
          entry.target.classList.add('is-revealed');
          Interactions._revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => {
      el.classList.add('reveal');
      Interactions._revealObserver.observe(el);
    });
  },

  // ━━━ Counter animation ━━━
  // Anima cualquier elemento que matchee selectores de números. Detecta prefijo
  // (↑ ↓ + −), entero/decimal y sufijo (%, etc.). Mantiene espacios.
  bindCounters: () => {
    const targets = document.querySelectorAll(`
      .stat-value,
      .impact-metric,
      .impact-result-metric
    `);
    if (!targets.length) return;

    const parse = (text) => {
      // Captura: prefijo opcional + espacio + número + sufijo
      const m = String(text).match(/^(\s*[↑↓+−\-]?\s*)(\d+(?:[.,]\d+)?)(.*)$/);
      if (!m) return null;
      const [, prefix, numStr, suffix] = m;
      const value = parseFloat(numStr.replace(',', '.'));
      const decimals = (numStr.split(/[.,]/)[1] || '').length;
      return { prefix, value, decimals, suffix };
    };

    const format = (parsed, current) => {
      const num = parsed.decimals > 0
        ? current.toFixed(parsed.decimals)
        : Math.round(current).toString();
      return `${parsed.prefix}${num}${parsed.suffix}`;
    };

    const animate = (el, parsed) => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        const current = parsed.value * eased;
        el.textContent = format(parsed, current);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = format(parsed, parsed.value);
      };
      requestAnimationFrame(tick);
    };

    Interactions._counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Guardar texto original para poder restaurarlo si re-renderiza
        const original = el.dataset.counterOriginal || el.textContent.trim();
        const parsed = parse(original);
        if (!parsed) {
          Interactions._counterObserver.unobserve(el);
          return;
        }
        el.dataset.counterOriginal = original;
        // Setear punto de partida visual antes de animar
        el.textContent = format(parsed, 0);
        animate(el, parsed);
        Interactions._counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    targets.forEach((el) => Interactions._counterObserver.observe(el));
  },

  // ━━━ Bar fill animation ━━━
  // Anima todos los elementos [data-fill] desde width:0 al porcentaje real.
  // Se activa al entrar al viewport. Respeta prefers-reduced-motion.
  bindBars: () => {
    const targets = document.querySelectorAll('[data-fill]');
    if (!targets.length) return;

    if (Interactions._reducedMotion()) {
      targets.forEach(el => { el.style.width = el.dataset.fill + '%'; });
      return;
    }

    Interactions._barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.fill);
        if (isNaN(target)) return;
        // Pequeño delay escalonado dentro del mismo contenedor
        const idx = Array.from(el.closest('.qa-dist-bars, .ta-distrib-bars') ?.querySelectorAll('[data-fill]') || []).indexOf(el);
        const delay = Math.max(0, idx) * 80;
        setTimeout(() => { el.style.width = target + '%'; }, delay);
        Interactions._barObserver.unobserve(el);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

    targets.forEach(el => Interactions._barObserver.observe(el));
  },

  // ━━━ Parallax ━━━
  // Aplica transform translateY a hero-image-frame y design-image proporcional al
  // scroll, con throttle vía requestAnimationFrame. Solo si el elemento está cerca
  // del viewport.
  bindParallax: () => {
    const targets = document.querySelectorAll('.hero-image-frame, .design-image');
    if (!targets.length) return;

    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Solo si está cerca del viewport
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        // Cuanto más arriba en pantalla, más se desplaza hacia abajo (efecto de profundidad)
        const center = rect.top + rect.height / 2;
        const distance = center - vh / 2;
        const offset = (distance / vh) * -18; // -18px máximo
        el.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        Interactions._parallaxRAF = requestAnimationFrame(update);
        ticking = true;
      }
    };

    if (!Interactions._parallaxBound) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      Interactions._parallaxBound = true;
    }
    update(); // primer paint
  },

  // ━━━ Scroll state ━━━
  // Marca [data-scrolled] en body cuando se baja del top — para sombra del header.
  bindScrollState: () => {
    if (Interactions._scrollStateBound) return;
    const update = () => {
      document.body.dataset.scrolled = window.scrollY > 60 ? 'true' : 'false';
    };
    window.addEventListener('scroll', update, { passive: true });
    Interactions._scrollStateBound = true;
    update();
  }
};
