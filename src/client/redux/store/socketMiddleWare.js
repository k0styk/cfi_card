'use strict';

exports.__esModule = true;
function socketMiddleware(extraArgument) {
  return ({ getState, dispatch }) => next => action => {
    const { socket } = getState();
    const { emit } = action;

    if (Object.keys(socket).length) {
      if (emit) {
        const {
          type,
          payload,
          retAction,
        } = action;

        socket.emit(type, payload, retAction, (err, action) => {
          next(action);
        });
      }
    } else if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    next(action);
  };
};

const socket = socketMiddleware();

exports['default'] = socket;

// export function testGetData() {
//   return {
//     type: 'TEST',
//     emit: true,
//     retAction: setDate()
//   };
// }

// export function testSendData() {
//   return {
//     type: 'TEST',
//     emit: true,
//     payload: 'data'
//   };
// }

// export function testGetAndSendData() {
//   return {
//     type: 'TEST',
//     emit: true,
//     payload: 's',
//     retAction: setDate()
//   };
// }