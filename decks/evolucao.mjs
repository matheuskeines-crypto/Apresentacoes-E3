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
      title: 'Bem-vindo à <span class="hl">Evolução</span>',
      subtitle: "Vamos alinhar o método, a jornada de 8 semanas e o que precisamos de você para começar.",
      tag: "Basic + Pro · 8 semanas" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e o método PMV",
        "A jornada Basic (semanas 1–4)",
        "A jornada Pro (semanas 5–8)",
        "Os 3 funis de receita",
        "Próximos passos e acessos",
      ] },
    pmv,
    { type: "timeline", kicker: "Cronograma", title: "A jornada de 8 semanas", steps: jornada.steps },
    { type: "table", kicker: "Corresponsabilidade", title: "O que precisamos de você (SLAs)",
      head: ["Responsável", "Ação", "Prazo"],
      rows: [
        ["Cliente", "Preencher formulário de diagnóstico e liberar acessos", "Até 48h"],
        ["Equipe E3", "Abrir canal de comunicação e agendar as sessões", "No mesmo dia"],
        ["Ambos", "Aprovar as entregas de cada semana para não travar o cronograma", "Semanalmente"],
      ] },
    { type: "final", title: "Bora evoluir.",
      subtitle: "Seu primeiro passo: formulário de diagnóstico e acessos liberados em até 48h.",
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
