const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/signup', authController.signup);

// Rota para fazer login e gerar o token
router.post('/signin', authController.signin);

module.exports = router;
