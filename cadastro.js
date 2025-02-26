function validarNome(nome) {
    if (nome.length < 100) {
        return true;
    }
        return false;
}
function validarCPF(cpf) {
    let regex = /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/;
    return regex.test(cpf)
}
function validarDataNascimento(dataNascimento) {
    let regex = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/;
    return regex.test(dataNascimento)
}

function validarTelefone(telefone) {
    let regex = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;
    return regex.test(telefone)
}
function validarEmail(email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
}
function validarFormularioCadastro(event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let dataNascimento = document.getElementById('dataNascimento').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

if(!validarNome(nome)){
    alert("Nome inválido!")
}
if(!validarCPF(cpf)){
    alert("CPF inválido!")
}
if(!validarDataNascimento(dataNascimento)){
    alert("Data inválida!")
}
if(!validarTelefone(telefone)){
    alert("Telefone inválido!")
}
if(!validarEmail(email)){
    alert("Email inválido!")
}
}
document.getElementById('cadastro').addEventListener('submit', validarFormulario);

