import { combineReducers } from 'redux';
import { specialSymbols } from './specialSymbols';
import { aircrafts } from './aircrafts';
import { timelineTypes } from './timeLineTypes';
import { airports } from './airports';
import { literals } from './literals';
import { directions } from './directions';
import { zones } from './zones';
import { routes } from './routes';
import { finishTypes } from './finishTypes';

export default combineReducers({
  specialSymbols,
  aircrafts,
  timelineTypes,
  airports,
  directions,
  literals,
  routes,
  zones,
  finishTypes
});