// Gera o Manual de Entrega (Evolução Jurídica) em slides 16:9, prontos para impressão.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow,
  makeCallout, tag, rules, split2,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const tagBase = () => tag("EVOLUÇÃO", "tag-light");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");

const NAV = [null, "Visão geral", "Entregas Evolução", "Entregas Pro", "Onboarding", "Cronograma Fase 1", "Cronograma Fase 2", "KPIs de Entrega", "KPIs Comerciais"];
const { page, SECTIONS } = makePageFactory("MANUAL DE ENTREGA · EVOLUÇÃO JURÍDICA", NAV);

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
  ${split2(`
    <p class="kicker">VISÃO GERAL</p>
    <h2 class="h2">Alinhamento comercial e operacional</h2>
    <p class="body">Este manual estrutura o alinhamento entre o que é <b>vendido pelo time Comercial</b> e o que é <b>executado pelo time Operacional</b> no produto Evolução, nas versões <b>Evolução</b> e <b>Evolução Pro</b>.</p>
    ${statRow([
      { v: "30 dias", l: "Duração do plano Evolução" },
      { v: "60 dias", l: "Duração do plano Pro" },
      { v: "9", l: "Semanas de cronograma" },
      { v: "3", l: "Grupos de indicadores" },
    ])}
  `, `
    ${callout("activity", "COMO LER ESTE MANUAL", "Do onboarding à escala", "A <b>divisão de entregas</b> por plano, o <b>cronograma semana a semana</b> e os <b>indicadores de sucesso</b> acompanhados pela equipe.")}
    <div class="legend">
      <div class="lg-item">${tagBase()}<span>entrega <b>padrão</b> do plano Evolução (30 dias)</span></div>
      <div class="lg-item">${tagPro()}<span>camada <b>exclusiva</b> do plano Evolução Pro (60 dias)</span></div>
    </div>
  `)}
`));

/* — DIVISÃO DE ENTREGAS: EVOLUÇÃO — */
P.push(page(`
  ${secHead("01", "Divisão de entregas " + tagBase(), "O que o time Comercial vende e o que o time Operacional entrega no plano Evolução.")}
  ${split2(`
    ${callout("handshake", "O QUE O COMERCIAL VENDE", "Canais, posicionamento e treinamento inicial", "Estruturação de canais básicos de captação, posicionamento de mercado e treinamento inicial de vendas.")}
    <h3 class="h3">O que o Operacional entrega</h3>
    ${rules([
      { t: "Onboarding", d: "Abertura oficial do projeto e alinhamento inicial." },
      { t: "Diagnóstico de ICP", d: "Perfil de cliente ideal e validação do posicionamento." },
      { t: "Landing Page otimizada", d: "Página de conversão publicada." },
      { t: "Google Meu Negócio", d: "Presença local com ficha e informações completas." },
    ])}
  `, `
    <h3 class="h3">&nbsp;</h3>
    ${rules([
      { t: "Roteiros estratégicos de conteúdo", d: "Base para produção de conteúdo e autoridade." },
      { t: "Treinamento comercial", d: "Capacitação do time para converter os leads." },
      { t: "Acompanhamento no Go-live", d: "Suporte da equipe E3 no lançamento das entregas." },
    ])}
  `)}
`));

/* — DIVISÃO DE ENTREGAS: EVOLUÇÃO PRO — */
P.push(page(`
  ${secHead("02", "Camada exclusiva " + tagPro(), "Tudo o que o plano Evolução entrega, mais a aceleração comercial abaixo — para quem avança para os 60 dias.")}
  ${callout("megaphone", "O QUE O COMERCIAL VENDE (PRO)", "Aceleração comercial avançada", "Canais ativos adicionais de aquisição: Social Selling, TikTok Lives e Funil de Indicação.")}
  <h3 class="h3">O que o Operacional entrega a mais</h3>
  ${rules([
    { t: "Setup de Social Selling", d: "Operação de prospecção ativa estruturada do zero." },
    { t: "Scripts de DM personalizados", d: "Roteiros de abordagem via redes sociais." },
    { t: "Funil de Indicação (com acompanhamento)", d: "Ativação da base de clientes como canal de negócios." },
    { t: "Live no TikTok", d: "Roteirização técnica e lançamento de uma live estratégica." },
  ], "grid2r")}
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
  ], "grid2r")}
`));

/* — CRONOGRAMA FASE 1 — */
P.push(page(`
  ${secHead("04", "Cronograma da Fase 1 " + tagBase(), "Ritos de reunião e entregas semana a semana, do kick-off ao pitch de renovação.")}
  ${tbl(["Semana", "O que acontece"], [
    ["Semana 0 · Kick-off &amp; Onboarding", "CS Manager envia vídeo e formulário comercial e analisa o Instagram. Account conduz o onboarding: ICP, posicionamento e formulários da página e do Google Meu Negócio."],
    ["Semana 1 · Posicionamento", "Account fecha posicionamento, persona, dores e objeções. Gestor de Projeto desenvolve copies e briefings de arte."],
    ["Semana 2 · Presença Digital", "Web Design publica a Landing Page. Gestor de Projeto finaliza a otimização do Google Meu Negócio."],
    ["Semana 3 · Capacitação &amp; Vitrine", "Criação publica a grade de 9 posts no Instagram. Consultor Comercial conduz o treinamento comercial."],
    ["Semana 4 · Resultados &amp; Pitch", "Account apresenta os resultados do ciclo e conduz o pitch de renovação ou upgrade."],
  ])}
`));

/* — CRONOGRAMA FASE 2 — */
P.push(page(`
  ${secHead("05", "Cronograma da Fase 2 " + tagPro(), "Para quem avança para a aceleração comercial — mais quatro semanas até a escala.")}
  ${tbl(["Semana", "O que acontece"], [
    ["Semana 5 · Prospecção Ativa", "Consultor Comercial estrutura o Social Selling, escreve os scripts de DM e ativa o Funil de Indicação. Gestor de Projeto acompanha a implantação."],
    ["Semana 6 · Live Estratégica TikTok", "Account planeja, roteiriza e lança a primeira live estratégica no TikTok do cliente."],
    ["Semana 7 · Otimização Comercial", "Gestor de Projeto audita a operação e acompanha a ativação do funil de indicação."],
    ["Semana 8 · Resultados &amp; Escala", "Account e Consultor Comercial revisam as métricas dos 60 dias e conduzem o novo pitch de renovação."],
  ])}
`));

/* — KPIs DE ENTREGA & RETENÇÃO — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO</p>
  <h2 class="h2">KPIs de entrega e retenção</h2>
  ${split2(`
    <h3 class="h3">Entrega operacional</h3>
    ${tbl(["Indicador", "Meta"], [
      ["SLA de entrega da LP (S2)", "Publicação no prazo — 100% de conformidade."],
      ["Google Meu Negócio", "Ficha, fotos, horário e links atualizados."],
      ["Conteúdo / scripts de DM", "Roteiros (S3) e DMs (S5) validados."],
    ])}
  `, `
    <h3 class="h3">Retenção</h3>
    ${tbl(["Indicador", "Meta"], [
      ["NPS do cliente", "Nota ao final da jornada — foco em promotores."],
      ["Taxa de conversão do Pitch", "% de renovação ou upgrade para o Pro."],
    ])}
  `)}
`));

/* — KPIs DE PERFORMANCE COMERCIAL + COMPROMISSO — */
P.push(page(`
  <p class="kicker">INDICADORES DE SUCESSO</p>
  <h2 class="h2">KPIs de performance comercial</h2>
  ${tbl(["Indicador", "Meta"], [
    ["Taxa de conversão comercial", "Aproveitamento dos leads pós-Treinamento Comercial (S3)."],
    ["Leads via prospecção ativa", "Respostas qualificadas geradas via Social Selling/DMs (S5)."],
    ["Novas vendas via Funil de Indicação", "Clientes gerados pela base ativada entre S5 e S7."],
    ["Audiência na Live TikTok", "Pico de espectadores e leads capturados na live (S6)."],
  ])}
  <div class="commit commit-solo">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Do onboarding ao pitch, um único fio condutor.</h3>
    <p class="commit-d">Cada semana, entrega e indicador deste manual existe para transformar o plano vendido em resultado real.</p>
  </div>
`));

const html = shell({
  title: "Manual de Entrega — Evolução Jurídica · E3 Digital",
  navTitle: "Manual de Entrega · Evolução Jurídica",
  logoUri: LOGO_URI,
  pages: P,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/manual-entrega-evolucao-juridica/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("manual de entrega evolução:", outPath, "·", P.length, "páginas");
