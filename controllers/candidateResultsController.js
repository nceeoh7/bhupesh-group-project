const User = require('../models/User');

const candidateResult = async (req, res) => {
  const resultType = req.query.type;
  let filteredUsers;
  if (resultType && resultType == 'Pass') {
    filteredUsers = await User.find({ result: true });
  } else if (resultType && resultType == 'Fail') {
    filteredUsers = await User.find({ result: false });
  } else {
    filteredUsers = await User.find({ comment: { $exists: true } });
  }

  res.render('candidateResult', { filteredUsers });
};

module.exports = { candidateResult };
