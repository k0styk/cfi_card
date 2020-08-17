import { SUMMARY, Z1, Z2, Z3 } from '../types';
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
const z2State = {
  code: null,
  entryPoint: null,
  entryTime: null,
  exitPoint: null,
  exitTime: null,
  flyCtg: null,
  countOfDep: null,
  countOfApp: null
};
const z3State = {
  airspaceType: null,
  aircraftTypeName: null,
  depAirportCoord: null,
  destAirportCoord: null,
  airspaceTypeGTime: null
};
const initialState = {
  counter: 1,
  value: []
};

export function summary(state = initialState, action) {
  const p = action.payload;

  switch (action.type) {
    /* -----              SUMMARY START                                 ----- */
    case SUMMARY.ADD: {
      const newVal = {
        id: state.counter,
        counter: 1,
        z1: z1State,
        z2: [],
        z3: z3State
      };

      return {
        ...state,
        counter: state.counter+1,
        value: [...state.value, newVal]
      };
    }
    case SUMMARY.REMOVE: {
      return {
        ...state,
        value: state.value.filter(i => i.id !== action.payload.id)
      };
    }
    case SUMMARY.ADD_Z2: {
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === action.payload.id) {
            return {
              ...v,
              counter: v.counter + 1,
              z2: [...v.z2, { id: v.counter, ...z2State }]
            };
          }
          return v;
        })
      };
    }
    case SUMMARY.REMOVE_Z2: {
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === action.payload.id) {
            return {
              ...v,
              z2: v.z2.filter(i => i.id !== action.payload.z2id)
            };
          }
          return v;
        })
      };
    }
    /* -----              SUMMARY END                                   ----- */
    /* -----              Z1 START                                      ----- */
    case Z1.FLYDATE_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === action.payload.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                flyDate: p.flyDate
              }
            };
          }
          return v;
        })
      };
    case Z1.FLYDATE_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === action.payload.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                flyDate: z1State.flyDate
              }
            };
          }
          return v;
        })
      };
    case Z1.ACFTIDENT_SET:
      return {
        ...state,
        acftIdent: action.payload.acftIdent
      };
    case Z1.ACFTIDENT_REMOVE:
      return {
        ...state,
        acftIdent: z1State.acftIdent
      };
    case Z1.AIRCRAFTTYPE_SET:
      return {
        ...state,
        aircraftType: action.payload.aircraftType
      };
    case Z1.AIRCRAFTTYPE_REMOVE:
      return {
        ...state,
        aircraftType: z1State.aircraftType
      };
    case Z1.DEPAIRPORT_SET:
      return {
        ...state,
        depAirport: action.payload.depAirport
      };
    case Z1.DEPAIRPORT_REMOVE:
      return {
        ...state,
        depAirport: z1State.depAirport
      };
    case Z1.DESTAIRPORT_SET:
      return {
        ...state,
        destAirport: action.payload.destAirport
      };
    case Z1.DESTAIRPORT_REMOVE:
      return {
        ...state,
        destAirport: z1State.destAirport
      };
    case Z1.ENTRYPOINT_SET:
      return {
        ...state,
        entryPoint: action.payload.entryPoint
      };
    case Z1.ENTRYPOINT_REMOVE:
      return {
        ...state,
        entryPoint: z1State.entryPoint
      };
    case Z1.ENTRYTIME_SET:
      return {
        ...state,
        entryTime: action.payload.entryTime
      };
    case Z1.ENTRYTIME_REMOVE:
      return {
        ...state,
        entryTime: z1State.entryTime
      };
    case Z1.EXITPOINT_SET:
      return {
        ...state,
        exitPoint: action.payload.exitPoint
      };
    case Z1.EXITPOINT_REMOVE:
      return {
        ...state,
        exitPoint: z1State.exitPoint
      };
    case Z1.REGNO_SET:
      return {
        ...state,
        regno: action.payload.regno
      };
    case Z1.REGNO_REMOVE:
      return {
        ...state,
        regno: z1State.regno
      };
    /* -----              Z1 END                                        ----- */
    /* -----              Z2 START                                      ----- */
    /* -----              Z2 END                                        ----- */
    /* -----              Z3 START                                      ----- */
    /* -----              Z3 END                                        ----- */
    default: return state;
  }
}