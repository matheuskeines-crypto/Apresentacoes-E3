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

const jornadaOnboarding = [
  { label: "Semana 0", icon: "handshake", title: "Onboarding", desc: "Formulários de diagnóstico 360°, CRM + IA e Landing Page, e coleta de acessos às ferramentas de tráfego." },
  { label: "Semana 1", icon: "target", title: "Direcionamento", desc: "Diagnóstico 360° concluído e apresentado em reunião de direcionamento estratégico." },
  { label: "Semana 2", icon: "instagram", title: "Orgânico", desc: "Auditoria criativa das redes sociais e do posicionamento orgânico do escritório." },
  { label: "Semana 3", icon: "trending", title: "Comercial", desc: "Treinamento comercial, definição do ICP, scripts de atendimento e cadência de follow-up." },
  { label: "Semana 4", icon: "layers", title: "Entregáveis", desc: "Landing Page, CRM + IA e Google Meu Negócio publicados e em funcionamento." },
  { label: "Semana 5", icon: "megaphone", title: "Auditoria de Mídia Paga", desc: "Estratégia de captação definida, com roteiros de vídeo e direção de arte dos criativos." },
  { label: "Semana 6", icon: "zap", title: "Assessoria", desc: "Entrega dos criativos e início das campanhas de captação de mídia paga." },
];

export const onboarding = {
  slug: "onboarding-estruturacao-pro",
  title: "Onboarding · Estruturação",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo ao <span class="hl">Onboarding</span>',
      subtitle: "da E3 Digital — o hub de marketing e vendas para advogados.",
      tag: "Estruturação" },

    { type: "stats", kicker: "Quem somos", title: "Quem é a E3 Digital",
      items: [
        { v: "+R$20M", l: "já investidos em mídia paga" },
        { v: "+800", l: "escritórios atendidos" },
        { v: "+R$120M", l: "possibilitados em honorários" },
      ],
      note: "Somos um hub de soluções em marketing e vendas para advogados e escritórios de advocacia, com a visão de crescer cada vez mais parceiros por meio de Gestão, Marketing e Vendas." },

    { type: "list", kicker: "Ponto de partida", title: "Marco Zero", cols: 2,
      items: [
        { icon: "search", text: "Já atuou com o digital?" },
        { icon: "check", text: "Já fechou contratos? Quantos?" },
        { icon: "users", text: "Como funciona o comercial hoje? Pessoas, processos, ferramentas?" },
        { icon: "layers", text: "Como é sua presença no digital? Tem site ou GMN?" },
        { icon: "dollar", text: "Hoje, qual o seu faturamento?" },
        { icon: "megaphone", text: "Tem posicionamento digital ativo? Produz conteúdo de forma orgânica?" },
      ] },

    { type: "list", kicker: "Direcionamento", title: "Objetivos e Metas",
      items: [
        { icon: "target", text: "Qual o principal objetivo que o escritório tem para esse ano?" },
        { icon: "calendar", text: "Quais suas metas mensais?" },
        { icon: "clock", text: "O que você espera para os próximos 3 meses do projeto?" },
      ] },

    { type: "bullets", kicker: "Nosso compromisso nos próximos meses", title: "Nossos Objetivos", cols: 2,
      items: [
        { icon: "rocket", title: "Estruturação das Campanhas", desc: "Criação e configuração inicial." },
        { icon: "users", title: "Adaptação do Time de Atendimento", desc: "Treinamento e alinhamento." },
        { icon: "target", title: "Buscar Assertividade no Público", desc: "Identificação do público ideal." },
        { icon: "settings", title: "Adaptação das Campanhas", desc: "Otimização contínua." },
      ] },

    { type: "acronym", kicker: "Nossa metodologia",
      lead: "Uma solução completa de marketing e vendas, na qual faça escritórios de advocacia faturarem mais através da nossa metodologia CPP.",
      big: "CPP",
      breakdown: [
        { letter: "C", title: "Canais de Aquisição de Clientes", desc: "Mapeamos e gerenciamos os canais mais eficazes (Google, Meta, Instagram, WhatsApp) para gerar leads qualificados." },
        { letter: "P", title: "Produtos Jurídicos", desc: "Analisamos o portfólio do escritório para focar nas teses e serviços com maior potencial de retorno." },
        { letter: "P", title: "Processo Comercial", desc: "Geração, qualificação, abordagem e gestão de funil através de um treinamento da equipe, ou seja, do primeiro contato ao fechamento do contrato." },
      ] },

    { type: "bullets", kicker: "Nossa metodologia", title: "Processo Comercial Estruturado", cols: 3,
      lead: "Apoiamos o seu escritório em toda a jornada comercial, da abordagem ao fechamento, ensinando e estruturando o processo para que sua equipe venda com método, previsibilidade e segurança.",
      items: [
        { icon: "search", title: "Qualificação de leads", desc: "Identificação e filtragem dos melhores prospects." },
        { icon: "message", title: "Abordagem e comunicação comercial", desc: "Estratégias de contato e persuasão eficazes." },
        { icon: "chart", title: "Gestão de funil e acompanhamento", desc: "Monitoramento constante do pipeline de vendas." },
        { icon: "users", title: "Treinamento da equipe", desc: "Capacitação contínua do time comercial." },
        { icon: "calendar", title: "Reuniões quinzenais estratégicas", desc: "Conversão e alinhamento (plano Pro)." },
      ],
      note: "Nosso objetivo: conectar o marketing ao comercial, garantindo que o investimento em tráfego se converta em resultados reais e sustentáveis." },

    { type: "funnel", cap: 1.7, kicker: "Entendendo o fluxo de conversão das suas campanhas", title: "Alinhamento de Funil",
      lead: "A primeira etapa nós medimos sozinhos; as três seguintes só existem dentro do seu escritório — e por isso dependem de você nos informar.",
      steps: [
        { title: "Leads", value: "100%", w: 100 },
        { title: "MQL", value: "20–30%", w: 84 },
        { title: "SQL", value: "5–10%", w: 70 },
        { title: "Fechamentos", value: "Acima de 5%", w: 56 },
      ],
      rows: [
        { n: 1, title: "Leads recebidos", desc: "Quem entrou em contato pelo anúncio.", owner: "e3", resp: "Marketing" },
        { n: 2, title: "MQL — Leads qualificados", desc: "Perfil real de caso, com interesse genuíno.", owner: "cliente", resp: "Marketing + Comercial" },
        { n: 3, title: "SQL — Atendimentos realizados", desc: "Compareceu à reunião ou consulta.", owner: "cliente", resp: "Comercial do cliente" },
        { n: 4, title: "Fechamentos — Contratos assinados", desc: "O que de fato vira faturamento.", owner: "cliente", resp: "Comercial do cliente" },
      ] },

    { type: "cac", kicker: "Custo aproximado de aquisição de clientes", title: "Calculadora de CAC",
      lead: "Qual será o seu investimento mensal?" },

    { type: "rules", kicker: "Diretrizes essenciais para maximizar suas conversões", title: "Regras do Comercial",
      items: [
        { icon: "clock", title: "Atendimento Rápido", badge: "5 minutos", desc: "Tempo máximo para atender cada lead que entra.", note: "A velocidade de resposta impacta diretamente na conversão." },
        { icon: "refresh", title: "Follow-up Consistente", badge: "5 pontos de contato", desc: "Mínimo de tentativas de contato por lead.", note: "Persistência é fundamental para não perder oportunidades." },
        { icon: "target", title: "Meta de Conversão", badge: "5% a 10%", desc: "Taxa de conversão esperada de leads para clientes.", note: "Benchmark de mercado para serviços jurídicos." },
      ],
      callout: { icon: "alert", title: "Por que essas regras são importantes?",
        desc: "Estudos mostram que 78% dos clientes fecham com a primeira empresa que responde. Além disso, múltiplos pontos de contato aumentam em até 400% as chances de conversão." } },

    { type: "timeline", kicker: "Cronograma", title: "A jornada em 6 semanas", steps: jornadaOnboarding },

    { type: "bullets", kicker: "Como falamos com você", title: "Comunicação", cols: 2,
      items: [
        { icon: "message", title: "Tudo pelo grupo do WhatsApp", desc: "Nossa comunicação é toda através do nosso grupo do WhatsApp. Envie as mensagens sempre no grupo para mantermos a organização. Responderemos o mais rápido possível!" },
        { icon: "clock", title: "Horário de atendimento", desc: "09h às 18h, de segunda a sexta." },
      ] },

    { type: "estimate", title: "Orçamento & Tempo de Resultado",
      rows: [
        { icon: "dollar", title: "Sustentação do Projeto", desc: "Você tem caixa para sustentar 3 meses de projeto (assessoria + anúncios)?" },
        { icon: "alert", title: "Expectativa de Resultado (Transparência Total)", tone: "alert", desc: "Você está ciente de que os resultados dependem não só da estratégia aplicada, mas também da execução e do comprometimento do seu escritório na conversão dos leads?" },
      ],
      stats: [
        { icon: "clock", label: "Primeiros Resultados", value: "30 a 45 dias" },
        { icon: "target", label: "Melhores Resultados", value: "A partir do 3° mês" },
      ],
      note: { icon: "calendar", text: "No físico, um negócio leva muitos meses para amadurecer. No digital esse tempo é muito mais rápido, mas ainda exige constância e tempo de dados." } },

    { type: "bullets", kicker: "Rotina de acompanhamento", title: "Comunicação de Resultados", cols: 2,
      items: [
        { icon: "calendar", title: "Segundas · Envio de relatório", desc: "Enviaremos um link com um dashboard das principais métricas das suas campanhas." },
        { icon: "message", title: "Quartas · Atualizações de leads", desc: "Buscaremos atualizações sobre a qualificação dos leads, bem como auxiliar nas objeções comerciais." },
        { icon: "check", title: "Sextas · Feedback semanal", desc: "Solicitaremos um feedback da semana para registrar no nosso sistema e realizar otimizações." },
        { icon: "handshake", title: "Mensal · Alinhamentos", desc: "Agendaremos previamente reuniões de alinhamento para debater sobre os resultados." },
      ] },

    { type: "bullets", kicker: "Reuniões e acompanhamento", title: "Nossas Reuniões", cols: 2,
      items: [
        { icon: "users", title: "Durante os próximos 30 dias · Consultoria e entregas", desc: "1 - Reunião semanal conforme cronograma. 2 - Entregas e acompanhamento." },
        { icon: "trending", title: "Após 30 dias (Pro) · Busca da escala", desc: "1 - Alinhamento e consultoria. 2 - Feedback do cliente e oportunidades de melhoria." },
      ],
      note: "Essas reuniões são fundamentais para garantir o alinhamento estratégico e maximizar os resultados do projeto." },

    { type: "bullets", kicker: "Sua colaboração", title: "Seu Papel na Jornada", cols: 3,
      lead: "Para que tudo funcione da melhor forma, vamos precisar da sua colaboração:",
      items: [
        { icon: "layers", title: "Documentos e informações", desc: "É fundamental que os documentos e informações sejam enviados no prazo para iniciarmos as campanhas rapidamente." },
        { icon: "check", title: "Aprovações rápidas", desc: "Algumas demandas precisarão do seu “ok” antes de seguirmos com a execução. Contamos com você para revisar e aprovar em até 24 horas." },
        { icon: "dollar", title: "Pagamentos em dia", desc: "Para que as campanhas rodem sem interrupções, os pagamentos das plataformas precisam ser feitos dentro do prazo. A falta de pagamento pode prejudicar o desempenho das campanhas." },
      ] },

    { type: "reward", kicker: "Indique e seja recompensado", title: "Programa de Indicação E3 Digital",
      lead: "A confiança no nosso trabalho é o pilar do nosso escritório, e muitas das nossas melhores parcerias começam por uma recomendação. Por isso, premiamos nossos clientes por cada indicação fechada.",
      amount: "R$ 300,00", caption: "Você nos indica e, ao fechar o contrato, a recompensa é sua.",
      optsTitle: "Você escolhe como quer receber a sua recompensa",
      options: [
        { icon: "dollar", title: "Transferência via PIX", desc: "Para sua conta pessoal ou jurídica." },
        { icon: "megaphone", title: "Crédito/Saldo na conta de anúncios", desc: "Meta Ads ou Google Ads." },
      ] },

    { type: "final", title: "Vamos começar.",
      subtitle: "O onboarding é o primeiro passo para escalar o seu escritório.",
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
