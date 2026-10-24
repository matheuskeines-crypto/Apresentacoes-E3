/* Live Estratégica no TikTok — treinamento do produto Evolução Jurídica.
   Público: advogados leigos em TikTok, treinados pela equipe E3. */

export const liveTiktok = {
  slug: "live-tiktok-evolucao-juridica",
  title: "Live Estratégica no TikTok · Evolução Jurídica",
  slides: [
    /* ───────────── abertura ───────────── */
    { type: "cover", kicker: "Evolução Jurídica · E3 Digital",
      title: 'Live Estratégica no <span class="hl">TikTok</span>',
      subtitle: "Como transformar uma transmissão ao vivo em autoridade, audiência e novos clientes — dentro das regras da OAB.",
      tag: "Evolução" },

    { type: "agenda", kicker: "Roteiro", title: "O que vamos ver hoje",
      items: [
        "As regras da OAB antes de gravar qualquer coisa",
        "O funil: atrair, reter e converter",
        "Atrair: ganchos, busca e storytelling",
        "A live: roteiro, retenção e o momento do convite",
        "Reter: stories, playlists e perguntas",
        "Converter: bio, chamada para ação e conversas",
        "O plano dos primeiros 30 dias",
      ] },

    { type: "stats", kicker: "O jogo em três números", title: "O que decide o resultado",
      items: [
        { v: "3s", l: "para prender quem está rolando a tela" },
        { v: "1.000", l: "seguidores para liberar a live" },
        { v: "45–60min", l: "a live que constrói autoridade" },
      ],
      note: "Não se trata de viralizar. Trata-se de ser encontrado pela pessoa certa e sustentar a atenção dela." },

    /* ───────────── 00 · OAB ───────────── */
    { type: "section", num: "00", kicker: "Antes de tudo", title: "As regras da OAB",
      desc: "Nenhuma estratégia aqui vale se custar o seu registro. Comece por aqui." },

    { type: "bullets", kicker: "Provimento 205/2021", title: "O que a norma permite", cols: 2,
      lead: "O advogado pode, sim, estar nas redes. A norma não proíbe presença — ela regula o tom.",
      items: [
        { icon: "pen", title: "Conteúdo informativo",
          desc: "Explicar a lei, comentar decisões e tirar dúvidas gerais sobre temas jurídicos." },
        { icon: "megaphone", title: "Live sobre tema jurídico",
          desc: "Transmitir ao vivo para informar o público e esclarecer dúvidas é atividade permitida." },
        { icon: "award", title: "Dizer quem você é",
          desc: "Suas áreas de atuação, sua formação e o seu escritório, em tom sóbrio e discreto." },
        { icon: "chart", title: "Impulsionar o conteúdo",
          desc: "Pagar para ampliar o alcance é aceito, desde que a peça siga informativa e sem oferta de serviço." },
      ],
      note: "Em resumo: o conteúdo pode circular e pode até ser impulsionado. O que ele não pode é vender." },

    { type: "rules", kicker: "Provimento 205/2021", title: "O que a norma proíbe",
      lead: "Três linhas que não se cruzam, por mais que o resultado pareça compensar.",
      items: [
        { icon: "alert", title: "Prometer resultado", badge: "VEDADO",
          desc: "Nada de “ganho garantido”, “processo certo” ou valores que o cliente vai receber." },
        { icon: "alert", title: "Captar clientela", badge: "VEDADO",
          desc: "Oferecer serviço a quem não procurou você, abordar vítimas ou aliciar pelo direct." },
        { icon: "alert", title: "Mercantilizar a profissão", badge: "VEDADO",
          desc: "Desconto, gratuidade, sensacionalismo e comparação com colegas como chamariz." },
      ],
      callout: { icon: "shield", title: "A régua é simples",
        desc: "Informe, não ofereça. Se o conteúdo ensina, pode. Se ele vende, pare e reescreva." } },

    { type: "table", kicker: "Provimento 205/2021", title: "Traduzindo para a prática",
      lead: "A mesma ideia, dita de um jeito que não te coloca em risco.",
      head: ["Não diga", "Diga no lugar"],
      rows: [
        ["“Consegui R$ 80 mil para o meu cliente.”", "“A lei prevê indenização nesses casos. O valor depende das provas.”"],
        ["“Primeira consulta grátis!”", "“Deixe a sua dúvida nos comentários que eu explico na próxima live.”"],
        ["“O melhor escritório trabalhista da cidade.”", "“Atuo com direito do trabalho há oito anos.”"],
        ["“Me chama no direct que eu resolvo o seu caso.”", "“As informações de contato estão no link da bio.”"],
        ["“Você tem direito, é garantido.”", "“Esse direito existe e depende de requisitos. Vou explicar quais.”"],
      ] },

    { type: "bullets", kicker: "Provimento 205/2021", title: "Três cuidados que quase todo mundo esquece", cols: 3,
      items: [
        { icon: "shield", title: "Sigilo profissional",
          desc: "Não conte o caso de um cliente de forma identificável. Trocar o nome não basta se os detalhes entregam quem é." },
        { icon: "alert", title: "Caso concreto não é espetáculo",
          desc: "Use o caso real só como exemplo genérico e anônimo. Processo em andamento, nunca." },
        { icon: "message", title: "Comentário não é consulta",
          desc: "Responder uma dúvida sobre a lei, pode. Dar o diagnóstico do caso daquela pessoa em público, não." },
      ],
      note: "O Provimento 205/2021 está em revisão pelo Conselho Federal. Até a publicação de uma nova norma, ele segue valendo — confirme a versão vigente antes de orientar o cliente." },

    { type: "quote", text: "Na advocacia, o conteúdo que vende afasta. O conteúdo que ensina aproxima.", author: "E3 Digital" },

    /* ───────────── 01 · funil ───────────── */
    { type: "section", num: "01", kicker: "A lógica", title: "Atrair, reter e converter",
      desc: "Cada formato do TikTok serve a uma etapa. Misturar os três no mesmo vídeo não funciona." },

    { type: "timeline", kicker: "O funil", title: "As três etapas",
      lead: "A live é o motor do meio do funil, mas ela só enche se o topo estiver girando.",
      steps: [
        { label: "Etapa 1", icon: "search", title: "Atrair",
          desc: "Vídeos curtos e busca. Quem não te conhece descobre que tem um problema com nome." },
        { label: "Etapa 2", icon: "users", title: "Reter",
          desc: "Stories, playlists e live. Quem já te viu volta, confia e passa a te acompanhar." },
        { label: "Etapa 3", icon: "handshake", title: "Converter",
          desc: "Bio, chamada para ação e conversa. Quem confia dá o passo e procura você." },
      ] },

    { type: "table", kicker: "Antes de começar", title: "O que já libera e o que vem depois",
      lead: "Boa parte dos recursos do TikTok só destrava com tamanho de conta. Saiba o que é possível hoje.",
      head: ["Recurso", "Exigência mais citada", "Dá para começar sem?"],
      rows: [
        ["Vídeos e busca", "Nenhuma", "Sim — comece por aqui"],
        ["Transmissão ao vivo", "Cerca de 1.000 seguidores e 18 anos", "Não"],
        ["Playlists", "Cerca de 10.000 seguidores", "Não"],
        ["TikTok Series (conteúdo pago)", "Conta madura e mercado habilitado", "Não"],
      ],
      note: "Os números variam por país e mudam sem aviso. Confirme sempre dentro do app, em Ferramentas de criador." },

    { type: "bullets", kicker: "Antes de começar", title: "Arrume a casa primeiro", cols: 2,
      items: [
        { icon: "cog", title: "Troque para conta profissional",
          desc: "Libera as métricas. Sem elas você não sabe o que funcionou e fica no achismo." },
        { icon: "crosshair", title: "Escolha um assunto só",
          desc: "Trabalhista para demitido. Previdenciário para aposentadoria. Conta que fala de tudo não é achada por ninguém." },
        { icon: "pen", title: "Arrume a bio",
          desc: "Em uma linha: para quem você fala e o que você resolve. Mais adiante tem o modelo." },
        { icon: "calendar", title: "Defina o dia da live",
          desc: "Mesmo dia, mesmo horário, toda semana. Previsibilidade vale mais que improviso." },
      ] },

    /* ───────────── 02 · atrair ───────────── */
    { type: "section", num: "02", kicker: "Topo de funil", title: "Atrair",
      desc: "Ninguém entra na sua live por acaso. Entra porque viu um vídeo seu antes." },

    { type: "bullets", kicker: "Atrair · gancho", title: "Os 3 primeiros segundos", cols: 2,
      items: [
        { icon: "message", title: "Pergunta que acusa o problema",
          desc: "“Você foi demitido e assinou tudo sem ler?” Quem viveu aquilo para de rolar a tela." },
        { icon: "alert", title: "O erro comum",
          desc: "“O erro que faz o INSS negar o seu pedido.” Medo de errar prende mais que promessa de ganhar." },
        { icon: "zap", title: "A contradição",
          desc: "“Pedir demissão pode ser a pior decisão da sua vida.” Quebra o que a pessoa achava que sabia." },
        { icon: "clock", title: "O prazo",
          desc: "“Você tem dois anos para entrar com essa ação.” Urgência real, sem inventar escassez." },
      ],
      note: "Comece falando o gancho olhando para a câmera. Nada de “oi, gente, tudo bem?” — isso custa os três segundos que você tem." },

    { type: "table", kicker: "Atrair · gancho", title: "Antes e depois",
      lead: "O assunto é o mesmo. O que muda é a primeira frase.",
      head: ["Gancho fraco", "Gancho forte"],
      rows: [
        ["“Olá, hoje vamos falar sobre rescisão indireta.”", "“Seu patrão não paga em dia? Você pode sair e receber tudo.”"],
        ["“Vou explicar o auxílio-doença.”", "“O INSS negou o seu atestado? Olha o que ninguém te contou.”"],
        ["“Hoje o tema é dano moral.”", "“Nome negativado por dívida que não é sua? Isso é indenizável.”"],
      ] },

    { type: "bullets", kicker: "Atrair · estrutura", title: "Todo vídeo tem três partes", cols: 3,
      items: [
        { icon: "zap", title: "Gancho · 0 a 3 segundos",
          desc: "A promessa. A pessoa precisa entender na hora que aquilo é sobre a vida dela." },
        { icon: "layers", title: "Corpo · até 50 segundos",
          desc: "A entrega da promessa. Ritmo rápido, corte seco, uma ideia por frase, zero enrolação." },
        { icon: "handshake", title: "Fecho · últimos 5 segundos",
          desc: "Um pedido só: seguir, salvar ou comentar. Natural, sem parecer vendedor." },
      ],
      note: "Se o corpo não entrega o que o gancho prometeu, o vídeo até alcança gente — mas destrói a confiança de quem assistiu." },

    { type: "bullets", kicker: "Atrair · busca", title: "O TikTok virou buscador", cols: 2,
      items: [
        { icon: "megaphone", title: "Fale a palavra em voz alta",
          desc: "A plataforma transcreve o áudio do vídeo. Dizer “rescisão indireta” com clareza ajuda a ser achado." },
        { icon: "pen", title: "Escreva na tela",
          desc: "Coloque a palavra-chave como texto nos primeiros segundos, onde a leitura já começa." },
        { icon: "search", title: "Repita na legenda",
          desc: "A palavra-chave logo no começo da legenda, em uma frase que faça sentido para quem lê." },
        { icon: "layers", title: "De 3 a 5 hashtags",
          desc: "Específicas do assunto. Encher de hashtag genérica não ajuda e ainda polui." },
      ],
      note: "A ferramenta Creator Search Insights, dentro do app, mostra o que as pessoas pesquisam e onde falta conteúdo sobre aquilo." },

    { type: "table", kicker: "Atrair · busca", title: "Fale como o cliente pesquisa",
      lead: "Ninguém digita o termo técnico na barra de busca. Digita a dor.",
      head: ["O cliente procura assim", "O advogado escreveria assim"],
      rows: [
        ["“fui demitido e não recebi nada”", "“verbas rescisórias inadimplidas”"],
        ["“aposentadoria por tempo de contribuição”", "“benefício previdenciário programado”"],
        ["“banco negativou meu nome sem dever”", "“inscrição indevida em cadastro restritivo”"],
        ["“posso faltar ao trabalho por doença”", "“ausência justificada por incapacidade laborativa”"],
      ],
      note: "Use a palavra do cliente no vídeo. A palavra técnica fica para a petição." },

    { type: "bullets", kicker: "Atrair · colaboração", title: "Duetos e costuras", cols: 2,
      items: [
        { icon: "users", title: "Dueto",
          desc: "Seu vídeo roda lado a lado com o de outra pessoa. Serve para reagir e comentar." },
        { icon: "layers", title: "Costura",
          desc: "Você recorta um trecho do vídeo de alguém e continua a partir dele. Serve para completar." },
        { icon: "shield", title: "O melhor uso no jurídico",
          desc: "Corrigir desinformação. Tem muito vídeo viral dando informação jurídica errada — e corrigir rende." },
        { icon: "alert", title: "O cuidado",
          desc: "Nunca para atacar colega, que é vedado pela OAB, nem para expor pessoa comum ao ridículo." },
      ] },

    { type: "timeline", kicker: "Atrair · narrativa", title: "A jornada do herói em 60 segundos",
      lead: "O herói é o cliente. Você é o guia que mostra o caminho — nunca o salvador da história.",
      steps: [
        { label: "0–5s", icon: "alert", title: "O monstro", desc: "O problema com nome: a carta de demissão, a negativa do INSS, a dívida que não é dele." },
        { label: "5–20s", icon: "users", title: "O herói", desc: "Uma pessoa comum, igual a quem está assistindo, sem saber o que fazer." },
        { label: "20–35s", icon: "search", title: "A busca", desc: "O que ela tentou e não deu certo. É aqui que quem assiste se reconhece." },
        { label: "35–50s", icon: "award", title: "A virada", desc: "O que a lei diz. O caminho que existia e ela não conhecia." },
        { label: "50–60s", icon: "handshake", title: "O recado", desc: "O aprendizado genérico, sem prometer resultado a ninguém." },
      ] },

    /* ───────────── 03 · a live ───────────── */
    { type: "section", num: "03", kicker: "O coração do método", title: "A live",
      desc: "É o único formato em que você tem tempo de explicar o complicado e ser visto pensando." },

    { type: "bullets", kicker: "A live", title: "Por que a live muda o jogo", cols: 2,
      items: [
        { icon: "rocket", title: "Alcance de quem não te segue",
          desc: "A transmissão aparece para seguidores e também para quem nunca te viu, enquanto ela está no ar." },
        { icon: "clock", title: "Tempo que o vídeo não dá",
          desc: "Em 60 segundos você levanta a dúvida. Em 60 minutos você resolve." },
        { icon: "users", title: "Confiança de verdade",
          desc: "A pessoa te vê pensar, hesitar e responder ao vivo. Isso não se edita — e é o que gera confiança." },
        { icon: "handshake", title: "Reciprocidade",
          desc: "Quem pergunta e é respondido pelo nome lembra de você quando precisar de um advogado." },
      ] },

    { type: "bullets", kicker: "A live · preparação", title: "O setup que resolve", cols: 3,
      items: [
        { icon: "phone", title: "Celular na vertical",
          desc: "Apoiado e firme, na altura dos olhos. Nada de segurar na mão por uma hora." },
        { icon: "zap", title: "Luz na frente",
          desc: "De frente para a janela ou com uma luz barata à frente. Luz atrás vira silhueta." },
        { icon: "megaphone", title: "Áudio acima de tudo",
          desc: "Fone com microfone e ambiente silencioso. As pessoas perdoam imagem ruim, som ruim não." },
        { icon: "refresh", title: "Internet estável",
          desc: "De preferência cabo ou wi-fi perto do roteador. Se cair, volte na hora e siga." },
        { icon: "search", title: "Título com palavra-chave",
          desc: "“Demissão sem justa causa: o que você tem a receber” acha mais gente que “Live de quinta”." },
        { icon: "pen", title: "Roteiro impresso ao lado",
          desc: "Tópicos, não texto corrido. Ler na tela mata a naturalidade na hora." },
      ] },

    { type: "timeline", kicker: "A live · roteiro", title: "A live em cinco blocos",
      lead: "Uma hora sem roteiro vira monólogo. Com blocos, cada trecho tem uma função.",
      steps: [
        { label: "0–5 min", icon: "megaphone", title: "Aquecimento", desc: "Diga o tema, prometa o que vem e espere gente chegar — conversando, nunca em silêncio." },
        { label: "5–20 min", icon: "alert", title: "O problema", desc: "A dor, em detalhe. Quem está assistindo precisa pensar “é exatamente o meu caso”." },
        { label: "20–40 min", icon: "layers", title: "O conteúdo", desc: "O passo a passo. O que a lei diz, o que fazer primeiro, que documento separar." },
        { label: "40–50 min", icon: "message", title: "Perguntas", desc: "O pico de retenção. Responda pelo nome e use a caixa de perguntas do app." },
        { label: "50–60 min", icon: "handshake", title: "Convite e fecho", desc: "O convite consultivo, o resumo e a data da próxima live." },
      ] },

    { type: "table", kicker: "A live · roteiro", title: "O que dizer em cada bloco",
      head: ["Bloco", "O que fazer", "Frase que funciona"],
      rows: [
        ["Aquecimento", "Repetir o tema a cada 2 minutos", "“Quem está chegando: hoje é sobre demissão sem justa causa.”"],
        ["O problema", "Descrever a situação em detalhe", "“Se você assinou a rescisão sem conferir, presta atenção aqui.”"],
        ["O conteúdo", "Entregar o passo a passo", "“São três documentos. Anota aí: o primeiro é...”"],
        ["Perguntas", "Responder chamando pelo nome", "“Boa pergunta, Marcos. Isso muda se você tinha carteira assinada.”"],
        ["Convite e fecho", "Convidar sem pressionar", "“Quem quiser entender o próprio caso, o contato está na bio.”"],
      ] },

    { type: "bullets", kicker: "A live · retenção", title: "Como segurar quem entrou", cols: 2,
      items: [
        { icon: "refresh", title: "Recomece a cada 5 minutos",
          desc: "Entra gente nova o tempo todo. Repita o tema e onde você está, sem medo de soar repetitivo." },
        { icon: "pen", title: "Fixe um comentário",
          desc: "Com a instrução do dia: a pergunta que você vai responder ou o que a pessoa deve digitar." },
        { icon: "message", title: "Chame pelo nome",
          desc: "Ler o nome de quem comentou faz o resto da sala comentar também. É o gatilho mais barato que existe." },
        { icon: "clock", title: "Anuncie o que vem",
          desc: "“Daqui a dez minutos eu mostro o cálculo.” Dá motivo concreto para ficar." },
      ],
      note: "O pior erro é abrir a live e ficar em silêncio esperando encher. Comece a falar com uma pessoa na sala." },

    { type: "rules", kicker: "A live · conversão", title: "O momento do convite",
      lead: "O pitch existe. Ele só não pode vir antes de você ter entregue alguma coisa.",
      items: [
        { icon: "clock", title: "Só depois de entregar", badge: "MINUTO 50",
          desc: "Quem convida no minuto 5 esvazia a sala. Quem entregou 45 minutos ganhou o direito de convidar." },
        { icon: "message", title: "Convite, não oferta", badge: "COMO",
          desc: "“Se quiser entender o seu caso, o contato está na bio” — e só. Sem insistir, sem repetir cinco vezes." },
        { icon: "pen", title: "Deixe o caminho pronto", badge: "ONDE",
          desc: "Comentário fixado com a instrução e o link da bio atualizado antes de abrir a transmissão." },
      ],
      callout: { icon: "shield", title: "O limite da OAB",
        desc: "Convide para a informação, nunca prometa o resultado. Dizer o que você faz é permitido; garantir o que o cliente vai ganhar, não." } },

    { type: "table", kicker: "A live · linguagem", title: "Formal demais x nativo",
      lead: "O TikTok não perdoa discurso de tribunal. A mesma competência, em outra embalagem.",
      head: ["Engessado", "Nativo"],
      rows: [
        ["“Prezados, sejam bem-vindos a esta transmissão.”", "“Fala! Hoje eu vou te explicar por que o INSS nega.”"],
        ["“Conforme preceitua o artigo 7º da Constituição...”", "“A lei diz o seguinte, em português:”"],
        ["“Cumpre esclarecer que a jurisprudência diverge.”", "“Olha só: tem juiz que entende de um jeito, tem juiz que entende de outro.”"],
        ["“Agradeço a audiência de todos.”", "“Se isso te ajudou, salva aí. Quinta tem mais.”"],
      ],
      note: "Ser informal não é ser impreciso. A informação continua exata — o que muda é a palavra escolhida." },

    { type: "list", kicker: "A live · erros", title: "O que derruba uma live", cols: 2,
      items: [
        { icon: "alert", text: "Abrir sem dizer o tema e esperar a sala encher em silêncio." },
        { icon: "alert", text: "Ler slide ou texto corrido em vez de conversar." },
        { icon: "alert", text: "Sumir procurando um arquivo ou ajustando a câmera no meio." },
        { icon: "alert", text: "Gastar dez minutos no caso de uma única pessoa." },
        { icon: "alert", text: "Prometer resultado ou falar de valores recebidos." },
        { icon: "alert", text: "Encerrar sem dizer quando é a próxima." },
      ] },

    /* ───────────── 04 · reter ───────────── */
    { type: "section", num: "04", kicker: "Meio de funil", title: "Reter",
      desc: "Entre uma live e outra, a audiência precisa de motivo para continuar por perto." },

    { type: "bullets", kicker: "Reter", title: "As três ferramentas do meio", cols: 3,
      items: [
        { icon: "clock", title: "Stories",
          desc: "Vídeos curtos de bastidor que somem em 24 horas. O caminho para o escritório, o livro na mesa, o lembrete da live." },
        { icon: "layers", title: "Playlists",
          desc: "Agrupam os vídeos por tema e fazem a pessoa assistir um atrás do outro. Destravam com conta maior." },
        { icon: "message", title: "Caixa de perguntas",
          desc: "Responder em vídeo uma pergunta real do público. Cada resposta vira conteúdo novo e quebra uma objeção." },
      ],
      note: "Toda pergunta repetida é um vídeo esperando para ser gravado — e provavelmente é o que mais gente pesquisa." },

    { type: "table", kicker: "Reter · rotina", title: "A semana que sustenta o ritmo",
      lead: "O que funciona não é intensidade, é constância. Esta é a semana mínima.",
      head: ["Dia", "O que fazer", "Tempo"],
      rows: [
        ["Segunda", "Um vídeo que responde a uma dúvida pesquisada", "20 min"],
        ["Terça", "Um story de bastidor e o aviso da live", "5 min"],
        ["Quarta", "Um vídeo com gancho forte ou áudio em alta", "20 min"],
        ["Quinta", "A LIVE, de 45 a 60 minutos", "1 hora"],
        ["Sexta", "Recortar o melhor trecho da live e publicar", "20 min"],
        ["Fim de semana", "Responder comentários e mensagens", "15 min"],
      ],
      note: "Some tudo: menos de três horas por semana. O que derruba o resultado é pular a quinta-feira." },

    /* ───────────── 05 · converter ───────────── */
    { type: "section", num: "05", kicker: "Fundo de funil", title: "Converter",
      desc: "A pessoa confia em você. Agora o caminho até a conversa precisa ser óbvio." },

    { type: "bullets", kicker: "Converter · bio", title: "A bio em quatro linhas", cols: 2,
      items: [
        { icon: "crosshair", title: "Para quem você fala",
          desc: "“Para quem foi demitido e desconfia que recebeu menos.” Específico, não “advogado trabalhista”." },
        { icon: "check", title: "O que você resolve",
          desc: "O problema em palavras do cliente, não o nome da tese jurídica." },
        { icon: "award", title: "A prova sóbria",
          desc: "Anos de atuação, área, OAB. Sem superlativo, sem “o melhor”, sem número de causas ganhas." },
        { icon: "handshake", title: "Para onde ir",
          desc: "Um link só. Dois caminhos é o mesmo que nenhum — a pessoa trava e sai." },
      ],
      note: "Exemplo: “Explico direito do trabalho para quem foi demitido. 8 anos de atuação. Dúvidas e contato no link.”" },

    { type: "bullets", kicker: "Converter · chamada", title: "Como convidar sem vender", cols: 2,
      items: [
        { icon: "message", title: "Uma ação por conteúdo",
          desc: "Ou seguir, ou salvar, ou comentar, ou ir ao link. Pedir quatro coisas é não pedir nenhuma." },
        { icon: "pen", title: "Comentário fixado na live",
          desc: "A instrução escrita vale mais que a falada, porque quem chega atrasado também lê." },
        { icon: "clock", title: "No fim, não no começo",
          desc: "Entregue primeiro. O convite no início soa como anúncio e a pessoa sai." },
        { icon: "shield", title: "Convite, nunca promessa",
          desc: "“Entenda o seu caso” pode. “Garanto o seu direito” é vedação expressa da OAB." },
      ] },

    { type: "rules", kicker: "Converter · conversas", title: "Mensagens diretas: a linha que não se cruza",
      lead: "Esta é a parte mais sensível do método para quem é advogado. Leia com atenção.",
      items: [
        { icon: "check", title: "Responder quem procurou você", badge: "PODE",
          desc: "A pessoa comentou, perguntou ou chamou no direct. Responder é atendimento, não captação." },
        { icon: "check", title: "Chamar quem pediu para ser chamado", badge: "PODE",
          desc: "Ela escreveu “quero saber mais” ou deixou o contato. O convite partiu dela." },
        { icon: "alert", title: "Abordar quem não procurou", badge: "VEDADO",
          desc: "Oferecer serviço a quem só assistiu é captação. Procurar vítima de acidente ou pessoa em luto é a forma mais grave dela." },
      ],
      callout: { icon: "shield", title: "O teste de uma pergunta",
        desc: "Quem começou a conversa? Se foi o cliente, siga. Se foi você, pare — por mais quente que pareça a oportunidade." } },

    { type: "bullets", kicker: "Converter · conteúdo pago", title: "TikTok Series: só quando fizer sentido", cols: 2,
      items: [
        { icon: "layers", title: "O que é",
          desc: "Uma coleção de vídeos bloqueados que o seguidor paga para assistir, dentro do próprio TikTok." },
        { icon: "alert", title: "Quem consegue hoje",
          desc: "Exige conta madura, histórico limpo e disponibilidade no mercado. Para a maioria dos escritórios, ainda não é realidade." },
        { icon: "shield", title: "O cuidado do advogado",
          desc: "Vender informação jurídica em série exige cuidado redobrado com promessa de resultado e com consultoria disfarçada." },
        { icon: "check", title: "O que fazer enquanto isso",
          desc: "Trate a live semanal gratuita como o seu produto de autoridade. Ela converte mais do que conteúdo pago para conta pequena." },
      ] },

    /* ───────────── 06 · execução ───────────── */
    { type: "section", num: "06", kicker: "Colocar de pé", title: "Os primeiros 30 dias",
      desc: "Nada aqui depende de equipamento caro nem de talento para câmera. Depende de calendário." },

    { type: "timeline", kicker: "Plano", title: "Mês 1, semana a semana",
      steps: [
        { label: "Semana 1", icon: "cog", title: "Arrumar a casa", desc: "Conta profissional, bio nova e os três primeiros vídeos de busca no ar." },
        { label: "Semana 2", icon: "refresh", title: "Pegar ritmo", desc: "Três vídeos, um story por dia e a escolha do tema da primeira live." },
        { label: "Semana 3", icon: "megaphone", title: "A primeira live", desc: "De 30 a 45 minutos, com o roteiro em blocos na mão. Vai sair torta — e tudo bem." },
        { label: "Semana 4", icon: "chart", title: "Repetir e medir", desc: "Segunda live, recortes no ar e a primeira leitura séria dos números." },
      ] },

    { type: "table", kicker: "Medir", title: "Os números que importam",
      lead: "Seguidor não paga honorário. Olhe para o que indica intenção.",
      head: ["Indicador", "Onde ver", "O que ele diz"],
      rows: [
        ["Espectadores únicos", "Resumo da live", "Quantas pessoas novas viram você"],
        ["Tempo médio de permanência", "Resumo da live", "Se o conteúdo segura ou se as pessoas fogem"],
        ["Comentários durante a live", "Durante a transmissão", "Se existe conversa ou se é monólogo"],
        ["Novos seguidores na live", "Painel de métricas", "Se a transmissão virou audiência"],
        ["Cliques no link da bio", "Linktree ou site", "Se o convite funcionou"],
        ["Conversas iniciadas", "WhatsApp ou direct", "O único número que vira contrato"],
      ] },

    { type: "list", kicker: "Checklist", title: "Antes de apertar o botão", cols: 2,
      items: [
        { icon: "check", text: "Título da live com a palavra que o cliente pesquisa." },
        { icon: "check", text: "Roteiro em cinco blocos, em tópicos, ao lado." },
        { icon: "check", text: "Link da bio atualizado e testado no celular." },
        { icon: "check", text: "Comentário para fixar já escrito e copiado." },
        { icon: "check", text: "Luz na frente, celular firme, fone no ouvido." },
        { icon: "check", text: "Avisado nos stories e no vídeo do dia anterior." },
        { icon: "check", text: "Nenhuma promessa de resultado no roteiro." },
        { icon: "check", text: "Data da próxima live já definida para anunciar." },
      ] },

    { type: "final", title: "Informe. Ensine. Depois convide.",
      subtitle: "Autoridade no TikTok não se compra com anúncio nem se força com venda. Constrói-se aparecendo toda semana, explicando bem e respeitando a regra da profissão." },
  ],
};
