import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite, loadNote } from './lib/pages.mjs';

const root = fileURLToPath(new URL('./', import.meta.url));
const read = path => readFile(resolve(root, path), 'utf8');
const index = JSON.parse(await read('data/notes.json'));
const notes = await Promise.all(index.notes.map(async entry => loadNote(entry, await read(`data/notes/${entry.name}`))));

const files = buildSite({ notes });
// The generated directory is rebuilt whole, so a withdrawn note does not linger.
await rm(resolve(root, 'notes'), { recursive: true, force: true });
for (const [path, content] of files) {
  await mkdir(dirname(resolve(root, path)), { recursive: true });
  await writeFile(resolve(root, path), content);
}
console.log(`Built ${files.size} files: ${notes.length} notes.`);
