// Gera o Playbook de Funções (Evolução Jurídica) em slides 16:9, prontos para impressão.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow, feat,
  makeCallout, makeCardHead, tag, block, rules, split2,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const cardHead = makeCardHead(svg);
const tagBoth = () => tag("EVOLUÇÃO &amp; PRO", "tag-both");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");
const legend = () => `<div class="legend">
  <div class="lg-item">${tagBoth()}<span>a função atua nos planos <b>Evolução</b> e <b>Pro</b></span></div>
  <div class="lg-item">${tagPro()}<span>entrega ou atividade <b>exclusiva</b> do plano Pro</span></div>
</div>`;

const NAV = [
  null, "Visão geral", "Pilares", "Squad",
  "Account Manager", "Gestor de Projetos", "Web Designer & Design",
  "Consultor Comercial", "SLA",
];
const { page, SECTIONS } = makePageFactory("PLAYBOOK · EVOLUÇÃO JURÍDICA", NAV);

const P = [];

/* — CAPA — */
P.push(page(`
  <img class="logo" src="${LOGO_URI}" alt="E3"/>
  <p class="kicker cov-k">PLAYBOOK DE ENTREGA &amp; OPERAÇÃO · DOCUMENTO OPERACIONAL</p>
  <h1>Evolução <span>Jurídica</span></h1>
  <p class="cov-sub">Escopo de entrega, cronograma operacional, funções da squad e diretrizes de execução — presença digital e comercial estruturados para escritórios de advocacia.</p>
  <div class="pills">
    <span class="pill">PRESENÇA DIGITAL</span><span class="pill">CAPACITAÇÃO COMERCIAL</span>
    <span class="pill">SQUAD DE ENTREGA</span><span class="pill">FUNÇÕES &amp; KPIS</span><span class="pill">SLA DEFINIDO</span>
  </div>
  <div class="cov-rule"></div>
  <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
`, { cover: true }));

/* — VISÃO GERAL — */
P.push(page(`
  ${split2(`
    <p class="kicker">VISÃO GERAL</p>
    <h2 class="h2">O que é a Evolução Jurídica</h2>
    <p class="body">Este documento oficializa o <b>escopo de entrega</b>, o cronograma operacional, as <b>responsabilidades e os indicadores de cada função</b> e as diretrizes de execução do produto Evolução, nas versões <b>Evolução</b> e <b>Evolução Pro</b>.</p>
    <p class="body">A Evolução Jurídica une <b>presença digital</b> (posicionamento, Landing Page e Google Meu Negócio) com <b>capacitação comercial</b> — evoluindo, no plano Pro, para <b>aceleração comercial</b> (Social Selling, TikTok e Funil de Indicação).</p>
    ${statRow([
      { v: "30 dias", l: "Duração do plano Evolução" },
      { v: "60 dias", l: "Duração do plano Pro" },
      { v: "4", l: "Funções da squad" },
      { v: "9", l: "Semanas de cronograma" },
    ])}
  `, `
    ${callout("activity", "COMO LER ESTE PLAYBOOK", "Do onboarding ao pitch de renovação", "Três blocos: os <b>pilares de sucesso</b>, a <b>rotina e funções da squad</b> e o <b>Acordo de Nível de Serviço</b>.")}
    <p class="kicker" style="margin-bottom:6px">LEGENDA · EVOLUÇÃO OU PRO</p>
    ${legend()}
    <div class="quote">
      <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
      <p>Não existe cliente do Account, do GP ou do Design. <b>O cliente é da E3</b> e está sob responsabilidade do squad como um todo — cada função assume <b>100%</b> pelas próprias entregas.</p>
    </div>
  `)}
`));

/* — PILARES — */
P.push(page(`
  ${secHead("01", "Pilares de sucesso no projeto", "A entrega está dividida em três pilares, do posicionamento à aceleração comercial.")}
  <div class="pilares3">
    <div class="card">
      ${cardHead("target", "PILAR 01", "Presença Digital &amp; Posicionamento")}
      ${feat([
        { t: "Diagnóstico de ICP", d: "Mapeamento do perfil de cliente ideal e validação do posicionamento." },
        { t: "Landing Page Otimizada", d: "Página de conversão publicada, pronta para captar leads." },
        { t: "Google Meu Negócio", d: "Ficha, fotos, horário de atendimento e links funcionais." },
        { t: "Vitrine no Instagram", d: "Grade de 9 posts como vitrine de autoridade." },
      ])}
    </div>
    <div class="card">
      ${cardHead("pen", "PILAR 02", "Capacitação Comercial")}
      ${feat([
        { t: "Roteiros Estratégicos de Conteúdo", d: "Base para sustentar a produção de conteúdo e autoridade." },
        { t: "Treinamento Comercial", d: "Capacitação do time do cliente para converter leads em contratos." },
      ])}
    </div>
    <div class="card">
      ${cardHead("check", "PILAR 03", "Aceleração Comercial " + tagPro())}
      ${feat([
        { t: "Social Selling &amp; Scripts de DM", d: "Prospecção ativa para grandes contas via redes sociais." },
        { t: "Funil de Indicação", d: "Ativação da base de clientes como canal de novos negócios." },
        { t: "Live Estratégica no TikTok", d: "Roteirização e lançamento de uma live de alcance orgânico." },
      ])}
    </div>
  </div>
`));

/* — SQUAD — */
P.push(page(`
  ${secHead("02", "Rotina e funções da squad", "As entregas são sequenciais — 4 semanas no plano Evolução, mais 4 no Pro.")}
  ${tbl(["Função", "Entregáveis operacionais da equipe"], [
    ["Account Manager", "Kick-off e onboarding: análise do Instagram, ICP e posicionamento. Reunião de posicionamento. Resultados e pitch na Semana 4."],
    ["Gestor de Projetos", "Suporte nos grupos, solicitação à equipe criativa, ClickUp e auxílio ao Account. Copies e briefings. Otimização do Google Meu Negócio."],
    ["Web Designer &amp; Design", "Desenvolvimento e publicação da Landing Page. Grade de 9 posts no Instagram como vitrine de autoridade."],
    ["Consultor Comercial", "Treinamento comercial na Semana 3. No plano <b>Pro</b>: setup de Social Selling, scripts de DM e ativação do Funil de Indicação."],
  ])}
`));

/* — ACCOUNT MANAGER — */
P.push(page(`
  <div class="card">
    ${cardHead("users", "", "Account Manager", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> liderança do relacionamento, alinhamento estratégico e condução dos ritos. Conduz o cliente do kick-off ao pitch de renovação.</p></div>
    <div class="grid2">
      ${block("KICK-OFF &amp; ONBOARDING", ["Enviar vídeo/formulário e analisar o Instagram (S0).", "Conduzir o onboarding: ICP e posicionamento."])}
      ${block("REUNIÃO DE POSICIONAMENTO", ["Persona, dores e objeções na Semana 1.", "Alinhar a metodologia de roteiros de conteúdo."])}
      ${block("RESULTADOS &amp; PITCH", ["Apresentar resultados na Semana 4 (ou 8, Pro).", "Conduzir o pitch de renovação ou upgrade."])}
      ${block("LIVE ESTRATÉGICA TIKTOK " + tagPro(), ["Planejar, roteirizar e lançar a live do cliente.", "Orientar e acompanhar o lançamento."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Semana 0 · Kick-off", "Vídeo, formulário e reunião de onboarding."],
      ["Semana 1 · Posicionamento", "Persona, dores, objeções e roteiros."],
      ["Semana 4 · Resultados", "Resultados e pitch de renovação/upgrade."],
      ["Semanas 6 e 8 · Pro", "Live no TikTok (S6) e resultados/escala (S8)."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["NPS do cliente", "Foco em manter promotores."],
      ["Taxa de conversão do Pitch", "% de renovação ou upgrade para o Pro."],
      ["SLA de entrega da LP (S2)", "Publicação no prazo, com GP e Web Design."],
    ])}
  `)}
`));

/* — GESTOR DE PROJETOS — */
P.push(page(`
  <div class="card">
    ${cardHead("clipboard", "", "Gestor de Projetos", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> suporte contínuo, organização e prazo. Garante que cada entrega da squad saia no prazo combinado.</p></div>
    <div class="grid2">
      ${block("SUPORTE &amp; COMUNICAÇÃO", ["Suporte contínuo nos grupos.", "Auxílio ao Account no que for solicitado."])}
      ${block("BRIEFINGS &amp; CRIAÇÃO", ["Copies e ideias para as artes gráficas.", "Solicitação à equipe criativa."])}
      ${block("GOOGLE MEU NEGÓCIO", ["Otimização completa: ficha, fotos, horário."])}
      ${block("ACOMPANHAMENTO " + tagPro(), ["Implementação do Social Selling (S5).", "Auditoria e Funil de Indicação (S7)."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Semana 1", "Copies e briefings de arte."],
      ["Semana 2", "Otimização do Google Meu Negócio."],
      ["Semana 5 · Pro", "Implantação do Social Selling."],
      ["Semana 7 · Pro", "Auditoria e Funil de Indicação."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["SLA de entrega da LP (S2)", "Publicação no prazo — 100%."],
      ["Google Meu Negócio", "Ficha, fotos e links atualizados."],
      ["Conteúdo / scripts de DM", "Roteiros (S3) e DMs (S5) validados."],
    ])}
  `)}
`));

/* — WEB DESIGNER & DESIGN — */
P.push(page(`
  <div class="card">
    ${cardHead("pen", "", "Web Designer &amp; Design", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> os ativos visuais do projeto. Landing Page e vitrine de autoridade no Instagram — o que o lead vê antes de fechar contrato.</p></div>
    <div class="grid3">
      ${block("LANDING PAGE", ["Desenvolvimento e publicação da LP.", "Prazo da Semana 2."])}
      ${block("VITRINE INSTAGRAM", ["Grade de 9 posts como vitrine.", "Entrega em até 7 dias (S3)."])}
      ${block("ARTES GRÁFICAS", ["Com base nas copies do GP.", "Alinhadas ao posicionamento (S1)."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Semana 2", "Desenvolvimento e publicação da LP."],
      ["Semana 3", "Grade de 9 posts no Instagram."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["SLA de entrega da LP (S2)", "Publicação no prazo — 100%."],
      ["Frequência de conteúdo", "Posts da vitrine (S3) validados."],
    ])}
  `)}
`));

/* — CONSULTOR COMERCIAL (exclusivo Pro) — */
P.push(page(`
  ${split2(`
    <div class="card">
      ${cardHead("handshake", "", "Consultor Comercial", tagPro())}
      <div class="quote inline"><p><b>Foco:</b> capacitação e aceleração comercial. Treinamento de todos os clientes e, no Pro, toda a operação de prospecção ativa.</p></div>
      <div class="grid2">
        ${block("TREINAMENTO COMERCIAL", ["Reunião comercial na Semana 3.", "Capacitação para converter leads."])}
        ${block("SOCIAL SELLING " + tagPro(), ["Setup na Semana 5.", "Scripts de DM personalizados."])}
        ${block("FUNIL DE INDICAÇÃO " + tagPro(), ["Ativação e acompanhamento (S7)."])}
        ${block("RESULTADOS &amp; ESCALA " + tagPro(), ["Revisão das métricas com Account (S8)."])}
      </div>
    </div>
  `, `
    <h3 class="h3">Valor entregue ao projeto</h3>
    ${tbl(["Indicador", "Meta"], [
      ["Taxa de conversão comercial", "Aproveitamento dos leads pós-treino (S3)."],
      ["Leads via prospecção ativa", "Respostas qualificadas a partir da S5."],
      ["Novas vendas via Funil de Indicação", "Clientes gerados entre S5 e S7."],
    ])}
  `)}
`));

/* — SLA — */
P.push(page(`
  ${secHead("03", "Acordo de Nível de Serviço (SLA)", "Para o sucesso e a velocidade da Evolução Jurídica, as diretrizes abaixo devem ser seguidas por E3 e cliente.")}
  ${rules([
    { t: "SLA de Entrega da Landing Page", d: "Publicação no prazo da Semana 2 — <b>100%</b> de conformidade." },
    { t: "Prazo da Vitrine no Instagram", d: "Grade de 9 posts em <b>até 7 dias</b> após o briefing (S3)." },
    { t: "Coleta de Acessos do Cliente", d: "Domínio, hospedagem e Google em <b>até 48h</b> após o onboarding." },
    { t: "Validação de Materiais", d: "Roteiros (S3) e scripts de DM (S5, Pro) validados pelo cliente." },
  ], "grid2r")}
  <div class="commit">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Previsibilidade de entrega, do onboarding ao pitch.</h3>
    <p class="commit-d">Cada prazo, função e KPI deste playbook existe para transformar o plano vendido em presença digital ativa e comercial estruturado.</p>
  </div>
`));

const html = shell({
  title: "Playbook de Funções — Evolução Jurídica · E3 Digital",
  navTitle: "Playbook de Funções · Evolução Jurídica",
  logoUri: LOGO_URI,
  pages: P,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/playbook-evolucao-juridica/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("playbook funções evolução:", outPath, "·", P.length, "páginas");
