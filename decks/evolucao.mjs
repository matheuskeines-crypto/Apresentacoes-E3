// Evolução Jurídica (método PMV, jornada Basic + Pro) — proposta + onboarding
const quemSomos = { type: "stats", kicker: "Quem somos", title: "A maior assessoria de marketing jurídico do Brasil",
  items: [
    { v: "+1.000", l: "escritórios atendidos" },
    { v: "R$ 200M+", l: "em honorários gerados" },
    { v: "#1", l: "em marketing jurídico no Brasil" },
  ], note: "Um ecossistema completo para o Direito — do posicionamento à venda." };

const pmv = { type: "bullets", kicker: "Metodologia", title: "O método PMV", cols: 3,
  lead: "Três pilares que, juntos e com processo, viram crescimento.",
  items: [
    { icon: "award", title: "Posicionamento", desc: "Autoridade que justifica honorários premium em vez de competir por preço." },
    { icon: "megaphone", title: "Marketing", desc: "Presença e conteúdo que atraem o cliente certo com consistência." },
    { icon: "trending", title: "Vendas", desc: "Processo que transforma atenção em reunião e reunião em contrato." },
  ] };

const jornada = {
  type: "journey", kicker: "A jornada", title: "8 semanas: Basic e Pro",
  steps: [
    { label: "Semana 1 · Basic", icon: "target", title: "Diagnóstico", desc: "Mapeamos o escritório e definimos ICP e posicionamento." },
    { label: "Semana 2 · Basic", icon: "cog", title: "Presença Digital", desc: "Landing de alta conversão e Google Meu Negócio no ar." },
    { label: "Semana 3 · Basic", icon: "instagram", title: "Vitrine Instagram", desc: "Grid de 9 posts como vitrine de autoridade." },
    { label: "Semana 4 · Basic", icon: "trending", title: "Crescimento Semestral", desc: "Planejamento estruturado dos próximos 6 meses." },
    { label: "Semana 5 · Pro", icon: "megaphone", title: "Crescimento Orgânico", desc: "Live, outbound e LinkedIn como frentes de aquisição." },
    { label: "Semana 6 · Pro", icon: "handshake", title: "Social Selling", desc: "Conexão, autoridade e venda no digital." },
    { label: "Semana 7 · Pro", icon: "users", title: "Funil de Indicação", desc: "A cada 5 clientes, 1 nova reunião gerada." },
    { label: "Semana 8 · Pro", icon: "award", title: "Escala", desc: "Revisão, otimização e estratégia de continuidade." },
  ],
};

export const proposta = {
  slug: "proposta-evolucao-juridica", layout: "vertical",
  title: "Proposta · Evolução Jurídica",
  slides: [
    { type: "cover", kicker: "Proposta Comercial · E3 Digital",
      title: 'Evolução <span class="hl">Jurídica</span>',
      subtitle: "Marketing, posicionamento e vendas integrados em um único processo de crescimento para o seu escritório.",
      tag: "Basic + Pro · 8 semanas" },
    quemSomos,
    pmv,
    { type: "quote", text: "Marketing sem vendas é custo. Vendas sem marketing é esforço. <span class=\"hl\">Os dois juntos, com processo, é crescimento.</span>",
      author: "Método E3 · PMV" },
    { type: "section", num: "01", kicker: "Como funciona", title: "A jornada até o resultado",
      desc: "Um caminho com checkpoints semana a semana — o Basic te leva ao primeiro resultado, o Pro segue até a escala." },
    jornada,
    { type: "bullets", kicker: "Aprofundamento", title: "Os 3 funis de receita", cols: 3,
      lead: "Frentes independentes de aquisição, escolhidas conforme o perfil do escritório.",
      items: [
        { icon: "megaphone", title: "Crescimento Orgânico", desc: "Live, outbound e LinkedIn gerando demanda sem depender de tráfego pago." },
        { icon: "handshake", title: "Social Selling", desc: "Relacionamento digital que converte conexões em clientes." },
        { icon: "users", title: "Funil de Indicação", desc: "Cada base de clientes satisfeitos vira novas reuniões." },
      ] },
    { type: "final", title: "Vamos evoluir.",
      subtitle: "Do diagnóstico à escala, um processo desenhado para o crescimento do seu escritório.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const onboarding = {
  slug: "onboarding-evolucao-juridica",
  title: "Onboarding · Evolução Jurídica",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo à <span class="hl">Evolução Jurídica</span>',
      subtitle: "Vamos alinhar o método, a jornada de algumas semanas e o que precisamos de você para começar.",
      tag: "Basic + Pro · 8 semanas" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e o método PMV",
        "A jornada Basic (semanas 1–4)",
        "A jornada Pro (semanas 5–8)",
        "Os 3 funis de receita",
        "Próximos passos e acessos",
      ] },

    { type: "list", kicker: "Diagnóstico inicial", title: "Marco Zero", cols: 2,
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
        { icon: "layers", title: "Presença digital validada", desc: "Landing Page no ar e Google Meu Negócio otimizado, prontos para captar leads." },
        { icon: "instagram", title: "Autoridade no Instagram", desc: "Vitrine de conteúdo estruturada, reforçando a credibilidade do escritório." },
        { icon: "users", title: "Comercial capacitado", desc: "Time do cliente treinado para converter os leads gerados em contratos." },
        { icon: "trending", title: "Previsibilidade de novos contratos", desc: "Um processo repetível, do lead ao pitch de renovação." },
      ] },

    { type: "acronym", kicker: "Nossa metodologia",
      lead: "Uma solução completa de marketing e vendas, na qual fazemos escritórios de advocacia faturarem mais através da nossa metodologia CPP.",
      big: "CPP",
      pills: ["Canais de aquisição de clientes", "Produtos Jurídicos", "Processo comercial"] },

    { type: "timeline", kicker: "Cronograma · Evolução", title: "A jornada em 5 semanas",
      steps: [
        { label: "Semana 0", icon: "megaphone", title: "Kick-off & Onboarding", desc: "" },
        { label: "Semana 1", icon: "target", title: "Posicionamento", desc: "" },
        { label: "Semana 2", icon: "cog", title: "Presença Digital", desc: "" },
        { label: "Semana 3", icon: "instagram", title: "Capacitação & Vitrine", desc: "" },
        { label: "Semana 4", icon: "trending", title: "Resultados", desc: "" },
      ] },

    { type: "timeline", kicker: "Cronograma · Evolução Pro", title: "A jornada em 8 semanas",
      steps: [
        { label: "Semana 0", icon: "megaphone", title: "Kick-off & Onboarding", desc: "" },
        { label: "Semana 1", icon: "target", title: "Posicionamento", desc: "" },
        { label: "Semana 2", icon: "cog", title: "Presença Digital", desc: "" },
        { label: "Semana 3", icon: "instagram", title: "Capacitação & Vitrine", desc: "" },
        { label: "Semana 4", icon: "trending", title: "Resultados", desc: "" },
        { label: "Semana 5", icon: "users", title: "Prospecção Ativa", desc: "" },
        { label: "Semana 6", icon: "phone", title: "Live Estratégica TikTok", desc: "" },
        { label: "Semana 7", icon: "settings", title: "Otimização Comercial", desc: "" },
        { label: "Semana 8", icon: "award", title: "Resultados & Escala", desc: "" },
      ] },

    { type: "list", kicker: "Antes de estruturar o plano", title: "Quanto Tempo de Resultado?",
      lead: "Essas respostas nos ajudam a calibrar o cronograma e as prioridades do seu projeto:",
      items: [
        { icon: "search", text: "Como seu negócio é visto hoje? Qual posicionamento adotado?" },
        { icon: "settings", text: "Como funciona o processo comercial atualmente? Ferramentas, pessoas e processo?" },
        { icon: "chart", text: "Qual sua taxa de fechamento atualmente?" },
        { icon: "clock", text: "Quanto tempo o seu cliente demora para fechar com você?" },
      ] },

    { type: "bullets", kicker: "Diagnóstico de maturidade", title: "Onde também podemos ajudar seu escritório", cols: 3,
      lead: "Ao longo da conversa, vamos mapear juntos oportunidades como estas:",
      items: [
        { icon: "layers", title: "CRM", desc: "Organiza toda a jornada do lead, evitando que o investimento em anúncios se perca por falta de follow-up." },
        { icon: "zap", title: "IA de Atendimento", desc: "Triagem 24h que responde o lead em minutos e só passa ao advogado quem tem real potencial de fechar." },
        { icon: "award", title: "Identidade Visual & Branding", desc: "Uma imagem à altura da autoridade do escritório, para sustentar honorários premium." },
        { icon: "instagram", title: "Social Media", desc: "Um perfil ativo que vira \u201ccolateral de confiança\u201d para quem pesquisa o escritório após o anúncio." },
        { icon: "users", title: "Treinamento Comercial", desc: "Técnicas de venda para o time que atende o WhatsApp converter mais consultas em contratos." },
        { icon: "target", title: "Novas Landing Pages", desc: "Uma página por área de atuação para captar tráfego qualificado em cada frente rentável." },
      ] },

    { type: "bullets", kicker: "Reuniões e acompanhamento", title: "Nossas Reuniões e Acompanhamento", cols: 2,
      items: [
        { icon: "calendar", title: "Durante os próximos 30 dias · Consultoria e entregas", desc: "Reunião semanal conforme cronograma. Entregas e acompanhamento." },
        { icon: "trending", title: "Após 30 dias (Pro) · Busca da escala", desc: "Alinhamento e consultoria. Feedback do cliente e oportunidades de melhoria." },
      ],
      note: "Essas reuniões são fundamentais para garantir o alinhamento estratégico e maximizar os resultados do projeto." },

    { type: "reward", kicker: "Campanha de indicação", title: "Indique e ganhe R$ 300",
      lead: "Bons profissionais se conectam com outros excelentes profissionais. Indique um colega advogado ou parceiro de outro escritório e, se ele fechar com a E3, você é recompensado.",
      amount: "R$ 300,00", caption: "Em créditos de bonificação por indicação fechada.",
      optsTitle: "Como usar o seu crédito",
      options: [
        { icon: "megaphone", title: "Mídia paga", desc: "Adicione o valor no orçamento de anúncios gerenciado pela E3." },
        { icon: "handshake", title: "Abater na assessoria", desc: "Use para abater mensalidades ou novos serviços, como CRM, IA ou Identidade Visual." },
        { icon: "dollar", title: "Pix na conta", desc: "Receba o valor líquido direto por transferência." },
      ] },

    { type: "table", kicker: "Antes de fechar por hoje", title: "Próximos Passos · SLA da Semana 1",
      lead: "Para cumprir a Semana 2 (Landing Page + Google Meu Negócio) com maestria.",
      head: ["Responsável", "Ação"],
      rows: [
        ["Cliente", "Preencher o formulário de diagnóstico técnico: informações institucionais, fotos e biografia."],
        ["Cliente", "Enviar os acessos de domínio (Registro.br ou similar) e do perfil do Google Meu Negócio."],
        ["Equipe E3", "Criar o grupo operacional no WhatsApp e agendar os criativos para aprovação na semana seguinte."],
      ] },

    { type: "final", title: "Bora evoluir.",
      subtitle: "Seu primeiro passo: formulário de diagnóstico e acessos liberados para começar a Semana 1.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const offboarding = {
  slug: "offboarding-evolucao-juridica",
  title: "Entrega Final · Evolução Jurídica",
  slides: [
    { type: "cover", kicker: "Entrega Final · E3 Digital",
      title: 'O que <span class="hl">construímos</span> juntos',
      subtitle: "Uma retrospectiva de tudo que entregamos na Evolução Jurídica.",
      tag: "Basic + Pro · 8 semanas" },
    { type: "agenda", kicker: "Roteiro", title: "O que vamos revisar",
      items: ["O que entregamos", "A jornada percorrida", "Os funis ativados", "Próximos passos"] },
    { type: "bullets", kicker: "Entregas", title: "O que ficou pronto", cols: 2,
      items: [
        { icon: "cog", title: "Presença digital", desc: "Landing de conversão e Google Meu Negócio no ar." },
        { icon: "instagram", title: "Vitrine Instagram", desc: "Grid de autoridade estruturado e publicado." },
        { icon: "megaphone", title: "Funis de aquisição", desc: "Orgânico, social selling e indicação ativados." },
        { icon: "trending", title: "Plano de escala", desc: "Crescimento semestral estruturado com metas." },
      ] },
    { type: "timeline", kicker: "A jornada", title: "As 8 semanas percorridas", steps: jornada.steps },
    { type: "bullets", kicker: "Resultados", title: "O que mudou no seu escritório", cols: 3,
      items: [
        { icon: "award", title: "Autoridade", desc: "Posicionamento claro que justifica honorários premium." },
        { icon: "users", title: "Novos canais", desc: "Aquisição orgânica e por indicação funcionando." },
        { icon: "trending", title: "Crescimento", desc: "Um processo previsível, não dependente de sorte." },
      ] },
    { type: "bullets", kicker: "Continuidade", title: "Próximos passos", cols: 2,
      items: [
        { icon: "rocket", title: "Executar o semestral", desc: "Seguir o planejamento de crescimento definido." },
        { icon: "handshake", title: "Assessoria contínua", desc: "Acompanhamento para sustentar e escalar." },
      ] },
    { type: "final", title: "Obrigado pela parceria.",
      subtitle: "Do diagnóstico à escala — a evolução continua.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
