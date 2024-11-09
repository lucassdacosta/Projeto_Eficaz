const login = () => {
    const usernameOrEmail = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;
  
    axios.post('https://localhost:7291/api/Auth/login', {
      UsernameOrEmail: usernameOrEmail,
      Senha: senha
    })
    .then(response => {
      const token = response.data;  // O token JWT vem na resposta
      // Armazenar o token no localStorage
      localStorage.setItem('authToken', token);
      console.log('Login bem-sucedido, token armazenado!');
      // Redireciona para a página principal ou para o dashboard
      window.location.href = '/index.html'; // ou o local da sua página protegida
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
    });
  };
  
  // Adiciona o evento ao botão de login
  document.getElementById('loginButton').addEventListener('click', login);
// Função para pegar os dados do usuário
const getUsuario = () => {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      axios.get('https://localhost:7291/api/Usuario', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log('Dados do usuário:', response.data);
      })
      .catch(error => {
        console.error('Erro ao acessar os dados do usuário:', error);
      });
    } else {
      console.log('Token não encontrado. Faça login primeiro.');
    }
  };
  
  // Chama a função quando necessário
  getUsuario();
    