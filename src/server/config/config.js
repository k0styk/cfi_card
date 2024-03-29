const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    const file = path.resolve(
      `${__dirname}/${process.env.NODE_ENV}.config.json`
    );

    try {
      this.values = JSON.parse(fs.readFileSync(file));
    } catch(e) {
      console.error('FATAL: Config not found!'); // eslint-disable-line
      process.exit(1);
    }
  }

  getValue(key) {
    if (!this.values[key]) {
      return null;
    } else {
      return this.values[key];
    }
  }

  getAll() {
    if(this.values) return this.values;
    else null;
  }
}

module.exports = new Config();