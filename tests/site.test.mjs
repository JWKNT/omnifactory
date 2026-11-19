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
