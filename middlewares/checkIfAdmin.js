module.exports = (req, res, next) => {
  if (userType === "Admin") {
    next();
  } else {
    res.redirect("/");
  }
};
