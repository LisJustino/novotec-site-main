// Aplicação da máscara para CPF
document.getElementById('cpf').addEventListener('input', function (event) {
    let cpf = event.target.value;

    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Aplica máscara de CPF: 000.000.000-00
    // Primeiro ponto
    if (cpf.length > 3) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }

    // Segundo ponto
    if (cpf.length > 6) {
        cpf = cpf.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }

    // Hífen
    if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    // Limita o CPF formatado a 14 caracteres
    cpf = cpf.substring(0, 14);

    // Atualiza o valor do campo
    event.target.value = cpf;
});

// Função para validar o CPF
function validarCPF(cpf) {
    const cpfNumero = cpf.replace(/\D/g, '');
    return cpfNumero.length === 11; // valida se tem 11 NÚMEROS
}

// Captura o formulário de cadastro
const form = document.getElementById('registerForm');

// Adiciona o evento de envio do formulário
form.addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio normal do formulário

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Valida se as senhas são iguais
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Cria um objeto do usuário
    const usuario = {
        nome,
        email,
        cpf,
        password
    };

    // Recupera os usuários salvos (caso existam)
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Adiciona o novo usuário ao array de usuários
    usuarios.push(usuario);

    // Salva o array atualizado de usuários no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');
    form.reset();  // Reseta o formulário

    // Exibe os usuários cadastrados no console
    exibirUsuarios();
});

// Função para exibir os usuários cadastrados no console
function exibirUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length === 0) {
        console.log('Nenhum usuário cadastrado.');
    } else {
        console.log('Usuários cadastrados:', usuarios);
    }
}

// Chama a função para exibir os usuários após o carregamento da página
window.onload = function () {
    exibirUsuarios();
};
