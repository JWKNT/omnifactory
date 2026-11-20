// Makes the quest book data for the page from the pack's own files. The pack does not change
// during a run, so this runs once, and again only after a pack update.
//
//   node tools/questbook.mjs                 read the pack in ../greg/instance
//   node tools/questbook.mjs --pack <dir>    read another game folder
//
// It reads the Better Questing quest file and the pack's quest text, data/quests/names.json
// (the item names as the game shows them; make it with tools/quest-names.py) and
// data/quests/icons.json (the item pictures; tools/quest-icons.py, then tools/quest-sheet.mjs). It writes
// data/quests/book.json. The quest text and layout are the pack's work; see the page's credit.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const pack = resolve(flag('--pack') || join(root, '..', 'greg', 'instance'));

// The quest file is NBT written as JSON: each key carries its tag type ("name:8").
const plain = value => Array.isArray(value) ? value.map(plain)
  : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k.replace(/:\d+$/, ''), plain(v)]))
  : value;
const inOrder = object => Object.entries(object || {}).sort((a, b) => Number(a[0]) - Number(b[0]));

const quests = plain(JSON.parse(await readFile(join(pack, 'config', 'betterquesting', 'DefaultQuests.json'), 'utf8')));
const lang = new Map();
for (const line of (await readFile(join(pack, 'resources', 'questbook', 'lang', 'en_us.lang'), 'utf8')).split(/\r?\n/)) {
  const at = line.indexOf('=');
  if (at > 0 && !line.startsWith('#')) lang.set(line.slice(0, at), line.slice(at + 1));
}
// The game runs each text through a formatter: %n is a new line and %% is a percent sign.
const text = key => (lang.has(key) ? lang.get(key) : key).replace(/%n/g, '\n').replace(/%%/g, '%').replace(/[ \t]+$/gm, '').replace(/\n+$/, '');

// The icon sheet (tools/quest-icons.py, then tools/quest-sheet.mjs) numbers every item
// picture. Without a sheet the page shows two letters for a quest.
const sheetPath = join(root, 'data', 'quests', 'icons.json');
const sheet = existsSync(sheetPath) ? JSON.parse(await readFile(sheetPath, 'utf8')) : null;
const pictures = sheet?.map || { quests: {}, lines: {} };
const numbered = n => (Number.isInteger(n) && n >= 0 ? n : undefined);

const namesPath = join(root, 'data', 'quests', 'names.json');
const names = existsSync(namesPath) ? JSON.parse(await readFile(namesPath, 'utf8')) : { quests: {}, lines: {} };
const clean = name => typeof name === 'string' ? name.replace(/§./g, '').trim() : null;

// One item: its id and number, how many, and the name the game shows.
function item(raw, name, picture) {
  const out = { id: raw.id, n: raw.Count };
  if (numbered(picture) !== undefined) out.i = picture;
  if (raw.Damage) out.d = raw.Damage;
  if (raw.OreDict) out.ore = raw.OreDict;
  if (raw.tag) out.tag = true;
  const shown = clean(name);
  if (shown) out.name = shown;
  return out;
}
const book = { pack: quests.questSettings?.betterquesting?.pack_name || '', version: quests.questSettings?.betterquesting?.pack_version ?? null, lines: [], quests: {} };
if (sheet) {
  // The address changes with the picture file, so a new sheet is never read from a cache.
  const { createHash } = await import('node:crypto');
  const mark = createHash('sha1').update(await readFile(join(root, 'data', 'quests', 'icons.png'))).digest('hex').slice(0, 10);
  book.icons = { src: `icons.png?v=${mark}`, cell: sheet.cell, cols: sheet.cols, count: sheet.count };
}
const placed = new Set();
for (const [, line] of inOrder(quests.questLines).sort((a, b) => a[1].order - b[1].order)) {
  const props = line.properties.betterquesting;
  const entries = inOrder(line.quests).map(([, q]) => ({ id: q.id, x: q.x, y: q.y, w: q.sizeX, h: q.sizeY }));
  // A quest with no size is a junction: the book draws its lines but no button.
  for (const q of entries) placed.add(q.id);
  book.lines.push({ id: line.lineID, name: clean(text(props.name)), desc: text(props.desc), icon: numbered(pictures.lines?.[line.lineID]), iconName: clean(names.lines?.[line.lineID]) || undefined, quests: entries });
}

const byId = new Map(Object.values(quests.questDatabase).map(q => [q.questID, q]));
// A quest that no line shows can still be a requirement of one that a line shows. The page
// needs its logic to know what is open, so it comes along, marked as not in the book.
const wanted = [...placed];
const needed = new Set(placed);
for (let i = 0; i < wanted.length; i++) {
  for (const p of byId.get(wanted[i])?.preRequisites || []) if (byId.has(p) && !needed.has(p)) { needed.add(p); wanted.push(p); }
}
for (const id of wanted.sort((a, b) => a - b)) {
  const q = byId.get(id);
  if (!q) continue;
  const props = q.properties.betterquesting;
  const known = names.quests?.[id] || {};
  const drawn = pictures.quests?.[id] || {};
  const types = q.preRequisiteTypes || [];
  const out = {
    name: clean(text(props.name)),
    desc: text(props.desc),
    icon: numbered(drawn.icon),
    vis: props.visibility,
  };
  if (clean(known.icon)) out.iconName = clean(known.icon);
  if (!placed.has(id)) out.off = true;
  if (props.ismain) out.main = true;
  if (props.repeattime >= 0) out.repeat = props.repeattime;
  // A requirement that is not in the book any more does not count, as in the game.
  const pre = q.preRequisites.map((p, i) => ({ id: p, type: types[i] || 0 })).filter(p => byId.has(p.id));
  if (pre.length) out.pre = pre.map(p => p.id);
  if (pre.some(p => p.type)) out.preType = pre.map(p => p.type);
  if (props.questlogic !== 'AND') out.logic = props.questlogic;
  if (props.tasklogic !== 'AND') out.taskLogic = props.tasklogic;
  out.tasks = inOrder(q.tasks).map(([index, task]) => {
    const kind = task.taskID.replace(/^bq_standard:/, '');
    const shown = known.tasks?.[index] || [];
    if (kind === 'retrieval') return { kind, ...(task.consume ? { consume: true } : {}), items: inOrder(task.requiredItems).map(([, raw], i) => item(raw, shown[i], drawn.tasks?.[index]?.[i])) };
    if (kind === 'fluid') return { kind, fluids: inOrder(task.requiredFluids).map(([, raw], i) => ({ id: raw.FluidName, mb: raw.Amount, ...(clean(shown[i]) ? { name: clean(shown[i]) } : {}) })) };
    return { kind };
  });
  out.rewards = inOrder(q.rewards).map(([index, reward]) => {
    const kind = reward.rewardID.replace(/^bq_standard:/, '');
    const shown = known.rewards?.[index] || [];
    return { kind, items: inOrder(kind === 'choice' ? reward.choices : reward.rewards).map(([, raw], i) => item(raw, shown[i], drawn.rewards?.[index]?.[i])) };
  });
  book.quests[id] = out;
}
// A line keeps only the quests that are in the book.
for (const line of book.lines) line.quests = line.quests.filter(q => book.quests[q.id]);

await mkdir(join(root, 'data', 'quests'), { recursive: true });
const target = join(root, 'data', 'quests', 'book.json');
await writeFile(target, JSON.stringify(book) + '\n');
const named = Object.values(book.quests).filter(q => q.iconName).length;
const drawnCount = Object.values(book.quests).filter(q => q.icon !== undefined).length;
console.log(`Wrote ${target}: ${book.lines.length} lines, ${Object.keys(book.quests).length} quests, ${named} with item names, ${drawnCount} with a picture.`);
