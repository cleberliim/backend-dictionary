const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
require("dotenv").config();

// Rota para cadastro de usuário
router.post("/signup", authController.signup);

// Rota para login de usuário
router.post('/signin', authController.signin);

module.exports = router;
