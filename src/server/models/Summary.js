const mongoose = require('mongoose');

const schemaSummaryZ2 = new mongoose.Schema({
  id: Number,
  code: {
    required: true,
    type: String,
    minlength:4,
    maxlength:4
  },
  entryPoint: {
    required: true,
    type: String,
    match: /^\d{4}N\d{5}E$/gmi
  },
  entryTime: {
    required: true,
    type: String,
    match: /^([01]\d|2[0-3]):[0-5]\d$/gmi
  },
  exitPoint: {
    required: true,
    type: String,
    match: /^\d{4}N\d{5}E$/gmi
  },
  exitTime: {
    required: true,
    type: String,
    match: /^([01]\d|2[0-3]):[0-5]\d$/gmi
  },
  // flyCtg: {},
  // countOfDep: {},
  // countOfApp: {},
  validation: {
    required: true,
    type: Number,
    enum: [31],
  }
},
{
  id: false,
  _id: false
});

const summarySchema = new mongoose.Schema({
  id: Number,
  archieve: {
    required: true,
    type: Boolean,
    enum: [true]
  },
  counter: Number,
  fieldValidation: Number,
  factValidation: Number,
  z1: {
    flyDate: {
      required: true,
      type: String,
      match: /^\d{2}\/\d{2}\/\d{2}$/gmi
    },
    acftIdent: {
      required: true,
      type: String,
      minlength:1,
      maxlength:7,
    },
    aircraftType: {
      required: true,
      type: String,
      minlength:4,
      maxlength:4
    },
    depAirport: {
      required: true,
      type: String,
      minlength:4,
      maxlength:4
    },
    destAirport: {
      required: true,
      type: String,
      minlength:4,
      maxlength:4,
    },
    entryPoint: {
      type: String,
    },
    entryTime: {
      required: true,
      type: String,
      match: /^([01]\d|2[0-3]):[0-5]\d$/gmi
    },
    exitPoint: {
      type: String,
    },
    regno: {
      type: String,
    },
    validation: {
      required: true,
      type: Number,
      enum: [63],
    },
  },
  z2: [schemaSummaryZ2],
  z3: {
    airspaceType: {
      required: true,
      type: String,
      enum: ['A','C','G','CG']
    },
    aircraftTypeName: {
      type: String,
      maxlength: 25,
      required: function() {
        return this.z1.aircraftType === 'ZZZZ';
      }
    },
    depAirportCoord: {
      type: String,
      match: /^\d{4}N\d{5}E$/gmi,
      required: function() {
        return this.z1.depAirport === 'ZZZZ';
      }
    },
    destAirportCoord: {
      type: String,
      match: /^\d{4}N\d{5}E$/gmi,
      required: function() {
        return this.z1.destAirport === 'ZZZZ';
      }
    },
    // airspaceTypeGTime: {},
    validation: {
      required: true,
      type: Number,
      enum: [1,3,5,9,11,13,15]
    }
  }
},
{
  id: false,
  _id: false
});

module.exports = mongoose.model('Summary', summarySchema);