const isAuthRoute = require('./methods/isAuth');
const loginRoute = require('./methods/login');
const logoutRoute = require('./methods/logout');

module.exports = {
  isAuth: isAuthRoute,
  login: loginRoute,
  logout: logoutRoute,
};
