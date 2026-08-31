// Estruturação PRO / Assessoria PRO (6 semanas) — proposta + onboarding
const quemSomos = { type: "stats", kicker: "Quem somos", title: "Especialistas em crescimento jurídico",
  items: [
    { v: "+1.000", l: "escritórios atendidos" },
    { v: "R$ 200M+", l: "em honorários gerados" },
    { v: "#1", l: "em marketing jurídico no Brasil" },
  ] };

const jornada = {
  type: "journey", kicker: "A jornada", title: "6 semanas, do diagnóstico ao ROI",
  steps: [
    { label: "Semana 1", icon: "search", title: "Diagnóstico 360°", desc: "Documento executivo e dashboard de growth score." },
    { label: "Semana 2", icon: "megaphone", title: "Auditoria de Mídia", desc: "Estratégias de mídia paga personalizadas ao seu momento." },
    { label: "Semana 3", icon: "cog", title: "CRM & Tecnologia", desc: "CRM com pipelines e automação, funcionando de verdade." },
    { label: "Semana 4", icon: "pen", title: "Comunicação & Criativo", desc: "Guia de comunicação alinhado ao seu posicionamento." },
    { label: "Semana 5", icon: "trending", title: "Implementação Comercial", desc: "Operação comercial rodando no padrão certo." },
    { label: "Semana 6", icon: "award", title: "Consolidação & ROI", desc: "Otimização e gestão diária de campanhas por ROI." },
  ],
};

export const proposta = {
  slug: "proposta-estruturacao-pro", layout: "vertical",
  title: "Proposta · Estruturação PRO",
  slides: [
    { type: "cover", kicker: "Proposta Comercial · E3 Digital",
      title: 'Estruturação <span class="hl">PRO</span>',
      subtitle: "Mídia, tecnologia e comercial estruturados em 6 semanas — as três engrenagens do crescimento previsível.",
      tag: "Assessoria PRO · 6 semanas" },
    quemSomos,
    { type: "bullets", kicker: "O produto", title: "As 3 frentes da Estruturação PRO", cols: 3,
      lead: "Uma assessoria completa que organiza tudo que gera crescimento sustentável.",
      items: [
        { icon: "megaphone", title: "Mídia", desc: "Auditoria e gestão de mídia paga focada em ROI." },
        { icon: "cog", title: "Tecnologia", desc: "CRM configurado, com automação e time treinado." },
        { icon: "trending", title: "Comercial", desc: "Operação de vendas no padrão certo, convertendo mais." },
      ] },
    { type: "section", num: "01", kicker: "Como funciona", title: "A jornada em 6 semanas",
      desc: "Três fases que consolidam sua operação de ponta a ponta." },
    jornada,
    { type: "bullets", kicker: "O que fica pronto", title: "Entregas concretas ao final", cols: 2,
      items: [
        { icon: "chart", title: "Diagnóstico executivo", desc: "Documento + dashboard com o retrato real da operação." },
        { icon: "cog", title: "CRM operante", desc: "Configurado, funcionando e com o time treinado." },
        { icon: "message", title: "Guia de comunicação", desc: "Padrão de abordagem alinhado ao posicionamento." },
        { icon: "trending", title: "Operação comercial", desc: "Processo rodando com conversão em alta." },
      ] },
    { type: "quote", text: "Estruturamos as <span class=\"hl\">três engrenagens</span> — mídia, tecnologia e comercial — para um crescimento previsível.",
      author: "Método E3 · Estruturação PRO" },
    { type: "final", title: "Vamos estruturar.",
      subtitle: "Do diagnóstico à consolidação, sua operação sai do improviso e entra no padrão.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const onboarding = {
  slug: "onboarding-estruturacao-pro",
  title: "Onboarding · Estruturação PRO",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo à <span class="hl">Estruturação PRO</span>',
      subtitle: "Vamos alinhar expectativas, mapear seus gargalos e definir o que cada um faz para começarmos com velocidade.",
      tag: "Assessoria PRO · 6 semanas" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e conexão",
        "Apresentação da jornada de 6 semanas",
        "Diagnóstico de maturidade da operação",
        "Governança e reuniões estratégicas",
        "Próximos passos e acessos",
      ] },
    { type: "timeline", kicker: "Cronograma", title: "A jornada em 6 semanas", steps: jornada.steps },
    { type: "table", kicker: "Governança", title: "Nossas reuniões estratégicas",
      head: ["Momento", "Foco", "Time"],
      rows: [
        ["Semana 2", "Apresentação do diagnóstico e auditoria de mídia", "Account + Project Manager"],
        ["Semana 3", "Validação do CRM e do guia de comunicação", "Project Manager"],
        ["Semana 6", "Consolidação, resultados e continuidade", "Account + Traffic Manager"],
      ] },
    { type: "table", kicker: "Corresponsabilidade", title: "O que precisamos de você (SLAs)",
      head: ["Responsável", "Ação", "Prazo"],
      rows: [
        ["Cliente", "Preencher formulário de diagnóstico e liberar acessos", "Até 48h"],
        ["Equipe E3", "Abrir canal diário e calendário no ClickUp", "No mesmo dia"],
        ["Ambos", "Confirmar a reunião de apresentação da auditoria (Semana 2)", "Na sessão"],
      ] },
    { type: "final", title: "Bora estruturar.",
      subtitle: "Seu primeiro passo: formulário preenchido e acessos liberados em até 48h.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const offboarding = {
  slug: "offboarding-estruturacao-pro",
  title: "Entrega Final · Estruturação PRO",
  slides: [
    { type: "cover", kicker: "Entrega Final · E3 Digital",
      title: 'O que <span class="hl">construímos</span> juntos',
      subtitle: "Uma retrospectiva de tudo que entregamos na Estruturação PRO.",
      tag: "Estruturação PRO · 6 semanas" },
    { type: "agenda", kicker: "Roteiro", title: "O que vamos revisar",
      items: ["O que entregamos nas 3 frentes", "A jornada percorrida", "O que mudou na operação", "Próximos passos"] },
    { type: "bullets", kicker: "Entregas", title: "O que ficou pronto", cols: 2,
      items: [
        { icon: "search", title: "Diagnóstico 360°", desc: "Documento executivo e dashboard de growth score." },
        { icon: "cog", title: "CRM operante", desc: "Pipelines, automação e time treinado." },
        { icon: "megaphone", title: "Mídia estruturada", desc: "Estratégia e gestão de campanhas por ROI." },
        { icon: "trending", title: "Comercial no padrão", desc: "Operação de vendas convertendo mais." },
      ] },
    { type: "timeline", kicker: "A jornada", title: "As 6 semanas percorridas", steps: jornada.steps },
    { type: "bullets", kicker: "Resultados", title: "O que mudou na sua operação", cols: 3,
      items: [
        { icon: "chart", title: "Visão clara", desc: "Métricas e ROI acompanhados de perto." },
        { icon: "cog", title: "Processo rodando", desc: "Tecnologia e operação integradas." },
        { icon: "trending", title: "Mais conversão", desc: "Comercial estruturado e previsível." },
      ] },
    { type: "bullets", kicker: "Continuidade", title: "Próximos passos", cols: 2,
      items: [
        { icon: "rocket", title: "Otimização contínua", desc: "Refinar campanhas e processo mês a mês." },
        { icon: "handshake", title: "Assessoria contínua", desc: "Acompanhamento para escalar os resultados." },
      ] },
    { type: "final", title: "Obrigado pela parceria.",
      subtitle: "As três engrenagens estão girando — agora é acelerar.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
