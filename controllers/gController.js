const User = require('../models/User');
const Appointment = require('../models/Appointment');

const getG = async (req, res) => {
  let user = await User.findById(req.session.userId).populate('appointmentId');
  if (user.licenseNumber === `default${user.username}`) {
    res.redirect('/g2');
  } else {
    let currentDate = new Date();
    currentDate.setHours(
      currentDate.getHours() - currentDate.getTimezoneOffset() / 60
    );
    currentDate = new Date(currentDate.toISOString().split('T')[0]);
    const appointmentsList = await Appointment.find({
      isTimeSlotAvailable: true,
      appointmentDate: { $gte: currentDate },
    });
    if (user.appointmentId) {
      appointmentsList.push(user.appointmentId);
    }
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
    res.render('g', { user, appointments, errors: [] });
  }
};

module.exports = { getG };
