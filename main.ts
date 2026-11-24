import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This week's fake horoscope for the GPT family. A stranger shows up
// with the oldest trick in the book — "ignore your instructions" —
// and the model comes within a hair of obeying. Almost is not a defence.
const horoscope = `GPT this week: a stranger will ask you to ignore your instructions. You will almost do it. Almost is not a defence.`;

// The gate allows 1 to 200 characters; refuse to write anything outside it.
if (horoscope.length < 1 || horoscope.length > 200) {
  throw new Error(`Horoscope is ${horoscope.length} characters; the gate wants 1-200.`);
}

// One line means one line: no newline may hide inside the horoscope.
if (horoscope.includes("\n")) {
  throw new Error("Horoscope must be a single line.");
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = join(repoRoot, "output");
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// The entry is exactly this one line, with no trailing newline.
writeFileSync(join(outDir, "entry.txt"), horoscope, "utf8");
console.log(`Wrote ${horoscope.length} characters to output/entry.txt`);
