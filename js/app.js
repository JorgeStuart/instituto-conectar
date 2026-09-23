/**
 * Instituto Conectar — boot / wire de eventos (EP3 SPA)
 * Depende de: storage.js → router.js → form.js → ui.js (carregados antes, defer)
 */
window.Conectar = window.Conectar || {};
(function (C) {
  "use strict";

  function init() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[data-link]");
      if (link) {
        C.fecharMenuMobile();
      }

      var botao = event.target.closest("[data-acao]");
      if (!botao) return;

      var acao = botao.getAttribute("data-acao");
      var id = botao.getAttribute("data-id");

      if (acao === "excluir" && id) {
        if (
          window.confirm(
            "Excluir este cadastro? Esta ação não pode ser desfeita."
          )
        ) {
          C.excluirInscrito(id);
        }
      }
      if (acao === "editar" && id) {
        C.carregarParaEdicao(id);
      }
    });

    var form = document.getElementById("form-cadastro");
    if (form) {
      form.addEventListener("submit", C.onSubmitCadastro);
    }

    var btnCancelar = document.getElementById("btn-cancelar-edicao");
    if (btnCancelar) {
      btnCancelar.addEventListener("click", function () {
        C.resetFormulario();
        C.setMensagem(
          document.getElementById("form-feedback"),
          "info",
          "Edição cancelada."
        );
      });
    }

    C.initMascaras();

    window.addEventListener("hashchange", C.renderRota);

    if (!window.location.hash || window.location.hash === "#") {
      window.location.hash = "#/";
    } else {
      C.renderRota();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})(window.Conectar);
