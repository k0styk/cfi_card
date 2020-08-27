const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required!',
    },
    rights: {
      type: String,
      required: 'Rights is required!'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Summary', summarySchema);