// @ts-check
import { ENTITIES } from '../../types';

/**
 * @param {{id: number, create: Date}} payload
 */
export function flightAdd(payload) {
  return {
    type: ENTITIES.FLIGHT.ADD,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function flightRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.REMOVE,
    payload
  };
}

/**
 * @param {{id: number, time: Date}} payload
 */
export function cancelSet(payload) {
  return {
    type: ENTITIES.FLIGHT.CANCEL_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function cancelRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.CANCEL_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, type: number}} payload
 */
export function aircraftTypeSet(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRCRAFT.AIRCRAFT_TYPE_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftTypeRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRCRAFT.AIRCRAFT_TYPE_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, number: string}} payload
 */
export function aircraftNumberSet(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRCRAFT.AIRCRAFT_NUMBER_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftNumberRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRCRAFT.AIRCRAFT_NUMBER_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, flight: string}} payload
 */
export function aircraftFlightSet(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRCRAFT.FLIGHT_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftFlightRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRCRAFT.FLIGHT_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, name: string}} payload
 */
export function airportNameSet(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRPORT.NAME_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function airportNameRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRPORT.NAME_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, type: string}} payload
 */
export function airportTypeSet(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRPORT.TYPE_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function airportTypeRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.AIRPORT.TYPE_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, planned: Date}} payload
 */
export function departPlannedSet(payload) {
  return {
    type: ENTITIES.FLIGHT.DEPART.PLANNED_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function departPlannedRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.DEPART.PLANNED_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, actual: Date}} payload
 */
export function departActualSet(payload) {
  return {
    type: ENTITIES.FLIGHT.DEPART.ACTUAL_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function departActualRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.DEPART.ACTUAL_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, deffered: Date}} payload
 */
export function departDefferedSet(payload) {
  return {
    type: ENTITIES.FLIGHT.DEPART.DEFFERED_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function departDefferedRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.DEPART.DEFFERED_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timeLine: {id: number, type: string, typeObj: any}}} payload
 */
export function timeLineAdd(payload) {
  return {
    type: ENTITIES.FLIGHT.TIMELINE.ADD,
    payload
  };
}

/**
 * @param {{id: number, timeLine: {id: number}}} payload
 */
export function timeLineRemove(payload) {
  return {
    type: ENTITIES.FLIGHT.TIMELINE.REMOVE,
    payload
  };
}