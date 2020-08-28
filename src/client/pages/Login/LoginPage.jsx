import React from 'react';
import { connect } from 'react-redux';
import { userAction, uiAction } from '../../redux/actions';
import { user as userEvents } from '../../Events';

const LoginPage = ({socket, setUser,removeUser,notify}) => {
  const loginRef = React.createRef();
  const passwordRef = React.createRef();

  const logoutUser = () => {
    socket.emit(userEvents.logout, {}, ({eventName, message}) => {
      if(eventName === userEvents.logout_err) {
        console.error(message);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
      if(eventName === userEvents.logout_success) {
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

    socket.emit(userEvents.login, {login, password}, ({eventName, message, token}) => {
      if(eventName === userEvents.login_err) {
        console.error(message);
        notify({
          message,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      }
      if(eventName === userEvents.login_success) {
        console.log(message);
        const payload = JSON.parse(atob(token.split('.')[1]));

        setUser(payload);
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
      <div className='cardHeader'>Login Page</div>
      <div className='cardBody'>
        <div className='inputGroup'>
          <label htmlFor='login'>Login</label>
          <input
            type='text'
            name='login'
            id='login'
            placeholder='Your Login'
            ref={loginRef}
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Your Password'
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </div>
  );
};

const mstp = ({socket}) => ({
  socket
});

const mdtp = dispatch => ({
  setUser: (...args) => dispatch(userAction.setUser(...args)),
  removeUser: ()     => dispatch(userAction.removeUser()),
  notify:  (...args) => dispatch(uiAction.notify.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(LoginPage);