const express = require("express");
const router = express.Router();

//indexController
const { getMenu, getSearch } = require("../controllers/menuController");

//Middleware Import
const { isAuthenticated } = require("../middlewares/AuthMiddleware");

//Menu Get Route
router.get("/", isAuthenticated, getMenu);

//Menu Get Route
router.get("/search", isAuthenticated, getSearch);

//Router Export
module.exports = router;
