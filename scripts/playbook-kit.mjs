// Kit compartilhado dos playbooks/manuais: slides 16:9 (1280x720), mesmo padrão dos decks de onboarding.
// Centraliza CSS e componentes usados pelos 5 geradores (Assessoria e Evolução: Playbook + Manual; Estruturação: Manual).
export const LOGO_B64_PATH = new URL("../logo_e3.b64", import.meta.url);

export const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap');
@page{size:1280px 720px;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
:root{--o:#FF5F1F;--o2:#FF3300;--bg:#050505;--d:'Bricolage Grotesque',sans-serif;--s:'DM Sans',sans-serif}
html,body{background:var(--bg);color:#fff;font-family:var(--s);-webkit-font-smoothing:antialiased}
.page{position:relative;width:1280px;height:720px;overflow:hidden;background:var(--bg);page-break-after:always}
.page:last-child{page-break-after:auto}
.amb{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.amb::before{content:"";position:absolute;top:-18%;left:-8%;width:46%;height:60%;border-radius:50%;background:rgba(255,95,31,.16);filter:blur(90px)}
.amb::after{content:"";position:absolute;bottom:-20%;right:-8%;width:42%;height:56%;border-radius:50%;background:rgba(255,51,0,.10);filter:blur(90px)}
.pbody{position:relative;z-index:2;padding:40px 64px 0}
.pfoot{position:absolute;left:64px;right:64px;bottom:20px;z-index:2;display:flex;justify-content:space-between;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.35)}
.pfoot b{color:var(--o)}
.kicker{font-family:var(--s);font-size:17px;letter-spacing:.14em;text-transform:uppercase;color:var(--o);font-weight:700;margin-bottom:9px}
.h2{font-family:var(--d);font-weight:800;font-size:42px;letter-spacing:-.01em;margin-bottom:13px}
.h3{font-family:var(--d);font-weight:800;font-size:24px;letter-spacing:-.01em;margin:14px 0 9px}
.body{font-size:19px;line-height:1.45;color:rgba(255,255,255,.75);margin-bottom:10px}
.body b{color:#fff;font-weight:700}
.muted{font-weight:400;color:rgba(255,255,255,.5);font-size:15px}
/* CAPA */
.cover .pbody{padding:0 84px;display:flex;flex-direction:column;justify-content:center;height:100%}
.cover .logo{width:130px;margin:0 0 20px}
.cov-k{margin-bottom:13px}
.cover h1{font-family:var(--d);font-weight:800;font-size:66px;line-height:1.03;letter-spacing:-.02em;margin-bottom:16px}
.cover h1 span{color:var(--o)}
.cov-sub{font-size:20px;line-height:1.5;color:rgba(255,255,255,.73);max-width:60ch;margin-bottom:22px}
.pills{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px}
.pill{font-size:14.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#fff;border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.06);padding:10px 20px;border-radius:999px}
.cov-rule{height:1px;background:rgba(255,255,255,.12);margin-bottom:12px}
.cov-foot{font-size:16px;color:rgba(255,255,255,.42)}
/* stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden;margin:12px 0}
.stat{display:flex;flex-direction:column;align-items:center;gap:5px;padding:15px 8px;text-align:center;border-right:1px solid rgba(255,255,255,.08)}
.stat:last-child{border-right:0}
.sv{font-family:var(--d);font-weight:800;font-size:32px;color:var(--o)}
.sl{font-size:14px;color:rgba(255,255,255,.54);line-height:1.28}
/* callout */
.callout{display:flex;gap:15px;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:15px 19px;background:rgba(255,255,255,.02);margin-bottom:12px}
.isq{flex:0 0 auto;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));color:#fff}
.isq svg{width:21px;height:21px}
.callout h4{font-family:var(--d);font-weight:700;font-size:19px;margin:2px 0 5px}
.cd{font-size:16px;line-height:1.38;color:rgba(255,255,255,.64)}
.cd b{color:#fff}
/* quote */
.quote{border-left:3px solid var(--o);padding:12px 18px;background:rgba(255,95,31,.04)}
.quote p{font-size:16px;line-height:1.42;color:rgba(255,255,255,.72);margin-top:6px}
.quote p:first-of-type{margin-top:0}
.quote b{color:var(--o)}
.qk{font-family:var(--s);font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--o);font-weight:700}
.quote.inline{margin:8px 0 10px;background:rgba(255,255,255,.02);border-left:3px solid var(--o)}
.quote.inline p{color:rgba(255,255,255,.78);margin:0}
.quote.inline b{color:var(--o)}
/* sechead */
.sechead{display:flex;align-items:flex-start;gap:18px;margin-bottom:11px}
.secnum{font-family:var(--d);font-weight:800;font-size:56px;line-height:.8;color:transparent;-webkit-text-stroke:1.8px rgba(255,95,31,.6)}
.sechead h2{font-family:var(--d);font-weight:800;font-size:34px;letter-spacing:-.01em;margin-bottom:6px}
.sechead .lead{font-size:16px;color:rgba(255,255,255,.59);line-height:1.35}
.rule{height:1px;background:rgba(255,255,255,.1);margin-bottom:13px}
/* cards */
.card{border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(255,255,255,.02);padding:17px 21px;margin-bottom:11px}
.chead{display:flex;align-items:center;gap:13px;margin-bottom:9px}
.chead h3{font-family:var(--d);font-weight:800;font-size:24px;display:flex;align-items:center;gap:11px}
.chead .kicker{margin-bottom:2px}
/* tags */
.tag{display:inline-block;font-family:var(--s);font-size:13px;font-weight:800;letter-spacing:.04em;padding:5px 12px;border-radius:999px;vertical-align:middle}
.tag-both{color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06)}
.tag-pro{color:var(--o);border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.1)}
.tag-light{color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.04)}
.dense .rules{gap:8px}
.dense .rule-item{padding:10px 15px}
.dense .rd{line-height:1.28}
.notabar{display:flex;gap:11px;align-items:baseline;border-left:3px solid var(--o);background:rgba(255,95,31,.07);border-radius:0 10px 10px 0;padding:9px 15px;margin-bottom:11px;font-size:14.5px;line-height:1.35;color:rgba(255,255,255,.78)}
.notabar .nk{flex:0 0 auto;font-weight:800;color:var(--o);font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.notabar b{color:#fff}
.cpl{display:inline-block;margin-left:5px;font-size:12.5px;font-weight:800;letter-spacing:.02em;color:var(--o);border:1px solid rgba(255,95,31,.45);background:rgba(255,95,31,.09);padding:2px 9px;border-radius:999px;white-space:nowrap}
.blk .kicker .tag{margin-left:4px;transform:translateY(-1px)}
.legend{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.lg-item{display:flex;align-items:center;gap:10px;font-size:16px;color:rgba(255,255,255,.64)}
.lg-item b{color:#fff}
/* pilares lado a lado */
.pilares3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.feats{display:flex;flex-direction:column;gap:9px}
.feat{position:relative;padding-left:16px}
.feat::before{content:"";position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:999px;background:var(--o)}
.ft{font-family:var(--s);font-weight:700;font-size:17px;margin-bottom:3px}
.fd{font-size:14.5px;color:rgba(255,255,255,.54);line-height:1.28}
/* grid2/3 · blk · bul */
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:9px 26px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:9px 18px}
.blk .kicker{font-size:13.5px;letter-spacing:.05em;margin-bottom:4px}
.bul{list-style:none}
.bul li{position:relative;padding-left:16px;font-size:16px;line-height:1.32;color:rgba(255,255,255,.76);margin-bottom:3px}
.bul li::before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:999px;background:var(--o)}
.bul li b{color:#fff}
/* split em 2 colunas (rotina + kpis lado a lado, etc.) */
.split2{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
/* tabelas */
.tblw{width:100%}
.tbl{width:100%;border-collapse:collapse;font-size:16px;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden}
.tbl th{background:linear-gradient(90deg,rgba(255,95,31,.16),rgba(255,51,0,.05));color:var(--o);text-align:left;padding:10px 16px;font-family:var(--d);font-weight:700;font-size:14.5px;letter-spacing:.01em}
.tbl td{padding:9px 16px;border-top:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.74);vertical-align:top;line-height:1.28}
.tbl td.k{color:#fff;font-weight:700}
.tbl td b{color:var(--o)}
/* rules (ritos / SLA) */
.rules{display:flex;flex-direction:column;gap:9px;margin-bottom:13px}
.rules.grid2r{display:grid;grid-template-columns:1fr 1fr;gap:9px 18px}
.rule-item{display:flex;gap:13px;align-items:flex-start;border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:12px 16px;background:rgba(255,255,255,.02)}
.nbadge{flex:0 0 auto;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));font-family:var(--d);font-weight:800;font-size:16px;color:#fff}
.rt{font-family:var(--s);font-weight:700;font-size:17.5px;margin-bottom:3px}
.rd{font-size:14.5px;line-height:1.32;color:rgba(255,255,255,.64)}
.rd b{color:var(--o)}
.commit{border:1px solid rgba(255,95,31,.35);border-radius:16px;padding:22px 32px;text-align:center}
.commit-pill{display:inline-block;font-size:14px;font-weight:700;letter-spacing:.08em;color:var(--o);border:1px solid rgba(255,95,31,.5);border-radius:999px;padding:7px 17px;margin-bottom:11px}
.commit-t{font-family:var(--d);font-weight:800;font-size:28px;letter-spacing:-.01em;margin-bottom:9px}
.commit-d{font-size:16.5px;line-height:1.38;color:rgba(255,255,255,.6);max-width:72ch;margin:0 auto}
.commit-solo{margin-top:60px}
`;

export function makePageFactory(footerLabel, NAV) {
  let folio = 0;
  const SECTIONS = [];
  let pageIdx = 0;
  const page = (body, opts = {}) => {
    const idx = pageIdx++;
    const label = NAV[idx];
    const id = label ? `s${idx}` : "";
    if (label) SECTIONS.push({ id, label });
    return `<section class="page${opts.cover ? " cover" : ""}"${id ? ` id="${id}"` : ""}${label ? ` data-label="${label}"` : ""}>
  <div class="amb"></div>
  <div class="pbody">${body}</div>
  ${opts.cover ? "" : `<div class="pfoot"><span>${footerLabel} · <b>E3</b></span><span>${String(++folio).padStart(2, "0")}</span></div>`}
</section>`;
  };
  return { page, SECTIONS };
}

export const secHead = (num, title, desc) => `<div class="sechead">
  <span class="secnum">${num}</span>
  <div><h2>${title}</h2><p class="lead">${desc}</p></div>
</div><div class="rule"></div>`;

export const tbl = (head, rows) => `<div class="tblw"><table class="tbl"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

export const statRow = (items) => `<div class="stats">${items.map((s) => `<div class="stat"><span class="sv">${s.v}</span><span class="sl">${s.l}</span></div>`).join("")}</div>`;

export const feat = (items) => `<div class="feats">${items.map((f) => `<div class="feat"><p class="ft">${f.t}</p><p class="fd">${f.d}</p></div>`).join("")}</div>`;

export function makeCallout(svg) {
  return (icon, kicker, title, text) => `<div class="callout">
  <span class="isq">${svg(icon)}</span>
  <div><p class="kicker">${kicker}</p><h4>${title}</h4><p class="cd">${text}</p></div>
</div>`;
}

export function makeCardHead(svg) {
  return (icon, kicker, title, tag = "") => `<div class="chead">
  <span class="isq">${svg(icon)}</span>
  <div>${kicker ? `<p class="kicker">${kicker}</p>` : ""}<h3>${title}${tag}</h3></div>
</div>`;
}

export const tag = (label, cls) => `<span class="tag ${cls}">${label}</span>`;
export const bul = (items) => `<ul class="bul">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
export const block = (kicker, items) => `<div class="blk"><p class="kicker">${kicker}</p>${bul(items)}</div>`;
export const rules = (items, cls = "") => `<div class="rules ${cls}">${items.map((r, i) => `<div class="rule-item"><span class="nbadge">${i + 1}</span><div><p class="rt">${r.t}</p>${r.d ? `<p class="rd">${r.d}</p>` : ""}</div></div>`).join("")}</div>`;
export const notabar = (kicker, text) => `<div class="notabar"><span class="nk">${kicker}</span><span>${text}</span></div>`;
export const split2 = (left, right) => `<div class="split2"><div>${left}</div><div>${right}</div></div>`;

export function shell({ title, navTitle, logoUri, pages }) {
  const WEB_CSS = `
.topnav,.controls{display:none}
@media screen{
  html,body{height:100%;overflow:hidden}
  body{background:var(--bg);display:flex;flex-direction:column}
  .topnav{position:relative;z-index:20;flex:0 0 auto;display:flex;align-items:center;gap:14px;padding:12px 28px;background:rgba(5,5,5,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.07)}
  .topnav img{height:30px;width:auto}
  .topnav .nt{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .topnav .counter{margin-left:auto;font-size:.78rem;color:rgba(255,255,255,.4);white-space:nowrap}
  .topnav .counter b{color:var(--o);font-weight:700}
  .topnav button{flex:0 0 auto;font-family:var(--s);font-size:12px;font-weight:700;letter-spacing:.04em;color:#fff;background:linear-gradient(135deg,var(--o),var(--o2));border:0;padding:9px 18px;border-radius:999px;cursor:pointer;box-shadow:0 6px 20px rgba(255,95,31,.35);transition:transform .2s}
  .topnav button:hover{transform:translateY(-1px)}
  .stage{position:relative;flex:1 1 auto;overflow:hidden}
  .page{position:absolute;top:50%;left:50%;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .35s ease;border-radius:16px;border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 80px rgba(0,0,0,.55)}
  .page.active{opacity:1;visibility:visible;pointer-events:auto}
  .controls{flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:18px;padding:14px 28px;background:rgba(5,5,5,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.07)}
  .navbtn{flex:0 0 auto;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.03);color:#fff;cursor:pointer;transition:.2s}
  .navbtn svg{width:18px;height:18px}
  .navbtn:hover:not(:disabled){border-color:var(--o);color:var(--o);background:rgba(255,95,31,.08)}
  .navbtn:disabled{opacity:.25;cursor:not-allowed}
  .dots{display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:center;max-width:60vw}
  .dot{width:7px;height:7px;border-radius:999px;border:0;background:rgba(255,255,255,.2);cursor:pointer;transition:.25s;padding:0}
  .dot.active{width:22px;background:var(--o);box-shadow:0 0 10px rgba(255,95,31,.6)}
}
@media screen and (max-width:720px){
  .topnav{padding:10px 16px}
  .topnav .nt{display:none}
  .controls{padding:10px 16px;gap:12px}
  .navbtn{width:34px;height:34px}
}
@media print{
  .topnav,.controls{display:none!important}
  .stage{position:static;overflow:visible}
  .page{position:relative!important;opacity:1!important;visibility:visible!important;transform:none!important;border:0!important;box-shadow:none!important;border-radius:0!important}
}
`;
  const SCRIPT = `
(function(){
  var stage=document.getElementById('stage');
  var pages=[].slice.call(document.querySelectorAll('.page'));
  var dotsWrap=document.getElementById('dots');
  var cur=document.getElementById('cur'), tot=document.getElementById('tot');
  var prev=document.getElementById('prev'), next=document.getElementById('next');
  if(tot) tot.textContent=pages.length;
  var i=0;
  pages.forEach(function(p,k){
    var b=document.createElement('button');
    b.className='dot';
    b.setAttribute('aria-label','Página '+(k+1));
    var lab=p.getAttribute('data-label'); if(lab) b.title=lab;
    b.onclick=function(){go(k)};
    dotsWrap.appendChild(b);
  });
  var dots=[].slice.call(dotsWrap.children);
  function fit(){
    var p=pages[i]; if(!p||!stage) return;
    var r=stage.getBoundingClientRect();
    var sc=Math.min((r.width*0.96)/1280,(r.height*0.96)/720,1.9);
    p.style.transform='translate(-50%,-50%) scale('+sc+')';
  }
  function go(n){
    i=Math.max(0,Math.min(pages.length-1,n));
    pages.forEach(function(p,k){p.classList.toggle('active',k===i)});
    dots.forEach(function(d,k){d.classList.toggle('active',k===i)});
    if(cur) cur.textContent=i+1;
    if(prev) prev.disabled=i===0;
    if(next) next.disabled=i===pages.length-1;
    fit();
  }
  if(prev) prev.onclick=function(){go(i-1)};
  if(next) next.onclick=function(){go(i+1)};
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();go(i+1)}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(i-1)}
    if(e.key==='Home')go(0);
    if(e.key==='End')go(pages.length-1);
  });
  var sx=0;
  if(stage){
    stage.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
    stage.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)go(i+(dx<0?1:-1))},{passive:true});
  }
  window.addEventListener('resize',fit);
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(fit)}
  go(0);
  setTimeout(fit,250);
})();
`;
  return `<!doctype html><html lang="pt-BR" translate="no"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="google" content="notranslate"/>
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23000'/%3E%3Ctext x='50' y='68' font-size='54' font-family='Arial' font-weight='800' fill='%23FF5F1F' text-anchor='middle'%3EE3%3C/text%3E%3C/svg%3E">
<style>${STYLE}</style>
<style>${WEB_CSS}</style>
</head><body>
<header class="topnav">
  <img src="${logoUri}" alt="E3"/><span class="nt">${navTitle}</span>
  <span class="counter"><b id="cur">1</b> / <span id="tot">1</span></span>
  <button type="button" onclick="window.print()">Baixar PDF</button>
</header>
<main class="stage" id="stage">
${pages.join("\n")}
</main>
<footer class="controls">
  <button id="prev" class="navbtn" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
  <div class="dots" id="dots"></div>
  <button id="next" class="navbtn" aria-label="Próximo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
</footer>
<script>${SCRIPT}</script>
</body></html>`;
}
