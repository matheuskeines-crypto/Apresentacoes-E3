// Gera o Manual de Entrega (Estruturação PRO) em slides 16:9, prontos para impressão.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow,
  makeCallout, rules, split2,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);

const NAV = [null, "Visão geral", "Cronograma S1–S3", "Cronograma S5–S6", "KPIs", "Reuniões Estratégicas", "Responsáveis"];
const { page, SECTIONS } = makePageFactory("MANUAL DE ENTREGA · ESTRUTURAÇÃO PRO", NAV);

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
  ${split2(`
    <p class="kicker">VISÃO GERAL</p>
    <h2 class="h2">Entrega e Alinhamento — Estruturação PRO</h2>
    <p class="body">Este documento estabelece o <b>escopo metodológico</b>, o cronograma de reuniões, os ritos de acompanhamento e os entregáveis operacionais do produto Estruturação PRO — alinhamento de expectativas e execução das melhorias de <b>marketing</b>, <b>processos comerciais</b> e <b>tecnologia</b>.</p>
    ${statRow([
      { v: "6", l: "Semanas de cronograma" },
      { v: "3", l: "Ritos estratégicos" },
      { v: "4", l: "Frentes de entrega" },
      { v: "100%", l: "Meta de integração do CRM" },
    ])}
  `, `
    ${callout("activity", "COMO LER ESTE MANUAL", "Do diagnóstico à consolidação", "Três blocos: o <b>cronograma de entregas e ritos</b> semana a semana, os <b>indicadores de sucesso</b> e o <b>roteiro das reuniões estratégicas</b>.")}
    <div class="quote">
      <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
      <p>Account Manager, Gestor de Projetos e Gestor de Tráfego atuam como um único squad ao redor do cliente.</p>
      <p>Reuniões, suporte ao grupo e atualização do ClickUp são <b>responsabilidade de todos</b> — sem terceirizar entregas para o colega.</p>
    </div>
  `)}
`));

/* — CRONOGRAMA · SEMANAS 1 A 3 — */
P.push(page(`
  ${secHead("01", "Cronograma de Entregas e Ritos", "Da avaliação de maturidade à tecnologia em produção — as três primeiras semanas do projeto.")}
  ${tbl(["Semana · Etapa", "Entrega"], [
    ["Semanas 1–2 · Diagnóstico 360°<br><span class=\"muted\">Account ou Gestor de Projeto</span>", "Avaliação da maturidade de marketing, comercial e operacional; gargalos e oportunidades de monetização. Entrega: Documento Executivo e Dashboard com score de crescimento."],
    ["Semanas 1–2 · Auditoria de Mídia Paga<br><span class=\"muted\">Account e Gestor de Tráfego</span>", "Raio-X da estrutura de mídia, análise de perda de resultados e plano exato para as campanhas. Entrega: score geral de crescimento e estratégias personalizadas."],
    ["Semanas 2–3 · Implementação de CRM + IA<br><span class=\"muted\">Account ou Consultor Comercial</span>", "Configuração completa do CRM, pipelines, follow-up e automações integradas ao Meta Ads. Entrega: CRM pronto e equipe treinada."],
    ["Semanas 2–3 · Auditoria Criativa", "Auditoria das redes sociais, linha criativa ideal e roteiros para o nicho. Entrega: guia de comunicação e roteiros prontos para gravação."],
  ])}
`));

/* — CRONOGRAMA · SEMANAS 5 A 6 — */
P.push(page(`
  ${secHead("02", "Cronograma de Entregas e Ritos", "Da máquina comercial à performance de mídia — o fechamento do ciclo de 6 semanas.")}
  ${tbl(["Semana · Etapa", "Entrega"], [
    ["Semanas 5–6 · Implementação Comercial<br><span class=\"muted\">Consultor Comercial</span>", "Otimização do processo de vendas, novos scripts, metas realistas e treinamento com acompanhamento assistido de 30 dias. Entrega: operação comercial no padrão certo, com aumento de conversão."],
    ["Semanas 5–6 · Assessoria de Campanha<br><span class=\"muted\">Gestor de Tráfego</span>", "Monitoramento diário de métricas e KPIs, otimização de orçamento e relatórios periódicos. Entrega: performance otimizada e crescimento sustentável."],
  ])}
  ${callout("activity", "ENTRE A SEMANA 3 E A SEMANA 5", "", "Intervalo dedicado ao processamento interno de dados, maturação das primeiras campanhas otimizadas e auditorias de processos internos de vendas.")}
`));

/* — KPIs — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO</p>
  <h2 class="h2">Metas, Indicadores e KPIs do Projeto</h2>
  ${split2(`
    <h3 class="h3">Implementação e Operação (SLA)</h3>
    ${tbl(["Indicador", "Meta"], [
      ["SLA de Integração do CRM (até S3)", "100% dos fluxos testados e canais de Meta Ads conectados."],
      ["SLA do Guia de Comunicação (até S3)", "Criativos e manual de tom de voz para aprovação."],
      ["Ativação da Máquina de Vendas (até S5)", "Scripts comerciais revisados pelo time do escritório."],
    ])}
  `, `
    <h3 class="h3">Performance Comercial e de Mídia</h3>
    ${tbl(["Indicador", "Meta"], [
      ["Custo por Lead (CPL)", "Redução ou manutenção saudável após a Auditoria de Mídia."],
      ["Taxa de Conversão de Vendas", "Aproveitamento da base pós-treinamento (Semana 5)."],
      ["ROAS / ROI", "Investimento de mídia controlada x novos honorários fechados."],
    ])}
  `)}
`));

/* — ROTEIRO DE REUNIÕES ESTRATÉGICAS — */
P.push(page(`
  ${secHead("03", "Roteiro e Ritos de Reuniões Estratégicas", "Três reuniões marcam a passagem de fase do projeto — do diagnóstico à consolidação.")}
  ${rules([
    { t: "Alinhamento de Diagnóstico e Auditoria (Semana 2)", d: "Score Geral de Crescimento, gargalos comerciais e validação da mídia. Entregas: Dashboard + Plano de Campanhas." },
    { t: "Setup de Tecnologia e Ativos (Semana 3)", d: "Homologar o CRM, pipelines de automação e Guia de Comunicação. Entregas: CRM em produção + Roteiros de Vídeo." },
    { t: "Resultados e Planejamento de Escala (Semana 6)", d: "Dados, métricas e ROI gerado; direcionamento dos próximos 90 dias. Entregas: Relatório Final + Pitch de Renovação." },
  ], "grid2r")}
`));

/* — RESPONSÁVEIS + COMPROMISSO — */
P.push(page(`
  <p class="kicker">FUNÇÕES DA SQUAD</p>
  <h2 class="h2">Responsáveis</h2>
  ${tbl(["Função", "O que faz"], [
    ["Account Manager", "Gestão do projeto, condução de reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp."],
    ["Gestor de Projetos", "Reuniões, suporte ao grupo, solicitação à equipe criativa e atualização do ClickUp."],
    ["Gestor de Tráfego", "Criação, otimização, configuração da conta de anúncios, ClickUp e relatório semanal de performance."],
  ])}
  <div class="commit commit-solo">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Do diagnóstico à consolidação, um ROI mensurável.</h3>
    <p class="commit-d">Relatório Final Consolidado, ROI comprovado e o cronograma de continuidade fecham o ciclo — a Estruturação PRO entrega a máquina pronta para a próxima fase de crescimento.</p>
  </div>
`));

const html = shell({
  title: "Manual de Entrega — Estruturação PRO · E3 Digital",
  navTitle: "Manual de Entrega · Estruturação PRO",
  logoUri: LOGO_URI,
  pages: P,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/manual-entrega-estruturacao-pro/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("manual de entrega estruturação:", outPath, "·", P.length, "páginas");
