module.exports = (req, res, next) => {
  if (isLoggedIn && req.session.userType) {
    userType = req.session.userType;
  }
  next();
};
