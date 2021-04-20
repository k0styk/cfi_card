const moment = require('moment');
const jwt = require('jwt-then');

/**---  CONSTANTS  ---**/
const events = require('../client/Events');
/**---  MIDDLEWARES  ---**/
const socketMiddleware = require('./middlewares/socket');
/**---  CONTROLLERS  ---**/
const userController = require('./controllers/userController');
const summaryController = require('./controllers/summaryController');
const daySummaryController = require('./controllers/daySummaryController');
const fileSummariesController = require('./controllers/fileSummariesController');
/**---  CONFIG  ---**/
const { config } = global;

module.exports = server => {
  const io = require('socket.io', {
    transports: [ 'websocket' ]
  }).listen(server);

  io.use(socketMiddleware);
  io.on('connection', socket => {
    // console.log('Socket connected: ', socket.id);
    // console.log(socket.request.session.userId);
    /**---  UPDATE STATUS AFTER REFRESH PAGE  ---**/
    if(socket.request.session.userId) {
      userController.updateStatus(socket.request.session.userId);
    }

    /**---  DISCONNECT  ---**/
    socket.on('disconnect', () => {
      if(checkSession) userController.updateStatus(socket.request.session.userId);
      // console.log('Disconnected: user[' + socket.request.session.userId + '] socket[' + socket.id + ']');
    });

    const checkSession = () => {
      const session = socket.request.session; // eslint-disable-line

      return session.userId && session.token;
    };

    /**-----------------------**/
    /**---  BLOCK OF USER  ---**/
    /**-----------------------**/
    /***/ /**---  LOGIN USER  ---**/
    /***/ socket.on(events.user.login, async (formData, cb) => {
      try {
        const session = socket.request.session; // eslint-disable-line
        if (checkSession()) {
          const payload = await jwt.verify(session.token, config.secret);

          console.log('User [ ' + login + ' ] try sign in, session for [ ' + payload.login + ' ]');
          cb({ eventName: events.user.login_err, message: 'You must logout before sign in!' });
        } else {
          let message = 'Login successfull';
          const user = await userController.login(formData);

          if (!user) {
            message = 'Login [ ' + formData.login + ' ] and Password did not match.';

            console.log(message);
            cb({ eventName: events.user.login_err, message });
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
            cb({ eventName: events.user.login_success, token, message });
          }
        }
      } catch (err) {
        console.error(err);
        cb({ eventName: events.user.login_err, message: 'Some login error occured...' });
      }
    /***/ });

    /***/ /**---  LOGOUT USER  ---**/
    /***/ socket.on(events.user.logout, async ({}, cb) => {
      if (checkSession()) {
        const session = socket.request.session; // eslint-disable-line
        userController.updateStatus(socket.request.session.userId);
        delete session.token;
        delete session.userId;
        session.save();
        cb({ eventName: events.user.logout_success, message: 'Logout successfull' });
        return;
      } else {
        console.log('Nobody logout');
        cb({eventName:events.user.logout_err,message:'Nobody logout'});
        return;
      };
    /***/ });

    /***/ /**---  CHECK IS LOGGED  ---**/
    /***/ socket.on(events.user.checkAuth, async ({ id }, cb) => {
      const isLogged = false;
      const session = socket.request.session; // eslint-disable-line

      if (session.userId) {
        if (session.userId === id) {
          userController.updateStatus(session.userId);
          cb && cb({ isLogged: true });
        } else {
          cb && cb({isLogged});
        }
      } else {
        cb && cb({isLogged});
      }
    /***/ });

    /***/ /**---  REGISTER USER  ---**/
    /***/ socket.on(events.user.register, userController.register);

    /***/ /**---  EDIT USER  ---**/
    /***/ socket.on(events.user.edit, userController.edit);

    /***/ /**---  DELETE USER  ---**/
    /***/ socket.on(events.user.delete, userController.delete);

    /***/ /**---  LIST OF USERS  ---**/
    /***/ socket.on(events.user.getListUsers, userController.getListUsers);

    /**---  SUMMARY - SAVE  ---**/
    socket.on(events.summary.save, async ({ summary }, cb) => {
      if (checkSession()) {
        if (summary.length) {
          const session = socket.request.session; // eslint-disable-line
          const resultSummary = [];
          const invalidSummary = [];

          /***/
          /***/ /** - BLOCK OF 1 SUMMARY = 1 DOCUMENT MONGO - **/
          /***/
          /* eslint-disable */
          /***/ for (let i = 0; i < summary.length; i++) {
          /***/   const v = {...summary[i]};

          /***/   try {
          /***/     await summaryController.save({ summary: v, userId: session.userId });
          /***/     resultSummary.push(v);
          /***/   } catch (err) {
          /***/     console.log(err);
          /***/     invalidSummary.push(v);
          /***/   }
          /***/ }
          /* eslint-enable */
          /***/
          if(resultSummary.length) {
            try {
              daySummaryController.save({ summaries: resultSummary, userId: session.userId });
            } catch (err) {
              console.log(err);
            }
          }
          if (invalidSummary.length) {
            cb({eventName:events.summary.save_partial,message:'Часть сводок не сохранена',notAccepted:invalidSummary});
          } else {
            cb({eventName:events.summary.save_success,message:'Все сводки сохранены'});
          }
        } else {
          console.log('No summaries!');
          cb({ eventName: events.summary.save_err, message: 'No summaries!' });
        }
      } else {
        console.log('No session!');
        cb({ eventName: events.summary.save_err, message: 'No session!' });
      }
    });

    socket.on(events.summaries.getDates, async (nullable, cb) => {
      if (checkSession()) {
        const session = socket.request.session; // eslint-disable-line
        const dates = await daySummaryController.getDates();

        cb({ dates });
      }
    });

    /**-------------------------------------**/
    /**---  BLOCK OF DOWNLOAD SUMMARIES  ---**/
    /**-------------------------------------**/
    socket.on(events.summaries.getListDepartments, async (date, cb) => {
      if (checkSession()) {
        cb(await userController.listDepartmentsBySliceOfDate(date));
      } else {
        console.error('[No Session] - Try to getListUsers');
      }
    });

    socket.on(events.summaries.getDepartmentInfoById, async (id, cb) => {
      if (checkSession()) {
        cb(await userController.getDepartmentInfoById(id));
      } else {
        console.error('[No Session] - Try to getUserInfoById');
      }
    });

    socket.on(events.summaries.createTxt, async (fileId, cb) => {
      if (checkSession()) {
        cb(await fileSummariesController.createTxt({fileId, userId: socket.request.session.userId}));
      } else {
        console.error('[No Session] - Try to createTxt');
      }
    });

    socket.on(events.summaries.createExcel, async (fileId, cb) => {
      if (checkSession()) {
        cb(await fileSummariesController.createExcel({fileId, userId: socket.request.session.userId}));
      } else {
        console.error('[No Session] - Try to createExcel');
      }
    });

    socket.on(events.summaries.createArchive, async (fileId, cb) => {
      if (checkSession()) {
        cb(await fileSummariesController.createArchived({fileId, userId: socket.request.session.userId}));
      } else {
        console.error('[No Session] - Try to createArchive');
      }
    });

    socket.on(events.summaries.createTxtForAll, async (departmentsWithDocs, cb) => {
      if (checkSession()) {
        cb(await fileSummariesController.createTxtForAll({departmentsWithDocs, userId: socket.request.session.userId}));
      } else {
        console.error('[No Session] - Try to createTxt');
      }
    });

    socket.on(events.summaries.createExcelForAll, async (departmentsWithDocs, cb) => {
      if (checkSession()) {
        cb(await fileSummariesController.createExcelForAll({departmentsWithDocs,userId:socket.request.session.userId}));
      } else {
        console.error('[No Session] - Try to createTxt');
      }
    });

    socket.on(events.summaries.createArchiveForAll, async (departmentsWithDocs, cb) => {
      if (checkSession()) {
        cb(await fileSummariesController.createArchiveForAll({departmentsWithDocs,userId:socket.request.session.userId}));
      } else {
        console.error('[No Session] - Try to createTxt');
      }
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

      const uiDate = moment().utc().format('DD.MM.YYYY');
      const obj = {
        ui: {
          date: uiDate
        },
        date: {
          server: new Date()
        },
        user: userObj
      };

      action.payload = obj;
      cb(null, action);
    });
  });

  return io;
};