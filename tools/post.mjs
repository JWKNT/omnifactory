// Files the notes that Astra sent. Astra's harness (../greg) puts each sent note in its
// outbox as one JSON file with the time played. This tool copies them into data/, rebuilds
// the pages and says what it did. It does not commit or push: a reviewer reads the change first.
//
//   node tools/post.mjs                       file every waiting note
//   node tools/post.mjs --from <outbox>       use another outbox folder
//   node tools/post.mjs --release <file>      file one held note after review (a path in outbox/held)
//
// A note that seems to hold something private is not filed. It moves to outbox/held with the
// reason, and stays there until a reviewer edits or approves it and releases it.
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const outbox = resolve(flag('--from') || join(root, '..', 'greg', 'outbox'));
const release = flag('--release');
const LIMIT = 64 * 1024;

const indexPath = join(root, 'data', 'notes.json');
const index = JSON.parse(await readFile(indexPath, 'utf8'));
const byName = new Map(index.notes.map(n => [n.name, n]));

// A note name is a path inside the notes folder. Nothing else may be written.
const safeName = name => typeof name === 'string' && /^[A-Za-z0-9][A-Za-z0-9 ._\-/]*\.(md|txt|json)$/.test(name) && !name.includes('..') && !name.includes('//') && name.length <= 120;

// The harness's own secret, if the game is running: it must never be published.
let bridgeToken = null;
try { bridgeToken = JSON.parse(await readFile(join(root, '..', 'greg', 'instance', 'gregbridge.json'), 'utf8')).token || null; } catch {}

function privateThings(text) {
  const found = [];
  if (/(\/Users\/|\/home\/|[A-Za-z]:\\Users\\)[^\s/\\]+/.test(text)) found.push('a home folder path (it names the account on the computer)');
  if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text)) found.push('an email address');
  if (/(api[_-]?key|token|passw(or)?d|secret|bearer)\s*[:=]\s*["']?[^\s"']{8,}/i.test(text)) found.push('what looks like a credential');
  if (/\b[0-9a-f]{40,}\b/i.test(text) || /\b[A-Za-z0-9+/_-]{48,}={0,2}\b/.test(text)) found.push('a long key-like string');
  if (bridgeToken && String(bridgeToken).length >= 8 && text.includes(bridgeToken)) found.push('the secret of the game bridge');
  return found;
}

async function waiting() {
  if (release) return [resolve(release)];
  if (!existsSync(outbox)) return [];
  return (await readdir(outbox)).filter(f => f.endsWith('.json') && f !== 'sent.json').sort().map(f => join(outbox, f));
}

const report = { outbox, posted: [], withdrawn: [], held: [], rejected: [] };
for (const file of await waiting()) {
  let entry;
  try { entry = JSON.parse(await readFile(file, 'utf8')); } catch (error) { report.rejected.push({ file: basename(file), why: `not JSON: ${error.message}` }); continue; }
  const problem = !safeName(entry.name) ? 'the note name is not a plain path ending in .md, .txt or .json'
    : !Number.isInteger(entry.played_ticks) || entry.played_ticks < 0 ? 'no time played'
    : entry.removed ? null
    : typeof entry.body !== 'string' ? 'no text'
    : Buffer.byteLength(entry.body) > LIMIT ? 'larger than 64 KB'
    : null;
  if (problem) {
    await mkdir(join(outbox, 'rejected'), { recursive: true });
    await rename(file, join(outbox, 'rejected', basename(file)));
    report.rejected.push({ file: basename(file), note: entry.name, why: problem });
    continue;
  }
  if (entry.removed) {
    if (byName.delete(entry.name)) {
      await rm(join(root, 'data', 'notes', entry.name), { force: true });
      report.withdrawn.push(entry.name);
    }
  } else {
    const found = release ? [] : privateThings(`${entry.name}\n${entry.body}`);
    if (found.length) {
      await mkdir(join(outbox, 'held'), { recursive: true });
      const held = join(outbox, 'held', basename(file));
      await writeFile(held, JSON.stringify({ ...entry, held_why: found }, null, 1));
      await rm(file);
      report.held.push({ file: held, note: entry.name, why: found });
      continue;
    }
    const target = join(root, 'data', 'notes', entry.name);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, entry.body);
    const before = byName.get(entry.name);
    byName.set(entry.name, {
      name: entry.name,
      first_ticks: before ? before.first_ticks : entry.played_ticks,
      ticks: entry.played_ticks,
      sent_at: entry.sent_at || new Date().toISOString(),
      versions: (before?.versions || 0) + 1,
      bytes: Buffer.byteLength(entry.body),
    });
    report.posted.push({ note: entry.name, played: entry.played || `${entry.played_ticks} ticks`, version: byName.get(entry.name).versions });
  }
  await mkdir(join(outbox, 'posted'), { recursive: true });
  await rename(file, join(outbox, 'posted', basename(file)));
}

index.notes = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
await writeFile(indexPath, JSON.stringify(index, null, 2) + '\n');
const build = spawnSync(process.execPath, [join(root, 'build.mjs')], { cwd: root, encoding: 'utf8' });
report.build = build.status === 0 ? build.stdout.trim() : `FAILED: ${build.stderr || build.stdout}`;
report.changed = report.posted.length + report.withdrawn.length > 0;
console.log(JSON.stringify(report, null, 2));
process.exit(build.status === 0 ? 0 : 1);
