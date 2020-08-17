'use strict';

exports.__esModule = true;
function loggerMiddleWare(extraArgument) {
  return ({ getState }) => next => action => {
    const { socket } = getState();

    __LOGGER__ && console.log(action);
    socket && socket.emit && socket.emit('redux-logger', action);
    return next(action);
  };
};

const logger = loggerMiddleWare();

exports['default'] = logger;