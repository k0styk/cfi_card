const mongoose = require('mongoose');

const schemaSummaryZ2 = new mongoose.Schema({
  id: Number,
  code: {
    required: 'code req',
    type: String,
    minlength:4,
    maxlength:4
  },
  entryPoint: {
    required: 'entryPoint req',
    type: String,
    match: /^\d{4}N\d{5}E$/gmi
  },
  entryTime: {
    required: 'entryTime req',
    type: String,
    match: /^([01]\d|2[0-3]):[0-5]\d$/gmi
  },
  exitPoint: {
    required: 'exitPoint req',
    type: String,
    match: /^\d{4}N\d{5}E$/gmi
  },
  exitTime: {
    required: 'exitTime req',
    type: String,
    match: /^([01]\d|2[0-3]):[0-5]\d$/gmi
  },
  // flyCtg: {},
  // countOfDep: {},
  // countOfApp: {},
  validation: {
    required: 'validation req',
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
  archive: {
    required: 'archive req',
    type: Boolean,
    enum: [true]
  },
  counter: Number,
  fieldValidation: Number,
  factValidation: Number,
  z1: {
    flyDate: {
      required: 'z1.flyDate req',
      type: String,
      match: /^\d{2}\/\d{2}\/\d{2}$/gmi
    },
    acftIdent: {
      required: 'z1.acftIdent req',
      type: String,
      minlength:1,
      maxlength:7,
    },
    aircraftType: {
      required: 'z1.aircraftType req',
      type: String,
      minlength:4,
      maxlength:4
    },
    depAirport: {
      required: 'z1.depAirport req',
      type: String,
      minlength:4,
      maxlength:4
    },
    destAirport: {
      required: 'z1.destAirport req',
      type: String,
      minlength:4,
      maxlength:4,
    },
    entryPoint: {
      type: String,
    },
    entryTime: {
      required: 'z1.entryTime req',
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
      required: 'z1.validation req',
      type: Number,
      enum: [63],
    },
  },
  z2: [schemaSummaryZ2],
  z3: {
    airspaceType: {
      required: 'airspaceType req',
      type: String,
      enum: ['A','C','G','CG']
    },
    aircraftTypeName: {
      type: String,
      maxlength: 25,
      required: function() {
        return (this.z1.aircraftType === 'ZZZZ')?'aircraftTypeName req':false;
      }
    },
    depAirportCoord: {
      type: String,
      match: /^\d{4}N\d{5}E$/gmi,
      required: function() {
        return (this.z1.depAirport === 'ZZZZ')?'depAirportCoord req':false;
      }
    },
    destAirportCoord: {
      type: String,
      match: /^\d{4}N\d{5}E$/gmi,
      required: function() {
        return (this.z1.destAirport === 'ZZZZ')?'destAirportCoord req':false;
      }
    },
    // airspaceTypeGTime: {},
    validation: {
      required: 'validation req',
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