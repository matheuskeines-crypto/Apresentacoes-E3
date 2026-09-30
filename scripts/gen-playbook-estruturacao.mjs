// Gera o Playbook de Funções (Estruturação PRO) em slides 16:9, prontos para impressão.
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
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const callout = makeCallout(svg);
const cardHead = makeCardHead(svg);
const tagPro = () => tag("ESTRUTURAÇÃO PRO", "tag-pro");

const NAV = [
  null, "Visão geral", "Frentes", "Squad",
  "Account Manager", "Gestor de Tráfego", "Gestor de Projetos",
  "Consultor Comercial", "SLA",
];
const { page, SECTIONS } = makePageFactory("PLAYBOOK · ESTRUTURAÇÃO PRO", NAV);

const P = [];

/* — CAPA — */
P.push(page(`
  <img class="logo" src="${LOGO_URI}" alt="E3"/>
  <p class="kicker cov-k">PLAYBOOK DE ENTREGA &amp; OPERAÇÃO · DOCUMENTO OPERACIONAL</p>
  <h1>Estruturação <span>PRO</span></h1>
  <p class="cov-sub">Escopo de entrega, cronograma operacional, funções da squad e diretrizes de execução — do diagnóstico 360° à consolidação da máquina de marketing, CRM e vendas para escritórios de advocacia.</p>
  <div class="pills">
    <span class="pill">DIAGNÓSTICO 360°</span><span class="pill">CRM &amp; IA</span>
    <span class="pill">SQUAD DE ENTREGA</span><span class="pill">FUNÇÕES &amp; KPIS</span><span class="pill">SLA DEFINIDO</span>
  </div>
  <div class="cov-rule"></div>
  <p class="cov-foot">E3 Digital · o hub de marketing e vendas para advogados</p>
`, { cover: true }));

/* — VISÃO GERAL — */
P.push(page(`
  ${split2(`
    <p class="kicker">VISÃO GERAL</p>
    <h2 class="h2">O que é a Estruturação PRO</h2>
    <p class="body">Este documento oficializa o <b>escopo de entrega</b>, o cronograma operacional, as <b>responsabilidades e os indicadores de cada função</b> e as diretrizes de execução do produto <b>Estruturação PRO</b>.</p>
    <p class="body">A Estruturação PRO parte do diagnóstico 360° e transforma o escritório em uma operação orientada a dados — com <b>CRM configurado</b>, <b>máquina de vendas</b> ativa e <b>mídia paga auditada</b>, pronto para a próxima fase de crescimento.</p>
    ${statRow([
      { v: "6", l: "Semanas de cronograma" },
      { v: "4", l: "Frentes de entrega" },
      { v: "3", l: "Reuniões estratégicas" },
      { v: "100%", l: "Meta de integração do CRM" },
    ])}
  `, `
    ${callout("activity", "COMO LER ESTE PLAYBOOK", "Do diagnóstico à consolidação", "Três blocos: as <b>frentes de entrega</b>, a <b>rotina e funções da squad</b> e o <b>Acordo de Nível de Serviço</b>.")}
    <div class="quote">
      <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
      <p>Não existe cliente do Account, do GP ou do GT. <b>O cliente é da E3</b> e está sob responsabilidade do squad como um todo — cada função assume <b>100%</b> pelas próprias entregas.</p>
    </div>
  `)}
`));

/* — FRENTES DE ENTREGA — */
P.push(page(`
  ${secHead("01", "Frentes de entrega do projeto", "A entrega está dividida de forma cirúrgica em quatro frentes principais de atuação ao longo de 6 semanas.")}
  <div class="pilares3">
    <div class="card">
      ${cardHead("target", "FRENTE 01", "Diagnóstico 360°")}
      ${feat([
        { t: "Avaliação de Maturidade", d: "Marketing, comercial e operacional — gargalos e oportunidades de monetização." },
        { t: "Score de Crescimento", d: "Dashboard com score geral e plano de ação priorizado." },
        { t: "Auditoria de Mídia Paga", d: "Raio-X da estrutura de anúncios e plano exato de campanhas." },
        { t: "Documento Executivo", d: "Entrega consolidada ao final das Semanas 1–2." },
      ])}
    </div>
    <div class="card">
      ${cardHead("check", "FRENTE 02", "CRM &amp; Auditoria Criativa")}
      ${feat([
        { t: "Implementação de CRM + IA", d: "Configuração de pipelines, follow-up e automações integradas ao Meta Ads." },
        { t: "Treinamento da Equipe", d: "CRM pronto e time treinado ao final da Semana 3." },
        { t: "Auditoria Criativa", d: "Análise de redes sociais, linha criativa ideal e roteiros de vídeo." },
        { t: "Guia de Comunicação", d: "Manual de tom de voz e roteiros prontos para gravação." },
      ])}
    </div>
    <div class="card">
      ${cardHead("handshake", "FRENTES 03 &amp; 04", "Comercial &amp; Mídia")}
      ${feat([
        { t: "Implementação Comercial", d: "Novos scripts, metas realistas e acompanhamento assistido de 30 dias." },
        { t: "Operação Comercial", d: "Processo no padrão E3 com aumento de conversão." },
        { t: "Acompanhamento de Campanha", d: "Monitoramento diário, otimização de orçamento e relatórios periódicos." },
        { t: "Performance Sustentável", d: "Crescimento controlado e ROI mensurável." },
      ])}
    </div>
  </div>
`));

/* — SQUAD — */
P.push(page(`
  ${secHead("02", "Rotina e funções da squad", "As entregas são distribuídas de forma sequencial ao longo das 6 semanas de projeto.")}
  ${tbl(["Função", "Entregáveis operacionais da equipe"], [
    ["CS · Gestora de Projeto", "Criação do grupo oficial de suporte. Organização do kickoff e agenda das semanas."],
    ["Coordenador", "Receber os acessos e organizar para a respectiva pessoa responsável."],
    ["Account Manager", "Onboarding e Kick-Off. Condução do Diagnóstico 360°, score de crescimento e reuniões estratégicas."],
    ["Gestor de Projeto", "Auditoria Criativa, guia de comunicação, relatório semanal e controle do ClickUp."],
    ["Gestor de Tráfego", "Auditoria de Mídia Paga. Configuração e otimização das campanhas. Relatório de performance."],
    ["Account ou Consultor Comercial", "Implementação de CRM + IA. Pipelines, automações e treinamento do time do escritório."],
    ["Consultor Comercial", "Implementação Comercial: scripts, metas, acompanhamento assistido de 30 dias e ativação do funil."],
  ])}
`));

/* — ACCOUNT MANAGER — */
P.push(page(`
  <div class="card">
    ${cardHead("users", "", "Account Manager", tagPro())}
    <div class="quote inline"><p><b>Foco:</b> liderança estratégica, diagnóstico e retenção. Conduz o projeto do diagnóstico ao fechamento do ciclo.</p></div>
    <div class="grid3">
      ${block("DIAGNÓSTICO 360°", ["Maturidade de marketing, comercial e operacional.", "Dashboard com score e plano priorizado."])}
      ${block("LIDERANÇA DA SQUAD", ["Acompanhar as demandas no ClickUp.", "Garantir prazos de cada frente."])}
      ${block("REUNIÕES ESTRATÉGICAS", ["As 3 reuniões de passagem de fase.", "Resultados e direcionamento."])}
      ${block("ONBOARDING", ["Validar tese e metas em D+0.", "Estratégia validada antes do início das frentes."])}
      ${block("PROTOCOLO DE CRISE", ["Diagnosticar falhas e analisar o CRM.", "Validar plano com a coordenação."])}
      ${block("PITCH DE RENOVAÇÃO", ["Relatório Final com ROI comprovado.", "Cronograma de continuidade na S6."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Diária · 09h–09h20", "Daily do squad: priorizar clientes e cobrar prazos."],
      ["Diária · dia todo", "Planos de ação e calls de alinhamento."],
      ["Semanal · sexta", "Atualização obrigatória da planilha BSC."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["Diagnóstico entregue (S2)", "<b>100%</b> dos documentos aprovados."],
      ["CRM em produção (S3)", "Fluxos testados e canais conectados."],
      ["Pitch de Renovação (S6)", "Relatório Final + continuidade."],
      ["Satisfação do cliente", "NPS alto e estável."],
    ])}
  `)}
`));

/* — GESTOR DE TRÁFEGO — */
P.push(page(`
  <div class="card">
    ${cardHead("chart", "", "Gestor de Tráfego", tagPro())}
    <div class="quote inline"><p><b>Foco:</b> auditoria de mídia, execução técnica e performance de campanhas. Converte o diagnóstico em campanhas eficientes e entrega crescimento sustentável de CPL.</p></div>
    <div class="grid2">
      ${block("AUDITORIA DE MÍDIA PAGA", ["Raio-X da estrutura de anúncios existente.", "Plano exato de campanhas e score de crescimento."])}
      ${block("EXECUÇÃO TÉCNICA", ["Configuração e estruturação de campanhas.", "Padronização de nomenclaturas e verba."])}
      ${block("OTIMIZAÇÃO DIÁRIA", ["Pausar o ineficiente, escalar o forte.", "Testes contínuos de público e criativo."])}
      ${block("ANÁLISE INTEGRADA", ["Com AM e GP, dados do CRM.", "Central de Leads e ClickUp atualizados."])}
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
      ["Auditoria de Mídia (até S2)", "Score geral + plano de campanhas entregues."],
      ["CPL / CPC / CTR / CPM", "Redução ou manutenção saudável pós-auditoria."],
      ["ROAS / ROI", "Investimento de mídia x novos honorários fechados."],
      ["Relatório semanal", "<b>100%</b> nas sextas."],
    ])}
  `)}
`));

/* — GESTOR DE PROJETOS — */
P.push(page(`
  <div class="card">
    ${cardHead("clipboard", "", "Gestor de Projetos", tagPro())}
    <div class="quote inline"><p><b>Foco:</b> organização, prazo e experiência do cliente. Responsável pela Auditoria Criativa e pelo cronograma de 6 semanas.</p></div>
    <div class="grid2">
      ${block("AUDITORIA CRIATIVA", ["Redes sociais e linha criativa ideal.", "Roteiros de vídeo e guia de comunicação."])}
      ${block("ONBOARDING", ["Validação de tese e metas.", "Card validado antes das frentes."])}
      ${block("EXECUÇÃO E ENTREGAS", ["Relatórios semanais e controle do ClickUp.", "Análise do CRM em busca de gaps."])}
      ${block("CONTROLE DE PRAZOS", ["ClickUp rigoroso, sem atrasos.", "Cobrança de <b>todas</b> as entregas."])}
    </div>
  </div>
  ${split2(`
    <h3 class="h3">Rotina</h3>
    ${tbl(["Quando", "O quê"], [
      ["Diária · 09h–09h20", "Daily: tarefas do dia e orientação do AM."],
      ["Diária · ao encerrar", "Responder todos os grupos. SLA 60 min."],
      ["Semanal · quarta", "Perguntas de qualificação e Painel E3."],
      ["Semanal · quinta", "Briefing de cada cliente no ClickUp."],
      ["Semanal · sexta", "Atualização obrigatória da planilha BSC."],
    ])}
  `, `
    <h3 class="h3">Principais KPIs</h3>
    ${tbl(["Indicador", "Meta"], [
      ["SLA de resposta", "Abaixo de <b>60 min</b>."],
      ["Guia de Comunicação (S3)", "Criativos e manual aprovados."],
      ["Entregas no prazo", "<b>100%</b>."],
      ["NPS", "Acima de <b>60</b>, resposta >50%."],
    ])}
  `)}
`));

/* — CONSULTOR COMERCIAL — */
P.push(page(`
  ${split2(`
    <div class="card">
      ${cardHead("handshake", "", "Consultor Comercial", tagPro())}
      <div class="quote inline"><p><b>Foco:</b> implementação comercial do escritório. Otimização do processo de vendas, novos scripts, metas realistas e acompanhamento assistido para o lead virar contrato.</p></div>
      <div class="grid2">
        ${block("IMPLEMENTAÇÃO DE CRM", ["Configuração completa de pipelines e automações.", "Integração ao Meta Ads e treinamento do time."])}
        ${block("IMPLEMENTAÇÃO COMERCIAL", ["Novos scripts e metas realistas.", "Acompanhamento assistido de 30 dias."])}
        ${block("ESTRUTURAÇÃO DO FUNIL", ["Funil, critérios e responsáveis definidos.", "Scripts ajustados à tese e área do cliente."])}
        ${block("DIAGNÓSTICO COMERCIAL", ["Auditoria do processo de vendas.", "Plano de correção validado com AM/GP/GT."])}
      </div>
    </div>
  `, `
    <h3 class="h3">Valor entregue ao projeto</h3>
    ${tbl(["Indicador", "Meta"], [
      ["CRM em produção (até S3)", "100% dos fluxos testados e equipe treinada."],
      ["Ativação Comercial (até S5)", "Scripts revisados e processo no padrão E3."],
      ["Taxa de conversão", "Evolução consistente da taxa de fechamento."],
      ["Tempo de resposta ao lead", "O menor possível após a entrada."],
      ["Aderência ao processo", "Script, CRM e rotina aplicados pelo cliente."],
    ])}
  `)}
`));

/* — SLA — */
P.push(page(`
  ${secHead("03", "Acordo de Nível de Serviço (SLA)", "Para o sucesso e a velocidade da Estruturação PRO, as diretrizes abaixo devem ser seguidas por E3 e cliente.")}
  ${rules([
    { t: "SLA de Retorno de Informações", d: "Acessos técnicos e formulários em <b>até 48h</b> após o onboarding." },
    { t: "Diagnóstico 360° e Auditoria (Semana 2)", d: "Dashboard, score geral e plano de campanhas entregues ao cliente." },
    { t: "CRM em Produção (Semana 3)", d: "Pipelines, automações e guia de comunicação homologados." },
    { t: "SLA de Atendimento no Grupo", d: "Mensagens respondidas em <b>até 60 minutos</b>, seg. a sex., 09h–18h." },
  ], "grid2r")}
  <div class="commit">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Do diagnóstico à consolidação, um ROI mensurável.</h3>
    <p class="commit-d">Cada prazo, função e KPI deste playbook existe para transformar o escritório em uma operação orientada a dados — com CRM, mídia e comercial integrados e prontos para crescer.</p>
  </div>
`));

const html = shell({
  title: "Playbook de Funções — Estruturação PRO · E3 Digital",
  navTitle: "Playbook de Funções · Estruturação PRO",
  logoUri: LOGO_URI,
  pages: P,
});

const outPath = process.argv[2] || fileURLToPath(new URL("../dist/playbook-estruturacao-pro/index.html", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log("playbook funções estruturação:", outPath, "·", P.length, "páginas");
