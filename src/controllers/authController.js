const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authController = {
  async signup(req, res) {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  },

  async signin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  },
};

module.exports = authController;
