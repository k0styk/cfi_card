import { UI } from '../../types';
const initialState = {
  connected: false,
  archieve: false
};

export function app(state = initialState, action) {
  const p = action.payload;

  switch (action.type) {
    case UI.APP.CONNECTION:
      return {
        ...state,
        ...p
      };
    case UI.APP.ARCHIEVE:
      return {
        ...state,
        ...p
      };
  }
  return state;
}