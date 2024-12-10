const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Importando as rotas
const authRoutes = require("./routes/authRoutes");
const entriesRoutes = require("./routes/entriesRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Configurações do servidor
app.use(cors()); // Para permitir CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Para parsear o corpo da requisição como JSON
app.use(morgan("dev")); // Para logar as requisições (morgan)

app.get("/", (req, res) => {
  res.send("API de Dicionário");
});

// Usando as rotas
app.use("/auth", authRoutes);
app.use("/entries", entriesRoutes);
app.use("/user", userRoutes);

// Exportando o app para ser usado em outros arquivos (como testes)
module.exports = app;
