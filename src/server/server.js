// const path = require('path');
// const express = require('express');
// const serveStatic = require('serve-static');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');
// const compression = require('compression');
// const http = require('http');
// const { MongoClient } = require('mongodb');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MemoryStore = require('memorystore')(session);
// // const ioSession = require('express-socket.io-session');
// const config = require('../../config/config');
// const routes = require('./api/api');

// const app = express(),
//   apiPath = '/api/',
//   options = { useUnifiedTopology: true, useNewUrlParser: true },
//   PORT = config.getValue('app').port || 8080,
//   HOST = config.getValue('app').host || 'localhost',
//   clientD = config.getValue('db').client || 'mongodb',
//   host = config.getValue('db').connection.host || 'localhost',
//   port = config.getValue('db').connection.port || '27017',
//   dbName = config.getValue('db').connection.dbName || 'CFI_card',
//   server = http.createServer(app);
//   // io = module.exports.io = require('socket.io')(server, {
//   //   // transports: ['websocket']
//   // });

// const url = `${clientD}://${host}:${port}/${dbName}`,
//   client = new MongoClient(url, options),
//   io = require('./testSocket.js')(server);
//   // socketManager = require('./socket');
//   // const MongoStore = require('connect-mongo')(express);

// const fillSession = session({
//   saveUninitialized: true,
//   secret: config.getValue('cookieSecret') || 'qAe21uhZ•qwe',
//   store: new MemoryStore({
//     checkPeriod: 43200000 // 12 hours
//   }),
//   // store: new MongoStore({
//   //   client: client,
//   //   ttl: 1*24*60*60,
//   //   touchAfter: 1*1*5*60
//   // }),
//   resave: false,
//   cookie: {
//     maxAge: 43200000 // 12 hours
//   }
// });

// // Attach session
// app.use(fillSession);
// // Share session with io sockets
// // io.use(ioSession(fillSession));

// // Helmet will set various HTTP headers to help protect your app
// app.use(helmet());
// // support parsing of application/json type post data
// app.use(bodyParser.json());
// // support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));
// // support compress response headers
// app.use(compression());
// // support parse cookie
// app.use(cookieParser());

// // define global client, fast work speed
// global.dbClient = client;

// app.use('/', serveStatic(path.join(__dirname, '../../dist')));

// app.route(`${apiPath}isAuth`)
//   .get((req, res) => {
//     routes.isAuth(req, res);
//   });

// server.listen(PORT, HOST, listenCallback);

// app.set('io', io);

// // io.on('connection', socketManager);

// // MONGO ON WINDOWS LOAD SO BAD, we deal connection on start app
// async function listenCallback() {
//   try {
//     await client.connect();
//     process.send && process.send('ready');
//   } catch (err) {
//     console.log('Some error occured');
//     console.log(err);
//   }
//   finally {
//     console.log(`Server started at: http://${HOST}:${PORT}`);
//   }
// }

// process.on('SIGINT', async () => {
//   console.log('Received SIGINT.  Press Control-D to exit.');
//   await client.close();
//   process.exit(0);
// });

// process.on('message', async msg => {
//   if (msg === 'shutdown') {
//     console.log('Closing all connections...');
//     await client.close();
//     process.exit(0);
//   }
// });
/* eslint-disable */
const config = require('./config/config').getAll();
const mongoose = require('mongoose');

const PORT =      process.env.PORT      || config.app.port              || 8080,
      HOST =      process.env.HOST      || config.app.host              || 'localhost',
      dbClient =  process.env.DB_CLIENT || config.db.client             || 'mongodb',
      dbHost =    process.env.DB_HOST   || config.db.connection.host    || 'localhost',
      dbPort =    process.env.DB_PORT   || config.db.connection.port    || '27017',
      dbName =    process.env.DB_NAME   || config.db.connection.dbName  || 'CFI_card';
const url = `${dbClient}://${dbHost}:${dbPort}/${dbName}`;
global.dbClient = mongoose;
global.config = config;

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});


//Bring in the models
require("./models/Summary");
// require("./models/Chatroom");
// require("./models/Message");

const app = require("./app");
const server = app.listen(PORT,HOST, listenCallback);

// MONGO ON WINDOWS LOAD SO BAD, we deal connection on start app
async function listenCallback() {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    process.send && process.send('ready');
  } catch (err) {
    console.log('Some error occured');
    console.log(err);
  }
  finally {
    console.log(`Server started at: http://${HOST}:${PORT}`);
  }
}

/* PM2 START */
process.on('SIGINT', async () => {
  console.log('Received SIGINT.  Press Control-D to exit.');
  await client.close();
  process.exit(0);
});

process.on('message', async msg => {
  if (msg === 'shutdown') {
    console.log('Closing all connections...');
    await client.close();
    process.exit(0);
  }
});
/* PM2 END */

// const io = require("socket.io")(server);
const io = require('./newSocket')(server);
// app.set('io', io);