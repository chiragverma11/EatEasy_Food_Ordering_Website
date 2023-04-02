const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//JWT Token Creation
const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

/*
  ///////////////////////////////////////////////

  Controller Functions
 
  ///////////////////////////////////////////////
*/

/*
  -----------------------------------------------
  Login Get Route
  -----------------------------------------------
*/
module.exports.getLogin = (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/login.css",
  });
  res.render("login", { title: "Login", styles: myCss });
};

/*
  -----------------------------------------------
  Login Post Route
  -----------------------------------------------
*/
module.exports.postLogin = (req, res) => {
  //CSS Path
  let myCss = [];
  myCss.push({
    uri: "/css/login.css",
  });

  // Login Authentication
  const { email, password } = req.body;
  let errors = [];
  if (!email || !password) {
    errors.push({ msg: "Please fill out all required fields" });
  }

  if (errors.length > 0) {
    return res.status(406).render("login", {
      title: "Login",
      styles: myCss,
      errors,
      email,
      password,
    });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      errors.push({ msg: "Email not registered" });
      return res.status(401).render("login", {
        title: "Login",
        styles: myCss,
        errors,
      });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        errors.push({ msg: "Incorrect Password" });
        return res.status(401).render("login", {
          title: "Login",
          styles: myCss,
          errors,
          email,
          password,
        });
      }
      const token = createToken(user._id, user.email);
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      });
      res.redirect("/menu");
    });
  });
};

/*
  -----------------------------------------------
  Register Get Route
  -----------------------------------------------
*/
module.exports.getRegister = (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/register.css",
  });

  res.render("register", { title: "Register", styles: myCss });
};

/*
  -----------------------------------------------
  Register Post Route
  -----------------------------------------------
*/
module.exports.postRegister = (req, res) => {
  //CSS Path
  let myCss = [];
  myCss.push({
    uri: "/css/register.css",
  });

  // Register Authentication
  const { name, email, password } = req.body;
  let errors = [];
  if (!name || !email || !password) {
    errors.push({ msg: "Please fill out all required fields" });
  }

  if (password) {
    if (password.length < 3) {
      errors.push({ msg: "Password must be atleast 3 characters" });
    }
  }

  if (errors.length > 0) {
    return res.status(406).render("register", {
      title: "Register",
      styles: myCss,
      errors,
      name,
      email,
      password,
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push({ msg: "Email has already been taken" });
      return res.status(409).render("register", {
        title: "Register",
        styles: myCss,
        errors,
        name,
        email,
        password,
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          // req.flash("success_msg", "You are now registered and can log in");
          res.redirect("/user/login");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

/*
  -----------------------------------------------
  Logouts Get Route
  -----------------------------------------------
*/
module.exports.getLogout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

/*
  -----------------------------------------------
  Update Patch Route
  -----------------------------------------------
*/

module.exports.patchUpdate = async (req, res) => {
  const user = res.locals.user;
  const field = req.params.field;
  const { newValue } = req.body;

  const us = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { [field]: newValue } } //Here to use variable as a field name we have enclosed variable in [ ]
  );
  res.send(`${field} updated`);
};
