// Gera o Manual de Entrega (Estruturação PRO) em HTML pronto para impressão.
// Mesmo design system dos demais manuais (Assessoria, Evolução Jurídica).
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
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;

let folio = 0;
const SECTIONS = [];
const NAV = [null, "Visão geral", "Cronograma S1–S3", "Cronograma S5–S6", "KPIs", "Reuniões Estratégicas", "Responsáveis"];
let pageIdx = 0;
const page = (body, opts = {}) => {
  const idx = pageIdx++;
  const label = NAV[idx];
  const id = label ? `s${idx}` : "";
  if (label) SECTIONS.push({ id, label });
  return `<section class="page${opts.cover ? " cover" : ""}"${id ? ` id="${id}"` : ""}${label ? ` data-label="${label}"` : ""}>
  <div class="amb"></div>
  <div class="pbody">${body}</div>
  ${opts.cover ? "" : `<div class="pfoot"><span>MANUAL DE ENTREGA · ESTRUTURAÇÃO PRO · <b>E3</b></span><span>${String(++folio).padStart(2, "0")}</span></div>`}
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
const rules = (items) => `<div class="rules">${items.map((r, i) => `<div class="rule-item"><span class="nbadge">${i + 1}</span><div><p class="rt">${r.t}</p><p class="rd">${r.d}</p></div></div>`).join("")}</div>`;

const P = [];

/* — CAPA — */
P.push(page(`
  <img class="logo" src="${LOGO_URI}" alt="E3"/>
  <p class="kicker cov-k">PLAYBOOK DE ENTREGA &amp; ALINHAMENTO · DOCUMENTO OPERACIONAL</p>
  <h1>Estruturação <span>PRO</span></h1>
  <p class="cov-sub">Escopo metodológico, cronograma de reuniões, ritos de acompanhamento e entregáveis operacionais — do diagnóstico à consolidação de mídia, CRM e comercial.</p>
  <div class="pills">
    <span class="pill">DIAGNÓSTICO 360°</span><span class="pill">CRM &amp; IA</span>
    <span class="pill">AUDITORIA CRIATIVA</span><span class="pill">IMPLEMENTAÇÃO COMERCIAL</span><span class="pill">KPIS DEFINIDOS</span>
  </div>
  <div class="cov-rule"></div>
  <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
`, { cover: true }));

/* — VISÃO GERAL — */
P.push(page(`
  <p class="kicker">VISÃO GERAL</p>
  <h2 class="h2">Entrega e Alinhamento — Estruturação PRO</h2>
  <p class="body">Este documento estabelece o <b>escopo metodológico</b>, o cronograma de reuniões, os ritos de acompanhamento e os entregáveis operacionais específicos do produto Estruturação PRO. O objetivo é garantir o alinhamento de expectativas e a execução das melhorias de <b>marketing</b>, <b>processos comerciais</b> e <b>tecnologia</b> ao longo do ciclo do projeto.</p>
  ${statRow([
    { v: "6", l: "Semanas de cronograma" },
    { v: "3", l: "Ritos estratégicos de reunião" },
    { v: "4", l: "Frentes de entrega" },
    { v: "100%", l: "Meta de integração do CRM" },
  ])}
  ${callout("activity", "COMO LER ESTE MANUAL", "Do diagnóstico à consolidação", "O documento segue três blocos: o <b>cronograma de entregas e ritos</b> semana a semana, os <b>indicadores de sucesso</b> (SLA, performance comercial e de mídia) e o <b>roteiro das reuniões estratégicas</b> que marcam cada etapa do projeto.")}
  <div class="quote">
    <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
    <p>Account Manager, Gestor de Projetos e Gestor de Tráfego atuam como um único squad ao redor do cliente.</p>
    <p>Reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp são <b>responsabilidade de todos</b> — cada função cumprindo sua parte, sem terceirizar entregas para o colega.</p>
  </div>
`));

/* — CRONOGRAMA · SEMANAS 1 A 3 — */
P.push(page(`
  ${secHead("01", "Cronograma de Entregas e Ritos", "Da avaliação de maturidade à tecnologia em produção — as três primeiras semanas do projeto.")}
  ${tbl(["Semana · Etapa", "Entrega"], [
    ["Semanas 1–2 · Diagnóstico 360°<br><span class=\"muted\">Account ou Gestor de Projeto</span>", "Avaliação da maturidade de marketing, comercial e operacional; identificação de gargalos e mapeamento de oportunidades imediatas de monetização. Entrega: Documento Executivo e Dashboard com score de crescimento."],
    ["Semanas 1–2 · Auditoria de Mídia Paga<br><span class=\"muted\">Account e Gestor de Tráfego</span>", "Raio-X da estrutura de mídia, análise de perda de resultados e plano exato para as campanhas. Entrega: score geral de crescimento e estratégias personalizadas."],
    ["Semanas 2–3 · Implementação de CRM + IA<br><span class=\"muted\">Account ou Consultor Comercial</span>", "Configuração completa do CRM, pipelines, fluxos de follow-up e automações essenciais integradas ao Meta Ads. Entrega: CRM pronto, configurado e equipe treinada."],
    ["Semanas 2–3 · Auditoria Criativa", "Auditoria completa das redes sociais, definição da linha criativa ideal e roteiros específicos para o nicho. Entrega: guia de comunicação e roteiros prontos para gravação."],
  ])}
`));

/* — CRONOGRAMA · SEMANAS 5 A 6 — */
P.push(page(`
  ${secHead("02", "Cronograma de Entregas e Ritos", "Da máquina comercial à performance de mídia — o fechamento do ciclo de 6 semanas.")}
  ${tbl(["Semana · Etapa", "Entrega"], [
    ["Semanas 5–6 · Implementação Comercial<br><span class=\"muted\">Consultor Comercial</span>", "Otimização do processo de vendas, novos scripts, metas realistas e treinamento com acompanhamento assistido de 30 dias. Entrega: operação comercial no padrão certo, com aumento de conversão."],
    ["Semanas 5–6 · Assessoria de Campanha<br><span class=\"muted\">Gestor de Tráfego</span>", "Monitoramento diário de métricas e KPIs, otimização de orçamento e lances e relatórios periódicos de insights. Entrega: performance otimizada e crescimento sustentável comprovado."],
  ])}
  <div class="callout" style="margin-top:18px">
    <span class="isq">${svg("activity")}</span>
    <div><p class="kicker">ENTRE A SEMANA 3 E A SEMANA 5</p><p class="cd">Intervalo dedicado ao processamento interno de dados, maturação das primeiras campanhas otimizadas e auditorias de processos internos de vendas pelo time operacional.</p></div>
  </div>
`));

/* — KPIs — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO</p>
  <h2 class="h2">Metas, Indicadores e KPIs do Projeto</h2>
  <p class="body" style="margin-bottom:18px">Métricas acompanhadas conjuntamente pelo time técnico e pelo cliente para mensurar o sucesso da implementação.</p>
  <h3 class="h3">Implementação e Operação (SLA)</h3>
  ${tbl(["Indicador", "Meta"], [
    ["SLA de Integração do CRM (até S3)", "100% dos fluxos de automação de leads testados e canais de Meta Ads conectados."],
    ["SLA do Guia de Comunicação (até S3)", "Entrega dos criativos e do manual de tom de voz para aprovação."],
    ["Ativação da Máquina de Vendas (até S5)", "Implementação dos scripts comerciais revisados pelo time comercial do escritório."],
  ])}
  <h3 class="h3">Performance Comercial e de Mídia</h3>
  ${tbl(["Indicador", "Meta"], [
    ["Custo por Lead (CPL)", "Redução ou manutenção saudável do CPL após a Auditoria de Mídia."],
    ["Taxa de Conversão de Vendas (CRM/Comercial)", "Aproveitamento da base de leads gerados após o treinamento comercial (Semana 5)."],
    ["ROAS / ROI", "Proporção entre o investimento de mídia controlada e novos honorários fechados."],
  ])}
`));

/* — ROTEIRO DE REUNIÕES ESTRATÉGICAS — */
P.push(page(`
  ${secHead("03", "Roteiro e Ritos de Reuniões Estratégicas", "Três reuniões marcam a passagem de fase do projeto — do diagnóstico à consolidação.")}
  ${rules([
    { t: "Alinhamento de Diagnóstico e Auditoria (Semana 2)", d: "Apresentar o Score Geral de Crescimento, diagnosticar gargalos comerciais e validar a estrutura de mídia. Entregas: Dashboard de Crescimento + Plano Direcionado de Campanhas." },
    { t: "Setup de Tecnologia e Ativos (Semana 3)", d: "Homologar o CRM ativo, demonstrar os pipelines de automação e validar o Guia de Comunicação com roteiros de vídeo. Entregas: CRM em produção + Roteiros de Vídeo prontos para gravação." },
    { t: "Resultados e Planejamento de Escala (Semana 6)", d: "Consolidar dados e métricas, demonstrar o ROI gerado e entregar o direcionamento estratégico dos próximos 90 dias. Entregas: Relatório Final Consolidado + Cronograma de Continuidade / Pitch de Renovação." },
  ])}
`));

/* — RESPONSÁVEIS + COMPROMISSO — */
P.push(page(`
  <p class="kicker">FUNÇÕES DA SQUAD</p>
  <h2 class="h2">Responsáveis</h2>
  ${tbl(["Função", "O que faz"], [
    ["Account Manager", "Gestão do projeto, condução de reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp."],
    ["Gestor de Projetos", "Reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp."],
    ["Gestor de Tráfego", "Criação, otimização, acompanhamento e configuração da conta de anúncios, atualização do ClickUp e relatório semanal de performance."],
  ])}
  <div class="commit commit-solo">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Do diagnóstico à consolidação, um ROI mensurável.</h3>
    <p class="commit-d">Relatório Final Consolidado, ROI comprovado e o cronograma de continuidade fecham o ciclo — a Estruturação PRO entrega a máquina pronta para a próxima fase de crescimento.</p>
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
/* quote */
.quote{border-left:2px solid var(--o);padding:14px 20px;background:rgba(255,95,31,.04)}
.quote p{font-size:12.5px;line-height:1.6;color:rgba(255,255,255,.68);margin-top:8px}
.quote p:first-of-type{margin-top:0}
.quote b{color:var(--o)}
.qk{font-family:var(--s);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--o);font-weight:700}
/* sechead */
.sechead{display:flex;align-items:flex-start;gap:18px;margin-bottom:14px}
.secnum{font-family:var(--d);font-weight:800;font-size:48px;line-height:.8;color:transparent;-webkit-text-stroke:1.5px rgba(255,95,31,.6)}
.sechead h2{font-family:var(--d);font-weight:800;font-size:22px;letter-spacing:-.01em;margin-bottom:6px}
.sechead .lead{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.5}
.rule{height:1px;background:rgba(255,255,255,.1);margin-bottom:20px}
/* tabelas */
.tbl{width:100%;border-collapse:collapse;font-size:11.5px;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden}
.tbl th{background:linear-gradient(90deg,rgba(255,95,31,.16),rgba(255,51,0,.05));color:var(--o);text-align:left;padding:9px 14px;font-family:var(--d);font-weight:700;font-size:10.5px;letter-spacing:.02em}
.tbl td{padding:10px 14px;border-top:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.7);vertical-align:top;line-height:1.42}
.tbl td.k{color:#fff;font-weight:700}
.tbl td b{color:var(--o)}
/* rules (ritos) */
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
  title: "Manual de Entrega — Estruturação PRO · E3 Digital",
  navTitle: "Manual de Entrega · Estruturação PRO",
  logoUri: LOGO_URI,
  style: STYLE,
  pages: P,
  sections: SECTIONS,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/manual-entrega-estruturacao-pro/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("manual de entrega estruturação:", outPath, "·", P.length, "páginas");
