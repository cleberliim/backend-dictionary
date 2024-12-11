const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importando rotas
const authRoutes = require("./routes/authRoutes");
const dictionaryRoutes = require("./routes/dictionaryRoutes");
const userRoutes = require("./routes/userRoutes");

// Importando o middleware de autenticação
const authMiddleware = require("./middlewares/authMiddleware");

// Rota de autenticação não deve passar pelo middleware
app.use("/api/auth", authRoutes); // Não use o middleware aqui

// Rotas protegidas por autenticação (não aplicável para login/signup)
app.use("/api/dictionary", authMiddleware, dictionaryRoutes);
app.use("/api/users", authMiddleware, userRoutes);

module.exports = app;
