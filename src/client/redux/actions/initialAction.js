import { INIT } from '../types';
import { store } from '../../Events';

export function initialAction() {
  return {
    type: store.INITIAL,
    emit: true,
    retAction: { type: INIT.INITIAL_ALL }
  };
}