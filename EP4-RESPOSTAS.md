# EP4 — Respostas (rascunho em português)

Texto pronto para adaptar no Dreamshaper. Revisar enunciado oficial antes de colar.

---

## 1. Controle de versão com Git

### O que é e por que usar
Git registra o histórico do projeto em commits. Permite voltar versões, trabalhar em branches e colaborar via remoto (GitHub).

### Comandos principais usados neste projeto
- `git init` — inicia o repositório na pasta `ep1-ong`.
- `git status` — vê arquivos modificados.
- `git add .` / `git add arquivo` — prepara o stage.
- `git commit -m "mensagem"` — grava um snapshot com mensagem clara.
- `git log --oneline` — lista commits resumidos.
- `git branch` / `git checkout -b nome` — lista / cria branch.
- `git remote add origin <url>` — liga ao GitHub.
- `git push -u origin main` — envia commits ao remoto.

### Branches
Trabalhei na branch principal (`main`). Em um fluxo maior, criaria branches como `melhoria/a11y` para acessibilidade e faria merge depois de testar.

### Remoto
O remoto aponta para o repositório no GitHub (quando configurado). O `push` publica o código; o GitHub Pages pode servir o site a partir da branch `main`.

### .gitignore
Arquivo que impede versionar lixo de sistema (`.DS_Store`, `Thumbs.db`), pastas de editor (`.vscode/`), logs, `node_modules` e arquivos de ambiente (`.env`). Mantém o repositório limpo e evita vazar segredos.

### README.md
Documenta o nome do projeto (**Instituto Conectar**), como abrir `html/index.html`, a stack (HTML/CSS/JS), a estrutura de pastas e a chave de `localStorage` `conectar_inscritos`. Facilita avaliação e reuso.

---

## 2. Acessibilidade (WCAG) aplicada ao site

Os quatro princípios (POUR):

1. **Perceivable (perceptível)** — conteúdo com contraste adequado, texto alternativo no logo, captions na tabela, labels visíveis nos campos.
2. **Operable (operável)** — navegação por teclado, skip link, foco visível, menu utilizável sem mouse.
3. **Understandable (compreensível)** — idioma `pt-BR`, mensagens de erro claras no formulário, `aria-live` para feedback.
4. **Robust (robusto)** — HTML semântico, roles/ARIA coerentes, funciona com tecnologias assistivas modernas.

### Exemplos concretos neste site
- Skip link “Ir para o conteúdo” com destino focável (`tabindex="-1"` no `main`).
- Landmarks: header (banner), nav com rótulo, main, footer (contentinfo).
- Formulário com `label`/`for`, `fieldset`/`legend` e `aria-labelledby`.
- Tabela de inscritos com `<caption>` e `th scope="col"`.
- `:focus-visible` com contorno destacado.
- `prefers-reduced-motion` para reduzir animações.
- Alt do logo descreve a imagem (não só “logo”).

### Contraste
Texto principal e títulos passam com folga. O verde do botão principal (~4,3:1 com branco) atende AA em botões com texto grande/bold; se necessário, escureço a variável `--cor-secundaria`.

### Teclado
É possível percorrer menu, formulário e ações da tabela só com Tab/Shift+Tab e Enter. O skip link evita repetir o menu a cada página/view.

### Texto alternativo
Imagens informativas têm `alt` descritivo; se houvesse imagens decorativas, usaria `alt=""`.

---

## 3. Deploy

### Como publiquei / como publicar
1. Código versionado no GitHub.
2. GitHub Pages ativado na branch `main`, pasta raiz `/`.
3. A raiz contém redirect para `html/index.html`, preservando os caminhos `../css`, `../js`, `../imagens`.

### URL do site
**https://jorgestuart.github.io/instituto-conectar/**  
(GitHub Pages ativo na branch `main`, pasta raiz. Pode levar alguns minutos para propagar na primeira publicação.)

### Observação
Como usamos rotas em hash (`#/projetos`), o Pages não precisa de rewrite de URLs — adequado a site estático sem build.

---

## 4. Reflexão / autoavaliação

Neste EP consolidei três práticas profissionais: versionar com Git e documentar no README; melhorar acessibilidade com base em WCAG (sem quebrar a SPA do EP3); e preparar publicação estática com atenção aos caminhos relativos.

Pontos fortes: estrutura de pastas clara, SPA com `localStorage`, melhorias de a11y documentadas.

Pontos a evoluir: contraste do botão verde (ajuste fino), testes com leitor de tela (NVDA/VoiceOver) e, se a banca pedir, CI simples que rode um checklist de links.

Aprendizado principal: acessibilidade e deploy não são “extras” — fazem parte do front-end responsável, junto com HTML/CSS/JS.

---

## 5. Honestidade sobre o estado atual

- Git local configurado com commits e `.gitignore`.
- Melhorias de acessibilidade aplicadas no código real.
- Instruções de deploy escritas.
- Repositório: https://github.com/JorgeStuart/instituto-conectar
- Pages: https://jorgestuart.github.io/instituto-conectar/ (aguardar build se acabou de ativar).
