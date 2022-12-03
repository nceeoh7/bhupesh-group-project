const User = require('../models/User');

const examiner = async (req, res) => {
  const testType = req.query.testType;
  let filteredUsers = await User.find({ appointmentId: { $ne: null } }).populate(
    'appointmentId'
  );

  if (testType && testType === 'G2') {
    filteredUsers = filteredUsers.filter((user) => user.testType === 'G2');
  }
  if (testType && testType === 'G') {
    filteredUsers = filteredUsers.filter((user) => user.testType === 'G');
  }

  res.render('examiner', { filteredUsers });
};

const userDetail = async (req, res) => {
  const user = await User.findById(req.params.id).populate('appointmentId');
  res.render('userDetail', { user, errors: [] });
};

const updateWithExaminerFeedback = async (req, res) => {
  const { userId, feedback: comment, result } = req.body;
  await User.findByIdAndUpdate(userId, {
    comment,
    result: result == 1,
  });

  res.redirect('/examiner');
};

module.exports = { examiner, userDetail, updateWithExaminerFeedback };
