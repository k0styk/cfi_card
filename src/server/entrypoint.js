import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import store from '@redux/store/store';
import App from '@client/App';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('app')
);

if (module.hot)        // eslint-disable-line no-undef  
  module.hot.accept(); // eslint-disable-line no-undef