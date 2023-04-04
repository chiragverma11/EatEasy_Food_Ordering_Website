const mongoose = require("mongoose");

//Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      itemServe: {
        type: String,
        required: true,
      },
      itemQty: {
        type: Number,
        required: true,
      },
      itemPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  bill: {
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date,
  },
});

//Creating Model
const Order = new mongoose.model("order", orderSchema);

//Model Exports
module.exports = Order;
