const productSchema = require("../joiSchema");
const Product = require("../models/product");

const productValidation = (req, res, next) => {
    const { name, image, price, desc, category } = req.body
    console.log("validation")
    const { error } = productSchema.validate({ name, image, price, desc, category })
    if (error || price < 0) {
        const msg = error.details.map((err) => err.message)
        return res.status(500).render("error", { err: msg })
    }
    next()
}
module.exports.isProductAuthor = async (req, res, next) => {
    const { productid } = req.params
    console.log("author")
    const product = await Product.findById(productid)
    if (!product.author.equals(req.user._id)) {
        req.flash("error", "you arent author")
        res.redirect("/products")
    }
    next()
}
module.exports = productValidation