// E3 Digital — gerador de sites de apresentação (slides) autossuficientes.
// Cada deck vira dist/<slug>/index.html com a estética E3 embutida.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

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
    refresh: '<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
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
          .join("")}</div>${s.note ? `<p class="lead note">${esc(s.note)}</p>` : ""}` };

    case "list": // linhas de pergunta/tópico com ícone (uma ou duas colunas)
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="cards cols-${s.cols || 1} list-rows">${s.items
          .map((it) => `<div class="card">${it.icon ? `<span class="card-ic">${icon(it.icon)}</span>` : ""}<div><p class="card-t">${esc(it.text)}</p></div></div>`)
          .join("")}</div>${s.note ? `<p class="lead note">${esc(s.note)}</p>` : ""}` };

    case "acronym": // sigla grande + pilares (ex.: CPP)
      return { cls: "si-center", html: `${kicker}${s.title ? `<h2 class="h2">${s.title}</h2>` : ""}
        ${s.lead ? `<p class="lead center">${esc(s.lead)}</p>` : ""}
        <div class="acr-big">${esc(s.big)}</div>
        ${s.breakdown
          ? `<div class="acr-grid">${s.breakdown.map((b) => `<div class="acr-card"><span class="acr-letter">${esc(b.letter)}</span><p class="acr-card-t">${esc(b.title)}</p><p class="acr-card-d">${esc(b.desc)}</p></div>`).join("")}</div>`
          : `<div class="acr-pills">${s.pills.map((t) => `<span class="acr-pill">${esc(t)}</span>`).join("")}</div>`}` };

    case "reward": // valor em destaque + formas de receber
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        <p class="lead">${esc(s.lead)}</p>
        <div class="reward">
          <div class="reward-amt"><span class="stat-v">${esc(s.amount)}</span><span class="stat-l">${esc(s.caption)}</span></div>
          <div class="reward-opts"><p class="kicker">${esc(s.optsTitle)}</p><div class="cards cols-1">${s.options
            .map((o) => `<div class="card">${o.icon ? `<span class="card-ic">${icon(o.icon)}</span>` : ""}<div><p class="card-t">${esc(o.title)}</p><p class="card-d">${esc(o.desc)}</p></div></div>`)
            .join("")}</div></div>
        </div>` };

    case "journey": // no formato deck (slides): timeline HORIZONTAL (passos lado a lado)
    case "timeline":
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="timeline-h" style="--n:${s.steps.length}">${s.steps
          .map((st, k) => `<div class="th-step"><div class="th-node">${st.icon ? icon(st.icon) : k + 1}</div><p class="th-w">${esc(st.label)}</p><p class="th-t">${esc(st.title)}</p><p class="th-d">${esc(st.desc)}</p></div>`)
          .join("")}</div>` };

    case "table":
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <table class="tbl"><thead><tr>${s.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${s.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>${s.note ? `<p class="lead note">${esc(s.note)}</p>` : ""}` };

    case "estimate": // orçamento/tempo de resultado: linhas de alerta + stats + nota
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        <div class="est-rows">${s.rows.map((r) => `<div class="est-row">
            <span class="card-ic">${icon(r.icon)}</span>
            <div><p class="est-row-t${r.tone === "alert" ? " est-alert" : ""}">${esc(r.title)}</p><p class="est-row-d">${esc(r.desc)}</p></div>
          </div>`).join("")}</div>
        <div class="est-stats">${s.stats.map((st) => `<div class="est-stat">
            <span class="card-ic">${icon(st.icon)}</span>
            <p class="est-stat-l">${esc(st.label)}</p>
            <p class="est-stat-v">${esc(st.value)}</p>
          </div>`).join("")}</div>
        ${s.note ? `<div class="est-note"><span class="card-ic">${icon(s.note.icon || "calendar")}</span><p>${esc(s.note.text)}</p></div>` : ""}` };

    case "funnel": // funil de marketing (leads → mql → sql → fechamentos), decrescente
      return { cls: "si-funnel", html: `<div class="funnel-head"><div>${kicker}<h2 class="h2">${s.title}</h2></div>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}</div>
        <div class="funnel-wrap">
          <div class="funnel">${s.steps.map((st, k) => `<div class="funnel-bar fb-${k + 1}" style="width:${st.w}%"><span class="fb-t">${esc(st.title)}</span><span class="fb-v">${esc(st.value)}</span></div>`).join("")}</div>
          <div class="funnel-rows">${s.rows.map((r) => `<div class="fr-row ${r.owner === "e3" ? "fr-dark" : "fr-orange"}">
              <span class="fr-n">${r.n}</span>
              <div class="fr-body"><p class="fr-t">${esc(r.title)}</p><p class="fr-d">${esc(r.desc)}</p></div>
              <div class="fr-tags"><span class="fr-badge">${r.owner === "e3" ? "MEDIMOS AQUI" : "VOCÊ INFORMA"}</span>${r.resp ? `<span class="fr-resp">${esc(r.resp)}</span>` : ""}</div>
            </div>`).join("")}</div>
        </div>` };

    case "rules": // diretrizes com badge de meta + callout de justificativa
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="cards cols-1 rules-cards">${s.items.map((it) => `<div class="card rule-card">
            <span class="card-ic">${icon(it.icon)}</span>
            <div><p class="card-t">${esc(it.title)} ${it.badge ? `<span class="rule-badge">${esc(it.badge)}</span>` : ""}</p>
            <p class="card-d">${esc(it.desc)}</p>
            ${it.note ? `<p class="rule-note">${esc(it.note)}</p>` : ""}</div>
          </div>`).join("")}</div>
        ${s.callout ? `<div class="rule-callout"><span class="card-ic">${icon(s.callout.icon || "alert")}</span>
          <div><p class="rule-callout-t">${esc(s.callout.title)}</p><p class="rule-callout-d">${esc(s.callout.desc)}</p></div></div>` : ""}` };

    case "cac": // calculadora interativa de CAC (investimento, CPL, taxa de fechamento)
      return { cls: "", html: `${kicker}<h2 class="h2">${s.title}</h2>
        ${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
        <div class="cac-grid">
          <div class="cac-panel">
            <p class="cac-panel-t"><span class="card-ic">${icon("dollar")}</span>Dados de Entrada</p>
            <div class="cac-field">
              <label for="cacInv">Investimento Mensal (R$)</label>
              <input type="number" id="cacInv" value="5000" min="100" step="100"/>
              <input type="range" id="cacInvR" value="5000" min="500" max="50000" step="100"/>
              <p class="cac-help">Investimento líquido (após dedução de 12,15% de imposto do Meta Ads): <span id="cacLiquido">R$ 4.392,50</span></p>
            </div>
            <div class="cac-field">
              <label for="cacCpl">Média de CPL (R$)</label>
              <input type="number" id="cacCpl" value="15" min="1" step="1"/>
              <input type="range" id="cacCplR" value="15" min="3" max="100" step="1"/>
            </div>
            <div class="cac-field">
              <label for="cacTax">Taxa de Fechamento (%)</label>
              <input type="number" id="cacTax" value="10" min="1" step="1"/>
              <input type="range" id="cacTaxR" value="10" min="1" max="50" step="1"/>
            </div>
          </div>
          <div class="cac-panel">
            <p class="cac-panel-t"><span class="card-ic">${icon("users")}</span>Resultados Estimados</p>
            <div class="cac-result"><p class="cac-r-l">Quantidade de Leads</p><p class="cac-r-v" id="cacLeads">292</p><p class="cac-r-c">leads/mês estimados</p></div>
            <div class="cac-result"><p class="cac-r-l">Contratos Fechados</p><p class="cac-r-v" id="cacContratos">29</p><p class="cac-r-c" id="cacContratosC">contratos/mês com 10% de conversão</p></div>
            <div class="cac-result"><p class="cac-r-l">CAC (Custo por Contrato)</p><p class="cac-r-v" id="cacCac">R$ 151,47</p><p class="cac-r-c">por cliente adquirido</p></div>
            <p class="cac-insight" id="cacInsight">Com R$ 5.000 de investimento, CPL de R$ 15,00 e 10% de fechamento → 29 contratos a R$ 151,47 cada.</p>
          </div>
        </div>
        <script>(function(){
          function fmt(n){return n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
          function calc(){
            var inv=parseFloat(document.getElementById('cacInv').value)||0;
            var cpl=parseFloat(document.getElementById('cacCpl').value)||1;
            var tax=parseFloat(document.getElementById('cacTax').value)||0;
            var liquido=inv*(1-0.1215);
            var leadsExact=liquido/Math.max(cpl,0.01);
            var leads=Math.floor(leadsExact);
            var contratos=Math.round(leadsExact*(tax/100));
            var cac=contratos>0?liquido/contratos:0;
            document.getElementById('cacLiquido').textContent='R$ '+fmt(liquido);
            document.getElementById('cacLeads').textContent=leads.toLocaleString('pt-BR');
            document.getElementById('cacContratos').textContent=contratos.toLocaleString('pt-BR');
            document.getElementById('cacContratosC').textContent='contratos/mês com '+tax+'% de conversão';
            document.getElementById('cacCac').textContent='R$ '+fmt(cac);
            document.getElementById('cacInsight').textContent='Com R$ '+inv.toLocaleString('pt-BR')+' de investimento, CPL de R$ '+fmt(cpl)+' e '+tax+'% de fechamento → '+contratos+' contratos a R$ '+fmt(cac)+' cada.';
          }
          function link(numId,rangeId){
            var n=document.getElementById(numId),r=document.getElementById(rangeId);
            n.addEventListener('input',function(){r.value=n.value;calc()});
            r.addEventListener('input',function(){n.value=r.value;calc()});
          }
          link('cacInv','cacInvR');link('cacCpl','cacCplR');link('cacTax','cacTaxR');
          calc();
        })();</script>` };

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
  return `<section class="slide" data-i="${i}"${s.cap ? ` data-cap="${s.cap}"` : ""}><div class="slide-inner ${cls}">${html}</div></section>`;
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
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
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
.slide-inner .h2{font-size:3.05rem;max-width:20ch}
.slide-inner .lead{font-size:1.2rem}
.slide-inner .cover-logo{height:72px;margin-bottom:26px}
.slide-inner .cover-title{font-size:4.2rem;max-width:18ch}
.slide-inner .cover-sub{font-size:1.2rem}
.slide-inner .cover-kicker{margin-bottom:12px}
.slide-inner .section-num{font-size:9.5rem}
.slide-inner .section-title{font-size:3rem}
.slide-inner .q-text{font-size:2.5rem}
.slide-inner .q-mark{font-size:6rem}
.slide-inner .stat-v{font-size:2.7rem}
.slide-inner .agenda li{font-size:1.28rem}
.slide-inner .card-t{font-size:1.18rem}
.slide-inner .tl-t{font-size:1.28rem}
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
.agenda li{display:flex;align-items:center;gap:20px;padding:17px 22px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.02);font-size:clamp(1.1rem,1.7vw,1.32rem);font-weight:500;transition:.3s}
.agenda li:hover{border-color:rgba(255,95,31,.4);background:rgba(255,95,31,.05)}
.ag-n{font-family:var(--d);font-weight:800;color:var(--o);font-size:1.1rem;min-width:32px}
/* stats */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;margin:6px 0 4px}
.stat{display:flex;flex-direction:column;align-items:center;gap:10px;padding:clamp(24px,4vw,48px) 20px;text-align:center;border-right:1px solid rgba(255,255,255,.07)}
.stat:last-child{border-right:0}
.stat-v{font-family:var(--d);font-weight:800;font-size:clamp(1.85rem,3.8vw,3.15rem);color:var(--o);letter-spacing:-.02em}
.stat-l{font-size:.92rem;color:rgba(255,255,255,.45);max-width:16ch;line-height:1.35}
/* cards */
.cards{display:grid;gap:16px}
.cols-1{grid-template-columns:1fr}
.cols-2{grid-template-columns:repeat(2,1fr)}
.cols-3{grid-template-columns:repeat(3,1fr)}
.note{margin-top:4px;color:rgba(255,255,255,.72)}
.list-rows .card{align-items:center;padding:16px 20px}
.list-rows .card-t{margin-bottom:0;font-size:1.12rem}
.acr-big{font-family:var(--d);font-weight:800;font-size:7.4rem;letter-spacing:.14em;line-height:.95;color:#fff;margin:6px 0 20px;text-shadow:0 0 70px rgba(255,95,31,.35)}
.acr-pills{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.acr-pill{font-size:1.08rem;font-weight:600;color:#fff;border:1.5px solid rgba(255,95,31,.55);background:rgba(255,95,31,.07);padding:14px 26px;border-radius:999px}
.acr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;width:100%;max-width:920px;margin:4px auto 0}
.acr-card{text-align:left;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:22px 22px 24px;background:rgba(255,255,255,.025)}
.acr-letter{width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--o),var(--o2));color:#fff;font-family:var(--d);font-weight:800;font-size:1.3rem;display:grid;place-items:center;margin-bottom:14px;box-shadow:0 0 18px rgba(255,95,31,.4)}
.acr-card-t{font-family:var(--d);font-weight:700;font-size:1.15rem;line-height:1.2;margin-bottom:7px}
.acr-card-d{font-size:.92rem;color:rgba(255,255,255,.58);line-height:1.45}
.reward{display:grid;grid-template-columns:.85fr 1.15fr;gap:22px;align-items:center;margin-top:8px}
.reward-amt{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;padding:34px 20px;border:1px solid rgba(255,95,31,.4);border-radius:20px;background:rgba(255,95,31,.06)}
.reward-amt .stat-v{font-size:3.8rem}
.reward-opts .kicker{margin-bottom:10px}
.cols-4{grid-template-columns:repeat(4,1fr)}
.card{display:flex;gap:16px;align-items:flex-start;padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.025);transition:.3s}
.card:hover{border-color:rgba(255,95,31,.32);transform:translateY(-2px)}
.card-ic{flex:0 0 auto;width:44px;height:44px;display:grid;place-items:center;border-radius:12px;background:rgba(255,95,31,.12);color:var(--o)}
.card-ic svg{width:22px;height:22px}
.card-t{font-family:var(--d);font-weight:700;font-size:1.18rem;line-height:1.22;margin-bottom:5px}
.card-d{font-size:.95rem;color:rgba(255,255,255,.5);line-height:1.5}
/* timeline */
.timeline{display:flex;flex-direction:column;gap:0;max-width:74ch}
.tl-step{display:flex;gap:20px;position:relative;padding-bottom:20px}
.tl-step:not(:last-child) .tl-node::after{content:"";position:absolute;top:44px;left:50%;transform:translateX(-50%);width:2px;height:calc(100% - 30px);background:linear-gradient(rgba(255,95,31,.5),rgba(255,95,31,.08))}
.tl-node{position:relative;flex:0 0 auto;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-family:var(--d);font-weight:800;background:linear-gradient(135deg,var(--o),var(--o2));color:#fff;box-shadow:0 0 20px rgba(255,95,31,.4)}
.tl-node svg{width:20px;height:20px}
.tl-body{padding-top:4px}
.tl-w{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--o);font-weight:700}
.tl-t{font-family:var(--d);font-weight:700;font-size:1.28rem;margin:2px 0 4px}
.tl-d{font-size:.97rem;color:rgba(255,255,255,.5);line-height:1.5;max-width:60ch}
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
.tbl{width:100%;border-collapse:collapse;font-size:clamp(.9rem,1.5vw,1.05rem);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden}
.tbl th{background:rgba(255,95,31,.1);color:var(--o);text-align:left;padding:14px 18px;font-family:var(--d);font-weight:700;font-size:.94rem;letter-spacing:.02em}
.tbl td{padding:13px 18px;border-top:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.72);vertical-align:top}
.tbl tr:nth-child(even) td{background:rgba(255,255,255,.015)}
/* funnel (marketing) */
.si-funnel{gap:14px}
.funnel-head{display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:end}
.funnel-head .h2{font-size:3rem;max-width:none}
.funnel-head .lead{font-size:1.05rem;max-width:none;padding-bottom:4px}
.funnel-wrap{display:grid;grid-template-columns:.72fr 1.28fr;gap:24px;align-items:center;margin-top:10px}
.funnel{display:flex;flex-direction:column;align-items:center;gap:7px}
.funnel-bar{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;height:78px;clip-path:polygon(6% 0,94% 0,88% 100%,12% 100%);color:#fff}
.fb-t{font-family:var(--d);font-weight:800;font-size:1.34rem;letter-spacing:.01em;line-height:1.1}
.fb-v{font-size:1.04rem;font-weight:700;opacity:.92}
.fb-1{background:linear-gradient(90deg,#3a3f47,#4a5059)}
.fb-2{background:linear-gradient(90deg,#a4431f,#c8511f)}
.fb-3{background:linear-gradient(90deg,#dd5620,var(--o))}
.fb-4{background:linear-gradient(90deg,var(--o),var(--o2))}
.funnel-rows{display:flex;flex-direction:column;gap:11px}
.fr-row{display:flex;align-items:center;gap:18px;padding:15px 20px;border-radius:14px}
.fr-dark{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}
.fr-orange{background:linear-gradient(90deg,rgba(255,95,31,.16),rgba(255,51,0,.12));border:1px solid rgba(255,95,31,.3)}
.fr-n{font-family:var(--d);font-weight:800;font-size:1.6rem;color:rgba(255,255,255,.5);min-width:24px}
.fr-body{flex:1}
.fr-t{font-family:var(--d);font-weight:700;font-size:1.2rem;line-height:1.2;margin-bottom:4px}
.fr-d{font-size:1rem;color:rgba(255,255,255,.6);line-height:1.35}
.fr-tags{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:6px}
.fr-badge{font-size:.78rem;font-weight:800;letter-spacing:.05em;padding:8px 15px;border-radius:999px;white-space:nowrap}
.fr-dark .fr-badge{background:rgba(255,255,255,.12);color:rgba(255,255,255,.75)}
.fr-orange .fr-badge{background:#fff;color:#c8511f}
.fr-resp{font-size:.76rem;font-weight:700;letter-spacing:.04em;color:var(--o);border:1px solid rgba(255,95,31,.45);padding:5px 13px;border-radius:999px;white-space:nowrap}
.fr-dark .fr-resp{color:rgba(255,255,255,.7);border-color:rgba(255,255,255,.2)}
/* estimate (orçamento & tempo de resultado) */
.est-rows{display:flex;flex-direction:column;gap:12px;margin-top:4px}
.est-row{display:flex;gap:16px;align-items:flex-start;padding:20px 22px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.02)}
.est-row-t{font-family:var(--d);font-weight:700;font-size:1.05rem;margin-bottom:5px}
.est-row-t.est-alert{color:var(--o)}
.est-row-d{font-size:.9rem;color:rgba(255,255,255,.55);line-height:1.45}
.est-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
.est-stat{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:26px 20px;border:1px solid rgba(255,95,31,.35);border-radius:16px;background:rgba(255,95,31,.06)}
.est-stat-l{font-family:var(--d);font-weight:700;font-size:1rem}
.est-stat-v{font-family:var(--d);font-weight:800;font-size:1.7rem;color:var(--o)}
.est-note{display:flex;gap:14px;align-items:center;margin-top:16px;padding:16px 20px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02)}
.est-note p{font-size:.88rem;color:rgba(255,255,255,.6);line-height:1.45}
/* rules (diretrizes) */
.rules-cards .card{align-items:flex-start;padding:22px 24px}
.rule-badge{display:inline-block;margin-left:8px;font-size:.72rem;font-weight:700;letter-spacing:.03em;color:var(--o);border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.08);padding:3px 12px;border-radius:999px;vertical-align:middle}
.rule-note{margin-top:5px;font-size:.78rem;color:rgba(255,255,255,.4);line-height:1.4}
.rule-callout{display:flex;gap:16px;align-items:flex-start;margin-top:2px;padding:18px 22px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.02)}
.rule-callout-t{font-family:var(--d);font-weight:700;font-size:.98rem;margin-bottom:5px}
.rule-callout-d{font-size:.85rem;color:rgba(255,255,255,.55);line-height:1.55}
/* cac calculator */
.cac-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:4px}
.cac-panel{border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.02);padding:22px}
.cac-panel-t{display:flex;align-items:center;gap:12px;font-family:var(--d);font-weight:700;font-size:1rem;margin-bottom:18px}
.cac-panel-t .card-ic{width:34px;height:34px}
.cac-panel-t .card-ic svg{width:17px;height:17px}
.cac-field{margin-bottom:16px}
.cac-field:last-child{margin-bottom:0}
.cac-field label{display:block;font-size:.8rem;color:rgba(255,255,255,.6);margin-bottom:7px;font-weight:500}
.cac-field input[type=number]{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 14px;color:#fff;font-family:var(--s);font-size:1rem;font-weight:600;margin-bottom:8px}
.cac-field input[type=number]:focus{outline:none;border-color:var(--o)}
.cac-field input[type=range]{width:100%;accent-color:var(--o);height:4px}
.cac-help{margin-top:8px;font-size:.75rem;color:rgba(255,255,255,.45);line-height:1.4}
.cac-help span{color:var(--o);font-weight:700}
.cac-result{border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px;margin-bottom:12px}
.cac-r-l{font-size:.78rem;color:rgba(255,255,255,.55);margin-bottom:4px}
.cac-r-v{font-family:var(--d);font-weight:800;font-size:1.7rem;color:var(--o)}
.cac-r-c{font-size:.72rem;color:rgba(255,255,255,.4);margin-top:2px}
.cac-insight{margin-top:6px;padding:14px 16px;border-radius:12px;border:1px solid rgba(255,95,31,.35);background:rgba(255,95,31,.08);font-size:.82rem;line-height:1.5;color:rgba(255,255,255,.85)}
@media(max-width:720px){.cac-grid{grid-template-columns:1fr}}
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
    var cap=parseFloat(slide.getAttribute('data-cap'))||1.15;
    var sc=Math.min(availW/w, availH/h, cap);
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
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
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

/* ─── playbooks (HTML responsivo, com "Baixar PDF" via impressão) ─── */
for (const gen of ["gen-playbook.mjs", "gen-playbook-entrega.mjs", "gen-manual-evolucao.mjs", "gen-playbook-evolucao.mjs", "gen-manual-estruturacao.mjs", "gen-playbook-estruturacao.mjs", "gen-teses.mjs", "gen-links.mjs", "gen-cursos.mjs"]) {
  execFileSync(process.execPath, [join(__dirname, "scripts", gen)], { stdio: "inherit" });
}

/* ─── página-menu (índice): Hub E3 ─── */
copyFileSync(join(__dirname, "assets", "favicon.png"), join(distRoot, "favicon.png"));
copyFileSync(join(__dirname, "assets", "apple-touch-icon.png"), join(distRoot, "apple-touch-icon.png"));

const HUB_ICONS = {
  deck: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>',
  site: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  form: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>',
  video: '<rect x="2" y="4" width="20" height="16" rx="3"/><polygon points="10 9 15 12 10 15 10 9"/>',
  course: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
};
const hubIcon = (k) => `<span class="ico ico-${k}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${HUB_ICONS[k]}</svg></span>`;
const ARROW = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

const CONSULTORIA_COMERCIAL = { label: "Consultoria Comercial", sub: "Playbook comercial", kind: "site", href: "https://consultoria-comercial-e3.vercel.app" };

const PRODUCTS = [
  {
    id: "assessoria", name: "Assessoria Light & Pro", desc: "Gestão de tráfego, CRM e presença digital",
    links: [
      { label: "Onboarding", sub: "Kickoff com o cliente", kind: "deck", href: "./onboarding-assessoria-light-pro/index.html" },
      { label: "Manual de Entrega", sub: "Escopo e alinhamento", kind: "doc", href: "./playbook-entrega-alinhamento/index.html" },
      { label: "Playbook de Funções", sub: "Escopo, rotinas e KPIs", kind: "doc", href: "./playbook-assessoria-light-pro/index.html" },
      CONSULTORIA_COMERCIAL,
    ],
  },
  {
    id: "aceleracao", name: "Aceleração Comercial", desc: "Estruturação do comercial do escritório",
    links: [
      { label: "Onboarding", sub: "Kickoff com o cliente", kind: "deck", href: "./onboarding-aceleracao-comercial/index.html" },
      CONSULTORIA_COMERCIAL,
    ],
  },
  {
    id: "evolucao", name: "Evolução", desc: "Posicionamento, conteúdo e presença digital",
    links: [
      { label: "Onboarding", sub: "Kickoff com o cliente", kind: "deck", href: "./onboarding-evolucao-juridica/index.html" },
      { label: "Manual de Entrega", sub: "Entregas e alinhamento", kind: "doc", href: "./manual-entrega-evolucao-juridica/index.html" },
      { label: "Playbook de Funções", sub: "Escopo, rotinas e KPIs", kind: "doc", href: "./playbook-evolucao-juridica/index.html" },
      CONSULTORIA_COMERCIAL,
      { label: "Forms 360°", sub: "Formulário de diagnóstico", kind: "form", href: "https://forms.gle/iZQ3dn1iJUEWcgeH7" },
      { label: "Auditoria Criativa", sub: "Diagnóstico criativo do Instagram", kind: "deck", href: "./auditoria-criativa/index.html" },
    ],
  },
  {
    id: "estruturacao", name: "Estruturação", desc: "Diagnóstico, CRM, mídia e comercial em 6 semanas",
    links: [
      { label: "Onboarding", sub: "Kickoff com o cliente", kind: "deck", href: "./onboarding-estruturacao-pro/index.html" },
      { label: "Manual de Entrega", sub: "Entregas e alinhamento", kind: "doc", href: "./manual-entrega-estruturacao-pro/index.html" },
      { label: "Playbook de Funções", sub: "Escopo, rotinas e KPIs", kind: "doc", href: "./playbook-estruturacao-pro/index.html" },
      CONSULTORIA_COMERCIAL,
      { label: "Forms 360°", sub: "Formulário de diagnóstico", kind: "form", href: "https://forms.gle/2SPjwk6HiPpgXgsq9" },
      { label: "Auditoria Criativa", sub: "Diagnóstico criativo do Instagram", kind: "deck", href: "./auditoria-criativa/index.html" },
      { label: "Auditoria de Mídia Paga", sub: "Funil, vídeos e campanhas", kind: "deck", href: "./auditoria-midia-paga-estruturacao/index.html" },
    ],
  },
];

const KNOWLEDGE = [
  { label: "Cursos", sub: "Comercial interno e plataformas", kind: "course", href: "./cursos/index.html" },
  { label: "Apresentação da Empresa", sub: "Playlist · YouTube", kind: "video", href: "https://youtube.com/playlist?list=PLDqQzbm7q4NQ&si=Mf2_kLJ63HbhvBpB" },
  { label: "Materiais PDF", sub: "Teses e materiais de apoio", kind: "folder", href: "./materiais-pdf/index.html" },
  { label: "Links Úteis", sub: "Formulários e links", kind: "link", href: "./links-uteis/index.html" },
];

const linkAttrs = (href) => (href.startsWith("http") ? ' target="_blank" rel="noopener"' : "");
const searchKey = (...parts) => esc(parts.join(" ").toLowerCase());

const knowCard = (k) => `<a class="kcard" href="${k.href}"${linkAttrs(k.href)} data-q="${searchKey(k.label, k.sub, "conhecimento")}">
        ${hubIcon(k.kind)}<span class="kt">${esc(k.label)}</span><span class="ks">${esc(k.sub)}</span>${ARROW}</a>`;

const prodItem = (p, l) => `<a class="item" href="${l.href}"${linkAttrs(l.href)} data-q="${searchKey(l.label, l.sub, p.name)}">
          ${hubIcon(l.kind)}<span class="it-txt"><span class="it">${esc(l.label)}</span><span class="is">${esc(l.sub)}</span></span>${ARROW}</a>`;

const prodCard = (p) => `<section class="pcard" data-p="${p.id}">
      <header class="phead"><div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p></div><span class="count">${p.links.length} materiais</span></header>
      <div class="items">
        ${p.links.map((l) => prodItem(p, l)).join("\n        ")}
      </div>
    </section>`;

const menuHTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Hub E3 — E3 Digital</title>
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--o:#FF5F1F;--o2:#FF3300;--bg:#0d0a09;--card:#161211;--card2:#1c1715;--line:rgba(255,255,255,.07);--line2:rgba(255,255,255,.12);--mute:rgba(255,255,255,.5);--d:'Bricolage Grotesque',sans-serif;--s:'DM Sans',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:90px}
body{background:var(--bg);color:#fff;font-family:var(--s);min-height:100vh;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.glow{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none;z-index:0}
.g1{top:-10%;left:12%;width:44vw;height:44vw;background:rgba(255,95,31,.16)}
.g2{bottom:-15%;right:8%;width:40vw;height:40vw;background:rgba(255,51,0,.10)}
.top{position:sticky;top:0;z-index:20;background:rgba(13,10,9,.82);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.top-in{max-width:1320px;margin:0 auto;padding:16px 32px;display:flex;align-items:center;gap:28px}
.brand img{height:42px;width:auto;display:block}
.search{flex:1;max-width:600px;margin:0 auto;position:relative}
.search svg{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:17px;height:17px;color:var(--mute);pointer-events:none}
.search input{width:100%;height:46px;border-radius:12px;border:1px solid var(--line2);background:var(--card);color:#fff;font-family:var(--s);font-size:.95rem;padding:0 64px 0 44px;outline:none;transition:.2s}
.search input::placeholder{color:rgba(255,255,255,.38)}
.search input:focus{border-color:rgba(255,95,31,.55);box-shadow:0 0 0 4px rgba(255,95,31,.1)}
.search kbd{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-family:var(--s);font-size:.72rem;color:var(--mute);border:1px solid var(--line2);border-radius:6px;padding:3px 7px;background:rgba(255,255,255,.03)}
.nav{display:flex;gap:26px;font-weight:600;font-size:.93rem}
.nav a{color:rgba(255,255,255,.85);transition:.2s}
.nav a:hover{color:var(--o)}
main{position:relative;z-index:2;max-width:1320px;margin:0 auto;padding:56px 32px 80px}
.hero h1{font-family:var(--d);font-weight:800;font-size:clamp(2.8rem,6vw,4.4rem);letter-spacing:-.035em;line-height:1}
.hero h1 span{color:var(--o)}
.hero p{color:rgba(255,255,255,.62);font-size:1.12rem;margin-top:14px}
.sec{margin-top:56px}
.sec-h{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 16px;margin-bottom:20px}
.sec-h h2{font-family:var(--d);font-weight:800;font-size:1.6rem;letter-spacing:-.02em}
.sec-h p{color:var(--mute);font-size:.95rem}
.kgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.kcard{position:relative;display:flex;flex-direction:column;padding:20px 22px 22px;border:1px solid var(--line);border-radius:16px;background:var(--card);transition:.25s}
.kcard .ico{margin-bottom:16px}
.kt{font-weight:700;font-size:1.05rem}
.ks{color:var(--mute);font-size:.86rem;margin-top:4px}
.arr{position:absolute;top:18px;right:18px;width:17px;height:17px;color:rgba(255,255,255,.3);transition:.25s}
.kcard:hover,.item:hover{border-color:rgba(255,95,31,.45);background:var(--card2)}
.kcard:hover .arr,.item:hover .arr{color:var(--o);transform:translate(2px,-2px)}
.pills{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:22px}
.pill{font-family:var(--s);font-weight:600;font-size:.92rem;color:#fff;background:transparent;border:1px solid var(--line2);border-radius:999px;padding:11px 20px;cursor:pointer;transition:.2s}
.pill:hover{border-color:rgba(255,95,31,.5)}
.pill.on{background:linear-gradient(135deg,var(--o),var(--o2));border-color:transparent;box-shadow:0 8px 24px rgba(255,95,31,.25)}
.pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;align-items:start}
.pcard{border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.015);padding:28px}
.phead{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:22px}
.phead h3{font-family:var(--d);font-weight:800;font-size:1.55rem;letter-spacing:-.02em}
.phead p{color:var(--mute);font-size:.93rem;margin-top:5px}
.count{flex:0 0 auto;font-weight:700;font-size:.8rem;color:rgba(255,255,255,.85);background:rgba(255,255,255,.06);border-radius:999px;padding:7px 13px}
.items{display:flex;flex-direction:column;gap:11px}
.item{position:relative;display:flex;align-items:center;gap:16px;padding:15px 52px 15px 16px;border:1px solid var(--line);border-radius:14px;background:var(--card);transition:.25s}
.item .arr{top:50%;margin-top:-8.5px}
.item:hover .arr{transform:translate(2px,-2px)}
.it-txt{display:flex;flex-direction:column;min-width:0}
.it{font-weight:700;font-size:1.02rem}
.is{color:var(--mute);font-size:.84rem;margin-top:2px}
.ico{flex:0 0 auto;width:44px;height:44px;border-radius:12px;display:grid;place-items:center}
.ico svg{width:20px;height:20px}
.ico-deck,.ico-folder{background:rgba(255,95,31,.14);color:#ff7a45}
.ico-doc{background:rgba(214,170,120,.14);color:#e2b98a}
.ico-site,.ico-link{background:rgba(110,150,255,.14);color:#8aa8ff}
.ico-form{background:rgba(80,200,140,.14);color:#6fd6a3}
.ico-video{background:rgba(240,90,120,.14);color:#f2849a}
.ico-course{background:rgba(190,130,255,.14);color:#c39bff}
.empty{display:none;text-align:center;color:var(--mute);padding:48px 0;font-size:1rem}
.hide{display:none!important}
footer{position:relative;z-index:2;text-align:center;color:rgba(255,255,255,.3);font-size:.82rem;padding:0 32px 40px}
@media(max-width:1100px){.kgrid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:900px){.pgrid{grid-template-columns:1fr}.nav{display:none}}
@media(max-width:600px){.top-in{padding:12px 16px;gap:14px}.brand img{height:28px}.search kbd{display:none}.search input{padding-right:14px}main{padding:36px 16px 60px}.kgrid{grid-template-columns:1fr}.pcard{padding:20px}}
</style></head>
<body>
<span class="glow g1"></span><span class="glow g2"></span>
<header class="top"><div class="top-in">
  <a class="brand" href="./index.html"><img src="${LOGO_URI}" alt="E3 Digital"/></a>
  <label class="search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input id="q" type="search" placeholder="Buscar deck, playbook, curso..." autocomplete="off" aria-label="Buscar"/>
    <kbd id="kbd">⌘K</kbd>
  </label>
  <nav class="nav"><a href="#conhecimento">Conhecimento</a><a href="#produtos">Produtos</a></nav>
</div></header>
<main>
  <section class="hero">
    <h1>Hub <span>E3</span></h1>
    <p>Tudo o que o time usa com o cliente — da proposta à consultoria — em um só lugar.</p>
  </section>

  <section class="sec" id="conhecimento">
    <div class="sec-h"><h2>Conhecimento</h2><p>Capacitação interna e teses estratégicas · uso interno</p></div>
    <div class="kgrid">
      ${KNOWLEDGE.map(knowCard).join("\n      ")}
    </div>
  </section>

  <section class="sec" id="produtos">
    <div class="sec-h"><h2>Produtos</h2><p>Materiais de cada produto, do onboarding à entrega</p></div>
    <div class="pills" role="tablist">
      <button class="pill on" data-f="all">Todos</button>
      ${PRODUCTS.map((p) => `<button class="pill" data-f="${p.id}">${esc(p.name)}</button>`).join("\n      ")}
    </div>
    <div class="pgrid">
    ${PRODUCTS.map(prodCard).join("\n    ")}
    </div>
  </section>
  <p class="empty" id="empty">Nenhum material encontrado para essa busca.</p>
</main>
<footer>E3 Digital · o hub de marketing e vendas para advogados</footer>
<script>
(function(){
  var q = document.getElementById('q'), empty = document.getElementById('empty');
  var pills = [].slice.call(document.querySelectorAll('.pill'));
  var cards = [].slice.call(document.querySelectorAll('.pcard'));
  var kcards = [].slice.call(document.querySelectorAll('.kcard'));
  var know = document.getElementById('conhecimento');
  var filter = 'all';
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) document.getElementById('kbd').textContent = 'Ctrl K';
  function norm(t){ return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function apply(){
    var term = norm(q.value.trim()), shown = 0;
    kcards.forEach(function(k){ var ok = !term || norm(k.dataset.q).indexOf(term) > -1; k.classList.toggle('hide', !ok); if (ok) shown++; });
    know.classList.toggle('hide', !!term && !kcards.some(function(k){ return !k.classList.contains('hide'); }));
    cards.forEach(function(c){
      var inFilter = filter === 'all' || c.dataset.p === filter, any = false;
      c.querySelectorAll('.item').forEach(function(it){
        var ok = inFilter && (!term || norm(it.dataset.q).indexOf(term) > -1);
        it.classList.toggle('hide', !ok); if (ok) { any = true; shown++; }
      });
      c.classList.toggle('hide', !any);
    });
    empty.style.display = shown ? 'none' : 'block';
  }
  pills.forEach(function(p){ p.addEventListener('click', function(){
    filter = p.dataset.f; pills.forEach(function(x){ x.classList.toggle('on', x === p); }); apply();
  }); });
  q.addEventListener('input', apply);
  document.addEventListener('keydown', function(e){
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); q.focus(); q.select(); }
    else if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
    else if (e.key === 'Escape' && document.activeElement === q) { q.value = ''; apply(); q.blur(); }
  });
})();
</script>
</body></html>`;
writeFileSync(join(distRoot, "index.html"), menuHTML, "utf8");

console.log("\\nDone. " + decks.length + " deck(s) + menu (index.html) in dist/");
