import { combineReducers } from 'redux';
import { socket } from './socket';
import { flights }  from './flights';
import { weather }  from './weather';
import { date }  from './date';
import ui from './ui';
import entities  from './entities';
import { summary } from './summary';

export default combineReducers({
  socket,
  // ui,
  // flights,
  // entities,
  // weather,
  summary,
  date
});