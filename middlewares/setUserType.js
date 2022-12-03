module.exports = (req, res, next) => {
  console.log('ut', isLoggedIn)
  console.log('ut', req.session.userType)
  if (isLoggedIn && req.session.userType) {
    userType = req.session.userType;
  }
  next();
};
