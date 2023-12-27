const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");


router.post("/products/:productId/reviews", async (req, res) => {
    console.log("clicked in reviews")
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const review = await Review({ ...req.body })
    product.reviews.push(review)
    await product.save()
    await review.save()
    // res.render("products/show", { product });
    res.redirect(`/products/${productId}`)
});

module.exports = router;
