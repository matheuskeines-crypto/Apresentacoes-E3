// Assessoria Light & Pro (sprint de 17 dias) — proposta + onboarding
const quemSomos = { type: "stats", kicker: "Quem somos", title: "A referência em marketing jurídico",
  items: [
    { v: "+1.000", l: "escritórios atendidos" },
    { v: "R$ 200M+", l: "em honorários gerados" },
    { v: "#1", l: "do Brasil no nicho" },
  ] };

const jornada = {
  type: "journey", kicker: "O sprint", title: "17 dias, do kick-off ao ar",
  steps: [
    { label: "Dia 1", icon: "megaphone", title: "Vídeo de kick-off", desc: "Boas-vindas, expectativas e pontapé oficial." },
    { label: "Dia 2", icon: "users", title: "Reunião de onboarding", desc: "Alinhamento estratégico e coleta inicial." },
    { label: "Dias 3–5", icon: "target", title: "Planejamento estratégico", desc: "Posicionamento, público e plano de comunicação." },
    { label: "Dia 6", icon: "pen", title: "Formulário & copywriting", desc: "Formulário preenchido e textos-base prontos." },
    { label: "Dia 7", icon: "message", title: "Scripts de venda", desc: "Roteiros de abordagem e atendimento comercial." },
    { label: "Dias 8–12", icon: "trending", title: "Campanhas ativas", desc: "Anúncios no ar captando leads qualificados." },
    { label: "Dias 13–15", icon: "layers", title: "Página de vendas", desc: "Landing de conversão finalizada e publicada." },
    { label: "Dia 17", icon: "handshake", title: "Alinhamento comercial", desc: "Revisão do funil e ajuste fino do processo." },
  ],
};

export const proposta = {
  slug: "proposta-assessoria-light-pro", layout: "vertical",
  title: "Proposta · Assessoria Light & Pro",
  slides: [
    { type: "cover", kicker: "Proposta Comercial · E3 Digital",
      title: 'Assessoria <span class="hl">Light & Pro</span>',
      subtitle: "Um sprint de 17 dias que sai do kick-off à página de vendas no ar, com campanhas ativas e comercial alinhado.",
      tag: "Do dia 1 ao dia 17" },
    quemSomos,
    { type: "bullets", kicker: "Os planos", title: "Light x Pro", cols: 2,
      lead: "Dois níveis de profundidade para o mesmo método comprovado.",
      items: [
        { icon: "zap", title: "Light", desc: "O essencial para colocar presença e captação no ar com velocidade." },
        { icon: "award", title: "Pro", desc: "Tudo do Light + gestão aprofundada de mídia, comercial e otimização contínua." },
      ] },
    { type: "section", num: "01", kicker: "Como funciona", title: "17 dias, do kick-off ao ar",
      desc: "Um cronograma enxuto e intenso, sem tempo perdido." },
    jornada,
    { type: "bullets", kicker: "O que fica pronto", title: "As entregas do sprint", cols: 2,
      items: [
        { icon: "target", title: "Estratégia definida", desc: "Posicionamento, público e plano de comunicação." },
        { icon: "layers", title: "Página no ar", desc: "Landing page de alta conversão publicada." },
        { icon: "megaphone", title: "Campanhas rodando", desc: "Anúncios ativos gerando leads reais." },
        { icon: "message", title: "Comercial estruturado", desc: "Scripts de venda e funil alinhados." },
      ] },
    { type: "quote", text: "Em <span class=\"hl\">17 dias</span> sua operação sai do papel: página no ar, campanhas ativas e comercial pronto para vender.",
      author: "Método E3 · Assessoria Light & Pro" },
    { type: "final", title: "Vamos começar.",
      subtitle: "Um sprint desenhado para tirar sua captação do zero em menos de três semanas.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const onboarding = {
  slug: "onboarding-assessoria-light-pro",
  title: "Onboarding · Assessoria Light & Pro",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo ao <span class="hl">Onboarding</span>',
      subtitle: "da E3 Digital — o hub de marketing e vendas para advogados.",
      tag: "Assessoria Light & Pro" },

    { type: "stats", kicker: "Quem somos", title: "Quem é a E3 Digital",
      items: [
        { v: "+R$20M", l: "já investidos em mídia paga" },
        { v: "+500", l: "escritórios atendidos" },
        { v: "+R$100M", l: "possibilitados em honorários" },
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

    { type: "bullets", kicker: "Nosso compromisso nos próximos 6 meses", title: "Nossos Objetivos", cols: 2,
      items: [
        { icon: "layers", title: "Presença digital completa e ativa", desc: "Site, redes sociais e Google otimizados para atrair clientes." },
        { icon: "settings", title: "Processo comercial estruturado", desc: "CRM implementado, funil definido e time alinhado." },
        { icon: "award", title: "Posicionamento e autoridade", desc: "Marca reconhecida no mercado jurídico digital." },
        { icon: "trending", title: "Mais fechamentos e previsibilidade", desc: "Aumento da taxa de conversão e receita recorrente." },
      ] },

    { type: "acronym", kicker: "Nossa metodologia",
      lead: "Uma solução completa de marketing e vendas, na qual faça escritórios de advocacia faturarem mais através da nossa metodologia CPP.",
      big: "CPP",
      pills: ["Canais de aquisição de clientes", "Produtos Jurídicos", "Processo comercial"] },

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

    { type: "list", kicker: "Direcionamento", title: "Objetivos e Metas",
      items: [
        { icon: "target", text: "Qual o principal objetivo que o escritório tem para esse ano?" },
        { icon: "calendar", text: "Quais suas metas mensais?" },
        { icon: "clock", text: "O que você espera para os próximos 3 meses do projeto?" },
      ] },

    { type: "timeline", kicker: "Cronograma", title: "Cronograma · 17 dias",
      lead: "Do dia do onboarding até o primeiro alinhamento comercial.",
      steps: [
        { label: "Dia 1", icon: "users", title: "Reunião de onboarding", desc: "Acessos e envio do curso." },
        { label: "Dias 2–5", icon: "target", title: "Alinhamento interno", desc: "Desenvolvimento da estratégia." },
        { label: "Dia 6 · Pro", icon: "pen", title: "Forms da LP + copy & design", desc: "Preenchimento do forms da LP e criação de copy e design gráfico." },
        { label: "Dia 7", icon: "message", title: "Script de vendas", desc: "Envio do script de vendas e do roteiro para gravação de anúncios." },
        { label: "Dias 8–12", icon: "megaphone", title: "Início das campanhas", desc: "Anúncios no ar captando leads." },
        { label: "Dias 13–15 · Pro", icon: "layers", title: "Página de vendas", desc: "Finalização da página de vendas." },
        { label: "Dia 17 · Pro", icon: "handshake", title: "1º alinhamento comercial", desc: "Revisão do funil e ajuste fino do processo." },
      ] },

    { type: "table", kicker: "Após o onboarding · 1 de 2", title: "O que acontece depois da reunião",
      lead: "As entregas e os prazos a partir do onboarding.",
      head: ["Etapa", "Prazo"],
      rows: [
        ["Reunião de onboarding", "1 dia"],
        ["Envio de treinamento online", "Imediatamente após o onboarding"],
        ["Envio de CRM grátis (Light, sem IA)", "Imediatamente após o onboarding"],
        ["Solicitação de copy dos criativos estáticos", "Até 24h do onboarding"],
        ["Envio de roteiros e orientações à gravação (vídeo)", "Até 24h do onboarding"],
        ["Envio de exemplos de vídeos, se houver", "Até 24h do onboarding"],
      ] },

    { type: "table", kicker: "Após o onboarding · 2 de 2", title: "O que acontece depois da reunião",
      lead: "As entregas e os prazos a partir do onboarding.",
      head: ["Etapa", "Prazo"],
      rows: [
        ["Envio do roteiro de atendimento (qualificação de lead)", "Até 24h do onboarding"],
        ["Fixar PGM na descrição do grupo", "Até 48h do onboarding"],
        ["Envio dos criativos estáticos prontos", "3 dias úteis"],
        ["Conexão da plataforma / coleta de acessos", "Até 1 dia após o onboarding"],
        ["Criação do criativo e fixação no grupo", "Até 1 dia após o início das campanhas"],
        ["Atualização do ClickUp", "A cada 3 dias, até começar a campanha"],
      ] },

    { type: "bullets", kicker: "Como falamos com você", title: "Comunicação", cols: 2,
      items: [
        { icon: "message", title: "Tudo pelo grupo do WhatsApp", desc: "Nossa comunicação é toda através do nosso grupo do WhatsApp. Envie as mensagens sempre no grupo para mantermos a organização. Responderemos o mais rápido possível!" },
        { icon: "clock", title: "Horário de atendimento", desc: "09h às 18h, de segunda a sexta." },
      ] },

    { type: "list", kicker: "Análises do projeto", title: "Quanto Tempo de Resultado?",
      lead: "Onde nosso principal fator no projeto serão as seguintes análises:",
      items: [
        { icon: "search", text: "Como seu negócio é visto hoje? Qual posicionamento adotado?" },
        { icon: "settings", text: "Como funciona o processo comercial atualmente? Ferramentas, pessoas e processo?" },
        { icon: "chart", text: "Qual sua taxa de fechamento atualmente?" },
        { icon: "clock", text: "Quanto tempo o seu cliente demora para fechar com você?" },
      ] },

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

    { type: "table", kicker: "Fornecimento de dados logo no início da operação", title: "Dados Comerciais Essenciais",
      lead: "É fundamental que você forneça os dados comerciais do escritório logo no início do projeto. Essas informações são essenciais para garantir alinhamento estratégico e assertividade nas campanhas.",
      head: ["Dados necessários", "Por que são importantes?"],
      rows: [
        ["Histórico de conversões", "Definir estratégias assertivas"],
        ["Ticket médio de clientes", "Otimizar investimento em mídia"],
        ["Principais serviços oferecidos", "Personalizar campanhas"],
        ["Público-alvo atual", "Acelerar resultados"],
      ],
      note: "Quanto mais informações tivermos, mais rápido conseguiremos gerar resultados para o seu escritório." },

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
  slug: "offboarding-assessoria-light-pro",
  title: "Entrega Final · Assessoria Light & Pro",
  slides: [
    { type: "cover", kicker: "Entrega Final · E3 Digital",
      title: 'O que <span class="hl">construímos</span> juntos',
      subtitle: "Uma retrospectiva do sprint de 17 dias da Assessoria Light & Pro.",
      tag: "Assessoria Light & Pro" },
    { type: "agenda", kicker: "Roteiro", title: "O que vamos revisar",
      items: ["O que entregamos", "O sprint percorrido", "O que está no ar", "Próximos passos"] },
    { type: "bullets", kicker: "Entregas", title: "O que ficou pronto", cols: 2,
      items: [
        { icon: "target", title: "Estratégia definida", desc: "Posicionamento, público e comunicação." },
        { icon: "layers", title: "Página de vendas no ar", desc: "Landing de alta conversão publicada." },
        { icon: "megaphone", title: "Campanhas ativas", desc: "Anúncios captando leads reais." },
        { icon: "message", title: "Comercial estruturado", desc: "Scripts de venda e funil alinhados." },
      ] },
    { type: "timeline", kicker: "A jornada", title: "O sprint de 17 dias percorrido", steps: jornada.steps },
    { type: "bullets", kicker: "Continuidade", title: "Próximos passos", cols: 2,
      items: [
        { icon: "rocket", title: "Otimizar campanhas", desc: "Melhorar custo por lead e conversão." },
        { icon: "handshake", title: "Evoluir para o Pro", desc: "Aprofundar mídia, comercial e gestão contínua." },
      ] },
    { type: "final", title: "Obrigado pela parceria.",
      subtitle: "Sua máquina de captação está no ar — vamos escalar.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
