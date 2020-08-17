//@ts-check
import { UI } from '../../types';

/**
 * @param { boolean } payload
 */
export function setDateState(payload) {
  return {
    type: UI.WEATHER.SET_STATE,
    payload
  };
}