const Cart = require("../models/cart");

/*
  ///////////////////////////////////////////////

  Controller Functions
 
  ///////////////////////////////////////////////
*/

/*
  -----------------------------------------------
  Index Get Route
  -----------------------------------------------
*/
module.exports.getIndex = async (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/index.css",
  });

  //To find cart count
  const user = res.locals.user;
  let cart = null;
  if (user) {
    cart = await Cart.findOne({ userId: user._id });
  }

  res.render("index", { title: "EatEasy", styles: myCss, cart: cart });
};
