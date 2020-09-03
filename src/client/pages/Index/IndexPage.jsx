import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { user as userEvents } from '../../Events';

const IndexPage = ({socket}) => {
  const history = useHistory();

  React.useLayoutEffect(() => {
    const id = localStorage.getItem('userId');

    if(socket.emit) {
      socket.emit(userEvents.checkAuth, ({id}), ({isLogged}) => {
        if(isLogged) {
          history.replace('/summary');
        } else {
          history.push('/login');
        }
      });
    }
  }, [socket]);

  return <div />;
};

const mstp = state => ({
  socket: state.socket,
});

export default connect(mstp,{})(IndexPage);