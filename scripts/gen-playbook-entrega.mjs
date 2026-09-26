// Gera o Manual de Entrega (Assessoria Light & Pro) em slides 16:9, prontos para impressão.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow,
  makeCallout, tag, rules,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const tagLight = () => tag("LIGHT", "tag-light");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");

const NAV = [null, "Visão geral", "Entregas Light", "Camada Pro", "Ritos", "KPIs Light", "KPIs Pro", "Ciclo de 30 dias", "Compromisso"];
const { page, SECTIONS } = makePageFactory("MANUAL DE ENTREGA · ASSESSORIA LIGHT & PRO", NAV);

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
  <p class="body">Este documento estabelece o <b>escopo de entrega técnica</b>, o <b>fluxo operacional</b> e a estrutura de acompanhamento estratégico da Assessoria Light e Pro. Entrega <b>contínua (recorrente)</b>, sem data de finalização, unificando Tráfego Pago, Marketing e Receita (vendas e CRM).</p>
  ${statRow([
    { v: "3", l: "Frentes operacionais" },
    { v: "30 dias", l: "Ciclo de otimização" },
    { v: "3", l: "Ritos de acompanhamento" },
    { v: "2", l: "Camadas: Light e Pro" },
  ])}
  ${callout("activity", "COMO LER ESTE MANUAL", "Do escopo ao ciclo mensal", "Quatro blocos: a <b>divisão de entregas</b> por plano, a <b>agenda de ritos</b>, os <b>indicadores de sucesso</b> de cada plano e o <b>ciclo operacional de 30 dias</b> com os responsáveis.")}
  <div class="legend">
    <div class="lg-item">${tagLight()}<span>entrega <b>padrão</b> do plano Light</span></div>
    <div class="lg-item">${tagPro()}<span>camada <b>exclusiva</b> do plano Pro</span></div>
  </div>
`));

/* — DIVISÃO DE ENTREGAS: LIGHT — */
P.push(page(`
  ${secHead("01", "Divisão de entregas " + tagLight(), "Com base na estrutura de canais contratada, as frentes operacionais da Assessoria Light se dividem em três pilares.")}
  ${tbl(["Pilar / Responsável", "Escopo operacional da equipe", "Entregáveis para o cliente"], [
    ["Tráfego Pago<br><span class=\"muted\">Gestor de Tráfego</span>", "Criação, configuração e otimização diária de campanhas (Google Ads ou Meta Ads); análise constante de lances e segmentação.", "Contas de anúncios configuradas, estratégias de campanha ativas e consultorias quinzenais."],
    ["Marketing &amp; Conteúdo<br><span class=\"muted\">Account e Gestor de Projeto</span>", "Desenvolvimento estético e textual dos anúncios; copies persuasivas para páginas de conversão.", "Criativos estáticos mensais, copies de anúncios e relatório semanal em tempo real."],
    ["Receita &amp; Comercial<br><span class=\"muted\">Account Manager</span>", "Estruturação de processos comerciais; implementação de CRM; simulação de atendimento.", "Scripts de vendas, CRM Padrão, relatório de Cliente Oculto e funil de indicação."],
  ])}
`));

/* — DIVISÃO DE ENTREGAS: PRO — */
P.push(page(`
  ${secHead("02", "Camada exclusiva " + tagPro(), "Tudo o que a Assessoria Light entrega, mais a camada abaixo — para escritórios em fase de escala comercial.")}
  ${tbl(["Pilar", "Escopo contínuo da equipe", "Entregáveis exclusivos Pro"], [
    ["Tráfego", "Planejamento estratégico de verba, criação e otimização diária em múltiplos canais.", "Gestão de Tráfego (Google e Meta Ads) e Landing Page própria de alta conversão."],
    ["Receita", "Capacitação e consultoria de vendas contínua; roteiros mensais; automação de fluxos.", "Consultor Comercial dedicado, Auditoria de Vendas, CRM Padrão, IA de Atendimento 24h, Funil de Indicação e Social Selling."],
    ["Gestão &amp; Estratégia", "Acompanhamento executivo contínuo e análise de ROI.", "Reuniões quinzenais comerciais, planejamento mensal e Selo de Garantia do Pro."],
  ])}
`));

/* — AGENDA PADRÃO DE ACOMPANHAMENTO — */
P.push(page(`
  ${secHead("03", "Agenda padrão de acompanhamento", "A constância nos ritos é essencial para manter o cliente assistido e ativo — válida para Light e Pro.")}
  ${rules([
    { t: "Semanal (assíncrono)", d: "Relatório de Métricas em Tempo Real: campanhas, criativos e fluxo de leads." },
    { t: "Quinzenal (30 min)", d: "Consultoria de Tráfego e Alinhamento Comercial — qualidade dos leads, CRM e criativos da quinzena." },
    { t: "Mensal (45 min)", d: "Reunião Estratégica de Fechamento — KPIs do mês, Cliente Oculto e plano de ação." },
  ], "grid2r")}
  <div class="commit">
    <span class="commit-pill">NA PRÁTICA</span>
    <h3 class="commit-t">No Pro, os mesmos ritos ganham profundidade.</h3>
    <p class="commit-d">A quinzenal passa a ser conduzida pelo Consultor Comercial dedicado, e a mensal incorpora o planejamento estratégico exclusivo do plano.</p>
  </div>
`));

/* — KPIs LIGHT — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO ${tagLight()}</p>
  <h2 class="h2">KPIs · Assessoria Light</h2>
  <p class="body">Métricas de performance de marketing e de vendas do escritório do cliente, acompanhadas em todo ciclo.</p>
  ${tbl(["Indicador", "O que mede na prática", "Meta ideal / referência"], [
    ["Custo por Lead (CPL)", "Valor médio investido em mídia por contato iniciado.", "Variável por nicho de atuação"],
    ["Taxa de Conversão de Atendimento", "% de leads que aceitam agendar uma consulta/reunião.", "Mínimo de 20% a 40%"],
    ["SLA de Primeiro Contato", "Tempo médio para a equipe do cliente responder o lead.", "Menos de 15 minutos"],
    ["Taxa de Aproveitamento (CRM)", "Contatos atualizados e movidos corretamente no funil.", "100% dos leads registrados"],
    ["ROI (Retorno sobre Investimento)", "Faturamento fechado em relação ao valor investido.", "Idealmente acima de 3x a 5x"],
  ])}
`));

/* — KPIs PRO — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO ${tagPro()}</p>
  <h2 class="h2">KPIs · Assessoria Pro</h2>
  <p class="body">Camada adicional de indicadores comerciais, acompanhada junto ao Consultor Comercial dedicado.</p>
  ${tbl(["KPI comercial", "O que mede na prática", "Meta ideal / referência Pro"], [
    ["SLA de Triagem (IA)", "Tempo de resposta da primeira interação no WhatsApp.", "Imediato — menos de 1 minuto, 24h/dia"],
    ["Taxa de Qualificação de Leads", "% de leads que passam no filtro técnico da IA/LP.", "Acima de 40%"],
    ["Eficiência de Vendas (CRM)", "% de leads qualificados convertidos em contrato.", "15% a 30%, com auditoria de vendas ativa"],
    ["Conversão de Social Selling", "Abordagens ativas (DMs) que viram reuniões.", "Mínimo de 5% a 10% de conversão"],
    ["ROI Geral do Pro", "Retorno sobre a verba de mídia e taxa de assessoria.", "Projeção mínima de 4x a 6x o investimento"],
  ])}
`));

/* — CICLO DE 30 DIAS + RESPONSÁVEIS — */
P.push(page(`
  ${secHead("04", "Ciclo operacional de 30 dias", "Embora o contrato seja contínuo, a operação roda em ciclos mensais de otimização com o roteiro abaixo.")}
  ${rules([
    { t: "Semana 1 · Planejamento", d: "Alinhamento das metas do mês. Teses de campanha e roteirização dos criativos." },
    { t: "Semana 2 · Produção", d: "Peças criativas e aprovação das copies. Otimizações no CRM e calibração de públicos." },
    { t: "Semana 3 · Execução", d: "Distribuição do orçamento, consultorias quinzenais e teste de Cliente Oculto." },
    { t: "Semana 4 · Fechamento", d: "Relatórios de tráfego e CRM. Resultados de vendas e planejamento do próximo ciclo." },
  ], "grid2r")}
  <h3 class="h3">Responsáveis no ciclo</h3>
  ${tbl(["Função", "O que faz ao longo do ciclo"], [
    ["Account Manager", "Gestão do projeto, reuniões, suporte ao grupo, solicitação à equipe criativa, ClickUp e onboarding."],
    ["Gestor de Projeto", "Reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp."],
    ["Gestor de Tráfego", "Criação, otimização, configuração da conta de anúncios, ClickUp e relatório semanal."],
  ])}
`));

/* — COMPROMISSO — */
P.push(page(`
  <div class="commit commit-solo">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Um único padrão de excelência, duas profundidades de entrega.</h3>
    <p class="commit-d">Light e Pro compartilham a mesma disciplina operacional e os mesmos ritos de acompanhamento — o que muda é a profundidade da entrega comercial e o nível de dedicação do squad em cada ciclo.</p>
  </div>
`));

const html = shell({
  title: "Manual de Entrega — Assessoria Light &amp; Pro · E3 Digital",
  navTitle: "Manual de Entrega · Assessoria Light &amp; Pro",
  logoUri: LOGO_URI,
  pages: P,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/playbook-entrega-alinhamento/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("manual entrega assessoria:", outPath, "·", P.length, "páginas");
