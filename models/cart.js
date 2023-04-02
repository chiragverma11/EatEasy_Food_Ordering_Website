const mongoose = require("mongoose");

//Schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      itemId: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
});

//Creating Model
const Cart = new mongoose.model("cart", cartSchema);

//Model Exports
module.exports = Cart;
