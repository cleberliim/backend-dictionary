const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const wordRoutes = require("./routes/wordRoutes");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const app = express();
const PORT = 3000;

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); // Middleware para parsear o corpo da requisição

// Carregar a documentação Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

// Rota para a documentação interativa
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir rotas

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/entries", wordRoutes); // Aqui você define a rota base para palavras, por exemplo

// Rota principal
app.get("/api/", (req, res) => {
  res.json({
    message: "Fullstack Challenge 🏅 - Dictionary",
  });
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
