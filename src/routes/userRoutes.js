const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateFavorite = require("../middlewares/validateFavorite"); // Importa a validação de favoritos
const validateRequest = require("../middlewares/validateRequest"); // Middleware para validar a requisição
const router = express.Router();

// Rota para obter os dados do perfil do usuário
router.get("/profile", authMiddleware, userController.getProfile);

// Rota para adicionar uma palavra aos favoritos com validação
router.post(
  "/favorites",
  authMiddleware,
  validateFavorite, // Valida os dados antes de adicionar o favorito
  validateRequest, // Trata os erros de validação, se houver
  userController.addFavorite
);

// Rota para remover uma palavra dos favoritos
router.delete(
  "/favorites/:wordId",
  authMiddleware,
  userController.removeFavorite
);

// Rota para pegar todos os favoritos do usuário
router.get("/favorites", authMiddleware, userController.getFavorites);

module.exports = router;
