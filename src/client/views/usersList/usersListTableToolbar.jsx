import React from 'react';

import { makeStyles, lighten } from '@material-ui/core/styles';
import { Toolbar, Typography, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    background: '#CCCCCC',
  },
  button: {
    margin: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ?
      {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      :
      {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  titleButtonBlock: {
    flex: '1 0 auto',
  },
}));

const SummariesTableToolbar = ({registerUser}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      {
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Пользователи
        </Typography>
      }
      {
        <div className={classes.titleButtonBlock}>
          <Button
            onClick={registerUser}
            startIcon={<Add />}
            variant="contained"
            color="primary"
          >
            добавить пользователя
          </Button>
        </div>
      }
    </Toolbar>
  );
};

export default SummariesTableToolbar;