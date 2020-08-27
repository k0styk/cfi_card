const express = require('express');
const MongoStore = require('connect-mongo')(express);

const sessionStore = new MongoStore({

});

module.exports=sessionStore;