const express = require('express');
const {
  searchWords,
  addWordToHistory,
  addWordToFavorites,
  removeWordFromFavorites,
  getWord,
} = require('../controllers/wordController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Rota para buscar palavras com suporte a busca, paginação
router.get('/en', searchWords);

// Rota para obter uma palavra específica
router.get('/en/:word', getWord);

// Rota para adicionar uma palavra ao histórico do usuário
router.post('/history/add', authenticateToken, addWordToHistory);

// Rota para adicionar uma palavra aos favoritos do usuário
router.post('/favorites/add', authenticateToken, addWordToFavorites);

// Rota para remover uma palavra dos favoritos do usuário
router.delete('/en/:word/unfavorite', authenticateToken, removeWordFromFavorites);

module.exports = router;
