import { ui } from '../../../Events';
import { date } from './ui/index';

export function getDateFromServer() {
  return {
    type: ui.GET_DATE_FROM_SERVER,
    emit: true,
    retAction: date.setDate()
  };
}