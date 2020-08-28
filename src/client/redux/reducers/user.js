import { USER, INIT } from '../types';
const initialState = {
  token: '',
  description: '',
  displayName: '',
  rights: '',
  id: ''
};

export function user(state = initialState, action) {
  switch (action.type) {
    case USER.SET:
      return {
        ...state,
        ...action.payload
      };
    case USER.RESET: return initialState;
    case INIT.INITIAL_ALL:
      return action.payload.user?{
        ...state,
        ...action.payload.user
      }:initialState;
    default: return state;
  }
}