const mongoose = require('mongoose');

//login, password, description, displayName, rights
const fileSchema = new mongoose.Schema(
  {
    creator: {
      required: 'Creator is required',
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    path: {
      required: 'Path is required',
      type: String,
    },
    fileName: {
      required: 'File name is required',
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Files', fileSchema);