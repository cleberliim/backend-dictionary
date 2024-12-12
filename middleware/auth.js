const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para autenticação de JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).send('Acesso negado');

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};

module.exports = { authenticateToken };
