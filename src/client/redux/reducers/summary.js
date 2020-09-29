import { SUMMARY, Z1, Z2, Z3 } from '../types';
const z1State = {
  flyDate: `${('0'+new Date().getUTCDate()).slice(-2)}/${('0'+(new Date().getUTCMonth() + 1)).slice(-2)}/${new Date().getUTCFullYear().toString().slice(-2)}`, // eslint-disable-line
  acftIdent: '',
  aircraftType: '',
  depAirport: '',
  destAirport: '',
  entryPoint: '',
  entryTime: `${('0'+(new Date().getUTCHours() + 1)).slice(-2)}:${('0'+(new Date().getUTCMinutes() + 1)).slice(-2)}`,
  exitPoint: '',
  regno: '',
  errors: {
    flyDate: '',
    acftIdent: '',
    aircraftType: '',
    depAirport: '',
    destAirport: '',
    entryTime: '',
  },
  validation:  33,
};
const z2State = {
  code: '',
  entryPoint: '',
  entryTime: `${('0'+(new Date().getUTCHours() + 1)).slice(-2)}:${('0'+(new Date().getUTCMinutes() + 1)).slice(-2)}`,
  exitPoint: '',
  exitTime: `${('0'+(new Date().getUTCHours() + 1)).slice(-2)}:${('0'+(new Date().getUTCMinutes() + 1)).slice(-2)}`,
  // flyCtg: '',
  // countOfDep: '',
  // countOfApp: '',
  errors: {},
  validation: 20
};
const z3State = {
  airspaceType: '',
  aircraftTypeName: '',
  depAirportCoord: '',
  destAirportCoord: '',
  // airspaceTypeGTime: null,
  errors: {},
  validation: 0
};
const initialState = {
  counter: 1,
  value: []
};

export function summary(state = initialState, action) {
  const p = action.payload;

  switch (action.type) {
    /* -----              SUMMARY START                                 ----- */
    case SUMMARY.SET:
      return {
        ...state,
        value: action.payload
      };
    case SUMMARY.ADD:
      const newVal = {
        id: state.counter,
        archive: false,
        counter: 1,
        fieldValidation: 0, // значение валидатора по полям
        factValidation: 0, // какое значение валидации необходимо
        z1: z1State,
        z2: [],
        z3: z3State
      };

      return {
        ...state,
        counter: state.counter+1,
        value: [...state.value, newVal]
      };
    case SUMMARY.REMOVE:
      return {
        ...state,
        value: state.value.filter(i => i.id !== p.id)
      };
    case SUMMARY.ARCHIVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              archive: p.archive
            };
          }
          return v;
        })
      };
    case SUMMARY.ADD_Z2:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              counter: v.counter + 1,
              z2: [...v.z2, { id: v.counter, ...z2State }]
            };
          }
          return v;
        })
      };
    case SUMMARY.REMOVE_Z2:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.filter(i => i.id !== p.z2id)
            };
          }
          return v;
        })
      };
    case SUMMARY.VALIDATION_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              fieldValidation: p.fieldValidation,
              factValidation: p.factValidation
            };
          }
          return v;
        })
      };
    /* -----              SUMMARY END                                   ----- */
    /* -----              Z1 START                                      ----- */
    case Z1.VALIDATION_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                validation: p.state
              }
            };
          }
          return v;
        })
      };
    case Z1.ERROR_SET:
      return {
        ...state,
        value: state.value.map((v, i) => {
          if (v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                errors: {
                  ...v.z1.errors,
                  ...p.field
                }
              }
            };
          }
          return v;
        })
      };
    case Z1.FLYDATE_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
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
          if(v.id === p.id) {
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
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                acftIdent: p.acftIdent
              }
            };
          }
          return v;
        })
      };
    case Z1.ACFTIDENT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                acft: z1State.acftIdent
              }
            };
          }
          return v;
        })
      };
    case Z1.AIRCRAFTTYPE_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                aircraftType: p.aircraftType
              }
            };
          }
          return v;
        })
      };
    case Z1.AIRCRAFTTYPE_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                aircraftType: z1State.aircraftType
              }
            };
          }
          return v;
        })
      };
    case Z1.DEPAIRPORT_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                depAirport: p.depAirport
              }
            };
          }
          return v;
        })
      };
    case Z1.DEPAIRPORT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                depAirport: z1State.depAirport
              }
            };
          }
          return v;
        })
      };
    case Z1.DESTAIRPORT_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                destAirport: p.destAirport
              }
            };
          }
          return v;
        })
      };
    case Z1.DESTAIRPORT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                destAirport: z1State.destAirport
              }
            };
          }
          return v;
        })
      };
    case Z1.ENTRYPOINT_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                entryPoint: p.entryPoint
              }
            };
          }
          return v;
        })
      };
    case Z1.ENTRYPOINT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                entryPoint: z1State.entryPoint
              }
            };
          }
          return v;
        })
      };
    case Z1.ENTRYTIME_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                entryTime: p.entryTime
              }
            };
          }
          return v;
        })
      };
    case Z1.ENTRYTIME_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                entryTime: z1State.entryTime
              }
            };
          }
          return v;
        })
      };
    case Z1.EXITPOINT_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                exitPoint: p.exitPoint
              }
            };
          }
          return v;
        })
      };
    case Z1.EXITPOINT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                exitPoint: z1State.exitPoint
              }
            };
          }
          return v;
        })
      };
    case Z1.REGNO_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                regno: p.regno
              }
            };
          }
          return v;
        })
      };
    case Z1.REGNO_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z1: {
                ...v.z1,
                regno: z1State.regno
              }
            };
          }
          return v;
        })
      };
    /* -----              Z1 END                                        ----- */
    /* -----              Z2 START                                      ----- */
    case Z2.VALIDATION_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    validation: p.state
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.ERROR_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    errors: {
                      ...z2v.errors,
                      ...p.field
                    }
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.CODE_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    code: p.code
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.CODE_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    code: z2State.code
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.ENTRYPOINT_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    entryPoint: p.entryPoint
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.ENTRYPOINT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    entryPoint: z2State.entryPoint
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.ENTRYTIME_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    entryTime: p.entryTime
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.ENTRYTIME_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    entryTime: z2State.entryTime
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.EXITPOINT_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    exitPoint: p.exitPoint
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.EXITPOINT_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    exitPoint: z2State.exitPoint
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.EXITTIME_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    exitTime: p.exitTime
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.EXITTIME_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    exitTime: z2State.exitTime
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.FLYCTG_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    flyCtg: p.flyCtg
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.FLYCTG_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    flyCtg: z2State.flyCtg
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.COUNTOFDEP_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    countOfDep: p.countOfDep
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.COUNTOFDEP_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    countOfDep: z2State.countOfDep
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.COUNTOFAPP_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    countOfApp: p.countOfApp
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    case Z2.COUNTOFAPP_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z2: v.z2.map(z2v => {
                if(z2v.id === p.z2id) {
                  return {
                    ...z2v,
                    countOfApp: z2State.countOfApp
                  };
                }
                return z2v;
              })
            };
          }
          return v;
        })
      };
    /* -----              Z2 END                                        ----- */
    /* -----              Z3 START                                      ----- */
    case Z3.VALIDATION_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                validation: p.state
              }
            };
          }
          return v;
        })
      };
    case Z3.ERROR_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                errors: {
                  ...v.z3.errors,
                  ...p.field
                }
              }
            };
          }
          return v;
        })
      };
    case Z3.AIRSPACETYPE_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                airspaceType: p.airspaceType
              }
            };
          }
          return v;
        })
      };
    case Z3.AIRSPACETYPE_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                airspaceType: z3State.airspaceType
              }
            };
          }
          return v;
        })
      };
    case Z3.AIRCRAFTTYPENAME_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                aircraftTypeName: p.aircraftTypeName
              }
            };
          }
          return v;
        })
      };
    case Z3.AIRCRAFTTYPENAME_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                aircraftTypeName: z3State.aircraftTypeName
              }
            };
          }
          return v;
        })
      };
    case Z3.DEPAIRPORTCOORD_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                depAirportCoord: p.depAirportCoord
              }
            };
          }
          return v;
        })
      };
    case Z3.DEPAIRPORTCOORD_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                depAirportCoord: z3State.depAirportCoord
              }
            };
          }
          return v;
        })
      };
    case Z3.DESTAIRPORTCOORD_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                destAirportCoord: p.destAirportCoord
              }
            };
          }
          return v;
        })
      };
    case Z3.DESTAIRPORTCOORD_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                destAirportCoord: z3State.destAirportCoord
              }
            };
          }
          return v;
        })
      };
    case Z3.AIRSPACETYPEGTIME_SET:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                airspaceTypeGTime: p.airspaceTypeGTime
              }
            };
          }
          return v;
        })
      };
    case Z3.AIRSPACETYPEGTIME_REMOVE:
      return {
        ...state,
        value: state.value.map((v,i) => {
          if(v.id === p.id) {
            return {
              ...v,
              z3: {
                ...v.z3,
                airspaceTypeGTime: z3State.airspaceTypeGTime
              }
            };
          }
          return v;
        })
      };
    /* -----              Z3 END                                        ----- */
    default: return state;
  }
}