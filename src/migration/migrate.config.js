'use strict';

const clientD = 'mongodb',
  host = 'localhost',
  port = '27017',
  dbName = 'CFI';
const url = `${clientD}://${host}:${port}`;

const migrationConfig = {
  mongodb: {
    url: url,
    databaseName: dbName,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },
  migrationsDir: 'src/migration/migrations',
  changelogCollectionName: 'changelog'
};

module.exports = migrationConfig;