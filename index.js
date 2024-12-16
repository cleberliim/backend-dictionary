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
app.use(bodyParser.json());

// Carregar a documentação Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

// Rota para a documentação interativa
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir rotas
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/entries", wordRoutes);

// Rota principal
app.get("/api/", (req, res) => {
  res.json({
    message: "Fullstack Challenge 🏅 - Dictionary",
  });
});

// Inicializar o servidor apenas se não estiver em modo de teste
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exportar o aplicativo para os testes
module.exports = app;
