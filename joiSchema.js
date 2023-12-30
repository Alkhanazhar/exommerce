const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(0).required(),
    image: Joi.string().min(0).required(),
    price: Joi.number().min(0).required(),
    desc: Joi.string().min(0),
    category: Joi.string().min(0),

})
module.exports = productSchema