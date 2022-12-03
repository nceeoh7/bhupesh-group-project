const Appointment = require('../models/Appointment');
const { login, loginUser, logout } = require('./loginController');
const { signup, signupUser } = require('./signupController');
const { getG2, postG2 } = require('./g2Controller');
const { getG } = require('./gController');
const {
  examiner,
  userDetail,
  updateWithExaminerFeedback,
} = require('./examinerController');
const { candidateResult } = require('./candidateResultsController');

const dashboard = (req, res) => {
  res.render('index');
};

const getAppointments = async (req, res) => {
  const appointmentsList = await Appointment.find({});
  const appointments = appointmentsList
    ? appointmentsList
        .map(
          (appointment) =>
            `${appointment.appointmentDate.toISOString().split('T')[0]}|${
              appointment.appointmentTime
            }|${appointment._id}`
        )
        .join()
    : '';
  res.render('appointments', { appointments });
};

const saveAppointment = async (req, res) => {
  const { appointmentDate, appointmentTime } = req.body;
  await Appointment.create({
    appointmentDate,
    appointmentTime,
    isTimeSlotAvailable: true,
  });
  res.redirect('/appointments');
};

module.exports = {
  dashboard,
  getG,
  getG2,
  postG2,
  login,
  loginUser,
  logout,
  signup,
  signupUser,
  getAppointments,
  saveAppointment,
  examiner,
  userDetail,
  updateWithExaminerFeedback,
  candidateResult,
};
