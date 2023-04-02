const express = require("express");
const router = express.Router();

//UserController
const {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  patchUpdate,
} = require("../controllers/userController");

//Authentication Middleware
const {
  isAuthenticated,
  checkUser,
  isLogged,
} = require("../middlewares/AuthMiddleware");

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

//User Details Update Route
router.patch("/u/:field", isAuthenticated, patchUpdate);

//Router Export
module.exports = router;
