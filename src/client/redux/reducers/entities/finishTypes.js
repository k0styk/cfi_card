import { INIT } from '@redux/types';
const initialState = [];

export function finishTypes(state = initialState, action) {
  switch (action.type) {
    case INIT.INITIAL_ALL:
      return action.payload.entities.finishTypes;
  }
  return state;
}