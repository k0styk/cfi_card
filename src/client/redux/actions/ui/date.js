//@ts-check
import { UI } from '../../types';
import { ui } from '../../../Events';

/**
 * @param {string} [payload]
 */
export function setDate(payload) {
  return {
    type: UI.DATE.SET,
    payload
  };
}

export function removeDate() {
  return {
    type: UI.DATE.REMOVE,
  };
}

export function getDateFromServer() {
  return {
    type: ui.GET_DATE_FROM_SERVER,
    emit: true,
    retAction: setDate()
  };
};

/**
 * @param {boolean} payload
 */
export function setDateState(payload) {
  return {
    type: UI.DATE.SET_STATE,
    payload
  };
}