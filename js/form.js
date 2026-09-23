/**
 * Instituto Conectar — máscaras, validação e submit do formulário
 */
window.Conectar = window.Conectar || {};
(function (C) {
  "use strict";

  var PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    cep: /^\d{5}-\d{3}$/,
  };

  function soDigitos(valor) {
    return String(valor || "").replace(/\D/g, "");
  }

  C.mascararCpf = function (valor) {
    var d = soDigitos(valor).slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + "." + d.slice(3);
    if (d.length <= 9) {
      return d.slice(0, 3) + "." + d.slice(3, 6) + "." + d.slice(6);
    }
    return (
      d.slice(0, 3) +
      "." +
      d.slice(3, 6) +
      "." +
      d.slice(6, 9) +
      "-" +
      d.slice(9)
    );
  };

  C.mascararTelefone = function (valor) {
    var d = soDigitos(valor).slice(0, 11);
    if (d.length <= 2) return d.length ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) {
      return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    }
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  };

  C.mascararCep = function (valor) {
    var d = soDigitos(valor).slice(0, 8);
    if (d.length <= 5) return d;
    return d.slice(0, 5) + "-" + d.slice(5);
  };

  C.limparErros = function (form) {
    form.querySelectorAll(".campo-erro").forEach(function (el) {
      el.hidden = true;
      el.textContent = "";
    });
    form.querySelectorAll(".campo-invalido").forEach(function (el) {
      el.classList.remove("campo-invalido");
    });
  };

  C.mostrarErroCampo = function (nome, mensagem) {
    var input = document.getElementById(nome);
    var erro = document.querySelector('[data-erro-for="' + nome + '"]');
    if (input) input.classList.add("campo-invalido");
    if (erro) {
      erro.textContent = mensagem;
      erro.hidden = false;
    }
  };

  C.validarFormulario = function (form) {
    C.limparErros(form);
    var dados = Object.fromEntries(new FormData(form).entries());
    var ok = true;
    var primeiroInvalido = { id: null };

    function falha(campo, msg) {
      ok = false;
      C.mostrarErroCampo(campo, msg);
      if (!primeiroInvalido.id) primeiroInvalido.id = campo;
    }

    var nome = (dados.nome || "").trim();
    if (nome.length < 3) falha("nome", "Informe o nome completo (mínimo 3 caracteres).");

    var email = (dados.email || "").trim();
    if (!email) falha("email", "Informe o e-mail.");
    else if (!PATTERNS.email.test(email)) falha("email", "E-mail inválido.");

    if (!dados.nascimento) falha("nascimento", "Informe a data de nascimento.");
    else if (dados.nascimento > "2012-12-31") {
      falha("nascimento", "A data deve ser até 31/12/2012.");
    }

    var cpf = (dados.cpf || "").trim();
    if (!PATTERNS.cpf.test(cpf)) falha("cpf", "CPF no formato 000.000.000-00.");

    var telefone = (dados.telefone || "").trim();
    if (!PATTERNS.telefone.test(telefone)) {
      falha("telefone", "Telefone no formato (41) 99999-9999.");
    }

    var cep = (dados.cep || "").trim();
    if (!PATTERNS.cep.test(cep)) falha("cep", "CEP no formato 00000-000.");

    var endereco = (dados.endereco || "").trim();
    if (endereco.length < 5) falha("endereco", "Informe rua e número (mínimo 5 caracteres).");

    var cidade = (dados.cidade || "").trim();
    if (cidade.length < 2) falha("cidade", "Informe a cidade.");

    if (!dados.estado) falha("estado", "Selecione o estado.");
    if (!dados.tipo) falha("tipo", "Selecione o tipo de cadastro.");

    if (primeiroInvalido.id) {
      var el = document.getElementById(primeiroInvalido.id);
      if (el) el.focus();
    }

    return { ok: ok, dados: dados };
  };

  C.resetFormulario = function () {
    var form = document.getElementById("form-cadastro");
    if (!form) return;
    form.reset();
    document.getElementById("registro-id").value = "";
    C.limparErros(form);
    var btnEnviar = document.getElementById("btn-enviar");
    var btnCancelar = document.getElementById("btn-cancelar-edicao");
    if (btnEnviar) btnEnviar.textContent = "Enviar cadastro";
    if (btnCancelar) btnCancelar.hidden = true;
  };

  C.onSubmitCadastro = function (event) {
    event.preventDefault();
    var form = event.target;
    var feedback = document.getElementById("form-feedback");
    var resultado = C.validarFormulario(form);

    if (!resultado.ok) {
      C.setMensagem(feedback, "erro", "Corrija os campos destacados antes de enviar.");
      return;
    }

    var dados = resultado.dados;
    var idExistente = (dados.id || "").trim();
    var lista = C.lerInscritos();
    var agora = new Date().toISOString();

    var registro = {
      id: idExistente || C.gerarId(),
      nome: dados.nome.trim(),
      email: dados.email.trim().toLowerCase(),
      nascimento: dados.nascimento,
      cpf: dados.cpf.trim(),
      telefone: dados.telefone.trim(),
      cep: dados.cep.trim(),
      endereco: dados.endereco.trim(),
      cidade: dados.cidade.trim(),
      estado: dados.estado,
      tipo: dados.tipo,
      mensagem: (dados.mensagem || "").trim(),
      atualizadoEm: agora,
    };

    if (idExistente) {
      var idx = lista.findIndex(function (r) {
        return r.id === idExistente;
      });
      if (idx >= 0) {
        registro.criadoEm = lista[idx].criadoEm || agora;
        lista[idx] = registro;
      } else {
        registro.criadoEm = agora;
        lista.push(registro);
      }
      C.setMensagem(feedback, "sucesso", "Cadastro atualizado com sucesso!");
    } else {
      registro.criadoEm = agora;
      lista.push(registro);
      C.setMensagem(
        feedback,
        "sucesso",
        "Cadastro enviado com sucesso! Veja em Inscritos."
      );
    }

    C.salvarInscritos(lista);
    C.resetFormulario();

    window.setTimeout(function () {
      C.navegar("#/inscritos");
      C.setMensagem(
        document.getElementById("lista-feedback"),
        "sucesso",
        idExistente ? "Alterações salvas." : "Novo cadastro adicionado."
      );
    }, 600);
  };

  C.initMascaras = function () {
    var cpf = document.getElementById("cpf");
    var telefone = document.getElementById("telefone");
    var cep = document.getElementById("cep");

    if (cpf) {
      cpf.addEventListener("input", function () {
        cpf.value = C.mascararCpf(cpf.value);
      });
    }
    if (telefone) {
      telefone.addEventListener("input", function () {
        telefone.value = C.mascararTelefone(telefone.value);
      });
    }
    if (cep) {
      cep.addEventListener("input", function () {
        cep.value = C.mascararCep(cep.value);
      });
    }
  };
})(window.Conectar);
