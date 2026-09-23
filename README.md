# Instituto Conectar

Site institucional (front-end acadêmico) de uma ONG fictícia de inclusão digital em Curitiba. Projeto em HTML, CSS e JavaScript puro (SPA com hash router e `localStorage`).

## Como abrir

1. Clone ou baixe este repositório.
2. Abra o arquivo **`html/index.html`** no navegador (duplo clique ou “Open with Live Server”).
3. Alternativa: abra **`index.html`** na raiz — ele redireciona para `html/index.html`.

Não é necessário servidor Node. Um servidor estático simples ajuda se o navegador restringir `file://`:

```bash
# a partir da raiz do projeto
python3 -m http.server 8080
# depois acesse http://localhost:8080/  (redirect) ou http://localhost:8080/html/index.html
```

## Stack

- HTML5 semântico
- CSS (Flexbox, Grid, design tokens, responsivo)
- JavaScript vanilla (SPA, validação, CRUD em `localStorage`)

## Estrutura de pastas

```
ep1-ong/
├── index.html          # redirect → html/index.html
├── html/
│   ├── index.html      # shell SPA (views)
│   ├── projetos.html   # redirect compatível
│   └── cadastro.html   # redirect compatível
├── css/
│   └── styles.css
├── imagens/
│   └── logo.svg
└── js/
    ├── storage.js      # localStorage
    ├── router.js       # rotas hash
    ├── form.js         # máscaras e validação
    ├── ui.js           # lista/tabela e mensagens
    └── app.js          # boot
```

## Rotas (hash)

| Hash            | View      |
|-----------------|-----------|
| `#/`            | Início    |
| `#/projetos`    | Projetos  |
| `#/cadastro`    | Cadastro  |
| `#/inscritos`   | Inscritos |

## localStorage

- **Chave:** `conectar_inscritos`
- **Conteúdo:** array JSON de cadastros de doadores/voluntários
- Os dados ficam **somente neste navegador**; não há backend.

## Acessibilidade (resumo)

- Skip link para o conteúdo principal
- Landmarks (`header`, `nav`, `main`, `footer`) e rótulos ARIA
- Foco visível (`:focus-visible`)
- Tabela de inscritos com `caption` e `scope`
- Respeito a `prefers-reduced-motion`

Detalhes e checklist: ver `EP4-NOTAS.md`.

## Deploy

Instruções para GitHub Pages / Netlify: `EP4-NOTAS.md`.

URL pública: https://jorgestuart.github.io/instituto-conectar/

## Licença / uso acadêmico

Material educacional. Conteúdo institucional é fictício.
