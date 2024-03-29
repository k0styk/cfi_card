const z1Validator = {
  validationFields: {
    flyDate: {
      name: 'flyDate',
      mask: 1<<0
    },
    acftIdent: {
      name: 'acftIdent',
      mask: 1<<1
    },
    aircraftType: {
      name: 'aircraftType',
      mask: 1<<2
    },
    depAirport: {
      name: 'depAirport',
      mask: 1<<3
    },
    destAirport: {
      name: 'destAirport',
      mask: 1<<4
    },
    entryTime: {
      name: 'entryTime',
      mask: 1<<5
    }
  },
  validateField: function(fieldName, value) {
    const retVal = {
      mask: this.validationFields[fieldName].mask,
      operation: 1,
      error: {
        [fieldName]: '',
      },
    };

    switch (fieldName) {
      case this.validationFields.flyDate.name:
      case this.validationFields.entryTime.name:
        if(value) {
          if(!value.isValid()) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Некорректная дата',
              },
            };
          }
        } else {
          return {
            ...retVal,
            operation: 0,
            error: {
              [fieldName]: 'Некорректная дата',
            },
          };
        }
        break;
      case this.validationFields.acftIdent.name:
        if (!value.length) {
          return {
            ...retVal,
            operation: 0,
            error: {
              [fieldName]: 'Обязательное поле',
            },
          };
        }
        break;
      case this.validationFields.aircraftType.name:
        if (value.length < 2 || value.length > 4) {
          return {
            ...retVal,
            operation: 0,
            error: {
              [fieldName]: 'Обязательное поле',
            },
          };
        }
        break;
      case this.validationFields.depAirport.name:
      case this.validationFields.destAirport.name:
        if (value.length !== 4) {
          return {
            ...retVal,
            operation: 0,
            error: {
              [fieldName]: 'Обязательное поле',
            },
          };
        }
        break;
    }
    return retVal;
  }
};
const z2Validator = {
  validationFields: {
    code: {
      name: 'code',
      mask: 1<<0
    },
    entryPoint: {
      name: 'entryPoint',
      mask: 1<<1
    },
    entryTime: {
      name: 'entryTime',
      mask: 1<<2
    },
    exitPoint: {
      name: 'exitPoint',
      mask: 1<<3
    },
    exitTime: {
      name: 'exitTime',
      mask: 1<<4
    }
  },
  validateField: function(fieldName, value, compass) {
    const retVal = {
      mask: this.validationFields[fieldName].mask,
      operation: 1,
      error: {
        [fieldName]: '',
      },
    };

    switch (fieldName) {
      case this.validationFields.code.name:
        if(value.length !== 4) {
          return {
            ...retVal,
            operation: 0,
            error: {
              [fieldName]: 'Обязательное поле',
            },
          };
        }
        break;
      case this.validationFields.exitPoint.name:
      case this.validationFields.entryPoint.name:
        if(compass) {
          if (!value || value.indexOf('_') !== -1) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Необходимо заполнить',
              },
            };
          }
        } else {
          if (!(/[\w\d]{3,5}/gi.test(value))) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Необходимо заполнить',
              },
            };
          }
        }
        break;
      case this.validationFields.entryTime.name:
      case this.validationFields.exitTime.name:
        if(value) {
          if(!value.isValid()) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Некорректная дата',
              },
            };
          }
        } else {
          return {
            ...retVal,
            operation: 0,
            error: {
              [fieldName]: 'Некорректная дата',
            },
          };
        }
        break;
    }
    return retVal;
  },
};
const z3Validator = {
  validationFields: {
    airspaceType: {
      name: 'airspaceType',
      mask: 1<<0
    },
    aircraftTypeName: {
      name: 'aircraftTypeName',
      mask: 1<<1
    },
    depAirportCoord: {
      name: 'depAirportCoord',
      mask: 1<<2
    },
    destAirportCoord: {
      name: 'destAirportCoord',
      mask: 1<<3
    }
  },
  validateField: function(fieldName,value,z1,z2l) {
    const retVal = {
      mask: this.validationFields[fieldName].mask,
      operation: 1,
      error: {
        [fieldName]: '',
      },
    };

    switch (fieldName) {
      case this.validationFields.airspaceType.name:
        if(value) {
          if(value==='G'&&z2l) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Недопустимо',
              },
            };
          }
        } else {
          return {
            ...retVal,
            mask: 0,
            operation: 1,
          };
        }
        break;
      case this.validationFields.aircraftTypeName.name:
        if(z1.aircraftType==='ZZZZ') {
          if(!value) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Необходимо заполнить',
              },
            };
          }
        } else {
          return {
            ...retVal,
            mask: 0,
            operation: 1,
          };
        }
        break;
      case this.validationFields.depAirportCoord.name:
        if (z1.depAirport === 'ZZZZ') {
          if (!value || value.indexOf('_') !== -1) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Необходимо заполнить',
              },
            };
          }
        } else {
          return {
            ...retVal,
            mask: 0,
            operation: 1,
          };
        }
        break;
      case this.validationFields.destAirportCoord.name:
        if (z1.destAirport === 'ZZZZ') {
          if (!value || value.indexOf('_') !== -1) {
            return {
              ...retVal,
              operation: 0,
              error: {
                [fieldName]: 'Необходимо заполнить',
              },
            };
          }
        } else {
          return {
            ...retVal,
            mask: 0,
            operation: 1,
          };
        }
    }
    return retVal;
  },
};


export {
  z1Validator,
  z2Validator,
  z3Validator
};