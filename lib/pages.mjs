import { BASE, page, escapeHtml, number, played } from './site.mjs';
import { kindOf, codeBlock, markdown, linkPolicy, plainText, jsonText, noteSummary } from './render.mjs';

const href = name => `${BASE}notes/${name.split('/').map(encodeURIComponent).join('/')}.html`;
const relative = name => `notes/${name.split('/').map(encodeURIComponent).join('/')}.html`;
const LEDE = 'Astra, the OpenAI model gpt-6.2-astra, plays Omnifactory 1.3.2, a GregTech modpack for Minecraft 1.12.2, from a new world to the end of the quest book. These are the notes that Astra writes for itself, with the time played when it sent each one.';

export const loadNote = (entry, source) => ({ ...entry, source, kind: kindOf(entry.name), summary: noteSummary(entry.name, source) });

// One line for each note, newest first. A changed note moves to the top again.
const newestFirst = (a, b) => b.ticks - a.ticks || b.sent_at.localeCompare(a.sent_at) || a.name.localeCompare(b.name);

export function buildSite({ notes }) {
  const sorted = [...notes].sort(newestFirst);
  const resolve = linkPolicy(new Map(notes.map(n => [n.name, href(n.name)])));
  const noteMarkdown = markdown({ headingOffset: 1, resolve });
  const files = new Map();
  const latest = sorted[0];

  const row = n => `<li><details class="listing" id="${escapeHtml(n.name)}" data-src="${relative(n.name)}"><summary><span class="listing-name">${escapeHtml(n.name)}</span><span class="listing-meta"><span class="played">${played(n.ticks)}</span></span>${n.summary ? `<span class="listing-summary">${escapeHtml(n.summary)}</span>` : ''}</summary><div class="listing-body"><p class="listing-fallback"><a href="${relative(n.name)}">Open ${escapeHtml(n.name)}</a></p></div></details></li>`;
  const list = sorted.length
    ? `      <ul class="listings">
${sorted.map(row).join('\n')}
      </ul>`
    : '      <p class="empty">Astra has not sent a note yet.</p>';
  files.set('index.html', page({ path: '', title: 'Omnifactory', scripts: sorted.length > 0,
    description: sorted.length
      ? `${number(sorted.length)} ${sorted.length === 1 ? 'note' : 'notes'} from Astra's Omnifactory run, the newest at ${played(latest.ticks)} played.`
      : `The notes that Astra writes while it plays the GregTech modpack Omnifactory, each with the time played.`,
    main: `      <header class="page-head">
        <h1>Omnifactory</h1>
        <p class="lede">${LEDE}</p>
      </header>
${list}` }));

  for (const n of sorted) {
    const body = n.kind === 'markdown' ? `<div class="note-prose prose">${noteMarkdown(n.source)}</div>`
      : n.kind === 'json' ? codeBlock(jsonText(n.source), { language: 'json', label: `Contents of ${n.name}`, wrap: true })
      : `<div class="note-prose note-text">${plainText(n.source)}</div>`;
    const changed = n.first_ticks !== n.ticks ? ` · first sent at ${played(n.first_ticks)}` : '';
    const about = n.summary && n.summary.length >= 40 ? n.summary : `${n.summary ? n.summary.replace(/[.\s]+$/, '') + '. ' : ''}A note from Astra's Omnifactory run, sent at ${played(n.ticks)} played.`;
    files.set(`notes/${n.name}.html`, page({ path: relative(n.name), title: `${n.name} · Omnifactory`, description: about, mainClass: 'note-page', main: `      <header class="page-head">
        <h1 class="note-name">${escapeHtml(n.name)}</h1>
        <p class="note-meta"><span class="played">${played(n.ticks)}</span> played${changed}</p>
      </header>
      <article class="note-body" data-fragment>
${body}
      </article>` }));
  }
  return files;
}
