class Dictionary {
    static search(query, limit = 10, offset = 0) {
      // Simulando uma busca no dicionário
      const words = [
        "fire", "firefly", "fireplace", "fireman", "water", "earth", "air", "sun", "moon", "star"
      ];
      const filteredWords = words.filter(word => word.includes(query));
      const results = filteredWords.slice(offset, offset + limit);
      return {
        results,
        totalDocs: filteredWords.length,
        page: offset / limit + 1,
        totalPages: Math.ceil(filteredWords.length / limit),
        hasNext: offset + limit < filteredWords.length,
        hasPrev: offset > 0,
      };
    }
  }
  
  module.exports = Dictionary;
  