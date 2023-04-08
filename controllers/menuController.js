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

/*
  -----------------------------------------------
  Search Get Route
  -----------------------------------------------
*/
module.exports.getSearch = async (req, res) => {
  // Storing values from queries to variables
  const name = req.query.name;

  //Checking if name has value
  //Guard Clause
  if (!name) {
    let myCss = [];
    myCss.push({
      uri: "/css/search.css",
    });

    //To find cart count
    const user = res.locals.user;
    const cart = await Cart.findOne({ userId: user._id });

    //Fetching Menu Items from Database
    // const items = await Item.find({});

    return res.render("search", {
      title: "Search - EatEasy",
      styles: myCss,
      cart: cart,
    });
  }

  //Executes If above condition is not True
  const query = {};

  //Defining value to query object
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  //Fetching Menu Items from Database
  const items = await Item.find(query);

  res.json({ items });
};
