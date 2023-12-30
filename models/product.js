const mongoose = require("mongoose");
const Review = require("./review");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});
productSchema.post("findOneAndDelete", async (product) => {
  if (product.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: product.reviews } })
  }
})
const Product = mongoose.model("Product", productSchema);
module.exports = Product
