// E3 Digital — gerador de sites de apresentação (slides) autossuficientes.
// Cada deck vira dist/<slug>/index.html com a estética E3 embutida.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOGO = readFileSync(join(__dirname, "logo_e3.b64"), "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

/* ─────────────────────────────────────────────────────────────
   DECKS  (importados de ./decks/*.mjs)
   ───────────────────────────────────────────────────────────── */
import { decks } from "./decks/index.mjs";

/* ─────────────────────────────────────────────────────────────
   RENDER helpers
   ───────────────────────────────────────────────────────────── */
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function icon(name) {
  // lucide-style inline SVGs (stroke=currentColor)
  const P = {
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[name] || P.check}</svg>`;
}

/* ─── journey "caminho" (estrada serpenteante estilo Evolução) ─── */
function journeyBlock(s) {
  const steps = s.steps;
  const N = steps.length;
  const rowH = 235, topPad = 120, botPad = 120, vbW = 1000;
  const vbH = topPad + (N - 1) * rowH + botPad;
  const xL = 300, xR = 700;
  const nodes = steps.map((st, i) => ({
    ...st, x: i % 2 === 0 ? xL : xR, y: topPad + i * rowH, side: i % 2 === 0 ? "left" : "right",
  }));
  let d = `M${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < N; i++) {
    const a = nodes[i - 1], b = nodes[i], my = (a.y + b.y) / 2;
    d += ` C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }
  const cps = nodes.map((n, i) => `<div class="cp cp-${n.side}" style="left:${(n.x / vbW * 100).toFixed(2)}%;top:${(n.y / vbH * 100).toFixed(2)}%">
      <div class="cp-node">${n.icon ? icon(n.icon) : i + 1}</div>
      <div class="cp-label"><p class="cp-w">${esc(n.label)}</p><p class="cp-t">${esc(n.title)}</p><p class="cp-d">${esc(n.desc)}</p></div>
    </div>`).join("");
  const road = `<div class="road"><svg viewBox="0 0 ${vbW} ${vbH}" preserveAspectRatio="xMidYMid meet" fill="none">
      <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF5F1F"/><stop offset="1" stop-color="#FF3300"/></linearGradient></defs>
      <path d="${d}" stroke="#FF5F1F" stroke-opacity="0.09" stroke-width="80" stroke-linecap="round"/>
      <path d="${d}" stroke="url(#rg)" stroke-width="44" stroke-linecap="round"/>
      <path d="${d}" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2.5" stroke-dasharray="10 18" stroke-linecap="round"/>
    </svg>${cps}</div>`;
  const mob = `<div class="road-mobile timeline">${steps.map((st, k) => `<div class="tl-step"><div class="tl-node">${st.icon ? icon(st.icon) : k + 1}</div><div class="tl-body"><p class="tl-w">${esc(st.label)}</p><p class="tl-t">${esc(st.title)}</p><p class="tl-d">${esc(st.desc)}</p></div></div>`).join("")}</div>`;
  return `<div class="journey">${road}${mob}</div>`;
}

function slideInner(s) {
  const kicker = s.kicker ? `<p class="kicker">${esc(s.kicker)}</p>` : "";
  switch (s.type) {
    case "cover":
      return { cls: "si-cover", html: `<div class="cover-aurora"></div>
        <img class="cover-logo" src="${LOGO_URI}" alt="E3"/>
        ${s.kicker ? `<p class="kicker cover-kicker">${esc(s.kicker)}</p>` : ""}
        <h1 class="cover-title">${s.title}</h1>
        ${s.subtitle ? `<p class="cover-sub">${esc(s.subtitle)}</p>` : ""}
        ${s.tag ? `<span class="cover-tag">${esc(s.tag)}</span>` : ""}` };

    case "section":
      return { cls: "si-section", html: `<span class="section-num">${esc(s.num || "")}</span>
        <div class="section-body">${kicker}<h2 class="section-title">${s.title}</h2>
        ${s.desc ? `<p class="lead">${esc(s.desc)}</p>` : ""}</div>` };

    case "agenda":
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        <ol class="agenda">${s.items.map((it, k) => `<li><span class="ag-n">${String(k + 1).padStart(2, "0")}</span><span>${esc(it)}</span></li>`).join("")}</ol>` };

    case "stats":
      return { cls: "si-center", html: `${kicker}<h2 class="h2">${s.title}</h2>
        <div class="stats">${s.items.map((it) => `<div class="stat"><span class="stat-v">${esc(it.v)}</span><span class="stat-l">${esc(it.l)}</span></div>`).join("")}</div>
        ${s.note ? `<p class="lead center">${esc(s.note)}</p>` : ""}` };

    case "bullets":
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="cards ${s.cols ? "cols-" + s.cols : "cols-2"}">${s.items
          .map((it) => `<div class="card">${it.icon ? `<span class="card-ic">${icon(it.icon)}</span>` : ""}<div><p class="card-t">${esc(it.title)}</p>${it.desc ? `<p class="card-d">${esc(it.desc)}</p>` : ""}</div></div>`)
          .join("")}</div>` };

    case "journey": // no formato deck (slides): timeline HORIZONTAL (passos lado a lado)
    case "timeline":
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="timeline-h" style="--n:${s.steps.length}">${s.steps
          .map((st, k) => `<div class="th-step"><div class="th-node">${st.icon ? icon(st.icon) : k + 1}</div><p class="th-w">${esc(st.label)}</p><p class="th-t">${esc(st.title)}</p><p class="th-d">${esc(st.desc)}</p></div>`)
          .join("")}</div>` };

    case "table":
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        <table class="tbl"><thead><tr>${s.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${s.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>` };

    case "quote":
      return { cls: "si-quote", html: `<span class="q-mark">&ldquo;</span>
        <p class="q-text">${s.text}</p>
        ${s.author ? `<p class="q-author">${esc(s.author)}</p>` : ""}` };

    case "final":
      return { cls: "si-cover", html: `<div class="cover-aurora"></div>
        <img class="cover-logo" src="${LOGO_URI}" alt="E3"/>
        <h2 class="cover-title">${s.title}</h2>
        ${s.subtitle ? `<p class="cover-sub">${esc(s.subtitle)}</p>` : ""}
        ${s.contact ? `<p class="final-contact">${esc(s.contact)}</p>` : ""}` };

    default:
      return { cls: "", html: `<h2 class="h2">${esc(s.title || "")}</h2>` };
  }
}

function renderSlide(s, i) {
  const { cls, html } = slideInner(s);
  return `<section class="slide" data-i="${i}"><div class="slide-inner ${cls}">${html}</div></section>`;
}

function page(deck) {
  const slides = deck.slides.map(renderSlide).join("\n");
  return `<!doctype html>
<html lang="pt-BR" translate="no">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="google" content="notranslate"/>
<title>${esc(deck.title)} — E3 Digital</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23000'/%3E%3Ctext x='50' y='68' font-size='54' font-family='Arial' font-weight='800' fill='%23FF5F1F' text-anchor='middle'%3EE3%3C/text%3E%3C/svg%3E">
<style>${CSS}</style>
</head>
<body>
<div class="stage" id="stage">
  <div class="ambient"><span class="glow g1"></span><span class="glow g2"></span></div>
  <header class="topbar">
    <img src="${LOGO_URI}" class="tb-logo" alt="E3"/>
    <span class="tb-title">${esc(deck.title)}</span>
    <button class="tb-pdf" onclick="window.print()">Baixar PDF</button>
  </header>
  <main class="deck" id="deck">
    ${slides}
  </main>
  <footer class="controls">
    <button class="nav prev" id="prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
    <div class="dots" id="dots"></div>
    <button class="nav next" id="next" aria-label="Próximo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
  </footer>
  <div class="counter"><span id="cur">1</span> / <span id="tot">${deck.slides.length}</span></div>
</div>
<script>${JS}</script>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────
   CSS
   ───────────────────────────────────────────────────────────── */
const CSS = `
:root{--o:#FF5F1F;--o2:#FF3300;--bg:#050505;--ink:#fff;--d:'Bricolage Grotesque',sans-serif;--s:'DM Sans',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;background:var(--bg);color:var(--ink);font-family:var(--s);-webkit-font-smoothing:antialiased}
.stage{position:fixed;inset:0;display:flex;flex-direction:column;overflow:hidden}
.ambient{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.glow{position:absolute;border-radius:50%;filter:blur(120px)}
.g1{top:-10%;left:15%;width:40vw;height:40vw;background:rgba(255,95,31,.18)}
.g2{bottom:-15%;right:10%;width:38vw;height:38vw;background:rgba(255,51,0,.12)}
.topbar{position:relative;z-index:5;display:flex;align-items:center;gap:16px;padding:16px 28px;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.35);backdrop-filter:blur(12px)}
.tb-logo{height:30px;width:auto}
.tb-title{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:600}
.tb-pdf{margin-left:auto;font-family:var(--s);font-size:12px;font-weight:600;letter-spacing:.04em;color:#fff;background:linear-gradient(135deg,var(--o),var(--o2));border:0;padding:9px 18px;border-radius:999px;cursor:pointer;box-shadow:0 6px 20px rgba(255,95,31,.35);transition:transform .2s}
.tb-pdf:hover{transform:translateY(-1px)}
.deck{position:relative;z-index:2;flex:1;overflow:hidden}
.slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:0;visibility:hidden;transition:opacity .45s ease,visibility .45s}
.slide.active{opacity:1;visibility:visible}
.slide-inner{width:1000px;flex:0 0 auto;transform-origin:center center;display:flex;flex-direction:column;gap:22px}
.si-center{align-items:center;text-align:center}
/* canvas do deck: tamanhos fixos p/ escala uniforme (sem vw) */
.slide-inner .h2{font-size:2.7rem;max-width:20ch}
.slide-inner .lead{font-size:1.05rem}
.slide-inner .cover-logo{height:72px;margin-bottom:26px}
.slide-inner .cover-title{font-size:4.2rem;max-width:18ch}
.slide-inner .cover-sub{font-size:1.2rem}
.slide-inner .cover-kicker{margin-bottom:12px}
.slide-inner .section-num{font-size:9.5rem}
.slide-inner .section-title{font-size:3rem}
.slide-inner .q-text{font-size:2.5rem}
.slide-inner .q-mark{font-size:6rem}
.slide-inner .stat-v{font-size:2.7rem}
.slide-inner .agenda li{font-size:1.15rem}
.slide-inner .card-t{font-size:1.05rem}
.slide-inner .tl-t{font-size:1.15rem}
.kicker{font-family:var(--s);font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--o);font-weight:700;margin-bottom:6px}
.h2{font-family:var(--d);font-weight:800;font-size:clamp(1.9rem,4.4vw,3.3rem);line-height:1.03;letter-spacing:-.02em;max-width:20ch}
.lead{font-size:clamp(.95rem,1.5vw,1.15rem);color:rgba(255,255,255,.55);max-width:60ch;line-height:1.6}
.lead.center{text-align:center;margin:0 auto}
.center{text-align:center}
b,strong,.hl{color:var(--o)}
/* cover */
.si-cover{align-items:center;text-align:center;justify-content:center;gap:0}
.cover-aurora{position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 50% 120%,rgba(255,51,0,.28),transparent 70%);pointer-events:none}
.cover-logo{height:clamp(54px,8vw,88px);width:auto;margin-bottom:34px;filter:drop-shadow(0 0 24px rgba(255,95,31,.5));position:relative;z-index:2}
.cover-kicker{margin-bottom:14px}
.cover-title{font-family:var(--d);font-weight:800;font-size:clamp(2.3rem,7vw,5.2rem);line-height:.98;letter-spacing:-.035em;position:relative;z-index:2;max-width:16ch}
.cover-title .hl,.cover-title b{color:var(--o)}
.cover-sub{margin-top:22px;font-size:clamp(1rem,1.8vw,1.25rem);color:rgba(255,255,255,.6);max-width:52ch;line-height:1.55;position:relative;z-index:2}
.cover-tag{margin-top:30px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.75);border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.08);padding:9px 20px;border-radius:999px;position:relative;z-index:2}
.final-contact{margin-top:26px;font-size:1.05rem;color:var(--o);font-weight:600;position:relative;z-index:2}
/* section divider */
.si-section{flex-direction:row;align-items:center;gap:clamp(20px,4vw,56px)}
.section-num{font-family:var(--d);font-weight:800;font-size:clamp(5rem,16vw,13rem);line-height:.8;color:transparent;-webkit-text-stroke:2px rgba(255,95,31,.55);opacity:.9}
.section-title{font-family:var(--d);font-weight:800;font-size:clamp(2rem,5vw,3.6rem);line-height:1.02;letter-spacing:-.02em}
/* agenda */
.agenda{list-style:none;display:flex;flex-direction:column;gap:12px;max-width:60ch}
.agenda li{display:flex;align-items:center;gap:20px;padding:16px 22px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.02);font-size:clamp(1rem,1.6vw,1.2rem);font-weight:500;transition:.3s}
.agenda li:hover{border-color:rgba(255,95,31,.4);background:rgba(255,95,31,.05)}
.ag-n{font-family:var(--d);font-weight:800;color:var(--o);font-size:1.1rem;min-width:32px}
/* stats */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;margin:6px 0 4px}
.stat{display:flex;flex-direction:column;align-items:center;gap:10px;padding:clamp(24px,4vw,48px) 20px;text-align:center;border-right:1px solid rgba(255,255,255,.07)}
.stat:last-child{border-right:0}
.stat-v{font-family:var(--d);font-weight:800;font-size:clamp(1.7rem,3.6vw,2.9rem);color:var(--o);letter-spacing:-.02em}
.stat-l{font-size:.82rem;color:rgba(255,255,255,.45);max-width:16ch;line-height:1.35}
/* cards */
.cards{display:grid;gap:16px}
.cols-2{grid-template-columns:repeat(2,1fr)}
.cols-3{grid-template-columns:repeat(3,1fr)}
.cols-4{grid-template-columns:repeat(4,1fr)}
.card{display:flex;gap:16px;align-items:flex-start;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.025);transition:.3s}
.card:hover{border-color:rgba(255,95,31,.32);transform:translateY(-2px)}
.card-ic{flex:0 0 auto;width:44px;height:44px;display:grid;place-items:center;border-radius:12px;background:rgba(255,95,31,.12);color:var(--o)}
.card-ic svg{width:22px;height:22px}
.card-t{font-family:var(--d);font-weight:700;font-size:1.05rem;line-height:1.2;margin-bottom:5px}
.card-d{font-size:.86rem;color:rgba(255,255,255,.5);line-height:1.5}
/* timeline */
.timeline{display:flex;flex-direction:column;gap:0;max-width:74ch}
.tl-step{display:flex;gap:20px;position:relative;padding-bottom:20px}
.tl-step:not(:last-child) .tl-node::after{content:"";position:absolute;top:44px;left:50%;transform:translateX(-50%);width:2px;height:calc(100% - 30px);background:linear-gradient(rgba(255,95,31,.5),rgba(255,95,31,.08))}
.tl-node{position:relative;flex:0 0 auto;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-family:var(--d);font-weight:800;background:linear-gradient(135deg,var(--o),var(--o2));color:#fff;box-shadow:0 0 20px rgba(255,95,31,.4)}
.tl-node svg{width:20px;height:20px}
.tl-body{padding-top:4px}
.tl-w{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--o);font-weight:700}
.tl-t{font-family:var(--d);font-weight:700;font-size:1.15rem;margin:2px 0 4px}
.tl-d{font-size:.88rem;color:rgba(255,255,255,.5);line-height:1.5;max-width:60ch}
/* journey "caminho" (estrada serpenteante) */
.journey{position:relative;width:100%;max-width:860px;margin:10px auto 0}
.road{position:relative;width:100%}
.road>svg{width:100%;height:auto;display:block;filter:drop-shadow(0 10px 44px rgba(255,95,31,.16))}
.cp{position:absolute;transform:translate(-50%,-50%);z-index:2}
.cp-node{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));box-shadow:0 0 24px rgba(255,95,31,.5);color:#fff;font-family:var(--d);font-weight:800;font-size:1.1rem}
.cp-node svg{width:24px;height:24px}
.cp-label{position:absolute;top:50%;transform:translateY(-50%);width:215px;display:flex;flex-direction:column}
.cp-left .cp-label{right:calc(100% + 22px);text-align:right;align-items:flex-end}
.cp-right .cp-label{left:calc(100% + 22px);text-align:left;align-items:flex-start}
.cp-w{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--o);font-weight:700}
.cp-t{font-family:var(--d);font-weight:800;font-size:1.15rem;line-height:1.08;margin:2px 0 3px}
.cp-d{font-size:.8rem;color:rgba(255,255,255,.5);line-height:1.4}
.road-mobile{display:none}
@media(max-width:860px){.road{display:none}.road-mobile{display:flex;flex-direction:column;max-width:440px;margin:0 auto}}
/* timeline horizontal (deck) — passos lado a lado */
.timeline-h{display:flex;gap:12px;position:relative;width:100%;margin-top:6px}
.timeline-h::before{content:"";position:absolute;top:24px;left:6%;right:6%;height:2px;background:linear-gradient(90deg,transparent,rgba(255,95,31,.55),transparent);z-index:0}
.th-step{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;z-index:1}
.th-node{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));color:#fff;font-family:var(--d);font-weight:800;font-size:1rem;box-shadow:0 0 18px rgba(255,95,31,.45);margin-bottom:14px}
.th-node svg{width:22px;height:22px}
.th-w{font-size:.64rem;letter-spacing:.1em;text-transform:uppercase;color:var(--o);font-weight:700;line-height:1.2}
.th-t{font-family:var(--d);font-weight:700;font-size:1rem;line-height:1.1;margin:4px 0 5px}
.th-d{font-size:.76rem;color:rgba(255,255,255,.52);line-height:1.35}
/* table */
.tbl{width:100%;border-collapse:collapse;font-size:clamp(.8rem,1.3vw,.95rem);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden}
.tbl th{background:rgba(255,95,31,.1);color:var(--o);text-align:left;padding:14px 18px;font-family:var(--d);font-weight:700;font-size:.85rem;letter-spacing:.02em}
.tbl td{padding:13px 18px;border-top:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.72);vertical-align:top}
.tbl tr:nth-child(even) td{background:rgba(255,255,255,.015)}
/* quote */
.si-quote{align-items:center;justify-content:center;text-align:center}
.q-mark{font-family:var(--d);font-size:8rem;line-height:.6;color:var(--o);opacity:.5}
.q-text{font-family:var(--d);font-weight:700;font-size:clamp(1.5rem,3.6vw,2.8rem);line-height:1.2;letter-spacing:-.02em;max-width:22ch;margin-top:10px}
.q-author{margin-top:24px;font-size:.9rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:600}
/* controls */
.controls{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 28px;border-top:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.35);backdrop-filter:blur(12px)}
.nav{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#fff;cursor:pointer;transition:.25s}
.nav svg{width:20px;height:20px}
.nav:hover:not(:disabled){border-color:var(--o);color:var(--o);background:rgba(255,95,31,.08)}
.nav:disabled{opacity:.25;cursor:not-allowed}
.dots{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center}
.dot{width:8px;height:8px;border-radius:999px;border:0;background:rgba(255,255,255,.2);cursor:pointer;transition:.3s;padding:0}
.dot.active{width:30px;background:var(--o);box-shadow:0 0 12px rgba(255,95,31,.6)}
.counter{position:absolute;bottom:78px;left:50%;transform:translateX(-50%);z-index:6;font-size:.78rem;color:rgba(255,255,255,.4);pointer-events:none}
.counter span{color:var(--o);font-weight:700}
@media(max-width:720px){
  .stats{grid-template-columns:1fr}.stat{border-right:0;border-bottom:1px solid rgba(255,255,255,.07)}
  .cols-2,.cols-3,.cols-4{grid-template-columns:1fr}
  .slide-section{flex-direction:column;text-align:center}
  .tb-title{display:none}
  .counter{bottom:74px}
}
/* PRINT → PDF: one slide per page */
@media print{
  @page{size:1280px 720px;margin:0}
  html,body{height:auto;background:#050505}
  .topbar,.controls,.counter,.tb-pdf{display:none!important}
  .stage{position:static}
  .ambient{position:fixed}
  .deck{position:static;overflow:visible}
  .slide{position:relative;inset:auto;opacity:1!important;visibility:visible!important;width:1280px;height:720px;page-break-after:always;break-after:page;display:flex!important;align-items:center;justify-content:center;overflow:hidden}
}
`;

/* ─────────────────────────────────────────────────────────────
   JS (client)
   ───────────────────────────────────────────────────────────── */
const JS = `
(function(){
  var deck=document.getElementById('deck');
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var dotsWrap=document.getElementById('dots');
  var cur=document.getElementById('cur');
  var prev=document.getElementById('prev'),next=document.getElementById('next');
  var i=0;
  slides.forEach(function(s,k){var b=document.createElement('button');b.className='dot';b.setAttribute('aria-label','Slide '+(k+1));b.onclick=function(){go(k)};dotsWrap.appendChild(b)});
  var dots=[].slice.call(dotsWrap.children);
  // fit-to-screen: escala o slide inteiro pra caber sem scroll e sem corte
  function fit(slide,W,H){
    var inner=slide.querySelector('.slide-inner'); if(!inner)return;
    inner.style.transform='none';
    var availW=(W||deck.clientWidth)*0.9, availH=(H||deck.clientHeight)*0.9;
    var w=inner.offsetWidth||1000, h=inner.offsetHeight||1;
    var sc=Math.min(availW/w, availH/h, 1.15);
    inner.style.transform='scale('+sc+')';
  }
  function go(n){i=Math.max(0,Math.min(slides.length-1,n));
    slides.forEach(function(s,k){s.classList.toggle('active',k===i)});
    dots.forEach(function(d,k){d.classList.toggle('active',k===i)});
    cur.textContent=i+1;prev.disabled=i===0;next.disabled=i===slides.length-1;
    fit(slides[i]);
  }
  prev.onclick=function(){go(i-1)};next.onclick=function(){go(i+1)};
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();go(i+1)}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(i-1)}
    if(e.key==='Home')go(0);if(e.key==='End')go(slides.length-1);
  });
  var sx=0;
  deck.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  deck.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)go(i+(dx<0?1:-1))},{passive:true});
  window.addEventListener('resize',function(){fit(slides[i])});
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){fit(slides[i])})}
  window.addEventListener('beforeprint',function(){slides.forEach(function(s){fit(s,1280,720)})});
  window.addEventListener('afterprint',function(){fit(slides[i])});
  go(0);
  setTimeout(function(){fit(slides[i])},250);
})();
`;

/* ═════════════════════════════════════════════════════════════
   VERTICAL LAYOUT  (rolagem, estilo Pacote Evolução — "modo vendendo")
   ═════════════════════════════════════════════════════════════ */
function renderV(s, i) {
  const kicker = s.kicker ? `<p class="kicker">${esc(s.kicker)}</p>` : "";
  const rev = (inner, cls = "") => `<section class="vsec reveal ${cls}">${inner}</section>`;
  switch (s.type) {
    case "cover":
      return `<section class="vhero">
        <div class="cover-aurora"></div>
        <div class="vhero-in">
          <img class="cover-logo" src="${LOGO_URI}" alt="E3"/>
          ${s.kicker ? `<p class="kicker cover-kicker">${esc(s.kicker)}</p>` : ""}
          <h1 class="cover-title">${s.title}</h1>
          ${s.subtitle ? `<p class="cover-sub">${esc(s.subtitle)}</p>` : ""}
          ${s.tag ? `<span class="cover-tag">${esc(s.tag)}</span>` : ""}
        </div>
        <div class="scroll-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
      </section>`;

    case "section":
      return rev(`<div class="vband"><span class="vband-num">${esc(s.num || "")}</span><div>${kicker}<h2 class="section-title">${s.title}</h2>${s.desc ? `<p class="lead">${esc(s.desc)}</p>` : ""}</div></div>`, "vsec-band");

    case "agenda":
      return rev(`<div class="vwrap">${kicker}<h2 class="h2 center">${s.title}</h2>
        <ol class="agenda vagenda">${s.items.map((it, k) => `<li><span class="ag-n">${String(k + 1).padStart(2, "0")}</span><span>${esc(it)}</span></li>`).join("")}</ol></div>`);

    case "stats":
      return rev(`<div class="vwrap center">${kicker}<h2 class="h2 center">${s.title}</h2>
        <div class="stats vstats">${s.items.map((it) => `<div class="stat"><span class="stat-v">${esc(it.v)}</span><span class="stat-l">${esc(it.l)}</span></div>`).join("")}</div>
        ${s.note ? `<p class="lead center">${esc(s.note)}</p>` : ""}</div>`);

    case "bullets":
      return rev(`<div class="vwrap">${kicker}<h2 class="h2">${s.title}</h2>${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="cards ${s.cols ? "cols-" + s.cols : "cols-2"}">${s.items.map((it) => `<div class="card">${it.icon ? `<span class="card-ic">${icon(it.icon)}</span>` : ""}<div><p class="card-t">${esc(it.title)}</p>${it.desc ? `<p class="card-d">${esc(it.desc)}</p>` : ""}</div></div>`).join("")}</div></div>`);

    case "timeline":
      return rev(`<div class="vwrap">${kicker}<h2 class="h2">${s.title}</h2>${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="timeline vtimeline">${s.steps.map((st, k) => `<div class="tl-step reveal" style="--d:${k * 60}ms"><div class="tl-node">${st.icon ? icon(st.icon) : k + 1}</div><div class="tl-body"><p class="tl-w">${esc(st.label)}</p><p class="tl-t">${esc(st.title)}</p><p class="tl-d">${esc(st.desc)}</p></div></div>`).join("")}</div></div>`);

    case "journey":
      return rev(`<div class="vwrap">${kicker}<h2 class="h2">${s.title}</h2>${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}${journeyBlock(s)}</div>`);

    case "table":
      return rev(`<div class="vwrap">${kicker}<h2 class="h2">${s.title}</h2>
        <table class="tbl"><thead><tr>${s.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${s.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);

    case "quote":
      return rev(`<div class="vwrap center"><span class="q-mark">&ldquo;</span><p class="q-text">${s.text}</p>${s.author ? `<p class="q-author">${esc(s.author)}</p>` : ""}</div>`, "vsec-quote");

    case "final":
      return `<section class="vhero vfinal reveal">
        <div class="cover-aurora"></div>
        <div class="vhero-in">
          <img class="cover-logo" src="${LOGO_URI}" alt="E3"/>
          <h2 class="cover-title">${s.title}</h2>
          ${s.subtitle ? `<p class="cover-sub">${esc(s.subtitle)}</p>` : ""}
          ${s.contact ? `<p class="final-contact">${esc(s.contact)}</p>` : ""}
        </div>
      </section>`;

    default:
      return rev(`<div class="vwrap"><h2 class="h2">${esc(s.title || "")}</h2></div>`);
  }
}

function pageV(deck) {
  const body = deck.slides.map(renderV).join("\n");
  return `<!doctype html>
<html lang="pt-BR" translate="no">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="google" content="notranslate"/>
<title>${esc(deck.title)} — E3 Digital</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23000'/%3E%3Ctext x='50' y='68' font-size='54' font-family='Arial' font-weight='800' fill='%23FF5F1F' text-anchor='middle'%3EE3%3C/text%3E%3C/svg%3E">
<style>${CSS}${CSS_V}</style>
</head>
<body class="vbody">
<div class="ambient"><span class="glow g1"></span><span class="glow g2"></span></div>
<nav class="vnav" id="vnav"><img src="${LOGO_URI}" class="tb-logo" alt="E3"/><button class="tb-pdf" onclick="window.print()">Baixar PDF</button></nav>
<main class="vmain">
${body}
</main>
<script>${JS_V}</script>
</body>
</html>`;
}

const CSS_V = `
.vbody{overflow-x:hidden;overflow-y:auto}
.vbody .ambient{position:fixed}
.vnav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:rgba(0,0,0,.6);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.06);opacity:0;transform:translateY(-12px);transition:.3s;pointer-events:none}
.vnav.show{opacity:1;transform:none;pointer-events:auto}
.vmain{position:relative;z-index:2}
.vhero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;overflow:hidden}
.vhero-in{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;max-width:60ch}
.scroll-hint{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.3);animation:bob 2s ease-in-out infinite}
.scroll-hint svg{width:22px;height:22px}
@keyframes bob{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,8px)}}
.vsec{position:relative;padding:clamp(64px,10vh,120px) 24px;display:flex;justify-content:center}
.vwrap{width:100%;max-width:1000px;display:flex;flex-direction:column;gap:20px}
.vwrap.center{align-items:center;text-align:center}
.vsec-band{background:linear-gradient(180deg,rgba(255,95,31,.06),transparent)}
.vband{width:100%;max-width:1000px;display:flex;align-items:center;gap:clamp(20px,4vw,48px)}
.vband-num{font-family:var(--d);font-weight:800;font-size:clamp(4rem,12vw,10rem);line-height:.8;color:transparent;-webkit-text-stroke:2px rgba(255,95,31,.55);flex:0 0 auto}
.vsec-quote{background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(255,95,31,.08),transparent 70%)}
.vagenda{max-width:640px;margin:0 auto;width:100%}
.vstats{max-width:900px;margin:6px auto 4px;width:100%}
.vtimeline{margin-top:6px}
/* reveal on scroll */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);transition-delay:var(--d,0ms)}
.reveal.in{opacity:1;transform:none}
@media print{
  .vnav,.scroll-hint,.tb-pdf{display:none!important}
  .reveal{opacity:1!important;transform:none!important}
  .vbody .ambient{position:absolute}
  .vhero{min-height:auto;padding:80px 24px}
}
`;

const JS_V = `
(function(){
  var nav=document.getElementById('vnav');
  window.addEventListener('scroll',function(){nav.classList.toggle('show',window.scrollY>120)},{passive:true});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
})();
`;

/* ─────────────────────────────────────────────────────────────
   BUILD
   ───────────────────────────────────────────────────────────── */
const distRoot = join(__dirname, "dist");
for (const deck of decks) {
  const dir = join(distRoot, deck.slug);
  mkdirSync(dir, { recursive: true });
  const html = deck.layout === "vertical" ? pageV(deck) : page(deck);
  writeFileSync(join(dir, "index.html"), html, "utf8");
  console.log("built:", deck.slug, "(" + deck.slides.length + (deck.layout === "vertical" ? " · vertical" : " slides") + ")");
}

/* ─── página-menu (índice) ─── */
const PRODUCTS = [
  { name: "Aceleração Comercial", slug: "aceleracao-comercial", hideProposta: true },
  { name: "Estruturação PRO", slug: "estruturacao-pro" },
  { name: "Assessoria Light & Pro", slug: "assessoria-light-pro", extras: [
    { label: "Playbook", sub: "pdf · escopo & funções", href: "./playbook-assessoria-light-pro/Playbook-Assessoria-Light.pdf" },
  ] },
  { name: "Evolução Jurídica", slug: "evolucao-juridica", skipBase: true, extras: [
    { label: "Proposta Comercial", sub: "apresentação · site", href: "https://pacote-evolucao-publico.vercel.app" },
    { label: "Onboarding", sub: "figma · apresentação", href: "https://spot-clasp-91538610.figma.site" },
    { label: "Consultoria Comercial", sub: "playbook comercial · site", href: "https://consultoria-comercial-e3.vercel.app" },
    { label: "Auditoria Criativa", sub: "deck · 39 slides", href: "./auditoria-criativa/index.html" },
  ] },
  { name: "Social Media", slug: "social-media" },
  { name: "Estruturação de Instagram", slug: "estruturacao-instagram" },
];
const extLink = (e) => `<a href="${e.href}"${e.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}><span class="mt">${e.label}</span><span class="ms">${e.sub}</span></a>`;
const menuCard = (p) => `<div class="mcard">
  <h3>${p.name}</h3>
  <div class="mlinks">
    ${p.skipBase ? "" : `${p.hideProposta ? "" : `<a href="./proposta-${p.slug}/index.html"><span class="mt">Proposta</span><span class="ms">vertical · vendendo</span></a>\n    `}<a href="./onboarding-${p.slug}/index.html"><span class="mt">Onboarding</span><span class="ms">deck · kickoff</span></a>
    <a href="./offboarding-${p.slug}/index.html"><span class="mt">Offboarding</span><span class="ms">deck · entrega final</span></a>
    `}${(p.extras || []).map(extLink).join("\n    ")}
  </div>
</div>`;
const menuHTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Apresentações E3 — Índice</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--o:#FF5F1F;--o2:#FF3300}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#050505;color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;padding:48px 24px}
.glow{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none}
.g1{top:-10%;left:12%;width:44vw;height:44vw;background:rgba(255,95,31,.16)}
.g2{bottom:-15%;right:8%;width:40vw;height:40vw;background:rgba(255,51,0,.10)}
.wrap{position:relative;z-index:2;max-width:1180px;margin:0 auto}
header{text-align:center;margin-bottom:44px}
header img{height:64px;margin-bottom:20px;filter:drop-shadow(0 0 22px rgba(255,95,31,.5))}
h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3.2rem);letter-spacing:-.03em}
h1 span{color:var(--o)}
.sub{color:rgba(255,255,255,.5);margin-top:10px;font-size:1.05rem}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px}
.mcard{border:1px solid rgba(255,255,255,.08);border-radius:20px;background:rgba(255,255,255,.02);padding:24px}
.mcard h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1.35rem;margin-bottom:16px}
.mlinks{display:flex;flex-direction:column;gap:10px}
.mlinks a{display:flex;flex-direction:column;padding:13px 16px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.02);text-decoration:none;color:#fff;transition:.25s}
.mlinks a:hover{border-color:var(--o);background:rgba(255,95,31,.08);transform:translateX(3px)}
.mt{font-weight:700;font-size:.98rem}
.ms{font-size:.74rem;color:rgba(255,255,255,.42);letter-spacing:.02em}
.extra{margin-top:22px;text-align:center}
.extra a{display:inline-flex;flex-direction:column;padding:14px 28px;border:1px solid rgba(255,95,31,.4);border-radius:14px;background:rgba(255,95,31,.06);text-decoration:none;color:#fff}
footer{text-align:center;color:rgba(255,255,255,.3);margin-top:40px;font-size:.82rem}
</style></head>
<body>
<span class="glow g1"></span><span class="glow g2"></span>
<div class="wrap">
  <header>
    <img src="${LOGO_URI}" alt="E3"/>
    <h1>Apresentações <span>E3</span></h1>
    <p class="sub">Proposta · Onboarding · Offboarding — por produto</p>
  </header>
  <div class="grid">${PRODUCTS.map(menuCard).join("")}</div>
  <footer>E3 Digital · o hub de marketing e vendas para advogados</footer>
</div>
</body></html>`;
writeFileSync(join(distRoot, "index.html"), menuHTML, "utf8");

console.log("\\nDone. " + decks.length + " deck(s) + menu (index.html) in dist/");
