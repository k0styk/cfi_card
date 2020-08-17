// @ts-check
import { WEATHER } from '../types';
const initialState = [];

/**
 * @param {{ type: any; payload: number | {}; }} action
 */
export function weather(state = initialState, action) {
  switch (action.type) {
    case WEATHER.ADD:
      return [...state, action.payload];
    case WEATHER.REMOVE:
      return state.filter((val, idx) => idx !== action.payload);
  }
  return state;
}