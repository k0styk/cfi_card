import { Z1 } from '../../types';
const z1State = {
  flyDate: null,
  acftIdent: null,
  aircraftType: null,
  depAirport: null,
  destAirport: null,
  entryPoint: null,
  entryTime: null,
  exitPoint: null,
  regno: null
};

export function z1(state = z1State, action) {
  switch (action.type) {
    case Z1.DATE_SET:
      return {
        ...state,
        flyDate: action.payload.flyDate
      };
    case Z1.DATE_REMOVE:
      return {
        ...state,
        flyDate: z1State.flyDate
      };
    case Z1.IDX_SET:
      return {
        ...state,
        acftIdent: action.payload.acftIdent
      };
    case Z1.IDX_REMOVE:
      return {
        ...state,
        acftIdent: z1State.acftIdent
      };
    case Z1.AIR_TYPE_SET:
      return {
        ...state,
        aircraftType: action.payload.aircraftType
      };
    case Z1.AIR_TYPE_REMOVE:
      return {
        ...state,
        aircraftType: z1State.aircraftType
      };
    case Z1.DEPART_SET:
      return {
        ...state,
        depAirport: action.payload.depAirport
      };
    case Z1.DEPART_REMOVE:
      return {
        ...state,
        depAirport: z1State.depAirport
      };
    case Z1.LANDING_SET:
      return {
        ...state,
        destAirport: action.payload.destAirport
      };
    case Z1.LANDING_REMOVE:
      return {
        ...state,
        destAirport: z1State.destAirport
      };
    case Z1.ENTRY_POINT_SET:
      return {
        ...state,
        entryPoint: action.payload.entryPoint
      };
    case Z1.ENTRY_POINT_REMOVE:
      return {
        ...state,
        entryPoint: z1State.entryPoint
      };
    case Z1.TIME_SET:
      return {
        ...state,
        entryTime: action.payload.entryTime
      };
    case Z1.TIME_REMOVE:
      return {
        ...state,
        entryTime: z1State.entryTime
      };
    case Z1.EX_POINT_SET:
      return {
        ...state,
        exitPoint: action.payload.exitPoint
      };
    case Z1.EX_POINT_REMOVE:
      return {
        ...state,
        exitPoint: z1State.exitPoint
      };
    case Z1.REG_NUMBER_SET:
      return {
        ...state,
        regno: action.payload.regno
      };
    case Z1.REG_NUMBER_REMOVE:
      return {
        ...state,
        regno: z1State.regno
      };
  }
  return state;
}