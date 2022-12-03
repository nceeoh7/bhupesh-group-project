module.exports = (req, res, next) => {
  if (isLoggedIn && userType === "Examiner") {
    next();
  } else {
    res.redirect("/");
  }
};
