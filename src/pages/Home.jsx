import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { content, home, img, splitParen, stopNumber, useLang, usePick, useUI } from '../lib.jsx';
import { Arrow, HeroStage, Metric, fitTitle } from '../ui.jsx';

export default function Home() {
  const ui = useUI();
  const pick = usePick();
  const { lang } = useLang();
  const [device, setDevice] = useState('all');
  const [protoOnly, setProtoOnly] = useState(false);

  const projects = home.projects;
  const counts = useMemo(() => ({
    desktop: projects.filter((p) => p.device === 'desktop').length,
    mobile: projects.filter((p) => p.device === 'mobile').length,
    proto: projects.filter((p) => p.prototype).length
  }), [projects]);
  const isOn = (p) => (device === 'all' || p.device === device) && (!protoOnly || p.prototype);
  const shown = projects.filter(isOn).length;
  const pad = (n) => String(n).padStart(2, '0');
  const f = home.featured;
  const featuredData = content[f.slug];

  const FilterBtn = ({ pressed, onClick, no, children, count }) => (
    <button type="button" aria-pressed={pressed} onClick={onClick}
      className={`inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-medium underline decoration-2 underline-offset-8 transition-colors ${pressed ? 'text-ink decoration-acc dark:decoration-acctext' : 'text-ink2 decoration-transparent hover:text-ink'}`}>
      {no && <span className="text-acctext">{no}</span>}{children} <span>{pad(count)}</span>
    </button>
  );

  return (
    <>
      {/* Hero: dos líneas fijas (cada una sin partirse en escritorio) */}
      <section className="wrap py-16 md:py-24">
        <p className="cap m-0">{ui.kicker}</p>
        {(() => {
          const a = pick(home.hero, 'titleStart').trim(), b = pick(home.hero, 'titleAccent').trim();
          const size = fitTitle(a.length > b.length ? a : b, 84, 1080, 38);
          return (
            <h1 className="mt-5 font-extrabold leading-[1.02] tracking-[-.045em]" style={{ fontSize: size }}>
              <span className="block lg:whitespace-nowrap">{a}</span>
              <span className="block text-acctext lg:whitespace-nowrap">{b}</span>
            </h1>
          );
        })()}
        <div className="mt-10 grid items-start gap-x-[72px] gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <p className="m-0 max-w-[52ch] text-[17px] leading-relaxed text-ink2 md:text-[19px]">{pick(home.hero, 'subtitle')}</p>
          <div className="relative">
            <span aria-hidden="true" className="blob right-0 top-1/2 w-[clamp(220px,28vw,400px)] -translate-y-1/2 bg-soft" />
            <aside aria-label={ui.sheet} className="relative rounded border border-line bg-card">
              <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-4">
                <span className="cap text-ink">{ui.sheet}</span><span className="cap">2023–2026</span>
              </div>
              <div className="px-5 pb-2 pt-2.5">
                {[[ui.stops, projects.length + 1], [ui.desktop, counts.desktop + 1], [ui.mobile, counts.mobile], [ui.protos, counts.proto]].map(([k, v]) => (
                  <p key={k} className="m-0 flex items-baseline gap-2 py-2.5">
                    <span className="font-mono text-[13px] text-ink2">{k}</span>
                    <span aria-hidden="true" className="flex-1 -translate-y-1 border-b border-dotted border-line" />
                    <span className="text-[28px] font-semibold tabular-nums tracking-[-.03em]">{pad(v)}</span>
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Destacado: misma estructura que el hero de un caso */}
      <article aria-labelledby="feat-t" className="group relative border-y border-line bg-card">
        <div className="wrap pb-8 pt-12">
          <p className="cap m-0"><span className="text-acctext">{ui.stop} 00 · {ui.featured}</span> · {pick(f, 'eyebrow').replace(/^DESTACADO · |^FEATURED · /, '')}</p>
          <h2 id="feat-t" className="mt-4 text-[clamp(32px,3.6vw,52px)] font-extrabold leading-[1.02] tracking-[-.04em] text-acctext lg:whitespace-nowrap">
            <Link to={`/${f.slug}`} className="no-underline after:absolute after:inset-0 after:z-[2] after:content-['']">{pick(f, 'title')}</Link>
          </h2>
        </div>
        <HeroStage src={img(f.image)} alt={`${ui.stop} 00: ${pick(f, 'title')}`} zoom>
          <p className="m-0 max-w-[32ch] text-[19px] font-semibold leading-snug">{pick(f, 'subtitle')}</p>
          <div><Metric metric={f.metric} /><p className="mt-1.5 text-base font-semibold">{pick(f, 'metricLabel')}</p></div>
          {featuredData?.hero && <p className="m-0 max-w-[46ch] text-[15px] leading-relaxed text-ink2">{pick(featuredData.hero, 'description')}</p>}
          <span aria-hidden="true" className="link-u inline-flex w-fit items-center gap-2.5 text-[15px] font-bold">{pick(f, 'cta')}<Arrow /></span>
        </HeroStage>
      </article>

      {/* Filtros: mismo lenguaje que el índice de capítulos del caso */}
      <nav aria-label={ui.filters} className="sticky top-[65px] z-20 border-b border-line bg-paper/95 backdrop-blur max-md:static">
        <div className="wrap flex min-h-[56px] flex-wrap items-center gap-x-7 gap-y-1">
          <FilterBtn no="01" pressed={device === 'all'} onClick={() => setDevice('all')} count={projects.length}>{ui.all}</FilterBtn>
          <FilterBtn no="02" pressed={device === 'desktop'} onClick={() => setDevice('desktop')} count={counts.desktop}>{ui.desktop}</FilterBtn>
          <FilterBtn no="03" pressed={device === 'mobile'} onClick={() => setDevice('mobile')} count={counts.mobile}>{ui.mobile}</FilterBtn>
          <button type="button" aria-pressed={protoOnly} onClick={() => setProtoOnly((v) => !v)}
            className={`inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-medium transition-colors ${protoOnly ? 'text-ink' : 'text-ink2 hover:text-ink'}`}>
            <span aria-hidden="true" className={`grid h-3.5 w-3.5 place-items-center rounded-[3px] border-[1.5px] ${protoOnly ? 'border-acc bg-acc text-onacc dark:border-acctext dark:bg-acctext dark:text-[#0F1115]' : 'border-current'}`}>
              {protoOnly && <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1.5 5.2l2.3 2.3L8.6 2.6" /></svg>}
            </span>
            {ui.protoOnly} <span>{pad(counts.proto)}</span>
          </button>
          <span className="cap w-full md:ml-auto md:w-auto" aria-live="polite">{ui.showing(pad(shown), pad(projects.length))}</span>
        </div>
      </nav>

      {/* Proyectos como paradas sobre la línea de tiempo */}
      <section aria-labelledby="ch-proyectos" className="wrap pb-6 pt-20 md:pt-28">
        <div className="mb-12 md:mb-16">
          <div className="flex items-baseline gap-5">
            <span className="eyebrow-no">01–{pad(projects.length)}</span>
            <h2 id="ch-proyectos" className="rise m-0 whitespace-nowrap text-[clamp(38px,4.2vw,58px)] font-extrabold leading-none tracking-[-.04em] text-acctext">{ui.chProjects}</h2>
          </div>
          <p className="mb-0 mt-6 max-w-[68ch] text-[17px] leading-relaxed text-ink2 md:text-lg">{ui.chProjectsSub}</p>
        </div>
        <ol className="tl m-0 list-none">
          {(() => {
            let seen = 0;
            return projects.map((p) => {
              const on = isOn(p);
              const flip = on && seen++ % 2 === 1; /* alterna solo entre los visibles */
              const lab = splitParen(pick(p, 'metricLabel') || (p.metrics && pick(p.metrics[0], 'label')) || '');
              const metric = p.metric || (p.metrics && p.metrics[0].value) || '';
              const href = p.externalUrl || `/${p.slug}`;
              const title = pick(p, 'title');
              const image = img(lang === 'en' && p.imageEn ? p.imageEn : p.image);
              const stretched = "no-underline transition-colors after:absolute after:inset-0 after:z-[2] after:content-[''] group-hover:text-acctext";
              return (
                <li key={p.slug} hidden={!on} className="node group border-t border-line py-12 before:top-[50px] md:py-14 md:before:top-[58px]">
                  <article aria-labelledby={`t-${p.slug}`} className="relative">
                    <p className="cap m-0"><span className="text-acctext">{ui.stop} {stopNumber(p.slug)}</span> · {pick(p, 'eyebrow')}</p>
                    <h3 id={`t-${p.slug}`} className="mt-3 text-[clamp(26px,2.6vw,36px)] font-extrabold leading-[1.1] tracking-[-.03em] lg:whitespace-nowrap">
                      {p.externalUrl ? <a href={href} className={stretched}>{title}</a> : <Link to={href} className={stretched}>{title}</Link>}
                    </h3>
                    <div className="mt-6 grid items-center gap-x-16 gap-y-6 lg:grid-cols-2">
                      <div className="flex flex-col items-start gap-4">
                        <p className="m-0 max-w-[42ch] text-[17px] leading-relaxed text-ink2">{pick(p, 'subtitle')}</p>
                        {metric && (
                          <div className="flex flex-col gap-1.5">
                            <Metric metric={metric} />
                            <p className="m-0 max-w-[34ch] text-base font-semibold leading-snug">{lab.main}</p>
                            {lab.ev && <span className="mt-1 w-fit rounded-sm border border-dashed border-ink2 px-2 py-1 font-mono text-xs text-ink2">{lab.ev}</span>}
                          </div>
                        )}
                        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
                          <span aria-hidden="true" className="link-u inline-flex items-center gap-2.5 text-[15px] font-bold">{pick(home.ctaLabels, 'viewProject')}<Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                          {p.prototype && <span className="inline-flex -rotate-3 rounded-sm border-2 border-current px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[.12em] text-acctext outline outline-1 outline-offset-2 outline-current">{ui.stamp}</span>}
                        </div>
                      </div>
                      <div className={flip ? 'lg:order-first' : ''}>
                        <MediaThumb src={image} alt={title} device={p.device} flip={flip} />
                      </div>
                    </div>
                  </article>
                </li>
              );
            });
          })()}
        </ol>
      </section>
    </>
  );
}

function MediaThumb({ src, alt, device, flip }) {
  const isMob = device === 'mobile';
  return (
    <div className="relative py-7" aria-hidden="false">
      <span aria-hidden="true" className={`blob top-1/2 -translate-y-1/2 ${isMob ? 'left-1/2 w-[min(80%,420px)] -translate-x-1/2 bg-acc' : `${flip ? 'right-0' : 'left-0'} w-[min(55%,360px)] bg-soft`}`} />
      {isMob ? (
        <div className="relative mx-auto w-[min(230px,62%)] overflow-hidden rounded-[34px] border-[9px] border-[#15181D] bg-[#15181D] shadow-[0_30px_60px_-30px_rgba(21,24,29,.55)] transition-transform duration-500 ease-out2 group-hover:-translate-y-1.5">
          <img src={src} alt="" loading="lazy" className="block aspect-[9/19.5] w-full object-cover object-top" />
        </div>
      ) : (
        <img src={src} alt="" loading="lazy" className="relative block aspect-video w-full rounded-lg border border-line object-cover object-left-top shadow-[0_30px_60px_-30px_rgba(21,24,29,.45)] transition-transform duration-500 ease-out2 group-hover:-translate-y-1.5" />
      )}
    </div>
  );
}
