module.exports = (req, res, next) => {
  if (!isLoggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};
