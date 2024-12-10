const { Sequelize } = require("sequelize");
const { DB_URL } = require("./config"); // Importando DB_URL de config.js

// Criando uma instância do Sequelize com a URL do banco de dados
const sequelize = new Sequelize(DB_URL, {
  dialect: "mysql", // Usando MySQL como o banco de dados
  logging: false, // Opcional: Desativa logs de SQL no console
});

module.exports = sequelize; // Exportando a instância do Sequelize
