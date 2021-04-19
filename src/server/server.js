/* eslint-disable */
const config = require('./config/config').getAll();
const mongoose = require('mongoose');
global.config = config;
// global.hashPass = (text, salt = '') => require('crypto').createHash(config.hash.encryptionType).update(salt + text).digest('hex');
const PORT =      process.env.PORT      || config.app.port,
      HOST =      process.env.HOST      || config.app.host,
      dbClient =  process.env.DB_CLIENT || config.db.client,
      dbHost =    process.env.DB_HOST   || config.db.connection.host,
      dbPort =    process.env.DB_PORT   || config.db.connection.port,
      dbName =    process.env.DB_NAME   || config.db.connection.dbName;
const url = `${dbClient}://${dbHost}:${dbPort}/${dbName}`;

mongoose.connection.on('error', err => console.log('Mongoose Connection ERROR: ' + err.message));
mongoose.connection.once('open', () => console.log('MongoDB Connected!'));

//Bring in the models
require('./models/User');
require('./models/Summary');
require('./models/SummaryDocument');
require('./models/DaySummaries');
require('./models/File');

(async () => {
  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  async function listenCallback() {
    try {
      process.send && process.send('ready');
    } catch (err) {
      console.log('Some error occured');
      console.log(err);
    }
    finally {
      console.log(`Server started at: http://${HOST}:${PORT}`);
    }
  }

  const server = await require('./app').listen(PORT,HOST,listenCallback);
  const io = require('./socket')(server);
})();

/* PM2 START */
process.on('SIGINT', async () => {
  console.log('Received SIGINT.  Press Control-D to exit.');
  await mongoose.disconnect();
  process.exit(0);
});

process.on('message', async msg => {
  if (msg === 'shutdown') {
    console.log('Closing all connections...');
    await mongoose.disconnect();
    process.exit(0);
  }
});
/* PM2 END */

/* eslint-enable */