import { UI } from '../../types';

export function tableRowAdd(payload) {
  return {
    type: UI.TABLE.ROW_ADD,
    payload
  };
}

export function tableRowRemove(payload) {
  return {
    type: UI.TABLE.ROW_REMOVE,
    payload
  };
}

export function tableRowIncrementPage() {
  return {
    type: UI.TABLE.ROW_INC_PAGE
  };
}

export function tableRowDecrementPage() {
  return {
    type: UI.TABLE.ROW_DEC_PAGE
  };
}

export function tableRowSetPage(payload) {
  return {
    type: UI.TABLE.ROW_SET_PAGE,
    payload
  };
}

export function aircraftTypeVisible(payload) {
  return {
    type: UI.TABLE.AIRCRAFT_TYPE_VISIBLE,
    payload
  };
}

export function aircraftNumberVisible(payload) {
  return {
    type: UI.TABLE.AIRCRAFT_NUMBER_VISIBLE,
    payload
  };
}

export function airportVisible(payload) {
  return {
    type: UI.TABLE.AIRPORT_VISIBLE,
    payload
  };
}

export function departTimeVisible(payload) {
  return {
    type: UI.TABLE.DEPART_TIME_VISIBLE,
    payload
  };
}

export function archiveSet(payload) {
  return {
    type: UI.TABLE.ARCHIVE_SET,
    payload
  };
}