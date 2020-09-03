import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { MainView } from '@views';
import { user as userEvents } from '../../Events';

const SummaryPage = ({socket}) => {
  const history = useHistory();

  React.useLayoutEffect(() => {
    const id = localStorage.getItem('userId');

    if(socket.emit) {
      socket.emit(userEvents.checkAuth, ({id}), ({isLogged}) => {
        if(!isLogged) {
          history.replace('/login');
        }
      });
    }
  });

  return <MainView />;
};

export default connect(
  ({socket}) => ({
    socket,
  }),
  {}
)(SummaryPage);