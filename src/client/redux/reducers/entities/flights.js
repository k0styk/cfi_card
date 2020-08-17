import { ENTITIES, INIT } from '../../types';
const initialState = [];

/**
 * @param {{ type: any; payload: string[] | number | { entities: { flights: string[] } }; }} action
 */
export function flights(state = initialState, action) {
  switch (action.type) {
    case ENTITIES.FLIGHTS.SET:
      return [...action.payload];
    case ENTITIES.FLIGHTS.REMOVE:
      return initialState;
    case ENTITIES.FLIGHTS.ADD:
      return [...state, ...action.payload];
    case ENTITIES.FLIGHTS.DELETE:
      return state.filter((val, idx) => idx !== action.payload);
    // case INIT.INITIAL_ALL:
      // return action.payload.entities.flights;
  }
  return state;
}