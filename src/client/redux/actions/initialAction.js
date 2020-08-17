import { INIT } from '../types';
import { store } from '../../Events';

export function initialAction() {
  return {
    type: store.INITIAL,
    emit: true,
    retAction: { type: INIT.INITIAL_ALL }
  };
}

// export function addAircraft(aircraft, id) {
//   return {
//     type: entities.AIRCRAFTS.ADD,
//     emit: true,
//     retAction: [Add(aircraft), aircraftTypeSet({id, type: -1})]
//   };
// };

// export function sendServer(aircraft, id) {
//   return {
//     type: entities.AIRCRAFTS.ADD,
//     emit: true,
//     payload: { aircraft, id, type: -1},
//     retAction: addAircraft(aircraft, id, -1)
//   };
// };

// export function addAircraft(aircraft, id, type) {
//   return dispatch => {
//     dispatch(Add(aircraft));
//     dispatch(aircraftTypeSet({id, type}));
//   };
// };