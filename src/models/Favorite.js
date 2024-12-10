const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql"); // Importando a instância do Sequelize
const User = require("./User"); // Importando o modelo User
const Word = require("./Word"); // Importando o modelo Word

const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Referencia o modelo User
        key: "id",
      },
    },
    wordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Word, // Referencia o modelo Word
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
    tableName: "favorites", // Nome da tabela no banco
    timestamps: true,
  }
);

Favorite.belongsTo(User, { foreignKey: "userId" }); // Relacionamento com User
Favorite.belongsTo(Word, { foreignKey: "wordId" }); // Relacionamento com Word

module.exports = Favorite;
