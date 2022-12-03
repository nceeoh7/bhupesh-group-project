module.exports = (req, res, next) => {
  if (req.session.userType) {
    userType = req.session.userType;
  }
  next();
};
