import './app.scss';
import React from 'react';
import { connect } from 'react-redux';
import { initialAction, socketAction, notifyAction } from './redux/actions';
import { Header, MainView } from '@views';
import { Notifier } from '@components';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setSocket, InitState, notify } = this.props;
    const socket = io({
      reconnectionAttempts: 4,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 10000
    });

    socket.on('connect', () => {
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
      notify({
        message: 'Ошибка переподключения. Попробуйте переподключиться самостоятельно',
        options: {
          variant: 'warning'
        }
      });
      notify({
        message: 'Нет соединения с сервером',
        options: {
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
      <div className='app-wrapper'>
        <Header />
        <MainView />
        <Notifier />
      </div>
    );
  }
};

const mstp = state => ({
  notifications: state.notifications
});

const mdtp = dispatch => ({
  setSocket: socket => dispatch(socketAction.setSocket(socket)),
  InitState: () => dispatch(initialAction()),
  notify: (...args) => dispatch(notifyAction.enqueueSnackbar(...args)),
});

export default connect(mstp,mdtp)(App);