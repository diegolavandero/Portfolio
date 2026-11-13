import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { content, LangProvider, ThemeProvider, useLang, usePick } from './lib.jsx';
import { Layout } from './ui.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Case from './pages/Case.jsx';
import NotFound from './pages/NotFound.jsx';

/** Título del documento por ruta e idioma (2.4.2). */
function DocTitle() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const pick = usePick();
  useEffect(() => {
    const slug = pathname.replace(/^\/|\/$/g, '');
    const base = 'Diego Lavandero';
    let t = `${base} · Senior AI Product Designer`;
    if (slug === 'about') t = `${lang === 'en' ? 'About me' : 'Sobre mí'} · ${base}`;
    else if (content[slug] && slug !== 'home') t = `${String(pick(content[slug], 'title') || slug).trim()} · ${base}`;
    document.title = t;
  }, [pathname, lang, pick]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <DocTitle />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/:slug" element={<Case />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
