// src/controllers/dictionaryController.js
const db = require("../config/db"); // Conexão com o banco de dados

// Função para remover palavra dos favoritos
exports.removeFavorite = async (req, res) => {
  const { word } = req.params; // A palavra é passada como parâmetro

  try {
    // Verifique se a palavra está nos favoritos
    const [existing] = await db.execute(
      "SELECT * FROM favorites WHERE word = ?",
      [word]
    );

    if (existing.length === 0) {
      return res
        .status(404)
        .json({ message: "A palavra não está nos favoritos." });
    }

    // Remove a palavra dos favoritos
    await db.execute("DELETE FROM favorites WHERE word = ?", [word]);

    res
      .status(200)
      .json({ message: `A palavra "${word}" foi removida dos favoritos.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover a palavra dos favoritos." });
  }
};

// Função para buscar todas as palavras que correspondem ao termo de busca
exports.getEntries = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM dictionary"); // Certifique-se de usar o formato correto para consultas
    if (!Array.isArray(rows)) {
      throw new Error("Unexpected response from the database");
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dictionary entries" });
  }
};
// Função para buscar uma palavra específica
exports.getWord = async (req, res) => {
  const { word } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM dictionary WHERE word = ?", [
      word,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Word not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the word" });
  }
};

// Função para adicionar palavra aos favoritos
exports.addFavorite = async (req, res) => {
  const { word } = req.params; // A palavra é passada como parâmetro

  try {
    // Verifique se a palavra já está nos favoritos
    const [existing] = await db.execute(
      "SELECT * FROM favorites WHERE word = ?",
      [word]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "A palavra já está nos favoritos." });
    }

    // Adiciona a palavra aos favoritos
    await db.execute("INSERT INTO favorites (word) VALUES (?)", [word]);

    res
      .status(200)
      .json({ message: `A palavra "${word}" foi adicionada aos favoritos.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar palavra aos favoritos." });
  }
};
