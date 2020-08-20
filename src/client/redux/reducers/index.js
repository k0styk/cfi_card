import { combineReducers }    from 'redux';
import { socket }             from './socket';
import { date }               from './date';
import { summary }            from './summary';
import { notifications }      from './notifications';
import ui from './ui/';
// import  entities              from './entities';

export default combineReducers({
  socket,
  summary,
  date,
  ui,
  notifications,
  // entities
});