const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const productValidation = require("../middleware/middleware");
const isLoggedIn = require("../middleware/auth");
const isProductAuthor=require("../middleware/middleware")


router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products/index", { products });
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});


router.get("/products/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    const product = await Product.findById(productid).populate("reviews");
    res.render("products/show", { product });
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});


router.get("/products/:productid/edit", isLoggedIn, productValidation, async (req, res) => {
  try {
    const { productid } = req.params;
    const product = await Product.findById(productid);
    res.render("products/edit", { product });
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});


router.post("/products", isLoggedIn, async (req, res) => {
  try {
    const { name, price, image, desc, category } = req.body
    await Product.create({ name, price, image, desc, category,author:req.user._id });
    req.flash("success", "You added product successfully");
    const redirectUrl = req.session.requiredUrl
    delete req.session.requiredUrl
    res.redirect(redirectUrl);
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }

});

router.patch("/products/:productid", isLoggedIn, productValidation, async (req, res) => {
  try {
    const { productid } = req.params;
    await Product.findByIdAndUpdate(productid, { ...req.body });
    const redirectUrl = req.session.requiredUrl
    delete req.session.requiredUrl
    res.redirect(redirectUrl);
    // res.redirect(`/products/${productid}`);
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});

router.delete("/products/:productid", isLoggedIn, async (req, res) => {
  try {
    const { productid } = req.params;
    await Product.findByIdAndDelete(productid);
    delete req.session.requiredUrl
    res.redirect("/products");
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }

});

router.get("/new", isLoggedIn, (req, res) => {
  try {
    console.log("new")
    res.render("products/new");

  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});

module.exports = router;
