// Estruturação de Instagram (setup de perfil) — proposta + onboarding
const quemSomos = { type: "stats", kicker: "Quem somos", title: "Referência em presença jurídica digital",
  items: [
    { v: "+1.000", l: "escritórios atendidos" },
    { v: "R$ 200M+", l: "em honorários gerados" },
    { v: "#1", l: "do Brasil no nicho" },
  ] };

const jornada = {
  type: "journey", kicker: "A jornada", title: "Do diagnóstico ao perfil no ar",
  steps: [
    { label: "Etapa 1", icon: "search", title: "Diagnóstico do perfil", desc: "Analisamos perfil atual, nicho e cliente ideal." },
    { label: "Etapa 2", icon: "award", title: "Posicionamento & bio", desc: "Reescrevemos bio, @ e a mensagem de autoridade." },
    { label: "Etapa 3", icon: "target", title: "Identidade visual", desc: "Paleta, tipografia e templates do feed." },
    { label: "Etapa 4", icon: "instagram", title: "Vitrine de 9 posts", desc: "Grid inicial que estabelece autoridade." },
    { label: "Etapa 5", icon: "layers", title: "Destaques & organização", desc: "Highlights e navegação do perfil estruturados." },
    { label: "Etapa 6", icon: "check", title: "Perfil no ar", desc: "Publicação e orientação para manter consistência." },
  ],
};

export const proposta = {
  slug: "proposta-estruturacao-instagram", layout: "vertical",
  title: "Proposta · Estruturação de Instagram",
  slides: [
    { type: "cover", kicker: "Proposta Comercial · E3 Digital",
      title: 'Estruturação de <span class="hl">Instagram</span>',
      subtitle: "Transformamos seu perfil em uma vitrine de autoridade que atrai o cliente certo e transmite confiança.",
      tag: "Setup de perfil · E3" },
    quemSomos,
    { type: "bullets", kicker: "O produto", title: "O que estruturamos", cols: 2,
      lead: "Cada elemento do perfil pensado para converter visitante em contato.",
      items: [
        { icon: "award", title: "Bio & posicionamento", desc: "Nome, @ e bio que dizem em segundos por que te contratar." },
        { icon: "instagram", title: "Vitrine de 9 posts", desc: "Grid que transmite autoridade no primeiro olhar." },
        { icon: "layers", title: "Destaques", desc: "Highlights que respondem dúvidas antes do direct." },
        { icon: "target", title: "Identidade visual", desc: "Cores, fontes e templates alinhados à sua marca." },
      ] },
    { type: "section", num: "01", kicker: "Como funciona", title: "A jornada de estruturação",
      desc: "Do diagnóstico do perfil ao grid no ar." },
    jornada,
    { type: "bullets", kicker: "A vitrine", title: "O primeiro lote de conteúdo", cols: 3,
      lead: "Nove peças com propósito, não apenas bonitas.",
      items: [
        { icon: "award", title: "Autoridade", desc: "Quem você é e por que confiar em você." },
        { icon: "message", title: "Educação", desc: "Respostas às dúvidas mais comuns do cliente." },
        { icon: "handshake", title: "Prova & conexão", desc: "Casos, bastidores e chamadas para contato." },
      ] },
    { type: "quote", text: "Seu perfil é a primeira reunião com o cliente. Ele precisa vender <span class=\"hl\">autoridade</span> antes de você dizer uma palavra.",
      author: "E3 Digital · Estruturação de Instagram" },
    { type: "final", title: "Vamos estruturar seu perfil.",
      subtitle: "Uma vitrine digital que trabalha por você 24 horas por dia.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const onboarding = {
  slug: "onboarding-estruturacao-instagram",
  title: "Onboarding · Estruturação de Instagram",
  slides: [
    { type: "cover", kicker: "Onboarding · E3 Digital",
      title: 'Bem-vindo à <span class="hl">Estruturação</span>',
      subtitle: "Vamos alinhar o posicionamento, a identidade e o que precisamos de você para colocar seu perfil no ar.",
      tag: "Setup de perfil · E3" },
    { type: "agenda", kicker: "Roteiro da reunião", title: "O que vamos alinhar hoje",
      items: [
        "Boas-vindas e objetivos do perfil",
        "Diagnóstico do perfil atual",
        "As etapas da estruturação",
        "A vitrine de 9 posts",
        "Acessos e materiais",
      ] },
    { type: "timeline", kicker: "Etapas", title: "A jornada de estruturação", steps: jornada.steps },
    { type: "table", kicker: "Corresponsabilidade", title: "O que precisamos de você (SLAs)",
      head: ["Responsável", "Ação", "Prazo"],
      rows: [
        ["Cliente", "Liberar acesso ao perfil e enviar fotos e informações", "Até 48h"],
        ["Cliente", "Aprovar bio, identidade visual e vitrine", "Até 48h após envio"],
        ["Equipe E3", "Estruturar posicionamento, identidade e grid inicial", "Conforme cronograma"],
      ] },
    { type: "final", title: "Bora pro ar.",
      subtitle: "Primeiro passo: liberar o acesso ao perfil e nos enviar fotos e informações.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};

export const offboarding = {
  slug: "offboarding-estruturacao-instagram",
  title: "Entrega Final · Estruturação de Instagram",
  slides: [
    { type: "cover", kicker: "Entrega Final · E3 Digital",
      title: 'O que <span class="hl">construímos</span> juntos',
      subtitle: "Uma retrospectiva da estruturação do seu perfil.",
      tag: "Setup de perfil · E3" },
    { type: "agenda", kicker: "Roteiro", title: "O que vamos revisar",
      items: ["O que estruturamos", "A jornada percorrida", "O perfil no ar", "Próximos passos"] },
    { type: "bullets", kicker: "Entregas", title: "O que ficou pronto", cols: 2,
      items: [
        { icon: "award", title: "Bio & posicionamento", desc: "Nome, @ e bio de autoridade reescritos." },
        { icon: "target", title: "Identidade visual", desc: "Paleta, tipografia e templates definidos." },
        { icon: "instagram", title: "Vitrine de 9 posts", desc: "Grid inicial de autoridade publicado." },
        { icon: "layers", title: "Destaques", desc: "Highlights e navegação organizados." },
      ] },
    { type: "timeline", kicker: "A jornada", title: "As etapas percorridas", steps: jornada.steps },
    { type: "bullets", kicker: "Continuidade", title: "Próximos passos", cols: 2,
      items: [
        { icon: "pen", title: "Manter consistência", desc: "Seguir a linha visual e de conteúdo definida." },
        { icon: "handshake", title: "Gestão de conteúdo", desc: "Evoluir para a produção mensal com a E3." },
      ] },
    { type: "final", title: "Obrigado pela parceria.",
      subtitle: "Seu perfil virou uma vitrine de autoridade — agora é manter no ar.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
