module.exports = (req, res, next) => {
  if (!isLoggedIn && !req.session.userId) {
    next();
  } else {
    res.redirect("/");
  }
};
