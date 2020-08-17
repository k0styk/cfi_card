import { ENTITIES, INIT } from '@redux/types';
const initialState = [];

export function airports(state = initialState, action) {
  switch (action.type) {
    case ENTITIES.AIRPORT.ADD:
      return [...state, ...action.payload];
    case ENTITIES.AIRPORT.DELETE:
      return state.filter((val, idx) => idx!==action.payload);
    case INIT.INITIAL_ALL:
      return action.payload.entities.airports;
  }
  return state;
}