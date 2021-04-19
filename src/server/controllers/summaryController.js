const mongoose = require('mongoose');
const SummaryDocument = mongoose.model('SummaryDocument');
const { config } = global;

exports.save = async ({summary, userId}) => {
  const doc = new SummaryDocument({userId,summary});
  const error = doc.validateSync();

  if(error) {
    throw error;
  } else {
    if(config.app.saveSeparateSummary) {
      doc.save();
    }
  }
};