// @ts-check
import { ENTITIES } from '@redux/types';
import { entities } from '@client/Events';
import { aircraftTypeSet, aircraftTypeRemove } from './flight';

/**
 * @param {{aircraft: string}} payload
 */
export function Add(payload) {
  return {
    type: entities.AIRCRAFTS.ADD,
    emit: true,
    payload
  };
}

/**
 * @param {{aircraft: string}} payload
 */
export function Delete(payload) {
  return {
    type: ENTITIES.AIRCRAFT.DELETE,
    payload
  };
}

/**
 * @param {{ aircraft: string; }} aircraft
 */
export function removeAircraft(aircraft) {
  return {
    type: entities.AIRCRAFTS.DELETE,
    emit: true,
    retAction: [Delete(aircraft), aircraftTypeRemove({id: -1})]
  };
};