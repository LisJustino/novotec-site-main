// Exibe os usuários cadastrados no console ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log("Usuários cadastrados:", usuarios);
});

// Adiciona um ouvinte ao formulário para interceptar o envio
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Recupera os valores dos campos
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage'); // Div para exibir mensagens de erro

    // Recupera os usuários cadastrados do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se existe um usuário com o e-mail e senha fornecidos
    const usuarioEncontrado = usuarios.find(
        user => user.email === email && user.senha === password
    );

    if (usuarioEncontrado) {
        errorMessage.textContent = ''; // Limpa a mensagem de erro

        // Salva os dados do usuário logado no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

        // Redireciona para a tela de perfil
        alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
        window.location.assign('../../Meu Perfil/meuPerfil.html');
    } else {
        errorMessage.textContent = 'E-mail ou senha incorretos :('; // Exibe erro
    }
});
