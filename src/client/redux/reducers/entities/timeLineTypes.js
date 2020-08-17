import { ENTITIES, INIT } from '../../types';
const initialState = [];

/**
 * @param {{ type: any; payload: string[] | number | { entities: { flights: string[] } }; }} action
 */
export function timelineTypes(state = initialState, action) {
  switch (action.type) {
    case INIT.INITIAL_ALL:
      return action.payload.entities.timeLineTypes;
  }
  return state;
}