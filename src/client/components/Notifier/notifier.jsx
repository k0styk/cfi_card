import React from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { notifyAction } from '@redux/actions';

let displayed = [];

const Notifier = ({
  notify,
  removeSnackbar
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed  = id => displayed = [...displayed, id];
  const removeDisplayed = id => displayed = [...displayed.filter(key => id !== key)];

  const defaultOptions = {
    variant: 'info',
    preventDuplicate: true,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  };

  React.useEffect(() => {
    notify.forEach(({ key, message, options, dismissed = false }) => {
      const mergedOpts = {
        ...defaultOptions,
        ...options,
      };

      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      if (displayed.includes(key)) return;

      enqueueSnackbar(message, {
        key,
        ...mergedOpts,
        onClose: (event, reason, myKey) => {
          if (mergedOpts.onClose) {
            mergedOpts.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          removeSnackbar(myKey);
          removeDisplayed(myKey);
        },
      });

      storeDisplayed(key);
    });
  }, [notify, closeSnackbar, enqueueSnackbar]);

  return null;
};

const mstp = state => ({notify: state.notifications});
const mdtp = dispatch => ({
  removeSnackbar: (...args) => dispatch(notifyAction.removeSnackbar(...args))
});

export default connect(mstp, mdtp)(Notifier);

/*

// on connection loss
const key = props.enqueueSnackbar('No connection!', { 
    variant: 'error',
    persist: true,
});

// when we're back online
props.closeSnackbar(key);

*/