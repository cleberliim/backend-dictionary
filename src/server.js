const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para logar a requisição
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Rota simples para verificar se o servidor responde corretamente
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando!" });
});

// Caso você tenha outras rotas, adicione-as aqui
// require("./app")(app);

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  if (!res.headersSent) {
    console.error("Erro ocorrido:", err);
    res.status(500).json({ error: "Erro no servidor" });
  } else {
    next(err);
  }
});

// Inicia o servidor na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
