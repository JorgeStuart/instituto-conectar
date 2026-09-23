# EP2 — respostas (Rascunho Facul EP2) — NÃO FINALIZAR

## Q1 — Design System (variáveis)
No CSS do Instituto Conectar (`css/styles.css`) o Design System vive em `:root` com tokens reutilizáveis.

**Cores (hex):**
- Primárias: `--cor-primaria: #1B4D3E`; `--cor-primaria-escura: #12352b`; `--cor-secundaria: #2E8B57` (verdes ligados a inclusão e confiança).
- Destaque: `--cor-destaque: #F4A261` (contraste em foco/alertas).
- Neutras: `--cor-fundo: #F7F9F8`; `--cor-superficie: #FFFFFF`; `--cor-texto: #1A1A1A`; `--cor-texto-suave: #4A5568`; `--cor-borda: #D9E2DD`.
- Semânticas: `--cor-erro: #C53030`; `--cor-sucesso: #276749`.
- Sombra com rgba: `--sombra: 0 4px 16px rgba(27, 77, 62, 0.12)`.

**Tipografia — cinco tamanhos:**
- `--tipo-xs: 0.8rem` (tags/legendas)
- `--tipo-sm: 0.9rem` (auxiliar, rodapé)
- `--tipo-md: 1rem` (corpo)
- `--tipo-lg: 1.25rem` (subtítulos/cards)
- `--tipo-xl: 1.75rem` (títulos; com `clamp` responsivo)
Famílias: `--fonte-base` (UI sans) e `--fonte-titulo` (Georgia serif).

**Espaçamentos modulares (escala rem):**
`--espaco-xs 0.25rem` · `--espaco-sm 0.5rem` · `--espaco-md 1rem` · `--espaco-lg 1.5rem` · `--espaco-xl 2.5rem`.

**Acessibilidade / ONG:** contraste texto escuro em fundo claro; foco visível com outline no destaque; tipografia legível em rem; espaçamento generoso para leitores diversos e uso em celular (público de inclusão digital em Curitiba).

## Fatos do código (para outras perguntas)
- Flexbox: `.header-inner`, `.brand`, `body` (coluna), menu.
- Grid 12 colunas: `.site-main`, `.page-home` seções, `.grade-projetos` (cards `span 4`).
- Responsivo: `@media (max-width: 48rem)` — menu hamburger (checkbox `.nav-toggle` + label), grid vira 1 coluna, cards `span 12`.
- Pseudo: `:hover` links/cards/botão; `:focus-visible` outline; `.skip-link:focus`.
- Formulário: fieldset/legend, `.campo`, labels, inputs com borda/focus, `.botao-enviar`.
- Arquivo principal: `css/styles.css` linkado nas 3 páginas.
