// Gera o Playbook de Funções (Evolução Jurídica) em HTML pronto para impressão.
// Mesmo design system do scripts/gen-playbook.mjs (Playbook de Funções da Assessoria).
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
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;

/* ── helpers de componente ───────────────────────────── */
let folio = 0;
const SECTIONS = [];
const NAV = [null, "Visão geral", "Pilares", "Squad", "Account Manager", "Gestor de Projetos", "Web Designer & Design", "Consultor Comercial", "SLA"];
let pageIdx = 0;
const page = (body, opts = {}) => {
  const idx = pageIdx++;
  const label = NAV[idx];
  const id = label ? `s${idx}` : "";
  if (label) SECTIONS.push({ id, label });
  return `<section class="page${opts.cover ? " cover" : ""}"${id ? ` id="${id}"` : ""}${label ? ` data-label="${label}"` : ""}>
  <div class="amb"></div>
  <div class="pbody">${body}</div>
  ${opts.cover ? "" : `<div class="pfoot"><span>PLAYBOOK · EVOLUÇÃO JURÍDICA · <b>E3</b></span><span>${String(++folio).padStart(2, "0")}</span></div>`}
</section>`;
};

const secHead = (num, title, desc) => `<div class="sechead">
  <span class="secnum">${num}</span>
  <div><h2>${title}</h2><p class="lead">${desc}</p></div>
</div><div class="rule"></div>`;

const cardHead = (icon, kicker, title, tag = "") => `<div class="chead">
  <span class="isq">${svg(icon)}</span>
  <div>${kicker ? `<p class="kicker">${kicker}</p>` : ""}<h3>${title}${tag}</h3></div>
</div>`;
const tag = (label, cls) => `<span class="tag ${cls}">${label}</span>`;
const tagBoth = () => tag("EVOLUÇÃO &amp; PRO", "tag-both");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");
const legend = () => `<div class="legend">
  <div class="lg-item">${tagBoth()}<span>a função atua nos planos <b>Evolução</b> e <b>Pro</b></span></div>
  <div class="lg-item">${tagPro()}<span>entrega ou atividade <b>exclusiva</b> do plano Pro</span></div>
</div>`;

const bul = (items) => `<ul class="bul">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const block = (kicker, items) => `<div class="blk"><p class="kicker">${kicker}</p>${bul(items)}</div>`;
const tbl = (head, rows, cls = "") => `<div class="tblw"><table class="tbl ${cls}"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const statRow = (items) => `<div class="stats">${items.map((s) => `<div class="stat"><span class="sv">${s.v}</span><span class="sl">${s.l}</span></div>`).join("")}</div>`;
const feat = (items) => `<div class="feats">${items.map((f) => `<div class="feat"><p class="ft">${f.t}</p><p class="fd">${f.d}</p></div>`).join("")}</div>`;
const callout = (icon, kicker, title, text) => `<div class="callout">
  <span class="isq">${svg(icon)}</span>
  <div><p class="kicker">${kicker}</p><h4>${title}</h4><p class="cd">${text}</p></div>
</div>`;

/* ═════════════ PÁGINAS ═════════════ */
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

/* — 01 VISÃO GERAL — */
P.push(page(`
  <p class="kicker">VISÃO GERAL</p>
  <h2 class="h2">O que é a Evolução Jurídica</h2>
  <p class="body">Este documento oficializa o <b>escopo de entrega</b>, o cronograma operacional, as <b>responsabilidades e os indicadores de cada função</b> e as diretrizes de execução do produto Evolução, nas versões <b>Evolução</b> e <b>Evolução Pro</b>. O escopo foi mapeado com base no alinhamento entre o time Comercial e o time Operacional, garantindo previsibilidade de entrega e qualidade para o cliente.</p>
  <p class="body">A Evolução Jurídica une <b>presença digital</b> (posicionamento, Landing Page e Google Meu Negócio) com <b>capacitação comercial</b> (treinamento e roteiros de vendas) — evoluindo, para quem avança ao plano Pro, para uma frente de <b>aceleração comercial</b> (Social Selling, TikTok e Funil de Indicação).</p>
  ${statRow([
    { v: "30 dias", l: "Duração do plano Evolução" },
    { v: "60 dias", l: "Duração do plano Evolução Pro" },
    { v: "4", l: "Funções da squad" },
    { v: "9", l: "Semanas de cronograma no total" },
  ])}
  ${callout("activity", "COMO LER ESTE PLAYBOOK", "Do onboarding ao pitch de renovação", "O documento está organizado em três blocos: os <b>pilares de sucesso</b> (o que entregamos), a <b>rotina e as funções da squad</b> (quem faz, quando e com quais metas) e o <b>Acordo de Nível de Serviço</b> (os compromissos de prazo entre E3 e cliente).")}
  <p class="kicker" style="margin-bottom:10px">LEGENDA · EVOLUÇÃO OU PRO</p>
  ${legend()}
  <div class="quote">
    <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
    <p>Não existe cliente do Account, do Gestor de Projetos ou do Design. <b>O cliente é da E3</b> e está sob a responsabilidade do squad como um todo.</p>
    <p>A partir disso, cada função assume <b>100% de responsabilidade</b> pelas próprias entregas, cumprindo rigorosamente prazos e metas — sem terceirizar problemas para o colega nem para o próprio cliente.</p>
  </div>
`));

/* — 01 PILARES — */
P.push(page(`
  ${secHead("01", "Pilares de sucesso no projeto", "A entrega do produto está dividida em três pilares principais de atuação, do posicionamento à aceleração comercial.")}
  <div class="card">
    ${cardHead("target", "PILAR 01", "Presença Digital &amp; Posicionamento")}
    ${feat([
      { t: "Diagnóstico de ICP", d: "Mapeamento do perfil de cliente ideal e validação do posicionamento atual da marca." },
      { t: "Landing Page Otimizada", d: "Página de conversão publicada, pronta para captar leads qualificados." },
      { t: "Google Meu Negócio", d: "Otimização completa: ficha, fotos, horário de atendimento e links funcionais." },
      { t: "Vitrine no Instagram", d: "Grade de 9 posts como vitrine de autoridade do escritório." },
    ])}
  </div>
  <div class="card">
    ${cardHead("pen", "PILAR 02", "Capacitação Comercial")}
    ${feat([
      { t: "Roteiros Estratégicos de Conteúdo", d: "Base para sustentar a produção de conteúdo e a autoridade do escritório." },
      { t: "Treinamento Comercial", d: "Capacitação do time do cliente para converter os leads gerados em contratos." },
    ])}
  </div>
  <div class="card">
    ${cardHead("check", "PILAR 03", "Aceleração Comercial " + tagPro())}
    ${feat([
      { t: "Social Selling &amp; Scripts de DM", d: "Prospecção ativa estruturada para grandes contas via redes sociais." },
      { t: "Funil de Indicação", d: "Ativação e acompanhamento da base de clientes como canal de novos negócios." },
      { t: "Live Estratégica no TikTok", d: "Planejamento, roteirização e lançamento de uma live de alcance orgânico." },
    ])}
  </div>
`));

/* — 02 ROTINA E FUNÇÕES: entregáveis sequenciais — */
P.push(page(`
  ${secHead("02", "Rotina e funções da squad", "Para garantir agilidade operacional, as entregas são distribuídas de forma sequencial ao longo das semanas de projeto — 4 no plano Evolução, mais 4 no Pro.")}
  ${tbl(["Função", "Entregáveis operacionais da equipe"], [
    ["Account Manager", "Kick-off e reunião de onboarding: análise do Instagram, definição do ICP e redesenho do posicionamento. Reunião de posicionamento (persona, dores, objeções). Apresentação de resultados e pitch de renovação/upgrade na Semana 4."],
    ["Gestor de Projetos", "Suporte contínuo nos grupos, solicitação à equipe criativa, atualização do ClickUp e auxílio ao Account no que for solicitado. Desenvolvimento de copies e briefings de arte. Otimização completa do Google Meu Negócio."],
    ["Web Designer &amp; Design", "Desenvolvimento e publicação da Landing Page. Criação da grade de 9 posts no Instagram como vitrine de autoridade."],
    ["Consultor Comercial", "Condução do treinamento comercial na Semana 3. No plano <b>Pro</b>: setup de Social Selling, scripts de DM e ativação do Funil de Indicação."],
  ])}
`));

/* — ACCOUNT MANAGER — */
P.push(page(`
  <div class="card">
    ${cardHead("users", "", "Account Manager", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> liderança do relacionamento com o cliente, alinhamento estratégico e condução dos ritos de reunião. Conduz o cliente do kick-off ao pitch de renovação, garantindo que cada entrega da squad chegue no prazo certo.</p></div>
    <div class="grid2">
      ${block("KICK-OFF &amp; ONBOARDING", ["Enviar vídeo e formulário comercial e analisar o Instagram do cliente na Semana 0.", "Conduzir a reunião de onboarding: definir o ICP e redesenhar o posicionamento."])}
      ${block("REUNIÃO DE POSICIONAMENTO", ["Fechar posicionamento, persona, dores e objeções do cliente na Semana 1.", "Alinhar a metodologia de roteiros de conteúdo com o time de criação."])}
      ${block("RESULTADOS &amp; PITCH", ["Apresentar os resultados do ciclo na Semana 4 (ou 8, no Pro).", "Conduzir o pitch de renovação ou upgrade para o plano Pro."])}
      ${block("LIVE ESTRATÉGICA TIKTOK " + tagPro(), ["Planejar, roteirizar e lançar a primeira live estratégica no TikTok do cliente.", "Orientar o cliente e acompanhar o lançamento."])}
    </div>
  </div>
  <h3 class="h3">Rotina · Account Manager</h3>
  ${tbl(["Quando", "O quê"], [
    ["Semana 0 · Kick-off &amp; Onboarding", "Envio do vídeo e formulário comercial, análise do Instagram e condução da reunião de onboarding."],
    ["Semana 1 · Posicionamento", "Reunião de posicionamento: persona, dores, objeções e metodologia de roteiros."],
    ["Semana 4 · Resultados &amp; Pitch", "Apresentação de resultados e pitch de renovação ou upgrade."],
    ["Semana 6 · Pro · Live TikTok", "Planejamento, roteirização e lançamento da live estratégica."],
    ["Semana 8 · Pro · Resultados &amp; Escala", "Revisão das métricas de 60 dias e novo pitch de renovação, com o Consultor Comercial."],
  ])}
  <h3 class="h3">Principais KPIs · Account Manager</h3>
  ${tbl(["Indicador", "Meta"], [
    ["NPS do cliente", "Nota coletada ao final da jornada de 30 e 60 dias — foco em manter promotores."],
    ["Taxa de conversão do Pitch", "% de renovação de contratos ou upgrade do plano Evolução para o Pro."],
    ["SLA de entrega da LP (Semana 2)", "Publicação do link no prazo, junto ao Gestor de Projetos e Web Design."],
  ])}
`));

/* — GESTOR DE PROJETOS — */
P.push(page(`
  <div class="card">
    ${cardHead("clipboard", "", "Gestor de Projetos", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> suporte contínuo, organização e prazo. Garante que cada entrega da squad — do Google Meu Negócio às DMs de prospecção — saia no prazo combinado com o cliente.</p></div>
    <div class="grid2">
      ${block("SUPORTE &amp; COMUNICAÇÃO", ["Suporte contínuo nos grupos do cliente.", "Auxílio ao Account no que for solicitado."])}
      ${block("BRIEFINGS &amp; CRIAÇÃO", ["Desenvolver copies e ideias para as artes gráficas com base na reunião de posicionamento.", "Solicitação e acompanhamento da equipe criativa."])}
      ${block("GOOGLE MEU NEGÓCIO", ["Otimização completa: ficha atualizada, fotos, horário de atendimento e links funcionais."])}
      ${block("ACOMPANHAMENTO " + tagPro(), ["Garantir a implementação do Social Selling e cobrar as entregas na Semana 5.", "Auditoria operacional e acompanhamento do Funil de Indicação na Semana 7."])}
    </div>
  </div>
  <h3 class="h3">Rotina · Gestor de Projetos</h3>
  ${tbl(["Quando", "O quê"], [
    ["Semana 1 · Sem reunião síncrona", "Desenvolvimento de copies e briefings de arte com base na reunião de posicionamento."],
    ["Semana 2 · Sem reunião síncrona", "Otimização completa do Google Meu Negócio."],
    ["Semana 5 · Pro · Acompanhamento da implantação", "Garantir a implementação do Social Selling, acompanhar a execução do cliente e cobrar as entregas."],
    ["Semana 7 · Pro · Sem reunião síncrona", "Auditoria operacional e acompanhamento da ativação do Funil de Indicação, com ajustes de abordagem."],
  ])}
  <h3 class="h3">Principais KPIs · Gestor de Projetos</h3>
  ${tbl(["Indicador", "Meta"], [
    ["SLA de entrega da LP (Semana 2)", "Publicação do link no prazo estipulado — 100% de conformidade."],
    ["Otimização do Google Meu Negócio", "Setup completo: ficha atualizada, fotos, horário de atendimento e links funcionais."],
    ["Frequência de conteúdo / scripts de DM", "Entrega dos roteiros (S3) e das DMs (S5) validados pelo cliente."],
  ])}
`));

/* — WEB DESIGNER & DESIGN — */
P.push(page(`
  <div class="card">
    ${cardHead("pen", "", "Web Designer &amp; Design", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> os ativos visuais do projeto. Responsável pela Landing Page do cliente e pela vitrine de autoridade no Instagram — o que o lead vê antes de fechar contrato.</p></div>
    <div class="grid2">
      ${block("LANDING PAGE", ["Desenvolvimento e publicação da Landing Page, com base no posicionamento definido pelo Account.", "Garantir a publicação dentro do prazo da Semana 2."])}
      ${block("VITRINE INSTAGRAM (CRIAÇÃO)", ["Produção da grade de 9 posts no Instagram como vitrine de autoridade.", "Entrega geral em até 7 dias, a partir do briefing da Semana 3."])}
      ${block("ARTES GRÁFICAS", ["Desenvolvimento das artes com base nas copies e ideias do Gestor de Projetos.", "Alinhamento visual com o posicionamento fechado na Semana 1."])}
    </div>
  </div>
  <h3 class="h3">Rotina · Web Designer &amp; Design</h3>
  ${tbl(["Quando", "O quê"], [
    ["Semana 2 · Sem reunião síncrona", "Desenvolvimento e publicação da Landing Page (LP)."],
    ["Semana 3 · Sem reunião síncrona", "Grade de 9 posts no Instagram como vitrine, com 7 dias para entrega geral."],
  ])}
  <h3 class="h3">Principais KPIs · Web Designer &amp; Design</h3>
  ${tbl(["Indicador", "Meta"], [
    ["SLA de entrega da LP (Semana 2)", "Publicação do link no prazo estipulado — 100% de conformidade."],
    ["Frequência de conteúdo", "Entrega dos posts da vitrine (Semana 3) validados pelo cliente."],
  ])}
`));

/* — CONSULTOR COMERCIAL (exclusivo Pro nas atividades avançadas) — */
P.push(page(`
  <div class="card">
    ${cardHead("handshake", "", "Consultor Comercial", tagPro())}
    <div class="quote inline"><p><b>Foco:</b> capacitação e aceleração comercial do escritório. Conduz o treinamento comercial de todos os clientes e, no plano Pro, estrutura toda a operação de prospecção ativa.</p></div>
    <div class="grid2">
      ${block("TREINAMENTO COMERCIAL", ["Reunião comercial na Semana 3: treinamento comercial do time do cliente.", "Foco em capacitação para converter os leads gerados em contratos."])}
      ${block("SETUP DE SOCIAL SELLING " + tagPro(), ["Setup completo da operação de Social Selling na Semana 5.", "Redação dos scripts de DM personalizados."])}
      ${block("FUNIL DE INDICAÇÃO " + tagPro(), ["Ativação do Funil de Indicação Comercial.", "Acompanhamento da ativação até a Semana 7, com ajustes de abordagem."])}
      ${block("RESULTADOS &amp; ESCALA " + tagPro(), ["Revisão das métricas consolidadas de 60 dias, junto ao Account, na Semana 8.", "Desenho do plano de escala de vendas e novo pitch de renovação/extensão."])}
    </div>
  </div>
  <h3 class="h3">Valor entregue ao projeto</h3>
  ${tbl(["Indicador", "Meta"], [
    ["Taxa de conversão comercial", "Aproveitamento dos leads gerados após o Treinamento Comercial (S3)."],
    ["Leads via prospecção ativa", "Volume de respostas qualificadas geradas a partir do Social Selling/DMs (S5)."],
    ["Novas vendas via Funil de Indicação", "Clientes gerados pela base de indicações ativada entre S5 e S7."],
  ])}
`));

/* — 03 SLA — */
P.push(page(`
  ${secHead("03", "Acordo de Nível de Serviço (SLA)", "Para o sucesso e a velocidade da Evolução Jurídica, as seguintes diretrizes devem ser seguidas por E3 e cliente.")}
  <div class="rules">
    <div class="rule-item"><span class="nbadge">1</span><div><p class="rt">SLA de Entrega da Landing Page</p><p class="rd">A equipe publica o link da LP no prazo estipulado da Semana 2 — <b>100% de conformidade</b>.</p></div></div>
    <div class="rule-item"><span class="nbadge">2</span><div><p class="rt">Prazo da Vitrine no Instagram</p><p class="rd">A grade de 9 posts é entregue em <b>até 7 dias</b> após o briefing da Semana 3.</p></div></div>
    <div class="rule-item"><span class="nbadge">3</span><div><p class="rt">Coleta de Acessos do Cliente</p><p class="rd">O cliente se compromete a enviar os acessos técnicos (domínio, hospedagem, Google) em <b>até 48 horas</b> após o onboarding.</p></div></div>
    <div class="rule-item"><span class="nbadge">4</span><div><p class="rt">Validação de Materiais</p><p class="rd">Roteiros (Semana 3) e scripts de DM (Semana 5, Pro) precisam ser validados pelo cliente para manter o cronograma.</p></div></div>
  </div>
  <div class="commit">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Previsibilidade de entrega, do onboarding ao pitch.</h3>
    <p class="commit-d">Cada prazo, função e KPI deste playbook existe para transformar o plano vendido em presença digital ativa e comercial estruturado — com clareza de função e disciplina de cronograma.</p>
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
.kicker{font-family:var(--s);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--o);font-weight:700;margin-bottom:8px}
.h2{font-family:var(--d);font-weight:800;font-size:28px;letter-spacing:-.01em;margin-bottom:16px}
.h3{font-family:var(--d);font-weight:800;font-size:17px;letter-spacing:-.01em;margin:16px 0 8px}
.body{font-size:14px;line-height:1.6;color:rgba(255,255,255,.72);margin-bottom:14px}
.body b{color:#fff;font-weight:700}
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
.sv{font-family:var(--d);font-weight:800;font-size:24px;color:var(--o)}
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
.quote.inline{margin:12px 0 14px;background:rgba(255,255,255,.02);border-left:2px solid var(--o)}
.quote.inline p{color:rgba(255,255,255,.75);margin:0}
.quote.inline b{color:var(--o)}
/* sechead */
.sechead{display:flex;align-items:flex-start;gap:18px;margin-bottom:14px}
.secnum{font-family:var(--d);font-weight:800;font-size:48px;line-height:.8;color:transparent;-webkit-text-stroke:1.5px rgba(255,95,31,.6)}
.sechead h2{font-family:var(--d);font-weight:800;font-size:24px;letter-spacing:-.01em;margin-bottom:6px}
.sechead .lead{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.5}
.rule{height:1px;background:rgba(255,255,255,.1);margin-bottom:20px}
/* cards */
.card{border:1px solid rgba(255,255,255,.1);border-radius:18px;background:rgba(255,255,255,.02);padding:18px 22px;margin-bottom:14px}
.chead{display:flex;align-items:center;gap:14px;margin-bottom:10px}
.chead h3{font-family:var(--d);font-weight:800;font-size:18px;display:flex;align-items:center;gap:10px}
.chead .kicker{margin-bottom:2px}
/* tags Evolução/Pro */
.tag{display:inline-block;font-family:var(--s);font-size:9.5px;font-weight:800;letter-spacing:.08em;padding:4px 10px;border-radius:999px;vertical-align:middle}
.tag-both{color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06)}
.tag-pro{color:var(--o);border:1px solid rgba(255,95,31,.5);background:rgba(255,95,31,.1)}
.blk .kicker .tag{margin-left:4px;transform:translateY(-1px)}
.legend{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.lg-item{display:flex;align-items:center;gap:10px;font-size:11.5px;color:rgba(255,255,255,.6)}
.lg-item b{color:#fff}
/* feats (pilares) */
.feats{display:grid;grid-template-columns:repeat(2,1fr);gap:14px 20px}
.feat{position:relative;padding-left:14px}
.feat::before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:999px;background:var(--o)}
.ft{font-family:var(--s);font-weight:700;font-size:13px;margin-bottom:3px}
.fd{font-size:11.5px;color:rgba(255,255,255,.5);line-height:1.45}
/* grid2 / blk / bul (funções) */
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:12px 26px}
.blk .kicker{font-size:9.5px;letter-spacing:.1em;margin-bottom:5px}
.bul{list-style:none}
.bul li{position:relative;padding-left:14px;font-size:11.5px;line-height:1.42;color:rgba(255,255,255,.72);margin-bottom:4px}
.bul li::before{content:"";position:absolute;left:0;top:6px;width:5px;height:5px;border-radius:999px;background:var(--o)}
.bul li b{color:#fff}
/* tabelas */
.tbl{width:100%;border-collapse:collapse;font-size:11.5px;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden}
.tbl th{background:linear-gradient(90deg,rgba(255,95,31,.16),rgba(255,51,0,.05));color:var(--o);text-align:left;padding:8px 16px;font-family:var(--d);font-weight:700;font-size:11px;letter-spacing:.02em}
.tbl td{padding:8px 16px;border-top:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.7);vertical-align:top;line-height:1.4}
.tbl td.k{color:#fff;font-weight:700;white-space:nowrap}
.tbl td b{color:var(--o)}
/* SLA rules */
.rules{display:flex;flex-direction:column;gap:14px;margin-bottom:26px}
.rule-item{display:flex;gap:16px;align-items:flex-start;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px 20px;background:rgba(255,255,255,.02)}
.nbadge{flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2));font-family:var(--d);font-weight:800;font-size:13px;color:#fff}
.rt{font-family:var(--s);font-weight:700;font-size:14px;margin-bottom:4px}
.rd{font-size:12px;line-height:1.5;color:rgba(255,255,255,.6)}
.rd b{color:var(--o)}
.commit{border:1px solid rgba(255,95,31,.35);border-radius:18px;padding:32px 40px;text-align:center}
.commit-pill{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;color:var(--o);border:1px solid rgba(255,95,31,.5);border-radius:999px;padding:6px 16px;margin-bottom:16px}
.commit-t{font-family:var(--d);font-weight:800;font-size:22px;letter-spacing:-.01em;margin-bottom:12px}
.commit-d{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.55;max-width:56ch;margin:0 auto}
`;

const html = shell({
  title: "Playbook de Funções — Evolução Jurídica · E3 Digital",
  navTitle: "Playbook de Funções · Evolução Jurídica",
  logoUri: LOGO_URI,
  style: STYLE,
  pages: P,
  sections: SECTIONS,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/playbook-evolucao-juridica/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("playbook funções evolução:", outPath, "·", P.length, "páginas");
