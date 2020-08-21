import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faDolly } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const conAdd = ({connected, archieve, socket, addSummary}) => {
  const classes = useStyles();

  return connected?(archieve?
    (
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => addSummary()}
      >
        <FontAwesomeIcon icon={faDolly} className={classes.extendedIcon}/>
        Отправить на сервер
      </Fab>
    ):
    (
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => addSummary()}
      >
        <AddIcon className={classes.extendedIcon}/>
        Добавить сводку
      </Fab>
    )):
    (
      <Fab
        variant="extended"
        size="medium"
        color="default"
        aria-label="add"
        className={classes.margin}
        onClick={() => socket.connect()}
      >
        <FontAwesomeIcon icon={faPlug} className={classes.extendedIcon}/>
        Подключиться
      </Fab>
    );
};

const mstp = state => ({
  archieve: state.ui.app.archieve,
  connected: state.ui.app.connected,
  socket: state.socket
});

const mdtp = dispatch => ({
  addSummary: () =>  dispatch(summaryAction.addSummary()),
});

export default connect(mstp, mdtp)(conAdd);