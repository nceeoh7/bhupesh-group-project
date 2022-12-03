module.exports = (req, res, next) => {
  if (isLoggedIn && userType === "Driver") {
    next();
  } else {
    res.redirect("/");
  }
};
