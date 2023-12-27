const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRoutes = require("./routes/userRoutes");
// var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
const reviewRoutes=require("./routes/reviewRoutes")
mongoose
  .connect("mongodb://localhost:27017/eCommerce")
  .then(() => {
    console.log("mongoose connect");
  })
  .catch((error) => {
    console.log("error 500 mongoose");
  });

const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 10,
  },
};

/////-------------------------------------------------
app.use(expressSession(sessionConfig));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());



app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(productRoutes);
app.use(reviewRoutes)
app.use(userRoutes);
const port = 7000;
/////--------------------------------------------------
app.listen(port, () => {
  console.log("7000 port");
});
