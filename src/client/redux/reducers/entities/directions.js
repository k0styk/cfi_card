// import { ENTITIES, INIT } from '@redux/types';
import { ENTITIES, INIT } from '../../types';
const initialState = [];

export function directions(state = initialState, action) {
  switch (action.type) {
    case ENTITIES.DIRECTIONS.ADD:
      return [...state, ...action.payload];
    case ENTITIES.DIRECTIONS.DELETE:
      return state.filter((val, idx) => idx!==action.payload);
    case INIT.INITIAL_ALL:
      return action.payload.entities.directions;
  }
  return state;
}