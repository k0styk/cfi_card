import { UI } from '../../types';
const initialState = {
  name: ''
};

export function user(state = initialState, action) {
  switch (action.type) {
    case UI.USER.SET:
      return {
        name: action.payload
      };
    case UI.USER.REMOVE:
      return {
        name: ''
      };
  }
  return state;
}