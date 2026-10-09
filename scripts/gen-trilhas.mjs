// Gera as Trilhas de Desenvolvimento por função, em slides 16:9 (mesmo kit dos playbooks).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow, feat,
  makeCallout, makeCardHead, tag, block, rules, split2, notabar, link, chips,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;
const distRoot = fileURLToPath(new URL("../dist", import.meta.url));
const pdfSrcDir = fileURLToPath(new URL("../assets/pdf", import.meta.url));

const ic = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  funnel: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const cardHead = makeCardHead(svg);
const semanaTag = (n) => tag(`SEMANA ${n}`, "tag-pro");
const entregavel = (txt) => notabar("ENTREGÁVEL", txt);

/* ─────────────── links citados no material ─────────────── */
const L = {
  novaEraDrive: "https://drive.google.com/file/d/1KIWeLtanvMrZFhpX-XH-nXDH7PkPWXU2/view",
  novaEraYoutube: "https://www.youtube.com/live/Q44vOhYZCiU",
  agenciaIA: "https://drive.google.com/file/d/1o2LpH3wXxpcXEAaU7amQlbye3WiItgkX/view",
  hubspot: "https://www.coursera.org/partners/hubspot-academy",
  onboardingAmazon: "https://www.amazon.com.br/Onboarding-orquestrado-metodologia-bem-sucedidos-lucrativos/dp/6559282716",
  onboardingPdf: "https://drive.google.com/file/d/1Qg_qOtBAnek-JtunSYSQXCXO16Z4bVe8/view?usp=sharing",
  csAmazon: "https://www.amazon.com.br/Customer-Success-empresas-inovadoras-descobriram/dp/8551302795",
  csPdf: "https://drive.google.com/file/d/1OTbFSwUUDE5moCS9w_bYzquqGK_IXUpo/view?usp=drive_link",
  lui: "https://www.instagram.com/cs.by.lui/?hl=pt",
  diego: "https://www.instagram.com/o.diegoazevedo/",
  fernando: "https://www.instagram.com/fernandomiranda777/?hl=pt",
  joao: "https://www.instagram.com/joaopedro/?hl=pt",
  alfredo: "https://www.instagram.com/alfredosoares/",
};
const CS_ACADEMY = [
  "https://youtu.be/by2lIEzL42I?si=x3g0gXwH3qcuxbwr",
  "https://youtu.be/hDcmysoMLv0?si=YkH8nuURItP_1845",
  "https://youtu.be/R1iJPmghr1I?si=GhDzxcQ8MwmLDJak",
  "https://youtu.be/pOzRcVh5Yss?si=Y1CfYr5oTcr7w2xJ",
  "https://youtu.be/2s4H7JwhijQ?si=16M-p9hZPlGQ0_5Y",
  "https://youtu.be/5M0lMNhPXbQ?si=jxkutPGYTVLaGGJF",
  "https://youtu.be/QK5uF4-uu3o?si=DgyObVuOghB-Yxvs",
  "https://youtu.be/9NVExAHsQo0?si=ved3ZqKlV5_f5NPi",
  "https://youtu.be/G5_UGkaHiaA?si=BCJ-Jqfgm8qwTUgp",
  "https://youtu.be/snLCLMSJCq0?si=OAiEHpsUx0VvFJxM",
  "https://youtu.be/R2YFfCYvXCk?si=9WKsPqWglXhJD4nR",
];

/* ══════════════════════ TRILHA — ACCOUNT ══════════════════════ */
function buildAccount() {
  const NAV = [
    null, "Visão da função", "Como funciona", "Base E3", "Gestão empresarial",
    "Mês 01", "Semanas 01–02", "Semanas 03–04", "Checkpoint 30 dias",
    "Mês 02", "Semanas 05–06", "Semanas 07–08", "Checkpoint 60 dias",
    "Mês 03", "Semanas 09–10", "Semanas 11–12", "Certificação 90 dias",
    "Livros", "Cursos & podcasts", "Referências", "Rotina semanal", "Critério final",
  ];
  const { page } = makePageFactory("TRILHA DE DESENVOLVIMENTO · ACCOUNT", NAV);
  const P = [];

  /* — CAPA — */
  P.push(page(`
    <img class="logo" src="${LOGO_URI}" alt="E3"/>
    <p class="kicker cov-k">TRILHA DE DESENVOLVIMENTO · DOCUMENTO DE FORMAÇÃO</p>
    <h1>Account <span>Manager</span></h1>
    <p class="cov-sub">Formar o gestor da conta: responsável pela experiência do cliente, retenção, percepção de valor, visão de negócio e expansão da carteira.</p>
    <div class="pills">
      <span class="pill">90 DIAS</span><span class="pill">12 SEMANAS</span>
      <span class="pill">2 A 3H POR SEMANA</span><span class="pill">3 CHECKPOINTS</span><span class="pill">CERTIFICAÇÃO INTERNA</span>
    </div>
    <div class="cov-rule"></div>
    <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
  `, { cover: true }));

  /* — VISÃO DA FUNÇÃO — */
  P.push(page(`
    ${split2(`
      <p class="kicker">VISÃO DA FUNÇÃO</p>
      <h2 class="h2">O Account não só atende</h2>
      <p class="body">O papel do Account dentro da E3 não deve ser apenas atender o cliente ou intermediar demandas. Esperamos formar profissionais capazes de assumir a conta de ponta a ponta.</p>
      ${statRow([
        { v: "90", l: "dias de trilha" },
        { v: "12", l: "semanas" },
        { v: "2–3h", l: "por semana" },
      ])}
      ${notabar("EVOLUÇÃO ESPERADA", "Atendimento → Gestão → Retenção → Monetização → <b>Liderança da conta</b>")}
    `, `
      <div class="blk"><p class="kicker">O QUE ESPERAMOS DESENVOLVER</p></div>
      <div class="grid2">
        ${block("CLIENTE", ["Entender o objetivo do cliente.", "Gerenciar expectativas.", "Gerar percepção de valor."])}
        ${block("RISCO", ["Identificar riscos antes que virem problemas.", "Reduzir churn.", "Conduzir reuniões com segurança."])}
        ${block("NEGÓCIO", ["Conectar marketing, comercial e resultado.", "Identificar oportunidades de monetização."])}
        ${block("POSTURA", ["Autonomia.", "Organização.", "Protagonismo."])}
      </div>
    `)}
  `));

  /* — COMO FUNCIONA A TRILHA — */
  P.push(page(`
    ${secHead("01", "Como funciona a trilha", "12 semanas, de 2 a 3 horas semanais de desenvolvimento. O conteúdo não se conclui assistindo — se conclui aplicando.")}
    ${split2(`
      <h3 class="h3">A carga se divide entre</h3>
      ${feat([
        { t: "Cursos e treinamentos", d: "Conteúdo técnico interno e externo." },
        { t: "Livros", d: "Leitura programada do livro do mês." },
        { t: "Podcasts", d: "1 episódio por semana." },
        { t: "Referências da área", d: "Conteúdo de quem já faz." },
        { t: "Aplicações práticas", d: "Dentro da operação, com cliente real." },
        { t: "Feedback do líder", d: "Fecha cada ciclo de aprendizado." },
      ])}
    `, `
      ${callout("activity", "A METODOLOGIA", "Aprender → Aplicar → Apresentar → Receber feedback", "O colaborador não conclui uma etapa apenas por assistir ao conteúdo. <b>Cada etapa deve gerar uma aplicação prática dentro da operação.</b>")}
      <div class="quote">
        <p class="qk">O QUE MUDA NO MÊS 02</p>
        <p>A pergunta deixa de ser <b>“o cliente pediu alguma coisa?”</b></p>
        <p>e passa a ser <b>“o que precisa acontecer para esse cliente continuar percebendo valor?”</b></p>
      </div>
    `)}
  `));

  /* — BASE OBRIGATÓRIA E3 — */
  P.push(page(`
    ${secHead("02", "Base obrigatória E3", "Todos os Accounts devem concluir estes conteúdos internos antes de avançar.")}
    <div class="pilares3">
      <div class="card">
        ${cardHead("award", "BASE 01", "Cultura E3")}
        ${feat([
          { t: "História da empresa", d: "De onde viemos." },
          { t: "Posicionamento", d: "Onde a E3 joga." },
          { t: "Cultura e valores", d: "Como agimos." },
          { t: "Visão de futuro", d: "Para onde vamos." },
          { t: "Comportamentos esperados", d: "O que é inegociável." },
        ])}
      </div>
      <div class="card">
        ${cardHead("target", "BASE 02", "Produtos E3")}
        ${feat([
          { t: "Produtos e serviços", d: "O que vendemos." },
          { t: "Escopo de cada produto", d: "E os limites de cada um." },
          { t: "Perfil de cliente", d: "Para quem serve." },
          { t: "Jornada de entrega", d: "Como é executado." },
          { t: "Possibilidades de expansão", d: "Onde há espaço para crescer." },
        ])}
      </div>
      <div class="card">
        ${cardHead("users", "BASE 03", "Processos")}
        ${feat([
          { t: "Treinamento de processos E3", d: "Estrutura da operação." },
          { t: "Responsabilidades por função", d: "Fluxo Account → GP → GT." },
          { t: "Uso do Hops", d: "Registro e acompanhamento de demandas." },
          { t: "SLA", d: "Prazos de resposta e entrega." },
          { t: "Jornada do Herói e PDCA", d: "Os dois métodos da casa." },
        ])}
      </div>
    </div>
  `));

  /* — GESTÃO EMPRESARIAL — */
  P.push(page(`
    ${secHead("03", "Gestão empresarial", "Treinamento interno para que o Account consiga conversar com o cliente sobre negócio, e não somente sobre entregas.")}
    ${split2(`
      <h3 class="h3">Conceitos a dominar</h3>
      <div class="grid2">
        ${block("RECEITA", ["Receita.", "Margem.", "Crescimento."])}
        ${block("CLIENTE", ["Aquisição.", "Retenção.", "Churn."])}
        ${block("INDICADORES", ["NRR.", "LTV.", "CAC."])}
        ${block("ÁREAS", ["Estrutura comercial.", "Operação.", "Marketing."])}
      </div>
    `, `
      <h3 class="h3">Conteúdos</h3>
      ${rules([
        { t: "A nova era do nosso mercado", d: `Início aos 12:00 min. ${chips([{ href: L.novaEraDrive, label: "Drive" }, { href: L.novaEraYoutube, label: "YouTube" }])}` },
        { t: "Agência com IA", d: `Material completo. ${chips([{ href: L.agenciaIA, label: "Drive" }])}` },
      ])}
      ${callout("activity", "O OBJETIVO", "Falar de negócio, não de entrega", "O Account precisa entender o que o cliente fatura, quanto investe e onde está o gargalo — para então falar de campanha.")}
    `)}
  `));

  /* — MÊS 01 — */
  P.push(page(`
    ${secHead("04", "Mês 01 · Fundamentos, atendimento e Customer Success", "Entender a E3, a função de Account, a jornada do cliente e os fundamentos de Customer Success.")}
    ${callout("target", "RESULTADO DO MÊS", "Acompanhar uma carteira com supervisão", "Ao final do primeiro mês, o profissional deve conseguir acompanhar uma carteira e conduzir interações básicas com supervisão.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["01", "E3, produtos e papel do Account", "Mapa da jornada de 1 cliente"],
      ["02", "Fundamentos de Customer Success", "Cliente → Objetivo → Sucesso esperado → Como a E3 contribui"],
      ["03", "Onboarding", "Checklist ideal de onboarding do cliente"],
      ["04", "Comunicação e atendimento", "Ata da reunião com decisões, responsáveis, prazos e próximos passos"],
    ])}
  `));

  /* — SEMANAS 01 e 02 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("users", "", "E3, produtos e papel do Account", semanaTag("01"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Cultura E3 e produtos", d: "Jornada do cliente e estrutura da operação." },
          { t: "Responsabilidades do Account", d: "Diferença entre Account, GP e demais funções." },
          { t: "Hops e processos internos", d: "Onde tudo é registrado." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Escolher um cliente real e mapear: produto contratado, objetivo, escopo, momento atual, principais entregas, responsáveis e próximos passos.</p>
      </div>
      ${entregavel("Mapa da jornada de 1 cliente.")}
    `, `
      <div class="card">
        ${cardHead("target", "", "Fundamentos de Customer Success", semanaTag("02"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "O que é Customer Success", d: "Diferença entre atendimento, suporte, CS e Account Management." },
          { t: "Sucesso do cliente", d: "Customer Centricity e resultado esperado." },
          { t: "Valor percebido", d: "O que o cliente enxerga como entrega." },
        ])}
        <div class="blk"><p class="kicker">CS ACADEMY · 11 VÍDEOS</p></div>
        ${chips(CS_ACADEMY.map((href, i) => ({ href, label: String(i + 1), num: true })))}
        <div class="blk" style="margin-top:9px"><p class="kicker">HUBSPOT ACADEMY · GRATUITO</p></div>
        <p class="body">Inbound, jornada do comprador, Service e experiência do cliente. ${chips([{ href: L.hubspot, label: "Acessar curso" }])}</p>
      </div>
      ${entregavel("Documento: Cliente → Objetivo → Sucesso esperado → Como a E3 contribui.")}
    `)}
  `));

  /* — SEMANAS 03 e 04 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("book", "", "Onboarding", semanaTag("03"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Kickoff e primeira impressão", d: "Alinhamento de expectativa e definição de objetivos." },
          { t: "Passagem de bastão", d: "Responsabilidades e próximos passos." },
          { t: "Comunicação", d: "O tom dos primeiros dias." },
        ])}
        <div class="blk"><p class="kicker">LIVRO OBRIGATÓRIO</p></div>
        <p class="body"><b>Onboarding Orquestrado</b> — Donna Weber. ${chips([{ href: L.onboardingAmazon, label: "Livro físico" }, { href: L.onboardingPdf, label: "PDF" }])}</p>
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Acompanhar um onboarding real e identificar o que foi bem feito, onde houve ruído e o que poderia melhorar.</p>
      </div>
      ${entregavel("Checklist ideal de onboarding do cliente.")}
    `, `
      <div class="card">
        ${cardHead("users", "", "Comunicação e atendimento", semanaTag("04"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Comunicação profissional", d: "Clareza, objetividade e postura." },
          { t: "Escuta ativa e gestão de grupos", d: "Follow-up e registro de acordos." },
          { t: "Comunicação proativa", d: "Avisar antes de ser cobrado." },
        ])}
        <div class="blk"><p class="kicker">TREINAMENTO INTERNO</p></div>
        <p class="body">Padrão de Atendimento E3.</p>
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Conduzir uma reunião de acompanhamento com participação do líder.</p>
      </div>
      ${entregavel("Ata com decisões, responsáveis, prazos e próximos passos.")}
    `)}
  `));

  /* — CHECKPOINT 30 DIAS — */
  P.push(page(`
    ${secHead("05", "Checkpoint · 30 dias", "Avaliação de 0 a 10 em cada dimensão, conduzida pelo líder.")}
    ${split2(`
      <h3 class="h3">Avaliar de 0 a 10</h3>
      <div class="grid2">
        ${block("CONHECIMENTO", ["Conhecimento da E3.", "Conhecimento dos produtos.", "Customer Success.", "Uso das ferramentas."])}
        ${block("COMPORTAMENTO", ["Comunicação.", "Organização.", "Postura.", "Capacidade de aprendizado."])}
      </div>
    `, `
      <h3 class="h3">Resultado esperado</h3>
      ${feat([
        { t: "Entende o funcionamento da E3", d: "E o papel do Account dentro dela." },
        { t: "Conhece os clientes", d: "Da própria carteira." },
        { t: "Participa das reuniões", d: "Com segurança básica." },
        { t: "Registra corretamente", d: "Informações e acordos." },
        { t: "Executa com acompanhamento", d: "Ainda com supervisão." },
      ])}
    `)}
  `));

  /* — MÊS 02 — */
  P.push(page(`
    ${secHead("06", "Mês 02 · Gestão de carteira, retenção e experiência", "Deixar de apenas reagir às demandas e começar a gerenciar proativamente a carteira.")}
    ${callout("target", "A VIRADA DO MÊS", "De reativo para proativo", "A pergunta deixa de ser “o cliente pediu alguma coisa?” e passa a ser <b>“o que precisa acontecer para esse cliente continuar percebendo valor?”</b>")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["05", "Gestão de carteira", "Mapa de saúde da carteira"],
      ["06", "Churn e cliente em risco", "Plano de recuperação de cliente"],
      ["07", "Gestão de expectativas e conflitos", "Apresentação do caso no Comitê de Accounts"],
      ["08", "Experiência e percepção de valor", "Mapa de percepção de valor da conta"],
    ])}
  `));

  /* — SEMANAS 05 e 06 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("chart", "", "Gestão de carteira", semanaTag("05"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Organização e priorização", d: "Como olhar a carteira inteira." },
          { t: "Classificação dos clientes", d: "Saudáveis, em atenção, em risco e com oportunidade." },
          { t: "Health Score", d: "O termômetro de cada conta." },
        ])}
        <div class="blk"><p class="kicker">LIVRO OBRIGATÓRIO</p></div>
        <p class="body"><b>Customer Success</b> — Mehta, Steinman e Murphy. Retenção, churn, receita recorrente, expansão e gestão proativa. ${chips([{ href: L.csAmazon, label: "Livro físico" }, { href: L.csPdf, label: "PDF" }])}</p>
      </div>
      ${entregavel("Mapa de saúde da carteira.")}
    `, `
      <div class="card">
        ${cardHead("activity", "", "Churn e cliente em risco", semanaTag("06"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "O que gera churn", d: "Sinais de risco, problema declarado e não declarado." },
          { t: "Queda de engajamento", d: "Problemas de resultado e de comunicação." },
          { t: "Quebra de expectativa", d: "O que o cliente esperava e não recebeu." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Selecionar um cliente em risco e responder: qual o problema, a causa, o impacto, o que precisa acontecer, quem é responsável, qual o prazo e como recuperar a percepção de valor.</p>
      </div>
      ${entregavel("Plano de recuperação de cliente.")}
    `)}
  `));

  /* — SEMANAS 07 e 08 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("users", "", "Gestão de expectativas e conflitos", semanaTag("07"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Como alinhar expectativa", d: "E como dizer não." },
          { t: "Cobranças e reclamações", d: "Como receber sem se defender." },
          { t: "Não prometer o que não pode entregar", d: "Comunicação em situações difíceis." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Analisar um caso real: <b>Fato → Causa → Ação → Resultado → Aprendizado.</b></p>
      </div>
      ${entregavel("Apresentação do caso no Comitê de Accounts.")}
    `, `
      <div class="card">
        ${cardHead("award", "", "Experiência e percepção de valor", semanaTag("08"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Customer Experience e NPS", d: "Momentos da verdade." },
          { t: "Comunicação de resultado", d: "Como mostrar o que foi entregue." },
          { t: "Valor percebido", d: "Entregar não basta: precisa ser percebido." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Escolher um cliente e responder: onde geramos valor, o cliente percebe, como comunicamos e que ponto da jornada gera frustração.</p>
      </div>
      ${entregavel("Mapa de percepção de valor da conta.")}
    `)}
  `));

  /* — CHECKPOINT 60 DIAS — */
  P.push(page(`
    ${secHead("07", "Checkpoint · 60 dias", "O Account já deve operar com autonomia sobre a própria carteira.")}
    ${split2(`
      <h3 class="h3">Avaliar</h3>
      <div class="grid2">
        ${block("GESTÃO", ["Gestão da carteira.", "Organização.", "Autonomia."])}
        ${block("RELAÇÃO", ["Comunicação.", "Relacionamento.", "Proatividade."])}
        ${block("ANÁLISE", ["Identificação de riscos.", "Conhecimento do negócio."])}
        ${block("ENTREGA", ["Capacidade de resolução."])}
      </div>
    `, `
      <h3 class="h3">O Account já deve conseguir</h3>
      ${feat([
        { t: "Conduzir reuniões", d: "Com segurança e pauta." },
        { t: "Organizar sua carteira", d: "E identificar clientes em risco." },
        { t: "Criar planos de ação", d: "E resolver problemas." },
        { t: "Gerenciar expectativas", d: "E comunicar resultados." },
        { t: "Trabalhar com autonomia", d: "Sem depender do líder a cada passo." },
      ])}
    `)}
  `));

  /* — MÊS 03 — */
  P.push(page(`
    ${secHead("08", "Mês 03 · Negócio, monetização e Account Management", "Transformar o Account em um verdadeiro gestor da conta. Retenção e crescimento caminham juntos.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["09", "Indicadores e visão de negócio", "Diagnóstico básico de negócio da conta"],
      ["10", "Monetização", "3 oportunidades reais de monetização"],
      ["11", "Reunião estratégica", "Apresentação estratégica da conta"],
      ["12", "Account Management", "Projeto final da conta"],
    ])}
    ${notabar("A LÓGICA DA MONETIZAÇÃO", "Não é “o que consigo vender para esse cliente?”, e sim <b>“qual próximo problema do cliente a E3 pode resolver?”</b>")}
  `));

  /* — SEMANAS 09 e 10 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("chart", "", "Indicadores e visão de negócio", semanaTag("09"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        <div class="grid2">
          ${block("INDICADORES", ["Churn, NRR, LTV e CAC.", "Receita e ticket médio."])}
          ${block("CRESCIMENTO", ["Upsell e cross-sell.", "Retenção e funil."])}
        </div>
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Escolher um cliente e analisar: quanto investe, quanto fatura, qual produto vende, ticket médio, leads, conversão, vendas e gargalos.</p>
      </div>
      ${entregavel("Diagnóstico básico de negócio da conta.")}
    `, `
      <div class="card">
        ${cardHead("target", "", "Monetização", semanaTag("10"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Upsell, cross-sell e expansão", d: "Identificação de necessidades." },
          { t: "Venda consultiva", d: "Diagnóstico antes da oferta." },
          { t: "Timing", d: "A hora certa de propor." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Selecionar três clientes e, para cada um: problema, oportunidade, produto E3 aplicável, argumentação e próximo passo.</p>
      </div>
      ${entregavel("3 oportunidades reais de monetização.")}
    `)}
  `));

  /* — SEMANAS 11 e 12 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("users", "", "Reunião estratégica", semanaTag("11"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Preparação e storytelling", d: "Contar o resultado com dados." },
          { t: "Problemas e soluções", d: "Plano de ação e próximos passos." },
        ])}
        <div class="blk"><p class="kicker">ESTRUTURA DA REUNIÃO</p></div>
        <p class="body">1. Objetivo · 2. Cenário atual · 3. Resultados · 4. Aprendizados · 5. Problemas · 6. Plano de ação · 7. Próximos passos · 8. Oportunidades.</p>
      </div>
      ${entregavel("Apresentação estratégica da conta.")}
    `, `
      <div class="card">
        ${cardHead("award", "", "Account Management", semanaTag("12"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Gestão estratégica e autonomia", d: "Retenção e expansão." },
          { t: "Visão de negócio", d: "Relacionamento e protagonismo." },
          { t: "Liderança da conta", d: "O Account como dono do resultado." },
        ])}
        <div class="blk"><p class="kicker">PROJETO FINAL</p></div>
        <p class="body">Cenário atual → objetivo do cliente → resultados → saúde da conta → riscos → problemas → plano de ação → oportunidades de expansão → plano para os próximos 90 dias.</p>
      </div>
      ${entregavel("Projeto final apresentado ao líder.")}
    `)}
  `));

  /* — CERTIFICAÇÃO 90 DIAS — */
  P.push(page(`
    ${secHead("09", "Certificação interna · 90 dias", "O líder avalia cada dimensão com nota de 0 a 10.")}
    ${rules([
      { t: "Conhecimento técnico", d: "Customer Success, produtos, indicadores e processos." },
      { t: "Execução", d: "Capacidade de transformar decisões em ações." },
      { t: "Comunicação", d: "Clareza com clientes e equipe." },
      { t: "Organização", d: "Carteira, reuniões, registros e prazos." },
      { t: "Autonomia", d: "Trabalhar sem depender constantemente da liderança." },
      { t: "Visão de negócio", d: "Compreender os problemas do cliente." },
      { t: "Retenção", d: "Identificar e agir sobre riscos." },
      { t: "Monetização", d: "Identificar oportunidades." },
      { t: "Protagonismo", d: "Assumir responsabilidade." },
    ], "grid2r")}
  `));

  /* — LIVROS — */
  P.push(page(`
    ${secHead("10", "Livros", "Dois obrigatórios, com mês definido, e três complementares.")}
    ${split2(`
      <h3 class="h3">Obrigatórios</h3>
      ${rules([
        { t: "Onboarding Orquestrado — Donna Weber " + tag("MÊS 01", "tag-pro"), d: `Conduzir os primeiros momentos da jornada e acelerar a percepção de valor. ${chips([{ href: L.onboardingAmazon, label: "Livro físico" }, { href: L.onboardingPdf, label: "PDF" }])}` },
        { t: "Customer Success — Mehta, Steinman e Murphy " + tag("MÊS 02", "tag-pro"), d: `Retenção, churn, expansão, receita recorrente e gestão da carteira. ${chips([{ href: L.csAmazon, label: "Livro físico" }, { href: L.csPdf, label: "PDF" }])}` },
      ])}
    `, `
      <h3 class="h3">Complementares</h3>
      ${rules([
        { t: "Nunca Divida a Diferença — Chris Voss", d: "Negociação, escuta, perguntas e gestão de conflitos." },
        { t: "Como Fazer Amigos e Influenciar Pessoas — Dale Carnegie", d: "Relacionamento, comunicação, influência e empatia." },
        { t: "Receita Previsível — Aaron Ross e Marylou Tyler", d: "Visão comercial, processos, receita e funil." },
      ])}
    `)}
  `));

  /* — CURSOS E PODCASTS — */
  P.push(page(`
    ${secHead("11", "Cursos e podcasts", "Conteúdo contínuo, com registro de aprendizado a cada episódio.")}
    ${split2(`
      <h3 class="h3">Cursos</h3>
      ${rules([
        { t: "CS Academy " + tag("PRIORIDADE ALTA", "tag-pro"), d: `Customer Success, CX, jornada do cliente, gestão de carteira, churn, expansão, dados e liderança. ${chips(CS_ACADEMY.slice(0, 11).map((href, i) => ({ href, label: String(i + 1), num: true })))}` },
        { t: "HubSpot Academy " + tag("GRATUITO", "tag-light"), d: `Inbound, jornada do comprador, Customer Service, vendas, CRM e experiência do cliente. ${chips([{ href: L.hubspot, label: "Acessar curso" }])}` },
      ])}
    `, `
      <h3 class="h3">Podcasts · obrigatórios</h3>
      ${rules([
        { t: "ROI Hunters", d: "1 episódio por semana. Marketing, growth, vendas, gestão, CRM, receita e retenção." },
        { t: "Customer Success by Lui", d: "Alternar com o ROI Hunters. CS, carteira, Health Score, onboarding, churn e CX." },
      ])}
      ${notabar("APÓS CADA EPISÓDIO", "O que aprendi? Como isso se conecta à minha função? Onde consigo aplicar na minha carteira?")}
    `)}
  `));

  /* — REFERÊNCIAS — */
  P.push(page(`
    ${secHead("12", "Referências para modelar", "O objetivo não é copiar a personalidade. É observar como pensam, diagnosticam, se comunicam e tomam decisões.")}
    ${tbl(["Referência", "Tema", "O que observar"], [
      [link(L.lui, "Lui von Holleben"), "Customer Success e gestão de carteira", "Health Score, onboarding, churn, expansão e CS"],
      [link(L.diego, "Diego Azevedo"), "CS, CX e estruturação de operação", "Jornada, desenvolvimento profissional e gestão de clientes"],
      [link(L.fernando, "Fernando Miranda"), "Growth e visão de negócio", "Diagnóstico, marketing, vendas, receita e estratégia"],
      [link(L.joao, "João Pedro Motta"), "Estratégia, marketing e crescimento", "Análise de negócios, growth e tomada de decisão"],
      [link(L.alfredo, "Alfredo Soares"), "Relacionamento, vendas e negócios", "Networking, posicionamento e empreendedorismo"],
    ])}
    ${notabar("COMO USAR", "Clique no nome para abrir o perfil. O objetivo não é copiar a personalidade — é observar como pensam, diagnosticam e decidem.")}
  `));

  /* — ROTINA SEMANAL — */
  P.push(page(`
    ${secHead("13", "Rotina semanal de desenvolvimento", "Toda semana o Account deve cumprir os seis itens abaixo.")}
    ${rules([
      { t: "Conteúdo técnico", d: "Curso, treinamento interno ou aula da trilha." },
      { t: "Livro", d: "Leitura programada do livro do mês." },
      { t: "Podcast", d: "1 episódio de ROI Hunters ou Customer Success by Lui." },
      { t: "Referência", d: "Pelo menos 1 conteúdo de uma pessoa recomendada." },
      { t: "Aplicação", d: "Aplicar algum conceito em uma situação real." },
      { t: "Registro", d: "O que aprendi? Onde isso aparece na rotina? O que vou fazer diferente?" },
    ], "grid2r")}
    ${notabar("ACOMPANHAMENTO", "Para cada conteúdo: tema, prazo, status (não iniciado / em andamento / concluído), aplicação prática, entregável e feedback do líder.")}
  `));

  /* — CRITÉRIO FINAL — */
  P.push(page(`
    ${secHead("14", "Critério final da trilha", "Ao final dos 90 dias, o que o Account precisa conseguir fazer.")}
    <div class="grid3">
      ${block("GESTÃO", ["Gerenciar uma carteira com organização.", "Conduzir reuniões.", "Criar planos de ação.", "Trabalhar com autonomia."])}
      ${block("RISCO", ["Identificar riscos.", "Antecipar problemas.", "Gerenciar expectativas.", "Resolver conflitos."])}
      ${block("NEGÓCIO", ["Interpretar indicadores.", "Entender o negócio do cliente.", "Identificar oportunidades.", "Comunicar resultados."])}
    </div>
    <div class="commit">
      <span class="commit-pill">RESULTADO ESPERADO</span>
      <h3 class="commit-t">Não formar alguém que apenas atende clientes.</h3>
      <p class="commit-d">Formar alguém responsável pelo sucesso, retenção, evolução e crescimento da conta. <b>Account E3 = Relacionamento + Gestão + Retenção + Negócio + Receita.</b></p>
    </div>
  `));

  const html = shell({
    title: "Trilha de Desenvolvimento — Account · E3 Digital",
    navTitle: "Trilha de Desenvolvimento · Account",
    logoUri: LOGO_URI,
    pages: P,
    pdfHref: "./trilha-account.pdf",
    pdfName: "Trilha de Desenvolvimento - Account - E3 Digital.pdf",
  });
  const outDir = join(distRoot, "trilha-account");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  copyFileSync(join(pdfSrcDir, "trilha-account.pdf"), join(outDir, "trilha-account.pdf"));
  console.log("trilha account:", outDir, "·", P.length, "páginas · PDF anexado");
}

/* ══════════════════════ TRILHA — GESTOR DE PROJETOS ══════════════════════ */

/* Links citados. O PDF do GP não traz URLs embutidas: os institucionais apontam
   para o site oficial e, onde não há página canônica verificável (canais e
   podcasts pessoais, livros sem link no material), para a busca da plataforma. */
const LG = {
  pmi: "https://www.pmi.org/kickoff",
  bradesco: "https://www.ev.org.br",
  enap: "https://www.escolavirtual.gov.br",
  sebrae: "https://www.sebrae.com.br",
  sebraeYoutube: "https://www.youtube.com/@sebrae",
  alura: "https://www.youtube.com/@alura",
  conquer: "https://www.youtube.com/@escolaconquer",
  vargasSite: "https://ricardo-vargas.com",
  vargasYoutube: "https://rvarg.as/youtube",
  vargasPodcast: "https://ricardo-vargas.com/podcasts",
  terentim: "https://www.youtube.com/results?search_query=Gino+Terentim",
  roihunters: "https://open.spotify.com/search/ROI%20Hunters",
  checklistLivro: "https://www.amazon.com.br/s?k=Checklist+Atul+Gawande",
  scrumLivro: "https://www.amazon.com.br/s?k=Scrum+Jeff+Sutherland",
  vossLivro: "https://www.amazon.com.br/s?k=Nunca+Divida+a+Diferen%C3%A7a+Chris+Voss",
};

function buildGestorProjetos() {
  const NAV = [
    null, "Visão da função", "Como funciona", "Base E3", "Gestão empresarial",
    "Mês 01", "Semanas 01–02", "Semanas 03–04", "Checkpoint 30 dias",
    "Mês 02", "Semanas 05–06", "Semanas 07–08", "Checkpoint 60 dias",
    "Mês 03", "Semanas 09–10", "Semanas 11–12", "Projeto final",
    "Certificação 90 dias", "Livros", "Cursos gratuitos", "Canais", "Podcasts",
    "Referências", "Rotina semanal", "Critério final",
  ];
  const { page } = makePageFactory("TRILHA DE DESENVOLVIMENTO · GESTOR DE PROJETOS", NAV);
  const P = [];

  /* — CAPA — */
  P.push(page(`
    <img class="logo" src="${LOGO_URI}" alt="E3"/>
    <p class="kicker cov-k">TRILHA DE DESENVOLVIMENTO · DOCUMENTO DE FORMAÇÃO</p>
    <h1>Gestor de <span>Projetos</span></h1>
    <p class="cov-sub">Formar o responsável pela organização, planejamento, acompanhamento e previsibilidade dos projetos — garantindo entregas no prazo, com qualidade e clareza de responsabilidades.</p>
    <div class="pills">
      <span class="pill">90 DIAS</span><span class="pill">12 SEMANAS</span>
      <span class="pill">2 A 3H POR SEMANA</span><span class="pill">3 CHECKPOINTS</span><span class="pill">CERTIFICAÇÃO INTERNA</span>
    </div>
    <div class="cov-rule"></div>
    <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
  `, { cover: true }));

  /* — VISÃO DA FUNÇÃO — */
  P.push(page(`
    ${split2(`
      <p class="kicker">VISÃO DA FUNÇÃO</p>
      <h2 class="h2">O GP não só cobra tarefas</h2>
      <p class="body">O papel do Gestor de Projetos na E3 não deve ser apenas cobrar tarefas, atualizar ferramentas ou perguntar se uma entrega foi concluída.</p>
      ${statRow([
        { v: "90", l: "dias de trilha" },
        { v: "12", l: "semanas" },
        { v: "2–3h", l: "por semana" },
      ])}
      ${notabar("EVOLUÇÃO ESPERADA", "Organização → Planejamento → Execução → Previsibilidade → <b>Melhoria contínua</b>")}
    `, `
      <div class="blk"><p class="kicker">O QUE ESPERAMOS DESENVOLVER</p></div>
      <div class="grid2">
        ${block("PLANEJAR", ["Transformar objetivos em planos de ação.", "Organizar projetos de forma clara e visual.", "Definir atividades, responsáveis e prazos."])}
        ${block("ANTECIPAR", ["Acompanhar a execução de forma proativa.", "Identificar riscos antes que virem problemas.", "Priorizar demandas."])}
        ${block("INTEGRAR", ["Gerenciar dependências entre funções.", "Cobrar com clareza e responsabilidade.", "Facilitar a comunicação entre Account, GT e demais funções."])}
        ${block("EVOLUIR", ["Identificar gargalos e reduzir retrabalho.", "Usar dados para decidir e melhorar processos.", "Autonomia, organização e protagonismo."])}
      </div>
    `)}
  `));

  /* — COMO FUNCIONA A TRILHA — */
  P.push(page(`
    ${secHead("01", "Como funciona a trilha", "12 semanas, de 2 a 3 horas semanais de desenvolvimento. O conteúdo não se conclui assistindo — se conclui aplicando.")}
    ${split2(`
      <h3 class="h3">A carga se divide entre</h3>
      ${feat([
        { t: "Cursos e treinamentos", d: "Conteúdo técnico interno e externo." },
        { t: "Livros", d: "Leitura programada do livro do mês." },
        { t: "Podcasts", d: "Repertório semanal sobre projetos e gestão." },
        { t: "Referências da área", d: "Conteúdo de quem já faz." },
        { t: "Aplicações práticas", d: "Dentro da operação, em projeto real." },
        { t: "Feedback do líder", d: "Fecha cada ciclo de aprendizado." },
      ])}
    `, `
      ${callout("activity", "A METODOLOGIA", "Aprender → Aplicar → Apresentar → Receber feedback", "O colaborador não conclui uma etapa apenas por assistir ao conteúdo. <b>Cada etapa deve gerar uma aplicação prática dentro da operação.</b>")}
      <div class="quote">
        <p class="qk">O QUE MUDA NO MÊS 02</p>
        <p>A pergunta deixa de ser <b>“essa tarefa foi feita?”</b></p>
        <p>e passa a ser <b>“existe alguma coisa que pode impedir essa tarefa ou projeto de ser concluído?”</b></p>
      </div>
    `)}
  `));

  /* — BASE OBRIGATÓRIA E3 — */
  P.push(page(`
    ${secHead("02", "Base obrigatória E3", "Todos os Gestores de Projetos devem concluir estes conteúdos internos.")}
    <div class="pilares3">
      <div class="card">
        ${cardHead("award", "BASE 01", "Cultura E3")}
        ${feat([
          { t: "História da empresa", d: "De onde viemos." },
          { t: "Posicionamento", d: "Onde a E3 joga." },
          { t: "Cultura e valores", d: "Como agimos." },
          { t: "Visão de futuro", d: "Para onde vamos." },
          { t: "Comportamentos esperados", d: "O que é inegociável." },
        ])}
      </div>
      <div class="card">
        ${cardHead("target", "BASE 02", "Produtos E3")}
        ${feat([
          { t: "Produtos e serviços", d: "O que vendemos." },
          { t: "Escopo e seus limites", d: "Até onde vai cada produto." },
          { t: "Perfil de cliente", d: "Para quem serve." },
          { t: "Jornada de entrega", d: "E os principais entregáveis." },
          { t: "Possibilidades de expansão", d: "Só se gerencia o que se entende." },
        ])}
      </div>
      <div class="card">
        ${cardHead("users", "BASE 03", "Processos")}
        ${feat([
          { t: "Estrutura da operação", d: "Responsabilidades por função." },
          { t: "Fluxo Account → GP → GT", d: "Quem entrega o quê, e quando." },
          { t: "Hops e SLA", d: "Registro, acompanhamento e prazos." },
          { t: "Jornada do Herói e PDCA", d: "Os dois métodos da casa." },
          { t: "Onboarding e renovação", d: "Planejamento e rotinas de acompanhamento." },
        ])}
      </div>
    </div>
  `));

  /* — GESTÃO EMPRESARIAL — */
  P.push(page(`
    ${secHead("03", "Gestão empresarial", "Os mesmos treinamentos internos indicados na trilha de Account.")}
    ${split2(`
      <h3 class="h3">Conceitos a dominar</h3>
      <div class="grid2">
        ${block("RECEITA", ["Receita.", "Margem.", "Crescimento."])}
        ${block("CLIENTE", ["Aquisição.", "Retenção.", "Churn."])}
        ${block("INDICADORES", ["NRR.", "LTV.", "CAC."])}
        ${block("ÁREAS", ["Estrutura comercial.", "Operação.", "Marketing."])}
      </div>
    `, `
      <h3 class="h3">Conteúdos</h3>
      ${rules([
        { t: "A nova era do nosso mercado", d: `Início aos 12:00 min. ${chips([{ href: L.novaEraDrive, label: "Drive" }, { href: L.novaEraYoutube, label: "YouTube" }])}` },
        { t: "Agência com IA", d: `Material completo. ${chips([{ href: L.agenciaIA, label: "Drive" }])}` },
      ])}
      ${callout("activity", "O OBJETIVO", "Não basta perguntar se a tarefa foi entregue", "O GP precisa perguntar também: <b>essa entrega está contribuindo para o objetivo do projeto e para o resultado do cliente?</b>")}
    `)}
  `));

  /* — MÊS 01 — */
  P.push(page(`
    ${secHead("04", "Mês 01 · Fundamentos, processos e planejamento", "Entender a E3, os produtos, processos, responsabilidades e os fundamentos da gestão de projetos.")}
    ${callout("target", "RESULTADO DO MÊS", "Organizar e acompanhar um projeto com supervisão", "Ao final do primeiro mês, o profissional deve ser capaz de organizar e acompanhar um projeto com supervisão.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["01", "E3, produtos e papel do GP", "Mapa completo de 1 projeto da operação"],
      ["02", "Fundamentos de gestão de projetos", "Plano básico do projeto"],
      ["03", "Onboarding e kickoff", "Checklist ideal de kickoff e início de projeto"],
      ["04", "Organização e gestão visual", "Projeto estruturado na plataforma"],
    ])}
  `));

  /* — SEMANAS 01 e 02 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("users", "", "E3, produtos e papel do GP", semanaTag("01"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Cultura, produtos e jornada", d: "Estrutura da operação e Jornada do Herói." },
          { t: "Responsabilidades", d: "Do GP, do Account e do GT." },
          { t: "Hops e processos internos", d: `Conteúdo complementar: Sebrae. ${chips([{ href: LG.sebraeYoutube, label: "Canal Sebrae" }])}` },
        ])}
        ${notabar("A PERGUNTA DA SEMANA", "O GP não é responsável apenas pela ferramenta. É responsável por garantir <b>Clareza → Responsável → Prazo → Execução → Acompanhamento</b>.")}
      </div>
      ${entregavel("Mapa completo de 1 projeto da operação.")}
    `, `
      <div class="card">
        ${cardHead("chart", "", "Fundamentos de gestão de projetos", semanaTag("02"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "O projeto de ponta a ponta", d: "Objetivo, escopo, entregáveis e responsáveis." },
          { t: "Cronograma e stakeholders", d: "Riscos, dependências e encerramento." },
        ])}
        <div class="blk"><p class="kicker">CURSO E CONTEÚDOS</p></div>
        <p class="body">PMI Kickoff: fundamentos, planejamento, execução e abordagens tradicional e ágil.</p>
        ${chips([{ href: LG.pmi, label: "PMI Kickoff" }, { href: LG.bradesco, label: "Fund. Bradesco" }, { href: LG.vargasYoutube, label: "Ricardo Vargas" }])}
      </div>
      ${entregavel("Plano básico do projeto.")}
    `)}
  `));

  /* — SEMANAS 03 e 04 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("book", "", "Onboarding e kickoff", semanaTag("03"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Kickoff e passagem de bastão", d: "Primeira impressão e definição de objetivos." },
          { t: "Alinhamento Account → GP → execução", d: "Cronograma e próximos passos." },
        ])}
        <div class="blk"><p class="kicker">LIVRO OBRIGATÓRIO</p></div>
        <p class="body"><b>Onboarding Orquestrado</b> — Donna Weber. ${chips([{ href: L.onboardingAmazon, label: "Livro físico" }, { href: L.onboardingPdf, label: "PDF" }, { href: LG.terentim, label: "Gino Terentim" }])}</p>
        ${notabar("A DIVISÃO", "O Account compreende o cliente. O GP transforma essas informações em uma <b>jornada executável</b>.")}
      </div>
      ${entregavel("Checklist ideal de kickoff e início de projeto.")}
    `, `
      <div class="card">
        ${cardHead("activity", "", "Organização e gestão visual", semanaTag("04"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Gestão de tarefas", d: "Status, responsáveis, prazos e prioridades." },
          { t: "Documentação e histórico", d: "Gestão visual, Hops e rotinas de acompanhamento." },
        ])}
        ${chips([{ href: LG.alura, label: "Alura · Kanban e Scrum" }, { href: LG.enap, label: "ENAP" }])}
        ${notabar("O TESTE", "Quem nunca participou do projeto deve abrir o Hops e entender: onde estamos, o que acontece, quem é responsável, qual o prazo, o que atrasou e qual o próximo passo.")}
      </div>
      ${entregavel("Projeto estruturado: etapas, tasks, responsáveis, prazos, status, dependências e próximos passos.")}
    `)}
  `));

  /* — CHECKPOINT 30 DIAS — */
  P.push(page(`
    ${secHead("05", "Checkpoint · 30 dias", "Avaliação de 0 a 10 em cada dimensão, conduzida pelo líder.")}
    ${split2(`
      <h3 class="h3">Avaliar de 0 a 10</h3>
      <div class="grid2">
        ${block("CONHECIMENTO", ["Conhecimento da E3.", "Conhecimento dos produtos.", "Conhecimento dos processos.", "Uso das ferramentas."])}
        ${block("EXECUÇÃO", ["Organização.", "Planejamento.", "Comunicação.", "Postura e capacidade de aprendizado."])}
      </div>
    `, `
      <h3 class="h3">Resultado esperado</h3>
      ${feat([
        { t: "Entende o funcionamento da E3", d: "E compreende o papel do GP." },
        { t: "Conhece os produtos", d: "E o fluxo entre as funções." },
        { t: "Consegue organizar projetos", d: "E acompanhar atividades." },
        { t: "Registra corretamente", d: "Informações e acordos." },
        { t: "Trabalha com supervisão", d: "Ainda com acompanhamento do líder." },
      ])}
    `)}
  `));

  /* — MÊS 02 — */
  P.push(page(`
    ${secHead("06", "Mês 02 · Execução, prioridade e prevenção", "Deixar de apenas registrar e acompanhar demandas para gerenciar a execução de forma proativa.")}
    ${callout("target", "A VIRADA DO MÊS", "De registrar para prevenir", "A pergunta deixa de ser “essa tarefa foi feita?” e passa a ser <b>“existe alguma coisa que pode impedir essa tarefa ou projeto de ser concluído?”</b>")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["05", "Planejamento e priorização", "Planejamento semanal do squad"],
      ["06", "Riscos e prevenção", "Mapa de riscos do projeto"],
      ["07", "Comunicação e dependências", "Apresentação do caso no Comitê de GPs"],
      ["08", "Qualidade, checklist e retrabalho", "Checklist operacional de uma atividade real"],
    ])}
  `));

  /* — SEMANAS 05 e 06 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("chart", "", "Planejamento e priorização", semanaTag("05"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Urgência x importância", d: "Capacidade, sequenciamento e dependências." },
          { t: "Planejamento semanal", d: "Prazos, milestones e critérios de prioridade." },
        ])}
        ${chips([{ href: LG.conquer, label: "Escola Conquer" }, { href: LG.vargasYoutube, label: "Ricardo Vargas" }])}
        ${notabar("O CONCEITO", "Nem tudo que chega é prioridade. O GP diferencia: <b>urgente · importante · pode esperar · não deveria estar sendo feito</b>.")}
      </div>
      ${entregavel("Planejamento semanal do squad.")}
    `, `
      <div class="card">
        ${cardHead("alert", "", "Riscos e prevenção", semanaTag("06"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Identificação antecipada", d: "Probabilidade, impacto e mitigação." },
          { t: "Plano de contingência", d: "Red flags e análise de causa." },
        ])}
        ${chips([{ href: LG.enap, label: "ENAP · Gestão de Riscos" }, { href: LG.vargasYoutube, label: "Ricardo Vargas" }])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Identificar ao menos 3 riscos com probabilidade, impacto, responsável, ação preventiva e plano caso aconteça.</p>
      </div>
      ${entregavel("Mapa de riscos do projeto.")}
    `)}
  `));

  /* — SEMANAS 07 e 08 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("users", "", "Comunicação e dependências", semanaTag("07"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Delegação e cobrança", d: "Follow-up, alinhamento e registro de decisões." },
          { t: "Comunicação entre áreas", d: "Account → GP → GT e gestão de dependências." },
        ])}
        ${chips([{ href: LG.conquer, label: "Escola Conquer" }, { href: LG.vossLivro, label: "Nunca Divida a Diferença" }])}
        ${notabar("NÃO BASTA DIZER", "“Fulano ainda não entregou.” O GP comunica: <b>temos um atraso nesta atividade, a causa é X, o impacto é Y e a ação de correção é Z.</b>")}
      </div>
      ${entregavel("Apresentação do caso no Comitê de Gestores de Projetos.")}
    `, `
      <div class="card">
        ${cardHead("check", "", "Qualidade, checklist e retrabalho", semanaTag("08"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Critérios de aceite", d: "Checklist, padronização e controle." },
          { t: "Prevenção de erros", d: "Redução de retrabalho e POPs." },
        ])}
        <div class="blk"><p class="kicker">LIVRO OBRIGATÓRIO</p></div>
        <p class="body"><b>Checklist — Como Fazer as Coisas Bem-Feitas</b> — Atul Gawande. ${chips([{ href: LG.checklistLivro, label: "Livro" }, { href: LG.sebraeYoutube, label: "Canal Sebrae" }])}</p>
      </div>
      ${entregavel("Checklist operacional de uma atividade real.")}
    `)}
  `));

  /* — CHECKPOINT 60 DIAS — */
  P.push(page(`
    ${secHead("07", "Checkpoint · 60 dias", "O GP já deve operar com autonomia sobre os projetos do squad.")}
    ${split2(`
      <h3 class="h3">Avaliar</h3>
      <div class="grid2">
        ${block("GESTÃO", ["Organização.", "Planejamento.", "Priorização."])}
        ${block("RELAÇÃO", ["Comunicação.", "Proatividade.", "Autonomia."])}
        ${block("ANÁLISE", ["Identificação de riscos.", "Capacidade de resolução."])}
        ${block("ENTREGA", ["Gestão de prazos.", "Gestão de dependências."])}
      </div>
    `, `
      <h3 class="h3">O GP já deve conseguir</h3>
      ${feat([
        { t: "Planejar projetos", d: "E organizar prioridades." },
        { t: "Gerenciar prazos", d: "E identificar atrasos." },
        { t: "Antecipar riscos", d: "E conduzir planos de ação." },
        { t: "Cobrar responsáveis", d: "E gerenciar dependências." },
        { t: "Reduzir retrabalho", d: "Com maior autonomia." },
      ])}
    `)}
  `));

  /* — MÊS 03 — */
  P.push(page(`
    ${secHead("08", "Mês 03 · Gestão operacional, melhoria e liderança", "Transformar o profissional em um verdadeiro gestor da execução.")}
    ${callout("refresh", "O CICLO DO MÊS", "Identificar → Analisar → Decidir → Corrigir → Melhorar", "O GP precisa deixar de apenas controlar tarefas e passar a conduzir o ciclo completo.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["09", "Indicadores e gestão da operação", "Diagnóstico operacional do squad"],
      ["10", "PDCA e melhoria contínua", "PDCA completo de um problema real"],
      ["11", "Gestão de crise e tomada de decisão", "Plano de resposta a uma situação crítica"],
      ["12", "Gestão de projetos e liderança da execução", "Projeto final da conta"],
    ])}
  `));

  /* — SEMANAS 09 e 10 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("chart", "", "Indicadores e gestão da operação", semanaTag("09"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        <div class="grid2">
          ${block("PRAZO", ["SLA, prazo e entregas.", "Atrasos e retrabalho."])}
          ${block("FLUXO", ["Capacidade, backlog e gargalos.", "Produtividade e qualidade."])}
        </div>
        <div class="blk"><p class="kicker">TREINAMENTO E CONTEÚDO</p></div>
        <p class="body">Gestão Empresarial E3 (obrigatório). ${chips([{ href: LG.sebrae, label: "Sebrae" }, { href: LG.roihunters, label: "ROI Hunters" }])}</p>
      </div>
      ${entregavel("Diagnóstico operacional do squad.")}
    `, `
      <div class="card">
        ${cardHead("refresh", "", "PDCA e melhoria contínua", semanaTag("10"))}
        <div class="blk"><p class="kicker">O CICLO</p></div>
        ${feat([
          { t: "PLAN", d: "Planejar." },
          { t: "DO", d: "Executar." },
          { t: "CHECK", d: "Verificar." },
          { t: "ACT", d: "Corrigir e padronizar." },
        ])}
        ${chips([{ href: LG.vargasYoutube, label: "Ricardo Vargas" }, { href: LG.terentim, label: "Gino Terentim" }, { href: LG.enap, label: "ENAP" }])}
        ${notabar("A PERGUNTA", "O que precisa mudar para esse problema <b>não acontecer novamente</b>?")}
      </div>
      ${entregavel("PDCA completo: problema → causa → plano → execução → resultado → padronização.")}
    `)}
  `));

  /* — SEMANAS 11 e 12 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("alert", "", "Gestão de crise e tomada de decisão", semanaTag("11"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Pressão e priorização", d: "Crise, escalonamento e responsabilidade." },
          { t: "Decisão e negociação", d: "Comunicação e gestão de conflitos." },
        ])}
        ${chips([{ href: LG.conquer, label: "Escola Conquer" }, { href: LG.vargasPodcast, label: "5 Minutes PM" }])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">O que aconteceu · qual impacto · o que resolver primeiro · quem participa · qual decisão · plano imediato · como evitar recorrência.</p>
      </div>
      ${entregavel("Plano de resposta a uma situação crítica.")}
    `, `
      <div class="card">
        ${cardHead("award", "", "Gestão de projetos e liderança da execução", semanaTag("12"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Previsibilidade", d: "Planejamento, processos e melhoria." },
          { t: "Liderança da execução", d: "Responsabilidade, autonomia e protagonismo." },
        ])}
        <div class="blk"><p class="kicker">CONTEÚDO E REVISÃO</p></div>
        <p class="body">ROI Hunters e revisão das referências da trilha.</p>
        ${chips([{ href: LG.roihunters, label: "ROI Hunters" }, { href: LG.vargasSite, label: "Ricardo Vargas" }, { href: L.fernando, label: "Fernando Miranda" }, { href: L.joao, label: "João Pedro Motta" }])}
      </div>
      ${entregavel("Projeto final apresentado ao líder.")}
    `)}
  `));

  /* — PROJETO FINAL — */
  P.push(page(`
    ${secHead("09", "Projeto final", "Selecionar um projeto real e apresentar o percurso completo, do objetivo ao plano dos próximos 90 dias.")}
    <div class="grid3">
      ${block("O PLANO", ["Objetivo.", "Escopo.", "Etapas.", "Cronograma."])}
      ${block("A EXECUÇÃO", ["Responsáveis.", "Dependências.", "Riscos.", "Indicadores."])}
      ${block("A EVOLUÇÃO", ["Problemas identificados.", "Plano de ação.", "Melhorias propostas.", "Plano para 30/60/90 dias."])}
    </div>
    ${notabar("COMO APRESENTAR", "A sequência é encadeada: cada bloco responde ao anterior. O líder avalia se o raciocínio se sustenta do começo ao fim.")}
  `));

  /* — CERTIFICAÇÃO 90 DIAS — */
  P.push(page(`
    ${secHead("10", "Certificação interna · 90 dias", "O líder avalia cada dimensão com nota de 0 a 10.")}
    ${rules([
      { t: "Conhecimento técnico", d: "Processos, planejamento, riscos, indicadores e gestão de projetos." },
      { t: "Execução", d: "Capacidade de transformar planejamento em execução." },
      { t: "Organização", d: "Manter projetos, tarefas, informações e prazos organizados." },
      { t: "Planejamento", d: "Definir prioridades, atividades e responsáveis." },
      { t: "Comunicação", d: "Clareza com Accounts, GTs, liderança e demais funções." },
      { t: "Gestão de riscos", d: "Capacidade de antecipar problemas." },
      { t: "Capacidade de resolução", d: "Identificar causa e propor soluções." },
      { t: "Autonomia", d: "Trabalhar sem depender constantemente da liderança." },
      { t: "Melhoria contínua", d: "Transformar problemas recorrentes em melhorias de processo." },
      { t: "Protagonismo", d: "Assumir responsabilidade e conduzir situações." },
    ], "grid2r")}
  `));

  /* — LIVROS — */
  P.push(page(`
    ${secHead("11", "Livros", "Dois obrigatórios, com mês definido, e três recomendados.")}
    ${split2(`
      <h3 class="h3">Obrigatórios</h3>
      ${rules([
        { t: "Onboarding Orquestrado — Donna Weber " + tag("MÊS 01", "tag-pro"), d: `Organizar os primeiros momentos da jornada: passagem de bastão, alinhamento, kickoff e próximos passos. ${chips([{ href: L.onboardingAmazon, label: "Livro físico" }, { href: L.onboardingPdf, label: "PDF" }])}` },
        { t: "Checklist — Atul Gawande " + tag("MÊS 02", "tag-pro"), d: `Padronização, qualidade, prevenção de erros, redução de retrabalho e gestão de processos. ${chips([{ href: LG.checklistLivro, label: "Livro" }])}` },
      ])}
    `, `
      <h3 class="h3">Recomendados</h3>
      ${rules([
        { t: "Customer Success — Mehta, Steinman e Murphy", d: `Retenção, churn, experiência e valor percebido. Cumprir prazo não basta se o projeto não gera valor. ${chips([{ href: L.csAmazon, label: "Livro" }, { href: L.csPdf, label: "PDF" }])}` },
        { t: "Scrum — Jeff Sutherland", d: `Sprints, priorização, backlog, iteração e ritmo de execução. ${chips([{ href: LG.scrumLivro, label: "Livro" }])}` },
        { t: "Nunca Divida a Diferença — Chris Voss", d: `Negociação, escuta, perguntas e gestão de conflitos. ${chips([{ href: LG.vossLivro, label: "Livro" }])}` },
      ])}
    `)}
  `));

  /* — CURSOS GRATUITOS — */
  P.push(page(`
    ${secHead("12", "Cursos e conteúdos gratuitos", "Quatro plataformas, todas sem custo. Clique para acessar.")}
    ${rules([
      { t: "PMI Kickoff " + tag("PRIORIDADE ALTA", "tag-pro"), d: `Fundamentos, planejamento, execução, gestão tradicional e ágil. ${chips([{ href: LG.pmi, label: "Acessar" }])}` },
      { t: "Fundação Bradesco — Escola Virtual", d: `Gestão, administração, liderança, comunicação, produtividade, organização e Excel. ${chips([{ href: LG.bradesco, label: "Acessar" }])}` },
      { t: "ENAP — Escola Virtual", d: `Gestão de projetos, processos, riscos, planejamento, metodologias ágeis e liderança. ${chips([{ href: LG.enap, label: "Acessar" }])}` },
      { t: "Sebrae", d: `Gestão empresarial, planejamento, processos, indicadores, liderança e produtividade. ${chips([{ href: LG.sebrae, label: "Acessar" }])}` },
    ], "grid2r")}
  `));

  /* — CANAIS — */
  P.push(page(`
    ${secHead("13", "Canais e conteúdos recomendados", "Dois obrigatórios, com frequência definida, e dois para priorizar por tema.")}
    ${split2(`
      <h3 class="h3">Obrigatórios</h3>
      ${rules([
        { t: "Ricardo Vargas " + tag("2 POR SEMANA", "tag-pro"), d: `Projetos, planejamento, cronograma, riscos, liderança, decisão, IA e gestão de crise. ${chips([{ href: LG.vargasYoutube, label: "YouTube" }, { href: LG.vargasSite, label: "Site" }])}` },
        { t: "Gino Terentim " + tag("1 POR SEMANA", "tag-pro"), d: `Projetos, métodos ágeis, liderança, gestão da mudança, transformação, IA e gestão de times. ${chips([{ href: LG.terentim, label: "YouTube" }])}` },
      ])}
    `, `
      <h3 class="h3">Para priorizar</h3>
      ${rules([
        { t: "Alura — YouTube", d: `Scrum, Kanban, Agile, gestão de projetos, produtividade, processos, tecnologia e IA. ${chips([{ href: LG.alura, label: "Canal" }])}` },
        { t: "Escola Conquer — YouTube", d: `Liderança, comunicação, gestão, produtividade, feedback, gestão do tempo e negociação. ${chips([{ href: LG.conquer, label: "Canal" }])}` },
        { t: "Sebrae — YouTube", d: `Gestão empresarial, planejamento, processos, indicadores, liderança e produtividade. ${chips([{ href: LG.sebraeYoutube, label: "Canal" }])}` },
      ])}
    `)}
  `));

  /* — PODCASTS — */
  P.push(page(`
    ${secHead("14", "Podcasts", "Repertório contínuo, com registro de aprendizado a cada episódio.")}
    ${split2(`
      ${rules([
        { t: "5 Minutes Project Management — Ricardo Vargas " + tag("2 POR SEMANA", "tag-pro"), d: `Projetos, planejamento, riscos, liderança, comunicação, tomada de decisão e gestão de crise. ${chips([{ href: LG.vargasPodcast, label: "Ouvir" }])}` },
        { t: "ROI Hunters " + tag("1 A CADA 15 DIAS", "tag-light"), d: `Gestão, growth, marketing, vendas, liderança, processos, negócios e crescimento. ${chips([{ href: LG.roihunters, label: "Ouvir" }])}` },
      ])}
    `, `
      ${callout("book", "APÓS CADA EPISÓDIO", "Três perguntas, sempre", "1. O que aprendi?<br/>2. Como isso se conecta à minha função?<br/>3. Onde consigo aplicar dentro da operação?")}
    `)}
  `));

  /* — REFERÊNCIAS — */
  P.push(page(`
    ${secHead("15", "Referências para modelar", "O objetivo não é copiar a personalidade. É observar como pensam, estruturam problemas, planejam, decidem e conectam execução a resultado.")}
    ${tbl(["Referência", "Modelar", "O que observar"], [
      [link(LG.vargasSite, "Ricardo Vargas"), "Projetos, riscos, planejamento e decisão", "Priorização, gestão de crise, liderança e IA aplicada a projetos"],
      [link(LG.terentim, "Gino Terentim"), "Projetos, liderança e transformação", "Gestão ágil, change management e gestão de times"],
      [link(L.fernando, "Fernando Miranda"), "Gestão, visão de negócio e crescimento", "Processos, growth, marketing, vendas, receita e estratégia"],
      [link(L.joao, "João Pedro Motta"), "Estratégia e raciocínio de negócio", "Análise, growth, tomada de decisão e negócios"],
    ])}
    ${notabar("COMO USAR", "Clique no nome para abrir o perfil ou o canal.")}
  `));

  /* — ROTINA SEMANAL — */
  P.push(page(`
    ${secHead("16", "Rotina semanal de desenvolvimento", "Toda semana o Gestor de Projetos deve cumprir os seis itens abaixo.")}
    ${rules([
      { t: "Conteúdo técnico", d: "Curso, treinamento interno ou aula da trilha." },
      { t: "Livro", d: "Leitura programada do livro do mês." },
      { t: "Podcast", d: "Ricardo Vargas e, quinzenalmente, ROI Hunters." },
      { t: "Referência", d: "Pelo menos 1 conteúdo de uma pessoa recomendada." },
      { t: "Aplicação", d: "Aplicar um conceito da semana em um projeto real." },
      { t: "Registro", d: "O que aprendi? Onde isso aparece na rotina? O que vou fazer diferente?" },
    ], "grid2r")}
    ${notabar("MODELO DE ACOMPANHAMENTO", "Para cada conteúdo: tema, prazo, status (não iniciado / em andamento / concluído), conteúdo, aplicação prática, entregável e feedback do líder.")}
  `));

  /* — CRITÉRIO FINAL — */
  P.push(page(`
    ${secHead("17", "Critério final da trilha", "Ao final dos 90 dias, o que o Gestor de Projetos precisa conseguir fazer.")}
    <div class="grid3">
      ${block("PLANEJAR", ["Organizar projetos com clareza.", "Transformar objetivos em planos de ação.", "Definir atividades, responsáveis e prazos.", "Gerenciar prioridades."])}
      ${block("CONDUZIR", ["Acompanhar execução e cobrar atividades.", "Identificar atrasos e antecipar riscos.", "Gerenciar dependências.", "Comunicar problemas com clareza."])}
      ${block("EVOLUIR", ["Identificar gargalos e reduzir retrabalho.", "Criar checklists e documentar processos.", "Aplicar PDCA e interpretar indicadores.", "Propor melhorias com autonomia."])}
    </div>
    <div class="commit">
      <span class="commit-pill">RESULTADO ESPERADO</span>
      <h3 class="commit-t">Não formar alguém que apenas acompanha tarefas.</h3>
      <p class="commit-d">Formar alguém capaz de garantir que os projetos tenham clareza, organização, previsibilidade, execução e evolução constante. <b>Gestor de Projetos E3 = Planejamento + Organização + Execução + Previsibilidade + Melhoria.</b></p>
    </div>
  `));

  const html = shell({
    title: "Trilha de Desenvolvimento — Gestor de Projetos · E3 Digital",
    navTitle: "Trilha de Desenvolvimento · Gestor de Projetos",
    logoUri: LOGO_URI,
    pages: P,
    pdfHref: "./trilha-gestor-projetos.pdf",
    pdfName: "Trilha de Desenvolvimento - Gestor de Projetos - E3 Digital.pdf",
  });
  const outDir = join(distRoot, "trilha-gestor-projetos");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  copyFileSync(join(pdfSrcDir, "trilha-gestor-projetos.pdf"), join(outDir, "trilha-gestor-projetos.pdf"));
  console.log("trilha gestor de projetos:", outDir, "·", P.length, "páginas · PDF anexado");
}

/* ══════════════════════ TRILHA — GESTOR DE TRÁFEGO ══════════════════════ */

/* O PDF do GT deixa os campos de curso em branco (nome/link/login/senha) para
   serem preenchidos. Em vez de reproduzir linhas vazias, os slots apontam para
   o hub de Cursos, onde as credenciais de Meta Ads e Google Ads já estão. */
const LT = {
  cursos: "../cursos/index.html",
  teses: "../materiais-pdf/index.html",
  links: "../links-uteis/index.html",
  metaBlueprint: "https://www.facebook.com/business/learn",
  metaBusiness: "https://www.facebook.com/business",
  skillshop: "https://skillshop.withgoogle.com",
  googleHelp: "https://support.google.com/google-ads",
  subido: "https://www.subido.com.br",
  sobral: "https://www.youtube.com/results?search_query=Pedro+Sobral+tr%C3%A1fego",
  hopkins: "https://www.amazon.com.br/s?k=Scientific+Advertising+Claude+Hopkins",
  schwartz: "https://www.amazon.com.br/s?k=Breakthrough+Advertising+Eugene+Schwartz",
  leanAnalytics: "https://www.amazon.com.br/s?k=Lean+Analytics+Alistair+Croll",
};

function buildGestorTrafego() {
  const NAV = [
    null, "Visão da função", "Como funciona", "Base E3", "Gestão empresarial",
    "Mês 01", "Semanas 01–02", "Semanas 03–04", "Checkpoint 30 dias",
    "Mês 02", "Semanas 05–06", "Semanas 07–08", "Checkpoint 60 dias",
    "Mês 03", "Semanas 09–10", "Semanas 11–12", "Projeto final",
    "Certificação 90 dias", "Cursos obrigatórios", "Canais e referências",
    "Livros", "Rotina semanal", "Critério final",
  ];
  const { page } = makePageFactory("TRILHA DE DESENVOLVIMENTO · GESTOR DE TRÁFEGO", NAV);
  const P = [];

  /* — CAPA — */
  P.push(page(`
    <img class="logo" src="${LOGO_URI}" alt="E3"/>
    <p class="kicker cov-k">TRILHA DE DESENVOLVIMENTO · DOCUMENTO DE FORMAÇÃO</p>
    <h1>Gestor de <span>Tráfego</span></h1>
    <p class="cov-sub">Formar o profissional técnico e estratégico da mídia paga: conectando campanhas, criativos, dados, funil comercial e resultado do cliente.</p>
    <div class="pills">
      <span class="pill">90 DIAS</span><span class="pill">12 SEMANAS</span>
      <span class="pill">2 A 3H POR SEMANA</span><span class="pill">3 CHECKPOINTS</span><span class="pill">CERTIFICAÇÃO INTERNA</span>
    </div>
    <div class="cov-rule"></div>
    <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
  `, { cover: true }));

  /* — VISÃO DA FUNÇÃO — */
  P.push(page(`
    ${split2(`
      <p class="kicker">VISÃO DA FUNÇÃO</p>
      <h2 class="h2">O GT não só sobe campanhas</h2>
      <p class="body">O Gestor de Tráfego da E3 não deve ser apenas responsável por subir campanhas.</p>
      ${statRow([
        { v: "90", l: "dias de trilha" },
        { v: "12", l: "semanas" },
        { v: "2–3h", l: "por semana" },
      ])}
      ${notabar("EVOLUÇÃO ESPERADA", "Execução → Análise → Otimização → Estratégia → <b>Escala</b>")}
    `, `
      <div class="blk"><p class="kicker">O QUE ESPERAMOS DESENVOLVER</p></div>
      <div class="grid2">
        ${block("EXECUTAR", ["Estruturar campanhas corretamente.", "Analisar criativos.", "Otimizar campanhas."])}
        ${block("ANALISAR", ["Analisar dados e identificar gargalos.", "Trabalhar com hipóteses.", "Decidir com base em dados."])}
        ${block("CONECTAR", ["Entender qualidade dos leads.", "Conectar mídia ao CRM.", "Entender o funil comercial."])}
        ${block("ESCALAR", ["Criar planos de ação.", "Identificar oportunidades de escala.", "Comunicar resultados com clareza."])}
      </div>
    `)}
  `));

  /* — COMO FUNCIONA A TRILHA — */
  P.push(page(`
    ${secHead("01", "Como funciona a trilha", "12 semanas, de 2 a 3 horas semanais. Toda semana deve existir aplicação prática.")}
    ${split2(`
      <h3 class="h3">A carga se divide entre</h3>
      ${feat([
        { t: "Cursos técnicos", d: "Meta, Google e tracking." },
        { t: "Conteúdos internos", d: "Treinamentos da própria E3." },
        { t: "Aplicação prática", d: "Em campanha de cliente real." },
        { t: "Análise de campanhas", d: "O exercício central da função." },
        { t: "Conteúdos de referência", d: "Quem já faz, em alto nível." },
        { t: "Feedback do líder", d: "Fecha cada ciclo de aprendizado." },
      ])}
    `, `
      ${callout("refresh", "A METODOLOGIA", "Aprender → Aplicar → Analisar → Otimizar → Apresentar", "O ciclo não termina na entrega: ele termina quando o resultado da alteração é lido e apresentado.")}
      <div class="quote">
        <p class="qk">O QUE MUDA NO MÊS 02</p>
        <p>Sai da <b>execução operacional</b></p>
        <p>e entra a <b>capacidade de diagnóstico e tomada de decisão</b>.</p>
      </div>
    `)}
  `));

  /* — BASE OBRIGATÓRIA E3 — */
  P.push(page(`
    ${secHead("02", "Base obrigatória E3", "Todos os Gestores de Tráfego devem concluir estes conteúdos internos.")}
    <div class="pilares3">
      <div class="card">
        ${cardHead("award", "BASE 01", "Cultura E3")}
        ${feat([
          { t: "História da empresa", d: "De onde viemos." },
          { t: "Cultura e valores", d: "Como agimos." },
          { t: "Posicionamento", d: "Onde a E3 joga." },
          { t: "Comportamentos esperados", d: "O que é inegociável." },
        ])}
      </div>
      <div class="card">
        ${cardHead("target", "BASE 02", "Produtos E3")}
        ${feat([
          { t: "Produtos e escopos", d: "O que vendemos e até onde vai." },
          { t: "Público e teses", d: `A biblioteca de teses por área. ${chips([{ href: LT.teses, label: "Teses" }])}` },
          { t: "Jornada e objetivos", d: "Como é executado." },
          { t: "Principais ofertas", d: "O que leva o lead a converter." },
        ])}
      </div>
      <div class="card">
        ${cardHead("users", "BASE 03", "Processos")}
        ${feat([
          { t: "Fluxo Account → GP → GT", d: "Hops, SLA e briefing." },
          { t: "Jornada do Herói", d: "E o processo de criativos." },
          { t: "Relatórios", d: "Planos de ação e PDCA." },
          { t: "Acessos da operação", d: `Plataformas e credenciais. ${chips([{ href: LT.links, label: "Links úteis" }])}` },
        ])}
      </div>
    </div>
  `));

  /* — GESTÃO EMPRESARIAL — */
  P.push(page(`
    ${secHead("03", "Gestão empresarial", "Treinamentos internos para conectar mídia a resultado financeiro.")}
    ${split2(`
      <h3 class="h3">Conceitos a dominar</h3>
      <div class="grid2">
        ${block("CUSTO", ["CAC.", "CPL.", "ROI."])}
        ${block("RECEITA", ["Receita.", "Ticket médio.", "Conversão."])}
        ${block("JORNADA", ["Funil.", "Marketing.", "Comercial."])}
        ${block("BASE", ["Retenção."])}
      </div>
      ${chips([{ href: L.novaEraDrive, label: "A nova era do mercado" }, { href: L.agenciaIA, label: "Agência com IA" }])}
    `, `
      ${callout("alert", "A REGRA QUE MUDA TUDO", "Campanha boa não é apenas campanha com CPL baixo", "Campanha boa é aquela que contribui para gerar <b>leads qualificados, oportunidades e receita</b>.")}
    `)}
  `));

  /* — MÊS 01 — */
  P.push(page(`
    ${secHead("04", "Mês 01 · Fundamentos e execução", "Dominar os fundamentos das plataformas, estrutura de campanha, métricas e processos internos.")}
    ${callout("target", "RESULTADO DO MÊS", "Operar as plataformas e executar com supervisão", "Estruturar campanhas, entender métricas e identificar problemas básicos.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["01", "E3, produtos e papel do GT", "Mapa estratégico de 1 cliente"],
      ["02", "Meta Ads", "Estrutura de campanha validada pelo líder"],
      ["03", "Google Ads", "Campanha estruturada + justificativa da estratégia"],
      ["04", "Métricas e tracking", "Diagnóstico de performance de 1 campanha"],
    ])}
  `));

  /* — SEMANAS 01 e 02 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("users", "", "E3, produtos e papel do GT", semanaTag("01"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Produtos, teses e público", d: "Ofertas e jornada do cliente." },
          { t: "Responsabilidades do GT", d: "Fluxo Account → GP → GT, Hops e processos." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Selecionar 1 cliente e mapear: produto, público, oferta, investimento, objetivo da campanha, canal, funil e resultado esperado.</p>
      </div>
      ${entregavel("Mapa estratégico de 1 cliente.")}
    `, `
      <div class="card">
        ${cardHead("zap", "", "Meta Ads", semanaTag("02"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Estrutura da conta", d: "Business Manager, campanha, conjunto e anúncio." },
          { t: "Configuração", d: "Objetivos, públicos, posicionamentos e orçamento." },
          { t: "Mensuração", d: "Pixel, eventos e conversões." },
        ])}
        <div class="blk"><p class="kicker">CURSOS</p></div>
        ${chips([{ href: LT.cursos, label: "Curso Meta Ads · acessos" }, { href: LT.metaBlueprint, label: "Meta Blueprint" }])}
      </div>
      ${entregavel("Estrutura de campanha validada pelo líder.")}
    `)}
  `));

  /* — SEMANAS 03 e 04 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("target", "", "Google Ads", semanaTag("03"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Estrutura da conta", d: "Campanhas e rede de pesquisa." },
          { t: "Palavras-chave", d: "Correspondências e termos de pesquisa." },
          { t: "Anúncios e conversões", d: "Extensões e orçamento." },
        ])}
        <div class="blk"><p class="kicker">CURSOS</p></div>
        ${chips([{ href: LT.cursos, label: "Curso Google Ads · acessos" }, { href: LT.skillshop, label: "Skillshop" }])}
      </div>
      ${entregavel("Campanha estruturada + justificativa da estratégia utilizada.")}
    `, `
      <div class="card">
        ${cardHead("chart", "", "Métricas e tracking", semanaTag("04"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        <div class="grid2">
          ${block("CUSTO", ["CPM, CPC e CPL.", "CPA, ROI e ROAS."])}
          ${block("ENTREGA", ["CTR e taxa de conversão.", "Frequência e alcance."])}
        </div>
        ${chips([{ href: LT.googleHelp, label: "Google Ads · ajuda" }, { href: LT.metaBusiness, label: "Meta for Business" }])}
        ${notabar("A PERGUNTA DA SEMANA", "O que cada métrica me diz sobre o <b>problema</b> da campanha?")}
      </div>
      ${entregavel("Diagnóstico de performance: métricas, problema, hipótese e ação recomendada.")}
    `)}
  `));

  /* — CHECKPOINT 30 DIAS — */
  P.push(page(`
    ${secHead("05", "Checkpoint · 30 dias", "Avaliação de 0 a 10 em cada dimensão, conduzida pelo líder.")}
    ${split2(`
      <h3 class="h3">Avaliar de 0 a 10</h3>
      <div class="grid2">
        ${block("TÉCNICO", ["Conhecimento dos produtos.", "Meta Ads.", "Google Ads.", "Capacidade técnica."])}
        ${block("ANÁLISE", ["Métricas.", "Tracking.", "Organização.", "Processos e comunicação."])}
      </div>
    `, `
      <h3 class="h3">Resultado esperado</h3>
      ${feat([
        { t: "Estruturar campanhas", d: "Nas duas plataformas." },
        { t: "Entender métricas", d: "E o que cada uma indica." },
        { t: "Identificar problemas básicos", d: "Antes de pedir ajuda." },
        { t: "Operar as plataformas", d: "Com segurança." },
        { t: "Seguir processos", d: "Executando com supervisão." },
      ])}
    `)}
  `));

  /* — MÊS 02 — */
  P.push(page(`
    ${secHead("06", "Mês 02 · Análise, criativos e otimização", "Sair da execução operacional e desenvolver capacidade de diagnóstico e tomada de decisão.")}
    ${callout("alert", "A REGRA DO MÊS", "Otimização não é “vou alterar alguma coisa”", "Otimização é <b>Dado → Hipótese → Alteração → Resultado</b>.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["05", "Funil de aquisição", "Mapa do funil + gargalos identificados"],
      ["06", "Criativos", "Análise de 10 criativos + 3 novas hipóteses"],
      ["07", "Otimização", "Plano de otimização com 3 hipóteses"],
      ["08", "Qualidade dos leads", "Diagnóstico de qualidade dos leads"],
    ])}
  `));

  /* — SEMANAS 05 e 06 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("funnel", "", "Funil de aquisição", semanaTag("05"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Público frio e remarketing", d: "Conversão, jornada e multifunis." },
          { t: "Da captação à venda", d: "Lead, MQL, oportunidade e venda." },
        ])}
        ${notabar("MAPEAR O FUNIL", "Impressão → Clique → Lead → MQL → Reunião → <b>Venda</b>")}
      </div>
      ${entregavel("Mapa do funil + gargalos identificados.")}
    `, `
      <div class="card">
        ${cardHead("layers", "", "Criativos", semanaTag("06"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Hook, oferta e ângulo", d: "Público, formato e copy." },
          { t: "Intenção por funil", d: "Criativo de frio x de remarketing e variações." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Analisar 10 criativos e, para cada um: público, hook, oferta, CTA, métrica e resultado.</p>
      </div>
      ${entregavel("Análise de criativos + 3 novas hipóteses.")}
    `)}
  `));

  /* — SEMANAS 07 e 08 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("refresh", "", "Otimização", semanaTag("07"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Quando otimizar e quando esperar", d: "Orçamento, público e criativo." },
          { t: "O que mexer", d: "Posicionamento, oferta, landing page e formulário." },
        ])}
        ${chips([{ href: LT.sobral, label: "Pedro Sobral" }, { href: LT.subido, label: "Subido" }])}
        ${notabar("A REGRA", "Nunca “vou alterar alguma coisa”. Sempre <b>Dado → Hipótese → Alteração → Resultado</b>.")}
      </div>
      ${entregavel("Plano de otimização com 3 hipóteses.")}
    `, `
      <div class="card">
        ${cardHead("check", "", "Qualidade dos leads", semanaTag("08"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Lead, MQL e SQL", d: "Qualificação e CRM." },
          { t: "Atendimento e comercial", d: "Motivos de desqualificação." },
        ])}
        ${callout("alert", "O QUE O GT PRECISA ENTENDER", "CPL baixo com lead ruim não é boa performance", "Cruzar: <b>Campanha → Criativo → Lead → Qualificação → Venda</b>.")}
      </div>
      ${entregavel("Diagnóstico de qualidade dos leads.")}
    `)}
  `));

  /* — CHECKPOINT 60 DIAS — */
  P.push(page(`
    ${secHead("07", "Checkpoint · 60 dias", "O GT já deve diagnosticar e decidir, não apenas executar.")}
    ${split2(`
      <h3 class="h3">Avaliar</h3>
      <div class="grid2">
        ${block("ANÁLISE", ["Capacidade analítica.", "Criativos.", "Funil."])}
        ${block("DECISÃO", ["Otimização.", "Tomada de decisão.", "Autonomia."])}
        ${block("QUALIDADE", ["Qualidade dos leads."])}
        ${block("POSTURA", ["Comunicação.", "Organização."])}
      </div>
    `, `
      <h3 class="h3">O GT já deve conseguir</h3>
      ${feat([
        { t: "Identificar gargalos", d: "E criar hipóteses." },
        { t: "Otimizar campanhas", d: "Com critério, não por impulso." },
        { t: "Analisar criativos", d: "E a qualidade dos leads." },
        { t: "Relacionar mídia ao comercial", d: "Ligando campanha e CRM." },
        { t: "Trabalhar com autonomia", d: "Sem depender do líder a cada passo." },
      ])}
    `)}
  `));

  /* — MÊS 03 — */
  P.push(page(`
    ${secHead("08", "Mês 03 · Estratégia, negócio e escala", "Desenvolver visão estratégica e capacidade de conectar mídia ao resultado financeiro.")}
    ${tbl(["Semana", "Tema", "Entregável"], [
      ["09", "Visão de negócio", "Diagnóstico de mídia + negócio"],
      ["10", "Testes e hipóteses", "Backlog com pelo menos 5 testes"],
      ["11", "Escala", "Plano de escala ou justificativa técnica para não escalar"],
      ["12", "Estratégia de mídia", "Projeto final do cliente"],
    ])}
    ${notabar("A PERGUNTA DO MÊS", "Por que essa campanha está pronta — ou <b>não está pronta</b> — para escalar?")}
  `));

  /* — SEMANAS 09 e 10 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("chart", "", "Visão de negócio", semanaTag("09"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        <div class="grid2">
          ${block("CUSTO", ["CAC.", "ROI.", "Payback."])}
          ${block("RETORNO", ["Receita e ticket.", "Conversão e LTV."])}
        </div>
        <div class="blk"><p class="kicker">TREINAMENTO OBRIGATÓRIO</p></div>
        <p class="body">Gestão Empresarial E3. Analisar um cliente: investimento, leads, MQLs, reuniões, contratos, receita, CAC e ROI.</p>
      </div>
      ${entregavel("Diagnóstico de mídia + negócio.")}
    `, `
      <div class="card">
        ${cardHead("activity", "", "Testes e hipóteses", semanaTag("10"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Testes e variáveis", d: "Criativos, público e oferta." },
          { t: "Destino", d: "Landing page e formulários." },
        ])}
        <div class="blk"><p class="kicker">APLICAÇÃO PRÁTICA</p></div>
        <p class="body">Criar um backlog com hipótese, motivo, variável, resultado esperado e prioridade.</p>
      </div>
      ${entregavel("Backlog com pelo menos 5 testes.")}
    `)}
  `));

  /* — SEMANAS 11 e 12 — */
  P.push(page(`
    ${split2(`
      <div class="card">
        ${cardHead("trending", "", "Escala", semanaTag("11"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Vertical e horizontal", d: "Aumento de orçamento e novas campanhas." },
          { t: "Novas frentes", d: "Novos públicos e novos criativos." },
          { t: "Os limites", d: "Saturação e frequência." },
        ])}
        ${notabar("A PERGUNTA", "Por que essa campanha está pronta — ou não está pronta — para escalar?")}
      </div>
      ${entregavel("Plano de escala ou justificativa técnica para não escalar.")}
    `, `
      <div class="card">
        ${cardHead("award", "", "Estratégia de mídia", semanaTag("12"))}
        <div class="blk"><p class="kicker">DESENVOLVER</p></div>
        ${feat([
          { t: "Planejamento", d: "Objetivo, canal, público e oferta." },
          { t: "Execução", d: "Criativo, orçamento e métricas." },
          { t: "Resultado", d: "Funil e escala." },
        ])}
        ${chips([{ href: LT.metaBusiness, label: "Meta for Business" }, { href: LT.skillshop, label: "Skillshop" }])}
      </div>
      ${entregavel("Projeto final apresentado ao líder.")}
    `)}
  `));

  /* — PROJETO FINAL — */
  P.push(page(`
    ${secHead("09", "Projeto final", "Selecionar um cliente real e apresentar o percurso completo, do objetivo ao plano dos próximos 90 dias.")}
    <div class="grid3">
      ${block("O PLANO", ["Objetivo.", "Produto.", "Público.", "Oferta.", "Estratégia."])}
      ${block("A EXECUÇÃO", ["Canais.", "Criativos.", "Investimento.", "Resultados.", "Gargalos."])}
      ${block("A EVOLUÇÃO", ["Plano de otimização.", "Plano de escala.", "Próximos 90 dias."])}
    </div>
    ${notabar("COMO APRESENTAR", "A sequência é encadeada: cada bloco responde ao anterior. O líder avalia se o raciocínio se sustenta do objetivo até a escala.")}
  `));

  /* — CERTIFICAÇÃO 90 DIAS — */
  P.push(page(`
    ${secHead("10", "Certificação interna · 90 dias", "O líder avalia cada dimensão com nota de 0 a 10.")}
    ${rules([
      { t: "Meta Ads", d: "Domínio da plataforma." },
      { t: "Google Ads", d: "Domínio da plataforma." },
      { t: "Análise de dados", d: "Capacidade de interpretar métricas." },
      { t: "Otimização", d: "Capacidade de identificar problemas e propor ações." },
      { t: "Criativos", d: "Capacidade de analisar performance e propor hipóteses." },
      { t: "Funil", d: "Capacidade de conectar mídia ao CRM e ao comercial." },
      { t: "Visão de negócio", d: "Capacidade de conectar mídia à receita." },
      { t: "Comunicação", d: "Capacidade de explicar decisões." },
      { t: "Autonomia", d: "Executar sem depender constantemente do líder." },
      { t: "Protagonismo", d: "Assumir responsabilidade sobre a performance." },
    ], "grid2r")}
  `));

  /* — CURSOS OBRIGATÓRIOS — */
  P.push(page(`
    ${secHead("11", "Cursos obrigatórios", "Os acessos de Meta Ads e Google Ads ficam no hub de Cursos, com link, login e senha.")}
    ${split2(`
      <h3 class="h3">Plataformas</h3>
      ${rules([
        { t: "Meta Ads " + tag("OBRIGATÓRIO", "tag-pro"), d: `Curso da operação e certificação oficial. ${chips([{ href: LT.cursos, label: "Acessos" }, { href: LT.metaBlueprint, label: "Blueprint" }])}` },
        { t: "Google Ads " + tag("OBRIGATÓRIO", "tag-pro"), d: `Curso da operação e certificação Skillshop. ${chips([{ href: LT.cursos, label: "Acessos" }, { href: LT.skillshop, label: "Skillshop" }])}` },
        { t: "Tracking e Analytics", d: `Eventos, conversões e mensuração. ${chips([{ href: LT.googleHelp, label: "Documentação" }])}` },
      ])}
    `, `
      <h3 class="h3">Cursos internos E3</h3>
      ${feat([
        { t: "Treinamento de tráfego", d: "A base técnica da casa." },
        { t: "Treinamento de criativos", d: "Processo e padrão E3." },
        { t: "Treinamento de processos", d: "Fluxo, Hops e SLA." },
        { t: "Gestão empresarial", d: "Receita, CAC, ROI e funil." },
        { t: "Análise de campanhas", d: "Diagnóstico e plano de ação." },
      ])}
      ${notabar("ONDE ESTÃO", "Os acessos das plataformas ficam no hub de Cursos; os treinamentos internos são liberados pelo líder.")}
    `)}
  `));

  /* — CANAIS E REFERÊNCIAS — */
  P.push(page(`
    ${secHead("12", "Canais e referências recomendadas", "Dois com frequência definida e dois canais oficiais para acompanhar atualizações.")}
    ${split2(`
      <h3 class="h3">Para modelar</h3>
      ${rules([
        { t: "Pedro Sobral / Subido " + tag("1 POR SEMANA", "tag-pro"), d: `Meta Ads, estrutura de campanhas, otimização, análise, rotina de gestor e escala. ${chips([{ href: LT.sobral, label: "Conteúdos" }, { href: LT.subido, label: "Subido" }])}` },
        { t: "ROI Hunters " + tag("1 A CADA 15 DIAS", "tag-light"), d: `Marketing, growth, performance, negócio, vendas, estratégia e aquisição. ${chips([{ href: LG.roihunters, label: "Ouvir" }])}` },
      ])}
    `, `
      <h3 class="h3">Canais oficiais</h3>
      ${rules([
        { t: "Meta for Business", d: `Meta Ads, algoritmo, criativos, conversões, Pixel, API de Conversões e novos recursos. ${chips([{ href: LT.metaBusiness, label: "Acessar" }])}` },
        { t: "Google Ads", d: `Search, Performance Max, conversões, Analytics, tracking e atualizações de plataforma. ${chips([{ href: LT.googleHelp, label: "Acessar" }])}` },
      ])}
    `)}
  `));

  /* — LIVROS — */
  P.push(page(`
    ${secHead("13", "Livros recomendados", "Três clássicos de publicidade e dados, para formar repertório além da plataforma.")}
    ${rules([
      { t: "Scientific Advertising — Claude Hopkins", d: `Testes, publicidade, mensagem, oferta e métricas. ${chips([{ href: LT.hopkins, label: "Livro" }])}` },
      { t: "Breakthrough Advertising — Eugene Schwartz", d: `Níveis de consciência, mercado, desejo, oferta e comunicação. ${chips([{ href: LT.schwartz, label: "Livro" }])}` },
      { t: "Lean Analytics — Croll e Yoskovitz", d: `Métricas, dados, análise e tomada de decisão. ${chips([{ href: LT.leanAnalytics, label: "Livro" }])}` },
    ], "grid2r")}
  `));

  /* — ROTINA SEMANAL — */
  P.push(page(`
    ${secHead("14", "Rotina semanal de desenvolvimento", "Toda semana o Gestor de Tráfego deve cumprir os cinco itens abaixo.")}
    ${rules([
      { t: "Conteúdo técnico", d: "Curso Meta, Google ou treinamento interno." },
      { t: "Conteúdo de referência", d: "1 conteúdo técnico recomendado." },
      { t: "Análise prática", d: "Selecionar pelo menos uma campanha real." },
      { t: "Aplicação", d: "Executar uma melhoria, hipótese ou análise." },
      { t: "Registro", d: "O que identifiquei? Qual dado sustenta? Qual ação recomendo? Qual resultado espero?" },
    ], "grid2r")}
    ${notabar("MODELO DE ACOMPANHAMENTO", "Para cada conteúdo: tema, prazo, status (não iniciado / em andamento / concluído), conteúdo, curso/link, aplicação prática, entregável e feedback do líder.")}
  `));

  /* — CRITÉRIO FINAL — */
  P.push(page(`
    ${secHead("15", "Critério final da trilha", "Ao final dos 90 dias, o que o Gestor de Tráfego precisa conseguir fazer.")}
    <div class="grid3">
      ${block("OPERAR", ["Estruturar campanhas.", "Operar Meta Ads.", "Operar Google Ads.", "Interpretar métricas."])}
      ${block("DIAGNOSTICAR", ["Diagnosticar problemas.", "Criar hipóteses.", "Otimizar campanhas.", "Analisar criativos."])}
      ${block("CONECTAR", ["Avaliar qualidade dos leads.", "Entender CRM e funil comercial.", "Conectar campanhas à receita.", "Criar testes e planos de escala."])}
    </div>
    <div class="commit">
      <span class="commit-pill">RESULTADO ESPERADO</span>
      <h3 class="commit-t">Não formar alguém que apenas sobe campanhas.</h3>
      <p class="commit-d">Formar um profissional que transforme <b>Dados → Diagnóstico → Decisão → Otimização → Resultado</b>. Gestor de Tráfego E3 = Performance + Dados + Estratégia + Negócio + Escala.</p>
    </div>
  `));

  const html = shell({
    title: "Trilha de Desenvolvimento — Gestor de Tráfego · E3 Digital",
    navTitle: "Trilha de Desenvolvimento · Gestor de Tráfego",
    logoUri: LOGO_URI,
    pages: P,
    pdfHref: "./trilha-gestor-trafego.pdf",
    pdfName: "Trilha de Desenvolvimento - Gestor de Trafego - E3 Digital.pdf",
  });
  const outDir = join(distRoot, "trilha-gestor-trafego");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  copyFileSync(join(pdfSrcDir, "trilha-gestor-trafego.pdf"), join(outDir, "trilha-gestor-trafego.pdf"));
  console.log("trilha gestor de tráfego:", outDir, "·", P.length, "páginas · PDF anexado");
}

buildAccount();
buildGestorProjetos();
buildGestorTrafego();
