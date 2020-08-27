const events = require('../client/Events');
const moment = require('moment');
const jwt = require('jwt-then');
const {config} = global;

module.exports = server => {
  const io = require('socket.io').listen(server);

  io.use(async (socket, next) => {
    try {
      console.log('socket middleware');
      // const token = socket.handshake.query.token; // eslint-disable-line
      // const payload = await jwt.verify(token, config.secret);

      // socket.userId = payload.id;
      next();
    } catch (err) { }
  });

  io.on('connection', socket => {
    console.log('a user connected:', socket.id);
    console.log('Connected: ' + socket.userId);

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.userId);
    });

    socket.on('joinRoom', ({ chatroomId }) => {
      socket.join(chatroomId);
      console.log('A user joined chatroom: ' + chatroomId);
    });

    socket.on('leaveRoom', ({ chatroomId }) => {
      socket.leave(chatroomId);
      console.log('A user left chatroom: ' + chatroomId);
    });

    socket.on(events.store.INITIAL, async (payload, action, cb) => {
      const client = global.dbClient;
      // const entities = await client.db(config.getValue('db').connection.dbName).collection('entities').findOne({});
      // const date = new Date();
      const uiDate = moment().format('DD.MM.YYYY');
      const obj = {
        ui: {
          date: uiDate
        },
        crypto: {
          publicKey: 'maybe hash'
        },
        date: {
          server: new Date()
        },
        // entities: entities
      };

      // if (socket.handshake.session.sessId) {
      //   obj.flights = userData[socket.handshake.session.sessId].flights;
      //   obj.ui.table = userData[socket.handshake.session.sessId].ui.table;
      // } else {
      //   socket.handshake.session.sessId = uuidv4();
      //   socket.handshake.session.save();

      //   userData[socket.handshake.session.sessId] = {};
      // }
      action.payload = obj;
      cb(null, action);
    });
  });

  return io;
};