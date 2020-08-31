import './login.scss';
import React from 'react';
import { connect } from 'react-redux';
import { userAction, uiAction } from '../../redux/actions';
import { user as userEvents } from '../../Events';

import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  marginSides: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
}));

const LoginPage = ({ socket, setUser, removeUser, notify, history }) => {
  const classes = useStyles();
  const loginRef = React.createRef();
  const passwordRef = React.createRef();

  const logoutUser = () => {
    socket.emit(userEvents.logout, {}, ({ eventName, message }) => {
      if (eventName === userEvents.logout_err) {
        console.error(message);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
      if (eventName === userEvents.logout_success) {
        console.log(message);

        removeUser();
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'success',
          }
        });
      }
    });
  };

  const loginUser = () => {
    const login = loginRef.current.value;
    const password = passwordRef.current.value;

    socket.emit(userEvents.login, {login,password}, ({eventName,message,token}) => {
      if (eventName === userEvents.login_err) {
        console.error(message);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
      if (eventName === userEvents.login_success) {
        console.log(message);
        const payload = JSON.parse(atob(token.split('.')[1]));

        setUser(payload);
        setTimeout(() => history.push('/'),1200);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'success',
          }
        });
      }
    });
  };

  return (
    <div className='card'>
      <div className='cardHeader'>Авторизация</div>
      <div className='cardBody'>
        <div className={classes.marginSides}>
          <TextField
            fullWidth
            label="Логин"
            inputProps={{
              ref: loginRef,
              maxLength: 30,
              name: 'login',
            }}
          />
        </div>
        <div className={classes.marginSides}>
          <TextField
            fullWidth
            label="Пароль"
            inputProps={{
              ref: passwordRef,
              maxLength: 30,
              type: 'password',
              name: 'password',
            }}
          />
        </div>
      </div>
      <div className="button-block">
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={loginUser}
        >
          ВОЙТИ
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={logoutUser}
        >
          ВЫЙТИ
        </Button>
      </div>
    </div>
  );
};

const mstp = ({socket}) => ({
  socket
});

const mdtp = dispatch => ({
  setUser:    (...args)   => dispatch(userAction.setUser(...args)),
  removeUser: ()          => dispatch(userAction.removeUser()),
  notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(LoginPage);