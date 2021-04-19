const moment = require('moment');
const rmdir = require('rimraf');
const path = require('path');
const fs = require('fs');
const delayTime = process.env['DELAY_TIME'];
const timeToRemove = process.env['TIME_TO_REMOVE'];
const message = `[${process.env.NODE_ENV==='dev'?'dev':(process.env.NODE_ENV==='prod'?'prod':'UNDEF')}]Cleaner stared`;

/**
* @param {{ delayTime: number, timeToRemove: string}}
*/
const timer = async ({delayTime,timeToRemove}) => {
  const clearDir = async () => {
    if (timeToRemove === moment().format('HH:mm')) {
      const tempDirLocation = path.resolve(path.join(__dirname, '..', '..', '..', 'temp'));
      const tempDirExist = () => fs.existsSync(tempDirLocation);

      if(tempDirExist()) {
        rmdir(tempDirLocation+'/*', err => err?console.log(err):console.log(`${tempDirLocation}: cleared`));
      }
    }
  };

  setInterval(clearDir,delayTime);
};

(async () => {
  if(delayTime&&timeToRemove) {
    console.log(message);
    timer({delayTime,timeToRemove});
  } else {
    console.log(`Temp cleaner not started, some propertiens in config is not presented:`);
    console.log(`DELAY_TIME:${delayTime} --- TIME_TO_REMOVE:${timeToRemove}`);
  }
})();