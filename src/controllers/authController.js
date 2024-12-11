const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authController = {
  // Função signup como assíncrona
  async signup(req, res) {
    const { name, email, password } = req.body;

    // Log para verificar os dados recebidos
    console.log("Dados recebidos:", { name, email, password });

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido." });
    }

    // Validação de comprimento da senha
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    try {
      // Criptografa a senha de forma assíncrona
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Senha criptografada:", hashedPassword);

      // Cria o usuário com a senha criptografada
      const user = await User.create(name, email, hashedPassword);
      console.log("Usuário criado:", user);

      // Cria o token JWT para o usuário recém-criado
      const token = jwt.sign(
        { id: user.insertId },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      res
        .status(201)
        .json({ id: user.insertId, name, token: `Bearer ${token}` });
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res
        .status(500) // Mudando para código 500, pois é um erro no servidor
        .json({ message: "Erro ao criar o usuário", error: err.message });
    }
  },

  // Função signin como assíncrona
  async signin(req, res) {
    const { email, password } = req.body;

    try {
      // Busca o usuário pelo email
      const user = await User.findByEmail(email);

      // Log para verificar o que foi retornado
      console.log("Dados recebidos:", { email, password });
      console.log("Usuário encontrado:", user);

      // Verifica se o usuário existe
      if (!user) {
        return res.status(400).json({ message: "Email não encontrado" });
      }

      // Verifica se a senha fornecida corresponde à senha criptografada
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      // Log da comparação de senha
      console.log("Senha fornecida:", password);
      console.log("Senha no banco (criptografada):", user.password);
      console.log("Senha correta?", isPasswordCorrect);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Senha incorreta" });
      }

      // Cria o token JWT para o usuário autenticado
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      // Retorna os dados do usuário e o token
      res
        .status(200)
        .json({ id: user.id, name: user.name, token: `Bearer ${token}` });
    } catch (err) {
      console.error("Erro ao autenticar o usuário:", err); // Exibe o erro completo no log
      res
        .status(500)
        .json({ message: "Erro ao autenticar o usuário", error: err.message });
    }
  },
};

module.exports = authController;
