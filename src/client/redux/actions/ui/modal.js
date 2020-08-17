import { MODAL } from '../../types';

export function showModal() {
  return {
    type: MODAL.SHOW,
  };
}

export function hideModal() {
  return {
    type: MODAL.HIDE,
  };
}