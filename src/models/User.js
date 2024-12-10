const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql"); // Importando a instância do Sequelize

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "users", // Nome da tabela no banco
    timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  }
);

module.exports = User;
