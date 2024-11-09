document.addEventListener("DOMContentLoaded", () => {
    // Pega o token de autenticação do localStorage
    const authToken = localStorage.getItem('authToken'); 

    // Verifica se o token existe, caso contrário, redireciona ou mostra erro
    if (!authToken) {
        console.error('Token de autenticação não encontrado.');
        return; // Ou redirecione o usuário para a tela de login
    }

    // Função para buscar os dados do usuário usando o authToken
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

    // Fazendo a requisição para obter os dados do usuário
    getUserData(authToken).then(usuario => {
        // Preenche os campos do formulário com os dados do usuário
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('sobrenome').value = usuario.sobrenome;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefone').value = usuario.telefone;
        document.getElementById('dataNascimento').value = usuario.dataNascimento.slice(0, 10); // "2024-11-08T00:00:00" => "2024-11-08"
        document.getElementById('username').value = usuario.username;
        document.getElementById('rg').value = usuario.rg;
        document.getElementById('cpf').value = usuario.cpf;
        document.getElementById('foto').value = usuario.imagemPerfil;

        // Preenche o endereço
        document.getElementById('cep').value = usuario.endereco.cep;
        document.getElementById('logradouro').value = usuario.endereco.logradouro;
        document.getElementById('complemento').value = usuario.endereco.complemento;
        document.getElementById('numeroCasa').value = usuario.endereco.numeroCasa;
        document.getElementById('bairro').value = usuario.endereco.bairro;
        document.getElementById('localidade').value = usuario.endereco.localidade;
        document.getElementById('estado').value = usuario.endereco.estado;

        // Seleciona o gênero
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

    // Adiciona um listener para o submit do formulário
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário

        // Coleta os dados do formulário para enviar
        const dadosAtualizados = {
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            dataNascimento: document.getElementById('dataNascimento').value,
            genero: document.querySelector('input[name="genero"]:checked').value,
            username: document.getElementById('username').value,
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

        console.log('Dados atualizados:', dadosAtualizados); // Verifique os dados que estão sendo enviados

        // Faz a requisição PUT para atualizar os dados no backend
        axios.put('https://localhost:7291/api/Usuario', dadosAtualizados, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            console.log('Dados atualizados com sucesso', response.data);
            alert('Dados atualizados com sucesso!');
            // Aqui você pode adicionar lógica para redirecionar ou mostrar outro feedback ao usuário
        })
        .catch(error => {
            console.error('Erro ao atualizar dados:', error);
            
            // Verifica se a resposta do backend contém detalhes do erro
            if (error.response) {
                console.error('Erro de resposta do servidor:', error.response);
                console.error('Status:', error.response.status);
                console.error('Dados do erro:', error.response.data);

                alert(`Erro ao atualizar os dados: ${error.response.data.message || 'Tente novamente mais tarde.'}`);
            } else {
                // Caso o erro não seja da resposta do backend (exemplo, rede, axios)
                alert('Erro de comunicação com o servidor. Tente novamente!');
            }
        });
    });
});
