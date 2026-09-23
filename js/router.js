/**
 * Instituto Conectar — hash router (SPA)
 */
window.Conectar = window.Conectar || {};
(function (C) {
  "use strict";

  C.ROUTES = {
    "/": "home",
    "/projetos": "projetos",
    "/cadastro": "cadastro",
    "/inscritos": "inscritos",
  };

  C.TITLES = {
    home: "Instituto Conectar — Sobre e Contato",
    projetos: "Instituto Conectar — Projetos",
    cadastro: "Instituto Conectar — Cadastro de Doador ou Voluntário",
    inscritos: "Instituto Conectar — Inscritos",
  };

  C.caminhoAtual = function () {
    var hash = window.location.hash || "#/";
    var path = hash.replace(/^#/, "") || "/";
    if (path.charAt(0) !== "/") path = "/" + path;
    path = path.split("?")[0];
    return path;
  };

  C.navegar = function (path) {
    if (!path.startsWith("#")) path = "#" + (path.startsWith("/") ? path : "/" + path);
    if (window.location.hash === path) {
      C.renderRota();
    } else {
      window.location.hash = path;
    }
  };

  C.fecharMenuMobile = function () {
    var toggle = document.getElementById("nav-toggle");
    if (toggle) toggle.checked = false;
  };

  C.atualizarNavAtiva = function (view) {
    var map = {
      home: "#/",
      projetos: "#/projetos",
      cadastro: "#/cadastro",
      inscritos: "#/inscritos",
    };
    var alvo = map[view];
    document.querySelectorAll(".menu-principal a[data-link]").forEach(function (a) {
      if (a.getAttribute("href") === alvo) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  C.renderRota = function () {
    var path = C.caminhoAtual();
    var view = C.ROUTES[path];

    if (!view) {
      C.navegar("#/");
      return;
    }

    document.querySelectorAll(".view").forEach(function (el) {
      var ativa = el.getAttribute("data-view") === view;
      el.hidden = !ativa;
    });

    document.body.className = "page-spa page-" + view;
    document.title = C.TITLES[view] || "Instituto Conectar";
    C.atualizarNavAtiva(view);
    C.fecharMenuMobile();

    if (view === "inscritos" && typeof C.renderLista === "function") {
      C.renderLista();
    }
    if (view === "cadastro") {
      var id = document.getElementById("registro-id");
      if (id && !id.value) {
        var btn = document.getElementById("btn-cancelar-edicao");
        if (btn) btn.hidden = true;
        var enviar = document.getElementById("btn-enviar");
        if (enviar) enviar.textContent = "Enviar cadastro";
      }
    }

    var main = document.getElementById("conteudo");
    if (main) main.focus({ preventScroll: true });
  };
})(window.Conectar);
