const path = require('path');
const fs = require('fs');

const createTxt = async () => {
  try {
    await directoryPreparation();
    const resultWrite = await writeToFile(fileLocation('meowk.txt'), 'SUKA BLYAT');

    if(resultWrite.s) {
      console.log(resultWrite.str);
      setTimeout(async () => {
        const s = await removeFile(fileLocation('meowk.txt'));

        if(s.s) {
          console.log(s.str);
        } else {
          console.log(s.err);
        }
      },5000);
    } else {
      console.log(resultWrite.err);
    }

  } catch(err) {
    console.log(err);
  }
};



createTxt();