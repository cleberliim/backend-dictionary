const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql"); // Importando a instância do Sequelize

const Word = sequelize.define(
  "Word",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "words", // Nome da tabela no banco
    timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  }
);

module.exports = Word;
