const mongoose = require('mongoose');
const summarySchema = require('./Summary').schema;
const moment = require('moment');
const schemaDaySummaries = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'User is required!',
    ref: 'User',
  },
  summaries: [summarySchema],
  version: {
    type: String,
    default: '0.0.1',
  },
  summariesDateStr: {
    type: String,
    default: moment().format('DD.MM.YY')
  },
  summariesDate: {
    type: Date,
    default: moment().toDate()
  }
},{
  minimize: false,
  timestamps: true,
  collection: 'day_summaries'
});

module.exports = mongoose.model('DaySummaries', schemaDaySummaries);