// Exibe os usuários cadastrados no console ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    // Recupera os usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se há usuários cadastrados
    if (usuarios.length === 0) {
        console.log("Nenhum usuário cadastrado.");
    } else {
        console.log("Usuários cadastrados:", usuarios);
    }
});

// Máscara de CPF
document.getElementById('cpf').addEventListener('input', event => {
    let cpf = event.target.value.replace(/\D/g, '');
    if (cpf.length > 3) cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    if (cpf.length > 6) cpf = cpf.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (cpf.length > 9) cpf = cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    event.target.value = cpf.substring(0, 14);
});

// Função para validar CPF
const validarCPF = cpf => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);

// Função para validar senhas
const validarSenhas = (senha, confirmacao) => senha === confirmacao && senha.length >= 6;

// Captura o formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', event => {
    event.preventDefault(); // Impede envio padrão do formulário

    // Recupera valores do formulário
    const nome = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const senha = document.getElementById('password').value;
    const confirmacaoSenha = document.getElementById('confirmPassword').value;

    // Validações
    if (!validarCPF(cpf)) {
        alert('CPF inválido! Certifique-se de usar o formato 000.000.000-00.');
        return;
    }

    if (!validarSenhas(senha, confirmacaoSenha)) {
        alert('As senhas não coincidem ou são muito curtas (mínimo 6 caracteres).');
        return;
    }

    // Recupera e atualiza os usuários no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(user => user.email === email)) {
        alert('E-mail já cadastrado! Use outro e-mail.');
        return;
    }

    const usuario = { nome, email, cpf, senha };
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    console.log("Usuários cadastrados atualizados:", usuarios); // Exibe no console
    event.target.reset(); // Reseta o formulário
});
