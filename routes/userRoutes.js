const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const Product = require("../models/product");
const router = express.Router();

router.get("/signup", (req, res) => {
  try {
    res.render("auth/signup");

  } catch (e) {
    res.status(500).render("error",{err:e.message})
  }
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/signup",
    failureFlash:true
  }),
  (req, res) => {
    req.flash("success", "You are now logged in.");
    res.redirect("/products")
  }
);

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const newUSer = new User({ username, email });
  await User.register(newUSer, password);
req.flash("success","You have successfully signed up.")
  res.redirect("/login");
});
module.exports = router;
