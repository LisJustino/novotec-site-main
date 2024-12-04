document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value; // O nome ou e-mail fornecido pelo usuário
    const password = document.getElementById('password').value; // A senha fornecida pelo usuário
    const errorMessage = document.getElementById('errorMessage'); // Div para exibir erros

    // Recupera os usuários cadastrados do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Busca por um usuário que tenha o nome ou e-mail igual ao fornecido no campo "usuario" e senha igual ao fornecido
    const usuarioEncontrado = usuarios.find(
        user => (user.email === usuario || user.nome === usuario) && user.password === password
    );

    // Se o usuário foi encontrado e a senha estiver correta
    if (usuarioEncontrado) {
        errorMessage.textContent = ''; // Limpa qualquer mensagem de erro

        // Salva o usuário logado em uma chave específica no localStorage para referência
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

        // Redireciona para a tela de perfil
        window.location.assign('../../Meu Perfil/meuPerfil.html');
    } else {
        errorMessage.textContent = 'Usuário ou senha incorretos :('; // Exibe a mensagem de erro
    }
});
