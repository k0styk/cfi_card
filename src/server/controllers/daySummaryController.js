const mongoose = require('mongoose');
const DaySummaries = mongoose.model('DaySummaries');

exports.save = async ({summaries, userId}) => {
  const date = new Date();
  const queryDate = `${date.getFullYear()}.${('0'+(date.getMonth() + 1)).slice(-2)}.${('0'+date.getDate()).slice(-2)}`; // eslint-disable-line
  const summariesDoc = await DaySummaries.findOne({summariesDate: queryDate, userId: userId});
  let error;

  if(summariesDoc) {
    const resSummaries = [...summariesDoc.summaries, ...summaries];

    summariesDoc.summaries = resSummaries.slice().reverse().filter((v,i,a) => a.findIndex(t => (t.id === v.id))===i).reverse(); // eslint-disable-line

    error = summariesDoc.validateSync();
    if (error) {
      throw new Error('Validation wrong');
    } else {
      summariesDoc.save();
    }
  } else {
    const doc = new DaySummaries({userId: userId, summaries: summaries});

    error = doc.validateSync();
    if (error) {
      throw new Error('Validation wrong');
    } else {
      doc.save();
    }
  }
};