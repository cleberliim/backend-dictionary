const axios = require("axios");

const WORDS_API_URL =
  process.env.WORDS_API_URL || "https://api.wordsapi.com/v1/words";

const wordsApiService = {
  async getWordDetails(word) {
    try {
      const response = await axios.get(`${WORDS_API_URL}/${word}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar palavra na API externa:", error);
      throw new Error("Erro ao buscar palavra");
    }
  },
};

module.exports = wordsApiService;
