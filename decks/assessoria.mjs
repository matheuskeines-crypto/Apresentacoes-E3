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
      title: 'Bem-vindo à <span class="hl">Assessoria</span>',
      subtitle: "O sprint de 17 dias começa agora. Vamos alinhar o cronograma, os acessos e o que cada um entrega em cada etapa.",
      tag: "Light & Pro · 17 dias" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e o seu plano (Light ou Pro)",
        "O cronograma dia a dia",
        "As entregas de cada etapa",
        "Acessos e responsabilidades",
        "Próximos passos",
      ] },
    { type: "timeline", kicker: "Cronograma", title: "O sprint dia a dia", steps: jornada.steps },
    { type: "table", kicker: "Corresponsabilidade", title: "O que precisamos de você (SLAs)",
      head: ["Responsável", "Ação", "Prazo"],
      rows: [
        ["Cliente", "Participar do kick-off e do onboarding, preencher o formulário", "Dias 1, 2 e 6"],
        ["Cliente", "Liberar acessos (perfis, domínio, ferramentas)", "Até o dia 2"],
        ["Equipe E3", "Executar planejamento, copy, página e campanhas", "Conforme cronograma"],
        ["Ambos", "Alinhamento comercial final", "Dia 17"],
      ] },
    { type: "final", title: "Bora pro dia 1.",
      subtitle: "Seu sprint começa com o vídeo de kick-off. Deixe seus acessos prontos até o dia 2.",
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
