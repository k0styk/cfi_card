const sessionMiddleware = require('../session');

module.exports = (socket, next) => {
  try {
    /* eslint-disable */
    // console.log('######-> SOCKET MIDDLA START <-######');
    // console.log('######-> SOCKET MIDDLA START <-######');
    // console.log('######-> SOCKET MIDDLA START <-######');
    // // console.log(socket.request);
    // console.log('######-> SOCKET MIDDLA END <-######');
    // console.log('######-> SOCKET MIDDLA END <-######');
    // console.log('######-> SOCKET MIDDLA END <-######');
    sessionMiddleware(socket.request, socket.request.res, next);
  } catch (err) {
    console.log('###-> socket middleware error <-###');
    console.log(err);
  }
};