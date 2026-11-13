/** Tokens del sitio: los valores viven en src/index.css (:root y .dark), así el tema
 *  noche cambia todo sin duplicar clases. */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: v('paper'), card: v('card'), head: v('head'), ink: v('ink'), ink2: v('ink2'),
        line: v('line'), ctl: v('ctl'), soft: v('soft'), muted: v('muted'), node: v('node'),
        acc: v('acc'), acctext: v('acc-text'), onacc: v('on-acc'), ok: v('ok')
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      maxWidth: { page: '1200px' },
      transitionTimingFunction: { out2: 'cubic-bezier(.2,.8,.2,1)' }
    }
  },
  plugins: []
};
