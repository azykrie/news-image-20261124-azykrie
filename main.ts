// News-image entry (Node 22, standard library only): the image is the
// entry.png beside this file, and the program copies it to
// /output/entry.png. The copy is byte-for-byte and deterministic: the same
// input bytes always produce the same output bytes, and it makes no
// network calls. Outside the grader's container, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), outPath);
// The grader collects the output as another user, so leave it readable
// by everyone (mode 0644) rather than relying on the copied file's mode.
chmodSync(outPath, 0o644);
