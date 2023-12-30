const isLoggedIn = (req, res, next) => {
  req.session.requiredUrl = req.originalUrl  
  if (!req.isAuthenticated()) {
    req.flash("error", "you have to login first");
    res.redirect("/login");
  }
  next();
};

module.exports = isLoggedIn
