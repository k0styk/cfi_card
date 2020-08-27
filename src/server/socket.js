const { io } = require('./server');
const events = require('../client/Events');
const crypto = require('crypto');
const config = require('../../config/config');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const userData = {};

module.exports = socket => {
  console.log('a user connected:',socket.id);
  console.log(socket.handshake);

  // io.on('connection', function (socket) {
  //   // Accept a login event with user's data
  //   socket.on("login", function (userdata) {
  //     console.log('login');
  //     socket.handshake.session.userdata = userdata;
  //     socket.handshake.session.save();
  //   });
  //   socket.on("logout", function (userdata) {
  //     if (socket.handshake.session.userdata) {
  //       console.log('logout');
  //       delete socket.handshake.session.userdata;
  //       socket.handshake.session.save();
  //     }
  //   });
  //   socket.on('checksession', function () {
  //     console.log('check');
  //     socket.emit('checksession', socket.handshake.session);
  //   });
  // });

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

  // socket.on(events.store.UPDATE, async (flights, table) => {
  //   userData[socket.handshake.session.sessId] = { flights, ui: { table }};
  //   process.env.LOGGER && console.log(userData);
  // });

  // Нужно научиться делать последовательные экшены исходя из результата
  // socket.on(events.entities.AIRCRAFTS.ADD, async (payload, action, cb) => {
  //   const client = global.dbClient;
  //   const aircraft = action.payload;

  //   await client.db(config.getValue('db').connection.dbName)
  //     .collection('entities').updateOne({}, {$push: { 'aircrafts': aircraft}});

  //   const entities = await client.db(config.getValue('db').connection.dbName)
  //     .collection('entities').find({}).toArray();

  //   const index = entities[0].aircrafts.indexOf(aircraft);

  //   action[1].payload.type = index;
  //   console.log(action);
  //   cb(null, action);
  // });

  // socket.on(events.entities.AIRCRAFTS.DELETE, async (payload, action, cb) => {
  //   const client = global.dbClient;
  //   const aircraft = action.payload;
  //   const entities = await client.db(config.getValue('db').connection.dbName)
  //     .collection('entities').updateOne({}, { $pull: { aircrafts: aircraft } });

  //   cb(null, action);
  // });

  // 
  // socket.on(ui.USER, (payload, action, cb) => {

  //   cb(null, action);
  // });

  // socket.on(events.app.SAVE, async (payload, action, cb) => {
  //   const client = global.dbClient;
  //   const data = {
  //     flight: {
  //       ...payload
  //     }
  //   };

  //   data.serverTime = new Date();
  //   const result = await client.db(config.getValue('db').connection.dbName).collection('flights').insertOne(data);

  //   action.payload = 1;
  //   delete userData[socket.handshake.session.sessId];
  //   delete socket.handshake.session.sessId;
  //   socket.handshake.session.save();
  //   cb(null, action);
  // });

  // socket.on(events.entities.AIRCRAFTS.ADD, async (payload, action, cb) => {
  //   const client = global.dbClient;
  //   const result = await client.db(config.getValue('db').connection.dbName)
  //     .collection('entities').findOne({});

  //   if (result.aircrafts.indexOf(payload) === -1) {
  //     const aircrafts = [...result.aircrafts, payload];

  //     await client.db(config.getValue('db').connection.dbName)
  //       .collection('entities').updateOne({}, { $set: { aircrafts: aircrafts } });
  //   }
  // });

  // socket.on(events.entities.ROUTES.ADD, async (payload, action, cb) => {
  //   const client = global.dbClient;
  //   const result = await client.db(config.getValue('db').connection.dbName)
  //     .collection('entities').findOne({});

  //   const routes = [...result.routes];

  //   payload.map(v => !(~routes.indexOf(v)) && routes.push(v));
  //   const routesEnd = routes.filter((v, i) => routes.indexOf(v) === i);

  //   await client.db(config.getValue('db').connection.dbName)
  //     .collection('entities').updateOne({}, { $set: { routes: routesEnd } });
  // });

  // socket.on('redux-logger', async payload => {
  //   process.env.LOGGER && console.log(payload);
  //   const jsonContent = JSON.stringify(payload)+'\n';

  //   require('fs').appendFile(require('path').join(__dirname, '../../.logs/redux.json'), jsonContent, 'utf8', err => {
  //     if (err) {
  //       console.log('An error occured while writing JSON Object to File.');
  //       return console.log(err);
  //     }
  //   });
  // });
};


/*

// wrong and old
io.set('authorization', function(handshake, callback) {
    handshake.cookies = cookie.parse(handshake.headers.cookie || '');
    var sidCookie = handshake.cookies[cfg.session.key];
    var sid = cookieParser.signedCookie(sidCookie, cfg.session.secret);
    if(!sid){
        log.error('Not session found');
    }
    redis.get('sess:'+sid, function(err, data) {
        if(err){
            log.error('io.authorization -> ',err);
            return;
        }
        if(data){
            handshake.user = jsonParse(data);
            callback(null, true);
        }
    });
});

io.sockets.on('connection', (socket) => {
    var userLogin = socket.handshake.user.LOGIN;
    log.info("Socket is connect: "+userLogin);
    socket.on('msg', (data) => {
        log.info(data);
        socket.emit('msg',{text:'server say:' + new Date()});
    });
    socket.on('disconnect', function() {
        log.info("Socket is disconnect");
    });
});


// new
io.use(function(socket, next) {
    var handshakeData = socket.request;
    handshakeData.cookies = cookie.parse(handshakeData.headers.cookie || '');
    var sidCookie = handshakeData.cookies[cfg.session.key];
    var sid = cookieParser.signedCookie(sidCookie, cfg.session.secret);
    if(!sid){
        log.error('Not session found');
    }
    redis.get('sess:'+sid, function(err, data) {
        if(err){
            log.error('io.authorization -> ',err);
            next(new Error('not authorized'));
        }
        if(data){
            socket.handshake.user = jsonParse(data);
            next();
        }
    });

});

*/