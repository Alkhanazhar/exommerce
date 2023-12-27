const { Schema, model, } = require("mongoose");
const reviewSchema = new Schema({
    rating: {
        type: String,
        min: 1,
        max: 5,
        default:1
    },
    review: {
        type: String,
        required: true,
        trim: true
    }
})

const Review = model("Review", reviewSchema)
module.exports = Review

