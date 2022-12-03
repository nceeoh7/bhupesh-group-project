module.exports = (req, res, next) => {
  console.log(isLoggedIn)
  console.log(userType)
  if (isLoggedIn && userType === "Admin") {
    next();
  } else {
    res.redirect("/");
  }
};
