const express = require("express");
const router = express.Router();
const { isAuthenticated, checkUser } = require("../middlewares/AuthMiddleware");

router.get("*", checkUser);

router.get("/", (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/index.css",
  });
  res.render("index", { title: "EatEasy", styles: myCss });
});

router.get("/menu", isAuthenticated, (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/menu.css",
  });
  res.render("menu", { title: "EatEasy", styles: myCss });
});

module.exports = router;
