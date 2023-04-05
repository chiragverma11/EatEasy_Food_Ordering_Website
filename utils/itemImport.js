const csv = require("csvtojson/v2");
const mongoose = require("mongoose");
const Item = require("../models/menu");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

//Mongoose Connection
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function csvToMongo() {
  const csvItems = await csv().fromFile("./assets/csv/items.csv");
  await Item.insertMany(csvItems);
  console.log("Items Added to Menu");
  process.exit();
}

csvToMongo();
