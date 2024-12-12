const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Função para obter as informações do usuário autenticado
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar informações do usuário" });
  }
};

// Função para atualizar os dados do usuário autenticado
const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user.id);

    if (username) user.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.send("Usuário atualizado com sucesso");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar informações do usuário" });
  }
};

// Função para adicionar uma palavra ao histórico do usuário
const addWordToHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { word } = req.body;

    if (!user.history.includes(word)) {
      user.history.push(word);
      await user.save();
      res.status(201).json({ message: "Palavra adicionada ao histórico" });
    } else {
      res.status(400).json({ message: "Palavra já existe no histórico" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar palavra ao histórico" });
  }
};

// Função para obter o histórico de palavras do usuário
const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.history);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar histórico de palavras" });
  }
};

// Função para adicionar uma palavra aos favoritos do usuário
const addWordToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { word } = req.body;

    if (!user.favorites.includes(word)) {
      user.favorites.push(word);
      await user.save();
      res.status(201).json({ message: "Palavra adicionada aos favoritos" });
    } else {
      res.status(400).json({ message: "Palavra já está nos favoritos" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao adicionar palavra aos favoritos" });
  }
};

// Função para obter as palavras favoritas do usuário
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar palavras favoritas" });
  }
};

// Função para remover uma palavra dos favoritos do usuário
const removeWordFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { word } = req.params;

    const wordIndex = user.favorites.indexOf(word);
    if (wordIndex !== -1) {
      user.favorites.splice(wordIndex, 1);
      await user.save();
      res.status(200).json({ message: "Palavra removida dos favoritos" });
    } else {
      res.status(404).json({ message: "Palavra não encontrada nos favoritos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover palavra dos favoritos" });
  }
};

module.exports = {
  getUserInfo,
  updateUser,
  addWordToHistory,
  getHistory,
  addWordToFavorites,
  getFavorites,
  removeWordFromFavorites,
};
