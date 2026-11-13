import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../lib.jsx';
import { Arrow } from '../ui.jsx';

export default function NotFound() {
  const ui = useUI();
  useEffect(() => {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <section className="wrap py-28" aria-labelledby="nf-title">
      <p className="cap m-0 text-acctext">404</p>
      <h1 id="nf-title" className="mt-4 text-[clamp(36px,4.4vw,60px)] font-extrabold leading-none tracking-[-.04em]">{ui.notFoundTitle}</h1>
      <p className="mt-5 text-lg text-ink2">{ui.notFoundText}</p>
      <Link to="/" className="link-u mt-8 inline-flex min-h-[44px] items-center gap-2 text-base font-bold">{ui.backHome}<Arrow /></Link>
    </section>
  );
}
