const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Rota para registro de novos usuários
router.post("/signup", authController.register);

// Rota para login de usuários
router.post("/signin", authController.login);

module.exports = router;
