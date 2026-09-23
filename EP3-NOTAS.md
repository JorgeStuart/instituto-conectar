# EP3 — SPA + JavaScript + localStorage (Instituto Conectar)

Notas para respostas no Dreamshaper. **Não submeter** este arquivo na plataforma sem revisar.

## Árvore de pastas (enunciado)

```
ep1-ong/
├── index.html              # redirect → html/index.html
├── html/
│   ├── index.html          # shell SPA (views home/projetos/cadastro/inscritos)
│   ├── projetos.html       # redirect → index.html#/projetos
│   └── cadastro.html       # redirect → index.html#/cadastro
├── css/
│   └── styles.css
├── imagens/
│   └── logo.svg
├── js/
│   ├── storage.js          # localStorage CRUD (conectar_inscritos)
│   ├── router.js           # hash router
│   ├── form.js             # máscaras + validação + submit
│   ├── ui.js               # tabela inscritos, mensagens, editar/excluir
│   └── app.js              # boot / wire de eventos
├── EP3-NOTAS.md
├── EP3-RESPOSTAS.md
└── EP2-RESPOSTAS.md
```

Pastas exigidas pelo enunciado: `html`, `css`, `imagens`, `js` — todas presentes e separadas.

## Mapa de módulos JS (por funcionalidade)

| Arquivo        | Responsabilidade |
|----------------|------------------|
| `js/storage.js` | Chave `conectar_inscritos`; `lerInscritos` / `salvarInscritos` / `gerarId` |
| `js/router.js`  | `ROUTES`, `TITLES`, `navegar`, `renderRota`, `hashchange` |
| `js/form.js`    | Máscaras CPF/tel/CEP; validação; `onSubmitCadastro`; reset |
| `js/ui.js`      | `setMensagem`, `renderLista`, editar/excluir, escape HTML |
| `js/app.js`     | `DOMContentLoaded`: liga clicks, submit, máscaras, router |

Namespace compartilhado: `window.Conectar`. Scripts carregados com `defer` nessa ordem a partir de `html/index.html` (`../js/...`).

**Bibliotecas externas:** nenhuma. Vanilla JS suficiente para máscaras, validação, router e localStorage — sem CDN fictício.

## Arquitetura SPA

- **Shell único:** `html/index.html` concentra header, nav, footer e quatro *views* (`data-view`: `home`, `projetos`, `cadastro`, `inscritos`).
- **Compatibilidade:** `html/projetos.html` e `html/cadastro.html` redirecionam para `index.html#/projetos` e `index.html#/cadastro`. Root `index.html` aponta para `html/index.html`.

## Router (hash)

| Rota hash       | View        |
|-----------------|-------------|
| `#/`            | home        |
| `#/projetos`    | projetos    |
| `#/cadastro`    | cadastro    |
| `#/inscritos`   | inscritos   |

- Eventos: `DOMContentLoaded` (boot), `hashchange` (troca de view), `submit` (form), `click` (CRUD / links).
- Troca de view: `hidden` nas `.view`; `body` recebe `page-spa page-{view}`; `aria-current` no menu; título da aba atualizado.
- Links do menu: `href="#/..."` + `data-link` (fecha menu mobile).

## localStorage

- **Chave:** `conectar_inscritos`
- **Valor:** JSON array de objetos, por exemplo:

```json
[
  {
    "id": "id_mxyz_ab12cd",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "nascimento": "1990-05-10",
    "cpf": "123.456.789-00",
    "telefone": "(41) 99999-9999",
    "cep": "80010-000",
    "endereco": "Rua das Flores, 100",
    "cidade": "Curitiba",
    "estado": "PR",
    "tipo": "voluntario",
    "mensagem": "Quero monitorar oficinas",
    "criadoEm": "2026-09-23T17:00:00.000Z",
    "atualizadoEm": "2026-09-23T17:00:00.000Z"
  }
]
```

- `tipo`: `doador` | `voluntario` | `ambos`
- Persistência só no navegador (sem backend).

## Validação (JS + HTML)

- `preventDefault` no submit; formulário com `novalidate` (feedback inline).
- Regras: nome ≥ 3, e-mail, nascimento ≤ 2012-12-31, CPF `000.000.000-00`, telefone `(41) 99999-9999`, CEP `00000-000`, endereço/cidade/estado/tipo obrigatórios.
- Máscaras em `input` (CPF, telefone, CEP) em `form.js`.
- Mensagens em `#form-feedback` / `#lista-feedback` (`mensagem--sucesso|erro|info`).

## CRUD

- **Create:** submit válido → push → `localStorage`.
- **Read:** view `#/inscritos` renderiza tabela (ou estado vazio).
- **Update:** Editar preenche o form; hidden `registro-id`; botão “Salvar alterações”.
- **Delete:** Excluir com `confirm` → filtra pelo `id`.

## CSS (EP3)

- Acrescentos em `styles.css`: `.view`, mensagens, `.campo-erro`, `.tabela-inscritos`, `.estado-vazio`, botões de ação — tokens EP2.

## Como testar

1. Abrir `html/index.html` (ou root `index.html` que redireciona).
2. Navegar Início / Projetos / Cadastro / Inscritos — só o hash muda.
3. Em Cadastro, enviar dados válidos → vai para Inscritos com a linha na tabela.
4. F5: lista permanece. DevTools → Application → Local Storage → `conectar_inscritos`.
5. Editar / Excluir um registro.
6. Abrir `html/projetos.html` ou `html/cadastro.html` → rota hash correspondente.
