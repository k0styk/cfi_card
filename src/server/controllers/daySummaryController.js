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

/* ---------------------------------------------------- */
/* -----         GENERATING SUMMARIES             ----- */
/* ---------------------------------------------------- */
/* eslint-disable */
const location = path.join(__dirname, '\\..\\..\\..\\temp\\');
let pathLocation;

const setPath = date => {
  const fileName = date + '.txt';
  pathLocation = location + fileName;
  return fileName;
}
const writeToFile = text => {
  fs.appendFileSync(pathLocation, text + '\n');
};
const checkFileExist = () => fs.existsSync(pathLocation);
const checkDirectory = () => fs.existsSync(location);
const createDirectory = () => fs.mkdirSync(location);
const removeFile = () => fs.unlinkSync(pathLocation);
const nonRequired = field => field ? field : '-';
const timeWithoutColon = timeStr => timeStr.replace(':', '');

const messageZ1 = z1 => {
  const {
    flyDate,
    acftIdent,
    aircraftType,
    depAirport,
    destAirport,
    entryPoint,
    entryTime,
    exitPoint,
    regno,
  } = z1;

  return `З1 ${flyDate} ${acftIdent} ${aircraftType} ${depAirport} ${destAirport} ${nonRequired(entryPoint)} ${timeWithoutColon(entryTime)} ${nonRequired(exitPoint)} ${nonRequired(regno)}`;
};

const messageZ2 = z2 => {
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
  } = z2;

  return `З2 ${code} ${entryPoint} ${timeWithoutColon(entryTime)} ${exitPoint} ${timeWithoutColon(exitTime)}`;
}

const messageZ3 = z3 => {
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
  } = z3;

  return `З3 ${airspaceType} ${nonRequired(aircraftTypeName)} ${nonRequired(depAirportCoord)} ${nonRequired(destAirportCoord)}`;
};
/* eslint-enable */

exports.generateSummariesByDate = async ({date}) => {
  const fileName = setPath(date);
  const query = {
    summariesDate: date
  };
  const summariesDates = await DaySummaries.find(query).select({summaries:1,'_id':0 });
  const summariesMapped = summariesDates.map(v => v.summaries);

  if(!checkDirectory()) createDirectory();
  if(checkFileExist()) removeFile();

  try {
    summariesMapped.forEach((summaries, i) => {
      summaries.forEach((summary, idx) => {
        const {
          z1,
          z2,
          z3,
        } = summary;

        writeToFile(`СВОДКА ${moment(date, 'DD.MM.YY').format('DDMMYY')}`);
        writeToFile(messageZ1(z1));
        z2.forEach((z2Value,idxZ2) => {
          writeToFile(messageZ2(z2Value));
        });
        writeToFile(messageZ3(z3));
      });
    });
  } catch (err) {
    console.log(err);
    return {generated: false};
  }

  return {generated: true, fileName};
};
/* ---------------------------------------------------- */
/* -----         --------------------             ----- */
/* ---------------------------------------------------- */