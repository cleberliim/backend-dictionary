const express = require("express");
const {
  getUserInfo,
  updateUser,
  addWordToHistory,
  getHistory,
  addWordToFavorites,
  getFavorites,
  removeWordFromFavorites,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Rota para obter informações do usuário autenticado
router.get("/me", authenticateToken, getUserInfo);

// Rota para atualizar os dados do usuário autenticado
router.put("/update", authenticateToken, updateUser);

// Rota para adicionar uma palavra ao histórico do usuário
router.post("/history/add", authenticateToken, addWordToHistory);

// Rota para obter o histórico de palavras do usuário
router.get("/history", authenticateToken, getHistory);

// Rota para adicionar uma palavra aos favoritos do usuário
router.post("/favorites/add", authenticateToken, addWordToFavorites);

// Rota para obter as palavras favoritas do usuário
router.get("/me/favorites", authenticateToken, getFavorites);

// Rota para remover uma palavra dos favoritos do usuário
router.delete(
  "/favorites/:word/unfavorite",
  authenticateToken,
  removeWordFromFavorites
);

module.exports = router;
