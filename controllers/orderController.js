const Item = require("../models/menu");
const Cart = require("../models/cart");
const Order = require("../models/order");

/*
  ///////////////////////////////////////////////

  Controller Functions
 
  ///////////////////////////////////////////////
*/

/*
  -----------------------------------------------
  Order Place Post
  -----------------------------------------------
*/

module.exports.postOrder = async (req, res) => {
  const user = res.locals.user;
  const { items, bill } = req.body;
  const order = new Order({
    userId: user._id,
    items: items,
    bill: bill,
    address: user.address,
  });
  //   console.log(order);
  const placed = await order.save();
  res.send(placed);
};

/*
  -----------------------------------------------
  Order Placed Get
  -----------------------------------------------
*/

module.exports.getOrderPlaced = async (req, res) => {
  const orderId = req.params.id;
  res.send("Order Placed");
};
