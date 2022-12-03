module.exports = (req, res, next) => {
  if (userType === "Examiner") {
    next();
  } else {
    res.redirect("/");
  }
};
