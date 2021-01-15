const mongoose = require('mongoose');

//login, password, description, displayName, rights
const fileSchema = new mongoose.Schema(
  {
    path: String,
    name: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('File', fileSchema);