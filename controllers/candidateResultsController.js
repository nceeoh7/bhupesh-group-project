const User = require('../models/User');

const candidateResult = async (req, res) => {
  const resultType = req.query.type;
  console.log(resultType)
  console.log(resultType == 'Pass')
  console.log(resultType == 'Fail')
  let filteredUsers;
  if (resultType && resultType == 'Pass') {
    filteredUsers = await User.find({ result: true });
  } else if (resultType && resultType == 'Fail') {
    filteredUsers = await User.find({ result: false });
  } else {
    filteredUsers = await User.find({ comment: { $exists: true } });
  }
  console.log(filteredUsers)

  res.render('candidateResult', { filteredUsers });
};

module.exports = { candidateResult };
