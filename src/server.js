const app = require("./app");
const config = require("config");

const port = process.env.PORT || config.get("server.port"); // Usa a variável de ambiente PORT, se definida

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Exemplo no arquivo de rotas
app.get("/dictionary/test", (req, res) => {
  res.status(200).json({
    word: "test",
    definition: "A test definition",
  });
});

module.exports = server;
