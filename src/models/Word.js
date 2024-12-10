const connection = require("../config/database");

const Word = {
  findAll: (search, limit, offset, callback) => {
    let query = "SELECT * FROM words WHERE word LIKE ? LIMIT ? OFFSET ?";
    connection.query(query, [`%${search}%`, limit, offset], callback);
  },
  findByName: (name, callback) => {
    let query = "SELECT * FROM words WHERE word = ?";
    connection.query(query, [name], callback);
  },
};

module.exports = Word;
