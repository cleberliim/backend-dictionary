const db = require('../config/db');

class Favorite {
  static add(userId, word) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO favorites (user_id, word) VALUES (?, ?)', [userId, word], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static remove(userId, word) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM favorites WHERE user_id = ? AND word = ?', [userId, word], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getAll(userId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM favorites WHERE user_id = ?', [userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Favorite;
