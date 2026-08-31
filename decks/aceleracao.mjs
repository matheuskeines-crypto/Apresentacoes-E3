// Aceleração Comercial (8 semanas) — proposta (vertical) + onboarding (deck)
const quemSomos = { type: "stats", kicker: "Quem somos", title: "A maior assessoria de marketing jurídico do Brasil",
  items: [
    { v: "+1.000", l: "escritórios atendidos" },
    { v: "R$ 200M+", l: "em honorários gerados para clientes" },
    { v: "#1", l: "em marketing jurídico no Brasil" },
  ], note: "Vivemos o mercado jurídico e sabemos exatamente o que converte." };

const jornada = {
  type: "journey", kicker: "A jornada", title: "8 semanas, semana a semana",
  steps: [
    { label: "Semana 1", icon: "target", title: "Diagnóstico & ICP", desc: "Mapeamos seu cliente ideal e os gargalos de conversão." },
    { label: "Semana 2", icon: "cog", title: "Setup de CRM", desc: "CRM configurado e integrado à sua mídia paga ativa." },
    { label: "Semana 3", icon: "message", title: "Engenharia de Scripts", desc: "Abordagem, triagem e quebra de objeção no WhatsApp." },
    { label: "Semana 4", icon: "users", title: "Treinamento do Time", desc: "Sua equipe treinada no SLA de resposta rápida." },
    { label: "Semana 5", icon: "zap", title: "Go-Live Assistido", desc: "Lançamento com leads reais, sob supervisão técnica." },
    { label: "Semana 6", icon: "trending", title: "Ajuste de Conversão", desc: "Refino das abordagens com base nos dados do CRM." },
    { label: "Semana 7", icon: "chart", title: "Métricas & Performance", desc: "Auditoria da conversão comercial da sua mídia." },
    { label: "Semana 8", icon: "award", title: "Consolidação & Plano 90d", desc: "Relatório final e plano de escala comercial." },
  ],
};

export const proposta = {
  slug: "proposta-aceleracao-comercial", layout: "vertical",
  title: "Proposta · Aceleração Comercial",
  slides: [
    { type: "cover", kicker: "Proposta Comercial · E3 Digital",
      title: 'Aceleração <span class="hl">Comercial</span>',
      subtitle: "Transforme sua operação de vendas em uma máquina que não perde lead qualificado — em 8 semanas.",
      tag: "Programa intensivo · 2 meses" },
    quemSomos,
    { type: "bullets", kicker: "O problema", title: "Você investe em mídia, mas perde venda no processo", cols: 2,
      lead: "Aceleração Comercial é para escritórios que já rodam Google e Meta Ads, mas travam na hora de converter.",
      items: [
        { icon: "clock", title: "Resposta lenta", desc: "O lead qualificado esfria esperando a primeira mensagem." },
        { icon: "search", title: "Lead perdido", desc: "Sem CRM e follow-up, oportunidades somem no meio do caminho." },
        { icon: "message", title: "Atendimento improvisado", desc: "Cada pessoa aborda de um jeito — o resultado é imprevisível." },
        { icon: "chart", title: "Sem métrica", desc: "Você não sabe quanto da sua verba de mídia vira contrato." },
      ] },
    { type: "section", num: "01", kicker: "Como funciona", title: "A jornada de 8 semanas",
      desc: "Cada semana entrega um bloco da sua nova operação comercial." },
    jornada,
    { type: "bullets", kicker: "O que você conquista", title: "O resultado ao final das 8 semanas", cols: 3,
      items: [
        { icon: "zap", title: "Máquina comercial", desc: "Processo, CRM e scripts rodando em conjunto." },
        { icon: "trending", title: "Mais conversão", desc: "Aproveitamento real dos leads que sua mídia já gera." },
        { icon: "award", title: "Plano de escala", desc: "Um caminho claro para os próximos 90 dias." },
      ] },
    { type: "quote", text: "Nosso papel é garantir que <span class=\"hl\">nenhum lead qualificado</span> se perca por resposta lenta ou atendimento desorganizado.",
      author: "Método E3 · Aceleração Comercial" },
    { type: "final", title: "Vamos acelerar.",
      subtitle: "Um processo estruturado para gerar os primeiros resultados ainda no primeiro mês — não em seis.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const onboarding = {
  slug: "onboarding-aceleracao-comercial",
  title: "Onboarding · Aceleração Comercial",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo à <span class="hl">Aceleração</span>',
      subtitle: "Os próximos 45 minutos alinham expectativas, mapeiam sua operação e definem o que cada um faz para começarmos rápido.",
      tag: "Aceleração Comercial · 8 semanas" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e conexão",
        "Alinhamento de expectativas",
        "Apresentação do cronograma de 8 semanas",
        "Diagnóstico da sua operação atual",
        "Definição de SLAs e próximos passos",
      ] },
    { type: "table", kicker: "Estrutura", title: "Como esta reunião se divide (45–60 min)",
      head: ["Etapa", "Objetivo", "Tempo"],
      rows: [
        ["Boas-vindas & conexão", "Apresentar o gerente de sucesso e validar o alinhamento", "5 min"],
        ["Alinhamento de expectativas", "Confirmar o foco: estruturar o processo comercial", "5 min"],
        ["Apresentação do cronograma", "Detalhar a jornada de 8 semanas e as entregas", "10 min"],
        ["Diagnóstico e triagem", "Investigar a operação de vendas e a mídia ativa", "25 min"],
        ["Definição de SLAs", "Formalizar acessos e formulário para o kickoff", "10 min"],
      ] },
    { type: "timeline", kicker: "Cronograma", title: "A jornada de 8 semanas",
      steps: jornada.steps },
    { type: "bullets", kicker: "Diagnóstico", title: "O que vamos investigar juntos", cols: 2,
      items: [
        { icon: "clock", title: "Tempo de resposta", desc: "Quanto tempo até a primeira mensagem no WhatsApp após o lead chegar?" },
        { icon: "layers", title: "Gestão de oportunidades", desc: "Como você controla quem não fechou no primeiro contato?" },
        { icon: "crosshair", title: "Triagem & qualificação", desc: "Existem mensagens-padrão para priorizar leads qualificados?" },
        { icon: "users", title: "Processo de atendimento", desc: "Quem faz o primeiro contato — com script ou livre?" },
      ] },
    { type: "table", kicker: "Corresponsabilidade", title: "O que precisamos de você (SLAs)",
      head: ["Responsável", "Ação", "Prazo"],
      rows: [
        ["Cliente", "Preencher o formulário e liberar acessos (mídia paga + WhatsApp Business)", "Até 48h"],
        ["Equipe E3", "Criar o grupo oficial e agendar as sessões estratégicas", "No mesmo dia"],
        ["Ambos", "Bloquear a agenda do time para o treinamento de SLA (Semana 4)", "Alinhado na reunião"],
      ] },
    { type: "final", title: "Bora começar.",
      subtitle: "Seu primeiro passo: formulário de diagnóstico preenchido e acessos liberados em até 48h.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const offboarding = {
  slug: "offboarding-aceleracao-comercial",
  title: "Entrega Final · Aceleração Comercial",
  slides: [
    { type: "cover", kicker: "Entrega Final · E3 Digital",
      title: 'O que <span class="hl">construímos</span> juntos',
      subtitle: "Uma retrospectiva de tudo que entregamos na Aceleração Comercial.",
      tag: "Aceleração Comercial · 8 semanas" },
    { type: "agenda", kicker: "Roteiro", title: "O que vamos revisar",
      items: ["O que entregamos", "A jornada percorrida", "O que mudou na operação", "Próximos passos"] },
    { type: "bullets", kicker: "Entregas", title: "O que ficou pronto", cols: 2,
      items: [
        { icon: "cog", title: "CRM implementado", desc: "Configurado, integrado à mídia e com o time treinado." },
        { icon: "message", title: "Scripts comerciais", desc: "Abordagem, triagem e quebra de objeção padronizados." },
        { icon: "users", title: "Time treinado", desc: "Equipe operando o SLA de resposta rápida." },
        { icon: "chart", title: "Métricas & plano 90d", desc: "Relatório de performance e plano de escala." },
      ] },
    { type: "timeline", kicker: "A jornada", title: "As 8 semanas percorridas", steps: jornada.steps },
    { type: "bullets", kicker: "Resultados", title: "O que mudou na sua operação", cols: 3,
      items: [
        { icon: "zap", title: "Resposta rápida", desc: "Leads atendidos em minutos, não em horas." },
        { icon: "layers", title: "Zero lead perdido", desc: "Todo contato rastreado no CRM." },
        { icon: "trending", title: "Mais conversão", desc: "Aproveitamento real da mídia que já rodava." },
      ] },
    { type: "bullets", kicker: "Continuidade", title: "Próximos passos", cols: 2,
      items: [
        { icon: "rocket", title: "Escalar o que funciona", desc: "Executar o plano de 90 dias definido." },
        { icon: "handshake", title: "Assessoria contínua", desc: "Acompanhamento para sustentar e crescer os resultados." },
      ] },
    { type: "final", title: "Obrigado pela parceria.",
      subtitle: "Construímos uma base sólida — agora é hora de escalar.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
