import { UI } from '@redux/types';

export default {
  /**
   * @param {{ connected: boolean}} payload
   */
  setConnection: payload => ({type: UI.APP.CONNECTION, payload}),
  /**
   * @param {{ archieve: boolean}} payload
   */
  setArchieve: payload => ({type: UI.APP.ARCHIEVE, payload})
};