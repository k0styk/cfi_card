import { FLIGHT } from '../types';

/**
 * @param {{flights: object[], state: boolean }} payload
 */
export function flightsSortSet(payload) {
  return {
    type: FLIGHT.SORT_SET,
    payload
  };
}

/**
 * @param {{id: number, time: Date }} payload
 */
export function flightTimeSet(payload) {
  return {
    type: FLIGHT.TIME.SET,
    payload
  };
}

/**
 * @param {{id: number, archive: boolean }} payload
 */
export function flightArchiveSet(payload) {
  return {
    type: FLIGHT.ARCHIVE_SET,
    payload
  };
}

/**
 * @param {{id: number }} payload
 */
export function timelineIncPage(payload) {
  return {
    type: FLIGHT.TIMELINE.INC_PAGE,
    payload
  };
}

/**
 * @param {{id: number }} payload
 */
export function timelineDecPage(payload) {
  return {
    type: FLIGHT.TIMELINE.DEC_PAGE,
    payload
  };
}

/**
 * @param {{id: number, columnPage: number }} payload
 */
export function timelineSetPage(payload) {
  return {
    type: FLIGHT.TIMELINE.SET_PAGE,
    payload
  };
}

/**
 * @param {{id: number, create: Date}} payload
 */
export function flightAdd(payload) {
  return {
    type: FLIGHT.ADD,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function flightRemove(payload) {
  return {
    type: FLIGHT.REMOVE,
    payload
  };
}

/**
 * @param {{id: number, time: Date}} payload
 */
export function cancelSet(payload) {
  return {
    type: FLIGHT.CANCEL_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function cancelRemove(payload) {
  return {
    type: FLIGHT.CANCEL_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, type: number}} payload
 */
export function aircraftTypeSet(payload) {
  return {
    type: FLIGHT.AIRCRAFT.TYPE_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftTypeRemove(payload) {
  return {
    type: FLIGHT.AIRCRAFT.TYPE_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, number: string}} payload
 */
export function aircraftNumberSet(payload) {
  return {
    type: FLIGHT.AIRCRAFT.NUMBER_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftNumberRemove(payload) {
  return {
    type: FLIGHT.AIRCRAFT.NUMBER_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, flight: string}} payload
 */
export function aircraftFlightSet(payload) {
  return {
    type: FLIGHT.AIRCRAFT.FLIGHT_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftFlightRemove(payload) {
  return {
    type: FLIGHT.AIRCRAFT.FLIGHT_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, literal: array}} payload
 */
export function aircraftLiteralSet(payload) {
  return {
    type: FLIGHT.AIRCRAFT.LITERAL_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function aircraftLiteralRemove(payload) {
  return {
    type: FLIGHT.AIRCRAFT.LITERAL_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, name: string}} payload
 */
export function airportNameSet(payload) {
  return {
    type: FLIGHT.AIRPORT.NAME_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function airportNameRemove(payload) {
  return {
    type: FLIGHT.AIRPORT.NAME_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, type: string}} payload
 */
export function airportTypeSet(payload) {
  return {
    type: FLIGHT.AIRPORT.TYPE_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function airportTypeRemove(payload) {
  return {
    type: FLIGHT.AIRPORT.TYPE_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, planned: Date}} payload
 */
export function departPlannedSet(payload) {
  return {
    type: FLIGHT.DEPART.PLANNED_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function departPlannedRemove(payload) {
  return {
    type: FLIGHT.DEPART.PLANNED_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, actual: Date}} payload
 */
export function departActualSet(payload) {
  return {
    type: FLIGHT.DEPART.ACTUAL_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function departActualRemove(payload) {
  return {
    type: FLIGHT.DEPART.ACTUAL_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, deffered: Date}} payload
 */
export function departDefferedSet(payload) {
  return {
    type: FLIGHT.DEPART.DEFFERED_SET,
    payload
  };
}

/**
 * @param {{id: number}} payload
 */
export function departDefferedRemove(payload) {
  return {
    type: FLIGHT.DEPART.DEFFERED_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timeline: {id: number, createdAt: date, type: string, typeObj: any}}} payload
 */
export function timelineAdd(payload) {
  return {
    type: FLIGHT.TIMELINE.ADD,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number }} payload
 */
export function timelineRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, t: date, time: { plan: Date}}} payload
 */
export function timelineTimePlanSet(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.PLAN_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineTimePlanRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.PLAN_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, time: { actual: Date }}} payload
 */
export function timelineTimeActualSet(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.ACTUAL_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineTimeActualRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.ACTUAL_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number}} payload
 */
export function timelineTimeTakeoffToggle(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.TAKEOFF_TOGGLE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, time: { direction: number  }}} payload
 */
export function timelineTimeDirectionSet(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.DIRECTION_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineTimeDirectionRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.DIRECTION_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, time: { landing: string } }} payload
 */
export function timelineTimeLandingSet(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.LANDING_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineTimeLandingRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.TIME.LANDING_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, route: { value: string[]}}} payload
 */
export function timelineRouteSet(payload) {
  return {
    type: FLIGHT.TIMELINE.ROUTE.SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineRouteRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.ROUTE.REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, route: { height: number}}} payload
 */
export function timelineRouteHeightSet(payload) {
  return {
    type: FLIGHT.TIMELINE.ROUTE.HEIGHT_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineRouteHeightRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.ROUTE.HEIGHT_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, route: { unit: string}}} payload
 */
export function timelineRouteUnitSet(payload) {
  return {
    type: FLIGHT.TIMELINE.ROUTE.UNIT_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineRouteUnitRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.ROUTE.UNIT_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, direction: { value: number}}} payload
 */
export function timelineDirectionValueSet(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.DIRECTION_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineDirectionValueRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.DIRECTION_REMOVE,
    payload
  };
}


/**
 * @param {{id: number, timelineId: number, direction: { height: number}}} payload
 */
export function timelineDirectionHeightSet(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.HEIGHT_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineDirectionHeightRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.HEIGHT_REMOVE,
    payload
  };
}


/**
 * @param {{id: number, timelineId: number, direction: { airport: number}}} payload
 */
export function timelineDirectionAirportSet(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.AIRPORT_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineDirectionAirportRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.AIRPORT_REMOVE,
    payload
  };
}


/**
 * @param {{id: number, timelineId: number, direction: { compass: string}}} payload
 */
export function timelineDirectionCompassSet(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.COMPASS_SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineDirectionCompassRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.DIRECTION.COMPASS_REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, broadcast: { value: number}}} payload
 */
export function timelineBroadcastSet(payload) {
  return {
    type: FLIGHT.TIMELINE.BROADCAST.SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineBroadcastRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.BROADCAST.REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, broadcast: { check: boolean}}} payload
 */
export function timelineBroadcastCheck(payload) {
  return {
    type: FLIGHT.TIMELINE.BROADCAST.CHECK,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, special: { value: number}}} payload
 */
export function timelineSpecialSet(payload) {
  return {
    type: FLIGHT.TIMELINE.SPECIAL.SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number, special: { height: number } } payload
 */
export function timelineSpecialHeightSet(payload) {
  return {
    type: FLIGHT.TIMELINE.SPECIAL.SET_HEIGHT,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number}} payload
 */
export function timelineSpecialRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.SPECIAL.REMOVE,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineFinishSet(payload) {
  return {
    type: FLIGHT.TIMELINE.FINISH.SET,
    payload
  };
}

/**
 * @param {{id: number, timelineId: number } payload
 */
export function timelineFinishRemove(payload) {
  return {
    type: FLIGHT.TIMELINE.FINISH.REMOVE,
    payload
  };
}