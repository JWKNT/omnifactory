import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import { Marked } from 'marked';
import { escapeHtml } from './site.mjs';

hljs.registerLanguage('python', python);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
const ALIASES = { py: 'python', js: 'javascript', sh: 'bash', shell: 'bash', zsh: 'bash' };

export const extension = name => (/\.([a-z0-9]+)$/i.exec(name)?.[1] || '').toLowerCase();
export const kindOf = name => ({ md: 'markdown', json: 'json' })[extension(name)] || 'text';

// Build-time highlighting per the site-theme code contract: spans only, so the
// listing keeps the exact source text. Unknown languages stay escaped text.
export const highlight = (code, language) => language && hljs.getLanguage(language)
  ? hljs.highlight(code, { language, ignoreIllegals: true }).value
  : escapeHtml(code);

export const codeBlock = (code, { language = null, label, wrap = false }) =>
  `<pre class="ui-code${wrap ? ' ui-code--wrap' : ''}" tabindex="0" aria-label="${escapeHtml(label)}"><code class="hljs${language ? ` language-${language}` : ''}">${highlight(code, language)}</code></pre>`;

// Web links stay links. A path that names a published note links to it; any
// other local path (a script, a file on the player's computer) stays plain text.
export function linkPolicy(notes = new Map()) {
  return href => {
    const value = String(href || '').replace(/^<|>$/g, '');
    if (/^https?:\/\//i.test(value)) return value;
    const path = decodeURIComponent(value.split(/[?#]/)[0]).replace(/^(\.\/)+/, '').replace(/^notes\//, '');
    return notes.get(path) || notes.get(path.split('/').pop()) || null;
  };
}

export function markdown({ headingOffset = 0, resolve = () => null } = {}) {
  const md = new Marked({ gfm: true });
  md.use({ renderer: {
    html: token => escapeHtml(token.text),
    image: token => escapeHtml(token.text || ''),
    heading(token) {
      const level = Math.min(6, token.depth + headingOffset);
      return `<h${level}>${this.parser.parseInline(token.tokens)}</h${level}>\n`;
    },
    link(token) {
      const label = this.parser.parseInline(token.tokens);
      const href = resolve(token.href);
      return href ? `<a href="${escapeHtml(href)}">${label}</a>` : label;
    },
    code(token) {
      const language = ALIASES[token.lang] || token.lang || '';
      return codeBlock(token.text, { language: hljs.getLanguage(language) ? language : null, label: token.lang ? `${token.lang} example` : 'Code example', wrap: true }) + '\n';
    },
  } });
  // A wide table scrolls inside a named, focusable region instead of the page.
  return text => md.parse(String(text)).replaceAll('<table>', '<div class="table-scroll" tabindex="0" role="region" aria-label="Table"><table>').replaceAll('</table>', '</table></div>');
}

const URL_PATTERN = /https?:\/\/[^\s<>"')\]]+/g;
const linkText = text => {
  let html = '', last = 0;
  for (const match of text.matchAll(URL_PATTERN)) {
    html += escapeHtml(text.slice(last, match.index)) + `<a href="${escapeHtml(match[0])}">${escapeHtml(match[0])}</a>`;
    last = match.index + match[0].length;
  }
  return html + escapeHtml(text.slice(last));
};

// Plain-text notes keep their own line breaks; blank lines separate paragraphs.
export const plainText = text => String(text).replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/).map(p => `<p>${linkText(p)}</p>`).join('\n');

// Keep JSON exactly as written unless it is on one line; then indent it by two
// spaces for reading. Highlighting never changes the characters themselves.
export function jsonText(source) {
  const text = String(source).replace(/\s+$/, '');
  if (text.includes('\n')) return text;
  try { return JSON.stringify(JSON.parse(text), null, 2); } catch { return text; }
}

const flat = text => String(text).replace(/[*_`#>]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();
const clip = (text, max = 140) => text.length > max ? `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : text;

// A one-line description for an index row, taken from the note's own words.
export function noteSummary(name, source) {
  const text = String(source);
  if (extension(name) === 'md') {
    const h1 = /^#\s+(.+)$/m.exec(text);
    return clip(flat(h1 ? h1[1] : text.split('\n').find(line => line.trim()) || ''));
  }
  if (extension(name) === 'json') {
    try {
      const data = JSON.parse(text);
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const first = Object.values(data).find(value => typeof value === 'string' && value.length >= 24);
        if (first) return clip(flat(first));
      }
    } catch {}
    return '';
  }
  return clip(flat(text.split('\n').find(line => line.trim()) || ''));
}
