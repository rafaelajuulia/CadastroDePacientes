// ---------- Validações ----------
function validarNome(nome) {
  return nome.trim().length > 0 && nome.trim().length <= 100;
}

function validarCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}

function validarDataNascimento(dataNascimento) {
  if (!dataNascimento) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dataNascimento)) return false;

  const data = new Date(dataNascimento + "T00:00:00");
  const hoje = new Date();
  return data instanceof Date && !isNaN(data) && data <= hoje;
}

function validarTelefone(telefone) {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// ---------- Máscaras ----------
function aplicarMascaraCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 10) {
    return numeros
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return numeros
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// ---------- Mensagens de erro ----------
const mensagens = {
  nome: "Digite um nome válido (até 100 caracteres).",
  cpf: "Use o formato 000.000.000-00.",
  dataNascimento: "Informe uma data válida (não pode ser no futuro).",
  telefone: "Use o formato (00) 00000-0000.",
  email: "Digite um email válido.",
};

const validadores = {
  nome: validarNome,
  cpf: validarCPF,
  dataNascimento: validarDataNascimento,
  telefone: validarTelefone,
  email: validarEmail,
};

function mostrarErro(campo, temErro) {
  const input = document.getElementById(campo);
  const erroEl = document.getElementById("erro-" + campo);
  if (!input || !erroEl) return;

  if (temErro) {
    input.setAttribute("aria-invalid", "true");
    erroEl.textContent = mensagens[campo];
  } else {
    input.removeAttribute("aria-invalid");
    erroEl.textContent = "";
  }
}

function validarCampo(campo) {
  const input = document.getElementById(campo);
  const valor = input.value;
  const valido = validadores[campo](valor);
  mostrarErro(campo, !valido);
  return valido;
}

// ---------- Inicialização ----------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const mensagemSucesso = document.getElementById("mensagemSucesso");

  cpfInput.addEventListener("input", function () {
    cpfInput.value = aplicarMascaraCPF(cpfInput.value);
  });

  telefoneInput.addEventListener("input", function () {
    telefoneInput.value = aplicarMascaraTelefone(telefoneInput.value);
  });

  Object.keys(validadores).forEach(function (campo) {
    const input = document.getElementById(campo);
    input.addEventListener("blur", function () {
      validarCampo(campo);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    mensagemSucesso.textContent = "";

    let formularioValido = true;
    Object.keys(validadores).forEach(function (campo) {
      const valido = validarCampo(campo);
      if (!valido) formularioValido = false;
    });

    if (formularioValido) {
      mensagemSucesso.textContent = "Cadastro realizado com sucesso!";
      form.reset();
      Object.keys(validadores).forEach(function (campo) {
        mostrarErro(campo, false);
      });
    }
  });
});
