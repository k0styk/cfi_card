//@ts-check
import { UI } from '../../types';

/**
 * @param {string} payload
 */
export function setUserName(payload) {
  return {
    type: UI.USER.SET_USERNAME,
    payload
  };
}

export function removeUserName() {
  return {
    type: UI.USER.REMOVE_USERNAME,
  };
}