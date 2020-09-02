import React from 'react';
import { connect } from 'react-redux';

import { user as userEvents } from '../../Events';

const IndexPage = ({history, socket}) => {
  React.useLayoutEffect(() => {
    const id = localStorage.getItem('userId');

    if(socket.emit) {
      socket.emit(userEvents.checkAuth, ({id}), ({isLogged}) => {
        if(isLogged) {
          history.push('/summary');
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