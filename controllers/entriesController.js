const Word = require("../models/Word"); // Modelo para palavras principais
const Cache = require("../models/Cache"); // Modelo de cache

// Função para buscar palavras
exports.searchWord = async (req, res) => {
  const word = req.query.word;
  console.log(`Buscando palavra: ${word}`);

  try {
    // Verifica se a palavra já está no cache
    const cachedWord = await Cache.findOne({ word });

    if (cachedWord) {
      console.log(`Palavra '${word}' encontrada no cache`);
      // Se encontrar no cache, retorna diretamente
      return res.json({ fromCache: true, word: cachedWord });
    }

    console.log(
      `Palavra '${word}' não encontrada no cache. Buscando no banco de dados...`
    );

    // Se não encontrar no cache, busca no banco de dados principal
    const wordFromDb = await Word.findOne({ word });

    if (!wordFromDb) {
      console.log(`Palavra '${word}' não encontrada no banco de dados`);
      return res.status(404).json({ message: "Palavra não encontrada" });
    }

    console.log(
      `Palavra '${word}' encontrada no banco de dados. Armazenando no cache...`
    );

    // Armazena o resultado no cache
    const newCache = new Cache({
      word: wordFromDb.word,
      definition: wordFromDb.definition,
    });

    await newCache.save();

    console.log(`Palavra '${word}' salva no cache`);

    // Retorna a palavra da base de dados
    return res.json({ fromCache: false, word: wordFromDb });
  } catch (error) {
    console.error("Erro ao buscar palavra:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
