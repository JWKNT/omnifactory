// The quest book: the pack's quest lines as tabs, a map of each line as the game lays it
// out, and Astra's progress. The book and the progress arrive as two data files. The rules
// for open and shown quests are in quest-rules.js.
(() => {
  const root = document.querySelector('[data-qb]');
  const rules = globalThis.QuestRules;
  if (!root || !rules) return;

  const $ = (selector, parent = root) => parent.querySelector(selector);
  const mapEl = $('[data-map]');
  const canvas = $('[data-canvas]');
  const listEl = $('[data-list]');
  const statusEl = $('[data-status]');
  const titleEl = $('[data-line-title]');
  const descEl = $('[data-line-desc]');
  const zoomGroup = $('.qb-zoom');
  const summaryEl = document.querySelector('[data-qb-summary]');
  const dialog = document.getElementById('quest-dialog');
  const dialogBody = dialog.querySelector('[data-quest-body]');

  const number = n => n.toLocaleString('en-US');
  const played = ticks => { const minutes = Math.floor(ticks / 1200); return `${number(Math.floor(minutes / 60))} h ${String(minutes % 60).padStart(2, '0')} min`; };
  const STATE = { complete: 'Complete', unclaimed: 'Complete, reward not claimed', open: 'Open', locked: 'Locked' };
  const ORDER = { open: 0, unclaimed: 1, complete: 2, locked: 3 };
  const PAD = 18;
  const STEPS = [0.5, 0.65, 0.8, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
  const SVG = 'http://www.w3.org/2000/svg';

  let book = null;
  let progress = { ticks: null, done: {}, tasks: {}, have: {} };
  let line = null;          // the quest line on screen
  let view = 'map';
  let unit = 1.5;           // screen pixels for one unit of the game's map
  let box = null;           // the bounds of the line on screen, in map units
  let leadsTo = new Map();  // quest id -> the quests that need it

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value === false || value == null) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat()) if (child != null && child !== false) node.append(child);
    return node;
  }

  // The pack writes its text with Minecraft's format codes: a section sign and one character.
  // Colours carry meaning in the book (items, machines, fluids), so each keeps a tone.
  function formatted(text) {
    const out = document.createDocumentFragment();
    let colour = null;
    const styles = new Set();
    const push = (parent, chunk) => {
      if (!chunk) return;
      const classes = [colour ? `mc-${colour}` : null, ...[...styles].map(s => `mc-${s}`)].filter(Boolean);
      parent.append(classes.length ? el('span', { class: classes.join(' '), text: chunk }) : chunk);
    };
    // Three or more empty lines in the source are a pause the author wanted: keep one gap.
    for (const block of text.split(/\n{2,}/)) {
      if (!block.trim()) { out.append(el('p', { class: 'qb-gap', 'aria-hidden': 'true' })); continue; }
      const p = el('p');
      block.split('\n').forEach((row, index) => {
        if (index) p.append(el('br'));
        const parts = row.split(/§(.)/);
        parts.forEach((part, i) => {
          if (i % 2 === 0) return push(p, part);
          const code = part.toLowerCase();
          if (code === 'r') { colour = null; styles.clear(); }
          else if (/[0-9a-f]/.test(code)) { colour = code; styles.clear(); }
          else if ('lonm'.includes(code)) styles.add(code);
        });
      });
      if (p.childNodes.length) out.append(p);
    }
    return out;
  }
  const plainText = text => text.replace(/§./g, '');

  const done = () => progress.done;
  const stateOf = id => rules.stateOf(book, done(), id);
  const isShown = id => rules.shown(book, done(), id);
  const inBook = id => book.quests[id] && !book.quests[id].off && isShown(id);
  const lineOf = id => (line && line.quests.some(q => q.id === id) ? line : book.lines.find(l => l.quests.some(q => q.id === id && q.w > 0)) || null);

  // Two letters stand for a quest until the book has its item pictures.
  function monogram(name) {
    const words = name.replace(/[^A-Za-z0-9 ]+/g, ' ').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '?';
    if (words.length === 1) return words[0].slice(0, 1).toUpperCase() + words[0].slice(1, 2).toLowerCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  function picture(key) {
    const sheet = book.icons;
    const at = sheet && sheet.at[key];
    if (at == null) return null;
    const rows = Math.ceil(sheet.count / sheet.cols);
    const col = at % sheet.cols, row = Math.floor(at / sheet.cols);
    const span = el('span', { class: 'qb-icon', 'aria-hidden': 'true' });
    span.style.backgroundImage = `url("${new URL(sheet.src, root.dataset.book).href}")`;
    span.style.backgroundSize = `${sheet.cols * 100}% ${rows * 100}%`;
    span.style.backgroundPosition = `${sheet.cols > 1 ? (col / (sheet.cols - 1)) * 100 : 0}% ${rows > 1 ? (row / (rows - 1)) * 100 : 0}%`;
    return span;
  }

  // ---------------------------------------------------------------- tabs

  function drawTabs() {
    for (const button of root.querySelectorAll('.qb-line')) {
      const entry = book.lines.find(l => String(l.id) === button.dataset.line);
      const quests = entry ? rules.buttons(book, done(), entry) : [];
      const complete = quests.filter(q => done()[q.id]).length;
      button.hidden = quests.length === 0;
      button.setAttribute('aria-pressed', String(Boolean(line && entry === line)));
      button.dataset.state = quests.length && complete === quests.length ? 'complete' : complete ? 'started' : 'none';
      const count = $('[data-count]', button);
      count.textContent = `${complete}/${quests.length}`;
      count.setAttribute('aria-label', `${complete} of ${quests.length} quests complete`);
    }
  }

  function drawSummary() {
    if (!summaryEl) return;
    const { total, complete, ticks } = rules.summary(book, progress);
    if (ticks == null) { summaryEl.textContent = 'There is no progress record yet.'; return; }
    const latest = Object.entries(done()).filter(([id]) => inBook(id)).sort((a, b) => b[1][0] - a[1][0])[0];
    summaryEl.textContent = `${number(complete)} of ${number(total)} quests were complete at ${played(ticks)} played.`
      + (latest ? ` The latest is ${book.quests[latest[0]].name}, at ${played(latest[1][0])}.` : '');
  }

  // ---------------------------------------------------------------- map

  const centre = q => [q.x + q.w / 2, q.y + q.h / 2];

  function drawMap() {
    const entries = rules.visible(book, done(), line);
    const sized = entries.filter(q => q.w > 0 && q.h > 0);
    canvas.replaceChildren();
    if (!sized.length) { box = null; return; }
    const minX = Math.min(...entries.map(q => q.x)) - PAD, minY = Math.min(...entries.map(q => q.y)) - PAD;
    const maxX = Math.max(...entries.map(q => q.x + q.w)) + PAD, maxY = Math.max(...entries.map(q => q.y + q.h)) + PAD;
    box = { minX, minY, w: maxX - minX, h: maxY - minY };
    canvas.style.setProperty('--w', box.w);
    canvas.style.setProperty('--h', box.h);

    // The lines between quests go under the buttons, as in the game. A line takes the
    // state of the quest it leads to.
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', `${minX} ${minY} ${box.w} ${box.h}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    const here = new Map(entries.map(q => [q.id, q]));
    const edges = [];
    for (const q of entries) {
      const quest = book.quests[q.id];
      (quest.pre || []).forEach((p, i) => {
        const from = here.get(p);
        const kind = quest.preType ? quest.preType[i] : 0;
        if (!from || kind === 2) return;
        const state = stateOf(q.id);
        edges.push({ from, to: q, state: state === 'unclaimed' ? 'complete' : state, implicit: kind === 1 });
      });
    }
    // Complete lines are drawn last so that they stay on top of the grey ones.
    edges.sort((a, b) => (ORDER[b.state] ?? 0) - (ORDER[a.state] ?? 0));
    for (const edge of edges) {
      const [x1, y1] = centre(edge.from), [x2, y2] = centre(edge.to);
      const path = document.createElementNS(SVG, 'line');
      path.setAttribute('x1', x1); path.setAttribute('y1', y1); path.setAttribute('x2', x2); path.setAttribute('y2', y2);
      path.setAttribute('class', 'qb-edge');
      path.dataset.state = edge.state;
      if (edge.implicit) path.dataset.implicit = '';
      svg.append(path);
    }
    canvas.append(svg);

    for (const q of sized) {
      const quest = book.quests[q.id];
      const state = stateOf(q.id);
      const node = el('button', { type: 'button', class: 'qb-node', 'data-quest': q.id, 'data-state': state, 'data-main': quest.main ? true : false, title: quest.name, 'aria-label': `${quest.name}: ${STATE[state]}` },
        picture(quest.icon) || el('span', { class: 'qb-mono', 'aria-hidden': 'true', text: monogram(quest.name) }));
      node.style.setProperty('--x', q.x - minX);
      node.style.setProperty('--y', q.y - minY);
      node.style.setProperty('--nw', q.w);
      node.style.setProperty('--nh', q.h);
      canvas.append(node);
    }
  }

  function setUnit(next, keep) {
    const before = keep || viewCentre();
    unit = Math.min(3, Math.max(0.3, next));
    canvas.style.setProperty('--u', unit);
    if (before) scrollTo(before[0], before[1]);
    const fit = fitUnit();
    $('[data-zoom="out"]', zoomGroup).disabled = unit <= 0.3 + 1e-6;
    $('[data-zoom="in"]', zoomGroup).disabled = unit >= 3 - 1e-6;
    $('[data-zoom="fit"]', zoomGroup).setAttribute('aria-pressed', String(fit != null && Math.abs(unit - fit) < 1e-3));
  }
  // The point of the map in the middle of the window, in map units.
  function viewCentre() {
    if (!box || !mapEl.clientWidth) return null;
    const left = canvas.offsetLeft, top = canvas.offsetTop;
    return [(mapEl.scrollLeft + mapEl.clientWidth / 2 - left) / unit + box.minX, (mapEl.scrollTop + mapEl.clientHeight / 2 - top) / unit + box.minY];
  }
  function scrollTo(x, y) {
    if (!box) return;
    mapEl.scrollLeft = (x - box.minX) * unit + canvas.offsetLeft - mapEl.clientWidth / 2;
    mapEl.scrollTop = (y - box.minY) * unit + canvas.offsetTop - mapEl.clientHeight / 2;
  }
  function fitUnit() {
    if (!box || !mapEl.clientWidth) return null;
    return Math.min(3, Math.max(0.3, Math.min(mapEl.clientWidth / box.w, mapEl.clientHeight / box.h)));
  }
  // A new line opens whole when its quests stay large enough to read; a larger line opens
  // at a readable size, on the quest that Astra completed last.
  function openingView() {
    const fit = fitUnit();
    if (fit == null) return;
    const least = matchMedia('(pointer: coarse)').matches ? 1.5 : 1.25;
    canvas.style.setProperty('--u', unit = Math.min(2, Math.max(fit, least)));
    const sized = rules.buttons(book, done(), line);
    const latest = sized.filter(q => done()[q.id]).sort((a, b) => done()[b.id][0] - done()[a.id][0])[0];
    const first = latest || sized.find(q => stateOf(q.id) === 'open') || sized[0];
    const [x, y] = centre(first);
    setUnit(unit, [x, y]);
  }

  // ---------------------------------------------------------------- list

  function drawList() {
    const sized = rules.buttons(book, done(), line);
    const rows = sized.map(q => ({ id: q.id, quest: book.quests[q.id], state: stateOf(q.id), at: done()[q.id] ? done()[q.id][0] : null }))
      .sort((a, b) => ORDER[a.state] - ORDER[b.state] || (b.at ?? 0) - (a.at ?? 0) || a.quest.name.localeCompare(b.quest.name));
    listEl.replaceChildren(...rows.map(row => el('li', null,
      el('button', { type: 'button', class: 'qb-row', 'data-quest': row.id, 'data-state': row.state },
        el('span', { class: 'qb-key', 'data-state': row.state, 'aria-hidden': 'true' }),
        el('span', { class: 'qb-row-name', text: row.quest.name }),
        el('span', { class: 'qb-row-meta' }, row.at != null ? el('span', { class: 'played', text: played(row.at) }) : null, row.at != null && row.state === 'unclaimed' ? ' · reward not claimed' : row.at == null ? STATE[row.state] : null)))));
  }

  function showLine(next, { focus = null, hash = true } = {}) {
    line = next;
    titleEl.textContent = line.name;
    descEl.replaceChildren(formatted(line.desc));
    drawTabs();
    // On a narrow screen the lines are one row: keep the line on screen in sight.
    const tab = root.querySelector('.qb-line[aria-pressed="true"]');
    const strip = tab && tab.parentElement;
    if (strip && strip.scrollWidth > strip.clientWidth) strip.scrollLeft = tab.offsetLeft - strip.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
    drawMap();
    drawList();
    const sized = rules.buttons(book, done(), line);
    statusEl.textContent = `${sized.filter(q => done()[q.id]).length} of ${sized.length} quests in this line are complete.`;
    applyView();
    if (view === 'map') {
      openingView();
      if (focus != null) { const q = line.quests.find(e => e.id === focus); if (q) scrollTo(...centre(q)); }
    }
    if (hash) history.replaceState(null, '', `#line-${line.id}`);
  }

  function applyView() {
    mapEl.hidden = view !== 'map';
    listEl.hidden = view !== 'list';
    zoomGroup.hidden = view !== 'map';
    for (const button of root.querySelectorAll('[data-view]')) button.setAttribute('aria-pressed', String(button.dataset.view === view));
  }

  // ---------------------------------------------------------------- quest page

  const itemName = item => item.name || `${item.id}${item.d ? `:${item.d}` : ''}`;
  function itemRow(item, have) {
    return el('li', null, el('span', { class: 'qb-n', text: `${number(item.n)} ×` }), ' ', itemName(item),
      item.ore ? el('span', { class: 'qb-note', text: ` (or another ${item.ore})` }) : null,
      have != null && have > 0 ? el('span', { class: 'qb-note', text: ` · the book counted ${number(have)}` }) : null);
  }
  function questLink(id) {
    const quest = book.quests[id];
    if (!inBook(id) || !lineOf(id)) return el('span', { class: 'qb-note', text: quest && !quest.off ? `${quest.name} (not shown yet)` : 'A step that the book does not show' });
    const state = stateOf(id);
    return el('button', { type: 'button', class: 'qb-link', 'data-quest': id },
      el('span', { class: 'qb-key', 'data-state': state, 'aria-hidden': 'true' }), el('span', { text: quest.name }), el('span', { class: 'qb-visually-hidden', text: `: ${STATE[state]}` }));
  }

  function showQuest(id, { hash = true } = {}) {
    const quest = book.quests[id];
    if (!quest) return;
    const state = stateOf(id);
    const entry = done()[id];
    const home = lineOf(id);
    const doneTasks = new Set(entry ? quest.tasks.map((_, i) => i) : (progress.tasks[id] || []));
    const have = progress.have[id] || {};

    const status = entry
      ? `Complete at ${played(entry[0])} played.${quest.rewards.length ? (entry[1] ? ' The reward is claimed.' : ' The reward is not claimed.') : ''}`
      : state === 'open' ? 'Open. Not complete.' : 'Locked. The quests before it are not complete.';

    const tasks = quest.tasks.map((task, i) => {
      const mark = doneTasks.has(i) ? el('span', { class: 'qb-done', text: 'Done' }) : null;
      if (task.kind === 'retrieval') return el('li', { class: 'qb-task' }, el('p', null, task.consume ? 'Give these items' : 'Have these items', mark ? [' · ', mark] : null),
        el('ul', { class: 'qb-items' }, task.items.map((item, k) => itemRow(item, doneTasks.has(i) ? null : (have[i] || [])[k]))));
      if (task.kind === 'fluid') return el('li', { class: 'qb-task' }, el('p', null, 'Have these fluids', mark ? [' · ', mark] : null),
        el('ul', { class: 'qb-items' }, task.fluids.map(f => el('li', null, el('span', { class: 'qb-n', text: `${number(f.mb)} mB` }), ' ', f.name || f.id))));
      return el('li', { class: 'qb-task' }, el('p', null, 'Tick the box of this quest in the book', mark ? [' · ', mark] : null));
    });
    const rewards = quest.rewards.map(reward => el('li', { class: 'qb-task' },
      reward.kind === 'choice' ? el('p', { text: 'One of these items' }) : null,
      el('ul', { class: 'qb-items' }, reward.items.map(item => itemRow(item)))));
    const pre = quest.pre || [];
    const next = (leadsTo.get(Number(id)) || []).filter(n => inBook(n) && lineOf(n));

    dialogBody.replaceChildren(...[
      el('p', { class: 'qb-kicker' }, home ? home.name : 'Quest book', ' · ', el('span', { class: 'qb-state', 'data-state': state, text: STATE[state] })),
      el('h2', { id: 'quest-title', text: quest.name }),
      el('p', { class: 'qb-quest-status', text: status }),
      quest.repeat != null ? el('p', { class: 'qb-quest-status', text: `This quest can be done again after ${played(quest.repeat)} of play.` }) : null,
      el('div', { class: 'qb-desc' }, formatted(quest.desc)),
      tasks.length ? el('section', null, el('h3', { text: tasks.length > 1 ? (quest.taskLogic === 'OR' ? 'Tasks (one of these)' : 'Tasks') : 'Task' }), el('ol', { class: 'qb-tasks' }, tasks)) : null,
      rewards.length ? el('section', null, el('h3', { text: 'Reward' }), el('ul', { class: 'qb-tasks' }, rewards)) : null,
      pre.length ? el('section', null, el('h3', { text: pre.length > 1 ? (quest.logic === 'OR' ? 'Needs one of these quests' : 'Needs these quests') : 'Needs this quest' }), el('ul', { class: 'qb-links' }, pre.map(p => el('li', null, questLink(p))))) : null,
      next.length ? el('section', null, el('h3', { text: 'Leads to' }), el('ul', { class: 'qb-links' }, next.map(n => el('li', null, questLink(n))))) : null,
    ].filter(Boolean));
    dialog.dataset.quest = id;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (hash) history.replaceState(null, '', `#quest-${id}`);
  }

  // A quest in another line: go to that line first, so that the map behind the page fits.
  function openQuest(id) {
    id = Number(id);
    const home = lineOf(id);
    if (home && home !== line) showLine(home, { focus: id, hash: false });
    showQuest(id);
    for (const node of canvas.querySelectorAll('.qb-node[data-current]')) delete node.dataset.current;
    const node = canvas.querySelector(`.qb-node[data-quest="${id}"]`);
    if (node) node.dataset.current = '';
  }

  // ---------------------------------------------------------------- input

  root.addEventListener('click', event => {
    const tab = event.target.closest('.qb-line');
    if (tab) { const next = book && book.lines.find(l => String(l.id) === tab.dataset.line); if (next) showLine(next); return; }
    const viewButton = event.target.closest('[data-view]');
    if (viewButton && book) {
      view = viewButton.dataset.view;
      applyView();
      if (view === 'map') openingView();
      return;
    }
    const zoom = event.target.closest('[data-zoom]');
    if (zoom && book) {
      if (zoom.dataset.zoom === 'fit') { const fit = fitUnit(); if (fit != null) setUnit(fit, box ? [box.minX + box.w / 2, box.minY + box.h / 2] : null); }
      else {
        const up = zoom.dataset.zoom === 'in';
        const next = up ? STEPS.find(s => s > unit + 1e-3) : [...STEPS].reverse().find(s => s < unit - 1e-3);
        if (next) setUnit(next);
      }
      return;
    }
    const quest = event.target.closest('[data-quest]');
    if (quest && book && !dragged) openQuest(quest.dataset.quest);
  });
  dialog.addEventListener('click', event => {
    const quest = event.target.closest('[data-quest]');
    if (quest && book) openQuest(quest.dataset.quest);
  });
  dialog.addEventListener('close', () => {
    for (const node of canvas.querySelectorAll('.qb-node[data-current]')) delete node.dataset.current;
    if (line) history.replaceState(null, '', `#line-${line.id}`);
  });

  // A mouse drags the map. A finger scrolls it without help.
  let drag = null, dragged = false;
  mapEl.addEventListener('pointerdown', event => {
    dragged = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { x: event.clientX, y: event.clientY, left: mapEl.scrollLeft, top: mapEl.scrollTop };
  });
  addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!dragged && Math.hypot(dx, dy) < 5) return;
    dragged = true;
    mapEl.classList.add('is-dragging');
    mapEl.scrollLeft = drag.left - dx;
    mapEl.scrollTop = drag.top - dy;
  });
  addEventListener('pointerup', () => {
    if (!drag) return;
    drag = null;
    mapEl.classList.remove('is-dragging');
    // The click that ends a drag must not open a quest.
    setTimeout(() => { dragged = false; }, 0);
  });

  function fromHash() {
    const match = /^#(quest|line)-(\d+)$/.exec(location.hash);
    if (!match || !book) return false;
    const id = Number(match[2]);
    if (match[1] === 'line') { const next = book.lines.find(l => l.id === id); if (next && rules.buttons(book, done(), next).length) { showLine(next); return true; } return false; }
    if (!inBook(id) || !lineOf(id)) return false;
    openQuest(id);
    return true;
  }
  addEventListener('hashchange', () => { fromHash(); });

  // ---------------------------------------------------------------- start

  async function start() {
    try {
      const [bookResponse, progressResponse] = await Promise.all([fetch(root.dataset.book), fetch(root.dataset.progress, { cache: 'no-cache' })]);
      if (!bookResponse.ok) throw new Error(`HTTP ${bookResponse.status}`);
      book = await bookResponse.json();
      if (progressResponse.ok) progress = { ticks: null, done: {}, tasks: {}, have: {}, ...(await progressResponse.json()) };
    } catch {
      statusEl.textContent = 'The quest book did not load. Load the page again.';
      return;
    }
    for (const [id, quest] of Object.entries(book.quests)) for (const p of quest.pre || []) {
      if (!leadsTo.has(p)) leadsTo.set(p, []);
      leadsTo.get(p).push(Number(id));
    }
    root.dataset.ready = '';
    drawSummary();
    if (fromHash()) return;
    // Open on the line where Astra completed a quest last, or on the first line.
    const latest = Object.entries(done()).filter(([id]) => inBook(id) && lineOf(Number(id))).sort((a, b) => b[1][0] - a[1][0])[0];
    const first = (latest && lineOf(Number(latest[0]))) || book.lines.find(l => rules.buttons(book, done(), l).length);
    if (first) showLine(first, { hash: false });
    else statusEl.textContent = 'The quest book has no quests to show.';
  }
  start();
})();
