import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

const userView = ({user}) => {
  const classes = useStyles();

  return (
    <div className="user-view">
      {user.displayName || user.login}
    </div>
  );
};

const mstp = state => ({
  user: state.user
});

const mdtp = dispatch => ({});

export default connect(mstp, mdtp)(userView);