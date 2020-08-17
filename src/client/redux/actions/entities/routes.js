// @ts-check
import { ENTITIES } from '@redux/types';
import { entities } from '@client/Events';

/**
 * @param {{ value: string}} payload
 */
export function add(payload) {
  return {
    type: entities.ROUTES.ADD,
    emit: true,
    payload
  };
}

export function update(payload) {
  return {
    type: ENTITIES.ROUTES.UPDATE,
    payload
  };
}