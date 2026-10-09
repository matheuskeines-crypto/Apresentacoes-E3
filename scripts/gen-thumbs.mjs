// Gera as capas (PNG) usadas nos cards do hub de Materiais.
// Execução manual — exige Chrome local e não roda no build da Vercel:
//   node build.mjs && node scripts/gen-thumbs.mjs
// Rode sempre que a capa de um material mudar ou um material novo for criado.
import { execFileSync } from "node:child_process";
import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const distRoot = fileURLToPath(new URL("../dist", import.meta.url));
const outDir = fileURLToPath(new URL("../assets/thumbs", import.meta.url));
const pyHelper = fileURLToPath(new URL("./thumbs.py", import.meta.url));

mkdirSync(outDir, { recursive: true });
const slugs = readdirSync(distRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory() && (d.name.startsWith("tese-") || d.name.startsWith("trilha-")))
  .map((d) => d.name);

execFileSync("python3", [pyHelper, CHROME, distRoot, outDir, ...slugs], { stdio: "inherit" });
console.log("capas geradas:", slugs.length);
