const express = require("express");
const router = express.Router();

//Cart Controller
const { getCart, postCart } = require("../controllers/cartController");

//Middleware Import
const { isAuthenticated } = require("../middlewares/AuthMiddleware");

//Cart Get Route
router.get("/", isAuthenticated, getCart);

//Cart Post Route
router.post("/", isAuthenticated, postCart);

module.exports = router;
