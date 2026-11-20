// Makes the quest book's icon sheet from the pixels that tools/quest-icons.py took from the
// game: one PNG with every item picture in a grid, and an index that says which picture
// belongs to which quest, task item and reward.
//
//   node tools/quest-sheet.mjs              .icons/icons.rgba -> data/quests/icons.png + icons.json
//   node tools/quest-sheet.mjs --cell 32    the size of one picture in the sheet (default 64)
//   node tools/quest-sheet.mjs --trial      .icons/trial.rgba -> .icons/trial.png, to look at
//
// Then run: node tools/questbook.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { deflateSync, crc32 } from 'node:zlib';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };

// A plain PNG writer: 8-bit RGBA, rows from the top. Rows are stored as they are: for these
// small pictures on a clear ground, the PNG row filters made the file larger.
export function png(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  const chunk = (type, data) => {
    const head = Buffer.alloc(8);
    head.writeUInt32BE(data.length, 0);
    head.write(type, 4, 'latin1');
    const tail = Buffer.alloc(4);
    tail.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])) >>> 0, 0);
    return Buffer.concat([head, data, tail]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.set([8, 6, 0, 0, 0], 8);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// One picture from the game's file: the game gives the bottom row first. `cell` halves the
// picture when it is half of `size`; a clear pixel does not darken its neighbours.
function picture(file, index, size, cell) {
  const start = index * size * size * 4;
  const out = Buffer.alloc(cell * cell * 4);
  const step = size / cell;
  let solid = 0;
  for (let y = 0; y < cell; y++) for (let x = 0; x < cell; x++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let dy = 0; dy < step; dy++) for (let dx = 0; dx < step; dx++) {
      const at = start + ((size - 1 - (y * step + dy)) * size + x * step + dx) * 4;
      const alpha = file[at + 3];
      r += file[at] * alpha; g += file[at + 1] * alpha; b += file[at + 2] * alpha; a += alpha;
    }
    const to = (y * cell + x) * 4;
    if (a > 0) { out[to] = Math.round(r / a); out[to + 1] = Math.round(g / a); out[to + 2] = Math.round(b / a); out[to + 3] = Math.round(a / (step * step)); solid++; }
  }
  return { pixels: out, empty: solid === 0 };
}

function sheet(pictures, cell, cols) {
  const rows = Math.ceil(pictures.length / cols);
  const out = Buffer.alloc(cols * cell * rows * cell * 4);
  pictures.forEach((p, i) => {
    const ox = (i % cols) * cell, oy = Math.floor(i / cols) * cell;
    for (let y = 0; y < cell; y++) p.pixels.copy(out, ((oy + y) * cols * cell + ox) * 4, y * cell * 4, (y + 1) * cell * 4);
  });
  return png(cols * cell, rows * cell, out);
}

if (args.includes('--trial')) {
  const size = 64;
  const file = await readFile(join(root, '.icons', 'trial.rgba'));
  const count = file.length / (size * size * 4);
  const pictures = Array.from({ length: count }, (_, i) => picture(file, i, size, size));
  await writeFile(join(root, '.icons', 'trial.png'), sheet(pictures, size, count));
  console.log(`Wrote .icons/trial.png: ${count} pictures, empty: ${pictures.filter(p => p.empty).length}.`);
} else {
  const info = JSON.parse(await readFile(join(root, '.icons', 'icons.json'), 'utf8'));
  const file = await readFile(join(root, '.icons', 'icons.rgba'));
  const cell = Number(flag('--cell') || 64);
  if (info.size % cell) throw new Error(`a picture of ${info.size} pixels does not divide into ${cell}`);
  if (file.length !== info.count * info.size * info.size * 4) throw new Error('the pixel file and its index do not agree');
  const pictures = Array.from({ length: info.count }, (_, i) => picture(file, i, info.size, cell));
  const cols = Math.ceil(Math.sqrt(info.count));
  const image = sheet(pictures, cell, cols);
  // A picture that came out empty is not offered: the page shows letters for it.
  const empty = new Set(pictures.map((p, i) => (p.empty ? i : -1)).filter(i => i >= 0));
  const keep = i => (i >= 0 && !empty.has(i) ? i : -1);
  const map = { lines: Object.fromEntries(Object.entries(info.map.lines).map(([id, i]) => [id, keep(i)])), quests: {} };
  for (const [id, q] of Object.entries(info.map.quests)) {
    map.quests[id] = { icon: keep(q.icon), tasks: Object.fromEntries(Object.entries(q.tasks).map(([t, list]) => [t, list.map(keep)])), rewards: Object.fromEntries(Object.entries(q.rewards).map(([r, list]) => [r, list.map(keep)])) };
  }
  await mkdir(join(root, 'data', 'quests'), { recursive: true });
  await writeFile(join(root, 'data', 'quests', 'icons.png'), image);
  await writeFile(join(root, 'data', 'quests', 'icons.json'), JSON.stringify({ cell, cols, count: info.count, bytes: image.length, map }) + '\n');
  console.log(`Wrote data/quests/icons.png: ${info.count} pictures of ${cell} px in ${cols} columns, ${Math.round(image.length / 1024)} KB; ${empty.size} empty.`);
}
