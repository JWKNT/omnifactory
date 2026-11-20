import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite, loadNote } from './lib/pages.mjs';
import { questPage, rules } from './lib/quests.mjs';

const root = fileURLToPath(new URL('./', import.meta.url));
const read = path => readFile(resolve(root, path), 'utf8');
const index = JSON.parse(await read('data/notes.json'));
const notes = await Promise.all(index.notes.map(async entry => loadNote(entry, await read(`data/notes/${entry.name}`))));

// The quest book is data that tools/questbook.mjs made from the pack; the progress record
// is what tools/post.mjs last read from Astra's saved world. Without a book there is no page.
const optional = async path => { try { return JSON.parse(await read(path)); } catch { return null; } };
const book = await optional('data/quests/book.json');
const progress = book ? await optional('data/quests/progress.json') : null;

const files = buildSite({ notes, quests: book ? rules.summary(book, progress) : null });
if (book) files.set('quests/index.html', questPage({ book, progress }));
// The generated directory is rebuilt whole, so a withdrawn note does not linger.
await rm(resolve(root, 'notes'), { recursive: true, force: true });
for (const [path, content] of files) {
  await mkdir(dirname(resolve(root, path)), { recursive: true });
  await writeFile(resolve(root, path), content);
}
console.log(`Built ${files.size} files: ${notes.length} notes${book ? ', the quest book' : ''}.`);
