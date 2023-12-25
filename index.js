const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Product = require("./models/product");
const productRoutes = require("./routes/productRoutes");
const methodOverride = require("method-override");
mongoose
  .connect("mongodb://localhost:27017/eCommerce")
  .then(() => {
    console.log("mongoose connect");
  })
  .catch((error) => {
    console.log("error 500 mongoose");
  });

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);
app.use(productRoutes);
app.use(methodOverride("_method"));

const port = 7000;
app.listen(port, () => {
  console.log("7000 port");
});
