const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/index.css",
  });
  res.render("index", { title: "EatEasy", styles: myCss });
});

module.exports = router;
