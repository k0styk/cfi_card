import 'normalize.css';
import './app.scss';
import { initialAction, socketAction, uiAction } from '@redux/actions';
import { IndexPage, LoginPage, RegisterPage, SummaryPage } from '@pages';
import { Notifier } from '@components';
import { Header } from '@views';

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const PrivateRoute = ({ component: Component, redirect, socket, ...rest }) => (
  (<Route
    {...rest}
    render={props => {
      if(localStorage.getItem('userId')) {
        return (<Component {...props} />);
      } else {
        return (<Redirect
          to={{
            pathname: redirect,
            state: {
              from: props.location
            }
          }}
        />);
      }
    }}
  />)
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
  }

  componentDidMount() {
    const {
      setSocket,
      InitState,
      notify,
      connected,
      closeNotify
    } = this.props;
    const socket = io({
      reconnectionAttempts: 4,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 10000
    });

    this.socket = socket;

    socket.on('connect', () => {
      connected(true);
      closeNotify('connection');
      notify({
        message: 'Соединение установлено',
        options: {
          variant: 'success'
        }
      });
    });
    socket.on('connect_error', err => {
      console.log(err);
      notify({
        message: 'Ошибка соединения с сервером',
        options: {
          variant: 'warning'
        }
      });
    });
    socket.on('connect_timeout', err => {
      console.log(err);
      notify({
        message: 'Таймаут соединения с сервером',
        options: {
          variant: 'warning'
        }
      });
    });
    socket.on('error', err => {
      console.log(err);
      notify({
        message: 'Ошибка на клиенте, посмотрите консоль',
        options: {
          variant: 'warning'
        }
      });
    });
    socket.on('reconnect_failed', () => {
      connected(false);
      notify({
        message: 'Ошибка подключения. Попробуйте подключиться самостоятельно через некоторое время',
        options: {
          variant: 'info',
          autoHideDuration: 5000
        }
      });
      notify({
        message: 'Нет соединения с сервером',
        options: {
          key: 'connection',
          variant: 'error',
          persist: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          }
        }
      });
    });

    setSocket(socket);
    InitState();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <Header />
          <Switch>
            <Route
              path="/"
              component={IndexPage}
              exact
            />
            <Route
              path="/login"
              component={LoginPage}
              exact
            />
            <Route
              path="/register"
              component={RegisterPage}
              exact
            />
            <PrivateRoute
              socket={this.props.socket}
              path="/summary"
              redirect="/login"
              condition={this.props.user}
              component={SummaryPage}
              exact
            />
          </Switch>
          <Notifier />
        </div>
      </BrowserRouter>
    );
  }
};

const mstp = state => ({
  notifications: state.notifications,
  user: state.user,
  socket: state.socket
});

const mdtp = dispatch => ({
  setSocket: socket => dispatch(socketAction.setSocket(socket)),
  InitState: () => dispatch(initialAction()),
  notify: (...args) => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  closeNotify: key => dispatch(uiAction.notify.closeSnackbar(key)),
  connected: connected => dispatch(uiAction.app.setConnection({ connected })),
});

export default connect(mstp, mdtp)(App);