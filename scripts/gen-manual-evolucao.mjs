// Gera o Manual de Entrega (Evolução Jurídica) em HTML pronto para impressão.
// Mesmo design system do scripts/gen-playbook-entrega.mjs (Manual de Entrega da Assessoria).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { shell, LOGO_B64_PATH } from "./playbook-web.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;

let folio = 0;
const SECTIONS = [];
const NAV = [null, "Visão geral", "Entregas Evolução", "Entregas Pro", "Onboarding", "Cronograma Fase 1", "Cronograma Fase 2", "KPIs de Entrega", "KPIs Comerciais"];
let pageIdx = 0;
const page = (body, opts = {}) => {
  const idx = pageIdx++;
  const label = NAV[idx];
  const id = label ? `s${idx}` : "";
  if (label) SECTIONS.push({ id, label });
  return `<section class="page${opts.cover ? " cover" : ""}"${id ? ` id="${id}"` : ""}${label ? ` data-label="${label}"` : ""}>
  <div class="amb"></div>
  <div class="pbody">${body}</div>
  ${opts.cover ? "" : `<div class="pfoot"><span>MANUAL DE ENTREGA · EVOLUÇÃO JURÍDICA · <b>E3</b></span><span>${String(++folio).padStart(2, "0")}</span></div>`}
</section>`;
};

const secHead = (num, title, desc) => `<div class="sechead">
  <span class="secnum">${num}</span>
  <div><h2>${title}</h2><p class="lead">${desc}</p></div>
</div><div class="rule"></div>`;

const tbl = (head, rows) => `<div class="tblw"><table class="tbl"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const statRow = (items) => `<div class="stats">${items.map((s) => `<div class="stat"><span class="sv">${s.v}</span><span class="sl">${s.l}</span></div>`).join("")}</div>`;
const callout = (icon, kicker, title, text) => `<div class="callout">
  <span class="isq">${svg(icon)}</span>
  <div><p class="kicker">${kicker}</p><h4>${title}</h4><p class="cd">${text}</p></div>
</div>`;
const tag = (label, cls) => `<span class="tag ${cls}">${label}</span>`;
const tagBase = () => tag("EVOLUÇÃO", "tag-light");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");
const rules = (items) => `<div class="rules">${items.map((r, i) => `<div class="rule-item"><span class="nbadge">${i + 1}</span><div><p class="rt">${r.t}</p>${r.d ? `<p class="rd">${r.d}</p>` : ""}</div></div>`).join("")}</div>`;

const P = [];

/* — CAPA — */
P.push(page(`
  <img class="logo" src="${LOGO_URI}" alt="E3"/>
  <p class="kicker cov-k">PLAYBOOK DE ENTREGA &amp; ALINHAMENTO · DOCUMENTO OPERACIONAL</p>
  <h1>Evolução <span>Jurídica</span></h1>
  <p class="cov-sub">O alinhamento definitivo entre o que o time Comercial vende e o que o time Operacional entrega — nos planos Evolução e Evolução Pro.</p>
  <div class="pills">
    <span class="pill">EVOLUÇÃO · 30 DIAS</span><span class="pill">EVOLUÇÃO PRO · 60 DIAS</span>
    <span class="pill">CRONOGRAMA SEMANAL</span><span class="pill">KPIS POR ETAPA</span>
  </div>
  <div class="cov-rule"></div>
  <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
`, { cover: true }));

/* — VISÃO GERAL — */
P.push(page(`
  <p class="kicker">VISÃO GERAL</p>
  <h2 class="h2">Alinhamento comercial e operacional</h2>
  <p class="body">Este manual estrutura o alinhamento definitivo entre o que é <b>vendido pelo time Comercial</b> e o que é <b>executado pelo time Operacional</b> no produto Evolução, nas versões <b>Evolução</b> e <b>Evolução Pro</b>. Ele detalha as etapas da jornada do cliente, garantindo clareza de funções, cronograma de reuniões, entregas da equipe e metas de cada fase.</p>
  ${statRow([
    { v: "30 dias", l: "Duração do plano Evolução" },
    { v: "60 dias", l: "Duração do plano Evolução Pro" },
    { v: "9", l: "Semanas de cronograma no total" },
    { v: "3", l: "Grupos de indicadores de sucesso" },
  ])}
  ${callout("activity", "COMO LER ESTE MANUAL", "Do onboarding à escala", "O documento segue os mesmos blocos do onboarding: a <b>divisão de entregas</b> por plano (Evolução e a camada exclusiva Pro), o <b>cronograma semana a semana</b> de cada fase e os <b>indicadores de sucesso</b> acompanhados pela equipe.")}
  <div class="legend">
    <div class="lg-item">${tagBase()}<span>entrega <b>padrão</b> do plano Evolução (30 dias)</span></div>
    <div class="lg-item">${tagPro()}<span>camada <b>exclusiva</b> do plano Evolução Pro (60 dias)</span></div>
  </div>
`));

/* — DIVISÃO DE ENTREGAS: EVOLUÇÃO — */
P.push(page(`
  ${secHead("01", "Divisão de entregas " + tagBase(), "O que o time Comercial vende e o que o time Operacional entrega no plano Evolução.")}
  ${callout("handshake", "O QUE O COMERCIAL VENDE", "Canais, posicionamento e treinamento inicial", "Estruturação de canais básicos de captação, posicionamento de mercado e treinamento inicial de vendas.")}
  <h3 class="h3">O que o Operacional entrega</h3>
  ${rules([
    { t: "Onboarding", d: "Abertura oficial do projeto e alinhamento inicial com o cliente." },
    { t: "Diagnóstico de ICP", d: "Mapeamento do perfil de cliente ideal e validação do posicionamento." },
    { t: "Landing Page otimizada", d: "Página de conversão publicada e pronta para captar leads." },
    { t: "Ajuste do Google Meu Negócio", d: "Presença local fortalecida, com ficha e informações completas." },
    { t: "Roteiros estratégicos de conteúdo", d: "Base para sustentar a produção de conteúdo e a autoridade do escritório." },
    { t: "Treinamento comercial", d: "Capacitação do time do cliente para converter os leads gerados." },
    { t: "Acompanhamento no Go-live", d: "Suporte da equipe E3 no lançamento de todas as entregas." },
  ])}
`));

/* — DIVISÃO DE ENTREGAS: EVOLUÇÃO PRO — */
P.push(page(`
  ${secHead("02", "Camada exclusiva " + tagPro(), "Tudo o que o plano Evolução entrega, mais a aceleração comercial abaixo — para quem avança para os 60 dias.")}
  ${callout("megaphone", "O QUE O COMERCIAL VENDE (PRO)", "Aceleração comercial avançada", "Canais ativos adicionais de aquisição: Social Selling, TikTok Lives e Funil de Indicação.")}
  <h3 class="h3">O que o Operacional entrega a mais</h3>
  ${rules([
    { t: "Setup de Social Selling", d: "Operação de prospecção ativa estruturada do zero." },
    { t: "Scripts de DM personalizados", d: "Roteiros de abordagem para conexão e conversão via redes sociais." },
    { t: "Funil de Indicação (com acompanhamento)", d: "Ativação da base de clientes como canal de novos negócios." },
    { t: "Planejamento e estratégia de Live no TikTok", d: "Roteirização técnica e lançamento de uma live estratégica." },
  ])}
`));

/* — PROCESSO DE ONBOARDING — */
P.push(page(`
  ${secHead("03", "Processo de Onboarding", "O onboarding marca a transição da venda para o operacional e acontece na Semana 1.")}
  ${callout("users", "REUNIÃO DE ONBOARDING", "Alinhamento inicial com o cliente", "Alinhamento de expectativas, apresentação oficial do Assessor E3 e diagnóstico profundo do escritório.")}
  <h3 class="h3">Atividades operacionais da Semana 1</h3>
  ${rules([
    { t: "Disparo do formulário de diagnóstico operacional" },
    { t: "Mapeamento do ICP e validação do posicionamento atual da marca" },
    { t: "Coleta de acessos técnicos (domínio, hospedagem, Google)" },
  ])}
`));

/* — CRONOGRAMA FASE 1 — */
P.push(page(`
  ${secHead("04", "Cronograma da Fase 1 " + tagBase(), "Ritos de reunião e entregas semana a semana, do kick-off ao pitch de renovação.")}
  ${tbl(["Semana", "O que acontece"], [
    ["Semana 0 · Kick-off &amp; Onboarding", "CS Manager envia vídeo e formulário comercial e analisa o Instagram. Account conduz o onboarding: define o ICP, redesenha o posicionamento e envia os formulários da página e do Google Meu Negócio."],
    ["Semana 1 · Posicionamento", "Account fecha posicionamento, persona, dores e objeções com o cliente. Gestor de Projeto desenvolve copies e briefings de arte com base nessa reunião."],
    ["Semana 2 · Presença Digital", "Web Design publica a Landing Page. Gestor de Projeto finaliza a otimização completa do Google Meu Negócio."],
    ["Semana 3 · Capacitação &amp; Vitrine", "Criação publica a grade de 9 posts no Instagram como vitrine de autoridade. Consultor Comercial conduz o treinamento comercial do time do cliente."],
    ["Semana 4 · Resultados &amp; Pitch", "Account apresenta os resultados do ciclo e conduz o pitch de renovação ou upgrade para o Pro."],
  ])}
`));

/* — CRONOGRAMA FASE 2 — */
P.push(page(`
  ${secHead("05", "Cronograma da Fase 2 " + tagPro(), "Para quem avança para a aceleração comercial — mais quatro semanas até a escala.")}
  ${tbl(["Semana", "O que acontece"], [
    ["Semana 5 · Prospecção Ativa", "Consultor Comercial estrutura o Social Selling, escreve os scripts de DM e ativa o Funil de Indicação. Gestor de Projeto acompanha a implantação e cobra as entregas."],
    ["Semana 6 · Live Estratégica TikTok", "Account planeja, roteiriza e lança a primeira live estratégica no TikTok do cliente."],
    ["Semana 7 · Otimização Comercial", "Gestor de Projeto audita a operação, acompanha a ativação do funil de indicação e ajusta abordagens."],
    ["Semana 8 · Resultados &amp; Escala", "Account e Consultor Comercial revisam as métricas dos 60 dias, desenham o plano de escala e conduzem o novo pitch de renovação."],
  ])}
`));

/* — KPIs DE ENTREGA & RETENÇÃO — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO</p>
  <h2 class="h2">KPIs de entrega e retenção</h2>
  <p class="body" style="margin-bottom:18px">Métricas que garantem que o cronograma foi cumprido no prazo e que o cliente segue satisfeito com a parceria.</p>
  ${tbl(["Indicador operacional", "Meta"], [
    ["SLA de entrega da LP (Semana 2)", "Publicação do link no prazo estipulado — 100% de conformidade."],
    ["Otimização do Google Meu Negócio", "Setup completo: ficha atualizada, fotos, horário de atendimento e links funcionais."],
    ["Frequência de conteúdo / scripts de DM", "Entrega dos roteiros (S3) e das DMs (S5) validados pelo cliente."],
  ])}
  <h3 class="h3">Indicadores de retenção</h3>
  ${tbl(["Indicador", "Meta"], [
    ["NPS do cliente", "Nota coletada ao final da jornada de 30 e 60 dias — foco em manter promotores."],
    ["Taxa de conversão do Pitch", "% de renovação de contratos ou upgrade do plano Evolução para o Pro."],
  ])}
`));

/* — KPIs DE PERFORMANCE COMERCIAL + COMPROMISSO — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO</p>
  <h2 class="h2">KPIs de performance comercial</h2>
  <p class="body" style="margin-bottom:18px">Métricas do negócio do cliente, medidas a partir dos leads e canais ativados pela E3.</p>
  ${tbl(["Indicador", "Meta"], [
    ["Taxa de conversão comercial", "Aproveitamento dos leads gerados após o Treinamento Comercial (S3)."],
    ["Leads via prospecção ativa", "Volume de respostas qualificadas geradas a partir do Social Selling/DMs (S5)."],
    ["Novas vendas via Funil de Indicação", "Clientes gerados pela base de indicações ativada entre S5 e S7."],
    ["Audiência e engajamento na Live TikTok", "Pico de espectadores simultâneos e leads capturados na live (S6)."],
  ])}
  <div class="commit commit-solo">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Do onboarding ao pitch, um único fio condutor.</h3>
    <p class="commit-d">Cada semana, entrega e indicador deste manual existe para transformar o plano vendido em resultado real — com clareza de função, prazo e prestação de contas em cada etapa.</p>
  </div>
`));

/* ═════════════ HTML + CSS (mesmo design system do Manual de Entrega) ═════════════ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap');
@page{size:794px 1123px;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
:root{--o:#FF5F1F;--o2:#FF3300;--bg:#050505;--d:'Bricolage Grotesque',sans-serif;--s:'DM Sans',sans-serif}
html,body{background:var(--bg);color:#fff;font-family:var(--s);-webkit-font-smoothing:antialiased}
.page{position:relative;width:794px;height:1123px;overflow:hidden;background:var(--bg);page-break-after:always}
.page:last-child{page-break-after:auto}
.amb{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.amb::before{content:"";position:absolute;top:-14%;left:-8%;width:60%;height:38%;border-radius:50%;background:rgba(255,95,31,.16);filter:blur(90px)}
.amb::after{content:"";position:absolute;bottom:-16%;right:-10%;width:56%;height:36%;border-radius:50%;background:rgba(255,51,0,.10);filter:blur(90px)}
.pbody{position:relative;z-index:2;padding:56px 64px 0}
.pfoot{position:absolute;left:64px;right:64px;bottom:32px;z-index:2;display:flex;justify-content:space-between;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.35)}
.pfoot b{color:var(--o)}
.kicker{font-family:var(--s);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--o);font-weight:700;margin-bottom:8px}
.kicker .tag{margin-left:8px}
.h2{font-family:var(--d);font-weight:800;font-size:28px;letter-spacing:-.01em;margin-bottom:16px}
.h3{font-family:var(--d);font-weight:800;font-size:17px;letter-spacing:-.01em;margin:16px 0 8px}
.body{font-size:14px;line-height:1.6;color:rgba(255,255,255,.72);margin-bottom:14px}
.body b{color:#fff;font-weight:700}
.muted{font-weight:400;color:rgba(255,255,255,.5);font-size:11px}
/* CAPA */
.cover .pbody{padding:0 68px}
.cover .logo{width:130px;margin:150px 0 26px}
.cov-k{margin-bottom:12px}
.cover h1{font-family:var(--d);font-weight:800;font-size:52px;line-height:1;letter-spacing:-.02em;margin-bottom:22px}
.cover h1 span{color:var(--o)}
.cov-sub{font-size:15px;line-height:1.6;color:rgba(255,255,255,.7);max-width:56ch;margin-bottom:30px}
.pills{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:34px}
.pill{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.06);padding:9px 16px;border-radius:999px}
.cov-rule{height:1px;background:rgba(255,255,255,.12);margin-bottom:16px}
.cov-foot{font-size:12px;color:rgba(255,255,255,.4)}
/* stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden;margin:18px 0}
.stat{display:flex;flex-direction:column;align-items:center;gap:4px;padding:20px 8px;text-align:center;border-right:1px solid rgba(255,255,255,.08)}
.stat:last-child{border-right:0}
.sv{font-family:var(--d);font-weight:800;font-size:22px;color:var(--o)}
.sl{font-size:10.5px;color:rgba(255,255,255,.5);line-height:1.3}
/* callout */
.callout{display:flex;gap:16px;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:20px 22px;background:rgba(255,255,255,.02);margin-bottom:18px}
.isq{flex:0 0 auto;width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));color:#fff}
.isq svg{width:18px;height:18px}
.callout h4{font-family:var(--d);font-weight:700;font-size:15px;margin:2px 0 6px}
.cd{font-size:12.5px;line-height:1.55;color:rgba(255,255,255,.6)}
.cd b{color:#fff}
/* legend / tags */
.tag{display:inline-block;font-family:var(--s);font-size:9.5px;font-weight:800;letter-spacing:.08em;padding:4px 10px;border-radius:999px;vertical-align:middle}
.tag-pro{color:var(--o);border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.1)}
.tag-light{color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.04)}
.legend{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.lg-item{display:flex;align-items:center;gap:10px;font-size:11.5px;color:rgba(255,255,255,.6)}
.lg-item b{color:#fff}
/* sechead */
.sechead{display:flex;align-items:flex-start;gap:18px;margin-bottom:14px}
.secnum{font-family:var(--d);font-weight:800;font-size:48px;line-height:.8;color:transparent;-webkit-text-stroke:1.5px rgba(255,95,31,.6)}
.sechead h2{font-family:var(--d);font-weight:800;font-size:22px;letter-spacing:-.01em;margin-bottom:6px;display:flex;align-items:center;gap:10px}
.sechead .lead{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.5}
.rule{height:1px;background:rgba(255,255,255,.1);margin-bottom:20px}
/* tabelas */
.tbl{width:100%;border-collapse:collapse;font-size:11.5px;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden}
.tbl th{background:linear-gradient(90deg,rgba(255,95,31,.16),rgba(255,51,0,.05));color:var(--o);text-align:left;padding:9px 14px;font-family:var(--d);font-weight:700;font-size:10.5px;letter-spacing:.02em}
.tbl td{padding:10px 14px;border-top:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.7);vertical-align:top;line-height:1.42}
.tbl td.k{color:#fff;font-weight:700}
.tbl td b{color:var(--o)}
/* rules (ritos / ciclo) */
.rules{display:flex;flex-direction:column;gap:12px;margin-bottom:22px}
.rule-item{display:flex;gap:16px;align-items:flex-start;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:15px 20px;background:rgba(255,255,255,.02)}
.nbadge{flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));font-family:var(--d);font-weight:800;font-size:13px;color:#fff}
.rt{font-family:var(--s);font-weight:700;font-size:13.5px;margin-bottom:4px}
.rd{font-size:12px;line-height:1.5;color:rgba(255,255,255,.6)}
.rd b{color:var(--o)}
.commit{border:1px solid rgba(255,95,31,.35);border-radius:18px;padding:28px 36px;text-align:center}
.commit-pill{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;color:var(--o);border:1px solid rgba(255,95,31,.5);border-radius:999px;padding:6px 16px;margin-bottom:16px}
.commit-t{font-family:var(--d);font-weight:800;font-size:21px;letter-spacing:-.01em;margin-bottom:10px}
.commit-d{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.55;max-width:56ch;margin:0 auto}
.commit-solo{margin-top:60px}
`;

const html = shell({
  title: "Manual de Entrega — Evolução Jurídica · E3 Digital",
  navTitle: "Manual de Entrega · Evolução Jurídica",
  logoUri: LOGO_URI,
  style: STYLE,
  pages: P,
  sections: SECTIONS,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/manual-entrega-evolucao-juridica/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("manual de entrega evolução:", outPath, "·", P.length, "páginas");
