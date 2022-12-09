const User = require('../models/User');
const bcrypt = require('bcrypt');

const login = (req, res) => {
  let username, password;
  let hasError = false;
  if (req.session.isInvalidLogin) {
    req.session.isInvalidLogin = false;
    hasError = true;
    const loginData = req.flash('loginData')[0];
    username = loginData.username;
    password = loginData.password;
  }
  res.render('login', { hasError, username, password });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      req.session.userId = user._id;
      req.session.userType = user.userType;
      await req.session.save();
      return res.redirect('/');
    }
  }
  req.session.isInvalidLogin = true;
  req.flash('loginData', req.body);
  return res.redirect('/login');
};

const logout = async (req, res) => {
  req.session.destroy(() => res.redirect("/"));

};

module.exports = {
  login,
  loginUser,
  logout,
};
