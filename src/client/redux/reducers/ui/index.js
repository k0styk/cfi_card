import { combineReducers } from 'redux';
import { app } from './app';
import { notifications }      from './notifications';

export default combineReducers({
  app,
  notifications
});