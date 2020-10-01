import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SummariesView } from '@views';
import { user as userEvents } from '@client/Events';

const SummariesPage = ({socket}) => {
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

  return <SummariesView />;
};

export default connect(
  ({socket}) => ({
    socket,
  }),
  null
)(SummariesPage);