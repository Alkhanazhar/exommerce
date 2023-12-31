const { Schema, model, default: mongooseose } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    default: "buyer",
  }
});

userSchema.plugin(passportLocalMongoose);

const User = model("User", userSchema);
module.exports = User;
