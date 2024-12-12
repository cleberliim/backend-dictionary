# Dictionary API
 This is a challenge by [Coodesh](https://coodesh.com/)
## Descrição

Uma API desenvolvida em Node.js que permite o gerenciamento de palavras, com funcionalidades de autenticação via JWT, persistência de dados no MongoDB e caching para otimizar buscas. O sistema possibilita que os usuários busquem palavras, armazenem favoritos, visualizem históricos e obtenham respostas rápidas através de uma implementação de cache no MongoDB.

## Tecnologias Utilizadas

- **Linguagens**: JavaScript (Node.js)
- **Framework**: Express.js
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT (JSON Web Tokens)
- **Cache**: MongoDB com TTL (Time to Live)
- **Swagger**: Documentação interativa de API
 

### Principais Dependências:

- `express`: Framework web para Node.js.
- `jsonwebtoken`: Para gerar e verificar JWT.
- `bcryptjs`: Para criptografar senhas.
- `mongoose`: ODM (Object Data Modeling) para MongoDB.
- `dotenv`: Para carregar variáveis de ambiente.
- `body-parser`: Middleware para parsear o corpo da requisição.
- `jest`: Framework de testes.
- `swagger-ui-express`: Para disponibilizar a documentação interativa da API.

## Funcionalidades Principais

- **Autenticação de Usuários**: Protege as rotas com autenticação JWT.
- **Gerenciamento de Palavras**: Permite buscar palavras, salvar em favoritos e consultar histórico.
- **Cache Inteligente**: Utiliza MongoDB com TTL para armazenar e expirar resultados de busca, acelerando as respostas.
- **Documentação Interativa**: O Swagger exibe todas as rotas disponíveis para uso e teste.

## Como Instalar e Usar

### Passos para Instalar o Projeto

1. **Scrip para baixar as palavras e inserir no MongoDb**

- Clonar o Repositório\*\* https://github.com/cleberliim/ScriptDictDownload

2. **Instalar as Dependências**

   - Execute o seguinte comando para instalar todas as dependências necessárias:
     ```bash
     npm install
     ```
   - **OBS:** Dentro do arquivo `importWords.js`, altere o trecho:
     ```javascript
     const filePath = "./words_dictionary.json"; // Caminho do arquivo local
     const mongoUri = "mongodb://localhost:27017"; // URI do MongoDB local
     const dbName = "dictionary-api"; // Nome do banco de dados
     const collectionName = "words"; // Nome da coleção
     ```
   - agora rode
     ```bash
     npm start
     ```

   ```

   ```

3. **Configuração do MongoDB**

   - Certifique-se de que o MongoDB esteja em execução ou configure um banco de dados na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4. **Clonar o Repositório**

   - Abra o terminal e execute:
     ```bash
     git clone https://github.com/cleberliim/backend-dictionary
     cd nome-do-repositorio
     ```

5. **Instalar as Dependências**

   - Execute o seguinte comando para instalar todas as dependências necessárias:
     ```bash
     npm install
     ```

6. **Rodar o Projeto**
   - Para iniciar o servidor, execute:
     ```bash
     npm start
     ```
   - O servidor estará rodando na porta `3000` por padrão.

### Documentação com Swagger

Acesse a documentação interativa da API através do Swagger em:

```
http://localhost:3000/api-docs
```

O Swagger apresenta todas as rotas disponíveis, seus métodos e exemplos de requisição.

### Testar o Cache

#### Exemplo de Requisição para Buscar uma Palavra

- **Endpoint**:

  ```bash
  GET /api/entries/en?word=exemplo
  Authorization: Bearer <seu_token_jwt>
  ```

- **Resposta (se palavra estiver no cache)**:

  ```json
  {
    "fromCache": true,
    "word": {
      "word": "exemplo",
      "definition": "Exemplo de definição"
    }
  }
  ```

- **Resposta (se palavra não estiver no cache)**:

  ```json
  {
    "fromCache": false,
    "word": {
      "word": "exemplo",
      "definition": "Exemplo de definição"
    }
  }
  ```

- **Resposta de erro (se palavra não for encontrada)**:
  ```json
  {
    "message": "Palavra não encontrada"
  }
  ```

## .gitignore

O projeto já inclui um arquivo `.gitignore` básico que ignora arquivos como:

- `node_modules/`
- `.env`
- `logs/`

## Estrutura de Arquivos

```
/
├── models/
│   ├── Word.js       # Modelo para palavras
│   ├── Cache.js      # Modelo para cache
├── routes/
│   ├── entries.js    # Rotas de palavras
├── controllers/
│   ├── entriesController.js # Lógica das rotas de palavras
├── middleware/
│   ├── auth.js       # Middleware de autenticação JWT
├── app.js            # Configuração principal do servidor
├── swagger.json      # Configuração do Swagger
└── .env              # Configuração das variáveis de ambiente
```

## Finalização

Este projeto implementa caching eficiente para acelerar as buscas e proporciona uma experiência robusta para gerenciamento de palavras. Ele também inclui documentação interativa via Swagger para facilitar o uso.

## Link da api para uso em tempo real:

This is a challenge by [Coodesh](https://coodesh.com/)
