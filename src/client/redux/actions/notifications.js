// @ts-check
import { NOTIFY } from '../types';

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
export function enqueueSnackbar(notification) {
  const key = notification.options && notification.options.key;
  const newVal = {
    ...notification,
    key: key || new Date().getTime() + Math.random()
  };

  return {
    type: NOTIFY.ENQUEUE_SNACKBAR,
    notification: newVal
  };
};

export function closeSnackbar(key) {
  return {
    type: NOTIFY.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  };
};

export function removeSnackbar(key) {
  return {
    type: NOTIFY.REMOVE_SNACKBAR,
    key,
  };
};
