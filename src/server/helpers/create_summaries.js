/* eslint-disable */
const config = require('../config/config').getAll();
const mongoose = require('mongoose');

// bring the model
require('../models/User');
require('../models/Summary');
require('../models/SummaryDocument');
require('../models/DaySummaries');

const daySummaryController = require('../controllers/daySummaryController');

mongoose.connection.on('error', err => console.log('Mongoose Connection ERROR: ' + err.message));
mongoose.connection.once('open', () => console.log('MongoDB Connected!'));

// function
(async function () {
  const dbClient = process.env.DB_CLIENT || config.db.client,
    dbHost = process.env.DB_HOST || config.db.connection.host,
    dbPort = process.env.DB_PORT || config.db.connection.port,
    dbName = process.env.DB_NAME || config.db.connection.dbName;
  const url = `${dbClient}://${dbHost}:${dbPort}/${dbName}`;

  const usersIds = [
    '60050889244e1d26786f0609',
    '6005089577712d0948b57aab',
    '6005099b7a3e46316cba05b9',
    '600509b2943cb7435098ea41',
  ],
    summaries = [
      {
        "id": 1,
        "archive": true,
        "counter": 1,
        "fieldValidation": 64,
        "factValidation": 64,
        "specialDate": new Date().setDate(new Date().getDate() - 4),
        "z1": {
          "acftIdent": "1234567",
          "aircraftType": "1234",
          "depAirport": "1234",
          "destAirport": "1234",
          "entryPoint": "",
          "exitPoint": "",
          "regno": "258487789",
          "validation": 63,
          "flyDate": "18/01/21",
          "entryTime": "06:30"
        },
        "z2": [],
        "z3": {
          "airspaceType": "G",
          "aircraftTypeName": "",
          "depAirportCoord": "",
          "destAirportCoord": "",
          "validation": 1
        }
      },
      {
        "id": 2,
        "archive": true,
        "counter": 2,
        "fieldValidation": 95,
        "factValidation": 95,
        "z1": {
          "acftIdent": "12345",
          "aircraftType": "5555",
          "depAirport": "5555",
          "destAirport": "5555",
          "entryPoint": "",
          "exitPoint": "",
          "regno": "55555555",
          "validation": 63,
          "flyDate": "18/01/21",
          "entryTime": "09:30"
        },
        "z2": [
          {
            "code": "5555",
            "entryPoint": "56555",
            "exitPoint": "55555",
            "validation": 31,
            "id": 1,
            "entryTime": "09:30",
            "exitTime": "09:30"
          }
        ],
        "z3": {
          "airspaceType": "C",
          "aircraftTypeName": "",
          "depAirportCoord": "",
          "destAirportCoord": "",
          "validation": 1
        }
      }
    ];

  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    for (let i = 0; i < usersIds.length; i++) {
      const e = usersIds[i];
      const arr = [...summaries];
      
      console.log(`create summaries for userID[${e}]`);
      await daySummaryController.save({ summaries: arr, userId: e });
    }
  } catch (err) {
    console.log(err);
  } 
  await mongoose.disconnect();
})();

/* eslint-enable */