import { ENTITIES, INIT } from '@redux/types';
import { entities } from '@client/Events';
const initialState = [];

export function routes(state = initialState, action) {
  switch (action.type) {
    case ENTITIES.ROUTES.ADD:
      console.log('ENTI');
      console.log(action);
      const arr = [...state, ...action.payload];

      console.log(arr);

      return arr.filter((v, i) => arr.indexOf(v) === i);
    case entities.ROUTES.ADD:
      const newArr = [...state, ...action.payload];

      return newArr.filter((v, i) => newArr.indexOf(v) === i);
    case ENTITIES.ROUTES.UPDATE:
      return arr.filter((v, i) => arr.indexOf(v) === i);
    case ENTITIES.ROUTES.DELETE:
      return state.filter((val, idx) => idx!==action.payload);
    case INIT.INITIAL_ALL:
      return action.payload.entities.routes;
  }
  return state;
}