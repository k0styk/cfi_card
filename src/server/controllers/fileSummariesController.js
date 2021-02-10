const mongoose = require('mongoose');
const DaySummaries = mongoose.model('DaySummaries');
const FileSummaries = mongoose.model('Files');
const moment = require('moment');
const jwt = require('jwt-then');
const { config } = global;
const path = require('path');
const fs = require('fs');
const events = require('../../client/Events');
const ExcelJS = require('exceljs');

exports.createTxt = async ({fileId, userId}) => {
  try {
    await directoryPreparation();
    const projection = {
      version: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const summaryById = await DaySummaries.findOne({'_id': fileId},projection).populate('userId', 'department');
    const fileName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.txt`;
    const fileLoc = getFileLocation(fileName);

    // if exist file remove them from disk and database - for actual information
    if(checkFileExist(fileLoc)) {
      await removeFile(fileLoc);
      await FileSummaries.deleteMany({fileName: fileName});
    }
    // create file
    writeStream = fs.createWriteStream(fileLoc);
    const file = new FileSummaries({
      creator: userId,
      path: fileLoc,
      fileName: fileName
    });

    summaryById.summaries.forEach(async summary => {
      const { z1, z2, z3 } = summary;

      writeToFile(`СВОДКА ${moment(summaryById.summariesDateStr, 'DD.MM.YY').format('DDMMYY')}`);
      writeToFile(messageZ1(z1));
      z2.forEach(async z2Value => {
        writeToFile(messageZ2(z2Value));
      });
      writeToFile(messageZ3(z3));
      writeToFile();
    });
    const { _id } = await file.save();
    const message = `Файл создан [${fileName}]. Автоматическое скачивание через 5сек...`;

    return { eventName: events.summaries.create_success, message, fileId: _id};
  } catch(err) {
    console.log('Create txt error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании файла', err};
  } finally {
    writeStream.close();
  }
};

exports.createExcel = async ({fileId, userId}) => {
  try {
    await directoryPreparation();
    const projection = {
      version: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const summaryById = await DaySummaries.findOne({'_id': fileId},projection).populate('userId', 'department');
    const fileName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.xlsx`;
    const fileLoc = getFileLocation(fileName);

    // if exist file remove them from disk and database - for actual information
    if(checkFileExist(fileLoc)) {
      await removeFile(fileLoc);
      await FileSummaries.deleteMany({fileName: fileName});
    }
    // create file
    // writeStream = fs.createWriteStream(fileLoc);
    const file = new FileSummaries({
      creator: userId,
      path: fileLoc,
      fileName: fileName
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`СВОДКА ${summaryById.userId.department}`);

    workbook.creator = summaryById.userId.department;
    workbook.lastModifiedBy = summaryById.userId.department;
    workbook.created = new Date();

    const {summaries} = summaryById;
    /*
    let counter = 1;
    const name = `Table-${i+1}`;
      const ref = `A${counter}`;

      worksheet.addTable({
        name: name,
        ref: ref,
        headerRow: true,
        style: {
          theme: 'TableStyleLight7',
          showRowStripes: true,
        },
        columns: [
          {name: 'Summary',},
          {name: moment(summaryById.summariesDateStr, 'DD.MM.YY').format('DDMMYY'),},
          {name: ' ',},
          {name: '  ',},
          {name: '   ',},
          {name: '    ',},
          {name: '     ',},
          {name: '      ',},
          {name: '       ',},
          {name: '        ',},
        ],
        rows: resultArray,
      });
      counter += 4+z2.length;
    */


    for (let i = 0; i < summaries.length; i++) {
      const { z1, z2, z3 } = summaries[i];
      const resultArray = [];

      resultArray.push(['СВОДКА',moment(summaryById.summariesDateStr, 'DD.MM.YY').format('DDMMYY')]);
      resultArray.push(arrayZ1(z1));
      for (let j = 0; j < z2.length; j++) {
        resultArray.push(arrayZ2(z2[j]));
      }
      resultArray.push(arrayZ3(z3));

      resultArray.push([' ']);
      worksheet.addRows(resultArray);
    }

    const { _id } = await file.save();

    await workbook.xlsx.writeFile(fileLoc);
    const message = `Файл создан [${fileName}]. Автоматическое скачивание через 5сек...`;

    return { eventName: events.summaries.create_success, message, fileId: _id};
  } catch(err) {
    console.log('Create excel error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании файла', err};
  }
};

exports.createArchived = async ({fileId, userId}) => {
  try {
    console.log('create archived');
    return true;
  } catch(err) {
    console.log(err);
    // return { message: err };
  }
};

exports.createAll = async ({}) => {
  try {
    console.log('create all');
    return true;
  } catch(err) {
    console.log(err);
    // return { message: err };
  }
};

exports.download = async (req, res) => {
  try {
    const session = req.session; // eslint-disable-line

    if(session.userId && session.token) {
      const user = await jwt.verify(session.token, config.secret);

      if(user.rights === 'admin' || user.rights === 'manager') {
        const { path } = await FileSummaries.findById(req.params.document);

        if(path) {
          if(checkFileExist(path)) {
            res.download(path);
          } else {
            res.json({
              message: 'File not found on FS'
            });
          }
        } else {
          res.json({
            message: 'File not found',
          });
        }
      } else {
        res.json({
          message: 'Route not found',
        });
      }
    } else {
      console.log(`Unauthorized access to download file.[ip:${req.connection.remoteAddress}]`);
      res.json({
        message: 'Forbiden, Unauthorized access',
      });
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
};

exports.removeWorker = async () => {};

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
};
const messageZ3 = z3 => {
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
  } = z3;

  return `З3 ${airspaceType} ${nonRequired(aircraftTypeName)} ${nonRequired(depAirportCoord)} ${nonRequired(destAirportCoord)}`;
};

const arrayZ1 = z1 => {
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

  return ['З1',flyDate,acftIdent,aircraftType,depAirport,destAirport,nonRequired(entryPoint),timeWithoutColon(entryTime),nonRequired(exitPoint),nonRequired(regno)];
};
const arrayZ2 = z2 => {
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
  } = z2;

  return ['З2',code,entryPoint,timeWithoutColon(entryTime),exitPoint,timeWithoutColon(exitTime)];
};
const arrayZ3 = z3 => {
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
  } = z3;

  return ['З3',airspaceType,nonRequired(aircraftTypeName),nonRequired(depAirportCoord),nonRequired(destAirportCoord)];
};

let writeStream;
const tempDirLocation = path.resolve(path.join(__dirname, '..','..','..','temp/'));
const checkFileExist  = file => fs.existsSync(file);
const tempDirExist    = () => fs.existsSync(tempDirLocation);
const writeToFile   = text => writeStream.write((text?text:'')+'\n') // eslint-disable-line
const createTempDir = async ()          => new Promise((resolve,reject) => fs.mkdir(tempDirLocation, err => err?reject({err,s:false}):resolve({str:`${tempDirLocation}: was created`,s:true}))); // eslint-disable-line
const removeFile    = async file        => new Promise((resolve,reject) => fs.unlink(file, err => err?reject({err, s: false}):resolve({str:`${file}: was deleted`,s:true}))); // eslint-disable-line
const getFileLocation = file => path.join(tempDirLocation, file);
const nonRequired = field => field ? field : '-';
const timeWithoutColon = timeStr => timeStr.replace(':', '');

const directoryPreparation = async () => {
  if(!tempDirExist()) {
    const result = await createTempDir();

    if(result.s) {
      console.log(result.str);
    } else {
      console.log(result.err);
    }
  } else {
    // console.log('Directory exist');
  }
};
/* eslint-enable */