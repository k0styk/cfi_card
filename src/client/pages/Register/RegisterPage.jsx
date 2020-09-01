import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '../../redux/actions';
import { user as userEvents } from '../../Events';

import {
  MenuItem,TextField, Button, InputLabel, Backdrop,
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
  }
}));

const RegisterPage = ({ history, socket, notify, user }) => {
  const classes = useStyles();
  const defaultValues = {
    login: '',
    password: '',
    showPassword: false,
    description: '',
    displayName: '',
    department: '',
    rights: undefined,
  };
  const [values, setValues] = React.useState(defaultValues);
  const handleChange = prop => event => {
    console.log(event.target);
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const registerUser = e => {
    e.preventDefault();
    const formData = {...values};

    delete formData.showPassword;
    socket.emit(userEvents.register, formData, ({ eventName, message }) => {
      if (eventName === userEvents.register_err) {
        console.error(message);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
      if (eventName === userEvents.register_success) {
        console.log(message);
        setValues(defaultValues);
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
    <form onSubmit={registerUser}>
      <div className='card'>
        <div className='cardHeader'>Регистрация</div>
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
          <div className={classes.marginSides}>
            <FormControl fullWidth>
              <InputLabel htmlFor="displayName">Отображаемое имя</InputLabel>
              <Input
                fullWidth
                maxLength="30"
                id="displayName"
                value={values.displayName}
                onChange={handleChange('displayName')}
              />
            </FormControl>
          </div>
          <div className={classes.marginSides}>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Описание</InputLabel>
              <Input
                fullWidth
                maxLength="30"
                id="description"
                value={values.description}
                onChange={handleChange('description')}
              />
            </FormControl>
          </div>
          <div className={classes.marginSides}>
            <FormControl fullWidth>
              <InputLabel htmlFor="department">Подразделение</InputLabel>
              <Input
                fullWidth
                maxLength="30"
                id="department"
                value={values.department}
                onChange={handleChange('department')}
              />
            </FormControl>
          </div>
          {user.rights === 'admin' || user.rights === 'manager' ? <div className={classes.marginSides}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="rights"
                label="Роль"
                value={values.rights?values.rights:''}
                onChange={handleChange('rights')}
                select
              >
                {['user', 'manager', user.rights === 'admin'?'admin':''].map((v, i) =>
                  v?<MenuItem disabled={(v === 'G' && !!z2l)} key={v} value={v}>{v}</MenuItem>:null)
                }
              </TextField>
            </FormControl>
          </div> : null}
          <div className="button-block">
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              Зарегистрировать
            </Button>
          </div>
          {/* <button onClick={registerUser}>Зарегистрировать</button> */}
        </div>
      </div>
    </form>
  );
};

const mstp = ({ socket, user }) => ({
  socket,
  user
});

const mdtp = dispatch => ({
  notify: (...args) => dispatch(uiAction.notify.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(RegisterPage);