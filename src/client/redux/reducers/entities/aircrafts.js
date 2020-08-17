import { ENTITIES, INIT } from '@redux/types';
import { entities } from '@client/Events';
const initialState = [];

/**
 * @param {{ type: any; payload: string[] | number | { entities: { aircrafts: string[] } }; }} action
 */
export function aircrafts(state = initialState, action) {
  switch (action.type) {
    case ENTITIES.AIRCRAFT.SET:
      return [...action.payload];
    case ENTITIES.AIRCRAFT.REMOVE:
      return initialState;
    case ENTITIES.AIRCRAFT.ADD:
      const arr = [...state, action.payload];

      return arr.filter((v, i) => arr.indexOf(v) === i);
    case entities.AIRCRAFTS.ADD:
      const newArr = [...state, action.payload];

      return newArr.filter((v, i) => newArr.indexOf(v) === i);
    case ENTITIES.AIRCRAFT.DELETE:
      return state.filter((val, idx) => val!==action.payload);
    case INIT.INITIAL_ALL:
      return action.payload.entities.aircrafts;
  }
  return state;
}