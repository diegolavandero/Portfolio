import { about, bi, useLang, usePick, useUI } from '../lib.jsx';
import { ArrowOut, Bullets, ChapterHead, useCopy } from '../ui.jsx';

export default function About() {
  const ui = useUI();
  const pick = usePick();
  const { lang } = useLang();
  const [copied, copy] = useCopy();
  const a = about;
  const intro = pick(a, 'intro') || [];
  const c = a.contact;
  return (
    <article aria-labelledby="about-title">
      <header className="border-b border-line bg-card">
        <div className="wrap grid items-end gap-x-16 gap-y-8 py-16 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="cap m-0">Diego Lavandero · Senior AI Product Designer</p>
            <h1 id="about-title" className="mt-4 whitespace-nowrap text-[clamp(44px,6vw,88px)] font-extrabold leading-none tracking-[-.045em] text-acctext">{pick(a, 'title')}</h1>
            {intro[0] && <p className="mt-7 max-w-[56ch] text-[19px] font-semibold leading-snug md:text-[21px]">{intro[0]}</p>}
          </div>
          <div className="relative">
            <span aria-hidden="true" className="blob right-0 top-1/2 w-[clamp(220px,26vw,360px)] -translate-y-1/2 bg-soft" />
            <div className="relative rounded border border-line bg-card px-5 py-2">
            <dl className="m-0">
              <div className="flex items-baseline gap-2 py-3"><dt className="font-mono text-[13px] text-ink2">{ui.location}</dt><span aria-hidden="true" className="flex-1 -translate-y-1 border-b border-dotted border-line" /><dd className="m-0 font-semibold">{c.location}</dd></div>
              <div className="flex flex-wrap items-center gap-2 py-3"><dt className="font-mono text-[13px] text-ink2">{ui.email}</dt><span aria-hidden="true" className="flex-1 -translate-y-1 border-b border-dotted border-line" />
                <dd className="m-0 flex items-center gap-2 font-semibold"><a className="link-u" href={`mailto:${c.email}`}>{c.email}</a>
                  <button type="button" onClick={() => copy(c.email)} className="min-h-[36px] rounded-full border border-line px-3 font-mono text-xs text-ink2 hover:text-ink">{copied ? ui.copied : ui.copy}</button>
                  <span className="sr-only" aria-live="polite">{copied ? ui.copied : ''}</span></dd></div>
            </dl>
              <div className="flex flex-wrap gap-x-6 py-3">
                <a className="link-u inline-flex min-h-[44px] items-center gap-1.5 font-semibold" href="https://www.linkedin.com/in/diegolavandero/">LinkedIn<ArrowOut /></a>
                <a className="link-u inline-flex min-h-[44px] items-center gap-1.5 font-semibold" href={c.behanceUrl}>Behance<ArrowOut /></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="h-perfil" className="wrap pt-24">
        <ChapterHead id="h-perfil" num="01" word={lang === 'en' ? 'Profile' : 'Perfil'} />
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="flex flex-col gap-5">{intro.slice(1).map((p, i) => <p key={i} className="m-0 max-w-[62ch] text-[17px] leading-relaxed text-ink2">{p}</p>)}</div>
          <div className="self-start rounded border border-line bg-card p-6">
            <h3 className="cap mb-4 text-ink">{pick(a, 'achievementsTitle')}</h3>
            <Bullets items={(a.achievements || []).map((x) => bi(x, lang))} />
          </div>
        </div>
      </section>

      <section aria-labelledby="h-exp" className="wrap pt-24">
        <ChapterHead id="h-exp" num="02" word={pick(a, 'experienceTitle')} />
        <ol className="tl m-0 flex list-none flex-col gap-14">
          {(a.experience || []).map((x, i) => (
            <li key={i} className="node">
              <p className="cap m-0 mb-2">{pick(x, 'period')}</p>
              <h3 className="m-0 text-[clamp(22px,2.2vw,28px)] font-extrabold leading-tight tracking-[-.02em] text-acctext">{x.company}</h3>
              <p className="mt-1 text-base font-semibold">{pick(x, 'role')}</p>
              <p className="mt-3 max-w-[72ch] text-base leading-relaxed text-ink2">{pick(x, 'description')}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="h-comp" className="wrap pt-24">
        <ChapterHead id="h-comp" num="03" word={pick(a, 'competenciesTitle')} />
        <div className="grid gap-5 md:grid-cols-2">
          {(a.competencyGroups || []).map((g, i) => (
            <div key={i} className="rounded border border-line bg-card p-6">
              <h3 className="m-0 mb-4 text-lg font-bold">{pick(g, 'group')}</h3>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {(g.items || []).map((it, j) => <li key={j} className="rounded-full border border-line px-3 py-1 text-sm">{bi(it, lang)}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded border border-line bg-card p-6">
          <h3 className="cap mb-4 text-ink">{pick(a, 'softwareTitle')}</h3>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {(a.software || []).map((s, j) => <li key={j} className="rounded-full border border-ink px-3 py-1 font-mono text-xs font-medium">{typeof s === 'string' ? s : bi(s, lang)}</li>)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="h-edu" className="wrap pb-6 pt-24">
        <ChapterHead id="h-edu" num="04" word={pick(a, 'educationTitle')} />
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ol className="m-0 list-none border-t-[3px] border-acc p-0">
            {(a.education || []).map((e, i) => (
              <li key={i} className="grid gap-x-8 gap-y-1 border-b border-line py-6 md:grid-cols-[110px_minmax(0,1fr)]">
                <span className="font-mono text-[13px] text-ink2">{pick(e, 'period')}</span>
                <div><h3 className="m-0 text-lg font-bold leading-snug">{e.institution}</h3><p className="mt-1 text-[15px] text-ink2">{pick(e, 'degree')}</p></div>
              </li>
            ))}
          </ol>
          <div className="self-start rounded border border-line bg-card p-6">
            <h3 className="cap mb-2 text-ink">{pick(a, 'languagesTitle')}</h3>
            <dl className="m-0">
              {(a.languages || []).map((l, i) => (
                <div key={i} className="flex items-baseline gap-2 py-2.5"><dt className="font-semibold">{pick(l, 'name')}</dt><span aria-hidden="true" className="flex-1 -translate-y-1 border-b border-dotted border-line" /><dd className="m-0 font-mono text-[13px] text-ink2">{pick(l, 'level')}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </article>
  );
}
