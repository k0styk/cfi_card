// @ts-check
import { USER } from '../types';

export function setUser(payload) {
  return {
    type: USER.SET,
    payload,
  };
}

export function removeUser() {
  return {
    type: USER.RESET
  };
}