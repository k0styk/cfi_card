import io from 'socket.io-client';

const clientSocket = props => {
  const {
    connected,
    closeNotify,
    notify,
  } = props;

  const socket = io({
    reconnectionAttempts: 4,
    reconnectionDelay: 3000,
    reconnectionDelayMax: 10000,
    transports: [ 'websocket' ]
  });

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

  return socket;
};

export { clientSocket };