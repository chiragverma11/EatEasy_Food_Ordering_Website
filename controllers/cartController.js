const Item = require("../models/menu");
const Cart = require("../models/cart");

/*
  ///////////////////////////////////////////////

  Controller Functions
 
  ///////////////////////////////////////////////
*/

/*
  -----------------------------------------------
  Cart Get
  -----------------------------------------------
*/
module.exports.getCart = async (req, res) => {
  //Css Path
  let myCss = [];
  myCss.push({
    uri: "/css/cart.css",
  });

  //To find cart count
  const user = res.locals.user;
  const cart = await Cart.findOne({ userId: user._id });

  //Fetching Menu Items from Database
  const items = await Item.find({});

  res.render("cart", {
    title: "EatEasy",
    styles: myCss,
    items: items,
    cart: cart,
  });
};

//Cart Count
module.exports.getCount = async (req, res) => {
  //To find cart count
  const user = res.locals.user;
  const cart = await Cart.findOne({ userId: user._id });

  res.send(cart);
};

/*
  -----------------------------------------------
  Cart Post
  -----------------------------------------------
*/
module.exports.postCart = async (req, res) => {
  const itemId = req.params.id;
  const user = res.locals.user;
  //Checking if user has cart
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    const cartNew = new Cart({
      userId: user._id,
      items: { itemId: itemId, qty: 1 },
    });
    await cartNew.save();
    return res.redirect("/menu");
  }

  //Checking if item Already in Cart for particular User
  const isExist = await Cart.findOne({
    userId: user._id,
    "items.itemId": itemId,
  });
  if (isExist) {
    return res.redirect("/menu");
  }
  //Saving the item to cart for particular user
  cart.items.push({ itemId: itemId, qty: 1 });
  await cart.save();
  return res.redirect("/menu");
};

/*
  -----------------------------------------------
  Cart Patch
  -----------------------------------------------
*/
module.exports.patchCart = async (req, res) => {
  const id = +req.params.id;
  const user = res.locals.user;
  const newQty = req.body.qty;

  //Using Index and Save to update quantity

  // const cart = await Cart.findOne({ userId: user._id });
  // cart.items[index].qty = newQty;
  // await cart.save();

  //Using findOneAndUpdate with item id

  await Cart.findOneAndUpdate(
    { userId: user._id, "items.itemId": id },
    { $set: { "items.$.qty": newQty } }
  );

  // res.redirect("/cart");
  res.send("Item Updated");
};

/*
  -----------------------------------------------
  Cart Delete
  -----------------------------------------------
*/
module.exports.deleteCart = async (req, res) => {
  const id = +req.params.id;
  const user = res.locals.user;
  await Cart.findOneAndUpdate(
    { userId: user._id },
    { $pull: { items: { itemId: id } } }
  );
  res.redirect("/cart");
};

/*
  -----------------------------------------------
  Delete / Clear Complete Cart
  -----------------------------------------------
*/

//this will always be use when an order is placed
module.exports.clearCart = async (req, res) => {
  const user = res.locals.user;
  await Cart.deleteOne({ userId: user._id });
  res.send("Cart Cleared");
};
