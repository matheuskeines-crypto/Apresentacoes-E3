// Gera o hub "Cursos" (comercial interno + plataformas externas com acesso), mesmo design system do índice.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LOGO_B64_PATH = new URL("../logo_e3.b64", import.meta.url);
const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const distRoot = fileURLToPath(new URL("../dist", import.meta.url));

/* ─────────────────────────────── cursos internos (deck) ─────────────────────────────── */
const INTERNOS = [
  { label: "Comercial Interno", sub: "Playlist · YouTube", href: "https://www.youtube.com/playlist?list=PLRV3PR6X9tE0" },
];

/* ─────────────────────────────── apresentações (vídeo) ───────────────────────────────
   Adicionar uma nova apresentação: inclua um item no array abaixo.  */
const APRESENTACOES = [
  { label: "Apresentação do Minutta CRM", sub: "Playlist · YouTube", href: "https://www.youtube.com/playlist?list=PLCPZCnpqB0nA" },
];

/* ─────────────────────────────── plataformas externas (link + login) ───────────────────────────────
   Adicionar uma nova plataforma: inclua um item no array abaixo.  */
const PLATAFORMAS = [
  {
    curso: "Meta Ads",
    plataforma: "Universo Subido",
    dominio: "subido.com.br",
    link: "https://www.subido.com.br/ptBR/login?callbackUrl=%2F",
    login: "pauloa.caetano@gmail.com",
    senha: "Symon8001@",
  },
  {
    curso: "Google Ads",
    plataforma: "Login — Adriano Gianini",
    dominio: "alunos.adrianogianini.com.br",
    link: "https://alunos.adrianogianini.com.br/login",
    login: "pauloa.caetano@gmail.com",
    senha: "Digital2025",
  },
  {
    curso: "ClickUp",
    plataforma: "Members — Área de Membros",
    dominio: "portal.bravy.com.br",
    link: "https://portal.bravy.com.br/",
    login: "operacionale3digital@gmail.com",
    senha: "E3Digital2002",
  },
];

const copyBtn = (value) => `<button class="copybtn" type="button" data-copy="${value.replace(/"/g, "&quot;")}" title="Copiar" aria-label="Copiar">
          <svg class="i-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </button>`;

const internosHTML = INTERNOS.map((l) => l.href
  ? `<a href="${l.href}" target="_blank" rel="noopener"><span class="mt">${l.label}</span><span class="ms">${l.sub}</span></a>`
  : `<div class="k-grid-item disabled"><span class="mt">${l.label}</span><span class="ms">${l.sub}</span></div>`
).join("\n      ");

const apresentacoesHTML = APRESENTACOES.map((l) => `<a href="${l.href}" target="_blank" rel="noopener"><span class="mt">${l.label}</span><span class="ms">${l.sub}</span></a>`).join("\n      ");

const plataformasHTML = PLATAFORMAS.map((p) => `<details class="course">
        <summary>
          <span class="course-s"><span class="mt">${p.curso}</span><span class="ms">${p.plataforma} · ${p.dominio}</span></span>
          <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="course-body">
          <div class="course-row"><span class="cl">Link</span><a class="cv link" href="${p.link}" target="_blank" rel="noopener">${p.link}</a>${copyBtn(p.link)}</div>
          <div class="course-row"><span class="cl">Login</span><span class="cv">${p.login}</span>${copyBtn(p.login)}</div>
          <div class="course-row"><span class="cl">Senha</span><span class="cv">${p.senha}</span>${copyBtn(p.senha)}</div>
        </div>
      </details>`).join("\n      ");

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>Cursos — E3 Digital</title>
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
.k-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
@media(max-width:720px){.k-grid{grid-template-columns:1fr}}
.k-grid a,.k-grid-item{display:flex;flex-direction:column;padding:15px 17px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02);text-decoration:none;color:#fff;transition:.25s}
.k-grid a:hover{border-color:var(--o);background:rgba(255,95,31,.08);transform:translateX(3px)}
.k-grid-item.disabled{cursor:default;opacity:.55}
.k-grid-item.disabled .mt{color:rgba(255,255,255,.75)}
.mt{font-weight:700;font-size:1rem}
.ms{font-size:.76rem;color:rgba(255,255,255,.42);margin-top:3px}
.courses{display:flex;flex-direction:column;gap:12px}
.course{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02);overflow:hidden}
.course[open]{border-color:rgba(255,95,31,.35)}
.course summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 17px;cursor:pointer;list-style:none}
.course summary::-webkit-details-marker{display:none}
.course summary:hover{background:rgba(255,95,31,.06)}
.course-s{display:flex;flex-direction:column}
.chev{width:18px;height:18px;color:rgba(255,255,255,.4);flex:0 0 auto;transition:transform .25s}
.course[open] .chev{transform:rotate(180deg);color:var(--o)}
.course-body{padding:4px 17px 16px;display:flex;flex-direction:column;gap:8px;border-top:1px solid rgba(255,255,255,.06)}
.course-row{display:flex;align-items:center;gap:10px;padding-top:10px}
.cl{flex:0 0 70px;font-size:.74rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.04em}
.cv{flex:1;font-size:.9rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cv.link{color:var(--o);text-decoration:none}
.cv.link:hover{text-decoration:underline}
.copybtn{flex:0 0 auto;width:30px;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.25);color:rgba(255,255,255,.55);display:grid;place-items:center;cursor:pointer;transition:.2s}
.copybtn:hover{border-color:var(--o);color:var(--o);background:rgba(255,95,31,.12)}
.copybtn svg{width:14px;height:14px}
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
    <h1>Cursos</h1>
    <p class="sub">Capacitação interna e plataformas de curso — acessos e credenciais do time.</p>
  </header>

  <div class="k-wrap">
    <div class="k-head">
      <h2>Comercial Interno</h2>
      <p class="k-sub">Treinamento próprio da E3, em formato de slides.</p>
    </div>
    <div class="k-grid">
      ${internosHTML}
    </div>
  </div>

  <div class="k-wrap">
    <div class="k-head">
      <h2>Apresentações</h2>
      <p class="k-sub">Vídeos de apresentação das ferramentas usadas pelo time.</p>
    </div>
    <div class="k-grid">
      ${apresentacoesHTML}
    </div>
  </div>

  <div class="k-wrap">
    <div class="k-head">
      <h2>Plataformas de curso</h2>
      <p class="k-sub">Clique para ver o link de acesso, login e senha de cada plataforma.</p>
    </div>
    <div class="courses">
      ${plataformasHTML}
    </div>
  </div>

</div>
<script>
document.querySelectorAll('.copybtn').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    var text = btn.dataset.copy;
    var done = function(){
      btn.classList.add('ok');
      clearTimeout(btn._t);
      btn._t = setTimeout(function(){ btn.classList.remove('ok'); }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function(){ fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
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

const outPath = join(distRoot, "cursos", "index.html");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("cursos (hub):", outPath, "·", INTERNOS.length, "internos ·", APRESENTACOES.length, "apresentações ·", PLATAFORMAS.length, "plataformas");
