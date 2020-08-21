import { UI } from '@redux/types';

const initialState = [];

export function notifications(state = initialState, action) {
  switch (action.type) {
    case UI.NOTIFY.ENQUEUE_SNACKBAR:
      return [
        ...state,
        {
          ...action.notification,
        },
      ];

    case UI.NOTIFY.CLOSE_SNACKBAR:
      return state.map(n => (
        (action.dismissAll || n.key === action.key)
          ? { ...n, dismissed: true }
          : { ...n }
      ));

    case UI.NOTIFY.REMOVE_SNACKBAR:
      return state.filter(n => n.key !== action.key);

    default:
      return state;
  }
};