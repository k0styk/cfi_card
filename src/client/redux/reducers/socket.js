import { SOCKET } from '../types';
const initialState = {};

export function socket(state = initialState, action) {
  if(action.type === SOCKET.ADD_SOCKET) {
    return action.payload;
  } else if(action.type === SOCKET.REMOVE_SOCKET) {
    return initialState;
  }
  return state;
}