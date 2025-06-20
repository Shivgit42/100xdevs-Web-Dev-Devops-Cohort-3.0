require("dotenv").config();

const Mongostore = require("connect-mongo");
const { Cookie } = require("express-session");

const MONGODB_URL = process.env.MONGODB_URL;
const SESSION_ADMIN_SECRET = process.env.SESSION_ADMIN_SECRET;
const SESSION_USER_SECRET = process.env.SESSION_USER_SECRET;

adminSessionConfig = {
  secret: SESSION_ADMIN_SECRET,
  saveUninitialized: false,
  resave: false,
  store: Mongostore.create({ mongoUrl: MONGODB_URL }),
};

userSessionConfig = {
  secret: SESSION_USER_SECRET,
  saveUninitialized: false,
  resave: false,
  store: Mongostore.create({ mongoUrl: MONGODB_URL }),
};

module.exports = {
  adminSessionConfig,
  userSessionConfig,
};
