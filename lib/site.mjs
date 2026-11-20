// Shared page frame for every generated page. Root-relative paths match the
// published /omnifactory/ route and a local server rooted one level up.
export const BASE = '/omnifactory/';
export const ORIGIN = 'https://jehlp.net';
const THEME = 'https://jehlp.net/site-theme/v2/';
export const ASSET_VERSION = '20261119-quests';

export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const number = n => n.toLocaleString('en-US');

// The time played is the age of the world in game ticks, 20 for each second.
// The world runs only while it is open, and it does not pause.
export function played(ticks) {
  const minutes = Math.floor(ticks / 1200);
  return `${number(Math.floor(minutes / 60))} h ${String(minutes % 60).padStart(2, '0')} min`;
}

// The two parts of the site link to each other from the header. A page does not link to itself.
// `scripts` names the page's own scripts in assets/; the shared component script comes first.
export function page({ path, title, description, main, scripts = false, mainClass = '' }) {
  const canonical = ORIGIN + BASE + path;
  const nav = `${path ? `<a href="${BASE}">Notes</a>` : ''}${path === 'quests/' ? '' : `<a href="${BASE}quests/">Quests</a>`}`;
  const own = scripts === true ? ['app.js'] : [].concat(scripts || []);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="theme-color" content="#fbfaf7">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="jehlp.net">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${THEME}cards/omnifactory.png">
    <meta property="og:image:width" content="600">
    <meta property="og:image:height" content="600">
    <meta property="og:image:alt" content="The Omnifactory symbol">
    <meta name="twitter:card" content="summary">
    <title>${escapeHtml(title)} · jehlp.net</title>
    <link rel="icon" href="${THEME}favicons/omnifactory.png" type="image/png">
    <script src="${THEME}theme.js?v=20261009-reading-folio"></script>
    <link rel="stylesheet" href="${THEME}base.css?v=20261102-code">
    <link rel="stylesheet" href="${THEME}components.css?v=20261102-code">
    <link rel="stylesheet" href="${BASE}assets/styles.css?v=${ASSET_VERSION}">${own.length ? `
    <script src="${THEME}components.js?v=20261102-code" defer></script>
${own.map(file => `    <script src="${BASE}assets/${file}?v=${ASSET_VERSION}" defer></script>`).join('\n')}` : ''}
  </head>
  <body data-site-tone="ochre">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header site-header--identity">
      <div class="site-brand"><img class="site-mark" src="${THEME}marks/omnifactory.png" width="32" height="32" alt=""><span class="site-title">Omnifactory</span></div>
      <nav aria-label="Site links">${nav}<span class="site-utility-pair"><a class="site-home" href="https://jehlp.net/" aria-label="Home — jehlp.net" title="Home — jehlp.net"><span aria-hidden="true">✳</span></a><button class="theme-toggle" type="button" data-theme-toggle aria-label="Use dark theme" aria-pressed="false">◐</button></span></nav>
    </header>
    <main id="main" tabindex="-1" class="omni-main${mainClass ? ` ${mainClass}` : ''}">
${main}
    </main>
  </body>
</html>
`;
}
