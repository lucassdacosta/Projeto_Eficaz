document.addEventListener('DOMContentLoaded', function () {
    // Referência ao formulário e ao botão de submit
    const form = document.querySelector('form'); // Aqui, usamos o formulário em vez do botão.
  
    // Função para realizar o cadastro
    form.addEventListener('submit', function (event) {
      // Impedir o comportamento padrão de envio do formulário (evita o envio via URL)
      event.preventDefault();
  
      // Coleta os dados dos inputs do formulário
      const nome = document.querySelector('input[placeholder="Nome"]').value;
      const sobrenome = document.querySelector('input[placeholder="Sobrenome"]').value;
      const email = document.querySelector('input[placeholder="Email"]').value;
      const username = document.querySelector('input[placeholder="Username"]').value;
      const senha = document.querySelector('input[placeholder="Senha"]').value;
      const confirmarSenha = document.querySelector('input[placeholder="Confirmar senha"]').value;
      const rg = document.querySelector('input[placeholder="RG"]').value;
      const cpf = document.querySelector('input[placeholder="CPF"]').value;
      const dataNascimento = document.querySelector('input[placeholder="Data Nascimento"]').value;
      const telefone = document.querySelector('input[placeholder="Telefone"]').value;
      const genero = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';
      const imagemPerfil = document.querySelector('input[placeholder="Foto"]').value;
      
      // Endereço
      const cep = document.querySelector('input[name="cep"]').value;
      const logradouro = document.querySelector('input[name="rua"]').value;
      const complemento = document.querySelector('input[placeholder="Complemento"]').value;
      const numeroCasa = document.querySelector('input[placeholder="Número"]').value;
      const bairro = document.querySelector('input[name="bairro"]').value;
      const localidade = document.querySelector('input[name="cidade"]').value;
      const estado = document.querySelector('input[name="estado"]').value;
  
      // Verificar se as senhas coincidem
      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
  
      // Objeto com os dados do usuário para enviar
      const userData = {
        username,
        nome,
        sobrenome,
        email,
        dataNascimento,
        senha,
        genero,
        telefone,
        rg,
        cpf,      
        imagemPerfil,
        endereco: {
          cep,
          logradouro,
          complemento,
          numeroCasa,
          bairro,
          localidade,
          estado
        }
      };
  
      // Enviar os dados para a API usando o axios
      axios.post('https://localhost:7291/api/Usuario', userData)
        .then(response => {
          console.log('Usuário cadastrado com sucesso:', response.data);
          alert('Cadastro realizado com sucesso!');
          // Redirecionar para a página de login ou para a área restrita
          window.location.href = '/login.html';
        })
        .catch(error => {
          console.error('Erro ao cadastrar o usuário:', error);
          alert('Ocorreu um erro ao cadastrar o usuário. Tente novamente.');
        });
    });
});
