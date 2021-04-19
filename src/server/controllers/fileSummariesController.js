const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const FileSummaries = mongoose.model('Files');
const DaySummaries = mongoose.model('DaySummaries');
const moment = require('moment');
const jwt = require('jwt-then');
const ExcelJS = require('exceljs');
const archiver = require('archiver');
const rmdir = require('rimraf');

const { config } = global;
const events = require('../../client/Events');

exports.createTxt = async ({fileId, userId}) => {
  try {
    await directoryPreparation();
    const summaryById = await DaySummaries.findOne({'_id':fileId },projectionSummaries).populate('userId','department');
    const fileName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.txt`;
    const fileLoc = getFileLocation({fileName});

    const result = await createTxtFile({fileLoc,fileName,summaries: summaryById});

    if(result.err) throw result.err;
    const file = new FileSummaries({
      creator: userId,
      path: result.path,
      fileName: result.fileName
    });
    const { _id } = await file.save();
    const message = getResultMessage(result.fileName);

    return { eventName: events.summaries.create_success, message, fileId: _id};
  } catch(err) {
    console.log('createTxt error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании файла', err};
  }
};
exports.createExcel = async ({fileId, userId}) => {
  try {
    await directoryPreparation();
    const summaryById = await DaySummaries.findOne({'_id':fileId},projectionSummaries).populate('userId','department');
    const fileName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.xlsx`;
    const fileLoc = getFileLocation({fileName});

    const result = await createExcelFile({fileLoc,fileName,summaries: summaryById});

    if(result.err) throw result.err;

    const file = new FileSummaries({
      creator: userId,
      path: result.path,
      fileName: result.fileName
    });
    const { _id } = await file.save();
    const message = getResultMessage(result.fileName);

    return { eventName: events.summaries.create_success, message, fileId: _id};
  } catch(err) {
    console.log('createExcel error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании файла', err};
  }
};
exports.createArchived = async ({fileId, userId}) => {
  try {
    await directoryPreparation();
    const summaryById = await DaySummaries.findOne({'_id':fileId },projectionSummaries).populate('userId','department');
    const archiveDirName = `${summaryById.summariesDateStr}.${summaryById.userId.department}`;

    await removeArchiveDir({dirName: archiveDirName});
    const createDirResult = await createArchiveDir(archiveDirName);

    if(createDirResult.err) throw createDirResult.err;
    const {dirLocation} = createDirResult;
    const archiveName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.zip`;
    const txtName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.txt`;
    const excelName = `${summaryById.summariesDateStr}.${summaryById.userId.department}.xlsx`;
    const archiveLoc = getFileLocation({fileName: archiveName});
    const txtLoc = getFileLocation({fileName: txtName, archiveDirName});
    const excelLoc = getFileLocation({fileName: excelName, archiveDirName});
    const txtResult = await createTxtFile({fileLoc: txtLoc,fileName: txtName,summaries:summaryById});

    if(txtResult.err) throw txtResult.err;
    const excelResult = await createExcelFile({fileLoc: excelLoc,fileName: excelName,summaries:summaryById});

    if(excelResult.err) throw excelResult.err;
    const archiveResult = await createArchiveFile({fileName: archiveName, fileLoc: archiveLoc,dirLocation});

    if(archiveResult.err) throw archiveResult.err;
    const file = new FileSummaries({
      creator: userId,
      path: archiveResult.path,
      fileName: archiveResult.fileName
    });
    const { _id } = await file.save();
    const message = getResultMessage(archiveResult.fileName);

    return { eventName: events.summaries.create_success, message, fileId: _id};
  } catch(err) {
    console.log('createArchived error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании архива', err};
  }
};
exports.createTxtForAll = async ({departmentsWithDocs,userId}) => {
  try {
    const oneLevelArray = departmentsWithDocs.reduce((p,c) => [...p, ...c],[]);
    const filteredByDepartmentSummaries = oneLevelArray.reduce((o, cur) => {
      const occurs = o.reduce((n, item, i) => (item.department === cur.department ? i : n), -1);

      if (occurs >= 0) { // If the department is found,
        o[occurs].days = o[occurs].days.concat(cur.dayId);
      } else {
        o = o.concat([{
          userId: cur.userId,
          department: cur.department,
          days: [cur.dayId]
        }]);
      }

      return o;
    }, []);

    await directoryPreparation();
    const date = moment();
    const archiveDirName = `Summaries_txt(${date.format('DD.MM.YY')}_${date.format('HH')}H${date.format('mm')}M)`;

    // create dir for all summaries
    await removeArchiveDir({dirName: archiveDirName});
    const createDirResult = await createArchiveDir(archiveDirName);

    if(createDirResult.err) throw createDirResult.err;
    const {dirLocation} = createDirResult;
    const archiveName = `${archiveDirName}.zip`;

    for (let i = 0; i < filteredByDepartmentSummaries.length; i++) {
      const filteredDepartment = filteredByDepartmentSummaries[i];
      const departmentDirName = `${filteredDepartment.department}`;
      const createResult = await createArchiveDir(path.join(archiveDirName,departmentDirName));

      if(createResult.err) throw createDirResult.err;
      const {dirLocation: departmentDirLocation} = createResult;

      const summariesById = await DaySummaries.find({
        '_id': {
          $in: filteredDepartment.days.map(v => mongoose.Types.ObjectId(v))
        }
      },projectionSummaries).populate('userId','department');

      for (let j = 0; j < summariesById.length; j++) {
        const summary = summariesById[j];
        const txtName = `${summary.summariesDateStr}.${departmentDirName}.txt`;
        const txtLoc = getFileLocation({fileName: txtName, archiveDirLoc: departmentDirLocation});
        const txtResult = await createTxtFile({fileLoc: txtLoc,fileName: txtName,summaries:summary});

        if(txtResult.err) throw txtResult.err;
      }
    }
    const archiveLoc = getFileLocation({fileName: archiveName});

    const archiveResult = await createArchiveFile({fileName: archiveName, fileLoc: archiveLoc,dirLocation});

    if (archiveResult.err) throw archiveResult.err;
    const file = new FileSummaries({
      creator: userId,
      path: archiveResult.path,
      fileName: archiveResult.fileName
    });
    const { _id } = await file.save();
    const message = getResultMessage(archiveResult.fileName);

    return { eventName: events.summaries.create_success, message, fileId: _id };
  } catch(err) {
    console.log('createArchived error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании архива', err};
  }
};
exports.createExcelForAll = async ({departmentsWithDocs,userId}) => {
  try {
    const oneLevelArray = departmentsWithDocs.reduce((p,c) => [...p, ...c],[]);
    const filteredByDepartmentSummaries = oneLevelArray.reduce((o, cur) => {
      const occurs = o.reduce((n, item, i) => (item.department === cur.department ? i : n), -1);

      if (occurs >= 0) { // If the department is found,
        o[occurs].days = o[occurs].days.concat(cur.dayId);
      } else {
        o = o.concat([{
          userId: cur.userId,
          department: cur.department,
          days: [cur.dayId]
        }]);
      }

      return o;
    }, []);

    await directoryPreparation();
    const date = moment();
    const archiveDirName = `Summaries_excel(${date.format('DD.MM.YY')}_${date.format('HH')}H${date.format('mm')}M)`;

    // create dir for all summaries
    await removeArchiveDir({dirName: archiveDirName});
    const createDirResult = await createArchiveDir(archiveDirName);

    if(createDirResult.err) throw createDirResult.err;
    const {dirLocation} = createDirResult;
    const archiveName = `${archiveDirName}.zip`;

    for (let i = 0; i < filteredByDepartmentSummaries.length; i++) {
      const filteredDepartment = filteredByDepartmentSummaries[i];
      const departmentDirName = `${filteredDepartment.department}`;
      const createResult = await createArchiveDir(path.join(archiveDirName,departmentDirName));

      if(createResult.err) throw createDirResult.err;
      const {dirLocation: departmentDirLocation} = createResult;

      const summariesById = await DaySummaries.find({
        '_id': {
          $in: filteredDepartment.days.map(v => mongoose.Types.ObjectId(v))
        }
      },projectionSummaries).populate('userId','department');

      for (let j = 0; j < summariesById.length; j++) {
        const summary = summariesById[j];

        const excelName = `${summary.summariesDateStr}.${departmentDirName}.xlsx`;
        const excelLoc = getFileLocation({fileName: excelName, archiveDirLoc:departmentDirLocation});
        const excelResult = await createExcelFile({fileLoc: excelLoc,fileName: excelName,summaries:summary});

        if(excelResult.err) throw excelResult.err;
      }
    }
    const archiveLoc = getFileLocation({fileName: archiveName});

    const archiveResult = await createArchiveFile({fileName: archiveName, fileLoc: archiveLoc,dirLocation});

    if (archiveResult.err) throw archiveResult.err;
    const file = new FileSummaries({
      creator: userId,
      path: archiveResult.path,
      fileName: archiveResult.fileName
    });
    const { _id } = await file.save();
    const message = getResultMessage(archiveResult.fileName);

    return { eventName: events.summaries.create_success, message, fileId: _id };
  } catch(err) {
    console.log('createArchived error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании архива', err};
  }
};
exports.createArchiveForAll = async ({departmentsWithDocs,userId}) => {
  try {
    const oneLevelArray = departmentsWithDocs.reduce((p,c) => [...p, ...c],[]);
    const filteredByDepartmentSummaries = oneLevelArray.reduce((o, cur) => {
      const occurs = o.reduce((n, item, i) => (item.department === cur.department ? i : n), -1);

      if (occurs >= 0) { // If the department is found,
        o[occurs].days = o[occurs].days.concat(cur.dayId);
      } else {
        o = o.concat([{
          userId: cur.userId,
          department: cur.department,
          days: [cur.dayId]
        }]);
      }

      return o;
    }, []);

    await directoryPreparation();
    const date = moment();
    const archiveDirName = `Summaries_all(${date.format('DD.MM.YY')}_${date.format('HH')}H${date.format('mm')}M)`;

    // create dir for all summaries
    await removeArchiveDir({dirName: archiveDirName});
    const createDirResult = await createArchiveDir(archiveDirName);

    if(createDirResult.err) throw createDirResult.err;
    const {dirLocation} = createDirResult;
    const archiveName = `${archiveDirName}.zip`;

    for (let i = 0; i < filteredByDepartmentSummaries.length; i++) {
      const filteredDepartment = filteredByDepartmentSummaries[i];
      const departmentDirName = `${filteredDepartment.department}`;
      const createResult = await createArchiveDir(path.join(archiveDirName,departmentDirName));

      if(createResult.err) throw createDirResult.err;
      const {dirLocation: departmentDirLocation} = createResult;

      const summariesById = await DaySummaries.find({
        '_id': {
          $in: filteredDepartment.days.map(v => mongoose.Types.ObjectId(v))
        }
      },projectionSummaries).populate('userId','department');

      for (let j = 0; j < summariesById.length; j++) {
        const summary = summariesById[j];
        const txtName = `${summary.summariesDateStr}.${departmentDirName}.txt`;
        const txtLoc = getFileLocation({fileName: txtName, archiveDirLoc: departmentDirLocation});
        const txtResult = await createTxtFile({fileLoc: txtLoc,fileName: txtName,summaries:summary});

        if(txtResult.err) throw txtResult.err;
        const excelName = `${summary.summariesDateStr}.${departmentDirName}.xlsx`;
        const excelLoc = getFileLocation({fileName: excelName, archiveDirLoc:departmentDirLocation});
        const excelResult = await createExcelFile({fileLoc: excelLoc,fileName: excelName,summaries:summary});

        if(excelResult.err) throw excelResult.err;
      }
    }
    const archiveLoc = getFileLocation({fileName: archiveName});

    const archiveResult = await createArchiveFile({fileName: archiveName, fileLoc: archiveLoc,dirLocation});

    if (archiveResult.err) throw archiveResult.err;
    const file = new FileSummaries({
      creator: userId,
      path: archiveResult.path,
      fileName: archiveResult.fileName
    });
    const { _id } = await file.save();
    const message = getResultMessage(archiveResult.fileName);

    return { eventName: events.summaries.create_success, message, fileId: _id };
  } catch(err) {
    console.log('createArchived error');
    console.log(err);
    return {eventName: events.summaries.create_error, message: 'Ошибка при создании архива', err};
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

const createTxtFile = async ({fileLoc,fileName,summaries}) => {
  try {
    await checkLocalFile(fileLoc,fileName);
    writeStream = fs.createWriteStream(fileLoc);
    summaries.summaries.forEach(async summary => {
      const { z1, z2, z3 } = summary;

      writeToFile(`СВОДКА ${moment(summaries.summariesDateStr, 'DD.MM.YY').format('DDMMYY')}`);
      writeToFile(strTxtZ1(z1));
      z2.forEach(async z2Value => {
        writeToFile(strTxtZ2(z2Value));
      });
      writeToFile(strTxtZ3(z3));
      writeToFile();
    });

    return { path: fileLoc, fileName };
  } catch(err) {
    console.log('createTxtFile function ERROR');
    console.log(err);
    return { err };
  } finally {
    writeStream.close();
  }
};
const createExcelFile = async ({fileLoc,fileName,summaries}) => {
  try {
    await checkLocalFile(fileLoc,fileName);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`СВОДКА ${summaries.userId.department}`);

    workbook.creator = summaries.userId.department;
    workbook.lastModifiedBy = summaries.userId.department;
    workbook.created = new Date();

    const {summaries: summariesArray} = summaries;
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


    for (let i = 0; i < summariesArray.length; i++) {
      const { z1, z2, z3 } = summariesArray[i];
      const resultArray = [];

      resultArray.push(['СВОДКА',moment(summaries.summariesDateStr, 'DD.MM.YY').format('DDMMYY')]);
      resultArray.push(arrayExcelZ1(z1));
      for (let j = 0; j < z2.length; j++) {
        resultArray.push(arrayExcelZ2(z2[j]));
      }
      resultArray.push(arrayExcelZ3(z3));

      resultArray.push([' ']);
      worksheet.addRows(resultArray);
    }

    await workbook.xlsx.writeFile(fileLoc);
    return { path: fileLoc, fileName };
  } catch (err) {
    console.log('createExcelFile function ERROR');
    console.log(err);
    return { err };
  }
};
const createArchiveFile = async ({fileLoc,fileName,files,dirLocation}) => {
  try {
    await checkLocalFile(fileLoc,fileName);

    const output = fs.createWriteStream(fileLoc);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      // console.log(archive.pointer() + ' total bytes');
      // console.log('archiver has been finalized and the output file descriptor has closed.');
      removeArchiveDir({dirLocation});
    });
    output.on('end', () => {}/*console.log('Data has been drained')*/);
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.log('Archive error ENOENT');
        console.error(err);
      } else {
        throw err;
      }
    });

    archive.on('error', err => { throw err; });
    archive.pipe(output);

    if(dirLocation) {
      archive.directory(dirLocation, false);
    } else if(files) {

    }
    archive.finalize();

    return { path: fileLoc, fileName };
  } catch(err) {
    console.log('createArchiveFile function ERROR');
    console.log(err);
    return { err };
  }
};

/* eslint-disable */
const strTxtZ1 = z1 => {
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
const strTxtZ2 = z2 => {
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
  } = z2;

  return `З2 ${code} ${entryPoint} ${timeWithoutColon(entryTime)} ${exitPoint} ${timeWithoutColon(exitTime)}`;
};
const strTxtZ3 = z3 => {
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
  } = z3;

  return `З3 ${airspaceType} ${nonRequired(aircraftTypeName)} ${nonRequired(depAirportCoord)} ${nonRequired(destAirportCoord)}`;
};

const arrayExcelZ1 = z1 => {
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
const arrayExcelZ2 = z2 => {
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
  } = z2;

  return ['З2',code,entryPoint,timeWithoutColon(entryTime),exitPoint,timeWithoutColon(exitTime)];
};
const arrayExcelZ3 = z3 => {
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
const createTempDir = async ()          => new Promise((resolve,reject) => fs.mkdir(tempDirLocation, err => err?reject({err}):resolve({str:`${tempDirLocation}: was created`}))); // eslint-disable-line
const createArchiveDir = async location => new Promise((resolve,reject) => { const d=path.join(tempDirLocation,location);fs.mkdir(d,err=>err?reject({err}):resolve({str:`${d}: was created`,dirLocation:d}))}); // eslint-disable-line
const removeFile    = async file        => new Promise((resolve,reject) => fs.unlink(file, err => err?reject({err}):resolve({str:`${file}: was deleted`}))); // eslint-disable-line
const removeArchiveDir = async ({dirName,dirLocation}) => new Promise((resolve,reject) => { const d=path.resolve(path.join(tempDirLocation,dirName?dirName:'')); rmdir(dirLocation?dirLocation:d, err => err?reject({err}):resolve({str:`${d}: was deleted`})); }); // eslint-disable-line
const getFileLocation = ({fileName,archiveDirName,archiveDirLoc}) => path.resolve(path.join(archiveDirLoc?archiveDirLoc:tempDirLocation,archiveDirName?archiveDirName:'',fileName));
const nonRequired = field => field ? field : '-';
const timeWithoutColon = timeStr => timeStr.replace(':', '');
const getResultMessage = fileName => `Файл создан [${fileName}]. Автоматическое скачивание через 5 сек...`;

const projectionSummaries = {
  version: 0,
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

const directoryPreparation = async () => {
  if(!tempDirExist()) {
    const result = await createTempDir();

    if(result.err) {
      console.error(result.err);
      throw result.err;
    }
    console.log(result.str);
  } else {
    // console.log('Directory exist');
  }
};
const checkLocalFile = async (fileLoc,fileName) => {
  if(checkFileExist(fileLoc)) {
    await removeFile(fileLoc);
    await FileSummaries.deleteMany({fileName: fileName});
  }
};
/* eslint-enable */