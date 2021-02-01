/* eslint-disable */
const config = require('../config/config').getAll();
const mongoose = require('mongoose');

global.config = config;
global.hashPass = (text, salt = '') => require('crypto').createHash(config.hash.encryptionType).update(salt + text).digest('hex');

// bring the model
require('../models/DaySummaries');
require('../models/User');

const userController = require('../controllers/userController');

mongoose.connection.on('error', err => console.log('Mongoose Connection ERROR: ' + err.message));
mongoose.connection.once('open', () => console.log('MongoDB Connected!'));

// function
(async function() {
  const dbClient =  process.env.DB_CLIENT || config.db.client,
        dbHost =    process.env.DB_HOST   || config.db.connection.host,
        dbPort =    process.env.DB_PORT   || config.db.connection.port,
        dbName =    process.env.DB_NAME   || config.db.connection.dbName;
  const url = `${dbClient}://${dbHost}:${dbPort}/${dbName}`;

  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const {
    USERNAME,
    PSWD,
    ADMIN,
    DESC,
    DISPNAME,
    DEPARTMENT,
    NODE_ENV,
  } = process.env;

  console.log({
    login: USERNAME,
    password: PSWD,
    description: DESC,
    displayName: DISPNAME,
    department: DEPARTMENT,
    rights: ADMIN === 'YES'?'admin':'',
    NODE_ENV
  });

  const cb = payload => {
    console.log(payload);
  };

  await userController.register({
    login: USERNAME,
    password: PSWD,
    description: DESC,
    displayName: DISPNAME,
    department: DEPARTMENT,
    rights: ADMIN === 'YES'?'admin':''
  }, cb);
  await mongoose.disconnect();
})();

/* eslint-enable */