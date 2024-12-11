// Simulando uma base de dados de usuários (exemplo simples)
const users = [];

exports.createUser = (req, res) => {
  const { username, password } = req.body;
  
  // Simples validação para verificar se o nome de usuário já existe
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Usuário já existe!" });
  }
  
  // Criando o novo usuário
  const newUser = { username, password };
  users.push(newUser);
  
  return res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
};

exports.getUsers = (req, res) => {
  return res.status(200).json({ users });
};

exports.getUserByUsername = (req, res) => {
  const { username } = req.params;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }
  
  return res.status(200).json(user);
};
