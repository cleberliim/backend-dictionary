module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key", // Chave secreta para JWT
  DB_URL: process.env.DB_URL || "mysql://root:@localhost:3306/dictionary", // URL de conexão com o banco de dados MySQL local
  REDIS_HOST: process.env.REDIS_HOST || "localhost", // Configuração do Redis
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};
