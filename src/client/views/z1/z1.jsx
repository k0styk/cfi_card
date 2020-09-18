import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions/';
import { Autocomplete } from '@components';

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
  summary,
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
}) => {
  const classes = useStyles();
  const [curSummary] = summary.value.filter(v => v.id === id);
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
    validation
  } = curSummary.z1;

  const validationFields = {
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
  };
  const [errorField, setError] = React.useState({
    flyDate: '',
    acftIdent: '',
    aircraftType: '',
    depAirport: '',
    destAirport: '',
    entryTime: '',
  });
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
      case validationFields.flyDate.name:
      case validationFields.entryTime.name:
        if(value&&value._isValid) {
          setError({
            ...errorField,
            [fieldName]: ''
          });
          handleValidateWrapper(fieldName, 1);
        } else {
          setError({
            ...errorField,
            [fieldName]: 'Некорректная дата'
          });
          handleValidateWrapper(fieldName, 0);
        }
        break;
      case validationFields.acftIdent.name:
        if (value.length) {
          setError({
            ...errorField,
            [fieldName]: ''
          });
          handleValidateWrapper(fieldName, 1);
        } else {
          setError({
            ...errorField,
            [fieldName]: 'Обязательное поле'
          });
          handleValidateWrapper(fieldName, 0);
        }
        break;
      case validationFields.aircraftType.name:
      case validationFields.depAirport.name:
      case validationFields.destAirport.name:
        if (value.length === 4) {
          setError({
            ...errorField,
            [fieldName]: ''
          });
          handleValidateWrapper(fieldName, 1);
        } else {
          setError({
            ...errorField,
            [fieldName]: 'Обязательное поле'
          });
          handleValidateWrapper(fieldName, 0);
        }
        break;
    }
  };

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
              error={!!errorField.flyDate}
              helperText={errorField.flyDate}
              placeholder="DD/MM/YY"
              disableToolbar
              variant="inline"
              format="DD/MM/YY"
              mask="__/__/__"
              margin="normal"
              value={moment(flyDate, 'DD/MM/YY')}
              onChange={v => {
                validateField(validationFields.flyDate.name, v);
                flyDateSet(id, moment(v).format('DD/MM/YY'));
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
            error={!!errorField.acftIdent}
            helperText={errorField.acftIdent}
            value={acftIdent}
            onChange={e => {
              acftIdentSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            label="Индекс ВС"
            inputProps={{
              maxLength: 7,
              style: { textTransform: 'uppercase' },
              name: validationFields.acftIdent.name,
              autoComplete: 'off',
            }}
          />
        </Grid>
        {/* 3 req */}
        <Grid item xs className={classes.three} >
          <Autocomplete
            autoComplete={false}
            autoHighlight={false}
            options={['ZZZZ']}
            value={aircraftType}
            size="small"
            inputParams={{
              error: !!errorField.aircraftType,
              helperText: errorField.aircraftType,
              label: 'Тип ВС',
              name: 'aircraftType',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: validationFields.aircraftType.name,
                autoComplete: 'off',
              }
            }}
            onChange={(e,v,r) => {
              if(v) {
                aircraftTypeSet(id, v.toUpperCase());
                validateField(validationFields.aircraftType.name, v);
              }
            }}
            onInputChange={(e, v, r) => {
              if(r!=='reset') {
                aircraftTypeSet(id, v.toUpperCase());
                validateField(validationFields.aircraftType.name, v);
              }
            }}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 4 req */}
        <Grid item xs className={classes.four} >
          <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={depAirport}
            size="small"
            inputParams={{
              error: !!errorField.depAirport,
              helperText: errorField.depAirport,
              label: 'А-д/П-п вылета',
              name: 'depAirport',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: validationFields.depAirport.name,
                autoComplete: 'off',
              }
            }}
            onChange={(e,v) => {
              if(v) {
                depAirportSet(id, v.toUpperCase());
                validateField(validationFields.depAirport.name, v);
              }
            }}
            onInputChange={(e, v, r) => {
              if(r!=='reset') {
                depAirportSet(id, v.toUpperCase());
                validateField(validationFields.depAirport.name, v);
              }
            }}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 5 req */}
        <Grid item xs className={classes.five} >
          <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={destAirport}
            size="small"
            inputParams={{
              error: !!errorField.destAirport,
              helperText: errorField.destAirport,
              label: 'А-д/П-п посадки',
              name: 'destAirport',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: validationFields.destAirport.name,
                autoComplete: 'off',
              }
            }}
            onChange={(e,v,r) => {
              if(v) {
                destAirportSet(id, v.toUpperCase());
                validateField(validationFields.destAirport.name, v);
              }
            }}
            onInputChange={(e,v,r) => {
              if(r!=='reset') {
                destAirportSet(id, v.toUpperCase());
                validateField(validationFields.destAirport.name, v);
              }
            }}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 6  */}
        <Grid item xs className={classes.six} >
          <TextField
            value={entryPoint}
            onChange={e => entryPointSet(id, e.target.value.toUpperCase())}
            label="Точка входа"
            inputProps={{
              maxLength: 5,
              style: { textTransform: 'uppercase' },
              name: validationFields.entryPoint
            }}
          />
        </Grid>
        {/* 7 req */}
        <Grid item xs className={classes.seven} >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardTimePicker
              error={!!errorField.entryTime}
              helperText={errorField.entryTime}
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
              value={moment(entryTime, 'HH:mm')}
              onChange={(d,v) => {
                validateField(validationFields.entryTime.name, d);
                entryTimeSet(id,moment(d).format('HH:mm'));
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
            value={exitPoint}
            onChange={e => exitPointSet(id, e.target.value.toUpperCase())}
            label="Точка выхода"
            inputProps={{
              maxLength: 5,
              style: { textTransform: 'uppercase' },
              name: validationFields.exitPoint
            }}
          />
        </Grid>
        {/* 9     */}
        <Grid item xs className={classes.nine} >
          <TextField
            value={regno}
            onChange={e => regnoSet(id, e.target.value.toUpperCase())}
            label="Рег. номер ВС"
            inputProps={{
              maxLength: 10,
              style: { textTransform: 'uppercase' },
              name: validationFields.regno
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mstp = state => ({
  summary: state.summary,
});
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
  setValid:           (id, state) => dispatch(summaryAction.z1.VALIDATION_SET({id, state}))
});

export default connect(mstp, mdtp)(z1View);