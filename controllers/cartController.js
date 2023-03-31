const Item = require("../models/menu");
const Cart = require("../models/cart");

//Controller Functions

//Cart Get
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
  // console.log(
  //   items.findIndex((item) => {
  //     return item.itemId == "5";
  //   })
  // );

  res.render("cart", {
    title: "EatEasy",
    styles: myCss,
    items: items,
    cart: cart,
  });
};

//Cart Post
module.exports.postCart = async (req, res) => {
  const { userId, itemId } = req.body;
  const cartItems = await Cart.findOne({ userId: userId });
  if (!cartItems) {
    const cart = new Cart({
      userId: userId,
      items: { itemId: itemId, qty: 1 },
    });
    await cart.save();
    // console.log("Added to Cart");
    return res.redirect("/menu");
  }

  //   const isExist = await Cart.findOne({
  //     items: { $elemMatch: { itemId: itemId } },
  //   });

  const isExist = await Cart.findOne({
    "items.itemId": itemId,
  });
  if (isExist) {
    return res.redirect("/menu");
  }
  cartItems.items.push({ itemId: itemId, qty: 1 });
  await cartItems.save();
  return res.redirect("/menu");
};
