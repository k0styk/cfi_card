import { UI } from '../../types';
const initialState = {
  state: false
};

export function weather(state = initialState, action) {
  switch (action.type) {
    case UI.WEATHER.SET_STATE:
      return {
        ...state,
        state: action.payload
      };
    // case INIT.INITIAL_ALL:
    //   return action.payload.ui.weather;
  }
  return state;
}