const sessionMiddleware = require('../session');

module.exports = (socket, next) => {
  try {
    sessionMiddleware(socket.request, {}, next);
  } catch (err) {
    console.log('###-> socket middleware error <-###');
    console.log(err);
  }
};