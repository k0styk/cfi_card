import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import './app.scss';
import Header from './views/header/';
import MainView from './views/MainView/';
// import store from './redux/store/store';
import { initialAction, socketAction } from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = io('/');

    socket.on('connect', () => { });
    socket.on('connect_error', err => console.log(err));
    socket.on('connect_timeout', err => console.log(err));
    socket.on('error', err => console.log(err) );

    this.props.setSocket(socket);
    this.props.InitState();
  }

  render() {
    return (
      <div className='app-wrapper'>
        <Header />
        <MainView />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSocket: socket => dispatch(socketAction.setSocket(socket)),
  InitState: () => dispatch(initialAction())
});

export default connect(null,mapDispatchToProps)(App);
