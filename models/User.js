const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    requried: [true, "Please provide username"],
    unique: true,
  },
  password: { type: String, required: [true, "Please provide password"] },
  userType: { type: String, required: true },
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    default: "default",
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    default: "default",
  },
  age: {
    type: Number,
    required: [true, "Please provide your age"],
    default: 0,
  },
  licenseNumber: {
    type: String,
    required: [true, "Please provide license number"],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, "Please provide your date of birth"],
    default: new Date(1967, 1, 1),
  },
  testType: {
    type: String,
    default: 'G2'
  },
  comment: String,
  result: Boolean,
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },
  carDetails: {
    make: {
      type: String,
      required: [true, "Please provide car make"],
      default: "default",
    },
    model: {
      type: String,
      required: [true, "Please provide car model"],
      default: "default",
    },
    year: {
      type: Number,
      required: [true, "Please provide car year"],
      default: 0,
    },
    plateNumber: {
      type: String,
      required: [true, "Please provide car plate number"],
      unique: true,
    },
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

UserSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique. Please try with different value.",
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
