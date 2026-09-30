// Gera o Playbook de Funções (Assessoria Light & Pro) em slides 16:9, prontos para impressão.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow, feat,
  makeCallout, makeCardHead, tag, block, rules, split2, notabar,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const cardHead = makeCardHead(svg);
const tagBoth = () => tag("LIGHT &amp; PRO", "tag-both");
const tagPro = () => tag("EXCLUSIVO PRO", "tag-pro");
const tagLight = () => tag("LIGHT", "tag-light");
const legend = () => `<div class="legend">
  <div class="lg-item">${tagBoth()}<span>a função atua em contas <b>Light</b> e <b>Pro</b></span></div>
  <div class="lg-item">${tagLight()}<span>entrega <b>exclusiva</b> de clientes Light</span></div>
  <div class="lg-item">${tagPro()}<span>entrega ou função <b>exclusiva</b> de clientes Pro</span></div>
</div>`;

const NAV = [
  null, "Visão geral", "Pilares", "Squad",
  "Account Manager", "Gestor de Tráfego", "Gestor de Projetos",
  "Consultor Comercial", "SLA",
  "Cadência do Squad", "Regras de Ouro", "Onboarding", "Alta Performance",
];
const { page, SECTIONS } = makePageFactory("PLAYBOOK · ASSESSORIA LIGHT & PRO", NAV);

const P = [];

/* — CAPA — */
P.push(page(`
  <img class="logo" src="${LOGO_URI}" alt="E3"/>
  <p class="kicker cov-k">PLAYBOOK DE ENTREGA &amp; OPERAÇÃO · DOCUMENTO OPERACIONAL</p>
  <h1>Assessoria <span>Light &amp; Pro</span></h1>
  <p class="cov-sub">Escopo de entrega, cronograma operacional, funções da squad e diretrizes de execução — a máquina de demanda qualificada e fechamento de contratos para escritórios de advocacia.</p>
  <div class="pills">
    <span class="pill">TRÁFEGO PAGO</span><span class="pill">CRM &amp; COMERCIAL</span>
    <span class="pill">SQUAD DE PERFORMANCE</span><span class="pill">FUNÇÕES &amp; KPIS</span><span class="pill">SLA DEFINIDO</span>
  </div>
  <div class="cov-rule"></div>
  <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
`, { cover: true }));

/* — VISÃO GERAL — */
P.push(page(`
  ${split2(`
    <p class="kicker">VISÃO GERAL</p>
    <h2 class="h2">O que é a Assessoria Light &amp; Pro</h2>
    <p class="body">Este documento oficializa o <b>escopo de entrega</b>, o cronograma operacional, as <b>responsabilidades e os indicadores de cada função</b> e as diretrizes de execução dos produtos <b>Assessoria Light</b> e <b>Assessoria Pro</b>.</p>
    <p class="body">A Assessoria une a <b>geração de demanda qualificada</b> (mídia paga) com a <b>estruturação da máquina de vendas</b> (CRM e processos comerciais), ideal para escritórios que já investem em tráfego e buscam otimizar o fechamento.</p>
    ${statRow([
      { v: "3", l: "Pilares de atuação" },
      { v: "4", l: "Semanas de rampa" },
      { v: "15/15", l: "Consultorias quinzenais" },
      { v: "&lt;11%", l: "Meta de churn" },
    ])}
  `, `
    ${callout("activity", "COMO LER ESTE PLAYBOOK", "Da geração de leads ao fechamento", "Três blocos: os <b>pilares de sucesso</b>, a <b>rotina e funções da squad</b> e o <b>Acordo de Nível de Serviço</b>.")}
    <p class="kicker" style="margin-bottom:6px">LEGENDA · LIGHT OU PRO</p>
    ${legend()}
    <div class="quote">
      <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
      <p>Não existe cliente do Account, do GP ou do GT. <b>O cliente é da E3</b> e está sob responsabilidade do squad como um todo — cada função assume <b>100%</b> pelas próprias entregas.</p>
    </div>
  `)}
`));

/* — PILARES — */
P.push(page(`
  ${secHead("01", "Pilares de sucesso no projeto", "A entrega está dividida de forma cirúrgica em três pilares principais de atuação.")}
  <div class="pilares3">
    <div class="card">
      ${cardHead("target", "PILAR 01", "Tráfego Pago &amp; Performance")}
      ${feat([
        { t: "Gestão de Tráfego Pago", d: "Configuração, criação e otimização de campanhas no Google Ads ou Meta Ads." },
        { t: "Análise Diária de Métricas", d: "Monitoramento de CTR, CPC, Custo por Lead e volume." },
        { t: "Estratégia de Campanhas", d: "Segmentação, palavras-chave de alta intenção e orçamento por área." },
        { t: "Consultorias Quinzenais", d: "Resultados, alinhamento de público e calibração de verba." },
        { t: "Relatório Semanal", d: "Painel com cliques, acessos e leads gerados." },
      ])}
    </div>
    <div class="card">
      ${cardHead("pen", "PILAR 02", "Criação &amp; Conversão")}
      ${feat([
        { t: "Criativos Estáticos", d: "Peças de design de alta conversão para os anúncios (Meta Ads)." },
        { t: "Copy para Anúncios e Páginas", d: "Redação persuasiva para criativos e Landing Page." },
      ])}
    </div>
    <div class="card">
      ${cardHead("check", "PILAR 03", "Máquina de Vendas &amp; Crescimento")}
      ${feat([
        { t: "Scripts de Vendas", d: "Roteiros de WhatsApp e ligação para triagem e objeções." },
        { t: "CRM Padrão", d: "Setup completo, funil organizado e treinamento do time." },
        { t: "Cliente Oculto", d: "Auditoria simulando um lead real." },
        { t: "Funil de Indicação", d: "\"Membro Ganha Membro\", custo de aquisição zero." },
      ])}
    </div>
  </div>
`));

/* — SQUAD — */
P.push(page(`
  ${secHead("02", "Rotina e funções da squad", "As entregas são distribuídas de forma sequencial ao longo das primeiras 4 semanas de projeto.")}
  ${tbl(["Função", "Entregáveis operacionais da equipe"], [
    ["CS", "Criação do grupo oficial de suporte e orientação inicial para o cliente extrair valor rapidamente da solução. Início do setup do CRM Padrão. Monitoramento contínuo do Health Score para identificar risco de evasão."],
    ["Gestora de Automação", "Integração de sistemas (ex.: chatbot de WhatsApp + CRM/IA). Monitoramento em tempo real para ajustar fluxos, melhorar a experiência do usuário e evitar falhas."],
    ["Coordenador", "Receber os acessos e organizar para a respectiva pessoa responsável."],
    ["Account Manager", "Onboarding e Kick-Off. Alinhamento de estratégia, ICP e posicionamento. Coleta de acessos às contas de anúncios."],
    ["Gestor de Projeto", "Forecasting, onboarding, roteiro de atendimento, comunicação no grupo e entrega das peças de design."],
    ["Gestor de Tráfego", "Copies e roteiro de anúncio. Análise de CRM com o Account. Configura, publica e inicia as campanhas."],
    ["Gestor de Projeto", "Scripts de Vendas e manual do CRM. Teste de Cliente Oculto. Relatório Semanal de Tráfego."],
    ["Consultor Comercial", "Acompanhamento comercial dos clientes <b>Pro</b>: rotina comercial, consultoria de vendas e estruturação. Ativação do Funil de Indicação."],
  ])}
`));

/* — ACCOUNT MANAGER — */
P.push(page(`
  <div class="card">
    ${cardHead("users", "", "Account Manager", tagBoth())}
    <div class="quote inline"><p><b>Foco:</b> liderança, estratégia, retenção e monetização. Líder da squad: conduz o relacionamento direto com o cliente, traduz necessidades em entregas reais, define objetivos e prioridades e monitora a performance para identificar oportunidades de crescimento.</p></div>
    <div class="grid3">
      ${block("GESTÃO ESTRATÉGICA", ["Conduzir o relacionamento com o cliente.", "Definir prioridades e oportunidades de upsell."])}
      ${block("LIDERANÇA DA SQUAD", ["Distribuir e acompanhar as demandas.", "Supervisionar GT e GP, garantindo prazo."])}
      ${block("REUNIÕES &amp; APRESENTAÇÃO", ["Estratégia, performance e resultados.", "Comunicação <b>clara e transparente</b>."])}
      ${block("ONBOARDING DE CLIENTES", ["Validar acessos (Meta, Google, CRM).", "Atraso em D+0 é falha de gestão."])}
      ${block("PROTOCOLO DE CRISE", ["Diagnosticar falhas e analisar o CRM.", "Validar plano com o Coordenador."])}
      ${block("LIDERANÇA DE EQUIPE", ["Garantir entregas no prazo no ClickUp.", "Atualizar a BSC toda sexta-feira."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Diária · 09h–09h20", "Daily do squad: organizar a rotina, priorizar clientes e cobrar prazos."],
      ["Diária · dia todo", "Planos de ação atualizados. Calls de retenção e alinhamento."],
      ["Semanal · sexta", "Atualização obrigatória da planilha BSC."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["Churn mensal", "Abaixo de <b>10%</b>."],
      ["LTV / NPS", "Clientes estáveis, satisfeitos e engajados."],
      ["Upsell", "Monetização da base com upsell e cross-sell."],
      ["Resolução de crise", "Dentro do prazo do plano de ação."],
    ])}
  `)}
`));

/* — GESTOR DE TRÁFEGO — */
P.push(page(`
  <div class="card">
    ${cardHead("chart", "", "Gestor de Tráfego", tagBoth())}
    <div class="quote inline"><p><b>Missão:</b> planejar, executar, otimizar e analisar campanhas de mídia paga, convertendo o planejamento estratégico em campanhas eficientes para gerar leads qualificados e atingir metas.</p></div>
    <div class="grid2">
      ${block("ATRIBUIÇÃO CRIATIVA", ["Definir ângulos, redigir copies e estruturar briefings.", "Direcionar testes com a equipe de criação."])}
      ${block("EXECUÇÃO DE CAMPANHAS", ["Planejar, criar e estruturar contas e anúncios.", "Padronização de nomenclaturas e controle de verba."])}
      ${block("OTIMIZAÇÃO DIÁRIA · REGRA DE OURO", ["Pausar o ineficiente, escalar o de alta performance.", "Testes contínuos de criativos, públicos e copies."])}
      ${block("ANÁLISE DE PERFORMANCE", ["Comparar criativos, copies, públicos e vídeos.", "Com AM/GP, analisar o CRM para achar o gargalo."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Diária · 09h–09h20", "Daily do squad: campanhas em risco para priorizar."],
      ["Diária · dia todo", "Saldo de investimento e campanhas em conflito."],
      ["Semanal · seg/ter", "Otimizar e analisar todas as campanhas da base."],
      ["Semanal · sexta", "Métricas no ClickUp e planilha BSC."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["CPL / CPC", "Monitorados diariamente."],
      ["CTR / CPM", "Clique e custo por mil impressões."],
      ["ROI", "Conversão, qualidade dos leads e retorno."],
      ["Estabilidade da base", "Acima de <b>60%</b> estáveis."],
      ["Apoio à retenção", "Churn <b>abaixo de 10%</b> junto à squad."],
    ])}
  `)}
`));

/* — GESTOR DE PROJETOS — */
P.push(page(`
  <div class="card">
    ${cardHead("clipboard", "", "Gestor de Projetos", tagBoth())}
    <div class="quote inline"><p><b>Missão:</b> organização, previsibilidade e cumprimento de prazos — transformando a estratégia do Account em entregas reais.</p></div>
    <div class="grid2">
      ${block("GESTÃO DE DEMANDAS", ["Triagem: anúncios ao GT, comercial ao AM.", "Roteiros de vídeo e ajustes de criativos."])}
      ${block("PREVENÇÃO DE CRISE", ["Detectar descontentamento nos grupos.", "Acionar o Account Manager de imediato."])}
      ${block("ONBOARDING &amp; FORECASTING", ["Onboarding operacional e coleta de materiais.", "Reunião mensal de forecasting e projeções."])}
      ${block("CONTROLE DE PRAZOS", ["ClickUp 100% atualizado, sem atrasos.", "Monetização: oportunidades no mês."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Diária · 09h–09h20", "Daily: tarefas do dia e orientação do AM."],
      ["Diária · antes de encerrar", "Responder todos os grupos. SLA 60 min."],
      ["Semanal · quarta", "Perguntas de qualificação e Painel E3."],
      ["Semanal · quinta", "Briefing semanal de cada cliente no ClickUp."],
      ["Semanal · sexta", "Atualização obrigatória da planilha BSC."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["SLA de resposta", "Abaixo de <b>60 min</b>."],
      ["Entregas no prazo", "<b>100%</b>."],
      ["NPS", "Acima de <b>70%</b>, resposta &gt;50%."],
      ["Monetização", "Meta mensal de oportunidades batida."],
    ])}
  `)}
`));

/* — CONSULTOR COMERCIAL (exclusivo Pro) — */
P.push(page(`
  ${split2(`
    <div class="card">
      ${cardHead("handshake", "", "Consultor Comercial", tagPro())}
      <div class="quote inline"><p><b>Foco:</b> comercial do escritório. Acompanhamento comercial dos clientes <b>Pro</b> — rotina, consultoria de vendas e estruturação para o lead virar contrato.</p></div>
      <div class="grid2">
        ${block("ROTINA COMERCIAL", ["Cadência, follow-up e metas.", "Disciplina de CRM e uso do funil."])}
        ${block("CONSULTORIA DE VENDAS", ["Reuniões quinzenais.", "Abordagem, qualificação e fechamento."])}
        ${block("ESTRUTURAÇÃO", ["Funil, critérios e responsáveis.", "Scripts ajustados à tese do cliente."])}
        ${block("DIAGNÓSTICO", ["Plano de correção com o cliente.", "Funil (leads, MQL, SQL) com AM/GP/GT."])}
      </div>
    </div>
  `, `
    <h3 class="h3">Valor entregue ao projeto</h3>
    ${tbl(["Indicador", "Meta"], [
      ["Conversão de lead em contrato", "Evolução consistente da taxa de fechamento."],
      ["Tempo de resposta ao lead", "O menor possível após a entrada."],
      ["Aderência ao processo", "Script, CRM e rotina aplicados pelo cliente."],
      ["Apoio à retenção", "Sustentando renovação e upgrade de plano."],
    ])}
  `)}
`));

/* — SLA — */
P.push(page(`
  ${secHead("03", "Acordo de Nível de Serviço (SLA)", "Para o sucesso e a velocidade da Assessoria, as diretrizes abaixo devem ser seguidas por E3 e cliente.")}
  ${rules([
    { t: "SLA de Retorno de Informações", d: "Acessos técnicos e formulários em <b>até 48h</b> após o onboarding." },
    { t: "Prazo de Produção de Criativos", d: "Artes e textos em <b>até 5 dias úteis</b> após a aprovação do roteiro." },
    { t: "Frequência de Relatórios", d: "Dashboard atualizado e compartilhado <b>todas as sextas</b>." },
    { t: "SLA de Atendimento no Grupo", d: "Mensagens respondidas em <b>até 60 minutos</b>, seg. a sex., 09h–18h." },
  ], "grid2r")}
  <div class="commit">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Previsibilidade de entrega, do lead ao contrato.</h3>
    <p class="commit-d">Cada prazo, função e KPI deste playbook existe para transformar investimento em mídia em fechamento de contratos — com dados, disciplina e relacionamento.</p>
  </div>
`));

/* — CADÊNCIA COLETIVA DO SQUAD — */
P.push(page(`
  ${secHead("04", "Cadência Coletiva do Squad", "A visão consolidada da semana — útil para fixar no grupo ou no quadro do squad.")}
  ${tbl(["Quando", "O quê", "Quem"], [
    ["Todo dia, 09h–09h20", "Daily: otimizar a rotina e priorizar clientes em risco/conflito.", "Todos"],
    ["Segunda e terça de manhã", "Otimização e análise de todas as campanhas da base.", "GT"],
    ["Quarta-feira", "Perguntas de qualificação + preenchimento do Painel E3.", "GP"],
    ["Quinta-feira", "Atualização do briefing semanal no ClickUp.", "GP"],
    ["Sexta-feira", "Atualização das métricas dos clientes no ClickUp.", "GT"],
    ["Sexta-feira", "Atualização da planilha BSC.", "Todos"],
  ])}
  ${split2(
    block("DIARIAMENTE, POR FUNÇÃO", [
      "<b>GT</b> — checa o saldo de verba de cada cliente.",
      "<b>GP</b> — passa em todos os grupos e não sai sem responder. SLA em dia é inegociável.",
      "<b>AM</b> — mantém os planos de ação sempre atualizados.",
    ]),
    block("MENSALMENTE", [
      "<b>AM/GP</b> — no mínimo 2 calls com cada cliente da carteira.",
      "<b>GP</b> — 1 reunião de forecasting, com o painel preenchido.",
    ])
  )}
`));

/* — REGRAS DE OURO — */
P.push(page(`
  ${secHead("05", "Regras de Ouro — Como Agir", "Valem para o squad inteiro, independente da função — o que transforma este playbook em referência de consulta, não só numa lista de tarefas.")}
  ${rules([
    { t: "Campanha nova entrou no ar", d: "O GT avisa o cliente no grupo, com clareza dos próximos passos e o número de onde os leads vão chegar." },
    { t: "Qualificação de quarta-feira", d: "O GP não só registra a resposta: sonda o motivo da desqualificação e devolve o gap para o GT ajustar." },
    { t: "Cliente reclama de leads desqualificados", d: "Busque antes os 4 números do funil — leads, MQL, SQL, fechamentos. Sem dado não existe parecer, só achismo." },
    { t: "Problema não é da nossa equipe (ex.: financeiro)", d: "Resolva mesmo assim, o mais rápido possível. O cliente é da E3 — não existe “isso não é comigo”." },
  ], "grid2r")}
  <div class="quote">
    <p class="qk">MENSAGEM PADRÃO · EXEMPLO (CAMPANHA NO AR)</p>
    <p>"Olá Dr. [NOME], sua campanha de [TESE(S)] em breve estará no ar e os leads vão começar a chegar no número [XXXX], conforme alinhado."</p>
  </div>
`));

/* — CHECKLIST DE ONBOARDING — */
P.push(page(`
  ${secHead("06", "Checklist de Onboarding", "Sequência dos primeiros dias de um cliente novo, e a responsabilidade de cada função.")}
  ${split2(
    tbl(["Etapa", "Prazo", "Resp."], [
      ["Reunião de onboarding", "1 dia", "AM/GP"],
      ["Treinamento online", "Imediato", "AM/GP"],
      ["CRM grátis (Light, sem IA)", "Imediato", "AM/GP"],
      ["Copy dos criativos estáticos", "Até 24h", "GT"],
      ["Roteiro e orientação (vídeo)", "Até 24h", "GT"],
      ["Exemplos de vídeos, se houver", "Até 24h", "GT"],
    ]),
    tbl(["Etapa", "Prazo", "Resp."], [
      ["Roteiro de atendimento (lead)", "Até 24h", "GP"],
      ["Fixar PGM na descrição do grupo", "Até 48h", "GP"],
      ["Criativos estáticos prontos", "3 dias úteis", "GP"],
      ["Conexão da plataforma / acessos", "Até 1 dia", "GT"],
      ["Criativo fixado + início campanhas", "Até 1 dia", "GT"],
      ["Atualização do ClickUp", "A cada 3 dias", "GP"],
    ])
  )}
`));

/* — SQUAD EM ALTA PERFORMANCE — */
P.push(page(`
  ${secHead("07", "Squad em Alta Performance", "Práticas que separam um squad organizado de um squad que só apaga incêndio.")}
  <div class="grid3">
    ${block("PROTEÇÃO DO TEMPO DO GT", ["Direcione dúvida de anúncio ao GP primeiro.", "GT só entra quando for tecnicamente necessário."])}
    ${block("PADRONIZE ANTES DE ESCALAR", ["Comece do que já converteu em teses parecidas.", "Nomenclatura única de campanha e criativo."])}
    ${block("CRM NÃO É SÓ PLANILHA BONITA", ["Cruze Leads × MQL × SQL × Fechamento toda semana.", "Revela se o gargalo é campanha ou comercial."])}
    ${block("DAILY COMO FILTRO", ["3 perguntas: ontem, hoje, bloqueio.", "Passou de 20 min? Vira conversa à parte."])}
    ${block("EM CRISE, O SQUAD ATACA JUNTO", ["Bloqueio crítico é atacado em conjunto.", "Cliente em crise não espera na fila normal."])}
    ${block("BACKLOG PRIORIZADO", ["Impacto × urgência × esforço — não chegada.", "Demanda pequena não fura fila de algo crítico."])}
  </div>
  ${notabar("RETROSPECTIVA QUINZENAL", "2x ao mês, o squad discute o que funcionou, o que travou e uma mudança para testar até a próxima — melhoria contínua do time, não cobrança de cima para baixo.")}
`));

const html = shell({
  title: "Playbook de Funções — Assessoria Light &amp; Pro · E3 Digital",
  navTitle: "Playbook de Funções · Assessoria Light &amp; Pro",
  logoUri: LOGO_URI,
  pages: P,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/playbook-assessoria-light-pro/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("playbook funções:", outPath, "·", P.length, "páginas");
