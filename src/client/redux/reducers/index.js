import { combineReducers }    from 'redux';
import { socket }             from './socket';
import { date }               from './date';
import { summary }            from './summary';
// import  entities              from './entities';

export default combineReducers({
  socket,
  summary,
  date,
  // entities
});