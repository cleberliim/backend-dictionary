const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql"); // Importando a instância do Sequelize
const User = require("./User"); // Importando o modelo User

const History = sequelize.define(
  "History",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Referencia o modelo User
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "history", // Nome da tabela no banco
    timestamps: true,
  }
);

History.belongsTo(User, { foreignKey: "userId" }); // Definindo o relacionamento com o User

module.exports = History;
