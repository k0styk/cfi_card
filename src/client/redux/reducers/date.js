import { DATE, INIT } from '../types';
const initialState = {
  server: null,
  client: null
};

/**
 * @param {{ type: any; payload: Date | { date: { server: Date }; }; }} action
 */
export function date(state = initialState, action) {
  switch (action.type) {
    case DATE.SET_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    case DATE.SET_SERVER:
      return {
        ...state,
        server: action.payload
      };
    case DATE.REMOVE:
      return initialState;
    case INIT.INITIAL_ALL:
      return {
        ...state,
        server: new Date(action.payload.date.server),
        client: new Date()
      };
  }
  return state;
}