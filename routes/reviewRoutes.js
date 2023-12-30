const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");
const isLoggedIn = require("../middleware/auth");


router.post("/products/:productId/reviews", isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        const review = await Review({ ...req.body })
        product.reviews.push(review)
        await product.save()
        await review.save()
        res.redirect(`/products/${productId}`)
    } catch (e) {
        res.status(500).render("error", { err: e.message })
    }

});

module.exports = router;
