import { UI } from '../../types';
const initialState = {
  connected: false,
  archieve: false,
  uiLoader: false,
};

export function app(state = initialState, action) {
  const p = action.payload;

  switch (action.type) {
    case UI.APP.CONNECTION:
    case UI.APP.ARCHIEVE:
    case UI.APP.LOADER:
      return {
        ...state,
        ...p
      };
  }
  return state;
}