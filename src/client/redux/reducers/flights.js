// @ts-check
import { FLIGHT, INIT } from '../types';
const cancelState = { state: false, time: {} },
  aircraftState = { type: '', number: '', flight: '', literal: '' },
  airportState = { name: '', type: '' },
  departTimeState = { planned: null, actual: null, deffered: null, };
const initState = {
  archive: false,
  cancel: cancelState,
  aircraft: aircraftState,
  airport: airportState,
  departTime: departTimeState,
  time: null,
  timeline: {
    columnPage: 0,
    counter: 0,
    value: []
  }
};

export function flights(state = [], action) {
  switch (action.type) {
    case FLIGHT.SORT_SET:
      console.log(action);
      return action.payload.flights;
    case FLIGHT.ADD:
      return [
        ...state,
        {
          ...initState,
          id: action.payload.id,
          create: action.payload.create
        }
      ];
    case FLIGHT.REMOVE:
      return state.filter(item => !(item.id === action.payload));
    case FLIGHT.CANCEL_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            cancel: {
              state: true,
              time: action.payload.time
            }
          };
        }
        return item;
      });
    case FLIGHT.CANCEL_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            cancel: cancelState
          };
        }
        return item;
      });
    case FLIGHT.ARCHIVE_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            archive: action.payload.archive
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.INC_PAGE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              columnPage: item.timeline.columnPage + 1
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DEC_PAGE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              columnPage: item.timeline.columnPage + 1
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.SET_PAGE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              columnPage: action.payload.columnPage
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.TYPE_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              type: action.payload.type,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.TYPE_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              type: aircraftState.type,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.NUMBER_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              number: action.payload.number,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.NUMBER_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              number: aircraftState.number,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.FLIGHT_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              flight: action.payload.flight,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.FLIGHT_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              flight: aircraftState.flight
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.LITERAL_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              literal: action.payload.literal,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRCRAFT.LITERAL_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            aircraft: {
              ...item.aircraft,
              literal: aircraftState.literal,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRPORT.NAME_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            airport: {
              ...item.airport,
              name: action.payload.name,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRPORT.NAME_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            airport: {
              ...item.airport,
              name: airportState.name,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRPORT.TYPE_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            airport: {
              ...item.airport,
              type: action.payload.type,
            }
          };
        }
        return item;
      });
    case FLIGHT.AIRPORT.TYPE_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            airport: {
              ...item.airport,
              type: airportState.type,
            }
          };
        }
        return item;
      });
    case FLIGHT.DEPART.PLANNED_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            departTime: {
              ...item.departTime,
              planned: action.payload.planned,
            }
          };
        }
        return item;
      });
    case FLIGHT.DEPART.PLANNED_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            departTime: {
              ...item.departTime,
              planned: departTimeState.planned,
            }
          };
        }
        return item;
      });
    case FLIGHT.DEPART.ACTUAL_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            departTime: {
              ...item.departTime,
              actual: action.payload.actual,
            }
          };
        }
        return item;
      });
    case FLIGHT.DEPART.ACTUAL_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            departTime: {
              ...item.departTime,
              planned: departTimeState.actual,
            }
          };
        }
        return item;
      });
    case FLIGHT.DEPART.DEFFERED_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            departTime: {
              ...item.departTime,
              deffered: action.payload.deffered,
            }
          };
        }
        return item;
      });
    case FLIGHT.DEPART.DEFFERED_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            departTime: {
              ...item.departTime,
              planned: action.payload.planned,
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ADD:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              counter: item.timeline.counter + 1,
              value: [
                ...item.timeline.value,
                action.payload.timeline,
              ]
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.filter(elem => !(elem.id === action.payload.timelineId))
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.PLAN_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            time: action.payload.t,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      plan: action.payload.time.plan
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.PLAN_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            time: null,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      plan: null
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.ACTUAL_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            time: null,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      actual: action.payload.time.actual
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.ACTUAL_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          const oldTime = new Date();
          const planTime = item.timeline.value.filter(v => v.id === action.payload.timelineId)[0].time.plan.split(':');

          oldTime.setHours(planTime[0],planTime[1]);
          return {
            ...item,
            time: oldTime,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      actual: null
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.TAKEOFF_TOGGLE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      takeoff: !i.time.takeoff
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.DIRECTION_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      direction: action.payload.time.direction
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.DIRECTION_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      direction: -1
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.LANDING_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      landing: action.payload.time.landing
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.TIME.LANDING_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    time: {
                      ...i.time,
                      landing: null
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ROUTE.SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    route: {
                      ...i.route,
                      ...action.payload.route
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ROUTE.REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    route: {
                      ...i.route,
                      value: []
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ROUTE.HEIGHT_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    route: {
                      ...i.route,
                      ...action.payload.height
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ROUTE.HEIGHT_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    route: {
                      ...i.route,
                      height: null
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ROUTE.UNIT_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    route: {
                      ...i.time,
                      ...action.payload.unit
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.ROUTE.UNIT_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    route: {
                      ...i.route,
                      unit: 'm'
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.DIRECTION_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      value: action.payload.direction.value
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.DIRECTION_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      value: -1
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.HEIGHT_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      height: action.payload.direction.height
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.HEIGHT_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      height: ''
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.AIRPORT_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      airport: action.payload.airport
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.AIRPORT_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      airport: -1
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.COMPASS_SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      compass: action.payload.direction.compass
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.DIRECTION.COMPASS_REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    direction: {
                      ...i.direction,
                      compass: null
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.BROADCAST.SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    broadcast: {
                      ...i.broadcast,
                      ...action.payload.broadcast
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.BROADCAST.REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    broadcast: {
                      ...i.broadcast,
                      value: -1
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.BROADCAST.CHECK:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    broadcast: {
                      ...i.broadcast,
                      ...action.payload.broadcast
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.SPECIAL.SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    special: {
                      ...i.special,
                      value: action.payload.special.value
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.SPECIAL.SET_HEIGHT:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    special: {
                      ...i.special,
                      height: action.payload.special.height
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.SPECIAL.REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    special: {
                      ...i.special,
                      value: -1,
                      height: null
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.FINISH.SET:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    finish: {
                      ...i.finish,
                      ...action.payload.finish
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case FLIGHT.TIMELINE.FINISH.REMOVE:
      return state.map((item, index) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            timeline: {
              ...item.timeline,
              value: item.timeline.value.map((i, idx) => {
                if(i.id === action.payload.timelineId) {
                  return {
                    ...i,
                    finish: {
                      ...i.finish,
                      value: -1
                    }
                  };
                }
                return i;
              })
            }
          };
        }
        return item;
      });
    case INIT.INITIAL_ALL:
      if (action.payload.flights) {
        return action.payload.flights;
      } else {
        return state;
      }
    default:
      return state;
  };
}