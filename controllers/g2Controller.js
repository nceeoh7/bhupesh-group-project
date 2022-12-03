const User = require('../models/User');
const Appointment = require('../models/Appointment');

const getG2 = async (req, res) => {
  let user = await User.findById(req.session.userId).populate('appointmentId');
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

  if (user.licenseNumber === `default${user.username}`) {
    user = null;
  }
  res.render('g2', { user, appointments, errors: [] });
};

const postG2 = async (req, res) => {
  const {
    firstName,
    lastName,
    licenseNumber,
    age,
    dob,
    make,
    model,
    year,
    plateNumber,
    appointmentDate,
    appointmentTime,
    appointments,
  } = req.body;

  let updateUserData;
  const carDetails = { make, model, year, plateNumber };

  const appointmentId = appointments
    ?.split(',')
    .filter((appointment) =>
      appointment.includes(`${appointmentDate}|${appointmentTime}|`)
    )[0]
    .split('|')[2];

  if (firstName) {
    updateUserData = {
      firstName,
      lastName,
      licenseNumber,
      age,
      dob,
      appointmentId,
      testType: 'G2',
      carDetails,
    };
  } else {
    updateUserData = { testType: 'G', appointmentId, carDetails };
  }

  try {
    if (new Date(dob).getFullYear() > new Date().getFullYear())
      throw new RangeError('Please provide valid date of birth');

    const currentUserData = await User.findById(req.session.userId);
    if (currentUserData.comment) {
      updateUserData.comment = '';
    }
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      updateUserData,
      {
        runValidators: true,
        context: 'query',
      }
    );
    console.log(user);

    await Appointment.findByIdAndUpdate(user.appointmentId, {
      isTimeSlotAvailable: true,
    });

    await Appointment.findByIdAndUpdate(appointmentId, {
      isTimeSlotAvailable: false,
    });

    return firstName ? res.redirect('/g2') : res.redirect('/g');
  } catch (error) {
    let errors = Object.keys(error.errors).map((key) => {
      return error.errors[key].message;
    });

    if (firstName) {
      return res.render('g2', {
        user: {
          firstName,
          lastName,
          licenseNumber,
          age,
          dob: new Date(dob),
          carDetails,
          appointmentId: {
            appointmentDate: new Date(appointmentDate),
            appointmentTime,
          },
        },
        appointments,
        errors,
      });
    }
    const user = await User.findById(req.session.userId);
    user.carDetails = carDetails;
    return res.render('g', { user, errors });
  }
};

module.exports = {
  getG2,
  postG2,
};
