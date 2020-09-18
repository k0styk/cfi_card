const mongoose = require('mongoose');
const summarySchema = require('./Summary').schema;
const summaryDocument = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'User is required!',
      ref: 'User',
    },
    summary: {
      type: summarySchema,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: 'summary_documents'
  }
);

module.exports = mongoose.model('SummaryDocument', summaryDocument);