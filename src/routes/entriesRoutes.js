const express = require("express");
const entriesController = require("../controllers/entriesController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Rota para criar uma nova palavra
router.post("/words", authMiddleware, entriesController.createWord);

// Rota para buscar uma palavra específica
router.get("/words/:wordId", authMiddleware, entriesController.getWordById);

// Rota para buscar todas as palavras
router.get("/words", authMiddleware, entriesController.getAllWords);

// Rota para salvar uma palavra no histórico
router.post("/history", authMiddleware, entriesController.saveHistory);

// Rota para pegar o histórico de palavras do usuário
router.get("/history", authMiddleware, entriesController.getHistory);

module.exports = router;
