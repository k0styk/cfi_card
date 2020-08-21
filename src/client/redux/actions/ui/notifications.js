import { UI } from '@redux/types';

export default {
/**
 * @param {Object} notification
 * @param {string} notification.message - message
 * @param {Object} notification.options - opts
 * @param {any} notification.options.key - key
 * @param {string} notification.options.variant - variant
 * @param {Object} notification.options.anchorOrigin - anchorOrigin
 * @param {string} notification.options.anchorOrigin.vertical - vertical
 * @param {string} notification.options.anchorOrigin.bottom - bottom
 * @param {boolean} notification.options.persist - persist
 * @param {boolean} notification.options.preventDuplicate - preventDuplicate
 * @param {function} notification.options.action - action
 */
  enqueueSnackbar: notification => {
    const key = notification.options && notification.options.key;
    const newVal = {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    };

    return {
      type: UI.NOTIFY.ENQUEUE_SNACKBAR,
      notification: newVal
    };
  },
  /**
  * @param {string} key - if no key, remove all
  */
  closeSnackbar: key => (
    {
      type: UI.NOTIFY.CLOSE_SNACKBAR,
      dismissAll: !key, // dismiss all if no key has been defined
      key,
    }
  ),
  removeSnackbar: key => ({type: UI.NOTIFY.REMOVE_SNACKBAR, key})
};