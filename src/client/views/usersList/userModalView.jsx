import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
import { user as userEvents } from '@client/Events';

import {
  MenuItem,TextField, Button, InputLabel, Tooltip,
  InputAdornment, IconButton, Input, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff, Filter9Plus } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  floatBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatBtnDisabled: {
    display: 'none'
  },
  pswdOff: {
    opacity: 0,
    userSelect: 'none',
    pointerEvents: 'none'
  }
}));

const defaultValues = {
  login: '',
  description: '',
  displayName: '',
  department: '',
  rights: '',
  password: '',
};

const UsersListView = ({
  user,
  userInfo,
  socket,
  notify,
  open,
  handleClose
}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState(defaultValues);
  const [changePass, setChangePass] = React.useState(true);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = event => event.preventDefault();
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const handleGenPass = () => {
    const passwordLength = 7;
    const getSpecSymbol = () => {
      const specSymbols = [64, 35, 36, 37, 38, 42, 94];

      return String.fromCharCode(specSymbols[getRandom(0,specSymbols.length-1)]); // '@#$%&*^'
    };
    const position = getRandom(0,5);
    let pass = '';

    for (let i = 0; i < passwordLength; i++) {
      if(position === 0 && i === 0) pass+=getSpecSymbol();
      if(position === 1 && i === passwordLength/2) pass+=getSpecSymbol();
      pass += String.fromCharCode(getRandom(65,122));
      if(position === 2 && i === passwordLength-1) pass+=getSpecSymbol();
      if((position === 3||position === 4||position === 5) && i === passwordLength-1)
        pass += String.fromCharCode(getRandom(65,122));
    }
    setValues({ ...values, password: pass });
  };

  const handleDelete = () => {
    if(confirm('Вы точно хотите удалить пользователя?')) {
      socketEmitter({_id: values._id, login: values.login},
        userEvents.delete,userEvents.delete_err,userEvents.delete_success);
    }
  };

  const socketEmitter = (formData,emitMessage, emitMessageErr, emitMessageSuccess) => {
    socket.emit(emitMessage, formData, ({ eventName, message }) => {
      if (eventName === emitMessageErr) {
        console.error(message);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
      if (eventName === emitMessageSuccess) {
        console.log(message);
        handleClose(true);
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

  const handleSave = e => {
    e.preventDefault();
    if(userInfo) {
      // EDIT USER
      socketEmitter({...values},userEvents.edit,userEvents.edit_err,userEvents.edit_success);
    } else {
      // REGISTER USER
      socketEmitter({...values},userEvents.register,userEvents.register_err,userEvents.register_success);
    }
  };

  React.useLayoutEffect(() => {
    setValues({...defaultValues,...userInfo});
    setChangePass(!!!userInfo);
  }, [userInfo]);

  return (<React.Fragment>
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="xs"
      scroll="paper"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">{true ? 'Редактирование' : 'Создание нового пользователя'}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Информация о пользователе</DialogContentText>
        <form className={classes.form} onSubmit={handleSave}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="login">Логин</InputLabel>
            <Input
              fullWidth
              maxLength="30"
              id="login"
              value={values.login}
              onChange={handleChange('login')}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            fullWidth
            margin="normal"
          >
            {changePass?null:
              (<Button
                fullWidth
                className={changePass?classes.floatBtnDisabled:classes.floatBtn}
                variant="outlined"
                color="secondary"
                onClick={() => setChangePass(true)}
              >
                изменить пароль
              </Button>)}
            <InputLabel className={changePass?'':classes.pswdOff} htmlFor="password">Пароль</InputLabel>
            <Input
              tabIndex="-1"
              className={changePass?'':classes.pswdOff}
              disabled={!changePass}
              fullWidth
              maxLength="30"
              id="password"
              type="text"
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <Tooltip title="Сгенерировать пароль">
                    <IconButton
                      tabIndex="-1"
                      aria-label="generate password"
                      component="span"
                      onClick={handleGenPass}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <Filter9Plus />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            fullWidth
            margin="normal"
          >
            <InputLabel htmlFor="displayName">Отображаемое имя</InputLabel>
            <Input
              fullWidth
              autoComplete="off"
              maxLength="30"
              id="displayName"
              value={values.displayName}
              onChange={handleChange('displayName')}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            fullWidth
            margin="normal"
          >
            <InputLabel htmlFor="description">Описание</InputLabel>
            <Input
              fullWidth
              autoComplete="off"
              maxLength="30"
              id="description"
              value={values.description}
              onChange={handleChange('description')}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            fullWidth
            margin="normal"
          >
            <InputLabel htmlFor="department">Подразделение</InputLabel>
            <Input
              fullWidth
              autoComplete="off"
              maxLength="30"
              id="department"
              value={values.department}
              onChange={handleChange('department')}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            fullWidth
            margin="normal"
          >
            <TextField
              fullWidth
              id="rights"
              label="Роль"
              value={values.rights ? values.rights : ''}
              onChange={handleChange('rights')}
              select
            >
              {
                ['user', 'manager', user.rights === 'admin' ? 'admin' : ''].map(v =>
                  v ? <MenuItem key={v} value={v}>{v}</MenuItem> : null)
              }
            </TextField>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">
          Удалить
        </Button>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>);
};

export default connect(
  ({socket,user}) => ({
    user,
    socket,
  }),
  dispatch => ({
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  })
)(UsersListView);