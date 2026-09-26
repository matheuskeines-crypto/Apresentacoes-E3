// Camada web dos playbooks: apresenta as páginas A4 como slides navegáveis (setas do teclado,
// botões prev/next, bolinhas de paginação) — mesmo padrão de interação dos decks de onboarding.
// Em impressão (Baixar PDF): as mesmas páginas A4 de sempre, uma por folha.
export const LOGO_B64_PATH = new URL("../logo_e3.b64", import.meta.url);

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
  .page{position:absolute;top:50%;left:50%;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .35s ease;border-radius:20px;border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 80px rgba(0,0,0,.55)}
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
    var sc=Math.min((r.width*0.94)/794,(r.height*0.94)/1123,1);
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

export function shell({ title, navTitle, logoUri, style, pages }) {
  return `<!doctype html><html lang="pt-BR" translate="no"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="google" content="notranslate"/>
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23000'/%3E%3Ctext x='50' y='68' font-size='54' font-family='Arial' font-weight='800' fill='%23FF5F1F' text-anchor='middle'%3EE3%3C/text%3E%3C/svg%3E">
<style>${style}</style>
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
