const wordsApiService = require("../services/wordsApiService");
const cacheService = require("../services/cacheService");
const Word = require("../models/Word");
const History = require("../models/History");

const entriesController = {
  async getWordDetails(req, res) {
    const { word } = req.params;

    try {
      // Tentativa de pegar do cache
      const cachedData = await cacheService.getFromCache(word);
      if (cachedData) {
        return res.json(cachedData);
      }

      // Caso não tenha no cache, busca na API externa
      const wordDetails = await wordsApiService.getWordDetails(word);

      // Salva no cache
      await cacheService.saveToCache(word, wordDetails);

      // Cria um registro de histórico
      await History.create({ word });

      return res.json(wordDetails);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao obter detalhes da palavra" });
    }
  },

  async getHistory(req, res) {
    try {
      const history = await History.findAll();
      return res.json(history);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter histórico" });
    }
  },
};

module.exports = entriesController;
