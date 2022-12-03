const express = require('express');
const router = express.Router();
const checkIfDriver = require('../middlewares/checkIfDriver');
const checkIfAuthenticated = require('../middlewares/checkIfAuthenticated');
const checkIfNotLoggedIn = require('../middlewares/checkIfNotLoggedIn');
const checkIfAdmin = require('../middlewares/checkIfAdmin');
const checkIfExaminer = require('../middlewares/checkIfExaminer');

const {
  dashboard,
  getG,
  getG2,
  postG2,
  login,
  signup,
  loginUser,
  signupUser,
  logout,
  getAppointments,
  saveAppointment,
  examiner,
  userDetail,
  updateWithExaminerFeedback,
  candidateResult,
} = require('../controllers/controllers');

router.get('/', dashboard);
router.get('/g', checkIfDriver, getG);
router.get('/g2', checkIfDriver, getG2);
router.post('/g2', checkIfDriver, postG2);
router.get('/login', checkIfNotLoggedIn, login);
router.post('/login', checkIfNotLoggedIn, loginUser);
router.get('/signup', checkIfNotLoggedIn, signup);
router.post('/signup', checkIfNotLoggedIn, signupUser);
router.get('/logout', checkIfAuthenticated, logout);
router.get('/appointments', checkIfAdmin, getAppointments);
router.post('/saveAppointment', checkIfAdmin, saveAppointment);
router.get('/examiner', examiner);
router.get('/userDetail/:id', userDetail);
router.post('/examinerFeedback', updateWithExaminerFeedback);
router.get('/candidateResult', candidateResult);

module.exports = router;
