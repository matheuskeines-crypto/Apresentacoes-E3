// Gera os materiais de Teses (explicação + faixa de CPL por tese) em slides 16:9.
// Fonte do CPL: régua de benchmarks do Painel E3 (cpl_benchmarks) — 73 teses em 11 áreas.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  shell, LOGO_B64_PATH, makePageFactory, secHead, tbl, statRow,
  tag, rules, notabar,
} from "./playbook-kit.mjs";

const LOGO = readFileSync(LOGO_B64_PATH, "utf8").trim();
const LOGO_URI = `data:image/png;base64,${LOGO}`;

const ic = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[n]}</svg>`;
const hot = () => tag("MAIOR PROCURA", "tag-pro");
const cplChip = (c) => (c ? `<span class="cpl">CPL ${c}</span>` : "");

const distRoot = fileURLToPath(new URL("../dist", import.meta.url));

/* ─────────────────────────────── áreas e teses ───────────────────────────────
   cpl: faixa da régua do painel. Teses sem cpl ainda não têm benchmark próprio.  */
const AREAS = [
  {
    slug: "tese-previdenciario", nome: "Previdenciário", titulo: 'Direito <span>Previdenciário</span>',
    faixa: "R$ 4 a R$ 18", benchTeses: 10,
    subtitle: "Benefícios do INSS: quem tem direito, o que cada tese resolve e quanto custa o lead de cada uma.",
    pills: ["BPC/LOAS", "Auxílio-doença", "Salário-maternidade", "Aposentadoria", "Revisão"],
    nota: { t: "Contexto", d: "Boa parte roda na via administrativa, sem honorários iniciais, com desfecho em <b>60 a 90 dias</b>. Conversão média de <b>5% a 10%</b>." },
    teses: [
      { t: "Benefício negado ou cessado", cpl: "R$ 4–12", d: "O INSS indeferiu ou cortou o benefício. Lead já qualificado: tem a carta de indeferimento na mão." },
      { t: "Pensão por morte", cpl: "R$ 5–15", d: "Para cônjuge, companheiro(a) e filhos do segurado falecido. Cabe revisão quando o INSS paga a menos." },
      { t: "BPC / LOAS", cpl: "R$ 6–12", hot: true, d: "Um salário mínimo para pessoa com deficiência ou idoso de 65+ anos em situação de baixa renda." },
      { t: "Salário-maternidade", cpl: "R$ 6–15", d: "120 dias para mães seguradas: MEI, autônoma, rural, desempregada no período de graça e adoção." },
      { t: "Lei da anistia", cpl: "R$ 6–15", d: "Reparação e reintegração de anistiados políticos e servidores demitidos por motivação política." },
      { t: "Benefício INSS (genérico)", cpl: "R$ 6–16", d: "Campanha guarda-chuva de “você tem direito a um benefício”. Capta volume alto e a triagem define a tese certa." },
      { t: "Auxílio-doença", cpl: "R$ 7–15", d: "Quem está temporariamente incapaz de trabalhar por mais de 15 dias, por doença, acidente ou gravidez de risco." },
      { t: "Auxílio-acidente", cpl: "R$ 7–15", d: "Sequela permanente de acidente que reduz a capacidade de trabalho. Acumula com o salário." },
      { t: "Aposentadoria", cpl: "R$ 8–18", d: "Por idade (65 anos homem / 62 mulher, 15 anos de contribuição), tempo de contribuição, especial ou invalidez." },
      { t: "Revisão de benefício", cpl: "R$ 8–18", d: "Recálculo de benefício concedido com erro — aumenta a renda mensal e gera atrasados." },
    ],
  },
  {
    slug: "tese-trabalhista", nome: "Trabalhista", titulo: 'Direito <span>Trabalhista</span>',
    faixa: "R$ 5 a R$ 18", benchTeses: 8,
    subtitle: "As teses de maior volume da carteira: ações rápidas, em geral sem honorários iniciais e resolvidas por acordo.",
    pills: ["Vínculo", "Verbas rescisórias", "Horas extras", "Insalubridade", "Risco psicossocial"],
    nota: { t: "Contexto", d: "Muita demanda e ticket acessível — a maioria fecha em acordo. Conversão média de <b>8% a 15%</b>." },
    teses: [
      { t: "Reconhecimento de vínculo", cpl: "R$ 5–10", hot: true, d: "Trabalhou sem carteira assinada, em geral por mais de 3 meses. Busca o registro e todas as verbas do período." },
      { t: "Verbas rescisórias", cpl: "R$ 6–12", hot: true, d: "Demissão sem justa causa sem pagar direito aviso, 13º, férias + 1/3, FGTS e multa de 40%." },
      { t: "Horas extras", cpl: "R$ 6–12", d: "Jornada além de 8h/dia ou 44h/semana sem o adicional de 50% — inclui banco de horas irregular." },
      { t: "Trabalhista (genérico)", cpl: "R$ 6–18", d: "Campanha guarda-chuva de “seus direitos trabalhistas”. Capta volume e a triagem identifica a tese certa." },
      { t: "Assédio moral", cpl: "R$ 8–16", d: "Humilhação, cobrança abusiva e exposição reiterada — gera dano moral e, às vezes, rescisão indireta." },
      { t: "Acidente de trabalho", cpl: "R$ 8–16", d: "Acidente ou doença ocupacional nos últimos 5 anos: estabilidade e indenização por danos." },
      { t: "Insalubridade e periculosidade", cpl: "R$ 8–18", d: "Exposição a agente nocivo (10%, 20% ou 40%) ou risco de vida (30%) sem o adicional pago." },
      { t: "Risco psicossocial (NR-1)", cpl: "R$ 8–18", d: "Desde 26/05/2026 a empresa deve mapear riscos à saúde mental no PGR. A omissão sustenta dano moral." },
      { t: "Rescisão indireta", d: "Falta grave da empresa (salário atrasado, assédio): o empregado sai e recebe como demitido sem justa causa." },
    ],
  },
  {
    slug: "tese-bancario", nome: "Bancário", titulo: 'Direito <span>Bancário</span>',
    faixa: "R$ 5 a R$ 90", benchTeses: 8,
    subtitle: "Do consignado indevido à reestruturação de dívida empresarial — da tese mais popular à de maior ticket.",
    pills: ["Servidor endividado", "Golpe do Pix", "RMC", "Superendividamento", "Gestão de passivo"],
    teses: [
      { t: "Servidor endividado", cpl: "R$ 5–15", d: "Servidor público com a margem consignável tomada por vários empréstimos — revisão dos contratos e limitação dos descontos em folha." },
      { t: "Negativação indevida", cpl: "R$ 6–12", d: "Nome sujo por dívida paga, inexistente ou sem notificação prévia: retirada do cadastro e indenização por dano moral." },
      { t: "Golpe do Pix / fraude", cpl: "R$ 6–14", d: "Cliente que perdeu dinheiro em golpe de transferência. Responsabilidade do banco por falha de segurança (Súmula 479 do STJ)." },
      { t: "Empréstimo consignado indevido", cpl: "R$ 7–15", d: "Descontos não contratados, principalmente RMC/RCC — o cartão consignado vendido como empréstimo, com direito à devolução em dobro." },
      { t: "Superendividamento", cpl: "R$ 8–18", hot: true, d: "Mais de 30% da renda comprometida com dívidas. A Lei 14.181/2021 permite repactuar tudo num plano único de até 5 anos, preservando o mínimo existencial." },
      { t: "Revisão de contrato bancário", cpl: "R$ 8–18", d: "Juros acima da média divulgada pelo Banco Central, capitalização e tarifas indevidas — reduz a parcela e devolve o pago a mais." },
      { t: "Busca e apreensão", cpl: "R$ 10–22", d: "Defesa de quem teve o veículo tomado por atraso no financiamento: purgação da mora, revisão do saldo e devolução do bem." },
      { t: "Gestão de passivo (PJ)", cpl: "R$ 35–90", d: "Reestruturação completa da dívida bancária da empresa: renegociação, revisão de contratos e defesa contra execuções. Ticket alto." },
    ],
  },
  {
    slug: "tese-consumidor", nome: "Consumidor", titulo: 'Direito do <span>Consumidor</span>',
    faixa: "R$ 5 a R$ 16", benchTeses: 6,
    subtitle: "Teses de alto volume e ciclo curto — o cliente já chega com o problema resolvido na cabeça.",
    pills: ["Voo", "Cobrança indevida", "Bagagem", "Compra online", "Garantia"],
    teses: [
      { t: "Atraso ou cancelamento de voo", cpl: "R$ 5–12", d: "Atraso acima de 4h, cancelamento ou overbooking geram assistência obrigatória e, em regra, indenização por dano moral." },
      { t: "Cobrança indevida", cpl: "R$ 6–12", d: "Valor cobrado a mais, serviço não contratado ou dívida já paga — devolução em dobro pelo art. 42 do CDC." },
      { t: "Extravio de bagagem", cpl: "R$ 6–14", d: "Bagagem perdida, danificada ou entregue com atraso: indenização material e moral da companhia aérea." },
      { t: "Golpe em compra online", cpl: "R$ 8–16", d: "Loja ou perfil falso, produto que nunca chegou, cobrança no cartão — responsabilidade da plataforma e do meio de pagamento." },
      { t: "Serviço não entregue", cpl: "R$ 8–16", d: "Serviço pago e não prestado (obra, curso, evento, assinatura) — devolução dos valores e indenização." },
      { t: "Produto com defeito / garantia", cpl: "R$ 8–16", d: "Vício não resolvido em 30 dias: troca, dinheiro de volta ou abatimento, mais indenização quando houve prejuízo." },
    ],
  },
  {
    slug: "tese-familia", nome: "Família", titulo: 'Direito de <span>Família</span>',
    faixa: "R$ 8 a R$ 25", benchTeses: 5,
    subtitle: "Demanda constante e recorrente — o mesmo cliente costuma voltar em mais de uma ação ao longo do tempo.",
    pills: ["Pensão", "Guarda", "Divórcio", "Paternidade", "Inventário"],
    teses: [
      { t: "Pensão alimentícia", cpl: "R$ 8–16", hot: true, d: "Fixação, revisão ou execução da pensão. A execução admite prisão do devedor pelos 3 meses recentes." },
      { t: "Guarda de filhos", cpl: "R$ 8–16", hot: true, d: "Define com quem os filhos ficam e como será a convivência. A regra é a guarda compartilhada." },
      { t: "Divórcio", cpl: "R$ 10–20", hot: true, d: "Encerra o casamento com partilha, guarda e pensão. Cabe em cartório se há consenso e nenhum filho menor." },
      { t: "Reconhecimento de paternidade", cpl: "R$ 10–20", d: "Exame de DNA para estabelecer o vínculo e garantir nome, pensão e herança. Inclui a socioafetiva." },
      { t: "Inventário e partilha", cpl: "R$ 12–25", d: "Transferência dos bens após a morte, em cartório ou na justiça, incluindo disputa entre herdeiros." },
      { t: "Regulação de visitas", d: "Define dias, horários e férias de convivência de quem não tem a guarda — e dos avós." },
      { t: "Adoção", d: "Assumir legalmente a criação de uma criança, inclusive a adoção unilateral por padrasto ou madrasta." },
      { t: "Anulação de casamento", d: "Invalida o casamento por fraude, coação, falta de consentimento ou impedimento legal." },
      { t: "Medidas protetivas", d: "Afastamento imediato do agressor (Lei Maria da Penha). Urgência: decisão em até 48h." },
    ],
  },
  {
    slug: "tese-civel", nome: "Cível", titulo: 'Direito <span>Cível</span>',
    faixa: "R$ 8 a R$ 25", benchTeses: 5,
    subtitle: "A área mais ampla: indenizações, cobranças e conflitos do dia a dia entre pessoas e empresas.",
    pills: ["Acidente de trânsito", "Dano moral", "Cobrança", "Responsabilidade civil", "Condomínio"],
    teses: [
      { t: "Acidente de trânsito", cpl: "R$ 8–18", d: "Vítima de colisão ou atropelamento busca danos materiais, morais, estéticos e lucros cessantes, além do seguro quando cabível." },
      { t: "Indenização por dano moral", cpl: "R$ 10–20", d: "Situação que gerou abalo relevante — negativação, ofensa, exposição indevida ou descaso de empresa — com pedido de reparação." },
      { t: "Cobrança e execução de dívida", cpl: "R$ 10–20", d: "Credor que precisa receber: cheque, nota promissória, contrato ou aluguel atrasado, por ação de cobrança ou execução." },
      { t: "Responsabilidade civil", cpl: "R$ 12–25", d: "Alguém causou dano por negligência, imprudência ou imperícia — de erro profissional a queda em estabelecimento. Base: dano, nexo e culpa." },
      { t: "Condomínio e vizinhança", cpl: "R$ 12–25", d: "Barulho, obra irregular, taxa indevida, multa e uso abusivo de área comum, entre vizinhos ou contra o condomínio." },
      { t: "Contratos (descumprimento)", d: "Uma das partes não pagou, entregou errado ou violou cláusula — rescisão, revisão, cumprimento forçado ou perdas e danos." },
    ],
  },
  {
    slug: "tese-saude", nome: "Saúde", titulo: 'Direito à <span>Saúde</span>',
    faixa: "R$ 8 a R$ 30", benchTeses: 7,
    subtitle: "Teses de urgência: na maioria dos casos a liminar sai em poucos dias, o que acelera o fechamento.",
    pills: ["Negativa de cobertura", "Reajuste abusivo", "Home care", "Alto custo", "Erro médico"],
    teses: [
      { t: "Negativa de cobertura do plano", cpl: "R$ 8–16", hot: true, d: "Plano negou procedimento previsto no contrato. Com prescrição médica, a liminar costuma sair em poucos dias." },
      { t: "Reajuste abusivo de mensalidade", cpl: "R$ 8–16", d: "Aumento por faixa etária ou reajuste de plano coletivo acima do razoável — revisão do valor e devolução do excesso." },
      { t: "Cirurgia ou tratamento negado", cpl: "R$ 8–18", d: "Cirurgia, terapia ou internação negada sob o argumento de “fora do rol” ou “sem cobertura”, com indicação médica na mão." },
      { t: "Plano de saúde (geral)", cpl: "R$ 8–18", d: "Campanha guarda-chuva de problemas com plano: carência, rede, descredenciamento e rescisão unilateral." },
      { t: "Home care negado", cpl: "R$ 10–22", d: "Paciente com alta hospitalar que precisa de atendimento domiciliar. A negativa é abusiva quando há indicação médica." },
      { t: "Medicamento de alto custo", cpl: "R$ 10–22", d: "Remédio caro negado pelo plano ou pelo SUS. Pela Lei 14.454/2022, estar fora do rol da ANS não basta para negar." },
      { t: "Erro médico", cpl: "R$ 15–30", d: "Falha de diagnóstico, cirurgia ou tratamento com dano ao paciente — responsabilidade do profissional e do hospital." },
    ],
  },
  {
    slug: "tese-imobiliario", nome: "Imobiliário", titulo: 'Direito <span>Imobiliário</span>',
    faixa: "R$ 8 a R$ 28", benchTeses: 8,
    subtitle: "Ticket médio alto e cliente com capacidade de pagamento — da retomada do aluguel à disputa por imóvel de leilão.",
    pills: ["Despejo", "Distrato", "Atraso na obra", "Usucapião", "Leilão"],
    teses: [
      { t: "Despejo / inadimplência", cpl: "R$ 8–16", d: "Proprietário que precisa retomar o imóvel por falta de pagamento ou fim do contrato, cobrando os aluguéis atrasados." },
      { t: "Distrato imobiliário", cpl: "R$ 10–18", d: "Comprador desiste do imóvel na planta. A Lei 13.786/2018 limita quanto a construtora pode reter e define o prazo de devolução." },
      { t: "Atraso na entrega", cpl: "R$ 10–18", d: "Obra entregue fora do prazo. Passados os 180 dias de tolerância, cabe multa de 1% ao mês sobre o valor pago ou a devolução integral." },
      { t: "Regularização de imóvel", cpl: "R$ 12–22", d: "Imóvel sem escritura, sem averbação da construção ou com inventário pendente — regularização em cartório ou na justiça." },
      { t: "Usucapião", cpl: "R$ 12–22", d: "Quem ocupa o imóvel há anos, sem contestação, pode se tornar dono — inclusive pela via extrajudicial, em cartório." },
      { t: "Revisão de financiamento", cpl: "R$ 12–22", d: "Financiamento habitacional com juros, seguro ou taxa de administração acima do devido — reduz a parcela e o saldo." },
      { t: "Contrato de imóvel", cpl: "R$ 12–25", d: "Compra e venda, locação, permuta e cessão: elaboração, revisão e disputa sobre cláusulas e garantias." },
      { t: "Imóvel de leilão / posse", cpl: "R$ 15–28", d: "Arrematação em leilão e a disputa pela posse: imissão na posse, anulação do leilão e defesa do antigo proprietário." },
    ],
  },
  {
    slug: "tese-tributario", nome: "Tributário", titulo: 'Direito <span>Tributário</span>',
    faixa: "R$ 4 a R$ 70", benchTeses: 6,
    subtitle: "Dois extremos na mesma área: isenções de massa com CPL baixo e teses consultivas de ticket alto para empresas.",
    pills: ["Isenção de IPVA", "Isenção de IR", "Execução fiscal", "Recuperação", "Transação"],
    teses: [
      { t: "Isenção de IPVA", cpl: "R$ 4–12", d: "Isenção do imposto do veículo para pessoa com deficiência, autista, taxista e demais casos da lei estadual, com restituição do que foi pago." },
      { t: "Isenção de IR", cpl: "R$ 8–18", d: "Aposentado ou pensionista com doença grave (câncer, cardiopatia, Parkinson e outras) fica isento e recupera os últimos 5 anos." },
      { t: "Execução fiscal", cpl: "R$ 18–35", d: "Defesa de quem está sendo cobrado pela Fazenda: prescrição, excesso de execução, nulidade da CDA e liberação de bens penhorados." },
      { t: "Diagnóstico tributário", cpl: "R$ 18–35", d: "Revisão completa da carga tributária da empresa para achar pagamento indevido, crédito não aproveitado e enquadramento errado." },
      { t: "Recuperação de tributos", cpl: "R$ 20–40", d: "Recupera em dinheiro ou compensação os tributos pagos a mais nos últimos 5 anos (PIS/Cofins, INSS sobre verbas indenizatórias, ICMS na base)." },
      { t: "Transação tributária", cpl: "R$ 30–70", d: "Acordo com a Fazenda (Lei 13.988/2020) com até 65% de desconto em multas e juros, parcelamento em até 120 vezes e uso de prejuízo fiscal." },
    ],
  },
  {
    slug: "tese-criminal", nome: "Criminal", titulo: 'Direito <span>Criminal</span>',
    faixa: "R$ 12 a R$ 40", benchTeses: 5,
    subtitle: "Urgência máxima: o cliente decide em horas, não em dias — a velocidade de atendimento define o fechamento.",
    pills: ["Trânsito", "Violência doméstica", "Custódia", "Habeas corpus", "Defesa"],
    nota: { t: "Atenção", d: "Nenhuma dessas teses rodou campanha própria na carteira E3 ainda. A faixa é estimativa do time até a primeira campanha real." },
    teses: [
      { t: "Crimes de trânsito", cpl: "R$ 12–25", d: "Embriaguez ao volante, lesão corporal culposa e homicídio de trânsito — defesa e discussão da suspensão da CNH." },
      { t: "Violência doméstica", cpl: "R$ 12–28", d: "Atua pelos dois lados: medidas protetivas para a vítima e defesa técnica do acusado na Lei Maria da Penha." },
      { t: "Audiência de custódia", cpl: "R$ 15–35", d: "Audiência em até 24h após a prisão. É a chance de soltar o cliente antes de virar processo — demanda imediata." },
      { t: "Prisão em flagrante / habeas corpus", cpl: "R$ 15–35", d: "Urgência máxima: liberdade provisória, relaxamento do flagrante e HC contra prisão ilegal." },
      { t: "Defesa em processo criminal", cpl: "R$ 20–40", d: "Acompanhamento do inquérito ao julgamento, acordo de não persecução penal e recursos." },
    ],
  },
  {
    slug: "tese-empresarial", nome: "Empresarial", titulo: 'Direito <span>Empresarial</span>',
    faixa: "R$ 18 a R$ 50", benchTeses: 5,
    subtitle: "O CPL mais alto da régua e o maior ticket: o lead é um decisor de empresa, não um consumidor final.",
    pills: ["Marca", "Abertura", "Contratos", "Societário", "Recuperação judicial"],
    teses: [
      { t: "Marca e propriedade industrial", cpl: "R$ 18–35", d: "Registro de marca no INPI, defesa contra uso indevido por concorrente e proteção de patente e software." },
      { t: "Abertura e regularização (start up)", cpl: "R$ 18–35", d: "Escolha do tipo societário, contrato social, enquadramento tributário e regularização de empresa já em operação." },
      { t: "Contratos empresariais", cpl: "R$ 20–40", d: "Elaboração e revisão de contratos de fornecimento, prestação de serviço, distribuição e acordo de sócios." },
      { t: "Societário e dissolução", cpl: "R$ 25–45", d: "Entrada e saída de sócio, apuração de haveres, conflito societário e dissolução parcial ou total." },
      { t: "Recuperação judicial", cpl: "R$ 25–50", d: "Empresa em crise suspende as cobranças e renegocia as dívidas em um plano aprovado pelos credores. Alternativa à falência." },
      { t: "Governança e compliance", d: "Estatutos, políticas internas, programa de integridade e adequação à LGPD, prevenindo multa e responsabilização." },
      { t: "Fusões e aquisições (M&A)", d: "Compra, venda ou fusão de empresas, com due diligence, valuation jurídico e negociação de garantias." },
      { t: "Litígios comerciais", d: "Disputa entre empresas por contrato, cobrança ou concorrência desleal — por acordo, arbitragem ou via judicial." },
    ],
  },
];

/* ─────────────────────────────── decks por área ─────────────────────────────── */
function buildArea(area) {
  const NAV = [null, "Teses"];
  const { page } = makePageFactory(`MATERIAL DE TESE · ${area.nome.toUpperCase()}`, NAV);
  const P = [];
  const comCpl = area.teses.filter((t) => t.cpl).length;

  P.push(page(`
    <img class="logo" src="${LOGO_URI}" alt="E3"/>
    <p class="kicker cov-k">MATERIAL DE TESE · ${area.nome.toUpperCase()}</p>
    <h1>${area.titulo}</h1>
    <p class="cov-sub">${area.subtitle}</p>
    <div class="pills">${area.pills.map((n) => `<span class="pill">${n.toUpperCase()}</span>`).join("")}</div>
    <div class="cov-rule"></div>
    <p class="cov-foot">${area.teses.length} teses · faixa de CPL ${area.faixa} · E3 Digital</p>
  `, { cover: true }));

  const items = area.teses.map((t) => ({
    t: `${t.t}${t.hot ? ` ${hot()}` : ""}`,
    d: `${t.d} ${cplChip(t.cpl)}`,
  }));

  P.push(page(`
    ${secHead("01", "Teses e o que cada uma trata", `O que cada tese resolve, quem é o cliente e a faixa de CPL — ${comCpl}/${area.teses.length} com CPL medido.`)}
    ${area.nota ? notabar(area.nota.t, area.nota.d) : ""}
    ${area.teses.length >= 9 ? `<div class="dense">${rules(items, "grid2r")}</div>` : rules(items, area.teses.length > 5 ? "grid2r" : "")}
  `));

  const plain = area.titulo.replace(/<[^>]+>/g, "");
  const html = shell({
    title: `Material de Tese — ${plain} · E3 Digital`,
    navTitle: `Material de Tese · ${plain}`,
    logoUri: LOGO_URI,
    pages: P,
  });

  const outPath = join(distRoot, area.slug, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  console.log("tese:", area.slug, "·", area.teses.length, "teses");
}

AREAS.forEach(buildArea);

/* ─────────────────────────────── trilhas de desenvolvimento ───────────────────────────────
   Adicionar uma nova trilha: inclua um item aqui e gere o deck em scripts/gen-trilhas.mjs.  */
const TRILHAS = [
  { nome: "Account", slug: "trilha-account", sub: "90 dias · 12 semanas · 3 checkpoints" },
  { nome: "Gestor de Projetos", slug: "trilha-gestor-projetos", sub: "90 dias · 12 semanas · 3 checkpoints" },
  { nome: "Gestor de Tráfego", slug: "trilha-gestor-trafego", sub: "90 dias · 12 semanas · 3 checkpoints" },
];

/* ─────────────────────────────── hub: Materiais PDF ─────────────────────────────── */
const totalTeses = AREAS.reduce((a, x) => a + x.teses.length, 0);
const cardsTrilhas = TRILHAS.map((t) =>
  `<a href="../${t.slug}/index.html"><span class="mt">${t.nome}</span><span class="ms">${t.sub}</span></a>`
).join("\n      ");
const cardsTeses = AREAS.map((a) =>
  `<a href="../${a.slug}/index.html"><span class="mt">${a.nome}</span><span class="ms">${a.teses.length} teses · CPL ${a.faixa}</span></a>`
).join("\n      ");

const hubHTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>Materiais PDF — E3 Digital</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--o:#FF5F1F;--o2:#FF3300}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#050505;color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;padding:48px 24px}
.glow{position:fixed;border-radius:50%;filter:blur(130px);pointer-events:none}
.g1{top:-10%;left:12%;width:44vw;height:44vw;background:rgba(255,95,31,.16)}
.g2{bottom:-15%;right:8%;width:40vw;height:40vw;background:rgba(255,51,0,.10)}
.wrap{position:relative;z-index:2;max-width:1060px;margin:0 auto}
header{margin-bottom:34px}
.back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.5);text-decoration:none;font-size:.85rem;margin-bottom:20px}
.back:hover{color:var(--o)}
header img{height:54px;margin-bottom:18px;filter:drop-shadow(0 0 22px rgba(255,95,31,.5))}
h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(1.8rem,4.5vw,2.8rem);letter-spacing:-.03em}
h1 span{color:var(--o)}
.sub{color:rgba(255,255,255,.5);margin-top:10px;font-size:1.02rem}
.k-wrap{margin-bottom:34px}
.k-head h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1.4rem;letter-spacing:-.02em}
.k-sub{color:rgba(255,255,255,.45);font-size:.88rem;margin-top:4px;margin-bottom:16px}
.k-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.k-grid.two{grid-template-columns:repeat(2,1fr)}
@media(max-width:880px){.k-grid,.k-grid.two{grid-template-columns:1fr}}
.k-grid a{display:flex;flex-direction:column;padding:15px 17px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.02);text-decoration:none;color:#fff;transition:.25s}
.k-grid a:hover{border-color:var(--o);background:rgba(255,95,31,.08);transform:translateX(3px)}
.mt{font-weight:700;font-size:1rem}
.ms{font-size:.76rem;color:rgba(255,255,255,.42);margin-top:3px}
footer{text-align:center;color:rgba(255,255,255,.3);margin-top:36px;font-size:.82rem}
</style></head>
<body>
<span class="glow g1"></span><span class="glow g2"></span>
<div class="wrap">
  <header>
    <a class="back" href="../index.html">&larr; Voltar ao índice</a>
    <img src="${LOGO_URI}" alt="E3"/>
    <h1>Materiais <span>PDF</span></h1>
    <p class="sub">Materiais de apoio para consulta rápida — organizados por assunto.</p>
  </header>

  <div class="k-wrap">
    <div class="k-head">
      <h2>Teses por área</h2>
      <p class="k-sub">${totalTeses} teses explicadas em linguagem simples, cada uma com a faixa de CPL da régua do painel.</p>
    </div>
    <div class="k-grid">
      ${cardsTeses}
    </div>
  </div>

  <div class="k-wrap">
    <div class="k-head">
      <h2>Trilhas de desenvolvimento</h2>
      <p class="k-sub">Formação por função: o que estudar, o que aplicar e o que entregar em cada semana.</p>
    </div>
    <div class="k-grid">
      ${cardsTrilhas}
    </div>
  </div>

</div>
</body></html>`;

const hubOut = join(distRoot, "materiais-pdf", "index.html");
mkdirSync(dirname(hubOut), { recursive: true });
writeFileSync(hubOut, hubHTML, "utf8");
console.log("materiais pdf (hub):", hubOut, "·", totalTeses, "teses");
