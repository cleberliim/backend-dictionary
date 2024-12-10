const { body } = require("express-validator");

const validateFavorite = [
  // Valida se o campo 'word' existe e é uma string
  body("word")
    .notEmpty()
    .withMessage("A palavra é obrigatória")
    .isString()
    .withMessage("A palavra deve ser uma string"),

  // Valida se o campo 'userId' existe e é um número
  body("userId")
    .notEmpty()
    .withMessage("O ID do usuário é obrigatório")
    .isInt()
    .withMessage("O ID do usuário deve ser um número válido"),
];

module.exports = validateFavorite;
