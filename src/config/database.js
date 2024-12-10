const mysql = require('mysql2/promise');
const config = require('config');

const pool = mysql.createPool({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database'),
});

module.exports = pool;
