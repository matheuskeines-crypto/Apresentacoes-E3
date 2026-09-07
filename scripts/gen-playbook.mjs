// Gera o Playbook unificado (Assessoria Light & Pro) em HTML pronto para impressão.
import { readFileSync, writeFileSync } from "node:fs";

const LOGO = readFileSync("/Users/matheus/Desktop/e3-apresentacoes/logo_e3.b64", "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;

/* ── helpers de componente ───────────────────────────── */
let folio = 0;
const page = (_n, body, opts = {}) => `<section class="page${opts.cover ? " cover" : ""}">
  <div class="amb"></div>
  <div class="pbody">${body}</div>
  ${opts.cover ? "" : `<div class="pfoot"><span>PLAYBOOK · ASSESSORIA LIGHT &amp; PRO · <b>E3</b></span><span>${String(++folio).padStart(2, "0")}</span></div>`}
</section>`;

const secHead = (num, title, desc) => `<div class="sechead">
  <span class="secnum">${num}</span>
  <div><h2>${title}</h2><p class="lead">${desc}</p></div>
</div><div class="rule"></div>`;

const cardHead = (icon, kicker, title) => `<div class="chead">
  <span class="isq">${svg(icon)}</span>
  <div>${kicker ? `<p class="kicker">${kicker}</p>` : ""}<h3>${title}</h3></div>
</div>`;

const bul = (items) => `<ul class="bul">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const block = (kicker, items) => `<div class="blk"><p class="kicker">${kicker}</p>${bul(items)}</div>`;
const tbl = (head, rows, cls = "") => `<table class="tbl ${cls}"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const statRow = (items) => `<div class="stats">${items.map((s) => `<div class="stat"><span class="sv">${s.v}</span><span class="sl">${s.l}</span></div>`).join("")}</div>`;
const feat = (items) => `<div class="feats">${items.map((f) => `<div class="feat"><p class="ft">${f.t}</p><p class="fd">${f.d}</p></div>`).join("")}</div>`;
const callout = (icon, kicker, title, text) => `<div class="callout">
  <span class="isq">${svg(icon)}</span>
  <div><p class="kicker">${kicker}</p><h4>${title}</h4><p class="cd">${text}</p></div>
</div>`;

/* ═════════════ PÁGINAS ═════════════ */
const P = [];

/* — CAPA — */
P.push(page(0, `
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

/* — 01 VISÃO GERAL — */
P.push(page(1, `
  <p class="kicker">VISÃO GERAL</p>
  <h2 class="h2">O que é a Assessoria Light &amp; Pro</h2>
  <p class="body">Este documento oficializa o <b>escopo de entrega</b>, o cronograma operacional, as <b>responsabilidades e os indicadores de cada função</b> e as diretrizes de execução dos produtos <b>Assessoria Light</b> e <b>Assessoria Pro</b>. O escopo foi mapeado com base nos requisitos técnicos de Tráfego, Marketing e Receita estabelecidos para estas modalidades, garantindo previsibilidade de entrega e qualidade para o cliente.</p>
  <p class="body">A Assessoria é um produto integrado que une a <b>geração de demanda qualificada</b> (mídia paga) com a <b>estruturação da máquina de vendas</b> (CRM e processos comerciais), ideal para escritórios que já possuem investimento em tráfego e buscam otimizar seu fechamento de contratos.</p>
  ${statRow([
    { v: "3", l: "Pilares de atuação" },
    { v: "4", l: "Semanas de rampa de entrega" },
    { v: "15/15", l: "Consultorias quinzenais" },
    { v: "&lt;11%", l: "Meta de churn mensal" },
  ])}
  ${callout("activity", "COMO LER ESTE PLAYBOOK", "Da geração de leads ao fechamento", "O documento está organizado em três blocos: os <b>pilares de sucesso</b> (o que entregamos), a <b>rotina e as funções da squad</b> (quem faz, quando e com quais metas) e o <b>Acordo de Nível de Serviço</b> (os compromissos de prazo entre E3 e cliente).")}
  <div class="quote">
    <p class="qk">O PRINCÍPIO QUE ORGANIZA TUDO</p>
    <p>Não existe cliente do Account, do Gestor de Projetos ou do Gestor de Tráfego. <b>O cliente é da E3</b> e está sob a responsabilidade do squad como um todo.</p>
    <p>A partir disso, cada função assume <b>100% de responsabilidade</b> pelas próprias entregas, cumprindo rigorosamente metas e SLAs — sem terceirizar problemas para o colega nem para o próprio cliente.</p>
  </div>
`));

/* — 01 PILARES — */
P.push(page(2, `
  ${secHead("01", "Pilares de sucesso no projeto", "A entrega do produto está dividida de forma cirúrgica em três pilares principais de atuação.")}
  <div class="card">
    ${cardHead("target", "PILAR 01", "Tráfego Pago &amp; Performance")}
    ${feat([
      { t: "Gestão de Tráfego Pago", d: "Configuração, criação e otimização de campanhas de conversão no Google Ads ou Meta Ads." },
      { t: "Análise Diária de Métricas", d: "Monitoramento diário de CTR, CPC, Custo por Lead e volume para evitar desperdício de verba." },
      { t: "Estratégia de Campanhas", d: "Segmentação de público, palavras-chave de alta intenção e distribuição de orçamento por área." },
      { t: "Consultorias Quinzenais", d: "Reuniões a cada 15 dias: resultados, alinhamento de público e calibração de verba." },
      { t: "Relatório em Tempo Real Semanal", d: "Painel semanal com cliques, acessos à página e leads gerados no período." },
    ])}
  </div>
  <div class="card">
    ${cardHead("pen", "PILAR 02", "Criação &amp; Conversão")}
    ${feat([
      { t: "Criativos Estáticos", d: "Peças de design profissionais de alta conversão para os anúncios (Meta Ads)." },
      { t: "Copy para Anúncios e Páginas", d: "Redação persuasiva com foco em conversão para criativos e Landing Page de captura." },
    ])}
  </div>
  <div class="card">
    ${cardHead("check", "PILAR 03", "Máquina de Vendas &amp; Crescimento")}
    ${feat([
      { t: "Scripts de Vendas", d: "Roteiros de WhatsApp e ligação para triagem rápida e contorno de objeções de leads frios." },
      { t: "Implementação de CRM Padrão", d: "Setup completo, organização do funil e treinamento técnico do software comercial." },
      { t: "Cliente Oculto", d: "Auditoria simulando um lead real: tempo de resposta, aplicação do script e postura comercial." },
      { t: "Funil de Indicação", d: "Campanha \"Membro Ganha Membro\" para novos negócios com custo de aquisição zero." },
    ])}
  </div>
`));

/* — 02 ROTINA E FUNÇÕES: entregáveis sequenciais — */
P.push(page(3, `
  ${secHead("02", "Rotina e funções da squad", "Para garantir agilidade operacional, as entregas são distribuídas de forma sequencial ao longo das primeiras 4 semanas de projeto.")}
  ${tbl(["Função", "Entregáveis operacionais da equipe"], [
    ["CS · Gestora de Projeto", "Criação do grupo oficial de suporte. Início do setup do CRM Padrão."],
    ["Coordenador", "Receber os acessos e organizar para a respectiva pessoa responsável."],
    ["Account Manager", "Reunião de Onboarding e de Kick-Off. Alinhamento de estratégia, mapeamento do ICP e do posicionamento de mercado. Coleta de acessos às contas de anúncios — repassados para BM Principal, BM Operacional e Coordenador."],
    ["Gestor de Projeto", "Forecasting, onboarding quando necessário, roteiro de atendimento, toda a comunicação no grupo, planejamento e entrega das peças de design (criativos estáticos)."],
    ["Gestor de Tráfego", "Produzir copies de criativo e roteiro de anúncio. Análise de CRM junto ao Account quando necessário. Manutenção da central de leads atualizada. Configura, publica e inicia as campanhas de Tráfego Pago (Google/Meta)."],
    ["Gestor de Projeto", "Entrega dos Scripts de Vendas e do manual do CRM. Execução do teste de Cliente Oculto no comercial do cliente. Disparo do Relatório Semanal de Tráfego."],
    ["Consultor Comercial", "Acompanhamento comercial dos clientes <b>Pro</b>: direcionamento da rotina comercial, consultoria de vendas e estruturação do comercial do escritório. Primeira consultoria quinzenal e ativação do Funil de Indicação."],
  ])}
`));

/* — ACCOUNT MANAGER — */
P.push(page(4, `
  <div class="card">
    ${cardHead("users", "", "Account Manager")}
    <div class="quote inline"><p><b>Foco:</b> liderança, estratégia, retenção e monetização. Líder da squad responsável pelo cliente: conduz o relacionamento direto, traduz necessidades em entregas reais, define prioridades e monitora a performance para identificar oportunidades de crescimento.</p></div>
    <div class="grid2">
      ${block("GESTÃO ESTRATÉGICA", ["Conduzir o relacionamento direto e traduzir necessidades em <b>entregas reais</b>.", "Mapeamento de ICP, posicionamento e condução das consultorias quinzenais."])}
      ${block("LIDERANÇA DA SQUAD", ["Distribuir e acompanhar as demandas da equipe operacional.", "Acompanhamento ostensivo do ClickUp/Painel E3 para garantir prazo e eficiência."])}
      ${block("REUNIÕES &amp; APRESENTAÇÃO", ["Conduzir reuniões de estratégia, performance e resultados.", "Comunicação <b>clara e transparente</b> com o cliente."])}
      ${block("ONBOARDING DE NOVOS CLIENTES", ["Validar tese, metas do escritório e objetivos de campanha em D+0.", "Garantir estratégia/card validado antes de qualquer campanha iniciar."])}
      ${block("PROTOCOLO DE CRISE (RETENÇÃO)", ["Diagnosticar falhas operacionais/estratégicas e analisar o CRM.", "Validar o plano emergencial com a coordenação antes de acionar o cliente."])}
      ${block("TREINAMENTO COMERCIAL DO CLIENTE", ["Capacitar a equipe comercial dos clientes Light em conversão.", "Boas práticas de venda e acompanhamento da aplicação, quando aplicável."])}
    </div>
  </div>
  <h3 class="h3">Principais KPIs · Account Manager</h3>
  ${tbl(["Indicador", "Meta"], [
    ["Churn mensal", "Abaixo de <b>11%</b>."],
    ["NPS / LTV", "Alto e estável — clientes satisfeitos e engajados."],
    ["Upsell / cross-sell", "Geração ativa na base — <b>R$ 10.000 mensais</b>."],
    ["Resolução de crise", "Conta estabilizada dentro do prazo do plano de ação."],
  ])}
`));

/* — GESTOR DE TRÁFEGO — */
P.push(page(5, `
  <div class="card">
    ${cardHead("chart", "", "Gestor de Tráfego")}
    <div class="quote inline"><p><b>Foco:</b> performance de mídia paga, análise de dados e otimização diária. Converte o planejamento estratégico em campanhas eficientes para gerar leads qualificados e atingir metas.</p></div>
    <div class="grid2">
      ${block("ESTRATÉGIA E CRIAÇÃO", ["Desenvolver copies, roteiros de anúncio e definir abordagens.", "Estruturar briefings detalhados para a equipe de criação."])}
      ${block("EXECUÇÃO TÉCNICA", ["Configuração, publicação e estruturação de campanhas (Google e Meta Ads).", "Padronização rigorosa de nomenclaturas e controle de verba."])}
      ${block("OTIMIZAÇÃO DIÁRIA (REGRA DE OURO)", ["Pausar o ineficiente, escalar o de alta performance.", "Testes contínuos de público, criativo e segmentação."])}
      ${block("ANÁLISE INTEGRADA", ["Com AM e GP, diagnosticar os dados do CRM: da geração do lead ao fechamento.", "Central de Leads e ClickUp sempre atualizados na sua área."])}
    </div>
  </div>
  <h3 class="h3">Principais KPIs · Gestor de Tráfego</h3>
  ${tbl(["Indicador", "Meta"], [
    ["CPL / CPC / CTR / CPM", "Dentro da meta de cada tese/cliente."],
    ["ROI", "Dentro da meta de cada cliente."],
    ["Estabilidade da base", "Acima de <b>60%</b> dos clientes estáveis."],
    ["Apoio à retenção", "Contribuição direta para churn <b>abaixo de 11%</b>."],
  ])}
`));

/* — GESTOR DE PROJETOS — */
P.push(page(6, `
  <div class="card">
    ${cardHead("clipboard", "", "Gestor de Projetos")}
    <div class="quote inline"><p><b>Foco:</b> organização, comunicação, prazo e experiência do cliente. Transforma a estratégia do Account em entregas reais, com previsibilidade e comunicação ágil.</p></div>
    <div class="grid2">
      ${block("COMUNICAÇÃO E PREVENÇÃO", ["Triagem de demandas no grupo: anúncios vão para o GT, estratégico/comercial vai para o AM.", "Detecção antecipada de insatisfação, com acionamento imediato do AM."])}
      ${block("ONBOARDING", ["Condução do onboarding com validação de tese, metas e objetivos de campanha.", "Garantir estratégia/card validado antes do início, para mitigar erro na largada."])}
      ${block("EXECUÇÃO E ENTREGAS", ["Testes de Cliente Oculto, relatórios semanais no ClickUp e manuais de CRM/roteiro de atendimento.", "Análise periódica do CRM dos clientes em busca de gaps e oportunidades no comercial."])}
      ${block("PROCESSOS E CONTROLE DE PRAZOS", ["ClickUp rigoroso: nenhum cliente 7+ dias sem atualização; onboarding/risco, 3+ dias.", "Cobrança do prazo de <b>todas</b> as entregas do squad, inclusive criativos e roteiros da equipe de design."])}
    </div>
  </div>
  <h3 class="h3">Principais KPIs · Gestor de Projetos</h3>
  ${tbl(["Indicador", "Meta"], [
    ["SLA de resposta", "Abaixo de <b>60 minutos</b>."],
    ["Entregas no prazo", "<b>100%</b>."],
    ["NPS", "Acima de <b>60</b>, com taxa de resposta acima de 50%."],
    ["Monetização", "Gerar até <b>8 oportunidades</b> por mês."],
  ])}
`));

/* — CONSULTOR COMERCIAL (exclusivo Pro) — */
P.push(page(0, `
  <div class="card">
    ${cardHead("handshake", "EXCLUSIVO ASSESSORIA PRO", "Consultor Comercial")}
    <div class="quote inline"><p><b>Foco:</b> o comercial do escritório. Responsável por todo o acompanhamento comercial dos clientes <b>Pro</b> — dá o direcionamento da rotina comercial, conduz a consultoria de vendas e estrutura a operação comercial do cliente para que o lead gerado vire contrato assinado.</p></div>
    <div class="grid2">
      ${block("ROTINA COMERCIAL DO CLIENTE", ["Definir e implantar a rotina comercial do escritório: cadência de contato, follow-up e metas.", "Direcionar o time do cliente sobre disciplina de CRM e uso do funil no dia a dia."])}
      ${block("CONSULTORIA DE VENDAS", ["Reuniões quinzenais de consultoria comercial com o escritório.", "Treinamento de abordagem, qualificação, contorno de objeções e fechamento."])}
      ${block("ESTRUTURAÇÃO DO COMERCIAL", ["Desenhar o processo comercial: etapas do funil, critérios de qualificação e responsáveis.", "Ajustar scripts de vendas e roteiro de atendimento à realidade da tese do cliente."])}
      ${block("ACOMPANHAMENTO &amp; DIAGNÓSTICO", ["Diagnóstico do comercial do escritório e plano de correção com o time do cliente.", "Análise do funil (leads, MQL, SQL e fechamentos) junto com AM, GP e GT."])}
    </div>
  </div>
  <h3 class="h3">Valor entregue ao projeto</h3>
  ${tbl(["Indicador", "Meta"], [
    ["Conversão de lead em contrato", "Evolução consistente da taxa de fechamento do escritório."],
    ["Tempo de resposta ao lead", "Contato com o lead no menor tempo possível após a entrada."],
    ["Aderência ao processo", "Script, CRM e rotina comercial aplicados pelo time do cliente."],
    ["Apoio à retenção", "Resultado comercial sustentando renovação e upgrade de plano."],
  ])}
`));

/* — 03 SLA — */
P.push(page(0, `
  ${secHead("03", "Acordo de Nível de Serviço (SLA)", "Para o sucesso e a velocidade da Assessoria Light &amp; Pro, as seguintes diretrizes devem ser seguidas por E3 e cliente.")}
  <div class="rules">
    <div class="rule-item"><span class="nbadge">1</span><div><p class="rt">SLA de Retorno de Informações</p><p class="rd">O cliente se compromete a fornecer os <b>acessos técnicos e formulários em até 48 horas</b> após o onboarding.</p></div></div>
    <div class="rule-item"><span class="nbadge">2</span><div><p class="rt">Prazo de Produção de Criativos</p><p class="rd">A equipe criativa entrega as artes e textos em <b>até 5 dias úteis</b> após a aprovação do roteiro conceitual.</p></div></div>
    <div class="rule-item"><span class="nbadge">3</span><div><p class="rt">Frequência de Relatórios</p><p class="rd">O dashboard consolidado de métricas em tempo real é atualizado e compartilhado com o cliente <b>todas as sextas-feiras</b>.</p></div></div>
    <div class="rule-item"><span class="nbadge">4</span><div><p class="rt">SLA de Atendimento no Grupo</p><p class="rd">Toda mensagem do cliente é respondida em <b>até 60 minutos</b>, de segunda a sexta, das 09h às 18h.</p></div></div>
  </div>
  <div class="commit">
    <span class="commit-pill">COMPROMISSO E3</span>
    <h3 class="commit-t">Previsibilidade de entrega, do lead ao contrato.</h3>
    <p class="commit-d">Cada prazo, função e KPI deste playbook existe para transformar investimento em mídia em fechamento de contratos — com dados, disciplina e relacionamento.</p>
  </div>
`));

/* ═════════════ HTML + CSS ═════════════ */
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
.h3{font-family:var(--d);font-weight:800;font-size:19px;letter-spacing:-.01em;margin:22px 0 12px}
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
.quote.inline{margin:16px 0 20px;background:rgba(255,255,255,.02);border-left:2px solid var(--o)}
.quote.inline p{color:rgba(255,255,255,.75);margin:0}
.quote.inline b{color:var(--o)}
/* sechead */
.sechead{display:flex;align-items:flex-start;gap:18px;margin-bottom:14px}
.secnum{font-family:var(--d);font-weight:800;font-size:48px;line-height:.8;color:transparent;-webkit-text-stroke:1.5px rgba(255,95,31,.6)}
.sechead h2{font-family:var(--d);font-weight:800;font-size:24px;letter-spacing:-.01em;margin-bottom:6px}
.sechead .lead{font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.5}
.rule{height:1px;background:rgba(255,255,255,.1);margin-bottom:20px}
/* cards */
.card{border:1px solid rgba(255,255,255,.1);border-radius:18px;background:rgba(255,255,255,.02);padding:22px 24px;margin-bottom:18px}
.chead{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.chead h3{font-family:var(--d);font-weight:800;font-size:18px}
.chead .kicker{margin-bottom:2px}
/* feats (pilares) */
.feats{display:grid;grid-template-columns:repeat(2,1fr);gap:14px 20px}
.feat{position:relative;padding-left:14px}
.feat::before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:999px;background:var(--o)}
.ft{font-family:var(--s);font-weight:700;font-size:13px;margin-bottom:3px}
.fd{font-size:11.5px;color:rgba(255,255,255,.5);line-height:1.45}
/* grid2 / blk / bul (funções) */
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px 28px}
.blk .kicker{font-size:10px;letter-spacing:.12em;margin-bottom:8px}
.bul{list-style:none}
.bul li{position:relative;padding-left:14px;font-size:12px;line-height:1.5;color:rgba(255,255,255,.72);margin-bottom:7px}
.bul li::before{content:"";position:absolute;left:0;top:6px;width:5px;height:5px;border-radius:999px;background:var(--o)}
.bul li b{color:#fff}
/* tabelas */
.tbl{width:100%;border-collapse:collapse;font-size:12px;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden}
.tbl th{background:linear-gradient(90deg,rgba(255,95,31,.16),rgba(255,51,0,.05));color:var(--o);text-align:left;padding:11px 16px;font-family:var(--d);font-weight:700;font-size:11.5px;letter-spacing:.02em}
.tbl td{padding:11px 16px;border-top:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.7);vertical-align:top;line-height:1.5}
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

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<title>Playbook · Assessoria Light &amp; Pro — E3 Digital</title>
<style>${STYLE}</style>
</head><body>${P.join("\n")}</body></html>`;

const outPath = process.argv[2] || "playbook.html";
writeFileSync(outPath, html, "utf8");
console.log("HTML gerado:", outPath, "·", P.length, "páginas");
