const express = require("express");
const router = express.Router();

//Order Controller
const { postOrder, getOrderPlaced } = require("../controllers/orderController");

//Middleware Import
const { isAuthenticated } = require("../middlewares/AuthMiddleware");

//Order Get Route
router.get("/");

//Order Post Route
router.post("/new", isAuthenticated, postOrder);

// //Order Placed Get Route
// router.get("/placed/:id", isAuthenticated, getOrderPlaced);

//Router Export
module.exports = router;
