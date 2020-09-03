import { combineReducers }    from 'redux';
import { socket }             from './socket';
import { date }               from './date';
import { summary }            from './summary';
import { user }               from './user';
import ui from './ui/';
// import  entities              from './entities';

const appReducer = combineReducers({
  socket,
  summary,
  date,
  ui,
  user,
  // entities
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    localStorage.clear();
    state = {
      ...state,
      summary: undefined,
      user: undefined,
    };
  }

  return appReducer(state, action);
};

export default rootReducer;