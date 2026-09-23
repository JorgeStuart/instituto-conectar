# EP4 — Git, acessibilidade e deploy (Instituto Conectar)

Notas de trabalho para o EP4. **Não submeter** na plataforma sem revisar. Não altera Dreamshaper.

## 1. Git (estado local)

- Repositório inicializado na pasta do projeto (`git init`).
- `.gitignore` cobre lixo de SO/editores, logs, `node_modules`, `.env`.
- `README.md` descreve abertura, stack, pastas e chave `conectar_inscritos`.
- Commits lógicos (mensagens curtas em português).

### Comandos úteis (referência)

```bash
git status
git log --oneline
git branch
git remote -v
```

Branches: trabalho em `main` (ou `master`). Criar branch de feature:

```bash
git checkout -b melhoria/a11y
# ... alterações ...
git add .
git commit -m "Melhora acessibilidade da tabela de inscritos"
git checkout main
git merge melhoria/a11y
```

## 2. Acessibilidade — checklist antes / depois

### Já existia (EP2/EP3)

| Item | Status pré-EP4 |
|------|----------------|
| Skip link `Ir para o conteúdo` → `#conteudo` | Presente |
| `lang="pt-BR"` | Presente |
| `nav` com `aria-label="Menu principal"` | Presente |
| `aria-current="page"` no menu (router) | Presente |
| Seções com `aria-labelledby` | Presente |
| Labels associados (`for`/`id`) no formulário | Presente |
| `role="status"` + `aria-live="polite"` nas mensagens | Presente |
| `:focus-visible` em links/inputs/botões | Presente |
| Alt descritivo no logo | Presente |
| Contraste texto escuro × fundo claro | Bom (~16:1) |

### Melhorias feitas no EP4

| Item | Mudança |
|------|---------|
| Alvo do skip link | `main#conteudo` com `tabindex="-1"` (recebe foco) |
| Landmarks | `role="banner"` no header; `role="contentinfo"` no footer |
| Formulário | `aria-labelledby="titulo-cadastro"` |
| Menu mobile | Label do toggle mais descritiva; `id` no `nav` |
| Tabela inscritos | `<caption>` + `scope="col"` nos `<th>` |
| Ações da tabela | `aria-label` contextual (Editar/Excluir + nome) |
| Movimento | `@media (prefers-reduced-motion: reduce)` desliga animações/transições |
| Skip / menu | `:focus-visible` reforçado no skip link e no rótulo do menu |

### Contraste (amostra, WCAG 2.1)

| Par | Razão aprox. | Nota |
|-----|--------------|------|
| Texto `#1A1A1A` / fundo `#F7F9F8` | ~16,5:1 | Passa AAA |
| Título `#1B4D3E` / superfície branca | ~9,6:1 | Passa AAA |
| Botão `#2E8B57` / texto branco | ~4,3:1 | Passa AA (texto normal ≥4,5:1 — **limítrofe**; botão grande/bold ajuda) |
| Links no header branco / `#1B4D3E` | ~9,6:1 | Passa |
| Rodapé `#d7e5df` / `#12352b` | ~10,3:1 | Passa |
| Mensagem de erro `#C53030` / branco | ~5,5:1 | Passa AA |

**Atenção:** o verde secundário do botão principal está próximo do limite AA para texto pequeno. Se a banca exigir margem, escurecer levemente `--cor-secundaria` (ex.: rumo a `#277A4B`).

### Teclado (como testar)

1. Tab a partir do topo → skip link aparece e leva ao `#conteudo`.
2. Continuar Tab pelo menu e campos do formulário; Enter/Espaço ativam botões.
3. Em mobile (largura &lt; 768px), o label “Abrir ou fechar menu” controla o checkbox do menu.
4. Na lista de inscritos, Tab alcança Editar/Excluir.

## 3. Deploy

### Caminhos relativos e GitHub Pages

O CSS/JS/imagens usam caminhos relativos a partir de `html/` (`../css`, `../js`, `../imagens`). Por isso:

- **Opção recomendada:** publicar a **raiz do repositório** (não só a pasta `html/`).
- A raiz já tem `index.html` com redirect para `html/index.html`.
- Assim `/` redireciona e `/html/index.html` carrega CSS/JS corretamente.

Se o Pages for configurado com pasta `/docs` ou branch `gh-pages` contendo só `html/`, os `../css` quebram. Evitar esse modo, ou ajustar paths.

### GitHub Pages (passo a passo)

1. Criar repositório público no GitHub (ex.: `instituto-conectar`).
2. Na pasta do projeto:

```bash
git remote add origin https://github.com/<usuario>/instituto-conectar.git
git push -u origin main
```

3. No GitHub: **Settings → Pages → Build and deployment**.
4. Source: **Deploy from a branch**.
5. Branch: `main` / pasta: `/ (root)`.
6. Aguarde 1–2 minutos. URL típica:

`https://<usuario>.github.io/instituto-conectar/`

7. Abrir a URL; deve redirecionar para `.../html/index.html`. Testar `#/cadastro` e `#/inscritos`.

**SPA + hash:** o hash router (`#/...`) funciona bem no Pages sem configuração extra (não depende de fallback 404).

### Netlify (alternativa)

1. Arrastar a pasta do projeto para [app.netlify.com/drop](https://app.netlify.com/drop) **ou** conectar o repositório.
2. Publish directory: **raiz** (`.`), não `html`.
3. Sem build command.
4. URL gerada automaticamente (ex.: `https://algo.netlify.app`).

### URL pública deste projeto

- **URL:** `https://jorgestuart.github.io/instituto-conectar/` *(a definir / confirmar após o push)*
- Se o deploy ainda não estiver no ar: uso **local** + estas instruções.

## 4. O que não fazer

- Não alterar Dreamshaper por aqui.
- Não commitar `.env` ou dados pessoais reais.
- Não forçar `git push --force` em `main` sem necessidade.
