const moment = require('moment');
const jwt = require('jwt-then');
const mongoose = require('mongoose');

const events = require('../client/Events');
const socketMiddleware = require('./middlewares/socket');
const {config} = global;

/* usage SESSION */
// const session = socket.request.session; // eslint-disable-line

// session.connections++;
// session.save();
/* SESSION usage */

// const payload = await jwt.verify(token, config.secret); // GET TOKEN
// const token = await jwt.sign({ id: user.id, rights: user.rights }, config.secret); // SET TOKEN
// const Message = mongoose.model('Message');
const User = mongoose.model('User');

module.exports = server => {
  const io = require('socket.io').listen(server);

  io.use(socketMiddleware);
  io.on('connection', socket => {
    console.log('Socket connected: ', socket.id);

    socket.on(events.user.login, async ({login, password}, cb) => {
      const session = socket.request.session; // eslint-disable-line

      if(session.userId) {
        if(session.token) {
          console.log('User ['+login+'] is logged in yet!');
          cb({eventName: events.user.login_err, message: 'User [ '+login+' ] is logged in yet!'});
          return;
        }
        console.log('No session token!');
        cb({eventName: events.user.login_err, message: 'Holy crap! Its crashed, try relogin'});
        return;
      }
      const user = await User.findOne({
        login,
        password: global.hashPass(password, config.salt),
      });
      let message = 'Login successfull';

      if (!user) {
        message = 'Login [ '+login+' ] and Password did not match.';

        console.log(message);
        cb({eventName: events.user.login_err, message});
      } else {
        const tokenOpts = {
          id: user.id,
          rights: user.rights,
          description: user.description,
          displayName: user.displayName,
          department: user.department
        };
        const token = await jwt.sign(tokenOpts, config.secret);

        session.token = token;
        session.userId = user.id;
        session.save();
        cb({eventName: events.user.login_success, token, message});
      }
    });

    socket.on(events.user.logout, async ({}, cb) => {
      const session = socket.request.session; // eslint-disable-line
      if(session.userId) {
        if(session.token) {
          delete session.token;
          delete session.userId;
          session.save();
          console.log('Logout');
          cb({eventName: events.user.logout_success, message: 'Logout successfull'});
        }
        console.log('No session token!');
        cb({eventName: events.user.login_err, message: 'Holy crap! Its crashed, try relogin'});
        return;
      } else {
        console.log('Nobody logout');
        cb({eventName: events.user.logout_err, message: 'Nobody logout'});
        return;
      };
    });

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.userId);
    });

    socket.on('chatroomMessage', async ({ chatroomId, message }) => {
      // if (message.trim().length > 0) {
      //   const user = await User.findOne({ _id: socket.userId });
      //   const newMessage = new Message({
      //     chatroom: chatroomId,
      //     user: socket.userId,
      //     message,
      //   });

      //   io.to(chatroomId).emit('newMessage', {
      //     message,
      //     name: user.name,
      //     userId: socket.userId,
      //   });
      //   await newMessage.save();
      // }
    });

    socket.on(events.store.INITIAL, async (payload, action, cb) => {
      // const client = global.dbClient;
      const session = socket.request.session; // eslint-disable-line
      // const entities = await client.db(config.getValue('db').connection.dbName).collection('entities').findOne({});
      // const date = new Date();
      let userObj = null;

      if(session.userId) {
        if(session.token) {
          const payload = await jwt.verify(session.token, config.secret);

          userObj = {...payload};
        }
      }

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
        user: userObj
        // entities: entities
      };

      action.payload = obj;
      cb(null, action);
    });
  });

  return io;
};