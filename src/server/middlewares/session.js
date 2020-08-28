const session = require('express-session');
const {config} = global;

const sessionMiddleware = session({
  saveUninitialized: true,
  // store: sessionStore,
  resave: false,
  secret: config.cookieSecret,
  cookie: { maxAge: 1*18*60*60 }
});

module.exports = sessionMiddleware;
