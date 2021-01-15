const mongoose = require('mongoose');
const DaySummaries = mongoose.model('DaySummaries');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

exports.save = async ({summaries, userId}) => {
  const startDay = moment().utcOffset(0).set({hour:0,minute:0,second:0,millisecond:0}).toDate();
  const endDay = moment().utcOffset(0).set({hour:23,minute:59,second:59,millisecond:0}).toDate();
  const query = {
    createdAt: {
      $gt: startDay,
      $lt: endDay
    },
    userId: userId
  };

  const summariesDoc = await DaySummaries.findOne(query);
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
      throw error;
    } else {
      doc.save();
    }
  }
};

exports.getDates = async () => {
  const startDay = moment().utcOffset(0).subtract(2, 'months').set({hour:0,minute:0,second:0,millisecond:0}).toDate();
  const endDay = moment().utcOffset(0).set({hour:23,minute:59,second:59,millisecond:0}).toDate();

  const query = {
    createdAt: {
      $gt: startDay,
      $lt: endDay
    },
  };
  const summariesDates = await DaySummaries.find(query).select({summariesDate:1,'_id':0 }).distinct('summariesDate');

  return summariesDates;
};