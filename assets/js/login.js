const login = () => {
    const usernameOrEmail = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;
  
    axios.post('https://localhost:7291/api/Auth/login', {
      UsernameOrEmail: usernameOrEmail,
      Senha: senha
    })
    .then(response => {
      const token = response.data;  
      localStorage.setItem('authToken', token);
      console.log('Login bem-sucedido, token armazenado!');
      
      window.location.href = '/index.html';
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
      alert("Usuario ou senha incorretos")
    });
  };

  document.getElementById('loginButton').addEventListener('click', login);

const getUsuario = () => {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      axios.get('https://localhost:7291/api/Usuario', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log('Dados do usuário:', response.data);
        window.location.href = '/index.html';
      })
      .catch(error => {
        console.error('Erro ao acessar os dados do usuário:', error);
      });
    } else {
      console.log('Token não encontrado. Faça login primeiro.');
    }
  };

  getUsuario();
    