const { Word, History } = require("../models");
const cacheService = require("../services/cacheService");

const getAllWords = async (req, res) => {
  try {
    const cache = await cacheService.getCache("words");
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const words = await Word.findAll();
    await cacheService.setCache("words", JSON.stringify(words), 3600);

    return res.status(200).json(words);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar palavras" });
  }
};

const getWordHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await History.findAll({ where: { userId } });

    return res.status(200).json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar histórico" });
  }
};

const addWordToHistory = async (req, res) => {
  const { userId, wordId } = req.body;
  try {
    const history = await History.create({ userId, wordId });

    return res.status(201).json(history);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao adicionar palavra ao histórico" });
  }
};

module.exports = { getAllWords, getWordHistory, addWordToHistory };
