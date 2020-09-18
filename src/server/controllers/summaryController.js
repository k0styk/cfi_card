const mongoose = require('mongoose');
const SummaryDocument = mongoose.model('SummaryDocument');

exports.save = async ({summary, userId}) => {
  const doc = new SummaryDocument({userId,summary});
  const error = doc.validateSync();

  if(error) {
    throw new Error('Validation wrong');
  } else {
    doc.save();
  }

};