import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '../../redux/actions/';
// import './z1.scss';

import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@components/Autocomplete/autocomplete';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    minWidth: '190px'
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
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

  return (
    <div className="z1-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z1</Paper>
        </Grid>
        {/* 1 req */}
        <Grid item xs className={classes.grid}>
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
        <Grid item xs className={classes.grid}>
          <TextField
            value={acftIdent}
            onChange={e => acftIdentSet(id, e.target.value.toUpperCase())}
            label="Индекс ВС"
            inputProps={{ maxLength: 7, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 3 req */}
        <Grid item xs className={classes.grid}>
          <Autocomplete
            autoHighlight={false}
            options={['ZZZZ']}
            value={aircraftType}
            size="small"
            inputParams={{
              label: 'Тип воздушного судна',
              name: 'aircraftType',
              inputProps: {
                maxLength: 4,
                style: { textTransform: 'uppercase' }
              }
            }}
            onInputChange={(e, v) => aircraftTypeSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 4 req */}
        <Grid item xs className={classes.grid}>
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
                style: { textTransform: 'uppercase' }
              }
            }}
            onInputChange={(e, v) => depAirportSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 5 req */}
        <Grid item xs className={classes.grid}>
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
                style: { textTransform: 'uppercase' }
              }
            }}
            onInputChange={(e, v) => destAirportSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 6 req */}
        <Grid item xs className={classes.grid}>
          <TextField
            value={entryPoint}
            onChange={e => entryPointSet(id, e.target.value.toUpperCase())}
            label="Точка входа"
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 7 req */}
        <Grid item xs className={classes.grid}>
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
        <Grid item xs className={classes.grid}>
          <TextField
            value={exitPoint}
            onChange={e => exitPointSet(id, e.target.value.toUpperCase())}
            label="Точка выхода"
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 9 */}
        <Grid item xs className={classes.grid}>
          <TextField
            value={regno}
            onChange={e => regnoSet(id, e.target.value.toUpperCase())}
            label="Рег. номер ВС"
            inputProps={{ maxLength: 10, style: { textTransform: 'uppercase' } }}
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