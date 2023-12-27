const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("products/index", { products });
});

router.get("/products/:productid", async (req, res) => {
  const { productid } = req.params;
  const product = await Product.findById(productid).populate("reviews");
  res.render("products/show", { product });
});


router.get("/products/:productid/edit", async (req, res) => {
  const { productid } = req.params;
  const product = await Product.findById(productid);
  res.render("products/edit", { product });
});

router.post("/products", async (req, res) => {
  await Product.create({ ...req.body });
  res.redirect("/products");
});

router.patch("/products/:productid", async (req, res) => {
  const { productid } = req.params;
  await Product.findByIdAndUpdate(productid, { ...req.body });

  res.redirect(`/products/${productid}`);
});

router.delete("/products/:productid", async (req, res) => {
  const { productid } = req.params;
  await Product.findByIdAndDelete(productid);
  res.redirect("/products");
});

router.get("/new", (req, res) => {
  res.render("products/new");
});

module.exports = router;
