import React from 'react';
import { connect } from 'react-redux';
import { summaryAction, uiAction } from '@redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faDolly } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { useLocation } from 'react-router-dom';

import { summary as summaryEvents } from '../../Events';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const serverButton = ({connected,archieve,socket,addSummary,setLoader,summary}) => {
  const [render, setRender] = React.useState(false);
  const classes = useStyles();
  const location = useLocation();

  React.useEffect(() => {
    setRender(/summary/gi.test(location.pathname));
  }, [location]);

  const handleSave = () => {
    console.log('IMPLEMENT');
  };
  const handleSend = () => {
    try {
      setLoader(true);
      const filteredSummary = summary.value.filter(v => v.archieve === true);

      socket.emit(summaryEvents.save, {summary: filteredSummary}, ({ eventName, notAccepted }) => {
        if (eventName === summaryEvents.save_err) {
          console.error(message);
          setLoader(false);
          notify({
            message,
            options: {
              autoHideDuration: 1500,
              variant: 'error',
            }
          });
        }
        if (eventName === summaryEvents.save_success) {

          setLoader(false);
          notify({
            message,
            options: {
              autoHideDuration: 1500,
              variant: 'success',
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
      setLoader(false);
      notify({
        message: 'Ошибка на сервере...',
        options: {
          autoHideDuration: 1500,
          variant: 'error',
        }
      });
    }
  };

  const Component = () => connected?(render?archieve?
    (
      <div>
        <Button
          variant="contained"
          className={classes.margin}
          onClick={handleSave}
          disabled
        >
          <SaveIcon />
        </Button>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={handleSend}
        >
          <FontAwesomeIcon icon={faDolly} className={classes.extendedIcon} />
          Отправить на сервер
        </Fab>
      </div>
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
    ):null):
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

  return <Component />;
};

export default connect(
  ({socket,ui,summary}) => ({
    archieve: ui.app.archieve,
    connected: ui.app.connected,
    socket,
    summary,
  }),
  dispatch => ({
    addSummary: () =>  dispatch(summaryAction.addSummary()),
    setLoader:  state       => dispatch(uiAction.app.setLoader({uiLoader: state})),
  })
)(serverButton);