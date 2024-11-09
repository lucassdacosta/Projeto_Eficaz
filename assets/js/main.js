document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editButton');
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const logoutButton = document.getElementById('logoutButton');

    const token = localStorage.getItem('authToken');

    const isLoggedIn = !!token;
    signInButton.hidden = isLoggedIn;
    signUpButton.hidden = isLoggedIn;
    editButton.hidden = !isLoggedIn;
    logoutButton.hidden = !isLoggedIn;

    editButton.addEventListener('click', function () {
        if (isLoggedIn) {
            window.location.href = 'updateUser.html';
            console.log("Redirecionando para a página de edição...");
        } else {
            alert('Você precisa estar logado para editar o perfil!');
            window.location.href = '/login.html';
        }
    });

    logoutButton.addEventListener('click', function () {

        localStorage.removeItem('authToken');

        signInButton.hidden = false;
        signUpButton.hidden = false;
        editButton.hidden = true;
        logoutButton.hidden = true;

        alert("Usuario deslogado")
    });
});
