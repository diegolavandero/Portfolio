import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/* ── Contenido: los JSON de src/content son la fuente de verdad ───────────── */
const files = import.meta.glob('./content/*.json', { eager: true, import: 'default' });
export const content = Object.fromEntries(
  Object.entries(files).map(([path, data]) => [path.split('/').pop().replace('.json', ''), data])
);
export const home = content.home;
export const about = content.about;

/** Orden del recorrido: destacado (parada 00) y luego el orden del home. */
export const route = [home.featured.slug, ...home.projects.map((p) => p.slug)];
export const caseSlugs = route.filter((s) => content[s] && !content[s].hidden);
export const stopNumber = (slug) => String(route.indexOf(slug)).padStart(2, '0');

/** Ruta de imagen del JSON ("data/images/x.webp") a ruta absoluta servida desde /public. */
export const img = (src) => (!src ? '' : /^(https?:)?\//.test(src) ? src : '/' + src);

/* ── Idioma ──────────────────────────────────────────────────────────────── */
const LangCtx = createContext({ lang: 'es', setLang: () => {} });
const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } };

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => (read('lang') === 'en' ? 'en' : 'es'));
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l) => { setLangState(l); write('lang', l); }, []);
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}
export const useLang = () => useContext(LangCtx);

/** Devuelve obj[key] en español u obj[key+'En'] en inglés (con respaldo al español). */
export function usePick() {
  const { lang } = useLang();
  return useCallback(
    (obj, key) => {
      if (!obj) return undefined;
      if (lang === 'en') {
        const en = obj[key + 'En'];
        if (en !== undefined && en !== null && en !== '') return en;
      }
      return obj[key];
    },
    [lang]
  );
}

/** Para elementos con forma { es, en } (About). */
export const bi = (o, lang) => (o && typeof o === 'object' ? (lang === 'en' ? o.en || o.es : o.es) : o);

/* ── Tema ────────────────────────────────────────────────────────────────── */
const ThemeCtx = createContext({ dark: false, toggle: () => {} });
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  const toggle = useCallback(() => setDark((d) => { write('theme', d ? 'light' : 'dark'); return !d; }), []);
  return <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);

/* ── Textos de interfaz ──────────────────────────────────────────────────── */
export const UI = {
  es: {
    skip: 'Saltar al contenido', nav: 'Principal', projects: 'Proyectos', about: 'Sobre mí', langGroup: 'Idioma',
    themeDark: 'Tema noche', themeLight: 'Tema día', up: 'Volver arriba',
    kicker: 'Portafolio · 2023–2026', sheet: 'Hoja de ruta', stops: 'Paradas', desktop: 'Escritorio', mobile: 'Móvil',
    protos: 'Prototipos navegables', featured: 'Destacado', stop: 'Parada', viewProject: 'Ver proyecto',
    viewCase: 'Ver caso de estudio', stamp: 'Prototipo navegable', filters: 'Filtrar proyectos', all: 'Todas',
    protoOnly: 'Solo prototipos navegables', showing: (n, t) => `Mostrando ${n} de ${t} proyectos`,
    chProjects: 'Proyectos', chProjectsSub: 'Ocho paradas de logística, IA y retail, en orden de recorrido.',
    endRoute: 'Fin de ruta', builtTitle: 'Cómo está hecho', chapters: 'Capítulos del caso',
    ch: { understand: 'Entender', research: 'Investigar', design: 'Diseñar', measure: 'Medir', learn: 'Aprender' },
    chSub: {
      understand: 'El problema, quiénes lo viven y qué cuenta como éxito.',
      research: 'Cómo se investigó y qué se encontró.',
      design: 'Las decisiones de diseño y por qué.',
      measure: 'Resultados contra el criterio de éxito.',
      learn: 'Lo que se confirmó y lo que viene.'
    },
    goals: 'Metas', goal: 'Meta', successCrit: 'Criterio de éxito', kpi: 'KPI', finding: 'Hallazgo',
    meets: 'Cumple el criterio de éxito', misses: 'No alcanza el criterio de éxito',
    baseline: 'Línea base', result: 'Resultado', howMeasured: 'Cómo se midió', nextStop: 'Siguiente parada',
    goalsPersona: 'Objetivos', pains: 'Dolores', behaviors: 'Comportamientos', persona: 'Persona',
    of: 'de', openProto: 'Ver código del prototipo', protoTitle: 'Prototipo interactivo de', backHome: 'Volver a proyectos',
    notFoundTitle: 'Esta parada no existe', notFoundText: 'La página que buscas no está en la ruta.', stage: 'Etapa',
    context: 'Contexto', learnings: 'Aprendizajes', nextSteps: 'Próximos pasos', principles: 'Principios de diseño', decisions: 'Decisiones clave',
    problem: 'Problema', solution: 'Solución', from: 'de', to: 'a', email: 'Correo', location: 'Ubicación', copy: 'Copiar', copied: 'Copiado'
  },
  en: {
    skip: 'Skip to content', nav: 'Main', projects: 'Projects', about: 'About me', langGroup: 'Language',
    themeDark: 'Night theme', themeLight: 'Day theme', up: 'Back to top',
    kicker: 'Portfolio · 2023–2026', sheet: 'Route sheet', stops: 'Stops', desktop: 'Desktop', mobile: 'Mobile',
    protos: 'Clickable prototypes', featured: 'Featured', stop: 'Stop', viewProject: 'View project',
    viewCase: 'View case study', stamp: 'Clickable prototype', filters: 'Filter projects', all: 'All',
    protoOnly: 'Clickable prototypes only', showing: (n, t) => `Showing ${n} of ${t} projects`,
    chProjects: 'Projects', chProjectsSub: 'Eight stops across logistics, AI and retail, in route order.',
    endRoute: 'End of route', builtTitle: 'How it’s built', chapters: 'Case chapters',
    ch: { understand: 'Understand', research: 'Research', design: 'Design', measure: 'Measure', learn: 'Learn' },
    chSub: {
      understand: 'The problem, who lives it and what counts as success.',
      research: 'How it was researched and what was found.',
      design: 'The design decisions and why.',
      measure: 'Results against the success criteria.',
      learn: 'What was confirmed and what comes next.'
    },
    goals: 'Goals', goal: 'Goal', successCrit: 'Success criterion', kpi: 'KPI', finding: 'Finding',
    meets: 'Meets the success criterion', misses: 'Misses the success criterion',
    baseline: 'Baseline', result: 'Result', howMeasured: 'How it was measured', nextStop: 'Next stop',
    goalsPersona: 'Goals', pains: 'Pain points', behaviors: 'Behaviors', persona: 'Persona',
    of: 'of', openProto: 'View prototype source', protoTitle: 'Interactive prototype of', backHome: 'Back to projects',
    notFoundTitle: 'This stop doesn’t exist', notFoundText: 'The page you’re looking for isn’t on the route.', stage: 'Stage',
    context: 'Context', learnings: 'Learnings', nextSteps: 'Next steps', principles: 'Design principles', decisions: 'Key decisions',
    problem: 'Problem', solution: 'Solution', from: 'from', to: 'to', email: 'Email', location: 'Location', copy: 'Copy', copied: 'Copied'
  }
};
export const useUI = () => UI[useLang().lang];

/** Separa "etiqueta (evidencia)" → { main, ev } */
export const splitParen = (label = '') => {
  const m = String(label).match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m ? { main: m[1], ev: m[2] } : { main: label, ev: '' };
};
/** Separa "Etiqueta (criterio de éxito: X)" → { main, crit } */
export const splitCrit = (label = '') => {
  const m = String(label).match(/^(.*?)\s*\((?:criterio de éxito|success criterion):\s*([^)]+)\)\s*$/i);
  return m ? { main: m[1], crit: m[2] } : { main: label, crit: '' };
};
/** "8,4 → 6,9 min" → { from: "8,4", toNum: "6,9", unit: "min" } */
export const splitMetric = (metric = '') => {
  const parts = String(metric).split('→').map((s) => s.trim());
  const last = parts[parts.length - 1] || '';
  const m = last.match(/^([~≈<>≤≥+\-−]?[\d.,]+(?:\s?[%×x])?)\s*(.*)$/);
  return {
    from: parts.length > 1 ? parts[0] : '',
    toNum: m ? m[1] : last,
    unit: m ? m[2] : ''
  };
};
