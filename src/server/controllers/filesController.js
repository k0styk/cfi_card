const mongoose = require('mongoose');
const DaySummaries = mongoose.model('File');

/* eslint-disable */
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

exports.save = async ({date}) => {
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

exports.load = async ({date}) => {

};

/* ---------------------------------------------------- */
/* -----         GENERATING SUMMARIES             ----- */
/* ---------------------------------------------------- */
const location = path.resolve(__dirname, '..','..','..','temp/');
let pathLocation;

const setPath = date => {
  pathLocation = location + date + '.txt';;
  return fileName;
};
const writeToFile = text => {
  fs.appendFileSync(pathLocation, text + '\n');
};
const checkFileExist = () => fs.existsSync(pathLocation);
const checkDirectory = () => fs.existsSync(location);
const createDirectory = () => fs.mkdirSync(location);
const removeFile = () => fs.unlinkSync(pathLocation);
const nonRequired = field => field ? field : '-';
const timeWithoutColon = timeStr => timeStr.replace(':', '');