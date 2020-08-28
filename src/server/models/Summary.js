const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'User is required!',
      ref: 'User',
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