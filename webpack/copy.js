//  Install this:
//  npm i -D copy-webpack-plugin
//
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function ({ paths, options }) {
  return {
    plugins: [
      new CopyPlugin(paths.map((val,idx) => ({ from: val, to: options })))
    ],
  };
};