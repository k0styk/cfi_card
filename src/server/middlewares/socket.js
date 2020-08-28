const sessionMiddleware = require('./session');

module.exports = (socket, next) => {
  try {
    /* eslint-disable */
    console.log('#########################');
    console.log('###                   ###');
    console.log('### socket middleware ###');
    console.log('###                   ###');
    console.log('#########################');
    sessionMiddleware(socket.request, {}, next);
  } catch (err) {
    console.log('### socket middleware error ###');
    console.log(err);
  }
};