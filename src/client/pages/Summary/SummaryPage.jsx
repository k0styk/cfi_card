import React from 'react';
import { connect } from 'react-redux';

import { MainView } from '@views';
import { user as userEvents } from '../../Events';

const SummaryPage = ({history, socket }) => {

  React.useLayoutEffect(() => {
    const id = localStorage.getItem('userId');

    if(socket.emit) {
      socket.emit(userEvents.checkAuth, ({id}), ({isLogged}) => {
        if(!isLogged) {
          history.push('/login');
        }
      });
    }
  }, [socket]);

  return <MainView />;
};

const mstp = state => ({
  socket: state.socket,
});

export default connect(mstp,{})(SummaryPage);