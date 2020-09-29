import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions/';
import { Autocomplete } from '@components';
import { z1Validator } from '../../validators/validators';
import replaceLayout from '../../helpers/layoutReplacer';

import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid, Paper, TextField } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  one:    { minWidth: '130px' },
  two:    { minWidth: '95px'  },
  three:  { minWidth: '75px'  },
  four:   { minWidth: '130px' },
  five:   { minWidth: '135px' },
  six:    { minWidth: '105px' },
  seven:  { minWidth: '110px' },
  eight:  { minWidth: '115px' },
  nine:   { minWidth: '125px' },
  paperFirst: {
    padding: '13px 10px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: '26px'
  }
}));

// let validation = 33; // default flyDate and entryTime are set, 2<<0 | 2<<<5 = 33
const z1View = ({
  id,
  z1,
  flyDateSet,
  acftIdentSet,
  aircraftTypeSet,
  depAirportSet,
  destAirportSet,
  entryPointSet,
  entryTimeSet,
  exitPointSet,
  regnoSet,
  setValid,
  setError,
}) => {
  const classes = useStyles();
  const {
    flyDate,
    acftIdent,
    aircraftType,
    depAirport,
    destAirport,
    entryPoint,
    entryTime,
    exitPoint,
    regno,
    validation,
    errors
  } = z1;
  const [flyDateState, setFlyDateState] = React.useState(flyDate);
  const [entryTimeState, setEntryTimeState] = React.useState(entryTime);
  const [values, setValues] = React.useState(() => ({
    acftIdent: acftIdent,
    aircraftType: aircraftType,
    depAirport: depAirport,
    destAirport: destAirport,
    entryPoint: entryPoint,
    exitPoint: exitPoint,
    regno: regno,
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
    const v = z1Validator.validateField(fieldName, value);

    if(v.error[fieldName] !== errors[fieldName]) {
      setError(id, {...v.error});
    }
    handleValidateWrapper(v);
  };

  React.useEffect(() => {
    setFlyDateState(moment(flyDate, 'DD/MM/YY'));
  }, [flyDate]);
  React.useEffect(() => {
    setEntryTimeState(moment(entryTime, 'HH:mm'));
  },[entryTime]);
  React.useEffect(() => {
    setValues({
      acftIdent,
      aircraftType,
      depAirport,
      destAirport,
      entryPoint,
      exitPoint,
      regno,
    });
  },[
    acftIdent,
    aircraftType,
    depAirport,
    destAirport,
    entryPoint,
    exitPoint,
    regno,
  ]);

  return (
    <div className="z1-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0     */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z1</Paper>
        </Grid>
        {/* 1 req */}
        <Grid item xs className={classes.one} >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              error={!!errors.flyDate}
              helperText={errors.flyDate}
              placeholder="DD/MM/YY"
              disableToolbar
              variant="inline"
              format="DD/MM/YY"
              mask="__/__/__"
              margin="normal"
              value={flyDateState}
              onChange={v => {
                validateField('flyDate', v);
                setFlyDateState(v);
              }}
              onBlur={() => {
                if(moment(flyDateState).isValid()) {
                  if(!moment(flyDateState).isSame(moment(flyDate,'DD/MM/YY')))
                    flyDateSet(id, moment(flyDateState).format('DD/MM/YY'));
                } else {
                  flyDateSet(id, null);
                }
              }}
              onClose={() => {
                if(moment(flyDateState).isValid()) {
                  if(!moment(flyDateState).isSame(moment(flyDate,'DD/MM/YY')))
                    flyDateSet(id, moment(flyDateState).format('DD/MM/YY'));
                } else {
                  flyDateSet(id, null);
                }
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 2 req */}
        <Grid item xs className={classes.two} >
          <TextField
            error={!!errors.acftIdent}
            helperText={errors.acftIdent}
            value={values.acftIdent}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                acftIdent: value
              });
            }}
            onBlur={() => {
              if(acftIdent !== values.acftIdent) {
                acftIdentSet(id, values.acftIdent);
              }
            }}
            label="Индекс ВС"
            inputProps={{
              maxLength: 7,
              style: { textTransform: 'uppercase' },
              name: 'acftIdent',
              autoComplete: 'off',
            }}
          />
        </Grid>
        {/* 3 req */}
        <Grid item xs className={classes.three} >
          {/* <Autocomplete
            autoComplete={false}
            autoHighlight={false}
            options={['ZZZZ']}
            value={aircraftTypeState.value}
            size="small"
            inputParams={{
              error: !!errorField.aircraftType,
              helperText: errorField.aircraftType,
              label: 'Тип ВС',
              name: 'aircraftType',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: 'aircraftType',
                autoComplete: 'off',
              }
            }}
            onInputChange={(e, v, r) => {
              const value = replaceLayout(v).toUpperCase();

              validateField('aircraftType', value);
              setAircraftTypeState(value);
            }}
            onBlur={() => {
              if(aircraftTypeState !== aircraftType) {
                aircraftTypeSet(id, aircraftTypeState);
              }
            }}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          /> */}
          <TextField
            error={!!errors.aircraftType}
            helperText={errors.aircraftType}
            value={values.aircraftType}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                aircraftType: value
              });
            }}
            onBlur={() => {
              if(aircraftType !== values.aircraftType) {
                aircraftTypeSet(id, values.aircraftType);
              }
            }}
            label="Тип ВС"
            inputProps={{
              maxLength: 4,
              style: { textTransform: 'uppercase' },
              name: 'aircraftType',
              autoComplete: 'off',
            }}
          />
        </Grid>
        {/* 4 req */}
        <Grid item xs className={classes.four} >
          {/* <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={depAirportState}
            size="small"
            inputParams={{
              error: !!errorField.depAirport,
              helperText: errorField.depAirport,
              label: 'А-д/П-п вылета',
              name: 'depAirport',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: 'depAirport',
                autoComplete: 'off',
              }
            }}
            onInputChange={(e, v, r) => {
              const value = replaceLayout(v).toUpperCase();

              validateField('depAirport', value);
              setDepAirportState(value);
            }}
            onBlur={() => {
              if(depAirportState !== depAirport) {
                depAirportSet(id, depAirportState);
              }
            }}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          /> */}
          <TextField
            error={!!errors.depAirport}
            helperText={errors.depAirport}
            value={values.depAirport}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                depAirport: value
              });
            }}
            onBlur={() => {
              if(depAirport !== values.depAirport) {
                depAirportSet(id, values.depAirport);
              }
            }}
            label="А-д/П-п вылета"
            inputProps={{
              maxLength: 4,
              style: { textTransform: 'uppercase' },
              name: 'depAirport',
              autoComplete: 'off',
            }}
          />
        </Grid>
        {/* 5 req */}
        <Grid item xs className={classes.five} >
          {/* <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={destAirportState}
            size="small"
            inputParams={{
              error: !!errorField.destAirport,
              helperText: errorField.destAirport,
              label: 'А-д/П-п посадки',
              name: 'destAirport',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: 'destAirport',
                autoComplete: 'off',
              }
            }}
            onInputChange={(e, v, r) => {
              const value = replaceLayout(v).toUpperCase();

              validateField('destAirport', value);
              setDestAirportState(value);
            }}
            onBlur={() => {
              if(destAirportState !== destAirport) {
                destAirportSet(id, destAirportState);
              }
            }}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          /> */}
          <TextField
            error={!!errors.destAirport}
            helperText={errors.destAirport}
            value={values.destAirport}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                destAirport: value
              });
            }}
            onBlur={() => {
              if(destAirport !== values.destAirport) {
                destAirportSet(id, values.destAirport);
              }
            }}
            label="А-д/П-п посадки"
            inputProps={{
              maxLength: 4,
              style: { textTransform: 'uppercase' },
              name: 'destAirport',
              autoComplete: 'off',
            }}
          />
        </Grid>
        {/* 6  */}
        <Grid item xs className={classes.six} >
          <TextField
            value={values.entryPoint}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              setValues({
                ...values,
                entryPoint: value
              });
            }}
            onBlur={() => {
              if(entryPoint !== values.entryPoint) {
                entryPointSet(id, values.entryPoint);
              }
            }}
            label="Точка входа"
            inputProps={{
              maxLength: 5,
              style: { textTransform: 'uppercase' },
              name: 'entryPoint'
            }}
          />
        </Grid>
        {/* 7 req */}
        <Grid item xs className={classes.seven} >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardTimePicker
              error={!!errors.entryTime}
              helperText={errors.entryTime}
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
              placeholder="08:00"
              format="HH:mm"
              value={entryTimeState}
              onChange={v => {
                validateField('entryTime', v);
                setEntryTimeState(v);
              }}
              onBlur={() => {
                if(moment(entryTimeState).isValid()) {
                  if(!moment(entryTimeState).isSame(moment(entryTime,'HH:mm')))
                    entryTimeSet(id, moment(entryTimeState).format('HH:mm'));
                } else {
                  entryTimeSet(id, null);
                }
              }}
              onClose={() => {
                if(moment(entryTimeState).isValid()) {
                  if(!moment(entryTimeState).isSame(moment(entryTime,'HH:mm')))
                    entryTimeSet(id, moment(entryTimeState).format('HH:mm'));
                } else {
                  entryTimeSet(id, null);
                }
              }}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 8  */}
        <Grid item xs className={classes.eight} >
          <TextField
            value={values.exitPoint}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              setValues({
                ...values,
                exitPoint: value
              });
            }}
            onBlur={() => {
              if(exitPoint !== values.exitPoint) {
                exitPointSet(id, values.exitPoint);
              }
            }}
            label="Точка выхода"
            inputProps={{
              maxLength: 5,
              style: { textTransform: 'uppercase' },
              name: 'exitPoint'
            }}
          />
        </Grid>
        {/* 9     */}
        <Grid item xs className={classes.nine} >
          <TextField
            value={values.regno}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              setValues({
                ...values,
                regno: value
              });
            }}
            onBlur={() => {
              if(regno !== values.regno) {
                regnoSet(id, values.regno);
              }
            }}
            label="Рег. номер ВС"
            inputProps={{
              maxLength: 10,
              style: { textTransform: 'uppercase' },
              name: 'regno'
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mstp = state => ({});
const mdtp = dispatch => ({
  flyDateSet:         (id, flyDate) => dispatch(summaryAction.z1.FLYDATE_SET({id, flyDate})),
  acftIdentSet:       (id, acftIdent) => dispatch(summaryAction.z1.ACFTIDENT_SET({id, acftIdent})),
  aircraftTypeSet:    (id, aircraftType) => dispatch(summaryAction.z1.AIRCRAFTTYPE_SET({id, aircraftType})),
  depAirportSet:      (id, depAirport) => dispatch(summaryAction.z1.DEPAIRPORT_SET({id, depAirport})),
  destAirportSet:     (id, destAirport) => dispatch(summaryAction.z1.DESTAIRPORT_SET({id, destAirport})),
  entryPointSet:      (id, entryPoint) => dispatch(summaryAction.z1.ENTRYPOINT_SET({id, entryPoint})),
  entryTimeSet:       (id, entryTime) => dispatch(summaryAction.z1.ENTRYTIME_SET({id, entryTime})),
  exitPointSet:       (id, exitPoint) => dispatch(summaryAction.z1.EXITPOINT_SET({id, exitPoint})),
  regnoSet:           (id, regno) => dispatch(summaryAction.z1.REGNO_SET({id, regno})),
  setValid:           (id, state) => dispatch(summaryAction.z1.VALIDATION_SET({id, state})),
  setError:           (id, field) => dispatch(summaryAction.z1.ERROR_SET({id, field})),
});

export default React.memo(connect(mstp, mdtp)(z1View));