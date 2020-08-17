import { UI, INIT } from '../../types';
const initialState = {
  date: '',
  state: true
};

export function date(state = initialState, action) {
  switch (action.type) {
    case UI.DATE.SET:
      return {
        ...state,
        date: action.payload
      };
    case UI.DATE.REMOVE:
      return {
        ...state,
        date: ''
      };
    case UI.DATE.SET_STATE:
      return {
        ...state,
        state: action.payload
      };
    case INIT.INITIAL_ALL:
      return {
        ...state,
        date: action.payload.ui.date
      };
  }
  return state;
}