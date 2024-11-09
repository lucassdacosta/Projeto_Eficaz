document.addEventListener("DOMContentLoaded", () => {

    const authToken = localStorage.getItem('authToken'); 

    if (!authToken) {
        console.error('Token de autenticação não encontrado.');

    }

    function getUserData(authToken) {
        return axios.get('https://localhost:7291/api/Usuario', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Erro ao obter dados do usuário', error);
            throw error;
        });
    }

    function validarSenhas() {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return false;
        }
        return true;
    }

    getUserData(authToken).then(usuario => {
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('sobrenome').value = usuario.sobrenome;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefone').value = usuario.telefone;
        document.getElementById('dataNascimento').value = usuario.dataNascimento.slice(0, 10); 
        document.getElementById('username').value = usuario.username;
        document.getElementById('rg').value = usuario.rg;
        document.getElementById('cpf').value = usuario.cpf;
        document.getElementById('foto').value = usuario.imagemPerfil;

        document.getElementById('cep').value = usuario.endereco.cep;
        document.getElementById('logradouro').value = usuario.endereco.logradouro;
        document.getElementById('complemento').value = usuario.endereco.complemento;
        document.getElementById('numeroCasa').value = usuario.endereco.numeroCasa;
        document.getElementById('bairro').value = usuario.endereco.bairro;
        document.getElementById('localidade').value = usuario.endereco.localidade;
        document.getElementById('estado').value = usuario.endereco.estado;

        if (usuario.genero === 'male') {
            document.getElementById('masc').checked = true;
        } else if (usuario.genero === 'female') {
            document.getElementById('fem').checked = true;
        } else {
            document.getElementById('outro').checked = true;
        }
    }).catch(error => {
        console.error('Erro ao carregar os dados do usuário:', error);
    });

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); 

        if (!validarSenhas()) {
            return;
        }

        const dadosAtualizados = {
            username: document.getElementById('username').value,
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            email: document.getElementById('email').value,
            dataNascimento: document.getElementById('dataNascimento').value + 'T00:00:00.000Z', 
            senha: document.getElementById('senha').value,
            genero: document.querySelector('input[name="genero"]:checked').value,
            telefone: document.getElementById('telefone').value,
            rg: document.getElementById('rg').value,
            cpf: document.getElementById('cpf').value,
            imagemPerfil: document.getElementById('foto').value,
            endereco: {
                cep: document.getElementById('cep').value,
                logradouro: document.getElementById('logradouro').value,
                complemento: document.getElementById('complemento').value,
                numeroCasa: document.getElementById('numeroCasa').value,
                bairro: document.getElementById('bairro').value,
                localidade: document.getElementById('localidade').value,
                estado: document.getElementById('estado').value
            }
        };

        console.log('Dados atualizados:', dadosAtualizados); 

        axios.put('https://localhost:7291/api/Usuario', dadosAtualizados, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            console.log('Dados atualizados com sucesso', response.data);
            alert('Dados atualizados com sucesso!');
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.error('Erro ao atualizar dados:', error);
            
            if (error.response) {
                console.error('Erro de resposta do servidor:', error.response);
                console.error('Status:', error.response.status);
                console.error('Dados do erro:', error.response.data);

                alert(`Erro ao atualizar os dados: ${error.response.data.message || 'Tente novamente mais tarde.'}`);
            } else {
                alert('Erro de comunicação com o servidor. Tente novamente!');
            }
        });
    });
});
