const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const Product = require("../models/product");
const router = express.Router();

router.get("/signup", (req, res) => {
  try {
    res.render("auth/signup");

  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});
router.get("/login", (req, res) => {
  try {
    res.render("auth/login");

  } catch (e) {
    res.status(500).render("error", { err: e.message })

  }
});
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/signup",
  failureFlash: true
}),
  (req, res) => {
    req.flash("success", "You are now logged in.");
    res.redirect("/products")
  }
);


router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash("success", "succefully logged out")
    res.redirect('/products');
  });
});
router.post("/signup", async (req, res) => {
  try {
    const { username, email, role, password } = req.body;
    const newUSer = new User({ username, email, role });
    await User.register(newUSer, password);
    req.flash("success", "You have successfully signed up.")
    res.redirect("/login");
  } catch (e) {
    res.status(500).render("error", { err: e.message })
  }
});
module.exports = router;
