import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import socket from './socketMiddleWare';
import logger from './logger';
const middleware = [];

middleware.push(socket);
__LOGGER__ && middleware.push(logger);

const persistedState = {}; //loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

// function saveToLocalStorage(state) {
//   try {
//     const serializedState = JSON.stringify(state.summary);

//     localStorage.setItem('summary', serializedState);
//   } catch(e) {
//     console.log(e);
//   }
// }

export default store;

// function loadFromLocalStorage() {
//   try {
//     const serializedState = localStorage.getItem('state');

//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch(e) {
//     console.log(e);
//     return undefined;
//   }
// }