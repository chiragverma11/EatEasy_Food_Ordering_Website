const express = require("express");
const router = express.Router();

//Middleware Import
const { checkUser } = require("../middlewares/AuthMiddleware");
const { getIndex } = require("../controllers/indexController");

//Checking user on every route
router.use("*", checkUser);

//Home Get Route
router.get("/", getIndex);

//Router Export
module.exports = router;
