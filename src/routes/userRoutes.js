const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Rota POST para criar um novo usuário
router.post("/", userController.createUser); // Rota para criar um usuário

// Rota GET para listar todos os usuários
router.get("/", userController.getUsers); // Rota para listar usuários

// Rota GET para buscar um usuário específico por nome de usuário
router.get("/:username", userController.getUserByUsername); // Rota para buscar usuário por nome

module.exports = router;
