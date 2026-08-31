# e3-apresentacoes

Hub de apresentações dos produtos da **E3 Digital**. Um gerador estático: cada produto vira um site autossuficiente (HTML único, sem build de framework), publicado na Vercel.

## Como funciona

- `build.mjs` — a engine. Estética E3 (preto + laranja `#FF5F1F`, Bricolage Grotesque + DM Sans, logo embutido em base64). Gera `dist/<slug>/index.html` autossuficiente.
- `decks/*.mjs` — o conteúdo. Cada arquivo exporta os decks de um produto (`proposta`, `onboarding`, `offboarding`).
- `decks/index.mjs` — registra quais decks entram no build.
- `logo_e3.b64` — logo da E3 em base64, embutido em cada página.
- `dist/` — a saída, com um `index.html` que serve de índice de todas as apresentações.

## Build

```bash
node build.mjs
```

## Tipos de slide

`cover`, `agenda`, `stats`, `bullets`, `timeline`, `journey` (estrada serpenteante gerada proceduralmente, estilo Evolução), `table`, `quote`, `section`, `final`.

## Layouts

- **deck** (padrão) — slides navegáveis, fit-to-screen: cada slide vive num `.slide-inner` de 1000px de largura fixa e o JS escala por `transform: scale(...)`. Sem scroll, sem corte.
- **vertical** (`layout: "vertical"`) — página de rolagem com reveal por `IntersectionObserver`. Usado nas propostas.

O botão "Baixar PDF" chama `window.print()`; o `beforeprint` reescala os slides para 1280x720.

## Produtos

Aceleração Comercial · Estruturação Pro · Assessoria Light/Pro · Evolução Jurídica · Social Media · Estruturação de Instagram · Treinamento Comercial (interno) · Auditoria Criativa
