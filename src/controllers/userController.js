const User = require("../models/User");
const Favorite = require("../models/Favorite");

const userController = {
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter perfil" });
    }
  },

  async addFavorite(req, res) {
    const { word } = req.body;

    try {
      const favorite = await Favorite.create({
        userId: req.user.id,
        word,
      });
      return res.status(201).json(favorite);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao adicionar favorito" });
    }
  },

  async getFavorites(req, res) {
    try {
      const favorites = await Favorite.findAll({
        where: { userId: req.user.id },
      });
      return res.json(favorites);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter favoritos" });
    }
  },
};

module.exports = userController;
