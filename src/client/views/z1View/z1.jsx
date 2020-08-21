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
  regnoSet
}) => {
  const classes = useStyles();
  const curSummary = summary.value.filter(v => v.id === id);
  const {
    flyDate,
    acftIdent,
    aircraftType,
    depAirport,
    destAirport,
    entryPoint,
    entryTime,
    exitPoint,
    regno
  } = curSummary[0].z1;

  const validationFields = {
    flyDate: 'flyDate',
    acftIdent: 'acftIdent',
    aircraftType: 'aircraftType',
    depAirport: 'depAirport',
    destAirport: 'destAirport',
    entryPoint: 'entryPoint',
    entryTime: 'entryTime',
    exitPoint: 'exitPoint',
    regno: 'regno',
  };
  const validateField = (fieldName, value) => {
    // let fieldValidationErrors = this.state.formErrors;
    // let emailValid = this.state.emailValid;
    // let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  };

  return (
    <div className="z1-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z1</Paper>
        </Grid>
        {/* 1 req */}
        <Grid item xs className={classes.one}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              placeholder="DD/MM/YY"
              disableToolbar
              variant="inline"
              format="DD/MM/YY"
              mask="__/__/__"
              margin="normal"
              value={moment(flyDate)}
              onChange={v => flyDateSet(id, v)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 2 req */}
        <Grid item xs className={classes.two}>
          <TextField
            value={acftIdent}
            onChange={e => acftIdentSet(id, e.target.value.toUpperCase())}
            label="Индекс ВС"
            inputProps={{
              maxLength: 7,
              style: { textTransform: 'uppercase' },
              name: validationFields.acftIdent
            }}
          />
        </Grid>
        {/* 3 req */}
        <Grid item xs className={classes.three}>
          <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={aircraftType}
            size="small"
            inputParams={{
              label: 'Тип ВС',
              name: 'aircraftType',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: validationFields.aircraftType
              }
            }}
            onInputChange={(e, v) => aircraftTypeSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 4 req */}
        <Grid item xs className={classes.four}>
          <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={depAirport}
            size="small"
            inputParams={{
              label: 'А-д/П-п вылета',
              name: 'depAirport',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: validationFields.depAirport
              }
            }}
            onInputChange={(e, v) => depAirportSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 5 req */}
        <Grid item xs className={classes.five}>
          <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={destAirport}
            size="small"
            inputParams={{
              label: 'А-д/П-п посадки',
              name: 'destAirport',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' },
                name: validationFields.destAirport
              }
            }}
            onInputChange={(e, v) => destAirportSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 6 req */}
        <Grid item xs className={classes.six}>
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
        <Grid item xs className={classes.seven}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardTimePicker
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
              value={moment(entryTime).utc()}
              onChange={v => entryTimeSet(id,v)}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 8 req */}
        <Grid item xs className={classes.eight}>
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
        {/* 9 */}
        <Grid item xs className={classes.nine}>
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
  summary: state.summary
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
});

export default connect(mstp, mdtp)(z1View);