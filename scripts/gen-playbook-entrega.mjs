// Gera o Playbook de Entrega & Alinhamento (Assessoria Light & Pro) em HTML pronto para impressão.
// Mesmo design system do scripts/gen-playbook.mjs (Playbook de Funções).
import { readFileSync, writeFileSync } from "node:fs";

const LOGO = readFileSync("/Users/matheus/Desktop/e3-apresentacoes/logo_e3.b64", "utf8").trim();
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
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;

let folio = 0;
const page = (body, opts = {}) => `<section class="page${opts.cover ? " cover" : ""}">
  <div class="amb"></div>
  <div class="pbody">${body}</div>
  ${opts.cover ? "" : `<div class="pfoot"><span>PLAYBOOK · ENTREGA &amp; ALINHAMENTO · <b>E3</b></span><span>${String(++folio).padStart(2, "0")}</span></div>`}
</section>`;

const secHead = (num, title, desc) => `<div class="sechead">
  <span class="secnum">${num}</span>
  <div><h2>${title}</h2><p class="lead">${desc}</p></div>
</div><div class="rule"></div>`;

const tbl = (head, rows) => `<table class="tbl"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const statRow = (items) => `<div class="stats">${items.map((s) => `<div class="stat"><span class="sv">${s.v}</span><span class="sl">${s.l}</span></div>`).join("")}</div>`;
const callout = (icon, kicker, title, text) => `<div class="callout">
  <span class="isq">${svg(icon)}</span>
  <div><p class="kicker">${kicker}</p><h4>${title}</h4><p class="cd">${text}</p></div>
</div>`;
const tag = (label, cls) => `<span class="tag ${cls}">${label}</span>`;
const tagLight = () => tag("LIGHT", "tag-light");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");
const rules = (items) => `<div class="rules">${items.map((r, i) => `<div class="rule-item"><span class="nbadge">${i + 1}</span><div><p class="rt">${r.t}</p><p class="rd">${r.d}</p></div></div>`).join("")}</div>`;

const P = [];

/* — CAPA — */
P.push(page(`
  <img class="logo" src="${LOGO_URI}" alt="E3"/>
  <p class="kicker cov-k">PLAYBOOK DE ENTREGA &amp; ALINHAMENTO · DOCUMENTO OPERACIONAL</p>
  <h1>Entrega <span>&amp; Alinhamento</span></h1>
  <p class="cov-sub">Escopo técnico, agenda de acompanhamento e indicadores de sucesso da Assessoria Light e Pro — o que cada plano entrega ao cliente e o que a squad deve fazer em cada ciclo.</p>
  <div class="pills">
    <span class="pill">LIGHT</span><span class="pill">PRO</span>
    <span class="pill">KPIS POR PLANO</span><span class="pill">CICLO DE 30 DIAS</span><span class="pill">RESPONSÁVEIS</span>
  </div>
  <div class="cov-rule"></div>
  <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
`, { cover: true }));

/* — VISÃO GERAL — */
P.push(page(`
  <p class="kicker">VISÃO GERAL</p>
  <h2 class="h2">Escopo técnico e alinhamento contínuo</h2>
  <p class="body">Este documento estabelece o <b>escopo de entrega técnica</b>, o <b>fluxo operacional</b> e a estrutura de acompanhamento estratégico da Assessoria Light e Pro. É um produto de <b>entrega contínua (recorrente)</b>, sem data de finalização, que unifica as frentes de Tráfego Pago, Marketing (criativos e copy) e estruturação de Receita (vendas e CRM).</p>
  <p class="body">O objetivo é garantir <b>clareza absoluta na execução operacional</b>, alinhamento de expectativas com o cliente e manutenção do engajamento de longo prazo (LTV) — deixando explícito, em cada frente, o que é entrega padrão do plano <b>Light</b> e o que é camada exclusiva do plano <b>Pro</b>.</p>
  ${statRow([
    { v: "3", l: "Frentes operacionais" },
    { v: "30 dias", l: "Ciclo de otimização" },
    { v: "3", l: "Ritos de acompanhamento" },
    { v: "2", l: "Camadas: Light e Pro" },
  ])}
  ${callout("activity", "COMO LER ESTE PLAYBOOK", "Do escopo ao ciclo mensal", "O documento segue quatro blocos: a <b>divisão de entregas</b> por plano (Light e a camada exclusiva Pro), a <b>agenda padrão de ritos</b> de acompanhamento, os <b>indicadores de sucesso</b> de cada plano e o <b>ciclo operacional de 30 dias</b> com os responsáveis de cada etapa.")}
  <div class="legend">
    <div class="lg-item">${tagLight()}<span>entrega <b>padrão</b> do plano Light</span></div>
    <div class="lg-item">${tagPro()}<span>camada <b>exclusiva</b> do plano Pro</span></div>
  </div>
`));

/* — DIVISÃO DE ENTREGAS: LIGHT — */
P.push(page(`
  ${secHead("01", "Divisão de entregas " + tagLight(), "Com base na estrutura de canais contratada, as frentes operacionais da Assessoria Light se dividem em três pilares.")}
  ${tbl(["Pilar / Responsável", "Escopo operacional da equipe", "Entregáveis para o cliente"], [
    ["Tráfego Pago<br><span class=\"muted\">Gestor de Tráfego</span>", "Criação, configuração e otimização diária de campanhas focadas no público-alvo (Google Ads ou Meta Ads); análise constante de lances e segmentação.", "Contas de anúncios configuradas, estratégias de campanha ativas e consultorias quinzenais de tráfego."],
    ["Marketing &amp; Conteúdo<br><span class=\"muted\">Account Manager e Gestor de Projeto</span>", "Desenvolvimento estético e textual dos anúncios; redação de copies persuasivas para páginas de conversão e anúncios ativos.", "Criativos estáticos mensais, copies de anúncios e relatório de métricas semanal em tempo real."],
    ["Receita &amp; Comercial<br><span class=\"muted\">Account Manager</span>", "Estruturação de processos comerciais internos; implementação de CRM para gestão de oportunidades; testes práticos com simulação de atendimento.", "Scripts de vendas personalizados, CRM Padrão implementado, relatório de Cliente Oculto e estruturação do funil de indicação."],
  ])}
`));

/* — DIVISÃO DE ENTREGAS: PRO — */
P.push(page(`
  ${secHead("02", "Camada exclusiva " + tagPro(), "Tudo o que a Assessoria Light entrega, mais a camada abaixo — pensada para escritórios em fase de escala comercial.")}
  ${tbl(["Pilar", "Escopo contínuo da equipe", "Entregáveis exclusivos Pro"], [
    ["Tráfego", "Planejamento estratégico de verba, criação, publicação e otimização diária de campanhas em múltiplos canais; infraestrutura de conversão.", "Gestão de Tráfego (Google Ads e Meta Ads) e criação/otimização de Landing Page própria de alta conversão."],
    ["Receita", "Capacitação e consultoria de vendas contínua para o time do cliente; roteiros atualizados mensalmente; automação de fluxos comerciais.", "Consultor Comercial dedicado ao escritório, Auditoria de Vendas diária/semanal, CRM Padrão, IA de Atendimento e Triagem 24h no WhatsApp, Funil de Indicação e Funil de Social Selling."],
    ["Gestão &amp; Estratégia", "Acompanhamento executivo contínuo, projeção de metas comerciais e análise de ROI.", "Reuniões quinzenais comerciais de calibração, planejamento estratégico mensal de crescimento e Selo de Garantia do Pro."],
  ])}
`));

/* — AGENDA PADRÃO DE ACOMPANHAMENTO — */
P.push(page(`
  ${secHead("03", "Agenda padrão de acompanhamento", "Sendo um produto recorrente, a constância nos ritos é essencial para manter o cliente assistido e ativo — válida para Light e Pro.")}
  ${rules([
    { t: "Semanal (assíncrono)", d: "Envio e atualização do Relatório de Métricas em Tempo Real: desempenho das campanhas, criativos e fluxo de leads." },
    { t: "Quinzenal (síncrono · 30 min)", d: "Consultoria de Tráfego e Alinhamento Comercial — calibração da qualidade dos leads, revisão do uso do CRM e definição de criativos/ofertas da quinzena seguinte." },
    { t: "Mensal (síncrono · 45 min)", d: "Reunião Estratégica de Fechamento de Ciclo — apresentação dos KPIs consolidados do mês, resultado do Cliente Oculto e atualização do plano de ação." },
  ])}
  <div class="commit">
    <span class="commit-pill">NA PRÁTICA</span>
    <h3 class="commit-t">No Pro, os mesmos ritos ganham profundidade.</h3>
    <p class="commit-d">A quinzenal de alinhamento comercial passa a ser conduzida pelo Consultor Comercial dedicado, e a mensal incorpora o planejamento estratégico de crescimento exclusivo do plano.</p>
  </div>
`));

/* — KPIs LIGHT — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO ${tagLight()}</p>
  <h2 class="h2">KPIs · Assessoria Light</h2>
  <p class="body" style="margin-bottom:18px">Métricas de performance de marketing e de vendas do escritório do cliente, acompanhadas em todo ciclo.</p>
  ${tbl(["Indicador", "O que mede na prática", "Meta ideal / referência"], [
    ["Custo por Lead (CPL)", "Valor médio investido em mídia para gerar cada contato que inicia uma conversa.", "Variável por nicho de atuação"],
    ["Taxa de Conversão de Atendimento", "Percentual de leads da mídia paga que aceitam agendar uma consulta/reunião.", "Mínimo de 20% a 40%"],
    ["SLA de Primeiro Contato", "Tempo médio que a equipe do cliente leva para responder o lead após a entrada.", "Menos de 15 minutos"],
    ["Taxa de Aproveitamento (CRM)", "Quantidade de contatos atualizados e movidos corretamente dentro do funil de vendas.", "100% dos leads registrados"],
    ["ROI (Retorno sobre Investimento)", "Faturamento em contratos fechados em relação ao valor total investido.", "Idealmente acima de 3x a 5x"],
  ])}
`));

/* — KPIs PRO — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO ${tagPro()}</p>
  <h2 class="h2">KPIs · Assessoria Pro</h2>
  <p class="body" style="margin-bottom:18px">Camada adicional de indicadores comerciais, acompanhada junto ao Consultor Comercial dedicado.</p>
  ${tbl(["KPI comercial", "O que mede na prática", "Meta ideal / referência Pro"], [
    ["SLA de Triagem (IA)", "Tempo médio de resposta da primeira interação com o lead no WhatsApp.", "Imediato — menos de 1 minuto, 24h por dia"],
    ["Taxa de Qualificação de Leads", "Percentual de leads que passam no filtro técnico da IA ou do formulário da LP.", "Acima de 40%"],
    ["Eficiência de Vendas (CRM)", "Percentual de leads qualificados convertidos em contrato fechado pelo time interno.", "15% a 30%, com auditoria de vendas ativa"],
    ["Taxa de Conversão de Social Selling", "Abordagens ativas (DMs) que se transformam em reuniões agendadas.", "Mínimo de 5% a 10% de conversão"],
    ["ROI Geral do Pro", "Retorno direto sobre a verba investida em mídia e taxa de assessoria.", "Projeção mínima de 4x a 6x o investimento"],
  ])}
`));

/* — CICLO DE 30 DIAS + RESPONSÁVEIS — */
P.push(page(`
  ${secHead("04", "Ciclo operacional de 30 dias", "Embora o contrato seja contínuo, a operação roda em ciclos mensais de otimização com o roteiro abaixo.")}
  ${rules([
    { t: "Semana 1 · Planejamento &amp; Alinhamento", d: "Reunião mensal de alinhamento das metas do mês. Definição das teses de campanha e roteirização dos novos criativos/copy." },
    { t: "Semana 2 · Produção &amp; Configuração", d: "Produção das peças criativas estáticas e aprovação textual das copies pelo cliente. Otimizações técnicas no CRM e calibração de públicos." },
    { t: "Semana 3 · Execução &amp; Consultoria", d: "Distribuição do orçamento de mídia nas campanhas ativas, execução das consultorias quinzenais e aplicação do teste de Cliente Oculto (scripts e SLA)." },
    { t: "Semana 4 · Fechamento &amp; Próximo Ciclo", d: "Fechamento dos relatórios analíticos de tráfego e do CRM. Apresentação dos resultados de vendas e início do planejamento do ciclo seguinte." },
  ])}
  <h3 class="h3">Responsáveis no ciclo</h3>
  ${tbl(["Função", "O que faz ao longo do ciclo"], [
    ["Account Manager", "Gestão do projeto, condução de reuniões, suporte ao grupo, solicitação à equipe criativa, atualização do ClickUp e onboarding."],
    ["Gestor de Projeto", "Reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp."],
    ["Gestor de Tráfego", "Criação, otimização, acompanhamento e configuração da conta de anúncios, atualização do ClickUp e relatório semanal de performance."],
  ])}
`));

/* — COMPROMISSO — */
P.push(page(`
  <div class="commit" style="margin-top:380px">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Um único padrão de excelência, duas profundidades de entrega.</h3>
    <p class="commit-d">Light e Pro compartilham a mesma disciplina operacional e os mesmos ritos de acompanhamento — o que muda é a profundidade da entrega comercial e o nível de dedicação do squad em cada ciclo.</p>
  </div>
`));

/* ═════════════ HTML + CSS (mesmo design system do Playbook de Funções) ═════════════ */
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
.kicker{font-family:var(--s);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--o);font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
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
`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<title>Playbook · Entrega &amp; Alinhamento — E3 Digital</title>
<style>${STYLE}</style>
</head><body>${P.join("\n")}</body></html>`;

const outPath = process.argv[2] || "playbook-entrega.html";
writeFileSync(outPath, html, "utf8");
console.log("HTML gerado:", outPath, "·", P.length, "páginas");
