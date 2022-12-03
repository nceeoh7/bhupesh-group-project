module.exports = (req, res, next) => {
  if (isLoggedIn && userType === "Admin") {
    next();
  } else {
    res.redirect("/");
  }
};
