// Social Media (gestão de redes) — proposta + onboarding
const quemSomos = { type: "stats", kicker: "Quem somos", title: "Marketing jurídico que gera resultado",
  items: [
    { v: "+1.000", l: "escritórios atendidos" },
    { v: "R$ 200M+", l: "em honorários gerados" },
    { v: "#1", l: "do Brasil no nicho" },
  ] };

const fluxo = {
  type: "journey", kicker: "Como trabalhamos", title: "O ciclo mensal de conteúdo",
  steps: [
    { label: "Etapa 1", icon: "target", title: "Planejamento", desc: "Temas, formatos e objetivos do mês." },
    { label: "Etapa 2", icon: "pen", title: "Roteiro & copy", desc: "Textos na sua voz e no seu posicionamento." },
    { label: "Etapa 3", icon: "instagram", title: "Design & edição", desc: "Peças e vídeos dentro da identidade visual." },
    { label: "Etapa 4", icon: "check", title: "Aprovação", desc: "Você revisa e aprova antes de publicar." },
    { label: "Etapa 5", icon: "calendar", title: "Publicação", desc: "Agendamento nos melhores horários." },
    { label: "Etapa 6", icon: "chart", title: "Análise", desc: "Relatório de desempenho e ajustes do ciclo." },
  ],
};

export const proposta = {
  slug: "proposta-social-media", layout: "vertical",
  title: "Proposta · Social Media",
  slides: [
    { type: "cover", kicker: "Proposta Comercial · E3 Digital",
      title: 'Social <span class="hl">Media</span>',
      subtitle: "Presença digital consistente e estratégica: conteúdo que constrói autoridade e atrai o cliente certo.",
      tag: "Gestão de redes · E3" },
    quemSomos,
    { type: "bullets", kicker: "O serviço", title: "O que entregamos", cols: 2,
      lead: "Uma operação de conteúdo completa, do planejamento à publicação.",
      items: [
        { icon: "target", title: "Estratégia de conteúdo", desc: "Linha editorial alinhada ao seu posicionamento." },
        { icon: "instagram", title: "Feed & Stories", desc: "Posts e carrosséis que transmitem autoridade." },
        { icon: "megaphone", title: "Reels & vídeo", desc: "Formatos pensados para alcance e crescimento." },
        { icon: "calendar", title: "Calendário editorial", desc: "Planejamento mensal, sem correria." },
      ] },
    { type: "section", num: "01", kicker: "Como funciona", title: "O ciclo mensal de conteúdo",
      desc: "Um fluxo previsível que roda todo mês." },
    fluxo,
    { type: "bullets", kicker: "O que medimos", title: "Métricas que importam", cols: 3,
      items: [
        { icon: "trending", title: "Alcance & crescimento", desc: "Novos perfis alcançados e seguidores qualificados." },
        { icon: "message", title: "Engajamento", desc: "Salvamentos, compartilhamentos e conversas no direct." },
        { icon: "users", title: "Conversão", desc: "Contatos e leads gerados a partir do conteúdo." },
      ] },
    { type: "quote", text: "Presença digital não é postar por postar. É <span class=\"hl\">construir autoridade</span> que atrai o cliente certo.",
      author: "E3 Digital · Social Media" },
    { type: "final", title: "Vamos ao ar.",
      subtitle: "Conteúdo estratégico, consistente e com a sua cara — todo mês.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const onboarding = {
  slug: "onboarding-social-media",
  title: "Onboarding · Social Media",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo ao <span class="hl">Social Media</span>',
      subtitle: "Vamos alinhar a linha editorial, o fluxo de produção e o que precisamos de você a cada mês.",
      tag: "Gestão de redes · E3" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e objetivos",
        "A linha editorial do seu escritório",
        "O ciclo mensal de produção",
        "Aprovações e prazos",
        "Materiais que precisamos de você",
      ] },
    { type: "timeline", kicker: "Fluxo mensal", title: "Do planejamento à publicação", steps: fluxo.steps },
    { type: "table", kicker: "Corresponsabilidade", title: "O que precisamos de você (SLAs)",
      head: ["Responsável", "Ação", "Prazo"],
      rows: [
        ["Cliente", "Enviar materiais brutos (fotos, bastidores, casos)", "Conforme pauta mensal"],
        ["Cliente", "Aprovar o conteúdo dentro da janela combinada", "Até 48h após envio"],
        ["Equipe E3", "Planejar, produzir, agendar e reportar resultados", "Ciclo mensal"],
      ] },
    { type: "final", title: "Bora ao ar.",
      subtitle: "Primeiro passo: alinhar a linha editorial e nos enviar os primeiros materiais.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const offboarding = {
  slug: "offboarding-social-media",
  title: "Entrega Final · Social Media",
  slides: [
    { type: "cover", kicker: "Entrega Final · E3 Digital",
      title: 'O que <span class="hl">construímos</span> juntos',
      subtitle: "Uma retrospectiva do trabalho de Social Media realizado no período.",
      tag: "Gestão de redes · E3" },
    { type: "agenda", kicker: "Roteiro", title: "O que vamos revisar",
      items: ["O que produzimos", "O ciclo percorrido", "Desempenho do conteúdo", "Próximos passos"] },
    { type: "bullets", kicker: "Entregas", title: "O que produzimos", cols: 2,
      items: [
        { icon: "target", title: "Linha editorial", desc: "Estratégia de conteúdo alinhada ao posicionamento." },
        { icon: "instagram", title: "Feed & Stories", desc: "Posts e carrosséis de autoridade publicados." },
        { icon: "megaphone", title: "Reels & vídeo", desc: "Formatos de alcance produzidos e postados." },
        { icon: "chart", title: "Relatórios", desc: "Análise mensal de desempenho e ajustes." },
      ] },
    { type: "timeline", kicker: "O ciclo", title: "O fluxo mensal percorrido", steps: fluxo.steps },
    { type: "bullets", kicker: "Resultados", title: "O que o conteúdo trouxe", cols: 3,
      items: [
        { icon: "trending", title: "Alcance", desc: "Mais perfis certos alcançados no período." },
        { icon: "message", title: "Engajamento", desc: "Mais conversas e salvamentos gerados." },
        { icon: "users", title: "Autoridade", desc: "Um perfil que transmite confiança e converte." },
      ] },
    { type: "bullets", kicker: "Continuidade", title: "Próximos passos", cols: 2,
      items: [
        { icon: "rocket", title: "Escalar formatos", desc: "Investir no que mais engajou no período." },
        { icon: "handshake", title: "Seguir no ciclo", desc: "Manter a consistência mês a mês." },
      ] },
    { type: "final", title: "Obrigado pela parceria.",
      subtitle: "Construímos uma presença consistente — vamos manter no ar.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
