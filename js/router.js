/**
 * ROUTER.JS
 * Maneja navegación SPA — carga páginas dinámicamente
 * Usa History API (URLs limpias sin #)
 */

const Router = {
  currentPage: 'home',
  currentLang: localStorage.getItem('lang') || 'es',

  init: () => {
    Router.setLanguage(Router.currentLang);

    // Escuchar navegación con botones atrás/adelante
    window.addEventListener('popstate', Router.handleRoute);

    // Evento inicial
    Router.handleRoute();

    // Toggle de idioma
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => Router.setLanguage(btn.dataset.lang));
    });

    // Links de navegación
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        Router.navigate(page === 'home' ? '/' : `/${page}`);
      });
    });
  },

  navigate: (path) => {
    window.history.pushState({}, '', path);
    Router.handleRoute();
  },

  handleRoute: () => {
    const path = window.location.pathname;
    let page = 'home';

    if (path === '/' || path === '') {
      page = 'home';
    } else {
      page = path.slice(1); // quitar la barra inicial
    }

    if (page && page !== 'home' && page !== 'about') {
      Router.loadProject(page);
    } else if (page === 'about') {
      Router.loadAbout();
    } else {
      Router.loadHome();
    }

    Router.currentPage = page;
    Router.updateActiveNav();
  },

  loadHome: async () => {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loading">Cargando...</div>';

    try {
      const response = await fetch('/data/home.json');
      const data = await response.json();
      const ctaView = data.ctaLabels?.viewProject || 'Ver proyecto';
      const ctaViewEn = data.ctaLabels?.viewProjectEn || 'View project';

      const featured = data.featured;
      const mkThumb = (device, src) => {
        const ph = `<div class="image-placeholder" data-es="Mockup pendiente" data-en="Mockup pending">Mockup pendiente</div>`;
        const inner = src ? `<img src="${src}" alt="">` : ph;
        if (device === 'desktop') return `<div class="device device-desktop">${inner}</div>`;
        if (device === 'mobile')  return `<div class="device device-mobile"><div class="device-screen">${inner}</div></div>`;
        return ph;
      };

      const projectsHTML = data.projects.map(p => `
        <article class="project-card" onclick="${p.externalUrl ? `window.open('${p.externalUrl}','_blank')` : `Router.navigate('/${p.slug}')`}">
          <div class="project-info">
            <p class="card-eyebrow" data-es="${p.eyebrow}" data-en="${p.eyebrowEn}">${p.eyebrow}</p>
            <h3 class="project-title" data-es="${p.title}" data-en="${p.titleEn}">${p.title}</h3>
            <p class="project-subtitle" data-es="${p.subtitle}" data-en="${p.subtitleEn}">${p.subtitle}</p>
            <div class="metric-pill">
              <span class="metric-value">${p.metric}</span>
              <span class="metric-label" data-es="${p.metricLabel}" data-en="${p.metricLabelEn}">${p.metricLabel}</span>
            </div>
            <a class="card-cta" data-es="${ctaView}" data-en="${ctaViewEn}">${ctaView}</a>
          </div>
          <div class="project-image">${mkThumb(p.device, p.image)}</div>
        </article>
      `).join('');

      const html = `
        <section class="hero-home">
          <div class="container">
            <h1 class="hero-main-title"><span data-es="${data.hero.titleStart}" data-en="${data.hero.titleStartEn}">${data.hero.titleStart}</span><span class="accent" data-es="${data.hero.titleAccent}" data-en="${data.hero.titleAccentEn}">${data.hero.titleAccent}</span></h1>
            <p class="hero-subtitle" data-es="${data.hero.subtitle}" data-en="${data.hero.subtitleEn}">${data.hero.subtitle}</p>
          </div>
        </section>
        <section class="featured-section">
          <div class="container">
            <article class="featured-card-large" onclick="Router.navigate('/${featured.slug}')">
              <div class="featured-content">
                <p class="card-eyebrow" data-es="${featured.eyebrow}" data-en="${featured.eyebrowEn}">${featured.eyebrow}</p>
                <h2 class="featured-title" data-es="${featured.title}" data-en="${featured.titleEn}">${featured.title}</h2>
                <p class="featured-subtitle" data-es="${featured.subtitle}" data-en="${featured.subtitleEn}">${featured.subtitle}</p>
                <div class="metric-pill">
                  <span class="metric-value">${featured.metric}</span>
                  <span class="metric-label" data-es="${featured.metricLabel}" data-en="${featured.metricLabelEn}">${featured.metricLabel}</span>
                </div>
                <a class="card-cta" data-es="${featured.cta}" data-en="${featured.ctaEn}">${featured.cta}</a>
              </div>
              <div class="featured-image">${mkThumb(featured.device, featured.image)}</div>
            </article>
          </div>
        </section>
        <section class="projects-section">
          <div class="container">
            <div class="projects-grid">
              ${projectsHTML}
            </div>
          </div>
        </section>
      `;

      app.innerHTML = html;
      Router.applyLanguage();
      if (typeof Interactions !== 'undefined') Interactions.bindAll();

    } catch (error) {
      console.error('Error loading home:', error);
      app.innerHTML = `<div class="error">Error cargando la página de inicio</div>`;
    }
  },

  loadProject: async (slug) => {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loading">Cargando proyecto...</div>';
    await Renderer.renderPage(slug);
    Router.applyLanguage();
  },

  loadAbout: async () => {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loading">Cargando...</div>';

    try {
      const response = await fetch('/data/about.json');
      const data = await response.json();

      const introHTML = data.intro.map((p, i) =>
        `<p class="about-intro-text" data-es="${p}" data-en="${data.introEn[i]}">${p}</p>`
      ).join('');

      const achievementsHTML = data.achievements.map(a =>
        `<li data-es="${a.es}" data-en="${a.en}">${a.es}</li>`
      ).join('');

      const competenciesHTML = data.competencies.map(c =>
        `<div class="competency-pill" data-es="${c.es}" data-en="${c.en}">${c.es}</div>`
      ).join('');

      const experienceHTML = data.experience.map(e => `
        <article class="experience-item">
          <div class="experience-info">
            <h3 class="experience-company">${e.company}</h3>
            <p class="experience-role" data-es="${e.role}" data-en="${e.roleEn}">${e.role}</p>
            <p class="experience-description" data-es="${e.description}" data-en="${e.descriptionEn}">${e.description}</p>
          </div>
          <p class="experience-period" data-es="${e.period}" data-en="${e.periodEn}">${e.period}</p>
        </article>
      `).join('');

      const softwareHTML = data.software.map(s =>
        `<span class="software-tag">${s}</span>`
      ).join('');

      const educationHTML = data.education.map(e => `
        <article class="experience-item">
          <div class="experience-info">
            <h3 class="experience-company">${e.institution}</h3>
            <p class="experience-description" data-es="${e.degree}" data-en="${e.degreeEn}">${e.degree}</p>
          </div>
          <p class="experience-period">${e.period}</p>
        </article>
      `).join('');

      const languagesHTML = data.languages.map(l => `
        <div class="language-row">
          <span class="language-name" data-es="${l.name}" data-en="${l.nameEn}">${l.name}</span>
          <span class="language-level" data-es="${l.level}" data-en="${l.levelEn}">${l.level}</span>
        </div>
      `).join('');

      const html = `
        <section class="about-hero">
          <div class="container container-narrow">
            <h1 class="about-title" data-es="${data.title}" data-en="${data.titleEn}">${data.title}</h1>
            ${introHTML}
          </div>
        </section>
        <section class="about-section">
          <div class="container container-narrow">
            <h2 class="about-section-title" data-es="${data.achievementsTitle}" data-en="${data.achievementsTitleEn}">${data.achievementsTitle}</h2>
            <ul class="achievements-list">${achievementsHTML}</ul>
          </div>
        </section>
        <hr class="about-divider" />
        <section class="about-section">
          <div class="container container-narrow">
            <h2 class="about-section-title" data-es="${data.competenciesTitle}" data-en="${data.competenciesTitleEn}">${data.competenciesTitle}</h2>
            <div class="competencies-grid">${competenciesHTML}</div>
          </div>
        </section>
        <hr class="about-divider" />
        <section class="about-section">
          <div class="container container-narrow">
            <h2 class="about-section-title" data-es="${data.experienceTitle}" data-en="${data.experienceTitleEn}">${data.experienceTitle}</h2>
            <div class="experience-list">${experienceHTML}</div>
          </div>
        </section>
        <hr class="about-divider" />
        <section class="about-section">
          <div class="container container-narrow">
            <h2 class="about-section-title" data-es="${data.softwareTitle}" data-en="${data.softwareTitleEn}">${data.softwareTitle}</h2>
            <div class="software-tags">${softwareHTML}</div>
          </div>
        </section>
        <hr class="about-divider" />
        <section class="about-section">
          <div class="container container-narrow">
            <h2 class="about-section-title" data-es="${data.educationTitle}" data-en="${data.educationTitleEn}">${data.educationTitle}</h2>
            <div class="experience-list">${educationHTML}</div>
          </div>
        </section>
        <hr class="about-divider" />
        <section class="about-section about-footer">
          <div class="container container-narrow">
            <div class="about-footer-grid">
              <div class="about-footer-block">
                <h2 class="about-section-title" data-es="${data.languagesTitle}" data-en="${data.languagesTitleEn}">${data.languagesTitle}</h2>
                <div class="languages-list">${languagesHTML}</div>
              </div>
              <div class="about-footer-block">
                <h2 class="about-section-title" data-es="${data.contactTitle}" data-en="${data.contactTitleEn}">${data.contactTitle}</h2>
                <ul class="contact-list">
                  <li><span class="contact-icon" aria-hidden="true">📍</span><span>${data.contact.location}</span></li>
                  <li><span class="contact-icon" aria-hidden="true">✉️</span><a href="mailto:${data.contact.email}">${data.contact.email}</a></li>
                  <li><span class="contact-icon" aria-hidden="true">🌐</span><a href="${data.contact.behanceUrl}" target="_blank" rel="noopener noreferrer">${data.contact.behance}</a></li>
                  <li><span class="contact-icon" aria-hidden="true">📞</span><a href="tel:${data.contact.phone.replace(/ /g, '')}">${data.contact.phone}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      `;

      app.innerHTML = html;
      Router.applyLanguage();
      if (typeof Interactions !== 'undefined') Interactions.bindAll();

    } catch (error) {
      console.error('Error loading about:', error);
      app.innerHTML = `<div class="error">Error cargando la página About</div>`;
    }
  },

  toggleLanguage: () => {
    const newLang = Router.currentLang === 'es' ? 'en' : 'es';
    Router.setLanguage(newLang);
  },

  setLanguage: (lang) => {
    Router.currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    Router.applyLanguage();
  },

  applyLanguage: () => {
    const lang = Router.currentLang;
    const attr = lang === 'es' ? 'data-es' : 'data-en';

    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      const text = el.getAttribute(attr);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = text;
        } else {
          el.textContent = text;
        }
      }
    });
  },

  updateActiveNav: () => {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if ((Router.currentPage === 'home' && link.dataset.page === 'home') ||
          (link.dataset.page === Router.currentPage)) {
        link.classList.add('active');
      }
    });
  }
};