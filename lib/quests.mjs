// The quest book page: the pack's quest lines as tabs, each with its map of quests, and
// Astra's progress on top. The page is one static shell. Its script reads the book and the
// progress as data, so a new progress record needs no rebuild of the page.
import { BASE, ASSET_VERSION, page, escapeHtml } from './site.mjs';
import '../assets/quest-rules.js';

// The rules of the book (what is open, what shows) are shared with the page's script.
export const rules = globalThis.QuestRules;

// The shell has no progress numbers: the script fills them in from the progress record. So
// the page changes only when the book changes, and a new record needs no new page.
export function questPage({ book }) {
  const lines = book.lines.map(line => `          <button type="button" class="qb-line" data-line="${line.id}" aria-pressed="false"><span class="qb-line-name">${escapeHtml(line.name)}</span><span class="qb-line-count" data-count></span></button>`).join('\n');
  const state = (key, label) => `<li><span class="qb-key" data-state="${key}" aria-hidden="true"></span>${label}</li>`;
  return page({ path: 'quests/', title: 'Quest book · Omnifactory', scripts: ['quest-rules.js', 'quests.js'], mainClass: 'quest-page',
    description: `The quest book of the GregTech modpack Omnifactory as tabs and quest maps, with the quests that Astra completed and the time played for each one.`,
    main: `      <header class="page-head">
        <h1>Quest book</h1>
        <p class="lede">The quest book of Omnifactory, with the progress of Astra. <span data-qb-summary></span></p>
      </header>
      <div class="qb" data-qb data-book="${BASE}data/quests/book.json?v=${ASSET_VERSION}" data-progress="${BASE}data/quests/progress.json">
        <nav class="qb-lines" aria-label="Quest lines">
${lines}
        </nav>
        <section class="qb-panel" aria-labelledby="qb-line-title">
          <header class="qb-line-head">
            <h2 id="qb-line-title" data-line-title>Quest line</h2>
            <div class="qb-line-desc" data-line-desc></div>
          </header>
          <div class="qb-tools">
            <div class="ui-segmented" role="group" aria-label="View"><button type="button" data-view="map" aria-pressed="true">Map</button><button type="button" data-view="list" aria-pressed="false">List</button></div>
            <div class="ui-segmented qb-zoom" role="group" aria-label="Map size"><button type="button" data-zoom="out" aria-label="Make the map smaller">−</button><button type="button" data-zoom="fit">Fit</button><button type="button" data-zoom="in" aria-label="Make the map larger">+</button></div>
            <ul class="qb-legend" aria-label="Quest states">${state('complete', 'Complete')}${state('unclaimed', 'Reward not claimed')}${state('open', 'Open')}${state('locked', 'Locked')}</ul>
          </div>
          <div class="qb-map" data-map tabindex="0" role="region" aria-label="Quest map"><div class="qb-canvas" data-canvas></div></div>
          <ol class="qb-list" data-list hidden></ol>
          <p class="qb-status" data-status role="status">The quest book is loading.</p>
        </section>
      </div>
      <noscript><p class="empty">This page uses JavaScript to draw the quest book.</p></noscript>
      <dialog class="ui-dialog qb-dialog" data-dialog id="quest-dialog" aria-labelledby="quest-title">
        <form method="dialog" class="ui-dialog-dismiss"><button aria-label="Close the quest">×</button></form>
        <div class="ui-dialog-body" data-quest-body><h2 id="quest-title">Quest</h2></div>
      </dialog>
      <p class="qb-credit">The quest names, the quest text and the layout come from the quest book of the pack. Omnifactory is the work of Damien Reave and the later maintainers of the pack, and its source is published under the LGPL-3.0 licence. The page shows a quest only when the book in the game shows it.</p>` });
}
