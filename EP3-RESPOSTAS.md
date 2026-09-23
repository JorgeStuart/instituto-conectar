# EP3 — respostas (rascunho Dreamshaper) — NÃO FINALIZAR SEM REVISAR

Textos em português, alinhados ao código real do **Instituto Conectar** (Curitiba). Ajustar limites se a plataforma mostrar contagem diferente.

---

## Q1 — Estrutura de diretórios (≤2000 caracteres; rascunho ≈987)

Organizei o site do Instituto Conectar em pastas separadas, como pede o enunciado: `html/`, `css/`, `imagens/` e `js/`.

Árvore atual:
- `html/` — páginas: `index.html` (shell SPA com as views Início, Projetos, Cadastro e Inscritos), `projetos.html` e `cadastro.html` (redirecionam para `index.html#/projetos` e `#/cadastro`).
- `css/` — `styles.css` (Design System EP2 + estilos EP3: views, mensagens, tabela, erros).
- `imagens/` — `logo.svg` do Instituto Conectar.
- `js/` — scripts por funcionalidade: `storage.js` (localStorage, chave `conectar_inscritos`), `router.js` (hash router), `form.js` (máscaras e validação), `ui.js` (tabela e feedback), `app.js` (inicialização).
- Na raiz há um `index.html` curto que redireciona para `html/index.html`, só por conveniência.

Os caminhos nos HTML usam `../css/`, `../js/` e `../imagens/` porque as páginas ficam dentro de `html/`. Essa separação deixa claro o papel de cada tipo de arquivo e facilita manutenção e entrega no Dreamshaper.

---

## Q2 — Navegação SPA / páginas

O site é uma SPA: um único `html/index.html` guarda header, menu, footer e quatro blocos `.view` (`data-view`: home, projetos, cadastro, inscritos). A navegação usa hash (`#/`, `#/projetos`, `#/cadastro`, `#/inscritos`). Em `js/router.js`, `hashchange` e o boot em `app.js` chamam `renderRota`, que mostra só a view ativa (`hidden`), atualiza `document.title`, `aria-current` no menu e a classe `page-{view}` no `body`. Os links usam `href="#/..."` e `data-link` (fecham o menu mobile). `projetos.html` e `cadastro.html` só redirecionam para as rotas hash, mantendo URLs antigas úteis.

---

## Q3 — Templates dinâmicos

A view Inscritos é preenchida em tempo de execução por `ui.js` (`renderLista`). Lê o array em `localStorage` (`conectar_inscritos`), ordena por `criadoEm` e monta uma tabela HTML (nome, e-mail, telefone, tipo, cidade/estado, data, botões Editar/Excluir) ou um estado vazio com link para `#/cadastro`. Textos passam por `escapeHtml`/`escapeAttr` para evitar XSS. Não uso framework de template: concatenação controlada em vanilla JS, suficiente para o CRUD do Instituto Conectar.

---

## Q4 — Interatividade com eventos

Eventos principais (em `app.js` / módulos):
- `DOMContentLoaded` — boot (máscaras, submit, router).
- `hashchange` — troca de view.
- `submit` no `#form-cadastro` — `preventDefault`, valida e grava.
- `input` em CPF, telefone e CEP — máscaras.
- `click` delegado — links `data-link`; botões `data-acao` editar/excluir; cancelar edição.
Feedback visual sem `alert` em massa: classes `mensagem--sucesso|erro|info` e `confirm` só na exclusão.

---

## Q5 — Validação e feedback do formulário

O form tem `novalidate` para o JS controlar o feedback. Em `form.js`, `validarFormulario` checa nome (≥3), e-mail, nascimento ≤ 2012-12-31, CPF `000.000.000-00`, telefone `(41) 99999-9999`, CEP `00000-000`, endereço, cidade, estado e tipo (`doador`|`voluntario`|`ambos`). Erros vão para `.campo-erro` + classe `campo-invalido`; mensagem geral em `#form-feedback`. Máscaras facilitam o formato certo. Sucesso grava e redireciona para `#/inscritos` com mensagem em `#lista-feedback`.

---

## Q6 — localStorage

Persistência só no navegador, chave **`conectar_inscritos`**, valor JSON array. Cada registro: `id`, `nome`, `email`, `nascimento`, `cpf`, `telefone`, `cep`, `endereco`, `cidade`, `estado`, `tipo`, `mensagem`, `criadoEm`, `atualizadoEm`. Funções em `storage.js`: `lerInscritos`, `salvarInscritos`, `gerarId`. Create no submit; Read na view Inscritos; Update via Editar + `registro-id`; Delete com confirmação. Sobrevive a F5; some se o usuário limpar dados do site. Sem backend — adequado ao escopo acadêmico da ONG fictícia em Curitiba.

---

## Q7 — Bibliotecas externas

**Não usei biblioteca externa.** Vanilla JavaScript cobre router hash, máscaras, validação, CRUD e renderização da tabela. Incluir CDN sem uso real seria artificial; preferi honestidade: zero dependência de terceiros, scripts próprios em `js/` carregados com `defer` a partir de `html/index.html`.

---

## Q8 — Código organizado por funcionalidade

Separei o JS em cinco arquivos no namespace `window.Conectar`:
1. `storage.js` — persistência;
2. `router.js` — rotas hash;
3. `form.js` — máscaras/validação/submit;
4. `ui.js` — mensagens e tabela;
5. `app.js` — liga eventos no boot.
Ordem de carga no HTML garante dependências. HTML em `html/`, estilo em `css/`, logo em `imagens/`. Facilita achar e alterar uma responsabilidade sem misturar tudo num único `app.js` monolítico.

---

## Q9 — Testes e correção de bugs

Roteiro que usei:
1. Abrir `html/index.html` e clicar no menu — hash muda, views alternam sem novo HTML.
2. Submit inválido — erros inline; válido — aparece em Inscritos e em Application → Local Storage → `conectar_inscritos`.
3. F5 — lista permanece.
4. Editar / Excluir / Cancelar edição.
5. Abrir `html/projetos.html` e `cadastro.html` — caem nas rotas certas.
Ajustes feitos: paths `../` após mover HTML; split do JS sem quebrar o schema; escape na tabela; hash vazio → `#/`.

---

## Q10 — Revisão final

Checklist: pastas `html/css/imagens/js` ok; SPA com 4 rotas; formulário + CRUD; chave `conectar_inscritos`; sem lib externa inventada; redirects e root redirect ok; textos da ONG (Curitiba, oficinas, mentoria, lab) coerentes com EP1/EP2. Pronto para colar no Dreamshaper após conferir limites de caracteres.

---

## Q11 — Reflexão

Aprendi a transformar páginas estáticas em SPA com hash sem framework, a persistir dados no cliente e a organizar JS por função. Separar pastas e módulos deixou o Projeto Instituto Conectar mais próximo de um site “de verdade” e mais fácil de explicar na entrega. O maior cuidado foi validar bem o formulário e não perder dados no refresh.

---

## Q12 — Autoavaliação (ajustar à escala da plataforma)

Cumpri a estrutura de pastas, a SPA com rotas, o CRUD em localStorage, a validação com feedback e a organização do código. Pontos fortes: coerência com a identidade da ONG e honestidade sobre vanilla JS. A melhorar: testes automatizados no navegador e acessibilidade ainda mais fina na tabela. Autoavaliação sugerida: desempenho sólido / acima da média na entrega técnica, com revisão humana antes de enviar.

