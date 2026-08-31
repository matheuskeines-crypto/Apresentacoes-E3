// Treinamento Comercial — versão genérica (sem diagnóstico, com funil de indicação + calculadora)
export const treinamentoComercial = {
  slug: "treinamento-comercial",
  title: "Treinamento Comercial",
  slides: [
    { type: "cover", kicker: "E3 Digital · Treinamento",
      title: 'Treinamento <span class="hl">Comercial</span>',
      subtitle: "O processo de vendas que transforma leads em clientes — e clientes em novas reuniões.",
      tag: "Playbook comercial E3" },

    { type: "agenda", kicker: "O que vamos ver", title: "Neste treinamento",
      items: [
        "O processo comercial estruturado",
        "O funil de vendas",
        "Abordagem e scripts",
        "Quebra de objeções",
        "O funil de indicação",
        "A calculadora de indicação",
      ] },

    { type: "bullets", kicker: "Fundamento", title: "Por que estruturar o comercial", cols: 2,
      lead: "Sem processo, cada venda depende de sorte e improviso. Com processo, o resultado vira rotina.",
      items: [
        { icon: "clock", title: "Velocidade de resposta", desc: "O lead quente esfria em minutos. Responder rápido é meio caminho da venda." },
        { icon: "layers", title: "Nada se perde", desc: "Todo lead tem um lugar no funil e um próximo passo definido." },
        { icon: "message", title: "Padrão de abordagem", desc: "Scripts garantem que o melhor atendimento não dependa de quem está no plantão." },
        { icon: "trending", title: "Previsibilidade", desc: "Métricas claras mostram onde melhorar e quanto você vai crescer." },
      ] },

    { type: "section", num: "01", kicker: "O caminho do lead", title: "O funil de vendas",
      desc: "Cada etapa tem um objetivo e um gatilho para a próxima." },

    { type: "timeline", kicker: "Etapas", title: "Do primeiro contato ao fechamento",
      steps: [
        { label: "Etapa 1", icon: "message", title: "Primeiro contato", desc: "Resposta rápida e acolhedora, com abordagem padronizada." },
        { label: "Etapa 2", icon: "crosshair", title: "Triagem & qualificação", desc: "Perguntas certas para entender a dor e priorizar quem tem fit." },
        { label: "Etapa 3", icon: "users", title: "Reunião / diagnóstico", desc: "Apresentação de valor conectada ao problema real do cliente." },
        { label: "Etapa 4", icon: "shield", title: "Quebra de objeções", desc: "Conduzir dúvidas de preço, tempo e confiança com segurança." },
        { label: "Etapa 5", icon: "handshake", title: "Fechamento", desc: "Proposta clara, próximo passo definido e senso de urgência." },
      ] },

    { type: "bullets", kicker: "Na prática", title: "Quebra de objeções", cols: 2,
      lead: "As objeções mais comuns e como conduzi-las sem pressão.",
      items: [
        { icon: "dollar", title: '"Está caro"', desc: "Traga o custo de não resolver o problema e ancore no valor, não no preço." },
        { icon: "clock", title: '"Preciso pensar"', desc: "Descubra a real dúvida por trás e ofereça o próximo passo mais leve." },
        { icon: "shield", title: '"Não conheço vocês"', desc: "Prova social, casos e autoridade reduzem o risco percebido." },
        { icon: "target", title: '"Não é o momento"', desc: "Mostre o custo da inação e ancore uma data concreta para retomar." },
      ] },

    { type: "section", num: "02", kicker: "Crescimento previsível", title: "O funil de indicação",
      desc: "Seus melhores clientes são seu melhor canal de aquisição." },

    { type: "bullets", kicker: "Como funciona", title: "Transformar satisfação em reuniões", cols: 3,
      items: [
        { icon: "award", title: "Peça no momento certo", desc: "Logo após uma entrega de valor, quando a satisfação está no pico." },
        { icon: "handshake", title: "Facilite a indicação", desc: "Roteiro e material prontos para o cliente indicar sem esforço." },
        { icon: "trending", title: "Acompanhe no funil", desc: "Cada indicação entra no CRM como uma oportunidade rastreável." },
      ] },

    { type: "stats", kicker: "A calculadora de indicação", title: "A cada 5 clientes, 1 nova reunião",
      items: [
        { v: "5", l: "clientes satisfeitos pedindo indicação" },
        { v: "1", l: "nova reunião qualificada gerada" },
        { v: "0", l: "custo de mídia por esse lead" },
      ],
      note: "Escale a base e a indicação vira um funil de receita constante e sem custo de aquisição." },

    { type: "quote", text: "Venda não é sorte, é <span class=\"hl\">processo</span>. E o melhor lead é o que um cliente feliz te entrega.",
      author: "E3 Digital · Playbook Comercial" },

    { type: "final", title: "Bora vender melhor.",
      subtitle: "Aplique o processo, registre tudo no CRM e ative o funil de indicação desde o primeiro cliente.",
      contact: "E3 Digital · o hub de marketing e vendas para advogados" },
  ],
};
