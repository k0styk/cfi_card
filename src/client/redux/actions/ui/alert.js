// @ts-check
import { UI } from '../../types';

export default {
  /**
   * @param {{ message: string, open: boolean, severity: string}} payload
   */
  setAlert: payload => ({type: UI.ALERT_SET, payload})
};