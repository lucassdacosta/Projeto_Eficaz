document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const dropdown = document.getElementById('dropdown');

    const token = localStorage.getItem('authToken');
    const isLoggedIn = !!token;

    signInButton.hidden = isLoggedIn;
    signUpButton.hidden = isLoggedIn;
    dropdown.hidden = !isLoggedIn;

    editButton.addEventListener('click', function (event) {
        event.preventDefault();

        const currentToken = localStorage.getItem('authToken');
        if (currentToken) {
            window.location.href = 'updateUser.html';
        } else {
            alert('Você precisa estar logado para editar o perfil!');
            window.location.href = '/login.html';
        }
    });

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('authToken');

        signInButton.hidden = false;
        signUpButton.hidden = false;
        dropdown.hidden = true;

        alert("Usuário deslogado");
    });
});
