const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const {config} = global;

const sessionMiddleware = session({
  saveUninitialized: true,
  resave: false,
  secret: config.cookieSecret,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    // day*hour*minutes*seconds*millis
    maxAge: 1*18*60*60*1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1*18*60*60,
  })
});

module.exports = sessionMiddleware;
