const isLogin = (req, res, next) => {

  if (!req.isAuthenticated()) {
    req.flash("error", "bhaiya baat nhi bani");
    res.redirect("/login");
  }
  next();
};

module.exports=isLogin
