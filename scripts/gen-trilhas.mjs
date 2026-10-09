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

buildAccount();
