const jwt = require("jsonwebtoken");
require("dotenv").config();  // Carrega as variáveis de ambiente

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Nenhum token fornecido, autorização negada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Chama o próximo middleware ou a rota
  } catch (err) {
    console.error("Erro ao verificar o token:", err);
    if (!res.headersSent) { // Verifica se a resposta já foi enviada
      return res.status(401).json({ error: err.message || "O token não é válido" });
    } else {
      console.warn("Resposta já enviada. Não enviar novamente.");
    }
  }
};

module.exports = authMiddleware;
