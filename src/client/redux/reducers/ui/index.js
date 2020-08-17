import { combineReducers } from 'redux';
import { table } from './table';
import { user } from './user';
import { date } from './date';
import { modal } from './modal';
import { weather } from './weather';

export default combineReducers({
  table,
  user,
  date,
  modal,
  weather
});