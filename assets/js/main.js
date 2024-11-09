document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o botão de edição
    const editButton = document.getElementById('editButton');

    // Adiciona o evento de clique para redirecionar para a página de atualização
    editButton.addEventListener('click', function () {
        // Recupera o token do localStorage ou sessionStorage
        const token = localStorage.getItem('authToken'); // ou sessionStorage.getItem('token');

        if (token) {
            // Se o token existir, redireciona para a página de edição
            window.location.href = 'updateUser.html';
        } else {
            // Se o token não existir, pede ao usuário para fazer login
            alert('Você precisa estar logado para editar o perfil!');
            window.location.href = '/login.html'; // Redireciona para a página de login
        }
    });
});
