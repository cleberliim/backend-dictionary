const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  // Verifica se a requisição contém erros de validação
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next(); // Se não houver erros, chama o próximo middleware ou controlador
};

module.exports = validateRequest;
