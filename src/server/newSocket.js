const moment = require('moment');
const jwt = require('jwt-then');
const mongoose = require('mongoose');

const events = require('../client/Events');
const socketMiddleware = require('./middlewares/socket');
const userController = require('./controllers/userController');
const { config } = global;

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
    // console.log('Socket connected: ', socket.id);

    socket.on('disconnect', () => {
      console.log('Disconnected: user[' + socket.request.session.userId + '] socket[' + socket.id + ']');
    });

    socket.on(events.user.login, async ({login,password}, cb) => {
      const session = socket.request.session; // eslint-disable-line

      if (session.userId) {
        if (session.token) {
          const payload = await jwt.verify(session.token, config.secret);

          console.log('User [ ' + login + ' ] try sign in, session for [ '+payload.login+' ]');
          cb({eventName:events.user.login_err,message:'You must logout before sign in!'});
          return;
        }
        console.log('No session token!');
        cb({eventName:events.user.login_err,message:'Holy crap! Its crashed, try relogin'});
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
        cb({eventName:events.user.login_err,message});
      } else {
        const tokenOpts = {
          login: user.login,
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
        cb({eventName:events.user.login_success,token,message});
      }
    });

    socket.on(events.user.logout, async ({}, cb) => {
      const session = socket.request.session; // eslint-disable-line
      if (session.userId) {
        if (session.token) {
          delete session.token;
          delete session.userId;
          session.save();
          console.log('Logout');
          cb({eventName:events.user.logout_success,message:'Logout successfull'});
          return;
        }
        console.log('No session token!');
        cb({eventName:events.user.login_err,message:'Holy crap! Its crashed, try relogin'});
        return;
      } else {
        console.log('Nobody logout');
        cb({eventName:events.user.logout_err,message:'Nobody logout'});
        return;
      };
    });

    socket.on(events.user.checkAuth, async ({ id }, cb) => {
      const isLogged = false;
      const session = socket.request.session; // eslint-disable-line

      if (session.userId) {
        if (session.userId === id) {
          cb({ isLogged: true });
        } else {
          cb({isLogged});
        }
      } else {
        cb({isLogged});
      }
    });

    socket.on(events.user.register, async ({
      login,
      password,
      description,
      displayName,
      department,
      rights
    }, cb) => {
      let message = 'Register [ '+login+' ] successfull';

      if (login.length < 2) {
        message = 'Login must be atleast 2 characters long.';
        cb({eventName:events.user.register_err,message});
        return;
      };
      if (password.length < 6){
        message = 'Password must be atleast 6 characters long.';
        cb({eventName:events.user.register_err,message});
        return;
      }
      const userExists = await User.findOne({ login });

      if (userExists) {
        message = 'User with same login already exits.';
        cb({eventName:events.user.register_err,message});
        return;
      };

      const user = new User({
        login,
        password: global.hashPass(password, config.salt),
        description: description?description:undefined,
        displayName: displayName?displayName:undefined,
        department: department?department:undefined,
        rights: rights?rights:undefined,
      });

      await user.save();
      message = 'User [ ' + login + ' ] registered successfully!';
      cb({eventName:events.user.register_success,message});
    });

    socket.on(events.summary.save, async () => { /* IMPLEMENT */ });

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
      const session = socket.request.session; // eslint-disable-line
      let userObj = null;

      if (session.userId) {
        if (session.token) {
          const payload = await jwt.verify(session.token, config.secret);

          userObj = { ...payload };
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