// Reads Astra's quest progress from the saved world and records it for the quest book page.
// tools/post.mjs does this too, so this tool is for a check or a refresh by hand.
//
//   node tools/progress.mjs              write data/quests/progress.json if the standing changed
//   node tools/progress.mjs --check      only say whether it changed; write nothing
//   node tools/progress.mjs --greg <dir> read another harness folder (default ../greg)
//
// It does not commit or push.
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { refreshProgress } from '../lib/progress.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const greg = resolve(flag('--greg') || join(root, '..', 'greg'));
const check = args.includes('--check');

const result = await refreshProgress({ root, greg, world: flag('--world') || 'Astra', write: !check });
if (check) console.log(`quests: ${!result.found ? 'no save found' : result.changed ? 'changed' : 'same'}`);
else console.log(JSON.stringify(result));
