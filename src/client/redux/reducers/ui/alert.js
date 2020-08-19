import { UI } from '../../types';
const initialState = {
  message: '',
  open: false,
  severity: 'info'
};

/**
 * @param {{ type: any; payload: { message: string, open: boolean, severity: string} }} action
 */
export function alert(state = initialState, action) {
  const p = action.payload;

  switch (action.type) {
    case UI.ALERT_SET:
      return {
        ...state,
        ...p
      };
  }
  return state;
}