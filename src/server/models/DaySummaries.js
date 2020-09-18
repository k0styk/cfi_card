const mongoose = require('mongoose');
const summarySchema = require('./Summary').schema;
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
  summariesDate: {
    type: String,
    default: `${new Date().getUTCFullYear()}.${('0'+(new Date().getUTCMonth() + 1)).slice(-2)}.${('0'+new Date().getUTCDate()).slice(-2)}` // eslint-disable-line
  }
},{
  minimize: false,
  timestamps: true,
  collection: 'day_summaries'
});

module.exports = mongoose.model('DaySummaries', schemaDaySummaries);