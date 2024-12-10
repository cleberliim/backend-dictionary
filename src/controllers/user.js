const User = require("../models/User");

exports.getProfile = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) return res.status(500).json({ message: "Error fetching user" });

    res.status(200).json(user);
  });
};

exports.getHistory = (req, res) => {
  User.findHistory(req.user.id, (err, history) => {
    if (err) return res.status(500).json({ message: "Error fetching history" });

    res.status(200).json({ results: history, totalDocs: history.length });
  });
};

exports.getFavorites = (req, res) => {
  User.findFavorites(req.user.id, (err, favorites) => {
    if (err)
      return res.status(500).json({ message: "Error fetching favorites" });

    res.status(200).json({ results: favorites, totalDocs: favorites.length });
  });
};
