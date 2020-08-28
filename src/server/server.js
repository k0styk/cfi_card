/* eslint-disable */
const config = require('./config/config').getAll();
const mongoose = require('mongoose');
global.config = config;
global.hashPass = (text, salt = '') => require('crypto').createHash(config.hash.encryptionType).update(salt + text).digest('hex');
const PORT =      process.env.PORT      || config.app.port              || 8080,
      HOST =      process.env.HOST      || config.app.host              || 'localhost',
      dbClient =  process.env.DB_CLIENT || config.db.client             || 'mongodb',
      dbHost =    process.env.DB_HOST   || config.db.connection.host    || 'localhost',
      dbPort =    process.env.DB_PORT   || config.db.connection.port    || '27017',
      dbName =    process.env.DB_NAME   || config.db.connection.dbName  || 'CFI_card';
const url = `${dbClient}://${dbHost}:${dbPort}/${dbName}`;

mongoose.connection.on('error', err => console.log('Mongoose Connection ERROR: ' + err.message));
mongoose.connection.once('open', () => console.log('MongoDB Connected!'));

//Bring in the models
require('./models/User');

// const app = ;
const server = require('./app').listen(PORT,HOST, listenCallback);

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

// const io = require('socket.io')(server);
const io = require('./newSocket')(server);
/* eslint-enable */