import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { home, useLang, usePick, useTheme, useUI } from './lib.jsx';

/* ── Íconos (trazo, decorativos) ─────────────────────────────────────────── */
export const Arrow = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
);
export const ArrowOut = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 11L12 4M6 4h6v6" /></svg>
);
export const Check = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
);
export const Cross = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
);
const Chevron = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
);
const Moon = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M13.5 9.5A5.5 5.5 0 016.5 2.5a5.5 5.5 0 107 7z" /></svg>
);
const Sun = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8" cy="8" r="3" /><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1" /></svg>
);

/* ── Estructura de página ────────────────────────────────────────────────── */
export function Layout({ children }) {
  const ui = useUI();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <a href="#contenido" className="absolute left-4 -top-20 z-[60] rounded bg-ink px-4 py-3 font-semibold text-paper no-underline focus:top-3">{ui.skip}</a>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">{children}</main>
      <SiteFooter upButton={<a href="#top" aria-label={ui.up}
        className="fixed bottom-4 right-4 z-40 grid h-[52px] w-[52px] place-items-center rounded-full bg-acc text-onacc shadow-[0_12px_24px_-10px_rgba(21,24,29,.5)] transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:right-7">
        <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 20V5M6 11l6-6 6 6" /></svg>
      </a>} />

    </>
  );
}

function Header() {
  const ui = useUI();
  const { lang, setLang } = useLang();
  const { dark, toggle } = useTheme();
  const navCls = ({ isActive }) =>
    `inline-flex min-h-[44px] items-center text-[15px] font-medium no-underline bg-no-repeat transition-[background-size] duration-300 ease-out2 [background-image:linear-gradient(rgb(var(--acc)),rgb(var(--acc)))] [background-position:0_calc(100%-8px)] ${
      isActive ? 'text-acctext [background-size:100%_2px]' : '[background-size:0_2px] hover:[background-size:100%_2px]'}`;
  return (
    <header id="top" className="sticky top-0 z-30 border-b border-line bg-head">
      <div className="wrap flex min-h-[64px] flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3 md:py-0">
        <Link to="/" className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 no-underline">
          <span className="text-[17px] font-bold tracking-[-.01em]">Diego Lavandero</span>
          <span className="cap">Senior AI Product Designer</span>
        </Link>
        <nav aria-label={ui.nav} className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <NavLink to="/" end className={navCls}>{ui.projects}</NavLink>
          <NavLink to="/about" className={navCls}>{ui.about}</NavLink>
          <div role="group" aria-label={ui.langGroup} className="inline-flex gap-0.5 rounded-full border border-line p-0.5">
            {['es', 'en'].map((l) => (
              <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}
                className={`min-h-[36px] min-w-[44px] rounded-full font-mono text-xs font-medium tracking-[.06em] transition-colors ${lang === l ? 'bg-acc text-onacc' : 'text-ink2 hover:text-ink'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" onClick={toggle} aria-pressed={dark} aria-label={ui.themeDark}
            className="grid h-9 w-11 place-items-center rounded-full border border-line text-ink2 transition-colors hover:text-ink">
            {dark ? <Sun /> : <Moon />}
          </button>
        </nav>
      </div>
      <div className="progress-bar absolute inset-x-0 -bottom-px h-0.5 bg-acc" aria-hidden="true" />
    </header>
  );
}

function SiteFooter({ upButton }) {
  const ui = useUI();
  const pick = usePick();
  const b = home.buildNote;
  const { lang } = useLang();
  return (
    <footer className="wrap">
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8 border-t border-ink pb-28 pt-12">
        <div className="max-w-[46ch]">
          <p className="cap text-ink">{ui.builtTitle}</p>
          <p className="mb-3 mt-2.5 text-[15px] leading-relaxed text-ink2">{lang === 'en' ? b.en : b.es}</p>
          <a href={b.url} className="link-u inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold">{pick(b, 'cta')}<ArrowOut /></a>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[15px] font-semibold">
          <li><a className="link-u inline-flex min-h-[44px] items-center" href="mailto:dlavand@gmail.com">dlavand@gmail.com</a></li>
          <li><a className="link-u inline-flex min-h-[44px] items-center gap-1.5" href="https://www.linkedin.com/in/diegolavandero/">LinkedIn<ArrowOut /></a></li>
          <li><a className="link-u inline-flex min-h-[44px] items-center gap-1.5" href="https://behance.net/dlavand0ce0">Behance<ArrowOut /></a></li>
        </ul>
      </div>
      {upButton}
    </footer>
  );
}

/** Tamaño de título que cabe en una línea según su largo (aprox. 0,56 em por carácter). */
export const fitTitle = (text, maxPx, widthPx, minPx) => {
  const px = Math.max(minPx, Math.min(maxPx, Math.floor(widthPx / (Math.max(String(text).length, 1) * 0.56))));
  return `clamp(${minPx}px, ${((px / 1200) * 100).toFixed(2)}vw, ${px}px)`;
};

/* ── Piezas compartidas ──────────────────────────────────────────────────── */
export function ChapterHead({ id, num, word, sub }) {
  return (
    <div className="mb-12 flex flex-wrap items-baseline gap-x-5 gap-y-3 md:mb-16">
      <span className="eyebrow-no">{num}</span>
      <h2 id={id} className="rise m-0 whitespace-nowrap text-[clamp(38px,4.2vw,58px)] font-extrabold leading-none tracking-[-.04em] text-acctext">{word}</h2>
      {sub && <p className="m-0 max-w-[34ch] text-[17px] leading-normal text-ink2 md:ml-auto md:text-right md:text-[19px]">{sub}</p>}
    </div>
  );
}

export function Fields({ items }) {
  return (
    <dl className="m-0 flex w-fit max-w-full flex-wrap rounded-sm border border-line bg-card">
      {items.map((f, i) => (
        <div key={i} className="flex min-w-0 flex-col gap-1 border-line px-3.5 py-2 [&:not(:last-child)]:border-r">
          <dt className="cap text-[10px]">{f.label}</dt>
          <dd className="m-0 font-mono text-[13px] font-medium">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Matriz de puntos k de n, con el conteo como texto (los puntos van ocultos al lector). */
export function Count({ k, n, label }) {
  const ui = useUI();
  const cols = n > 30 ? 19 : 15;
  return (
    <div>
      <div aria-hidden="true" className="grid gap-[5px]" style={{ gridTemplateColumns: `repeat(${cols}, 11px)` }}>
        {Array.from({ length: n }, (_, i) => <span key={i} className={`dot${i < k ? ' on' : ''}`} />)}
      </div>
      <p className="mt-2 text-[15px] leading-snug text-ink2"><strong className="text-[17px] text-ink">{k} {ui.of} {n}</strong> {label}</p>
    </div>
  );
}

/** Cifra “antes → después” con unidad más pequeña; nunca se parte en dos líneas. */
export function Metric({ metric, size = 'lg' }) {
  const parts = String(metric || '').split('→').map((s) => s.trim());
  const last = parts[parts.length - 1];
  const m = last.match(/^([~≈<>≤≥+\-−]?[\d.,]+(?:[–-][\d.,]+)?(?:\s?[%×x])?)\s*(.*)$/);
  const toNum = m ? m[1] : last;
  const unit = m ? m[2] : '';
  const big = size === 'lg' ? 'text-[clamp(34px,3.4vw,48px)]' : 'text-[clamp(30px,2.8vw,40px)]';
  return (
    <p className="m-0 flex items-baseline gap-2.5 whitespace-nowrap tabular-nums">
      {parts.length > 1 && (<><span className="text-[22px] font-semibold text-muted">{parts[0]}</span><span className="text-xl text-muted" aria-hidden="true">→</span></>)}
      <span className={`${big} font-extrabold leading-none tracking-[-.04em]`}>{toNum}{unit && <span className="ml-2 text-[.42em] font-bold tracking-[-.01em]">{unit}</span>}</span>
    </p>
  );
}

export function Disclosure({ title, children }) {
  return (
    <details className="group/d border-b border-line border-t border-t-ink">
      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold hover:text-acctext [&::-webkit-details-marker]:hidden">
        {title}<Chevron className="h-[18px] w-[18px] transition-transform group-open/d:rotate-180" />
      </summary>
      <div className="pb-6 pt-1">{children}</div>
    </details>
  );
}

/** Imagen sobre un círculo contenido dentro de su propio marco (nunca bajo texto). */
export function Media({ src, alt, device = 'desktop', accent = false, caption }) {
  const isMob = device === 'mobile';
  return (
    <figure className="m-0 min-w-0">
      <div className="relative py-7 md:py-10">
        <span aria-hidden="true" className={`blob top-1/2 -translate-y-1/2 ${accent ? 'bg-acc' : 'bg-soft'} ${isMob ? 'left-1/2 w-[min(80%,420px)] -translate-x-1/2' : 'left-0 w-[min(55%,360px)]'}`} />
        {isMob ? (
          <div className="relative mx-auto w-[min(230px,62%)] overflow-hidden rounded-[34px] border-[9px] border-[#15181D] bg-[#15181D] shadow-[0_30px_60px_-30px_rgba(21,24,29,.55)]">
            <img src={src} alt={alt} loading="lazy" className="block aspect-[9/19.5] w-full object-cover object-top" />
          </div>
        ) : (
          <img src={src} alt={alt} loading="lazy" className="relative block aspect-video w-full rounded-lg border border-line object-cover object-left-top shadow-[0_30px_60px_-30px_rgba(21,24,29,.45)]" />
        )}
      </div>
      {caption && <figcaption className="border-t border-line pt-3 text-[13px] leading-normal text-ink2">{caption}</figcaption>}
    </figure>
  );
}

/** Lista con viñeta en acento. */
export function Bullets({ items }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((x, i) => (
        <li key={i} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-base leading-relaxed text-ink2">
          <span aria-hidden="true" className="mt-[9px] h-2 w-2 rounded-full bg-acc" /><span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setCopied(false); }
  };
  return [copied, copy];
}
