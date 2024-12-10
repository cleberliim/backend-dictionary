const express = require("express");
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.get("/me", authMiddleware.verifyToken, userController.getProfile);
router.get(
  "/me/history",
  authMiddleware.verifyToken,
  userController.getHistory
);
router.get(
  "/me/favorites",
  authMiddleware.verifyToken,
  userController.getFavorites
);

module.exports = router;
