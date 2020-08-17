import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../client/redux/store/store';
import App from '../client/App';
import './style.css';
import '../public/html/styles/fontA/css/all.min.css';

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