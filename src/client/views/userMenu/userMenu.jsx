import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, MenuItem } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';

import { userAction, uiAction } from '@redux/actions';
import { user as userEvents } from '../../Events';

const userMenuView = ({user, socket, notify, logout}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleSummary = () => {
    closeMenu();
    history.replace('/summary');
  };
  const handleProfile = () => {
    closeMenu();
  };
  const handleRegister = () => {
    history.replace('/register');
    closeMenu();
  };
  const handleSummariesList = () => {
    history.replace('/summaries');
    closeMenu();
  };
  const handleLogout = () => {
    closeMenu();
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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
        {user.displayName || user.login}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleSummary}>Главная</MenuItem>
        <MenuItem disabled onClick={handleProfile}>Профиль</MenuItem>
        {
          (user.rights==='manager'||user.rights==='admin')?
            (<MenuItem onClick={handleRegister}>Регистрация</MenuItem>):
            null
        }
        {
          (user.rights==='manager'||user.rights==='admin')?
            (<MenuItem onClick={handleSummariesList}>Посмотреть сводки</MenuItem>):
            null
        }
        <MenuItem onClick={handleLogout}>Выход</MenuItem>
      </Menu>
    </div>
  );
};

export default connect(
  ({user, socket}) => ({
    user,
    socket,
  }),
  dispatch => ({
    logout: () => dispatch(userAction.logoutUser()),
    removeUser: ()          => dispatch(userAction.removeUser()),
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  })
)(userMenuView);