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
      ${g.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener"><span class="mt">${l.label}</span><span class="ms">${l.sub}</span></a>`).join("\n      ")}
    </div>
  </div>`).join("\n\n  ");

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
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
.k-grid a{display:flex;flex-direction:column;padding:15px 17px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02);text-decoration:none;color:#fff;transition:.25s}
.k-grid a:hover{border-color:var(--o);background:rgba(255,95,31,.08);transform:translateX(3px)}
.mt{font-weight:700;font-size:1rem}
.ms{font-size:.76rem;color:rgba(255,255,255,.42);margin-top:3px}
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
</body></html>`;

const outPath = join(distRoot, "links-uteis", "index.html");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("links úteis (hub):", outPath, "·", GRUPOS.reduce((a, g) => a + g.links.length, 0), "links");
