// Camada web dos playbooks: transforma as páginas A4 (impressão) em um documento HTML responsivo.
// Em tela: cards rolando, nav fixa, layout fluido. Em impressão (Baixar PDF): as mesmas páginas A4 de sempre.
export const LOGO_B64_PATH = new URL("../logo_e3.b64", import.meta.url);

const WEB_CSS = `
.topnav,.secnav{display:none}
@media screen{
  html{scroll-behavior:smooth}
  body{background:var(--bg);min-height:100vh}
  .topnav{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:14px;padding:12px 28px;background:rgba(5,5,5,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.07)}
  .topnav img{height:30px;width:auto}
  .topnav .nt{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .topnav button{margin-left:auto;flex:0 0 auto;font-family:var(--s);font-size:12px;font-weight:700;letter-spacing:.04em;color:#fff;background:linear-gradient(135deg,var(--o),var(--o2));border:0;padding:9px 18px;border-radius:999px;cursor:pointer;box-shadow:0 6px 20px rgba(255,95,31,.35);transition:transform .2s}
  .topnav button:hover{transform:translateY(-1px)}
  .secnav{display:flex;gap:8px;overflow-x:auto;padding:10px 28px;position:sticky;top:55px;z-index:55;background:rgba(5,5,5,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.05);scrollbar-width:none}
  .secnav::-webkit-scrollbar{display:none}
  .secnav a{flex:0 0 auto;font-size:11.5px;font-weight:600;color:rgba(255,255,255,.6);text-decoration:none;padding:7px 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;transition:.2s;white-space:nowrap}
  .secnav a:hover,.secnav a.on{color:#fff;border-color:rgba(255,95,31,.6);background:rgba(255,95,31,.1)}
  main.doc{position:relative;z-index:2;max-width:980px;margin:0 auto;padding:8px 20px 72px}
  .page{width:auto;height:auto;overflow:hidden;margin:26px 0;border:1px solid rgba(255,255,255,.07);border-radius:26px;background:#070707;scroll-margin-top:118px;page-break-after:auto}
  .pbody{padding:52px 60px 20px}
  .pfoot{position:static;padding:14px 60px 26px;margin-top:8px}
  .cover{min-height:calc(100vh - 150px);display:flex;flex-direction:column;justify-content:center}
  .cover .pbody{padding:72px 60px}
  .cover .logo{width:150px;margin:0 0 30px}
  .cover h1{font-size:clamp(2.4rem,7vw,3.9rem)}
  .cov-sub{font-size:clamp(1rem,2vw,1.15rem);max-width:60ch}
  .pill{font-size:11px}
  .kicker{font-size:12px}
  .h2{font-size:clamp(1.7rem,4vw,2.3rem)}
  .h3{font-size:1.2rem;margin:26px 0 12px}
  .body{font-size:15.5px}
  .stat{padding:24px 10px}
  .sv{font-size:clamp(1.6rem,4vw,2.1rem)}
  .sl{font-size:12px}
  .cd{font-size:14px}
  .callout h4{font-size:17px}
  .quote p{font-size:14px}
  .quote.inline{margin:18px 0 22px}
  .lg-item{font-size:13px}
  .sechead h2{font-size:clamp(1.45rem,3.4vw,1.9rem)}
  .sechead .lead{font-size:14px}
  .secnum{font-size:clamp(2.6rem,7vw,3.6rem)}
  .card{padding:24px 28px;margin-bottom:18px}
  .chead h3{font-size:1.3rem}
  .ft{font-size:15px}
  .fd{font-size:13px}
  .feats{gap:18px 26px}
  .grid2{gap:20px 36px}
  .blk .kicker{font-size:11px;margin-bottom:8px}
  .bul li{font-size:14px;margin-bottom:6px}
  .tblw{overflow-x:auto;border-radius:14px;border:1px solid rgba(255,255,255,.1)}
  .tblw .tbl{border:0;border-radius:0;font-size:13.5px}
  .tbl th{padding:12px 18px;font-size:12px}
  .tbl td{padding:13px 18px;line-height:1.5}
  .rule-item{padding:18px 22px}
  .rt{font-size:16px}
  .rd{font-size:14px}
  .commit{padding:34px 40px}
  .commit-t{font-size:clamp(1.3rem,3vw,1.7rem)}
  .commit-d{font-size:14.5px}
  .commit-solo{margin-top:0}
  .js .page.rv{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .js .page.rv.in{opacity:1;transform:none}
}
@media screen and (max-width:720px){
  .topnav{padding:10px 16px}
  .topnav .nt{display:none}
  .secnav{padding:9px 16px;top:51px}
  main.doc{padding:4px 10px 56px}
  .page{margin:16px 0;border-radius:20px}
  .pbody{padding:32px 20px 14px}
  .cover .pbody{padding:48px 22px}
  .pfoot{padding:12px 20px 20px}
  .stats{grid-template-columns:repeat(2,1fr)}
  .stat:nth-child(2){border-right:0}
  .stat:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.08)}
  .grid2,.feats{grid-template-columns:1fr}
  .card{padding:20px 18px}
  .sechead{gap:12px}
  .tblw .tbl{min-width:560px}
  .rule-item{padding:15px 16px;gap:12px}
  .commit{padding:26px 20px}
  .callout{flex-direction:column;gap:12px;padding:18px}
}
@media print{
  .topnav,.secnav{display:none!important}
  main.doc{display:contents}
  .tblw{display:contents}
}
`;

const SCRIPT = `
(function(){
  var pages=[].slice.call(document.querySelectorAll('.page.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px -4% 0px'});
    pages.forEach(function(p){io.observe(p)});
  } else { pages.forEach(function(p){p.classList.add('in')}); }
  var links=[].slice.call(document.querySelectorAll('.secnav a'));
  if(links.length && 'IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}
    })},{rootMargin:'-35% 0px -55% 0px'});
    document.querySelectorAll('.page[id]').forEach(function(p){so.observe(p)});
  }
  var revealAll=function(){pages.forEach(function(p){p.classList.add('in')})};
  window.addEventListener('beforeprint',revealAll);
  setTimeout(revealAll,2500);
})();
`;

export function shell({ title, navTitle, logoUri, style, pages, sections }) {
  const nav = sections.length
    ? `<nav class="secnav" aria-label="Seções">${sections.map((s) => `<a href="#${s.id}">${s.label}</a>`).join("")}</nav>`
    : "";
  return `<!doctype html><html lang="pt-BR" translate="no"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="google" content="notranslate"/>
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23000'/%3E%3Ctext x='50' y='68' font-size='54' font-family='Arial' font-weight='800' fill='%23FF5F1F' text-anchor='middle'%3EE3%3C/text%3E%3C/svg%3E">
<script>document.documentElement.classList.add('js')</script>
<style>${style}</style>
<style>${WEB_CSS}</style>
</head><body>
<header class="topnav"><img src="${logoUri}" alt="E3"/><span class="nt">${navTitle}</span><button type="button" onclick="window.print()">Baixar PDF</button></header>
${nav}
<main class="doc">
${pages.join("\n")}
</main>
<script>${SCRIPT}</script>
</body></html>`;
}
