const express = require("express");
const router = express.Router();
const entriesController = require("../controllers/entriesController");

// Rota para buscar palavras
router.get("/api/entries/en", entriesController.searchWord);

module.exports = router;
