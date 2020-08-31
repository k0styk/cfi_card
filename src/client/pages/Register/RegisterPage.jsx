import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '../../redux/actions';
import { user as userEvents } from '../../Events';

const RegisterPage = ({ history, socket, notify, user }) => {
  const loginRef = React.createRef();
  const passwordRef = React.createRef();
  const descriptionRef = React.createRef();
  const displayNameRef = React.createRef();
  const departmentRef = React.createRef();
  const rightsRef = user.rights === 'admin'?React.createRef():undefined;

  const registerUser = () => {
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    const description = descriptionRef.current.value;
    const displayName = displayNameRef.current.value;
    const department = departmentRef.current.value;
    const rights = rightsRef && rightsRef.current.value;

    const formData = {
      login,
      password,
      description,
      displayName,
      department,
      rights
    };

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

        setTimeout(() => {
          history.push('/login');
        }, 2000);
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
      <div className='cardHeader'>Registration</div>
      <div className='cardBody'>
        <div className='inputGroup'>
          <label htmlFor='Login'>Login</label>
          <input
            type='text'
            name='login'
            id='login'
            placeholder='Enter login here...'
            ref={loginRef}
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter Password here...'
            ref={passwordRef}
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='displayName'>Display name</label>
          <input
            type='text'
            name='displayName'
            id='displayName'
            placeholder='Display name on header'
            ref={displayNameRef}
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            placeholder='Some words...'
            ref={descriptionRef}
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor='department'>department</label>
          <input
            type='text'
            name='department'
            id='department'
            placeholder='Department'
            ref={departmentRef}
          />
        </div>
        {user.rights === 'admin'?<div className='inputGroup'>
          <label htmlFor='rights'>rights</label>
          <input
            type='text'
            name='rights'
            id='rights'
            placeholder='user default'
            ref={rightsRef}
          />
        </div>:null}
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
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