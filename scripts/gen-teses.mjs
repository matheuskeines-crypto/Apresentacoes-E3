// Gera os materiais de Teses (explicações mastigadas por área do direito) em slides 16:9.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, statRow,
  makeCallout, tag, rules,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  scale: '<path d="M12 3v18"/><path d="m3 7 4-1 4 1"/><path d="m17 7 4-1 4 1"/><path d="M3 7c0 3 1.8 5 4 5s4-2 4-5"/><path d="M17 7c0 3 1.8 5 4 5s4-2 4-5"/><path d="M5 21h14"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const hot = () => tag("MAIOR PROCURA", "tag-pro");

const distRoot = fileURLToPath(new URL("../dist", import.meta.url));

/* ───────────────────────────── dados das teses ───────────────────────────── */
const TESES = [
  {
    slug: "tese-direito-bancario",
    title: "Direito <span>Bancário</span>",
    kicker: "MATERIAL DE TESE · DIREITO BANCÁRIO",
    subtitle: "Guia rápido das principais teses de direito bancário — o que cada uma trata e quem pode ser cliente.",
    pillNames: ["Superendividamento", "Golpe do Pix", "Juros Abusivos", "Renegociação PJ", "RMC"],
    intro: "Este material resume, de forma simples, as teses de direito bancário mais recorrentes na captação — para qualquer pessoa da equipe entender do que se trata e identificar um cliente em potencial.",
    topics: [
      { t: "Superendividamento", d: "O cliente está com mais de 30% da renda comprometida com o pagamento de dívidas." },
      { t: "Golpe do Pix", d: "Cliente que teve dinheiro transferido indevidamente por meio de fraude no Pix." },
      { t: "Renegociação de Dívidas (Juros Abusivos)", d: "Cliente pagando juros acima da taxa média de mercado definida pelo Banco Central." },
      { t: "Renegociação de Dívidas para Empresários", d: "Empresários com empréstimos acima de R$ 100 mil têm direito a revisar os contratos e reduzir os juros." },
      { t: "RMC — Reserva de Margem Consignável", d: "Descontos indevidos em empréstimos consignados, retirando parte do benefício do cliente sem autorização clara." },
    ],
  },
  {
    slug: "tese-direito-civil",
    title: "Direito <span>Civil</span>",
    kicker: "MATERIAL DE TESE · DIREITO CIVIL",
    subtitle: "Guia rápido das principais teses de direito civil — o que cada uma trata e quem pode ser cliente.",
    pillNames: ["Responsabilidade Civil", "Contratos", "Família e Divórcio", "Consumidor", "Sucessões"],
    intro: "Este material resume, de forma simples, as teses de direito civil mais recorrentes na captação — para qualquer pessoa da equipe entender do que se trata e identificar um cliente em potencial.",
    topics: [
      { t: "Responsabilidade Civil", d: "Alguém causou dano a outra pessoa por negligência, imprudência ou descumprimento da lei — ex.: acidente de carro, erro médico." },
      { t: "Contratos", d: "Uma das partes não cumpriu o combinado: não pagou, entregou errado ou violou uma cláusula." },
      { t: "Questões de Propriedade", d: "Disputas sobre posse de terrenos, limites, aluguéis e outros direitos sobre um imóvel." },
      { t: "Família e Divórcio", d: "Casamento, separação, guarda dos filhos, pensão e adoção. Público de maior interesse: mulheres com pouco capital." },
      { t: "Sucessões e Testamentos", d: "Disputas sobre herança, partilha de bens e validade de testamentos." },
      { t: "Danos Pessoais", d: "A pessoa sofreu lesão física, emocional ou psicológica por culpa de outra parte." },
      { t: "Direito do Consumidor", d: "Produto com defeito, propaganda enganosa ou prática comercial injusta contra o consumidor." },
      { t: "Propriedade Intelectual", d: "Disputas sobre direitos autorais, marcas, patentes e segredos comerciais." },
    ],
  },
  {
    slug: "tese-direito-familia",
    title: "Direito de <span>Família</span>",
    kicker: "MATERIAL DE TESE · DIREITO DE FAMÍLIA",
    subtitle: "Guia rápido das principais ações de direito de família — o que cada uma trata e quem pode ser cliente.",
    pillNames: ["Divórcio", "Guarda dos Filhos", "Pensão Alimentícia", "Adoção", "Partilha de Bens"],
    intro: "Este material resume, de forma simples, as principais ações de direito de família — para qualquer pessoa da equipe entender do que se trata e identificar um cliente em potencial.",
    topics: [
      { t: "Divórcio", d: "Processo para encerrar o casamento, com divisão de bens, guarda dos filhos e pensão.", hot: true },
      { t: "Guarda dos Filhos", d: "Decide quem fica responsável pelos filhos menores após separação ou divórcio.", hot: true },
      { t: "Regulação de Visitas", d: "Define como o cônjuge que não tem a guarda vai conviver com os filhos." },
      { t: "Pensão Alimentícia", d: "Valor que um dos pais paga para ajudar a sustentar os filhos ou o ex-cônjuge.", hot: true },
      { t: "Adoção", d: "Processo legal para assumir a responsabilidade por uma criança que não é filho biológico." },
      { t: "Reconhecimento de Paternidade/Maternidade", d: "Confirma legalmente o vínculo entre pai ou mãe e filho, garantindo herança, guarda e visitação." },
      { t: "Anulação de Casamento", d: "Invalida o casamento por fraude, falta de consentimento ou impedimento legal." },
      { t: "Partilha de Bens", d: "Divide o patrimônio do casal adquirido durante o casamento em caso de separação." },
      { t: "Testamento e Sucessão", d: "Organiza como os bens serão distribuídos após a morte de uma pessoa." },
      { t: "Medidas Protetivas", d: "Protege membros da família em situações de violência doméstica, abuso ou ameaça." },
    ],
  },
  {
    slug: "tese-direito-empresarial",
    title: "Direito <span>Empresarial</span>",
    kicker: "MATERIAL DE TESE · DIREITO EMPRESARIAL",
    subtitle: "Guia rápido das principais teses de direito empresarial — o que cada uma trata e quem pode ser cliente.",
    pillNames: ["Contratos", "Recuperação Judicial", "Trabalhista PJ", "Tributário", "M&A"],
    intro: "Este material resume, de forma simples, as teses de direito empresarial mais recorrentes na captação — para qualquer pessoa da equipe entender do que se trata e identificar um cliente em potencial.",
    topics: [
      { t: "Constituição de Empresas", d: "Ajuda a escolher o tipo de empresa certo e faz o registro nos órgãos competentes." },
      { t: "Elaboração e Revisão de Contratos", d: "Contratos comerciais bem redigidos, protegendo os interesses da empresa.", hot: true },
      { t: "Fusões e Aquisições", d: "Assessoria em compra, venda ou fusão de empresas, com due diligence e negociação." },
      { t: "Governança Corporativa", d: "Boas práticas de gestão: estatutos, políticas internas e estrutura de administração." },
      { t: "Proteção da Propriedade Intelectual", d: "Registro e defesa de marcas, patentes e segredos comerciais da empresa." },
      { t: "Recuperação Judicial e Falência", d: "Defesa de empresas em dificuldade financeira ou representação de credores.", hot: true },
      { t: "Resolução de Litígios Comerciais", d: "Disputas contratuais, societárias ou cobranças resolvidas por acordo, mediação ou justiça." },
      { t: "Compliance e Ética Empresarial", d: "Programas para manter a empresa dentro da lei e prevenir fraudes." },
      { t: "Direito do Trabalho Empresarial", d: "Contratação, demissão e políticas de RH dentro da lei.", hot: true },
      { t: "Planejamento Tributário", d: "Consultoria para reduzir a carga tributária de forma legal e evitar problemas fiscais.", hot: true },
    ],
  },
  {
    slug: "tese-direito-previdenciario",
    title: "Direito <span>Previdenciário</span>",
    kicker: "MATERIAL DE TESE · DIREITO PREVIDENCIÁRIO",
    subtitle: "Guia rápido das principais teses de direito previdenciário — o que cada uma trata e quem pode ser cliente.",
    pillNames: ["BPC/LOAS", "Auxílio-Doença", "Auxílio-Acidente", "Aposentadoria"],
    intro: "Este material resume, de forma simples, as teses de direito previdenciário mais recorrentes na captação — para qualquer pessoa da equipe entender do que se trata e identificar um cliente em potencial.",
    calloutData: { title: "Contexto comercial", text: "Processo administrativo, sem honorários iniciais — resolvido em <b>60 a 90 dias</b>. Conversão média de <b>5% a 10%</b>. Funil já qualificado pelas campanhas ativas." },
    topics: [
      { t: "BPC/LOAS", d: "Benefício assistencial de 1 salário mínimo para pessoas com deficiência ou idosos acima de 65 anos, em situação de miserabilidade, que nunca se aposentaram.", hot: true },
      { t: "Auxílio-Doença", d: "Pago pelo INSS a quem fica incapaz de trabalhar por mais de 15 dias, por doença, acidente ou recomendação médica." },
      { t: "Auxílio-Acidente", d: "Indenização para quem sofreu um acidente e ficou com sequela permanente que reduz a capacidade de trabalho." },
      { t: "Aposentadoria por Invalidez", d: "Para quem está total e permanentemente incapaz de trabalhar — diferente do auxílio-doença, que é temporário." },
      { t: "Aposentadoria por Idade", d: "65 anos (homens) ou 62 anos (mulheres), com 15 anos de contribuição. Para trabalhadores rurais, a idade cai 5 anos (homens) e 7 anos (mulheres)." },
    ],
  },
  {
    slug: "tese-direito-trabalhista",
    title: "Direito <span>Trabalhista</span>",
    kicker: "MATERIAL DE TESE · DIREITO TRABALHISTA",
    subtitle: "Guia rápido das principais teses de direito trabalhista — o que cada uma trata e quem pode ser cliente.",
    pillNames: ["Reconhecimento de Vínculo", "Rescisão Indireta", "Acidente de Trabalho", "Demissão sem Justa Causa"],
    intro: "Este material resume, de forma simples, as teses de direito trabalhista mais recorrentes na captação — para qualquer pessoa da equipe entender do que se trata e identificar um cliente em potencial.",
    calloutData: { title: "Contexto comercial", text: "Muita demanda, geralmente sem honorários iniciais — ações rápidas, resolvidas na maioria das vezes por acordo. Conversão média de <b>8% a 15%</b>." },
    topics: [
      { t: "Reconhecimento de Vínculo", d: "Para quem trabalhou sem carteira assinada, geralmente por mais de 3 meses, nos últimos 2 anos.", hot: true },
      { t: "Rescisão Indireta", d: "O empregado pede o desligamento porque a empresa não cumpriu a lei ou o combinado na contratação." },
      { t: "Acidente de Trabalho", d: "Direito a indenização para quem se acidentou nos últimos 5 anos durante o exercício do trabalho." },
      { t: "Demissão sem Justa Causa", d: "Desligamento sem motivo legal — a empresa deve pagar indenizações e benefícios ao empregado. Ticket médio de R$ 2 mil.", hot: true },
    ],
  },
];

function buildTese(tese) {
  const NAV = [null, "Teses"];
  const { page } = makePageFactory("MATERIAL DE TESE · E3 DIGITAL", NAV);
  const P = [];

  /* — CAPA — */
  P.push(page(`
    <img class="logo" src="${LOGO_URI}" alt="E3"/>
    <p class="kicker cov-k">${tese.kicker}</p>
    <h1>${tese.title}</h1>
    <p class="cov-sub">${tese.subtitle}</p>
    <div class="pills">${tese.pillNames.map((n) => `<span class="pill">${n.toUpperCase()}</span>`).join("")}</div>
    <div class="cov-rule"></div>
    <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
  `, { cover: true }));

  /* — TESES (mastigado) — */
  const gridCls = tese.topics.length > 5 ? "grid2r" : "";
  const itemsHtml = tese.topics.map((topic) => ({
    t: `${topic.t}${topic.hot ? ` ${hot()}` : ""}`,
    d: topic.d,
  }));
  P.push(page(`
    ${secHead("01", "Teses e o que cada uma trata", tese.intro)}
    ${tese.calloutData ? callout("activity", tese.calloutData.title, "", tese.calloutData.text) : ""}
    ${rules(itemsHtml, gridCls)}
  `));

  const html = shell({
    title: `Material de Tese — ${tese.title.replace(/<[^>]+>/g, "")} · E3 Digital`,
    navTitle: `Material de Tese · ${tese.title.replace(/<[^>]+>/g, "")}`,
    logoUri: LOGO_URI,
    pages: P,
  });

  const outPath = join(distRoot, tese.slug, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  console.log("tese:", outPath, "·", P.length, "páginas");
}

TESES.forEach(buildTese);

/* ───────────────────────────── hub: Materiais PDF ───────────────────────────── */
const hubHTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Materiais PDF — E3 Digital</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--o:#FF5F1F;--o2:#FF3300}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#050505;color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;padding:48px 24px}
.glow{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none}
.g1{top:-10%;left:12%;width:44vw;height:44vw;background:rgba(255,95,31,.16)}
.g2{bottom:-15%;right:8%;width:40vw;height:40vw;background:rgba(255,51,0,.10)}
.wrap{position:relative;z-index:2;max-width:1000px;margin:0 auto}
header{margin-bottom:36px}
.back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.5);text-decoration:none;font-size:.85rem;margin-bottom:22px}
.back:hover{color:var(--o)}
header img{height:56px;margin-bottom:20px;filter:drop-shadow(0 0 22px rgba(255,95,31,.5))}
h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(1.8rem,4.5vw,2.8rem);letter-spacing:-.03em}
h1 span{color:var(--o)}
.sub{color:rgba(255,255,255,.5);margin-top:10px;font-size:1.02rem}
.k-wrap{margin-bottom:36px}
.k-head h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1.4rem;letter-spacing:-.02em}
.k-sub{color:rgba(255,255,255,.45);font-size:.88rem;margin-top:4px;margin-bottom:18px}
.k-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
@media(max-width:720px){.k-grid{grid-template-columns:1fr}}
.k-grid a{display:flex;flex-direction:column;padding:16px 18px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02);text-decoration:none;color:#fff;transition:.25s}
.k-grid a:hover{border-color:var(--o);background:rgba(255,95,31,.08);transform:translateX(3px)}
.mt{font-weight:700;font-size:1rem}
.ms{font-size:.78rem;color:rgba(255,255,255,.42);margin-top:3px}
footer{text-align:center;color:rgba(255,255,255,.3);margin-top:40px;font-size:.82rem}
</style></head>
<body>
<span class="glow g1"></span><span class="glow g2"></span>
<div class="wrap">
  <header>
    <a class="back" href="../index.html">&larr; Voltar ao índice</a>
    <img src="${LOGO_URI}" alt="E3"/>
    <h1>Materiais <span>PDF</span></h1>
    <p class="sub">Materiais de apoio para consulta rápida — organizados por assunto.</p>
  </header>
  <div class="k-wrap">
    <div class="k-head">
      <h2>Teses</h2>
      <p class="k-sub">O que cada tese trata e quem pode ser cliente, explicado de forma simples.</p>
    </div>
    <div class="k-grid">
      ${TESES.map((t) => `<a href="../${t.slug}/index.html"><span class="mt">${t.title.replace(/<[^>]+>/g, "")}</span><span class="ms">tese · ${t.topics.length} conceitos</span></a>`).join("\n      ")}
    </div>
  </div>
</div>
</body></html>`;

const hubOut = join(distRoot, "materiais-pdf", "index.html");
mkdirSync(dirname(hubOut), { recursive: true });
writeFileSync(hubOut, hubHTML, "utf8");
console.log("materiais pdf (hub):", hubOut);
