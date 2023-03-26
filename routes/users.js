const express = require("express");
const router = express.Router();

//UserController
const {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
} = require("../controllers/userController");

//Authentication Middleware
const { isLogged } = require("../middlewares/AuthMiddleware");

// Login Get Route
router.get("/login", isLogged, getLogin);

// Login Post Route
router.post("/login", postLogin);

// Register Get Route
router.get("/register", isLogged, getRegister);

// Register Post Route
router.post("/register", postRegister);

// Logout Route
router.get("/logout", getLogout);

//Router Export
module.exports = router;
