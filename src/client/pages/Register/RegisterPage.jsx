import React from 'react';
import axios from 'axios'; // DELETE THIS
import { withRouter } from 'react-router-dom';

const RegisterPage = props => {
  const nameRef = React.createRef();
  const nicknameRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = props => {
    const name = nameRef.current.value;
    const nickname = nicknameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post('http://localhost:9015/user/register', {
        name,
        nickname,
        password,
      })
      .then(response => {
        // makeToast('success', response.data.message);
        props.history.push('/login');
      })
      .catch(err => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) console.error(err.response.data.message);
        // makeToast('error', err.response.data.message);
      });
  };

  return (
    <div className='card'>
      <div className='cardHeader'>Registration</div>
      <div className='cardBody'>
        <div className='inputGroup'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='John Doe'
            ref={nameRef}
          />
        </div>
        <label htmlFor='email'>Nickname</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='abc'
          ref={nicknameRef}
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
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;