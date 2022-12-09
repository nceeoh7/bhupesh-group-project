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


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(process.env)
    console.log(error);
    process.exit(1);
  }
}

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: monogStore.create({
      mongoUrl: process.env.MONGO_SESSION_URL,
      autoRemove: true,
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

const PORT = 5000;

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("Listening for requests on "+ PORT);
  })
})


