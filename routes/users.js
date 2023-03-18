const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/login.css",
  });
  res.render("login", { title: "Login", styles: myCss });
});

router.get("/register", (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/register.css",
  });
  res.render("register", { title: "Register", styles: myCss });
});

module.exports = router;
