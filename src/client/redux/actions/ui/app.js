import { UI } from '@redux/types';

export default {
  /**
   * @param {{ connected: boolean}} payload
   */
  setConnection: payload => ({type: UI.APP.CONNECTION, payload}),
  /**
   * @param {{ archive: boolean}} payload
   */
  setArchive: payload => ({type: UI.APP.ARCHIVE, payload}),
  /**
   * @param {{ uiLoader: boolean}} payload
   */
  setLoader: payload => ({type: UI.APP.LOADER, payload}),
};