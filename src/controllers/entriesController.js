const wordsApiService = require("../services/wordsApiService");
const cacheService = require("../services/cacheService");
const Word = require("../models/Word");
const History = require("../models/History");

const entriesController = {
  // Função para obter detalhes de uma palavra
  async getWordDetails(req, res) {
    const { word } = req.params; // Extrai a palavra da URL

    // Verifica se o parâmetro 'word' foi passado
    if (!word) {
      return res.status(400).json({ message: "Palavra não fornecida" });
    }

    try {
      // Tentativa de pegar do cache
      const cachedData = await cacheService.getFromCache(word);
      if (cachedData) {
        return res.json(cachedData);
      }

      // Caso não tenha no cache, busca na API externa
      const wordDetails = await wordsApiService.getWordDetails(word);

      // Verifica se obteve a palavra na API
      if (!wordDetails) {
        return res
          .status(404)
          .json({ message: "Palavra não encontrada na API" });
      }

      // Salva no cache
      await cacheService.saveToCache(word, wordDetails);

      // Cria um registro de histórico
      await createWordHistory(word);

      return res.json(wordDetails);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          message: "Erro ao obter detalhes da palavra",
          error: error.message,
        });
    }
  },

  // Função para obter o histórico de palavras
  async getHistory(req, res) {
    try {
      const history = await History.findAll();
      return res.json(history);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao obter histórico", error: error.message });
    }
  },
};

// Função auxiliar para criar histórico de palavras
async function createWordHistory(word) {
  try {
    await History.create({ word });
  } catch (error) {
    console.error("Erro ao salvar no histórico: ", error.message);
    // Podem ser feitas outras ações aqui, como enviar para uma fila de reprocessamento
  }
}

module.exports = entriesController;
