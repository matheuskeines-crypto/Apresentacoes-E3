// Gera o hub "Links Úteis" (formulários e outros links de apoio), mesmo design system do índice.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LOGO_B64_PATH = new URL("../logo_e3.b64", import.meta.url);
const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const distRoot = fileURLToPath(new URL("../dist", import.meta.url));

/* ─────────────────────────────── grupos de links ───────────────────────────────
   Adicionar um novo link: inclua um item no array do grupo certo (ou crie um novo grupo).  */
const GRUPOS = [
  {
    titulo: "Formulários",
    sub: "Formulários usados no dia a dia da operação — preencha e envie ao time responsável.",
    links: [
      { label: "Formulário de LP", sub: "ClickUp Forms · landing page", href: "https://forms.clickup.com/9007045289/f/8cdt6n9-167933/AR1UUZG78VP57CRJTQ" },
      { label: "Formulário de CRM", sub: "abertura de chamado · CRM", href: "https://aberturadechamado-21969.web.app" },
    ],
  },
];

const gruposHTML = GRUPOS.map((g) => `<div class="k-wrap">
    <div class="k-head">
      <h2>${g.titulo}</h2>
      <p class="k-sub">${g.sub}</p>
    </div>
    <div class="k-grid two">
      ${g.links.map((l) => `<div class="lcard">
        <a class="lmain" href="${l.href}" target="_blank" rel="noopener"><span class="mt">${l.label}</span><span class="ms">${l.sub}</span></a>
        <button class="copybtn" type="button" data-href="${l.href}" title="Copiar link" aria-label="Copiar link">
          <svg class="i-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>`).join("\n      ")}
    </div>
  </div>`).join("\n\n  ");

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>Links Úteis — E3 Digital</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--o:#FF5F1F;--o2:#FF3300}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#050505;color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;padding:48px 24px}
.glow{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none}
.g1{top:-10%;left:12%;width:44vw;height:44vw;background:rgba(255,95,31,.16)}
.g2{bottom:-15%;right:8%;width:40vw;height:40vw;background:rgba(255,51,0,.10)}
.wrap{position:relative;z-index:2;max-width:1060px;margin:0 auto}
header{margin-bottom:34px}
.back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.5);text-decoration:none;font-size:.85rem;margin-bottom:20px}
.back:hover{color:var(--o)}
header img{height:54px;margin-bottom:18px;filter:drop-shadow(0 0 22px rgba(255,95,31,.5))}
h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(1.8rem,4.5vw,2.8rem);letter-spacing:-.03em}
h1 span{color:var(--o)}
.sub{color:rgba(255,255,255,.5);margin-top:10px;font-size:1.02rem}
.k-wrap{margin-bottom:34px}
.k-head h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1.4rem;letter-spacing:-.02em}
.k-sub{color:rgba(255,255,255,.45);font-size:.88rem;margin-top:4px;margin-bottom:16px}
.k-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.k-grid.two{grid-template-columns:repeat(2,1fr)}
@media(max-width:880px){.k-grid,.k-grid.two{grid-template-columns:1fr}}
.lcard{position:relative;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02);transition:.25s}
.lcard:hover{border-color:var(--o);background:rgba(255,95,31,.08)}
.lcard:hover .lmain{transform:translateX(3px)}
.lmain{display:flex;flex-direction:column;padding:15px 52px 15px 17px;text-decoration:none;color:#fff;transition:transform .25s}
.mt{font-weight:700;font-size:1rem}
.ms{font-size:.76rem;color:rgba(255,255,255,.42);margin-top:3px}
.copybtn{position:absolute;top:10px;right:10px;width:30px;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.25);color:rgba(255,255,255,.55);display:grid;place-items:center;cursor:pointer;transition:.2s}
.copybtn:hover{border-color:var(--o);color:var(--o);background:rgba(255,95,31,.12)}
.copybtn svg{width:15px;height:15px}
.copybtn .i-check{display:none}
.copybtn.ok{border-color:#22c55e;color:#22c55e;background:rgba(34,197,94,.12)}
.copybtn.ok .i-copy{display:none}
.copybtn.ok .i-check{display:block}
</style></head>
<body>
<span class="glow g1"></span><span class="glow g2"></span>
<div class="wrap">
  <header>
    <a class="back" href="../index.html">&larr; Voltar ao índice</a>
    <img src="${LOGO_URI}" alt="E3"/>
    <h1>Links <span>Úteis</span></h1>
    <p class="sub">Formulários e links de apoio usados no dia a dia — organizados por assunto.</p>
  </header>

  ${gruposHTML}

</div>
<script>
document.querySelectorAll('.copybtn').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    var href = btn.dataset.href;
    var done = function(){
      btn.classList.add('ok');
      clearTimeout(btn._t);
      btn._t = setTimeout(function(){ btn.classList.remove('ok'); }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(href).then(done).catch(function(){ fallbackCopy(href, done); });
    } else {
      fallbackCopy(href, done);
    }
  });
});
function fallbackCopy(text, cb){
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  cb();
}
</script>
</body></html>`;

const outPath = join(distRoot, "links-uteis", "index.html");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("links úteis (hub):", outPath, "·", GRUPOS.reduce((a, g) => a + g.links.length, 0), "links");
