const connection = require("../config/database");

const User = {
  create: (name, email, password, callback) => {
    let query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    connection.query(query, [name, email, password], callback);
  },
  findByEmail: (email, callback) => {
    let query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], callback);
  },
  findHistory: (userId, callback) => {
    let query = "SELECT * FROM history WHERE user_id = ?";
    connection.query(query, [userId], callback);
  },
  findFavorites: (userId, callback) => {
    let query = "SELECT * FROM favorites WHERE user_id = ?";
    connection.query(query, [userId], callback);
  },
};

module.exports = User;
