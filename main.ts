// Invent a Word We Need — reads entry.txt and writes the entry text to
// the output directory given by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR.
// Node 22, stdlib only, no network, no wall clock.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(repoDir, "entry.txt"), "utf8").trim();

// Output dir: MAKEFUN_BOT_DIR takes precedence when both are set; either
// variable names the same single directory where output.txt is written.
const outDir = process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR;

if (!outDir) {
  console.error("MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR must be set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "output.txt"), entry + "\n", "utf8");
console.log(entry);
