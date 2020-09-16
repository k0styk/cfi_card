import './login.scss';
import React from 'react';
import { connect } from 'react-redux';
import { userAction, uiAction } from '../../redux/actions';
import { user as userEvents } from '../../Events';

import {
  Button, InputLabel, InputAdornment,
  IconButton, Input, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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

const LoginPage = ({socket,setUser,logout,notify,setLoader}) => {
  const history = useHistory();
  const classes = useStyles();
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
        logout();
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

            localStorage.setItem('user', JSON.stringify(payload));
            localStorage.setItem('userId', payload.id);
            setUser(payload);
            notify({
              message,
              options: {
                autoHideDuration: 1500,
                variant: 'success',
              }
            });
            setTimeout(() => history.replace('/summary'), 600);
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
      </form>
    </React.Fragment>
  );
};

export default connect(
  ({ socket }) => ({
    socket
  }),
  dispatch => ({
    setUser:    (...args)   => dispatch(userAction.setUser(...args)),
    logout:     ()          => dispatch(userAction.logoutUser()),
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
    setLoader:  state       => dispatch(uiAction.app.setLoader({uiLoader: state})),
  })
)(LoginPage);