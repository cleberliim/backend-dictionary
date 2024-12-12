// Função para paginar a lista de palavras
const paginate = (model, searchQuery, limit, page) => {
    return model
      .find({ word: new RegExp(searchQuery, 'i') })
      .limit(limit)
      .skip((page - 1) * limit);
  };
  
  module.exports = { paginate };
  