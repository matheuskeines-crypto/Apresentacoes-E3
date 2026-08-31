import { proposta as propAce, onboarding as onbAce, offboarding as offAce } from "./aceleracao.mjs";
import { proposta as propPro, onboarding as onbPro, offboarding as offPro } from "./estruturacao-pro.mjs";
import { proposta as propAss, onboarding as onbAss, offboarding as offAss } from "./assessoria.mjs";
import { proposta as propEvo, onboarding as onbEvo, offboarding as offEvo } from "./evolucao.mjs";
import { proposta as propSoc, onboarding as onbSoc, offboarding as offSoc } from "./social-media.mjs";
import { proposta as propIg, onboarding as onbIg, offboarding as offIg } from "./estruturacao-instagram.mjs";
import { treinamentoComercial } from "./treinamento-comercial.mjs";

// Por produto: proposta (vertical, "caminho") + onboarding (deck) + offboarding (entrega final, deck)
export const decks = [
  propAce, onbAce, offAce,
  propPro, onbPro, offPro,
  propAss, onbAss, offAss,
  propEvo, onbEvo, offEvo,
  propSoc, onbSoc, offSoc,
  propIg, onbIg, offIg,
  treinamentoComercial, // material interno → slides
];
