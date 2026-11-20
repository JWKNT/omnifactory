import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { buildSite, loadNote } from '../lib/pages.mjs';
import { played } from '../lib/site.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const note = (name, ticks, source, more = {}) => loadNote({ name, first_ticks: ticks, ticks, sent_at: '2026-11-19T12:00:00-0500', versions: 1, bytes: source.length, ...more }, source);

test('the time played is hours and minutes of game ticks', () => {
  assert.equal(played(0), '0 h 00 min');
  assert.equal(played(1199), '0 h 00 min');
  assert.equal(played(72000 + 1200 * 5), '1 h 05 min');
  assert.equal(played(72000 * 1234), '1,234 h 00 min');
});

test('an empty record still makes a page with a link preview', () => {
  const files = buildSite({ notes: [] });
  const html = files.get('index.html');
  assert.equal(files.size, 1);
  assert.match(html, /Astra has not sent a note yet\./);
  assert.match(html, /<meta property="og:image" content="https:\/\/jehlp\.net\/site-theme\/v2\/cards\/omnifactory\.png">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/jehlp\.net\/omnifactory\/">/);
});

test('notes are listed newest first, each with its time played and its own page', () => {
  const files = buildSite({ notes: [
    note('power.md', 72000, '# Power plan\n\nSteam first. See [the base](base.md) and [a script](../scripts/x.py).'),
    note('base.md', 144000, '# Base layout\n\n<script>alert(1)</script>\n\n| a | b |\n|---|---|\n| 1 | 2 |', { first_ticks: 36000 }),
    note('plans/lv.json', 108000, '{"goal":"Reach the low voltage tier with a steady supply"}'),
  ] });
  const html = files.get('index.html');
  const order = [...html.matchAll(/<details class="listing" id="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(order, ['base.md', 'plans/lv.json', 'power.md']);
  assert.match(html, /<span class="played">2 h 00 min<\/span>/);
  assert.match(html, /data-src="notes\/plans\/lv\.json\.html"/);
  const base = files.get('notes/base.md.html');
  assert.match(base, /2 h 00 min<\/span> played · first sent at 0 h 30 min/);
  assert.doesNotMatch(base, /<script>alert/, 'HTML in a note is shown as text');
  assert.match(base, /class="table-scroll"/);
  const power = files.get('notes/power.md.html');
  assert.match(power, /<a href="\/omnifactory\/notes\/base\.md\.html">the base<\/a>/, 'a link to another note works');
  assert.doesNotMatch(power, /scripts\/x\.py"/, 'a link to a private file stays plain text');
  for (const [path, content] of files) if (path.endsWith('.html')) {
    assert.match(content, /<meta property="og:description" content="[^"]{25,220}">/, `${path} has a preview description`);
  }
});

test('posting files waiting notes, holds private ones and withdraws deleted ones', async () => {
  const work = await mkdtemp(join(tmpdir(), 'omni-'));
  const site = join(work, 'omnifactory');
  await cp(root, site, { recursive: true, filter: source => !source.includes('/.git') && !/\/notes\/.*\.html$/.test(source) });
  await writeFile(join(site, 'data', 'notes.json'), '{\n  "notes": []\n}\n');
  const outbox = join(work, 'outbox');
  await mkdir(outbox);
  const send = (file, entry) => writeFile(join(outbox, file), JSON.stringify(entry));
  await send('1-a.json', { name: 'a.md', played_ticks: 24000, played: '0 h 20 min', sent_at: '2026-11-19T12:00:00-0500', body: '# A\n\nFirst.' });
  await send('2-b.json', { name: 'b.md', played_ticks: 26000, played: '0 h 21 min', sent_at: '2026-11-19T12:01:00-0500', body: 'see /Users/someone/Desktop/thing' });
  await send('3-bad.json', { name: '../escape.md', played_ticks: 1, body: 'x' });
  await writeFile(join(outbox, 'sent.json'), '{}');
  const run = (...more) => spawnSync(process.execPath, [join(site, 'tools', 'post.mjs'), '--from', outbox, ...more], { encoding: 'utf8' });
  let out = JSON.parse(run().stdout);
  assert.deepEqual(out.posted.map(p => p.note), ['a.md']);
  assert.equal(out.held.length, 1);
  assert.match(out.held[0].why[0], /home folder/);
  assert.equal(out.rejected.length, 1);
  assert.ok(existsSync(join(site, 'notes', 'a.md.html')));
  assert.ok(!existsSync(join(work, 'escape.md')) && !existsSync(join(site, 'data', 'escape.md')));
  assert.deepEqual((await readdir(outbox)).sort(), ['held', 'posted', 'rejected', 'sent.json']);

  // A second version keeps the first time; a release files a held note; a removal withdraws one.
  await send('4-a.json', { name: 'a.md', played_ticks: 48000, played: '0 h 40 min', sent_at: '2026-11-19T12:20:00-0500', body: '# A\n\nSecond.' });
  out = JSON.parse(run().stdout);
  let index = JSON.parse(await readFile(join(site, 'data', 'notes.json'), 'utf8'));
  assert.deepEqual(index.notes.map(n => [n.name, n.first_ticks, n.ticks, n.versions]), [['a.md', 24000, 48000, 2]]);
  out = JSON.parse(run('--release', out.held?.[0]?.file || join(outbox, 'held', '2-b.json')).stdout);
  assert.deepEqual(out.posted.map(p => p.note), ['b.md']);
  await send('5-a.json', { name: 'a.md', played_ticks: 50000, removed: true });
  out = JSON.parse(run().stdout);
  assert.deepEqual(out.withdrawn, ['a.md']);
  index = JSON.parse(await readFile(join(site, 'data', 'notes.json'), 'utf8'));
  assert.deepEqual(index.notes.map(n => n.name), ['b.md']);
  assert.ok(!existsSync(join(site, 'notes', 'a.md.html')), 'the page of a withdrawn note is removed');
});

// ---------------------------------------------------------------- quest book

const { questPage, rules } = await import('../lib/quests.mjs');
const { ticksAt, readProgress, refreshProgress } = await import('../lib/progress.mjs');

const quest = (name, more = {}) => ({ name, desc: '', icon: 'minecraft:stone@0', vis: 'ALWAYS', tasks: [{ kind: 'checkbox' }], rewards: [], ...more });
const smallBook = {
  pack: 'test', lines: [{ id: 1, name: 'First line', desc: 'A §6line§r.', icon: 'minecraft:stone@0', quests: [
    { id: 1, x: 0, y: 0, w: 24, h: 24 }, { id: 2, x: 48, y: 0, w: 24, h: 24 }, { id: 3, x: 96, y: 0, w: 24, h: 24 },
    { id: 4, x: 48, y: 48, w: 0, h: 0 }, { id: 5, x: 96, y: 48, w: 24, h: 24 }, { id: 6, x: 144, y: 48, w: 24, h: 24 } ] }],
  quests: {
    1: quest('Start', { rewards: [{ kind: 'item', items: [{ id: 'minecraft:stone', n: 1 }] }] }),
    2: quest('Second', { pre: [1] }),
    3: quest('Third', { pre: [2], vis: 'NORMAL' }),
    4: quest('Either', { pre: [1, 2], logic: 'OR', tasks: [] }),
    5: quest('After either', { pre: [4], vis: 'UNLOCKED' }),
    6: quest('Chain end', { pre: [5], vis: 'CHAIN' }),
  },
};

test('the book rules give the game\'s states and show what the game shows', () => {
  const none = {};
  assert.equal(rules.stateOf(smallBook, none, 1), 'open');
  assert.equal(rules.stateOf(smallBook, none, 2), 'locked');
  assert.equal(rules.shown(smallBook, none, 3), false, 'a NORMAL quest waits until the quest before it is open');
  assert.equal(rules.shown(smallBook, none, 5), false, 'an UNLOCKED quest stays out of sight until it is open');
  assert.equal(rules.shown(smallBook, none, 6), false, 'a CHAIN quest follows the quest before it');
  const some = { 1: [1200, 0], 4: [1300, 1] };
  assert.equal(rules.stateOf(smallBook, some, 1), 'unclaimed', 'complete with a reward that waits');
  assert.equal(rules.stateOf(smallBook, some, 4), 'complete');
  assert.equal(rules.stateOf(smallBook, some, 2), 'open');
  assert.equal(rules.shown(smallBook, some, 3), true);
  assert.equal(rules.shown(smallBook, some, 5), true, 'one complete requirement opens an OR quest');
  assert.equal(rules.shown(smallBook, some, 6), true);
  assert.deepEqual(rules.summary(smallBook, { ticks: 2400, done: some }), { total: 5, complete: 1, ticks: 2400 }, 'a junction is not a quest to count');
});

test('a clock time becomes time played from the nearest sample after it', () => {
  const samples = [{ ms: 100_000, ticks: 2000 }, { ms: 160_000, ticks: 3200 }, { ms: 1_000_000, ticks: 3600 }];
  assert.equal(ticksAt(samples, 130_000), 2600);
  assert.equal(ticksAt(samples, 170_000), 3200, 'the world was closed: the sample before is the floor');
  assert.equal(ticksAt(samples, 999_000), 3580);
  assert.equal(ticksAt(samples, 1_010_000), 3800, 'after the last sample the world still runs');
  assert.equal(ticksAt(samples, 1_000), 20);
  assert.equal(ticksAt([], 5), null);
});

test('the progress record comes from the saved world and keeps a time once given', async () => {
  const work = await mkdtemp(join(tmpdir(), 'omni-quests-'));
  const greg = join(work, 'greg');
  const save = join(greg, 'instance', 'saves', 'Astra', 'betterquesting', 'QuestProgress');
  await mkdir(save, { recursive: true });
  await mkdir(join(greg, 'outbox', 'posted'), { recursive: true });
  const who = '00000000-0000-0000-0000-000000000000';
  const at = Date.parse('2026-11-19T12:10:00-05:00');
  const entry = (id, complete, tasks) => ({ 'questID:3': id, 'completed:9': complete ? { '0:10': { 'claimed:1': complete.claimed, 'timestamp:4': complete.at, 'uuid:8': who } } : {}, 'tasks:9': tasks });
  const task = (index, done, data) => ({ 'index:3': index, 'taskID:8': 'bq_standard:retrieval', 'completeUsers:9': done ? { '0:8': who } : {}, 'userProgress:9': data ? { '0:10': { 'uuid:8': who, 'data:9': data } } : {} });
  await writeFile(join(save, `${who}.json`), JSON.stringify({ 'questProgress:9': {
    '0:10': entry(1, { claimed: 1, at }, { '0:10': task(0, true) }),
    '1:10': entry(2, null, { '0:10': task(0, true), '1:10': task(1, false, { '0:3': 3, '1:3': 0 }) }),
    '2:10': entry(3, null, { '0:10': task(0, false) }),
  } }));
  const note = (file, time, ticks) => writeFile(join(greg, 'outbox', 'posted', file), JSON.stringify({ name: 'a.md', sent_at: time, played_ticks: ticks, body: 'x' }));
  await note('1.json', '2026-11-19T12:00:00-0500', 12000);
  await note('2.json', '2026-11-19T12:20:00-0500', 36000);

  const record = await readProgress({ greg });
  assert.deepEqual(record.done, { 1: [24000, 1] }, 'ten minutes before the second note');
  assert.deepEqual(record.tasks, { 2: [0] });
  assert.deepEqual(record.have, { 2: { 1: [3, 0] } });
  assert.equal(record.ticks, 36000);
  assert.doesNotMatch(JSON.stringify(record), /0000-0000/, 'the player id stays out of the record');

  const site = join(work, 'site');
  let result = await refreshProgress({ root: site, greg });
  assert.equal(result.changed, true);
  assert.deepEqual(result.newly, [1]);
  // A later note moves the clock; the quest keeps its time and the standing is the same.
  await note('3.json', '2026-11-19T12:40:00-0500', 60000);
  result = await refreshProgress({ root: site, greg });
  assert.equal(result.changed, false);
  assert.equal(JSON.parse(await readFile(join(site, 'data', 'quests', 'progress.json'), 'utf8')).ticks, 36000, 'no new standing, no new file');
  result = await refreshProgress({ root: site, greg, force: true });
  const written = JSON.parse(await readFile(join(site, 'data', 'quests', 'progress.json'), 'utf8'));
  assert.equal(written.ticks, 60000);
  assert.deepEqual(written.done, { 1: [24000, 1] });
});

test('the quest book page has a tab for each line and a link preview', () => {
  const html = questPage({ book: smallBook });
  assert.match(html, /<button type="button" class="qb-line" data-line="1" aria-pressed="false"><span class="qb-line-pic" data-pic aria-hidden="true"><\/span><span class="qb-line-name">First line<\/span>/);
  assert.doesNotMatch(html, /quests were complete/, 'the shell has no progress numbers; the script adds them');
  const index = buildSite({ notes: [], quests: rules.summary(smallBook, { ticks: 72000, done: { 1: [1200, 1] } }) }).get('index.html');
  assert.match(index, /<a href="\/omnifactory\/quests\/">Quest book<\/a>: 1 of 3 quests complete at <span class="played">1 h 00 min<\/span> played\./, 'two quests are out of sight until they are open');
  assert.match(html, /<link rel="canonical" href="https:\/\/jehlp\.net\/omnifactory\/quests\/">/);
  assert.match(html, /<meta property="og:description" content="[^"]{25,220}">/);
  assert.match(html, /assets\/quest-rules\.js\?v=[^"]+" defer><\/script>\s*<script src="\/omnifactory\/assets\/quests\.js/);
  assert.match(html, /<a href="\/omnifactory\/">Notes<\/a>/);
  assert.doesNotMatch(html, /<a href="\/omnifactory\/quests\/">Quests<\/a>/, 'a page does not link to itself');
});
