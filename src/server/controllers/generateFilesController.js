const mongoose = require('mongoose');
const SummaryDocument = mongoose.model('SummaryDocument');

exports.save = async ({}) => {
  console.log('generating');

  return true;
};