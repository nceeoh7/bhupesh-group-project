require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const expressSession = require('express-session');
const flash = require('connect-flash');
const setUserRole = require('./middlewares/setUserType');
const monogStore = require('connect-mongo');

const app = new express();
global.userType = '';
global.isLoggedIn = false;

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: monogStore.create({
      mongoUrl: process.env.MONGO_SESSION_URL,
      autoRemove: true,
      ttl: 60,
      unset: 'destroy',
    }),
  })
);
app.use(flash());
app.use('*', setUserRole);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(router);
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
