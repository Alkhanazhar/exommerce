const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("products/index", { products });
});
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/" + { id }, { product });
});

router.post("/products", async (req, res) => {
  console.log(req.body);
  await Product.create({ ...req.body });
  res.redirect("/products");
});

router.get("/new", (req, res) => {
  res.render("products/new");
});

module.exports = router;
