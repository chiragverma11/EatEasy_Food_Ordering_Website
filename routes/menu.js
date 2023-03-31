const express = require("express");
const router = express.Router();

//indexController
const { getMenu } = require("../controllers/menuController");

//Middleware Import
const { isAuthenticated } = require("../middlewares/AuthMiddleware");

//Menu Get Route
router.get("/", isAuthenticated, getMenu);

//Router Export
module.exports = router;
