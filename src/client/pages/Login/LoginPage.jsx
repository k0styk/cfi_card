import './login.scss';
import React from 'react';
import { connect } from 'react-redux';
import { userAction, uiAction } from '../../redux/actions';
import { user as userEvents } from '../../Events';

import {
  CircularProgress, Button, InputLabel, Backdrop,
  InputAdornment, IconButton, Input, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LoginPage = ({ socket, setUser, removeUser, notify, history }) => {
  const classes = useStyles();
  const [loader, setLoader] = React.useState(false);
  const [values, setValues] = React.useState({
    login: '',
    password: '',
    showPassword: false,
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

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

        localStorage.clear();
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
  const loginUser = e => {
    e.preventDefault();
    setLoader(true);
    const { login, password } = values;

    setTimeout(() => {
      try {
        socket.emit(userEvents.login, { login, password }, ({ eventName, message, token }) => {
          if (eventName === userEvents.login_err) {
            console.error(message);
            notify({
              message,
              options: {
                autoHideDuration: 1500,
                variant: 'error',
              }
            });
            setLoader(false);
          }
          if (eventName === userEvents.login_success) {
            console.log(message);
            const payload = JSON.parse(atob(token.split('.')[1]));

            localStorage.setItem('userId', payload.id);
            setUser(payload);
            notify({
              message,
              options: {
                autoHideDuration: 1500,
                variant: 'success',
              }
            });
            setTimeout(() => history.push('/'), 600);
            setLoader(false);
          }
        });
      } catch(err) {
        console.error(err);
        setLoader(false);
        notify({
          message: 'Упс...',
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
    },700);
  };

  return (
    <React.Fragment>
      <form onSubmit={loginUser}>
        <div className='card'>
          <div className='cardHeader'>Авторизация</div>
          <div className='cardBody'>
            <div className={classes.marginSides}>
              <FormControl fullWidth>
                <InputLabel htmlFor="login">Логин</InputLabel>
                <Input
                  fullWidth
                  maxLength="30"
                  id="login"
                  value={values.login}
                  onChange={handleChange('login')}
                />
              </FormControl>
            </div>
            <div className={classes.marginSides}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Пароль</InputLabel>
                <Input
                  fullWidth
                  maxLength="30"
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className="button-block">
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              ВОЙТИ
            </Button>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={logoutUser}
            >
              ВЫЙТИ
            </Button>
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={loader} onClick={() => setLoader(false)}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </form>
    </React.Fragment>
  );
};

const mstp = ({ socket }) => ({
  socket
});

const mdtp = dispatch => ({
  setUser:    (...args)   => dispatch(userAction.setUser(...args)),
  removeUser: ()          => dispatch(userAction.removeUser()),
  notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(LoginPage);