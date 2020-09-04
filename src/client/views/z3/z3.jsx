import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions';
import { InputMask } from '@components';

import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, Paper, TextField, MenuItem } from '@material-ui/core';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  one:    { minWidth: '100px'  },
  two:    { minWidth: '195px' },
  three:  { minWidth: '185px' },
  four:   { minWidth: '190px' },
  five:   { minWidth: '140px' },
  paperFirst: {
    padding: '13px 10px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: '26px'
  }
}));

const z3View = ({
  id,
  summary,
  airspaceTypeSet,
  aircraftTypeNameSet,
  depAirportCoordSet,
  destAirportCoordSet,
  // airspaceTypeGTimeSet
  setValid
}) => {
  const classes = useStyles();
  const [curSummary] = summary.value.filter(v => v.id === id);
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
    // airspaceTypeGTime,
    validation
  } = curSummary.z3;
  const z2l = curSummary.z2.length;

  const validationFields = {
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
  };
  const handleValidateWrapper = (fieldName, operation) => {
    let val = 0;

    if(operation) {
      val = validation | validationFields[fieldName].mask;
    } else {
      val = validation & (validationFields[fieldName].mask ^ 0xFFF);
    }
    setValid(id,val);
  };
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case validationFields.airspaceType.name:
        if(value==='G'&&z2l) {
          handleValidateWrapper(fieldName,0);
        } else {
          handleValidateWrapper(fieldName,1);
        }
        break;
      case validationFields.aircraftTypeName.name:
        if(curSummary.z1.aircraftType==='ZZZZ'||curSummary.z1.aircraftType==='ЗЗЗЗ') {
          if(value.length) {
            handleValidateWrapper(fieldName,1);
          } else handleValidateWrapper(fieldName,0);
        } else handleValidateWrapper(fieldName,0);
        break;
      case validationFields.depAirportCoord.name:
        if (value.length > 0) {
          if (curSummary.z1.depAirport === 'ZZZZ'||curSummary.z1.depAirport === 'ЗЗЗЗ') {
            if (value.indexOf('_') !== -1) {
              handleValidateWrapper(fieldName, 0);
            } else {
              handleValidateWrapper(fieldName, 1);
            }
          } else {
            handleValidateWrapper(fieldName, 0);
          }
        } else handleValidateWrapper(fieldName, 0);
        break;
      case validationFields.destAirportCoord.name:
        if (value.length > 0) {
          if (curSummary.z1.destAirport === 'ZZZZ'||curSummary.z1.destAirport === 'ЗЗЗЗ') {
            if (value.indexOf('_') !== -1) {
              handleValidateWrapper(fieldName, 0);
            } else {
              handleValidateWrapper(fieldName, 1);
            }
          } else {
            handleValidateWrapper(fieldName, 0);
          }
        } else handleValidateWrapper(fieldName, 0);
        break;
    }
  };
  const errorResolverG = (z2Val, val) => {
    if(z2Val) {
      if(val === 'G') {
        return ['Недопустимо',true];
      }
      return ['',false];
    }
    return ['',false];
  };
  const errorResolverZ = (z1Val,val) => {
    if(z1Val==='ZZZZ'||z1Val==='ЗЗЗЗ') {
      if(!!!val||val.indexOf('_')!==-1) {
        return ['Необходимо заполнить', true];
      }
      return ['', false];
    };
    if(val.indexOf('_')!==-1) {
      return ['Необходимо заполнить', true];
    }
    return ['', false];
  };

  return (
    <div className="z3-view">
      <Grid container className={classes.root} spacing={1} wrap="wrap">
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z3</Paper>
        </Grid>
        {/* 1 req filter of z2 */}
        <Grid item xs className={classes.one}>
          <TextField
            error={errorResolverG(z2l,airspaceType)[1]}
            helperText={errorResolverG(z2l,airspaceType)[0]}
            fullWidth
            id="select"
            label="Класс ВП"
            value={airspaceType?airspaceType:''}
            onChange={e => {
              airspaceTypeSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            inputProps={{
              maxLength: 2,
              style: { textTransform: 'uppercase' },
              name: validationFields.airspaceType.name
            }}
            select
          >
            {['A','C','G','CG'].map((v,i) =>
              <MenuItem disabled={(v==='G' && !!z2l)} key={v} value={v}>{v}</MenuItem>)}
          </TextField>
        </Grid>
        {/* 2 req if z1 3 stay ZZZZ*/}
        <Grid item xs className={classes.two}>
          <TextField
            error={errorResolverZ(curSummary.z1.aircraftType, aircraftTypeName)[1]}
            helperText={errorResolverZ(curSummary.z1.aircraftType, aircraftTypeName)[0]}
            value={aircraftTypeName}
            onChange={e => {
              aircraftTypeNameSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            label="Наименование типа ВС"
            inputProps={{
              maxLength: 25,
              style: { textTransform: 'uppercase' },
              name: validationFields.aircraftTypeName.name
            }}
          />
        </Grid>
        {/* 3 req if z1 4 ZZZZ*/}
        <Grid item xs className={classes.three}>
          <InputMask
            error={errorResolverZ(curSummary.z1.depAirport, depAirportCoord)[1]}
            helperText={errorResolverZ(curSummary.z1.depAirport, depAirportCoord)[0]}
            mask="9999С99999В"
            value={depAirportCoord}
            onChange={e => {
              depAirportCoordSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            label="Коорд А-д/П-п вылета"
            inputProps={{
              maxLength: 12,
              style: { textTransform: 'uppercase' },
              name: validationFields.depAirportCoord.name
            }}
          />
        </Grid>
        {/* 4 req if z1 5 ZZZZ*/}
        <Grid item xs className={classes.four}>
          <InputMask
            error={errorResolverZ(curSummary.z1.destAirport, destAirportCoord)[1]}
            helperText={errorResolverZ(curSummary.z1.destAirport, destAirportCoord)[0]}
            mask="9999С99999В"
            value={destAirportCoord}
            onChange={e => {
              destAirportCoordSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            label="Коорд А-д/П-п посадки"
            inputProps={{
              maxLength: 12,
              style: { textTransform: 'uppercase' },
              name: validationFields.destAirportCoord.name
            }}
          />
        </Grid>
        {/* 5 if class G not allowed */}
        <Grid item xs className={classes.five}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardTimePicker
              disabled
              autoOk
              mask="__:__"
              ampm={false}
              cancelLabel="Отмена"
              clearLabel="Очистить"
              okLabel="Принять"
              todayLabel="Сейчас"
              clearable
              showTodayButton
              margin="normal"
              placeholder="приказ 80"
              value={null}
              onChange={v => v}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 6 */}
        <Grid item xs></Grid>
        {/* 7 */}
        <Grid item xs></Grid>
        {/* 8 */}
        <Grid item xs></Grid>
        {/* 9 */}
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

/* eslint-disable */
const mstp = state => ({ summary: state.summary });
const mdtp = dispatch => ({
  airspaceTypeSet:      (id, airspaceType)      => dispatch(summaryAction.z3.AIRSPACETYPE_SET({id, airspaceType})),
  aircraftTypeNameSet:  (id, aircraftTypeName)  => dispatch(summaryAction.z3.AIRCRAFTTYPENAME_SET({id, aircraftTypeName})),
  depAirportCoordSet:   (id, depAirportCoord)   => dispatch(summaryAction.z3.DEPAIRPORTCOORD_SET({id, depAirportCoord})),
  destAirportCoordSet:  (id, destAirportCoord)  => dispatch(summaryAction.z3.DESTAIRPORTCOORD_SET({id, destAirportCoord})),
  airspaceTypeGTimeSet: (id, airspaceTypeGTime) => dispatch(summaryAction.z3.AIRSPACETYPEGTIME_SET({id, airspaceTypeGTime})),
  setValid:             (id, state)             => dispatch(summaryAction.z3.VALIDATION_SET({id, state}))
});
/* eslint-enable */

export default connect(mstp, mdtp)(z3View);