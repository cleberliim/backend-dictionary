const { User, Favorite } = require("../models");

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "createdAt", "updatedAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar perfil do usuário" });
  }
};

const addFavorite = async (req, res) => {
  const { userId, wordId } = req.body;
  try {
    const favorite = await Favorite.create({ userId, wordId });

    return res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao adicionar palavra aos favoritos" });
  }
};

const removeFavorite = async (req, res) => {
  const { userId, wordId } = req.params;
  try {
    const favorite = await Favorite.findOne({ where: { userId, wordId } });
    if (!favorite) {
      return res.status(404).json({ message: "Favorito não encontrado" });
    }

    await favorite.destroy();

    return res.status(200).json({ message: "Favorito removido com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao remover favorito" });
  }
};

module.exports = { getUserProfile, addFavorite, removeFavorite };
