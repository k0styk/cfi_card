const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middlewares/session');
const app = express();


app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

//Setup Cross Origin
app.use(require('cors')());

//Bring in the routes
app.use('/user', require('./routes/user'));
app.use('/', express.static(path.join(__dirname, '../../dist')));
app.use('/login', express.static(path.join(__dirname, '../../dist')));
app.use('/register', express.static(path.join(__dirname, '../../dist')));
app.use('/summary', express.static(path.join(__dirname, '../../dist')));

//Setup Error Handlers
const errorHandlers = require('./handlers/errorHandlers');

app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.NODE_ENV === 'dev') {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;