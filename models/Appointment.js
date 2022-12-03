const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApppointmentSchema = new Schema({
  appointmentDate: { type: Date, requried: true },
  appointmentTime: { type: String, required: true },
  isTimeSlotAvailable: { type: Boolean, default: true },
});

const Appointment = mongoose.model('Appointment', ApppointmentSchema);
module.exports = Appointment;
