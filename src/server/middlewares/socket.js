const sessionMiddleware = require('../session');

module.exports = (socket, next) => {
  try {
    sessionMiddleware(socket.request, socket.request.res, next);
  } catch (err) {
    console.log('###-> socket middleware error <-###');
    console.log(err);
  }
};