import './app.scss';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialAction, socketAction, uiAction } from './redux/actions';
import { Header } from '@views';
import { IndexPage, LoginPage, RegisterPage, SummaryPage } from '@pages';
import { Notifier } from '@components';
import io from 'socket.io-client';

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

  setupSocket() {
    const {token} = this.props;

    if (token && !this.socket) {
      // console.log(token);
      // const newSocket = io("/", {
      //   query: {
      //     token: token,
      //   },
      // });

      // newSocket.on("disconnect", () => {
      //   setSocket(null);
      //   setTimeout(setupSocket, 3000);
      //   makeToast("error", "Socket Disconnected!");
      // });

      // newSocket.on("connect", () => {
      //   makeToast("success", "Socket Connected!");
      // });

      // setSocket(newSocket);
    }
  };

  render() {
    return (
      <div className='app-wrapper'>
        <Header />
        <BrowserRouter>
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
            <Route
              path="/summary"
              component={SummaryPage}
              exact
            />
          </Switch>
        </BrowserRouter>
        <Notifier />
      </div>
    );
  }
};

const mstp = state => ({
  notifications: state.notifications,
  token: state.user.token
});

const mdtp = dispatch => ({
  setSocket: socket => dispatch(socketAction.setSocket(socket)),
  InitState: () => dispatch(initialAction()),
  notify: (...args) => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  closeNotify: key => dispatch(uiAction.notify.closeSnackbar(key)),
  connected: connected => dispatch(uiAction.app.setConnection({connected}))
});

export default connect(mstp,mdtp)(App);