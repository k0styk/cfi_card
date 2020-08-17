import { UI, INIT, FLIGHT } from '../../types';
const initialState = {
  archive: false,
  counter: 0,
  sort: false,
  visibleColumns: 8,
  visibleRows: 8,
  rowPage: 0,
  aircraftTypeVisible: true,
  aircraftNumberVisible: true,
  airportVisible: true,
  departTimeVisible: true,
};

export function table(state = initialState, action) {
  switch (action.type) {
    case FLIGHT.ADD:
      return {
        ...state,
        counter: state.counter+1
      };
    case FLIGHT.SORT_SET:
      return {
        ...state,
        sort: action.payload.state
      };
    case UI.TABLE.ROW_INC_PAGE:
      return {
        ...state,
        rowPage: state.rowPage + 1
      };
    case UI.TABLE.ROW_DEC_PAGE:
      return {
        ...state,
        rowPage: state.rowPage - 1
      };
    case UI.TABLE.ROW_SET_PAGE:
      return {
        ...state,
        rowPage: action.payload
      };
    case UI.TABLE.AIRCRAFT_TYPE_VISIBLE:
      return {
        ...state,
        aircraftTypeVisible: action.payload
      };
    case UI.TABLE.AIRCRAFT_NUMBER_VISIBLE:
      return {
        ...state,
        aircraftNumberVisible: action.payload
      };
    case UI.TABLE.AIRPORT_VISIBLE:
      return {
        ...state,
        airportVisible: action.payload
      };
    case UI.TABLE.DEPART_TIME_VISIBLE:
      return {
        ...state,
        departTimeVisible: action.payload
      };
    case UI.TABLE.ARCHIVE_SET:
      return {
        ...state,
        archive: action.payload
      };
    case INIT.INITIAL_ALL:
      if (action.payload.ui.table) {
        return action.payload.ui.table;
      } else {
        return state;
      }
  }
  return state;
}