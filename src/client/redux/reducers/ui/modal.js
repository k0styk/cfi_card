import { UI } from '../../types';
const initialState = false;

export function modal(state = initialState, action) {
  switch (action.type) {
    case UI.MODAL.SHOW:
      return true;
    case UI.MODAL.HIDE:
      return false;
  }
  return state;
}