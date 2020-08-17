import { ENTITIES, INIT } from '../../types';
const initialState = [];

export function specialSymbols(state = initialState, action) {
  switch (action.type) {
    case INIT.INITIAL_ALL:
      return action.payload.entities.specialSymbols;
  }
  return state;
}