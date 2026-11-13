import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { content, img, route, splitCrit, splitParen, stopNumber, useLang, usePick, useUI } from '../lib.jsx';
import NotFound from './NotFound.jsx';
import { Arrow, ArrowOut, Bullets, ChapterHead, Check, Count, Cross, Disclosure, Fields, HeroStage, Media, Metric, fitTitle } from '../ui.jsx';

export default function Case() {
  const { slug } = useParams();
  const d = content[slug];
  const ui = useUI();
  const pick = usePick();
  if (!d || d.hidden || !route.includes(slug) || slug === 'home' || slug === 'about') return <NotFound />;

  const r = d.results || {};
  const hasUnderstand = d.problemAndObjectives || d.personas || d.journeyMap;
  const hasResearch = d.uxResearch || d.quantitativeAnalysis || d.abTesting || d.taskAnalysis || d.treeTesting || d.cardSorting;
  const hasDesign = d.solution || d.livePrototype || d.designs;
  const hasMeasure = (r.impact || []).length > 0;
  const hasLearn = (r.learnings || []).length > 0 || (r.nextSteps || []).length > 0;
  const chapters = [
    hasUnderstand && ['understand', 'entender'],
    hasResearch && ['research', 'investigar'],
    hasDesign && ['design', 'disenar'],
    hasMeasure && ['measure', 'medir'],
    hasLearn && ['learn', 'aprender']
  ].filter(Boolean).map(([k, id], i) => ({ k, id, num: String(i + 1).padStart(2, '0') }));
  const chap = (k) => chapters.find((c) => c.k === k);

  return (
    <article aria-labelledby="case-title">
      <CaseHero d={d} slug={slug} />
      <nav aria-label={ui.chapters} className="sticky top-[65px] z-20 border-b border-line bg-paper/95 backdrop-blur max-md:static">
        <ol className="wrap mx-auto my-0 flex min-h-[52px] list-none flex-wrap items-center gap-x-8 gap-y-0 py-1">
          {chapters.map((c) => (
            <li key={c.id}><a href={`#${c.id}`} className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-medium text-ink2 no-underline hover:text-ink">
              <span className="text-acctext">{c.num}</span>{ui.ch[c.k]}</a></li>
          ))}
        </ol>
      </nav>

      {hasUnderstand && (
        <section id="entender" aria-labelledby="h-entender" className="wrap pb-6 pt-24 md:pt-28">
          <ChapterHead id="h-entender" num={chap('understand').num} word={ui.ch.understand} sub={pick(d.problemAndObjectives, 'subtitle') || ui.chSub.understand} fallback={ui.chSub.understand} />
          {d.problemAndObjectives && <Problem p={d.problemAndObjectives} />}
          {d.personas && <Personas p={d.personas} />}
          {d.journeyMap && <Journey j={d.journeyMap} />}
        </section>
      )}

      {hasResearch && (
        <section id="investigar" aria-labelledby="h-investigar" className="wrap pb-6 pt-24 md:pt-28">
          <ChapterHead id="h-investigar" num={chap('research').num} word={ui.ch.research} sub={pick(d.uxResearch, 'subtitle') || ui.chSub.research} fallback={ui.chSub.research} />
          {d.uxResearch && <Research u={d.uxResearch} />}
          {d.quantitativeAnalysis && <Quantitative q={d.quantitativeAnalysis} />}
          {d.abTesting && <Preference a={d.abTesting} />}
          {d.taskAnalysis && <Tasks t={d.taskAnalysis} />}
          {d.treeTesting && <Tree t={d.treeTesting} />}
          {d.cardSorting && <Sorting c={d.cardSorting} />}
        </section>
      )}

      {hasDesign && (
        <section id="disenar" aria-labelledby="h-disenar" className="wrap pb-6 pt-24 md:pt-28">
          <ChapterHead id="h-disenar" num={chap('design').num} word={ui.ch.design} sub={pick(d.solution, 'subtitle') || ui.chSub.design} fallback={ui.chSub.design} />
          {d.solution && <Solution s={d.solution} />}
          {d.livePrototype && <LivePrototype p={d.livePrototype} title={pick(d, 'title')} />}
          {d.designs && <Designs g={d.designs} />}
        </section>
      )}

      {hasMeasure && (
        <section id="medir" aria-labelledby="h-medir" className="wrap pb-6 pt-24 md:pt-28">
          <ChapterHead id="h-medir" num={chap('measure').num} word={ui.ch.measure} sub={pick(r, 'subtitle') || ui.chSub.measure} fallback={ui.chSub.measure} noteLabel={ui.howMeasured} />
          <Results r={r} />
        </section>
      )}

      {hasLearn && (
        <section id="aprender" aria-labelledby="h-aprender" className="wrap pb-6 pt-24 md:pt-28">
          <ChapterHead id="h-aprender" num={chap('learn').num} word={ui.ch.learn} sub={ui.chSub.learn} />
          <Learn r={r} />
        </section>
      )}

      {d.cta && <NextStop cta={d.cta} />}
    </article>
  );
}

/* ── Hero del caso ───────────────────────────────────────────────────────── */
function CaseHero({ d, slug }) {
  const ui = useUI();
  const pick = usePick();
  const h = d.hero || {};
  const title = `${(pick(h, 'title') || pick(d, 'title') || '').trim()}`;
  const accent = (pick(h, 'titleAccent') || '').trim();
  const full = accent ? `${title} ${accent}` : title;
  const heroSrc = d.heroImage?.src || d.designs?.items?.[0]?.src || d.designs?.items?.[0]?.srcs?.[0];
  const specs = (d.projectSpecs || []).map((s) => ({ label: pick(s, 'label'), value: pick(s, 'value') }));
  return (
    <header className="border-b border-line bg-card">
      <div className="wrap pb-10 pt-12 md:pt-16">
        <p className="cap m-0"><span className="text-acctext">{ui.stop} {stopNumber(slug)}</span> · {pick(h, 'tagline')}</p>
        <h1 id="case-title" className="mt-4 font-extrabold leading-[1] tracking-[-.045em] text-acctext lg:whitespace-nowrap" style={{ fontSize: fitTitle(full, 76, 1080, 34) }}>
          {title}{accent && <span className="text-ink"> {accent}</span>}
        </h1>
        {pick(h, 'subtitle') && <p className="mt-5 max-w-[48ch] text-[19px] font-semibold leading-snug md:text-[21px]">{pick(h, 'subtitle')}</p>}
      </div>
      <HeroStage src={heroSrc && img(heroSrc)} alt={pick(d.heroImage || {}, 'placeholder') || title}>
        {pick(h, 'description') && <p className="m-0 max-w-[48ch] text-base leading-relaxed text-ink2">{pick(h, 'description')}</p>}
        {specs.length > 0 && <Fields items={specs} grid />}
      </HeroStage>
    </header>
  );
}

/* ── 01 Entender ─────────────────────────────────────────────────────────── */
function Problem({ p }) {
  const ui = useUI();
  const pick = usePick();
  const products = p.products || [];
  const competitors = p.competitors || [];
  const objectives = p.objectives || [];
  return (
    <>
      {(products.length > 0 || competitors.length > 0) && (
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="tl flex flex-col gap-12">
            {pick(p, 'problemTitle') && (
              <div className="node">
                <h3 className="m-0 text-[22px] font-bold leading-tight text-acctext">{pick(p, 'problemTitle')}</h3>
                {pick(p, 'problemIntro') && <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-ink2">{pick(p, 'problemIntro')}</p>}
              </div>
            )}
            {products.map((x, i) => (
              <div key={i} className="node">
                <h3 className="m-0 mb-3 text-[22px] font-bold leading-tight text-acctext">{pick(x, 'name')}</h3>
                {(pick(x, 'cons') || []).length > 0 && <Bullets items={pick(x, 'cons')} />}
                {(pick(x, 'pros') || []).length > 0 && (
                  <ul className="mt-4 flex list-none flex-col gap-2 p-0">
                    {pick(x, 'pros').map((t, j) => <li key={j} className="flex gap-2 text-base leading-relaxed text-ink2"><Check className="mt-1.5 h-4 w-4 flex-none text-ink" />{t}</li>)}
                  </ul>
                )}
              </div>
            ))}
            {competitors.map((x, i) => (
              <div key={`c${i}`} className="node">
                <h3 className="m-0 mb-2 text-[22px] font-bold leading-tight text-acctext">{pick(x, 'name')}</h3>
                <p className="m-0 max-w-[56ch] text-base leading-relaxed text-ink2">{pick(x, 'description')}</p>
              </div>
            ))}
          </div>
          {(pick(p, 'consequences') || []).length > 0 && (
            <div className="self-start rounded border border-line bg-card p-6">
              <p className="cap mb-4 text-ink">{pick(p, 'consequencesLabel')}</p>
              <Bullets items={pick(p, 'consequences')} />
            </div>
          )}
        </div>
      )}

      {objectives.length > 0 && (
        <div className="mt-20">
          <h3 className="cap mb-6 text-ink">{pick(p, 'objectivesTitle') || ui.goals}</h3>
          <ol className="m-0 list-none border-t-[3px] border-acc p-0">
            {objectives.map((o, i) => (
              <li key={i} className="grid gap-x-8 gap-y-3 border-b border-line py-7 md:grid-cols-[56px_minmax(0,1fr)]">
                <span className="eyebrow-no">{o.number || String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="m-0 text-lg font-bold leading-snug">{pick(o, 'title')}</h4>
                  <div className="mt-3 grid gap-x-10 gap-y-3 md:grid-cols-2">
                    <div>
                      {pick(o, 'meta') && <p className="m-0 font-mono text-[13px] font-medium leading-normal text-acctext">{pick(o, 'meta')}</p>}
                      {pick(o, 'kpi') && <p className="mt-3 font-mono text-xs leading-relaxed text-ink2"><span className="text-ink">{ui.kpi} · </span>{pick(o, 'kpi')}</p>}
                    </div>
                    <p className="m-0 text-[15px] leading-relaxed text-ink2">{pick(o, 'description')}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function Avatar({ name, src, initials }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span aria-hidden="true" className="grid h-12 w-12 flex-none place-items-center rounded-full bg-acc text-[15px] font-bold text-onacc">{initials}</span>;
  return <img src={src} alt="" width="48" height="48" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="h-12 w-12 flex-none rounded-full border border-line bg-soft object-cover" />;
}

function Personas({ p }) {
  const ui = useUI();
  const pick = usePick();
  const items = p.items || [];
  const initials = (n = '') => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div className="mt-20">
      <h3 className="m-0 text-[clamp(26px,2.6vw,34px)] font-extrabold tracking-[-.03em]">{pick(p, 'title')}</h3>
      {pick(p, 'subtitle') && <p className="mt-2 text-base text-ink2">{pick(p, 'subtitle')}</p>}
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((x) => (
          <section key={x.id || x.name} aria-label={`${ui.persona}: ${x.name}`} className="flex flex-col gap-4 rounded border border-line bg-card p-6">
            <div className="flex items-center gap-4">
              <Avatar name={x.name} src={x.avatar} initials={initials(x.name)} />
              <div className="min-w-0">
                <h4 className="m-0 text-lg font-bold leading-tight">{x.name}</h4>
                <p className="m-0 text-sm text-ink2">{pick(x, 'role')}</p>
              </div>
            </div>
            {pick(x, 'quote') && <blockquote className="m-0 border-l-0 text-[15px] font-semibold leading-snug">“{pick(x, 'quote').replace(/^“|”$/g, '')}”</blockquote>}
            <Disclosure title={`${ui.goalsPersona}, ${ui.pains.toLowerCase()}, ${ui.behaviors.toLowerCase()}`}>
              {[['goals', ui.goalsPersona], ['painPoints', ui.pains], ['behaviors', ui.behaviors]].map(([k, label]) => (pick(x, k) || []).length > 0 && (
                <div key={k} className="mb-4">
                  <p className="cap mb-2 text-ink">{label}</p>
                  <Bullets items={pick(x, k)} />
                </div>
              ))}
            </Disclosure>
          </section>
        ))}
      </div>
    </div>
  );
}

function Journey({ j }) {
  const ui = useUI();
  const pick = usePick();
  return (
    <div className="mt-20">
      <h3 className="m-0 text-[clamp(26px,2.6vw,34px)] font-extrabold tracking-[-.03em]">{pick(j, 'title')}</h3>
      {pick(j, 'subtitle') && <p className="mt-2 text-base text-ink2">{pick(j, 'subtitle')}</p>}
      <ol className="mt-8 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
        {(j.stages || []).map((s, i) => (
          <li key={i} className="flex flex-col gap-3 rounded border border-line bg-card p-6">
            <p className="cap m-0"><span className="text-acctext">{ui.stage} {String(s.id || i + 1).padStart(2, '0')}</span></p>
            <h4 className="m-0 text-lg font-bold leading-tight">{pick(s, 'name')}</h4>
            <p className="m-0 flex gap-2 text-[15px] leading-relaxed text-ink2"><Cross className="mt-1 h-4 w-4 flex-none text-acctext" /><span><span className="sr-only">{ui.problem}: </span>{pick(s, 'problem')}</span></p>
            <p className="m-0 flex gap-2 text-[15px] leading-relaxed text-ink"><Check className="mt-1 h-4 w-4 flex-none" /><span><span className="sr-only">{ui.solution}: </span>{pick(s, 'solution')}</span></p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── 02 Investigar ───────────────────────────────────────────────────────── */
function Research({ u }) {
  const ui = useUI();
  const pick = usePick();
  const cards = u.methodCards || [];
  const stats = u.stats || [];
  const quotes = u.quotes || [];
  const [first, ...rest] = quotes;
  return (
    <>
      <div className={`grid gap-x-16 gap-y-12 ${stats.length ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : ''}`}>
        {cards.length > 0 && (
          <div className="tl flex flex-col gap-14">
            {cards.map((c, i) => (
              <div key={i} className="node">
                <h3 className="m-0 mb-3 text-[22px] font-bold leading-tight text-acctext">{pick(c, 'name')}</h3>
                <p className="m-0 max-w-[58ch] text-base leading-relaxed text-ink2">{pick(c, 'description')}</p>
                {(c.counts || []).length > 0 && (
                  <div className="mt-5 flex flex-col gap-5">{c.counts.map((n, j) => <Count key={j} k={n.k} n={n.n} label={pick(n, 'label')} />)}</div>
                )}
                {pick(c, 'finding') && (
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="cap mb-1.5">{pick(c, 'findingLabel') || ui.finding}</p>
                    <p className="m-0 max-w-[58ch] text-[15px] font-medium leading-relaxed">{pick(c, 'finding')}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {stats.length > 0 && (
          <div className="flex flex-col gap-4 self-start">
            {pick(u, 'quantitativeLabel') && <p className="cap m-0 text-ink">{pick(u, 'quantitativeLabel')}</p>}
            {stats.map((s, i) => (
              <div key={i} className="rounded border border-line bg-card p-6">
                <Metric metric={pick(s, 'value')} size="md" />
                <p className="mt-3 text-sm leading-relaxed text-ink2">{pick(s, 'description')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {first && (
        <figure className="mx-auto mt-20 grid max-w-[760px] grid-cols-[6px_minmax(0,1fr)] gap-7">
          <span aria-hidden="true" className="[background:radial-gradient(circle,rgb(var(--acc))_2.5px,transparent_3px)_0_0/6px_11px_repeat-y]" />
          <div>
            <blockquote className="m-0 text-[clamp(21px,2.2vw,28px)] font-semibold leading-snug tracking-[-.015em]">“{pick(first, 'text').replace(/^“|”$/g, '')}”</blockquote>
            <figcaption className="mt-4 text-[15px] font-semibold text-ink2">— {pick(first, 'author')}{pick(first, 'context') ? ` · ${pick(first, 'context')}` : ''}</figcaption>
          </div>
        </figure>
      )}
      {rest.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {rest.map((q, i) => (
            <figure key={i} className="m-0 rounded border border-line bg-card p-6">
              <blockquote className="m-0 text-base font-semibold leading-snug">“{pick(q, 'text').replace(/^“|”$/g, '')}”</blockquote>
              <figcaption className="mt-3 text-sm text-ink2">— {pick(q, 'author')}{pick(q, 'context') ? ` · ${pick(q, 'context')}` : ''}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}

function SubHead({ title, sub }) {
  return (
    <div className="mb-8">
      <h3 className="m-0 text-[clamp(26px,2.6vw,34px)] font-extrabold tracking-[-.03em]">{title}</h3>
      {sub && <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-ink2">{sub}</p>}
    </div>
  );
}

function Bars({ rows }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {rows.map((r, i) => (
        <li key={i} className="grid grid-cols-[88px_minmax(0,1fr)_48px] items-center gap-3 text-sm">
          <span className="font-mono text-ink2">{r.label}</span>
          <span aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-soft"><span className="block h-full rounded-full bg-acc" style={{ width: `${(r.value / max) * 100}%`, opacity: 0.35 + 0.65 * (r.value / max) }} /></span>
          <span className="text-right font-semibold tabular-nums">{r.display}</span>
        </li>
      ))}
    </ul>
  );
}

function Quantitative({ q }) {
  const pick = usePick();
  return (
    <div className="mt-20">
      <SubHead title={pick(q, 'title')} sub={pick(q, 'subtitle')} />
      <div className="grid gap-5 md:grid-cols-3">
        {(q.stats || []).map((s, i) => (
          <div key={i} className="rounded border border-line bg-card p-6">
            <Metric metric={pick(s, 'value')} size="md" />
            <p className="mt-3 text-sm leading-relaxed text-ink2">{pick(s, 'label')}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-10 rounded border border-line bg-card p-6 md:grid-cols-2 md:p-8">
        <div>
          <h4 className="m-0 mb-4 text-lg font-bold">{pick(q, 'patternsTitle')}</h4>
          <p className="cap mb-3">{pick(q, 'behaviorsLabel')}</p>
          <Bullets items={(q.behaviors || []).map((b) => pick(b, 'text'))} />
        </div>
        {(q.distribution || []).length > 0 && (
          <div>
            <p className="cap mb-4">{pick(q, 'distributionLabel')}</p>
            <Bars rows={q.distribution.map((x) => ({ label: pick(x, 'range'), value: Number(x.value), display: `${x.value}%` }))} />
            {pick(q, 'distributionNote') && <p className="mt-4 text-[13px] leading-relaxed text-ink2">{pick(q, 'distributionNote')}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

const ItemIcon = ({ type }) => type === 'positive'
  ? <Check className="mt-1 h-4 w-4 flex-none text-ink" />
  : type === 'negative' ? <Cross className="mt-1 h-4 w-4 flex-none text-acctext" /> : <span aria-hidden="true" className="mt-1 w-4 flex-none text-center text-ink2">–</span>;
const itemSr = (type, lang) => (type === 'positive' ? (lang === 'en' ? 'Pro: ' : 'A favor: ') : type === 'negative' ? (lang === 'en' ? 'Con: ' : 'En contra: ') : '');

function Preference({ a }) {
  const pick = usePick();
  const { lang } = useLang();
  const variant = (v) => v && (
    <div className="rounded border border-line bg-card p-6">
      <p className="cap mb-4 text-ink">{pick(v, 'label')}</p>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {(v.items || []).map((it, i) => <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink2"><ItemIcon type={it.type} /><span><span className="sr-only">{itemSr(it.type, lang)}</span>{pick(it, 'text')}</span></li>)}
      </ul>
    </div>
  );
  return (
    <div className="mt-20">
      <SubHead title={pick(a, 'title')} sub={pick(a, 'subtitle')} />
      <div className="grid gap-5 md:grid-cols-2">{variant(a.variantA)}{variant(a.variantB)}</div>
      {(a.results || []).length > 0 && (
        <div className="mt-6">
          <h4 className="m-0 mb-4 text-lg font-bold">{pick(a, 'resultsTitle')}</h4>
          <div className="grid gap-5 md:grid-cols-3">
            {a.results.map((x, i) => (
              <div key={i} className="rounded border border-line bg-card p-6"><Metric metric={pick(x, 'value')} size="md" /><p className="mt-3 text-sm leading-relaxed text-ink2">{pick(x, 'label')}</p></div>
            ))}
          </div>
        </div>
      )}
      {pick(a, 'insight') && <p className="mt-6 max-w-[75ch] border-l-0 text-base leading-relaxed text-ink2">{pick(a, 'insight')}</p>}
    </div>
  );
}

function Tasks({ t }) {
  const pick = usePick();
  return (
    <div className="mt-20">
      <SubHead title={pick(t, 'title')} sub={pick(t, 'subtitle')} />
      <div className="overflow-x-auto rounded border border-line bg-card" role="region" aria-label={pick(t, 'title')} tabIndex={0}>
        <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-line">
              {['headerNumber', 'headerSubtask', 'headerLoad', 'headerFriction'].map((h) => <th key={h} scope="col" className="cap px-5 py-3 font-medium">{pick(t, h)}</th>)}
            </tr>
          </thead>
          <tbody>
            {(t.tasks || []).map((x, i) => (
              <tr key={i} className="border-b border-line last:border-0 align-top">
                <td className="px-5 py-4 font-mono text-acctext">{x.number}</td>
                <td className="px-5 py-4 font-semibold">{pick(x, 'subtask')}</td>
                <td className="px-5 py-4"><span className="inline-flex items-center gap-2"><span aria-hidden="true" className="flex gap-0.5">{[0, 1, 2].map((k) => <span key={k} className={`h-2.5 w-1.5 rounded-sm ${k < ({ high: 3, medium: 2, low: 1 }[x.loadLevel] || 1) ? 'bg-acc' : 'bg-soft'}`} />)}</span>{pick(x, 'load')}</span></td>
                <td className="px-5 py-4 text-ink2">{pick(x, 'friction')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tree({ t }) {
  const pick = usePick();
  return (
    <div className="mt-20">
      <SubHead title={pick(t, 'title')} sub={pick(t, 'subtitle')} />
      {pick(t, 'barNote') && <p className="cap mb-4">{pick(t, 'barNote')}</p>}
      <div className="flex flex-col gap-5">
        {(t.tasks || []).map((x, i) => (
          <div key={i} className="grid gap-x-10 gap-y-4 rounded border border-line bg-card p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <h4 className="m-0 text-base font-bold leading-snug">{pick(x, 'task')}</h4>
              {pick(x, 'learning') && <div className="mt-3"><p className="cap mb-1">{pick(t, 'learningLabel')}</p><p className="m-0 text-sm leading-relaxed text-ink2">{pick(x, 'learning')}</p></div>}
            </div>
            <Bars rows={(x.bars || []).map((b) => ({ label: b.version, value: Number(b.value), display: `~${b.value}%` }))} />
          </div>
        ))}
      </div>
      {t.decision && (
        <div className="mt-6 rounded border border-line border-t-[3px] border-t-acc bg-card p-6">
          <p className="cap mb-2 text-ink">{pick(t.decision, 'label')}</p>
          <p className="m-0 max-w-[80ch] text-base leading-relaxed text-ink2">{pick(t.decision, 'text')}</p>
        </div>
      )}
    </div>
  );
}

function Sorting({ c }) {
  const pick = usePick();
  const { lang } = useLang();
  const dec = c.decision;
  return (
    <div className="mt-20">
      <SubHead title={pick(c, 'title')} sub={pick(c, 'subtitle')} />
      <div className="grid gap-5 md:grid-cols-3">
        {(c.clusters || []).map((x, i) => (
          <div key={i} className="rounded border border-line bg-card p-6">
            <h4 className="m-0 mb-3 text-base font-bold">{pick(x, 'name')}</h4>
            <Bullets items={(pick(x, 'items') || []).map((it) => (typeof it === 'string' ? it : pick(it, 'text') || pick(it, 'name')))} />
          </div>
        ))}
      </div>
      {dec && (
        <div className="mt-6 grid gap-8 rounded border border-line border-t-[3px] border-t-acc bg-card p-6 md:grid-cols-2 md:p-8">
          <div>
            <h4 className="m-0 text-lg font-bold">{pick(dec, 'title')}</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-ink2">{pick(dec, 'description')}</p>
            {pick(dec, 'principle') && <p className="mt-3 text-[15px] leading-relaxed"><span className="font-semibold">{pick(dec, 'principleLabel')}</span> {pick(dec, 'principle')}</p>}
          </div>
          <div>
            <p className="cap mb-3 text-ink">{pick(dec, 'tradeoffsTitle')}</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {(dec.tradeoffs || []).map((it, i) => <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-ink2"><ItemIcon type={it.type} /><span><span className="sr-only">{itemSr(it.type, lang)}</span>{pick(it, 'text')}</span></li>)}
            </ul>
            {pick(dec, 'mitigation') && <p className="mt-4 text-[15px] leading-relaxed"><span className="font-semibold">{pick(dec, 'mitigationLabel')}</span> {pick(dec, 'mitigation')}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── 03 Diseñar ──────────────────────────────────────────────────────────── */
function Solution({ s }) {
  const ui = useUI();
  const pick = usePick();
  const comps = s.components || [];
  const principles = s.principles || [];
  const decisions = s.decisions || [];
  return (
    <>
      {comps.length > 0 && (
        <div className="tl grid gap-x-12 gap-y-12 md:grid-cols-2">
          {comps.map((c, i) => (
            <div key={i} className="node">
              <span className="eyebrow-no mb-1.5 block text-xs">{c.number || String(i + 1).padStart(2, '0')}</span>
              <h3 className="m-0 mb-2 text-xl font-bold leading-tight">{pick(c, 'title')}</h3>
              {pick(c, 'tagline') && <p className="m-0 mb-2 text-[15px] font-semibold">{pick(c, 'tagline')}</p>}
              <p className="m-0 max-w-[56ch] text-base leading-relaxed text-ink2">{pick(c, 'description')}</p>
            </div>
          ))}
        </div>
      )}
      {principles.length > 0 && (
        <div className={comps.length ? 'mt-20' : ''}>
          <h3 className="cap mb-6 text-ink">{pick(s, 'principlesTitle') || ui.principles}</h3>
          <ol className="m-0 list-none border-t-[3px] border-acc p-0">
            {principles.map((p, i) => (
              <li key={i} className="grid gap-x-8 gap-y-2 border-b border-line py-7 md:grid-cols-[56px_minmax(0,1fr)]">
                <span className="eyebrow-no">{p.number || String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="m-0 text-lg font-bold leading-snug">{pick(p, 'title')}</h4>
                  <p className="mt-2 max-w-[80ch] text-[15px] leading-relaxed text-ink2">{pick(p, 'description')}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {decisions.length > 0 && (
        <div className="mt-20">
          <h3 className="cap mb-6 text-ink">{pick(s, 'decisionsTitle') || ui.decisions}</h3>
          <div className="flex flex-col gap-5">
            {decisions.map((x, i) => (
              <div key={i} className="rounded border border-line bg-card p-6">
                <h4 className="m-0 text-lg font-bold leading-snug">{pick(x, 'title')}</h4>
                <div className="mt-4 grid gap-x-10 gap-y-4 md:grid-cols-2">
                  {pick(x, 'justification') && <div><p className="cap mb-1">{pick(s, 'decisionLabelA')}</p><p className="m-0 text-[15px] leading-relaxed text-ink2">{pick(x, 'justification')}</p></div>}
                  {pick(x, 'tradeoff') && <div><p className="cap mb-1">{pick(s, 'decisionLabelB')}</p><p className="m-0 text-[15px] leading-relaxed text-ink2">{pick(x, 'tradeoff')}</p></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function LivePrototype({ p, title }) {
  const ui = useUI();
  const pick = usePick();
  const { lang } = useLang();
  const frameSrc = lang === 'en' ? (p.srcEn || p.srcEs || pick(p, 'src')) : (p.srcEs || p.srcEn || pick(p, 'src'));
  const box = useRef(null);
  const [fs, setFs] = useState(false);
  const [canFs, setCanFs] = useState(false);
  useEffect(() => {
    setCanFs(!!document.fullscreenEnabled);
    const on = () => setFs(document.fullscreenElement === box.current);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const toggle = () => {
    try { fs ? document.exitFullscreen() : box.current?.requestFullscreen(); } catch { /* sin soporte */ }
  };
  const btn = 'inline-flex min-h-[44px] items-center gap-2 rounded-sm px-3 font-mono text-[13px] font-medium text-ink2 no-underline hover:text-ink';
  return (
    <div className="mt-20">
      <SubHead title={pick(p, 'title')} sub={pick(p, 'subtitle')} />
      {pick(p, 'badge') && <p className="cap mb-4 text-acctext">{pick(p, 'badge')}</p>}
      <div ref={box} className="flex flex-col overflow-hidden rounded border border-line bg-card [&:fullscreen]:h-screen [&:fullscreen]:rounded-none [&:fullscreen]:border-0">
        <div role="group" aria-label={ui.protoBar} className="flex flex-wrap items-center justify-end gap-x-2 border-b border-line bg-paper px-2">
          {canFs && (
            <button type="button" onClick={toggle} aria-pressed={fs} className={btn}>
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {fs ? <path d="M6 2v4H2M10 14v-4h4M14 6h-4V2M2 10h4v4" /> : <path d="M2 6V2h4M14 10v4h-4M10 2h4v4M6 14H2v-4" />}
              </svg>
              {fs ? ui.exitFullscreen : ui.fullscreen}
            </button>
          )}
          <a href={frameSrc} target="_blank" rel="noopener noreferrer" className={btn}>
            {ui.newWindow}<ArrowOut /><span className="sr-only"> ({lang === 'en' ? 'opens in a new tab' : 'se abre en una pestaña nueva'})</span>
          </a>
        </div>
        <iframe title={`${ui.protoTitle} ${title}`} src={frameSrc} loading="lazy" allow="fullscreen" className={`block w-full border-0 ${fs ? 'min-h-0 flex-1' : ''}`} style={fs ? undefined : { height: `${Math.min(Number(p.height) || 900, 1180)}px` }} />
      </div>
      {pick(p, 'repoUrl') && <a href={pick(p, 'repoUrl')} className="link-u mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold">{ui.openProto}<ArrowOut /></a>}
    </div>
  );
}

function Designs({ g }) {
  const pick = usePick();
  const { lang } = useLang();
  const items = g.items || [];
  return (
    <div className="mt-20">
      <SubHead title={pick(g, 'title')} sub={pick(g, 'subtitle')} />
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {items.map((it, i) => {
          const device = it.device || g.device || 'desktop';
          const srcs = it.srcs || [lang === 'en' && it.srcEn ? it.srcEn : it.src].filter(Boolean);
          const alt = pick(it, 'alt') || pick(it, 'title');
          return (
            <div key={i} className="min-w-0">
              {srcs.map((s, j) => <Media key={j} src={img(s)} alt={srcs.length > 1 ? `${alt} (${j + 1}/${srcs.length})` : alt} device={device} accent={device === 'mobile'} full={it.fit === 'full'} />)}
              <div className="border-t border-line pt-3">
                {pick(it, 'badge') && <p className="cap mb-1 text-acctext">{pick(it, 'badge')}</p>}
                <h4 className="m-0 text-base font-bold leading-snug">{pick(it, 'title')}</h4>
                {pick(it, 'description') && <p className="mt-1.5 text-sm leading-relaxed text-ink2">{pick(it, 'description')}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 04 Medir ────────────────────────────────────────────────────────────── */
function CriterionChart({ c, label }) {
  // El ancho real se mide para dibujar en píxeles: así los círculos y las líneas punteadas no se deforman en anchos intermedios.
  const ref = useRef(null);
  const [W, setW] = useState(300);
  useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const set = () => setW(Math.max(120, Math.round(el.getBoundingClientRect().width)));
    set();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(set); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const P = 14, x = (v) => P + (v / c.max) * (W - 2 * P);
  const xf = x(c.from), xt = x(c.to);
  const band = Array.isArray(c.criterion);
  return (
    <svg ref={ref} viewBox={`0 0 ${W} 56`} width="100%" height="56" role="img" aria-label={label} className="block h-14 w-full overflow-visible">
      <line x1={P} y1="28" x2={W - P} y2="28" stroke="rgb(var(--line))" strokeWidth="2" />
      {band
        ? <rect x={x(c.criterion[0])} y="14" width={x(c.criterion[1]) - x(c.criterion[0])} height="28" rx="2" fill="rgb(var(--acc) / .16)" stroke="rgb(var(--acc-text))" strokeWidth="1.5" strokeDasharray="3 3" />
        : <line x1={x(c.criterion)} y1="10" x2={x(c.criterion)} y2="46" stroke="rgb(var(--acc-text))" strokeWidth="2" strokeDasharray="3 3" />}
      <line className="draw" pathLength="1" x1={xf} y1="28" x2={xt + (xf > xt ? 7 : -7)} y2="28" stroke="rgb(var(--ink))" strokeWidth="3" strokeLinecap="round" />
      <circle cx={xf} cy="28" r="5" fill="rgb(var(--card))" stroke="rgb(var(--muted))" strokeWidth="2" />
      <circle cx={xt} cy="28" r="7" fill="rgb(var(--ink))" stroke="rgb(var(--card))" strokeWidth="2" />
    </svg>
  );
}

function Results({ r }) {
  const ui = useUI();
  const pick = usePick();
  const items = r.impact || [];
  const anyChart = items.some((i) => i.chart);
  const cols = items.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2';
  return (
    <>
      <div className={`grid gap-5 ${cols}`}>
        {items.map((i, k) => {
          const { main, crit } = splitCrit(pick(i, 'label'));
          const c = i.chart;
          const upper = c ? (Array.isArray(c.criterion) ? Math.max(...c.criterion) : c.criterion) : null;
          const met = c ? c.to <= upper : null;
          const status = c ? `${met ? ui.meets : ui.misses}${crit ? `: ${crit}` : ''}` : '';
          return (
            <article key={k} className="flex flex-col gap-3 rounded border border-line bg-card p-6 transition-shadow hover:shadow-[0_24px_40px_-28px_rgba(21,24,29,.35)]">
              <Metric metric={pick(i, 'metric')} />
              <h3 className="m-0 text-base font-bold leading-snug">{main}</h3>
              {c && <CriterionChart c={c} label={`${main}: ${pick(i, 'metric')}. ${status}.`} />}
              {c
                ? <p className="m-0 flex items-center gap-1.5 text-[13px] font-semibold text-ok">{met ? <Check className="h-[15px] w-[15px]" /> : <Cross className="h-[15px] w-[15px]" />}{status}</p>
                : crit && <p className="m-0 font-mono text-xs font-medium text-acctext">{ui.successCrit}: {crit}</p>}
              <p className="m-0 mt-1 text-sm leading-relaxed text-ink2">{pick(i, 'description')}</p>
            </article>
          );
        })}
      </div>
      {anyChart && (
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink2">
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-muted bg-card" />{ui.baseline}</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-full bg-ink" />{ui.result}</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-sm border-2 border-dashed border-acctext bg-acc/15" />{ui.successCrit}</span>
        </p>
      )}
      {(r.method || []).length > 0 && (
        <div className="mt-8">
          <Disclosure title={pick(r, 'methodTitle') || ui.howMeasured}>
            <dl className="m-0 grid gap-4">
              {r.method.map((m, i) => (
                <div key={i} className="grid gap-1 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6">
                  <dt className="cap pt-0.5">{pick(m, 'label')}</dt>
                  <dd className="m-0 max-w-[76ch] text-[15px] leading-relaxed text-ink2">{pick(m, 'value')}</dd>
                </div>
              ))}
            </dl>
          </Disclosure>
        </div>
      )}
    </>
  );
}

/* ── 05 Aprender y siguiente parada ──────────────────────────────────────── */
function Learn({ r }) {
  const pick = usePick();
  const col = (title, items) => items.length > 0 && (
    <div>
      <h3 className="cap mb-7 text-ink">{title}</h3>
      <div className="tl flex flex-col gap-10">
        {items.map((x, i) => (
          <div key={i} className="node">
            <h4 className="m-0 mb-2 text-xl font-bold leading-tight text-acctext">{pick(x, 'title')}</h4>
            <p className="m-0 max-w-[80ch] text-base leading-relaxed text-ink2">{pick(x, 'description')}</p>
          </div>
        ))}
      </div>
    </div>
  );
  const ui = useUI();
  return <div className="flex flex-col gap-16">{col(ui.learnings, r.learnings || [])}{col(ui.nextSteps, r.nextSteps || [])}</div>;
}

function NextStop({ cta }) {
  const ui = useUI();
  const pick = usePick();
  const href = cta.buttonHref || '/';
  const slug = href.replace(/^\//, '');
  const nextTitle = pick(cta, 'question').replace(/^Siguiente caso:\s*|^Next case:\s*/i, '');
  const inner = (
    <>
      <span className="cap">{ui.nextStop}{route.includes(slug) ? ` · ${stopNumber(slug)}` : ''}</span>
      <span className="link-u inline-flex items-center gap-5 text-[clamp(28px,3.6vw,52px)] font-extrabold leading-none tracking-[-.04em]">{nextTitle}<Arrow className="h-10 w-10 flex-none transition-transform group-hover:translate-x-2" /></span>
      {pick(cta, 'description') && <span className="text-base text-ink2">{pick(cta, 'description')}</span>}
    </>
  );
  return (
    <div className="wrap">
      <div className="mt-28 border-t border-ink pb-10 pt-12">
        {href.startsWith('/') ? <Link to={href} className="group inline-flex flex-col gap-3 no-underline">{inner}</Link> : <a href={href} className="group inline-flex flex-col gap-3 no-underline">{inner}</a>}
      </div>
    </div>
  );
}
