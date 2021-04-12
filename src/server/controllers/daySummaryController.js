const mongoose = require('mongoose');
const DaySummaries = mongoose.model('DaySummaries');
const moment = require('moment');

const saveDB = async (query, summaries, specialDate, userId) => {
  const summariesDoc = await DaySummaries.findOne(query,{},{sort: {'created_at': -1}});
  let error;

  if (summariesDoc) {
    const resSummaries = [...summariesDoc.summaries, ...summaries];

    /* eslint-disable */
    // only 1 session, if reload page and new session, save overrides data
    // summariesDoc.summaries = resSummaries.slice().reverse().filter((v,i,a) => a.findIndex(t => (t.id === v.id))===i).reverse(); // eslint-disable-line
    /* eslint-enable */
    summariesDoc.summaries = resSummaries;
    error = summariesDoc.validateSync();
    if (error) {
      throw new Error('Validation wrong');
    } else {
      await summariesDoc.save();
    }
  } else {
    const doc = new DaySummaries({
      userId: userId,
      summaries: summaries,
      summariesDateStr: specialDate,
      summariesDate: moment(specialDate,'DD.MM.YY').set({ hour: 23, minute: 59, second: 58, millisecond: 0 }).toDate()
    });

    error = doc.validateSync();
    if (error) {
      throw error;
    } else {
      await doc.save();
    }
  }
};
const formatM = date => moment(date).format('DD.MM.YY');

exports.save = async ({summaries, userId}) => {
  const withSpecialDateSummaries = [];

  for (let i = 0; i < summaries.length; i++) {
    if(summaries[i].specialDate) {
      withSpecialDateSummaries.push(...summaries.splice(i,1));
      i--;
    }
  }
  const filteredByDateSummaries = withSpecialDateSummaries.reduce((o, cur) => {
    const occurs = o.reduce((n, item, i) => (item.specialDate === formatM(cur.specialDate) ? i : n), -1);

    if (occurs >= 0) { // If the date is found,
      o[occurs].values = o[occurs].values.concat(cur);
    } else { // Otherwise,
      const { specialDate, ...newVal } = cur;
      // add the current item to o (but make sure the value is an array).
      const buf = {
        values: [newVal],
        specialDate: formatM(cur.specialDate)
      };

      o = o.concat([buf]);
    }

    return o;
  }, []);

  for (let i = 0; i < filteredByDateSummaries.length; i++) {
    const element = filteredByDateSummaries[i];

    saveDB({summariesDateStr: element.specialDate},element.values,element.specialDate,userId);
  }

  if(summaries.length) {
    const startDay = moment().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate();
    const endDay = moment().utcOffset(0).set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).toDate();
    const query = {
      createdAt: {
        $gt: startDay,
        $lt: endDay
      },
      userId: userId
    };

    saveDB(query,summaries,userId);
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