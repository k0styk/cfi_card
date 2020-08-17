import * as t from '../types';

export function action2FetchDataSuccess(data) {
  return {
    type: t.CONSTANT_NAME,
    data
  };
}

export function action2FetchDataError(err) {
  return {
    type: t.CONSTANT_NAME_ERROR,
    err
  };
}

export function action2FetchDataLoading(state) {
  return {
    type: t.CONSTANT_NAME_LOADING,
    state
  };
}

export function action2FetchData(urlApi) {
  return dispatch => {
    dispatch(action2FetchDataLoading(true));
    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        dispatch(action2FetchDataLoading(false));
        dispatch(action2FetchDataSuccess(data));
      })
      .catch(err => {
        dispatch(action2FetchDataSuccess(err));
        dispatch(action2FetchDataLoading(false));
        console.error(err);
      });
  };
}