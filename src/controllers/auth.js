const pool = require('../config/database'); // Aqui você deve usar o arquivo que contém a configuração de conexão com o banco de dados

// Função para registrar um novo usuário (signup)
const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Verificando se o usuário já existe
    const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Inserindo o novo usuário no banco de dados
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
};

// Função para login do usuário (signin)
const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Verificando as credenciais no banco de dados
    const [user] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Em um caso real, aqui você geraria um token JWT ou outro mecanismo de autenticação
    return res.status(200).json({ token: 'your-token-here' }); // Simulando um token para exemplo
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred during signin' });
  }
};

module.exports = {
  signup,
  signin
};
