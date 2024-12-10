const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Rota para registro de novos usuários
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
