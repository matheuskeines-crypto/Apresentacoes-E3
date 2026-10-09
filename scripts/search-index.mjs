// Índice de busca de texto completo do Hub E3.
// Lê os HTMLs já gerados em dist/, quebra cada material em slides/páginas e grava
// dist/search-index.js (window.__SEARCH = [...]), carregado sob demanda pela busca do Hub.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const NAMED = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });

const textOf = (html) =>
  decode(
    html
      .replace(/<(script|style|svg|noscript)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ").trim();

/** Slides (motor de decks) ou páginas (playbook-kit): um trecho por <section>. */
function partsOf(html) {
  const re = /<section\b[^>]*\bclass="(?:slide|page)\b[^"]*"[^>]*>([\s\S]*?)<\/section>/gi;
  const parts = [];
  let m, n = 0;
  while ((m = re.exec(html))) {
    n++;
    const heading = m[1].match(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/i);
    const label = (m[0].match(/data-label="([^"]*)"/) || [])[1] || "";
    const t = textOf(m[1]);
    if (t) parts.push({ n, h: heading ? textOf(heading[1]) : decode(label), t });
  }
  if (parts.length) return parts;
  // páginas sem seções (Cursos, Links Úteis): um único trecho com o corpo inteiro
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [, html])[1];
  const t = textOf(body);
  return t ? [{ n: 0, h: "", t }] : [];
}

/** entries: [{ title, sub, group, kind, href, crawl }] — href relativo ao index ("./x/index.html") ou externo. */
export function buildSearchIndex(distRoot, entries) {
  const byHref = new Map();
  for (const e of entries) {
    const prev = byHref.get(e.href);
    if (prev) {
      if (!prev.g.split(" · ").includes(e.group)) prev.g += " · " + e.group;
      continue;
    }
    let p = [], un = "Página";
    const file = e.href.startsWith("./") ? join(distRoot, e.href.slice(2)) : null;
    if (e.crawl !== false && file && existsSync(file)) {
      const html = readFileSync(file, "utf8");
      p = partsOf(html);
      un = /<section\b[^>]*class="slide\b/.test(html) ? "Slide" : "Página";
    }
    byHref.set(e.href, { t: e.title, s: e.sub || "", g: e.group, k: e.kind, u: e.href, un, p });
  }
  const index = [...byHref.values()];
  writeFileSync(join(distRoot, "search-index.js"), "window.__SEARCH=" + JSON.stringify(index) + ";", "utf8");
  const parts = index.reduce((a, m) => a + m.p.length, 0);
  return { materials: index.length, parts };
}

/** Materiais gerados por prefixo (teses e trilhas), com título lido do <title>. */
export function discover(distRoot, prefix, group, kind) {
  return readdirSync(distRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith(prefix))
    .map((d) => {
      const html = readFileSync(join(distRoot, d.name, "index.html"), "utf8");
      const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [, d.name])[1])
        .replace(/\s*[·—]\s*E3 Digital\s*$/i, "").trim();
      return { title, sub: "", group, kind, href: `./${d.name}/index.html` };
    });
}
