const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    password: hashedPassword,
    history: [],
    favorites: [],
  });

  try {
    await user.save();
    res.status(201).send('Usuário cadastrado com sucesso');
  } catch (err) {
    res.status(400).send('Erro ao cadastrar usuário');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Usuário não encontrado');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Senha inválida');

  const token = jwt.sign({ id: user._id, username: user.username }, 'secretkey');
  res.json({ token });
};

module.exports = { signup, login };
