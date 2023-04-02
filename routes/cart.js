const express = require("express");
const router = express.Router();

//Cart Controller
const {
  getCart,
  getCount,
  postCart,
  patchCart,
  deleteCart,
  clearCart,
} = require("../controllers/cartController");

//Middleware Import
const { isAuthenticated } = require("../middlewares/AuthMiddleware");

//Cart Get Route
router.get("/", isAuthenticated, getCart);

//Count Get Route
router.get("/count", isAuthenticated, getCount);

//Cart Post Route
router.post("/:id", isAuthenticated, postCart);

//Cart Post Route
router.patch("/:id", isAuthenticated, patchCart);

//Cart Delete Route
router.delete("/:id", isAuthenticated, deleteCart);

//Cart Clear/Delete Route
router.delete("/clear/all", isAuthenticated, clearCart);

//Router Export
module.exports = router;
