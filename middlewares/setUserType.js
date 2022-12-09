module.exports = (req, res, next) => {
  if (req.session.userType) {
    console.log("User Type Middleware");
    console.log(req.session);
    userType = req.session.userType;
  }
  next();
};
