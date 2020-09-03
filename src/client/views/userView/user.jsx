import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green, red } from '@material-ui/core/colors';
import { Button, Menu, MenuItem } from '@material-ui/core/';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { userAction, uiAction } from '@redux/actions';
import { user as userEvents } from '../../Events';

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

const userView = ({user, socket, notify, logout}) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSummary = () => {
    handleClose();
    history.replace('/summary');
  };
  const handleProfile = () => {
    handleClose();
  };
  const handleRegister = () => {
    history.replace('/register');
    handleClose();
  };
  const handleUsersList = () => {
    handleClose();
  };
  const handleLogout = () => {
    handleClose();
    if (confirm('Уверены что хотите выйти?')) {
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
          logout();
          history.replace('/');
          notify({
            message,
            options: {
              autoHideDuration: 1500,
              variant: 'success',
            }
          });
        }
      });
    }
  };

  return (
    <div className="user-view">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {user.displayName || user.login}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSummary}>Главная</MenuItem> {/* IFF*/}
        <MenuItem onClick={handleProfile}>Профиль</MenuItem> {/* IFF*/}
        <MenuItem onClick={handleRegister}>Регистрация</MenuItem> {/* IFF*/}
        <MenuItem onClick={handleUsersList}>Список пользователей</MenuItem> {/* IFF*/}
        <MenuItem onClick={handleLogout}>Выход</MenuItem> {/* IFF*/}
      </Menu>
    </div>
  );
};

const mstp = state => ({
  user: state.user,
  socket: state.socket,
});

const mdtp = dispatch => ({
  logout: () => dispatch(userAction.logoutUser()),
  removeUser: ()          => dispatch(userAction.removeUser()),
  notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(userView);