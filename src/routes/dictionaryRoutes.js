const express = require("express"); 
const dictionaryController = require("../controllers/dictionaryController");
const router = express.Router();

// Rota GET para listar palavras
router.get("/entries", dictionaryController.getEntries);

// Rota GET para buscar uma palavra específica
router.get("/entries/:word", dictionaryController.getWord);

// Rota POST para adicionar aos favoritos
router.post("/entries/:word/favorite", dictionaryController.addFavorite);

// Rota DELETE para remover dos favoritos
router.delete("/entries/:word/unfavorite", dictionaryController.removeFavorite);

module.exports = router;
