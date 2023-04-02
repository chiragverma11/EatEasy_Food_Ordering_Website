const Item = require("../models/menu");
const Cart = require("../models/cart");

/*
  ///////////////////////////////////////////////

  Controller Functions
 
  ///////////////////////////////////////////////
*/

/*
  -----------------------------------------------
  Menu Get Route
  -----------------------------------------------
*/
module.exports.getMenu = async (req, res) => {
  //Css Path
  let myCss = [];
  myCss.push({
    uri: "/css/menu.css",
  });

  //To find cart count
  const user = res.locals.user;
  const cart = await Cart.findOne({ userId: user._id });

  //Fetching Menu Items from Database
  const items = await Item.find({});

  res.render("menu", {
    title: "EatEasy",
    styles: myCss,
    items: items,
    cart: cart,
  });
};

// //Menu Post Route
// module.exports.postMenu = (req, res) => {
//   const { name, price, image, category } = req.body;
//   const item = new Item({
//     name,
//     price,
//     image,
//     category,
//   });
//   item.save().then(() => {
//     res.send("Item Saved to Database");
//   });
// };
