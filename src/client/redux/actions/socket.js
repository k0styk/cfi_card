import { SOCKET } from '../types';

export function setSocket(payload) {
  return {
    type: SOCKET.ADD_SOCKET,
    payload,
  };
}

export function removeSocket() {
  return {
    type: SOCKET.REMOVE_SOCKET
  };
}