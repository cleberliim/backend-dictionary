const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Importando as rotas
const authRoutes = require("./routes/auth");
const dictionaryRoutes = require("./routes/dictionary");
const userRoutes = require("./routes/user");

// Definindo as rotas
app.use("/auth", authRoutes);
app.use("/dictionary", dictionaryRoutes);
app.use("/user", userRoutes);

module.exports = app;
