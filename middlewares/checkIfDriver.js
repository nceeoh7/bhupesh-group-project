module.exports = (req, res, next) => {
  if (userType === "Driver") {
    next();
  } else {
    res.redirect("/");
  }
};
