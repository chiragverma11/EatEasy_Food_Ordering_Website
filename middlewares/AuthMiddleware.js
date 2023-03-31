const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/user/login");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.redirect("/user/login");
    }
    next();
  });
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.locals.user = null;
    return next();
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      res.locals.user = null;
      return next();
    }
    User.findById(decoded.id).then((user) => {
      if (!user) {
        res.locals.user = null;
        return next();
      }
      res.locals.user = user;
      res.user = user; //To pass user to next middleware
      next();
    });
  });
};

module.exports.isLogged = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return next();
    }

    res.redirect("/menu");
  });
};
