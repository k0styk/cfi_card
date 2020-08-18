import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../client/redux/store/store';
import App from '../client/App';
import './style.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faClock } from '@fortawesome/free-solid-svg-icons';
// import { faClock } from '@fortawesome/free-regular-svg-icons';

// library.add(faClock);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('app') // eslint-disable-line no-undef
);

if (module.hot)        // eslint-disable-line no-undef  
  module.hot.accept(); // eslint-disable-line no-undef