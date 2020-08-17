import { ENTITIES, INIT } from '@redux/types';
const initialState = [];

export function zones(state = initialState, action) {
  switch (action.type) {
    case ENTITIES.ZONES.ADD:
      return [...state, ...action.payload];
    case ENTITIES.ZONES.DELETE:
      return state.filter((val, idx) => idx!==action.payload);
    case INIT.INITIAL_ALL:
      return action.payload.entities.zones;
  }
  return state;
}