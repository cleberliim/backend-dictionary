const Word = require('../models/Word');
const User = require('../models/User');

// Função para pesquisar palavras com suporte a paginação
const searchWords = async (req, res) => {
  const { search, limit = 10, page = 1 } = req.query;

  try {
    // Realiza a busca com o regex
    const regex = new RegExp(search, 'i');

    // Contabiliza o total de documentos que atendem à pesquisa
    const totalDocs = await Word.countDocuments({ word: { $regex: regex } });

    // Realiza a busca com paginação
    const words = await Word.find({ word: { $regex: regex } })
      .limit(parseInt(limit)) // Limita o número de resultados por página
      .skip((parseInt(page) - 1) * parseInt(limit)); // Pula os documentos já retornados em páginas anteriores

    // Calcula o total de páginas
    const totalPages = Math.ceil(totalDocs / limit);

    // Verifica se há páginas seguintes ou anteriores
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    // Retorna o formato desejado com resultados, total de documentos e informações de paginação
    res.json({
      results: words.map(word => word.word),  // Retorna somente as palavras
      totalDocs,  // Total de documentos que atendem à pesquisa
      page: parseInt(page),  // Página atual
      totalPages,  // Total de páginas
      hasNext,  // Se há página seguinte
      hasPrev   // Se há página anterior
    });
  } catch (err) {
    res.status(500).send('Erro ao buscar palavras');
  }
};

// Função para adicionar palavras ao histórico do usuário
const addWordToHistory = async (req, res) => {
  const { word } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send('Usuário não encontrado');

  user.history.push(word);
  await user.save();
  res.status(200).send('Palavra adicionada ao histórico');
};

// Função para adicionar palavra aos favoritos
const addWordToFavorites = async (req, res) => {
  const { word } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send('Usuário não encontrado');

  if (!user.favorites.includes(word)) {
    user.favorites.push(word);
    await user.save();
    res.status(200).send('Palavra adicionada aos favoritos');
  } else {
    res.status(400).send('Palavra já está nos favoritos');
  }
};

// Função para remover palavra dos favoritos
const removeWordFromFavorites = async (req, res) => {
  const { word } = req.params;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send('Usuário não encontrado');

  user.favorites = user.favorites.filter((fav) => fav !== word);
  await user.save();
  res.status(200).send('Palavra removida dos favoritos');
};

// Função para retornar uma palavra específica
const getWord = async (req, res) => {
  const { word } = req.params;
  try {
    const wordData = await Word.findOne({ word });
    if (!wordData) return res.status(404).send('Palavra não encontrada');

    res.json(wordData);
  } catch (err) {
    res.status(500).send('Erro ao buscar palavra');
  }
};

module.exports = {
  searchWords,
  addWordToHistory,
  addWordToFavorites,
  removeWordFromFavorites,
  getWord,
};
