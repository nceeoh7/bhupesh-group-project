const User = require("../models/User");

const signup = (req, res) => {
  const formData = req.flash("formData")[0];
  const username = formData?.username;
  const password = formData?.password;
  const selectedUserType = formData?.userType;
  const confirmPassword = formData?.confirmPassword;
  const validationErrors = req.flash("validationErrors");
  let errors;

  if (validationErrors) {
    errors = validationErrors.filter(
      (error) =>
        !(error.includes("licenseNumber") || error.includes("plateNumber"))
    );
  }

  res.render("signup", {
    errors,
    username,
    password,
    confirmPassword,
    selectedUserType
  });
};

const signupUser = async (req, res) => {
  const {
    username,
    password,
    confirm_password: confirmPassword,
    userType,
  } = req.body;
  let validationErrors = [];
  if (password === confirmPassword) {
    try {
      await User.create({
        username,
        password,
        userType,
        licenseNumber: `default${username}`,
        carDetails: {
          plateNumber: `default${username}`,
        },
      });
      return res.redirect("/login");
    } catch (error) {
      validationErrors = Object.keys(error.errors).map((key) => {
        return error.errors[key].message;
      });
    }
  } else {
    validationErrors.push("Passwords do not match!");
  }
  req.flash("validationErrors", validationErrors);
  req.flash("formData", { username, password, confirmPassword, userType });
  res.redirect("/signup");
};

module.exports = {
  signup,
  signupUser,
};
