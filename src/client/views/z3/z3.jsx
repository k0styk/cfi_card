import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions';
import { InputMask } from '@components';
import { z3Validator } from '../../validators/validators';
import replaceLayout from '../../helpers/layoutReplacer';

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
  curSummary,
  airspaceTypeSet,
  aircraftTypeNameSet,
  depAirportCoordSet,
  destAirportCoordSet,
  // airspaceTypeGTimeSet
  setValid,
  setError,
}) => {
  const classes = useStyles();
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
    // airspaceTypeGTime,
    validation,
    errors,
  } = curSummary.z3;
  const [values, setValues] = React.useState(() => ({
    airspaceType: airspaceType,
    aircraftTypeName: aircraftTypeName,
    depAirportCoord: depAirportCoord,
    destAirportCoord: destAirportCoord,
  }));

  const handleValidateWrapper = ({mask, operation}) => {
    let val = 0;

    if(operation) {
      val = validation | mask;
    } else {
      val = validation & (mask ^ 0xFFF);
    }
    setValid(id,val);
  };
  const validateField = (fieldName, value) => {
    const v = z3Validator.validateField(fieldName, value, curSummary.z1, curSummary.z2.length);

    if(v.error[fieldName] !== errors[fieldName]) {
      setError(id, {...v.error});
    }
    handleValidateWrapper(v);
  };

  React.useEffect(() => {
    setValues({
      airspaceType,
      aircraftTypeName,
      depAirportCoord,
      destAirportCoord,
    });
  },[
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
  ]);
  React.useEffect(() => {
    validateField('airspaceType', values.airspaceType);
  },[curSummary.z2]);
  React.useEffect(() => {
    validateField('aircraftTypeName', values.aircraftTypeName);
  },[curSummary.z1.aircraftType]);
  React.useEffect(() => {
    validateField('depAirportCoord', values.depAirportCoord);
  },[curSummary.z1.depAirport]);
  React.useEffect(() => {
    validateField('destAirportCoord', values.destAirportCoord);
  },[curSummary.z1.destAirport]);

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
            error={!!errors.airspaceType}
            helperText={errors.airspaceType}
            fullWidth
            // id="select"
            label="Класс ВП"
            value={values.airspaceType?values.airspaceType:''}
            onChange={e => {
              validateField(e.target.name, e.target.value);
              setValues({
                ...values,
                airspaceType: e.target.value
              });
            }}
            onBlur={() => {
              if(airspaceType !== values.airspaceType) {
                airspaceTypeSet(id, values.airspaceType);
              }
            }}
            inputProps={{
              maxLength: 2,
              style: { textTransform: 'uppercase' },
              name: 'airspaceType'
            }}
            select
          >
            {['A','C','G','CG'].map((v,i) =>
              <MenuItem disabled={(v==='G' && !!curSummary.z2.length)} key={v+':'+i} value={v}>{v}</MenuItem>)}
          </TextField>
        </Grid>
        {/* 2 req if z1 3 stay ZZZZ*/}
        <Grid item xs className={classes.two}>
          <TextField
            error={!!errors.aircraftTypeName}
            helperText={errors.aircraftTypeName}
            value={values.aircraftTypeName}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                aircraftTypeName: value
              });
            }}
            onBlur={() => {
              if(aircraftTypeName !== values.aircraftTypeName) {
                aircraftTypeNameSet(id, values.aircraftTypeName);
              }
            }}
            label="Наименование типа ВС"
            inputProps={{
              maxLength: 25,
              style: { textTransform: 'uppercase' },
              name: 'aircraftTypeName'
            }}
          />
        </Grid>
        {/* 3 req if z1 4 ZZZZ*/}
        <Grid item xs className={classes.three}>
          <InputMask
            error={!!errors.depAirportCoord}
            helperText={errors.depAirportCoord}
            mask="9999N99999E"
            value={values.depAirportCoord}
            onChange={e => {
              const value = e.target.value.toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                depAirportCoord: value
              });
            }}
            onBlur={() => {
              if(depAirportCoord !== values.depAirportCoord) {
                depAirportCoordSet(id, values.depAirportCoord);
              }
            }}
            label="Коорд А-д/П-п вылета"
            inputProps={{
              maxLength: 12,
              style: { textTransform: 'uppercase' },
              name: 'depAirportCoord'
            }}
          />
        </Grid>
        {/* 4 req if z1 5 ZZZZ*/}
        <Grid item xs className={classes.four}>
          <InputMask
            error={!!errors.destAirportCoord}
            helperText={errors.destAirportCoord}
            mask="9999N99999E"
            value={values.destAirportCoord}
            onChange={e => {
              const value = e.target.value.toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                destAirportCoord: value
              });
            }}
            onBlur={() => {
              if(destAirportCoord !== values.destAirportCoord) {
                destAirportCoordSet(id, values.destAirportCoord);
              }
            }}
            label="Коорд А-д/П-п посадки"
            inputProps={{
              maxLength: 12,
              style: { textTransform: 'uppercase' },
              name: 'destAirportCoord'
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
const mstp = state => ({});
const mdtp = dispatch => ({
  airspaceTypeSet:      (id, airspaceType)      => dispatch(summaryAction.z3.AIRSPACETYPE_SET({id, airspaceType})),
  aircraftTypeNameSet:  (id, aircraftTypeName)  => dispatch(summaryAction.z3.AIRCRAFTTYPENAME_SET({id, aircraftTypeName})),
  depAirportCoordSet:   (id, depAirportCoord)   => dispatch(summaryAction.z3.DEPAIRPORTCOORD_SET({id, depAirportCoord})),
  destAirportCoordSet:  (id, destAirportCoord)  => dispatch(summaryAction.z3.DESTAIRPORTCOORD_SET({id, destAirportCoord})),
  airspaceTypeGTimeSet: (id, airspaceTypeGTime) => dispatch(summaryAction.z3.AIRSPACETYPEGTIME_SET({id, airspaceTypeGTime})),
  setValid:             (id, state)             => dispatch(summaryAction.z3.VALIDATION_SET({id, state})),
  setError:             (id, field)             => dispatch(summaryAction.z3.ERROR_SET({id, field})),
});
/* eslint-enable */

export default /*React.memo(*/connect(mstp, mdtp)(z3View)/*)*/;