/* Live Estratégica no TikTok — treinamento do produto Evolução Jurídica.
   Público: advogados leigos em TikTok, treinados pela equipe E3.
   As figuras são SVG inline, desenhadas para explicar sem depender de foto. */

/* ── fig. 1: o que vai em cada parte da tela e do tempo ── */
const figVideo = `<svg viewBox="0 0 940 352" role="img" aria-label="Celular mostrando onde fica o texto na tela, o rosto, a faixa coberta pela interface e a legenda, e abaixo a divisão do tempo do vídeo">
  <rect x="30" y="14" width="170" height="290" rx="22" class="fig-card-2" stroke-width="1.5"/>
  <rect x="38" y="22" width="154" height="274" rx="16" fill="rgba(0,0,0,.45)"/>
  <rect x="47" y="42" width="120" height="28" rx="7" class="fig-o-soft" stroke-width="1.5"/>
  <text x="56" y="61" class="fig-t" font-size="11.5">FUI DEMITIDO E...</text>
  <circle cx="108" cy="150" r="24" fill="rgba(255,255,255,.14)"/>
  <path d="M80 202c0-17 12-28 28-28s28 11 28 28z" fill="rgba(255,255,255,.14)"/>
  <rect x="152" y="108" width="34" height="128" rx="9" class="fig-dash" stroke-width="1.5"/>
  <circle cx="169" cy="130" r="7" fill="rgba(255,255,255,.3)"/>
  <circle cx="169" cy="158" r="7" fill="rgba(255,255,255,.3)"/>
  <circle cx="169" cy="186" r="7" fill="rgba(255,255,255,.3)"/>
  <circle cx="169" cy="214" r="7" fill="rgba(255,255,255,.3)"/>
  <rect x="47" y="252" width="96" height="6" rx="3" fill="rgba(255,255,255,.4)"/>
  <rect x="47" y="265" width="70" height="6" rx="3" class="fig-o" opacity=".75"/>
  <g class="fig-dash" stroke-width="1.5">
    <path d="M167 56h58"/><path d="M132 150h93"/><path d="M186 196h39l0 10"/><path d="M143 258h82l0 4"/>
  </g>
  <g>
    <circle cx="240" cy="56" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="240" y="61" class="fig-t-o" font-size="12.5" text-anchor="middle">1</text>
    <circle cx="240" cy="150" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="240" y="155" class="fig-t-o" font-size="12.5" text-anchor="middle">2</text>
    <circle cx="240" cy="206" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="240" y="211" class="fig-t-o" font-size="12.5" text-anchor="middle">3</text>
    <circle cx="240" cy="262" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="240" y="267" class="fig-t-o" font-size="12.5" text-anchor="middle">4</text>
  </g>
  <text x="272" y="51" class="fig-t">Texto na tela, no topo</text>
  <text x="272" y="70" class="fig-t-sm">A palavra-chave escrita, já nos primeiros segundos.</text>
  <text x="272" y="145" class="fig-t">Seu rosto no centro</text>
  <text x="272" y="164" class="fig-t-sm">Olhando para a câmera, sem ler nada fora do enquadramento.</text>
  <text x="272" y="201" class="fig-t">A interface do app cobre esta faixa</text>
  <text x="272" y="220" class="fig-t-sm">Nada de texto na lateral direita nem no rodapé: some atrás dos botões.</text>
  <text x="272" y="257" class="fig-t">Legenda e hashtags</text>
  <text x="272" y="276" class="fig-t-sm">Palavra-chave no começo da legenda e de 3 a 5 hashtags do assunto.</text>
  <text x="30" y="312" class="fig-t-o">A MESMA LÓGICA NO TEMPO DO VÍDEO</text>
  <rect x="30" y="324" width="42" height="26" rx="6" class="fig-o"/>
  <rect x="76" y="324" width="740" height="26" rx="6" fill="rgba(255,95,31,.30)"/>
  <rect x="820" y="324" width="90" height="26" rx="6" fill="rgba(255,95,31,.55)"/>
  <text x="51" y="342" class="fig-t" font-size="11" text-anchor="middle">0–3s</text>
  <text x="446" y="342" class="fig-t" font-size="13" text-anchor="middle">Corpo — entrega o que o gancho prometeu</text>
  <text x="865" y="342" class="fig-t" font-size="11" text-anchor="middle">fecho</text>
</svg>`;

/* ── fig. 2: setup certo e errado, lado a lado ── */
const cena = (ok) => {
  const luzX = ok ? 72 : 368;
  return `
  <rect x="0" y="18" width="430" height="300" rx="18" class="fig-card" stroke-width="1.5"/>
  <circle cx="30" cy="50" r="13" fill="${ok ? "rgba(74,222,128,.16)" : "rgba(248,113,113,.16)"}" stroke="${ok ? "#4ade80" : "#f87171"}" stroke-width="1.5"/>
  <text x="30" y="55" class="${ok ? "fig-ok" : "fig-no"}" font-family="DM Sans, sans-serif" font-size="14" font-weight="800" text-anchor="middle">${ok ? "✓" : "✕"}</text>
  <text x="52" y="56" class="fig-t" font-size="15">${ok ? "Assim funciona" : "Assim não"}</text>
  <circle cx="${luzX}" cy="148" r="20" fill="rgba(255,220,150,${ok ? ".9" : ".35"})"/>
  <g stroke="rgba(255,220,150,${ok ? ".55" : ".22"})" stroke-width="2" stroke-linecap="round">
    <path d="M${luzX - 32} 148h-12"/><path d="M${luzX + 32} 148h12"/>
    <path d="M${luzX} 116v-12"/><path d="M${luzX} 180v12"/>
  </g>
  <circle cx="215" cy="150" r="28" fill="rgba(255,255,255,${ok ? ".16" : ".07"})"/>
  <path d="M176 232c0-23 17-38 39-38s39 15 39 38z" fill="rgba(255,255,255,${ok ? ".16" : ".07"})"/>
  ${ok
    ? `<rect x="318" y="118" width="52" height="88" rx="8" class="fig-card-2" stroke-width="1.5"/>
       <path d="M344 206v32" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
       <path d="M326 250l18-12 18 12" class="fig-dash" stroke-width="2"/>
       <path d="M253 150h58" class="fig-dash" stroke-width="1.5"/>`
    : `<rect x="318" y="206" width="88" height="52" rx="8" class="fig-card-2" stroke-width="1.5" transform="rotate(14 362 232)"/>`}
  <text x="20" y="288" class="fig-t" font-size="13.5">${ok ? "Luz de frente, celular na vertical e na altura dos olhos." : "Luz atrás vira silhueta. Celular baixo distorce o rosto."}</text>
  <text x="20" y="307" class="fig-t-sm">${ok ? "A janela ou a luminária ficam atrás da câmera, iluminando o rosto." : "Janela às costas, celular na mesa apontando para cima."}</text>`;
};
const figSetup = `<svg viewBox="0 0 940 330" role="img" aria-label="Comparação entre o setup correto, com luz de frente e celular na altura dos olhos, e o errado, com luz atrás e celular baixo">
  <g transform="translate(20,0)">${cena(true)}</g>
  <g transform="translate(490,0)">${cena(false)}</g>
</svg>`;

/* ── fig. 3: os 60 minutos da live ── */
const BLOCOS = [
  { min: 5,  n: "1", d: "0–5 min",   t: "Aquecimento",     l: "Diga o tema e espere gente chegar conversando." },
  { min: 15, n: "2", d: "5–20 min",  t: "O problema",      l: "A dor em detalhe, até o clique de “é o meu caso”." },
  { min: 20, n: "3", d: "20–40 min", t: "O conteúdo",      l: "O passo a passo e os documentos necessários." },
  { min: 10, n: "4", d: "40–50 min", t: "Perguntas",       l: "O pico. Responda pelo nome de quem perguntou." },
  { min: 10, n: "5", d: "50–60 min", t: "Convite e fecho", l: "O convite consultivo e a data da próxima." },
];
/* quebra o texto em linhas de no máximo `max` caracteres, sem cortar palavra */
const wrap = (txt, max) => txt.split(" ").reduce((ls, w) => {
  const i = ls.length - 1;
  if (ls[i] && (ls[i] + " " + w).length <= max) ls[i] += " " + w; else ls.push(w);
  return ls;
}, []);

const BAR_X = 30, BAR_W = 880, COL_W = BAR_W / BLOCOS.length;
let _bx = BAR_X;
const figLive = `<svg viewBox="0 0 940 322" role="img" aria-label="Barra de 60 minutos dividida nos cinco blocos da live, com a função de cada bloco">
  <path d="M30 40h880" class="fig-dash" stroke-width="1"/>
  <text x="30" y="32" class="fig-t-sm" font-size="11">0 min</text>
  <text x="910" y="32" class="fig-t-sm" font-size="11" text-anchor="end">60 min</text>
  ${BLOCOS.map((b, i) => {
    const w = (b.min / 60) * BAR_W, x = _bx; _bx += w;
    const colX = BAR_X + i * COL_W;
    const op = [0.28, 0.42, 0.62, 0.86, 1][i];
    return `<g>
      <rect x="${x + 2}" y="52" width="${w - 4}" height="52" rx="8" fill="rgba(255,95,31,${op})"/>
      <text x="${x + w / 2}" y="84" class="fig-t" font-size="15" text-anchor="middle">${b.n}</text>
      <path d="M${x + w / 2} 104v14h${colX + 12 - (x + w / 2)}v12" class="fig-dash" stroke-width="1.2"/>
      <text x="${colX}" y="148" class="fig-t-o" font-size="11">${b.d}</text>
      <text x="${colX}" y="169" class="fig-t" font-size="14.5">${b.t}</text>
      ${wrap(b.l, 27).map((ln, k) => `<text x="${colX}" y="${190 + k * 17}" class="fig-t-sm" font-size="11.5">${ln}</text>`).join("")}
    </g>`;
  }).join("")}
  <g transform="translate(30,252)">
    <rect x="0" y="0" width="300" height="54" rx="12" class="fig-card" stroke-width="1.5"/>
    <text x="16" y="23" class="fig-t-o" font-size="11">A CADA 5 MINUTOS</text>
    <text x="16" y="42" class="fig-t-sm">Repita o tema: entra gente nova o tempo todo.</text>
  </g>
  <g transform="translate(610,252)">
    <rect x="0" y="0" width="300" height="54" rx="12" class="fig-o-soft" stroke-width="1.5"/>
    <text x="16" y="23" class="fig-t-o" font-size="11">O MOMENTO DO CONVITE</text>
    <text x="16" y="42" class="fig-t-sm">Só no bloco 5. Antes disso, a sala esvazia.</text>
  </g>
</svg>`;

/* ── fig. 4: a bio do perfil, linha a linha ── */
const figBio = `<svg viewBox="0 0 940 330" role="img" aria-label="Perfil do TikTok com as quatro linhas da bio numeradas">
  <rect x="30" y="14" width="280" height="300" rx="20" class="fig-card-2" stroke-width="1.5"/>
  <circle cx="170" cy="70" r="30" fill="rgba(255,255,255,.12)"/>
  <circle cx="170" cy="62" r="11" fill="rgba(255,255,255,.3)"/>
  <path d="M153 90c0-9 8-16 17-16s17 7 17 16z" fill="rgba(255,255,255,.3)"/>
  <text x="170" y="124" class="fig-t" font-size="14" text-anchor="middle">@dra.nome.trabalhista</text>
  <g class="fig-t-sm" font-size="11" text-anchor="middle">
    <text x="112" y="150">128  Seguindo</text><text x="236" y="150">4.902  Seguidores</text>
  </g>
  <text x="52" y="186" class="fig-t" font-size="12.5">Direito do trabalho para quem</text>
  <text x="52" y="204" class="fig-t" font-size="12.5">foi demitido e recebeu menos.</text>
  <text x="52" y="226" class="fig-t-sm">8 anos de atuação · OAB/SP 000.000</text>
  <rect x="52" y="240" width="236" height="32" rx="9" class="fig-o-soft" stroke-width="1.5"/>
  <text x="66" y="261" class="fig-t" font-size="12.5" fill="#FF5F1F">contato e dúvidas →</text>
  <rect x="52" y="282" width="236" height="26" rx="8" fill="rgba(255,255,255,.07)"/>
  <text x="170" y="299" class="fig-t-sm" font-size="11.5" text-anchor="middle">Seguir</text>
  <g class="fig-dash" stroke-width="1.5">
    <path d="M316 184h60"/><path d="M316 202l30 18h30"/><path d="M316 226l30 30h30"/><path d="M316 256l30 36h30"/>
  </g>
  <g>
    <circle cx="392" cy="184" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="392" y="189" class="fig-t-o" font-size="12.5" text-anchor="middle">1</text>
    <circle cx="392" cy="220" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="392" y="225" class="fig-t-o" font-size="12.5" text-anchor="middle">2</text>
    <circle cx="392" cy="256" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="392" y="261" class="fig-t-o" font-size="12.5" text-anchor="middle">3</text>
    <circle cx="392" cy="292" r="14" class="fig-o-soft" stroke-width="1.5"/><text x="392" y="297" class="fig-t-o" font-size="12.5" text-anchor="middle">4</text>
  </g>
  <text x="422" y="189" class="fig-t">Para quem você fala — “quem foi demitido”, não “advogado trabalhista”.</text>
  <text x="422" y="225" class="fig-t">O que você resolve — na palavra do cliente, não no nome da tese.</text>
  <text x="422" y="261" class="fig-t">A prova sóbria — tempo de atuação e OAB, sem “o melhor”.</text>
  <text x="422" y="297" class="fig-t">Um link só — dois caminhos é o mesmo que nenhum.</text>
</svg>`;

export const liveTiktok = {
  slug: "live-tiktok-evolucao-juridica",
  title: "Live Estratégica no TikTok · Evolução Jurídica",
  slides: [
    { type: "cover", kicker: "Evolução Jurídica · E3 Digital",
      title: 'Live Estratégica no <span class="hl">TikTok</span>',
      subtitle: "Como transformar uma transmissão ao vivo em autoridade, audiência e novos clientes — dentro das regras da OAB.",
      tag: "Evolução" },

    /* ── 00 · OAB ── */
    { type: "section", num: "00", kicker: "Antes de tudo", title: "As regras da OAB",
      desc: "Nenhuma técnica aqui vale se custar o seu registro. Três linhas não se cruzam." },

    { type: "rules", kicker: "Provimento 205/2021", title: "O que a norma proíbe",
      lead: "Estar nas redes pode. Fazer live para informar pode. Até impulsionar conteúdo informativo pode. O que não pode é vender.",
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
      ],
      note: "Sigilo: nunca conte o caso de um cliente de forma identificável — trocar o nome não basta se os detalhes entregam quem é. A norma está em revisão pelo Conselho Federal; confirme a versão vigente antes de treinar o cliente." },

    /* ── 01 · a lógica ── */
    { type: "timeline", kicker: "01 · A lógica", title: "Atrair, reter e converter",
      lead: "Cada formato serve a uma etapa. A live é o motor do meio, mas só enche se o topo estiver girando.",
      steps: [
        { label: "Etapa 1", icon: "search", title: "Atrair", desc: "Vídeos curtos e busca. Quem não te conhece descobre que tem um problema com nome." },
        { label: "Etapa 2", icon: "users", title: "Reter", desc: "Stories, playlists e live. Quem já te viu volta, confia e passa a te acompanhar." },
        { label: "Etapa 3", icon: "handshake", title: "Converter", desc: "Bio, chamada para ação e conversa. Quem confia dá o passo e procura você." },
      ] },

    { type: "table", kicker: "01 · Antes de começar", title: "O que já libera e o que vem depois",
      lead: "Boa parte dos recursos do TikTok só destrava com tamanho de conta.",
      head: ["Recurso", "Exigência mais citada", "Dá para começar sem?"],
      rows: [
        ["Vídeos e busca", "Nenhuma", "Sim — comece por aqui"],
        ["Transmissão ao vivo", "Cerca de 1.000 seguidores e 18 anos", "Não"],
        ["Playlists", "Cerca de 10.000 seguidores", "Não"],
        ["TikTok Series (conteúdo pago)", "Conta madura e mercado habilitado", "Não"],
      ],
      note: "Os números variam por país e mudam sem aviso: confirme dentro do app, em Ferramentas de criador. Enquanto Series e playlists não liberam, a live semanal gratuita é o seu produto de autoridade." },

    /* ── 02 · atrair ── */
    { type: "section", num: "02", kicker: "Topo de funil", title: "Atrair",
      desc: "Ninguém entra na sua live por acaso. Entra porque viu um vídeo seu antes." },

    { type: "figure", kicker: "02 · Atrair", title: "Onde vai cada coisa no vídeo",
      lead: "O que ocupa cada parte da tela — e cada parte do tempo.",
      figure: figVideo,
      note: "O erro mais comum é escrever um texto longo no rodapé — justamente onde os botões do app cobrem a tela." },

    { type: "bullets", kicker: "02 · Atrair", title: "Os 3 primeiros segundos", cols: 2,
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
      note: "Comece falando o gancho olhando para a câmera. “Oi, gente, tudo bem?” custa os três segundos que você tem." },

    { type: "table", kicker: "02 · Atrair", title: "Antes e depois do gancho",
      lead: "O assunto é o mesmo. O que muda é a primeira frase.",
      head: ["Gancho fraco", "Gancho forte"],
      rows: [
        ["“Olá, hoje vamos falar sobre rescisão indireta.”", "“Seu patrão não paga em dia? Você pode sair e receber tudo.”"],
        ["“Vou explicar o auxílio-doença.”", "“O INSS negou o seu atestado? Olha o que ninguém te contou.”"],
        ["“Hoje o tema é dano moral.”", "“Nome negativado por dívida que não é sua? Isso é indenizável.”"],
      ] },

    { type: "bullets", kicker: "02 · Busca", title: "O TikTok virou buscador", cols: 2,
      items: [
        { icon: "megaphone", title: "Fale a palavra em voz alta",
          desc: "A plataforma transcreve o áudio. Dizer “rescisão indireta” com clareza ajuda a ser achado." },
        { icon: "pen", title: "Escreva na tela e na legenda",
          desc: "A palavra-chave como texto nos primeiros segundos e logo no começo da legenda." },
        { icon: "layers", title: "De 3 a 5 hashtags",
          desc: "Específicas do assunto. Encher de hashtag genérica não ajuda e ainda polui." },
        { icon: "search", title: "Procure o que falta",
          desc: "A ferramenta Creator Search Insights mostra o que as pessoas pesquisam e onde há pouco conteúdo." },
      ] },

    { type: "table", kicker: "02 · Busca", title: "Fale como o cliente pesquisa",
      lead: "Ninguém digita o termo técnico na barra de busca. Digita a dor.",
      head: ["O cliente procura assim", "O advogado escreveria assim"],
      rows: [
        ["“fui demitido e não recebi nada”", "“verbas rescisórias inadimplidas”"],
        ["“aposentadoria por tempo de contribuição”", "“benefício previdenciário programado”"],
        ["“banco negativou meu nome sem dever”", "“inscrição indevida em cadastro restritivo”"],
      ],
      note: "Use a palavra do cliente no vídeo. A palavra técnica fica para a petição." },

    { type: "timeline", kicker: "02 · Narrativa", title: "A jornada do herói em 60 segundos",
      lead: "O herói é o cliente. Você é o guia que mostra o caminho — nunca o salvador da história.",
      steps: [
        { label: "0–5s", icon: "alert", title: "O monstro", desc: "O problema com nome: a carta de demissão, a negativa do INSS, a dívida que não é dele." },
        { label: "5–25s", icon: "users", title: "O herói", desc: "Uma pessoa comum, igual a quem assiste, sem saber o que fazer. É aqui que ela se reconhece." },
        { label: "25–50s", icon: "award", title: "A virada", desc: "O que a lei diz. O caminho que existia e ela não conhecia." },
        { label: "50–60s", icon: "handshake", title: "O recado", desc: "O aprendizado genérico, sem prometer resultado a ninguém." },
      ] },

    { type: "bullets", kicker: "02 · Alcance", title: "Duetos e costuras", cols: 2,
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

    /* ── 03 · a live ── */
    { type: "section", num: "03", kicker: "O coração do método", title: "A live",
      desc: "É o único formato em que você tem tempo de explicar o complicado e ser visto pensando." },

    { type: "figure", kicker: "03 · A live", title: "O setup que resolve",
      lead: "Não precisa de estúdio. Precisa de luz na frente e celular firme na altura certa.",
      figure: figSetup,
      note: "Áudio importa mais que imagem: use fone com microfone e um ambiente silencioso. As pessoas perdoam imagem ruim, som ruim não." },

    { type: "figure", kicker: "03 · Roteiro", title: "A live em cinco blocos",
      lead: "Uma hora sem roteiro vira monólogo. Com blocos, cada trecho tem uma função.",
      figure: figLive,
      note: "Leve os cinco blocos impressos em tópicos ao lado do celular. Ler texto corrido na tela mata a naturalidade na hora." },

    { type: "table", kicker: "03 · Roteiro", title: "O que dizer em cada bloco",
      head: ["Bloco", "O que fazer", "Frase que funciona"],
      rows: [
        ["1 · Aquecimento", "Repetir o tema a cada 2 minutos", "“Quem está chegando: hoje é sobre demissão sem justa causa.”"],
        ["2 · O problema", "Descrever a situação em detalhe", "“Se você assinou a rescisão sem conferir, presta atenção aqui.”"],
        ["3 · O conteúdo", "Entregar o passo a passo", "“São três documentos. Anota aí: o primeiro é...”"],
        ["4 · Perguntas", "Responder chamando pelo nome", "“Boa pergunta, Marcos. Isso muda se você tinha carteira assinada.”"],
        ["5 · Convite", "Convidar sem pressionar", "“Quem quiser entender o próprio caso, o contato está na bio.”"],
      ] },

    { type: "bullets", kicker: "03 · Retenção", title: "Como segurar quem entrou", cols: 2,
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

    { type: "rules", kicker: "03 · Conversão", title: "O momento do convite",
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

    { type: "table", kicker: "03 · Linguagem", title: "Formal demais x nativo",
      lead: "O TikTok não perdoa discurso de tribunal. A mesma competência, em outra embalagem.",
      head: ["Engessado", "Nativo"],
      rows: [
        ["“Prezados, sejam bem-vindos a esta transmissão.”", "“Fala! Hoje eu vou te explicar por que o INSS nega.”"],
        ["“Conforme preceitua o artigo 7º da Constituição...”", "“A lei diz o seguinte, em português:”"],
        ["“Cumpre esclarecer que a jurisprudência diverge.”", "“Tem juiz que entende de um jeito, tem juiz que entende de outro.”"],
        ["“Agradeço a audiência de todos.”", "“Se isso te ajudou, salva aí. Quinta tem mais.”"],
      ],
      note: "Ser informal não é ser impreciso. A informação continua exata — o que muda é a palavra escolhida." },

    /* ── 04 · reter e converter ── */
    { type: "section", num: "04", kicker: "Meio e fundo de funil", title: "Reter e converter",
      desc: "Entre uma live e outra, a audiência precisa de motivo para ficar — e de um caminho óbvio até você." },

    { type: "bullets", kicker: "04 · Reter", title: "As três ferramentas do meio", cols: 3,
      items: [
        { icon: "clock", title: "Stories",
          desc: "Vídeos curtos de bastidor que somem em 24 horas. O caminho para o escritório, o lembrete da live." },
        { icon: "layers", title: "Playlists",
          desc: "Agrupam os vídeos por tema e fazem a pessoa assistir um atrás do outro. Destravam com conta maior." },
        { icon: "message", title: "Caixa de perguntas",
          desc: "Responder em vídeo uma pergunta real do público. Cada resposta vira conteúdo novo e quebra uma objeção." },
      ],
      note: "Toda pergunta repetida é um vídeo esperando para ser gravado — e provavelmente é o que mais gente pesquisa." },

    { type: "table", kicker: "04 · Rotina", title: "A semana que sustenta o ritmo",
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

    { type: "figure", kicker: "04 · Converter", title: "A bio que converte",
      lead: "É o único lugar do TikTok onde você pode ser direto sobre o que faz. Quatro linhas bastam.",
      figure: figBio,
      note: "Sem superlativo, sem “o melhor”, sem número de causas ganhas — tudo isso é vedação da OAB." },

    { type: "rules", kicker: "04 · Converter", title: "Mensagens diretas: a linha que não se cruza",
      lead: "Esta é a parte mais sensível do método para quem é advogado.",
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

    /* ── 05 · execução ── */
    { type: "timeline", kicker: "05 · Plano", title: "Os primeiros 30 dias",
      lead: "Nada aqui depende de equipamento caro nem de talento para câmera. Depende de calendário.",
      steps: [
        { label: "Semana 1", icon: "cog", title: "Arrumar a casa", desc: "Conta profissional, bio nova e os três primeiros vídeos de busca no ar." },
        { label: "Semana 2", icon: "refresh", title: "Pegar ritmo", desc: "Três vídeos, um story por dia e a escolha do tema da primeira live." },
        { label: "Semana 3", icon: "megaphone", title: "A primeira live", desc: "De 30 a 45 minutos, com o roteiro em blocos na mão. Vai sair torta — e tudo bem." },
        { label: "Semana 4", icon: "chart", title: "Repetir e medir", desc: "Segunda live, recortes no ar e a primeira leitura séria dos números." },
      ] },

    { type: "table", kicker: "05 · Medir", title: "Os números que importam",
      lead: "Seguidor não paga honorário. Olhe para o que indica intenção.",
      head: ["Indicador", "Onde ver", "O que ele diz"],
      rows: [
        ["Espectadores únicos", "Resumo da live", "Quantas pessoas novas viram você"],
        ["Tempo médio de permanência", "Resumo da live", "Se o conteúdo segura ou se as pessoas fogem"],
        ["Novos seguidores na live", "Painel de métricas", "Se a transmissão virou audiência"],
        ["Cliques no link da bio", "Linktree ou site", "Se o convite funcionou"],
        ["Conversas iniciadas", "WhatsApp ou direct", "O único número que vira contrato"],
      ] },

    { type: "list", kicker: "05 · Checklist", title: "Antes de apertar o botão — e durante", cols: 2,
      items: [
        { icon: "check", text: "Título da live com a palavra que o cliente pesquisa." },
        { icon: "check", text: "Roteiro em cinco blocos, em tópicos, ao lado." },
        { icon: "check", text: "Link da bio atualizado e testado no celular." },
        { icon: "check", text: "Comentário para fixar já escrito e copiado." },
        { icon: "check", text: "Luz na frente, celular firme, fone no ouvido." },
        { icon: "alert", text: "Nunca ficar em silêncio esperando a sala encher." },
        { icon: "alert", text: "Nenhuma promessa de resultado no roteiro." },
        { icon: "check", text: "Data da próxima live definida para anunciar no fim." },
      ] },

    { type: "final", title: "Informe. Ensine. Depois convide.",
      subtitle: "Autoridade no TikTok não se compra com anúncio nem se força com venda. Constrói-se aparecendo toda semana, explicando bem e respeitando a regra da profissão." },
  ],
};
