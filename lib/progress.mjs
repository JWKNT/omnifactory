// Astra's standing in the quest book, read from the saved world. The game's quest mod keeps a
// file for each player with the quests that are complete and the clock time of each one. The
// page shows time played, so each clock time becomes world ticks here.
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';

// The save keeps NBT written as JSON: each key carries its tag type ("questID:3").
const plain = value => Array.isArray(value) ? value.map(plain)
  : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k.replace(/:\d+$/, ''), plain(v)]))
  : value;

// A small reader for the world's level.dat (gzip NBT). It keeps only what a path needs.
function nbt(buffer) {
  let at = 0;
  const text = () => { const n = buffer.readUInt16BE(at); at += 2; const s = buffer.toString('utf8', at, at + n); at += n; return s; };
  const payload = type => {
    switch (type) {
      case 1: return buffer.readInt8(at++);
      case 2: at += 2; return buffer.readInt16BE(at - 2);
      case 3: at += 4; return buffer.readInt32BE(at - 4);
      case 4: at += 8; return Number(buffer.readBigInt64BE(at - 8));
      case 5: at += 4; return buffer.readFloatBE(at - 4);
      case 6: at += 8; return buffer.readDoubleBE(at - 8);
      case 7: { const n = buffer.readInt32BE(at); at += 4 + n; return null; }
      case 8: return text();
      case 9: { const inner = buffer.readInt8(at++); const n = buffer.readInt32BE(at); at += 4; const list = []; for (let i = 0; i < n; i++) list.push(payload(inner)); return list; }
      case 10: { const out = {}; for (;;) { const t = buffer.readInt8(at++); if (t === 0) return out; const name = text(); out[name] = payload(t); } }
      case 11: { const n = buffer.readInt32BE(at); at += 4 + 4 * n; return null; }
      case 12: { const n = buffer.readInt32BE(at); at += 4 + 8 * n; return null; }
      default: throw new Error(`unknown NBT tag ${type}`);
    }
  };
  const type = buffer.readInt8(at++);
  text();
  return payload(type);
}

// Pairs of clock time and world ticks that are known to be true at the same moment: the
// world's last save, and every note Astra sent.
export async function timeSamples(greg, world) {
  const samples = [];
  try {
    const data = nbt(gunzipSync(await readFile(join(greg, 'instance', 'saves', world, 'level.dat')))).Data;
    if (Number.isFinite(data?.Time) && Number.isFinite(data?.LastPlayed)) samples.push({ ms: data.LastPlayed, ticks: data.Time });
  } catch {}
  for (const folder of ['outbox', join('outbox', 'posted'), join('outbox', 'held')]) {
    const dir = join(greg, folder);
    if (!existsSync(dir)) continue;
    for (const file of await readdir(dir)) {
      if (!file.endsWith('.json') || file === 'sent.json') continue;
      try {
        const entry = JSON.parse(await readFile(join(dir, file), 'utf8'));
        const ms = Date.parse(String(entry.sent_at).replace(/([+-]\d\d)(\d\d)$/, '$1:$2'));
        if (Number.isInteger(entry.played_ticks) && Number.isFinite(ms)) samples.push({ ms, ticks: entry.played_ticks });
      } catch {}
    }
  }
  return samples.sort((a, b) => a.ms - b.ms || a.ticks - b.ticks);
}

// World ticks at a clock time. The world runs 20 ticks in each second while it is open, so
// the nearest sample after the moment gives the answer; the sample before it is the floor.
export function ticksAt(samples, ms) {
  if (!samples.length) return null;
  let before = null, after = null;
  for (const s of samples) { if (s.ms <= ms) before = s; else { after = s; break; } }
  let ticks = after ? after.ticks - Math.round((after.ms - ms) / 50) : before.ticks + Math.round((ms - before.ms) / 50);
  if (before) ticks = Math.max(ticks, before.ticks);
  if (after) ticks = Math.min(ticks, after.ticks);
  return Math.max(0, ticks);
}

// Reads the save and returns the record for the page. A quest that an earlier record has
// keeps the time it got then, so one quest never shows two different times.
export async function readProgress({ greg, world = 'Astra', previous = null }) {
  const dir = join(greg, 'instance', 'saves', world, 'betterquesting', 'QuestProgress');
  if (!existsSync(dir)) return null;
  let best = null;
  for (const file of (await readdir(dir)).filter(f => f.endsWith('.json'))) {
    const data = plain(JSON.parse(await readFile(join(dir, file), 'utf8'))).questProgress || {};
    const done = Object.values(data).filter(q => Object.keys(q.completed || {}).length).length;
    if (!best || done > best.done) best = { data, done };
  }
  if (!best) return null;
  const samples = await timeSamples(greg, world);
  const now = samples.length ? Math.max(...samples.map(s => s.ticks)) : previous?.ticks ?? 0;
  const record = { ticks: now, done: {}, tasks: {}, have: {} };
  for (const q of Object.values(best.data).sort((a, b) => a.questID - b.questID)) {
    const id = String(q.questID);
    const complete = Object.values(q.completed || {})[0];
    const tasks = Object.values(q.tasks || {}).sort((a, b) => a.index - b.index);
    if (complete) {
      const kept = previous?.done?.[id];
      const ticks = kept ? kept[0] : ticksAt(samples, complete.timestamp) ?? now;
      record.done[id] = [ticks, complete.claimed ? 1 : 0];
      continue;
    }
    const finished = tasks.filter(t => Object.keys(t.completeUsers || {}).length).map(t => t.index);
    if (finished.length) record.tasks[id] = finished;
    // For a quest that is not complete: how many of each wanted item the book has counted.
    const counts = {};
    for (const t of tasks) {
      const data = Object.values(t.userProgress || {})[0]?.data;
      const list = data && typeof data === 'object' ? Object.entries(data).sort((a, b) => Number(a[0]) - Number(b[0])).map(([, n]) => Number(n) || 0) : null;
      if (list?.some(n => n > 0) && !finished.includes(t.index)) counts[t.index] = list;
    }
    if (Object.keys(counts).length) record.have[id] = counts;
  }
  return record;
}

// What a reader would see change: the quests and tasks that are complete, and the claims.
export const standing = record => JSON.stringify([record?.done ? Object.entries(record.done).map(([id, [, claimed]]) => [id, claimed]) : [], record?.tasks || {}]);

// Reads the save and writes data/quests/progress.json when the standing changed (or always,
// with force). Returns what happened, for the report.
export async function refreshProgress({ root, greg, world = 'Astra', force = false, write = true }) {
  const target = join(root, 'data', 'quests', 'progress.json');
  const previous = existsSync(target) ? JSON.parse(await readFile(target, 'utf8')) : null;
  const record = await readProgress({ greg, world, previous });
  if (!record) return { found: false, changed: false, done: previous ? Object.keys(previous.done).length : 0, newly: [] };
  const changed = standing(record) !== standing(previous);
  const newly = Object.keys(record.done).filter(id => !previous?.done?.[id]).sort((a, b) => record.done[a][0] - record.done[b][0] || a - b).map(Number);
  if (write && (changed || force || !previous)) {
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, JSON.stringify(record) + '\n');
  }
  return { found: true, changed, done: Object.keys(record.done).length, newly, ticks: record.ticks };
}
