import { UI } from '@redux/types';

export default {
  /**
   * @param {{ connected: boolean}} payload
   */
  setConnection: payload => ({type: UI.APP.CONNECTION, payload}),
  /**
   * @param {{ archieve: boolean}} payload
   */
  setArchieve: payload => ({type: UI.APP.ARCHIEVE, payload}),
  /**
   * @param {{ uiLoader: boolean}} payload
   */
  setLoader: payload => ({type: UI.APP.LOADER, payload}),
};