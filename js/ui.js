/**
 * Instituto Conectar — UI: mensagens, tabela de inscritos, ações CRUD
 */
window.Conectar = window.Conectar || {};
(function (C) {
  "use strict";

  var TIPO_LABEL = {
    doador: "Doador",
    voluntario: "Voluntário",
    ambos: "Doador e voluntário",
  };

  C.setMensagem = function (el, tipo, texto) {
    if (!el) return;
    el.hidden = !texto;
    el.textContent = texto || "";
    el.className = "mensagem" + (tipo ? " mensagem--" + tipo : "");
  };

  C.escapeHtml = function (str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  C.escapeAttr = function (str) {
    return C.escapeHtml(str).replace(/'/g, "&#39;");
  };

  C.formatarCriadoEm = function (iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    } catch (e) {
      return iso || "—";
    }
  };

  C.renderLista = function () {
    var container = document.getElementById("lista-inscritos");
    if (!container) return;

    var lista = C.lerInscritos();

    if (lista.length === 0) {
      container.innerHTML =
        '<div class="estado-vazio">' +
        "<p>Nenhum inscrito ainda.</p>" +
        '<p><a href="#/cadastro" data-link>Fazer o primeiro cadastro</a></p>' +
        "</div>";
      return;
    }

    var ordenada = lista.slice().sort(function (a, b) {
      return String(b.criadoEm || "").localeCompare(String(a.criadoEm || ""));
    });

    var html =
      '<div class="tabela-wrap"><table class="tabela-inscritos">' +
      "<caption>Lista de doadores e voluntários inscritos neste navegador</caption>" +
      "<thead><tr>" +
      '<th scope="col">Nome</th>' +
      '<th scope="col">E-mail</th>' +
      '<th scope="col">Telefone</th>' +
      '<th scope="col">Tipo</th>' +
      '<th scope="col">Cidade</th>' +
      '<th scope="col">Cadastro</th>' +
      '<th scope="col">Ações</th>' +
      "</tr></thead><tbody>";

    ordenada.forEach(function (item) {
      html +=
        '<tr data-id="' +
        C.escapeAttr(item.id) +
        '">' +
        "<td>" +
        C.escapeHtml(item.nome) +
        "</td>" +
        "<td>" +
        C.escapeHtml(item.email) +
        "</td>" +
        "<td>" +
        C.escapeHtml(item.telefone) +
        "</td>" +
        '<td><span class="tag">' +
        C.escapeHtml(TIPO_LABEL[item.tipo] || item.tipo) +
        "</span></td>" +
        "<td>" +
        C.escapeHtml(item.cidade) +
        "/" +
        C.escapeHtml(item.estado) +
        "</td>" +
        "<td>" +
        C.escapeHtml(C.formatarCriadoEm(item.criadoEm)) +
        "</td>" +
        '<td class="acoes-celula">' +
        '<button type="button" class="botao-acao botao-editar" data-acao="editar" data-id="' +
        C.escapeAttr(item.id) +
        '" aria-label="Editar cadastro de ' +
        C.escapeAttr(item.nome) +
        '">Editar</button> ' +
        '<button type="button" class="botao-acao botao-excluir" data-acao="excluir" data-id="' +
        C.escapeAttr(item.id) +
        '" aria-label="Excluir cadastro de ' +
        C.escapeAttr(item.nome) +
        '">Excluir</button>' +
        "</td></tr>";
    });

    html += "</tbody></table></div>";
    html +=
      '<p class="lista-resumo">' +
      ordenada.length +
      (ordenada.length === 1 ? " inscrito" : " inscritos") +
      ".</p>";
    container.innerHTML = html;
  };

  C.excluirInscrito = function (id) {
    var lista = C.lerInscritos().filter(function (item) {
      return item.id !== id;
    });
    C.salvarInscritos(lista);
    C.setMensagem(
      document.getElementById("lista-feedback"),
      "sucesso",
      "Cadastro excluído com sucesso."
    );
    C.renderLista();
  };

  C.carregarParaEdicao = function (id) {
    var item = C.lerInscritos().find(function (r) {
      return r.id === id;
    });
    if (!item) {
      C.setMensagem(
        document.getElementById("lista-feedback"),
        "erro",
        "Registro não encontrado."
      );
      return;
    }

    C.navegar("#/cadastro");

    var form = document.getElementById("form-cadastro");
    if (!form) return;

    C.limparErros(form);
    document.getElementById("registro-id").value = item.id;
    document.getElementById("nome").value = item.nome || "";
    document.getElementById("email").value = item.email || "";
    document.getElementById("nascimento").value = item.nascimento || "";
    document.getElementById("cpf").value = item.cpf || "";
    document.getElementById("telefone").value = item.telefone || "";
    document.getElementById("cep").value = item.cep || "";
    document.getElementById("endereco").value = item.endereco || "";
    document.getElementById("cidade").value = item.cidade || "";
    document.getElementById("estado").value = item.estado || "";
    document.getElementById("tipo").value = item.tipo || "";
    document.getElementById("mensagem").value = item.mensagem || "";

    var btnEnviar = document.getElementById("btn-enviar");
    var btnCancelar = document.getElementById("btn-cancelar-edicao");
    if (btnEnviar) btnEnviar.textContent = "Salvar alterações";
    if (btnCancelar) btnCancelar.hidden = false;

    C.setMensagem(
      document.getElementById("form-feedback"),
      "info",
      "Editando cadastro de " + item.nome + ". Altere os campos e salve."
    );
    document.getElementById("nome").focus();
  };
})(window.Conectar);
