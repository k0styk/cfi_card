const mongoose = require('mongoose');
const DaySummaries = mongoose.model('DaySummaries');
const moment = require('moment');
const fs = require('fs');

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
  const startDay = moment().utcOffset(0).subtract(10, 'days').set({hour:0,minute:0,second:0,millisecond:0}).toDate();
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

exports.generateSummariesByDate = async ({date}) => {
  const fileName = date+'.txt';
  const location = __dirname+'\\..\\..\\..\\temp\\';
  const path = location+fileName;

  const writeToFile = text => {
    fs.appendFileSync(path, text+'\n');
  };
  const checkFileExist = () => fs.existsSync(path);
  const checkDirectory = () => fs.existsSync(location);
  const createDirectory = () => fs.mkdirSync(location);
  const removeFile = () => fs.unlinkSync(path);
  const nonRequired = field => field?field:'-';

  const query = {
    summariesDate: date
  };
  const summariesDates = await DaySummaries.find(query).select({summaries:1,'_id':0 });
  const summariesMapped = summariesDates.map(v => v.summaries);

  if(!checkDirectory()) createDirectory();
  if(checkFileExist()) removeFile();

  /* eslint-disable */
  try {
    summariesMapped.forEach((summaries, i) => {
      summaries.forEach((summary, idx) => {
        const {
          z1: {
            flyDate,
            acftIdent,
            aircraftType,
            depAirport,
            destAirport,
            entryPoint,
            entryTime,
            exitPoint,
            regno,
          },
          z3: {
            airspaceType,
            aircraftTypeName,
            depAirportCoord,
            destAirportCoord,
          }
        } = summary;

        let message = `СВОДКА ${moment(date, 'DD.MM.YY').format('DDMMYY')}`;

        writeToFile(message);
        message = `З1 ${flyDate} ${acftIdent} ${aircraftType} ${depAirport} ${destAirport} ${nonRequired(entryPoint)} ${entryTime} ${nonRequired(exitPoint)} ${nonRequired(regno)}`;
        writeToFile(message);
        message = `З3 ${airspaceType} ${aircraftTypeName} ${depAirportCoord} ${destAirportCoord}`;
        writeToFile(message);
      });
      /* eslint-enable */
    });
  } catch (err) {
    console.log(err);
  }

  return true;
};