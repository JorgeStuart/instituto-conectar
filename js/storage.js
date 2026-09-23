/**
 * Instituto Conectar — localStorage CRUD (chave conectar_inscritos)
 */
window.Conectar = window.Conectar || {};
(function (C) {
  "use strict";

  var STORAGE_KEY = "conectar_inscritos";

  C.STORAGE_KEY = STORAGE_KEY;

  C.lerInscritos = function () {
    try {
      var bruto = localStorage.getItem(STORAGE_KEY);
      if (!bruto) return [];
      var dados = JSON.parse(bruto);
      return Array.isArray(dados) ? dados : [];
    } catch (err) {
      console.warn("Falha ao ler localStorage:", err);
      return [];
    }
  };

  C.salvarInscritos = function (lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  };

  C.gerarId = function () {
    return (
      "id_" +
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2, 8)
    );
  };
})(window.Conectar);
