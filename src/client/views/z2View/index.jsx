import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '../../redux/actions';
// import './z2.scss';

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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import InputMask from '../../components/InputMask/inputmask';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  marginSides: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  root: {
    flexGrow: 1,
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

const z2View = ({
  id,
  z2id,
  removeZ2,
  summary,
  codeSet,
  entryPointSet,
  entryTimeSet,
  exitPointSet,
  exitTimeSet,
  flyCtgSet,
  countOfDepSet,
  countOfAppSet
}) => {
  const classes = useStyles();
  const curSummary = summary.value.filter(v => v.id === id);
  const curZ2 = curSummary[0].z2.filter(v => v.id === z2id);
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
    flyCtg,
    countOfDep,
    countOfApp
  } = curZ2[0];

  return (
    <div className="z2-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z2</Paper>
        </Grid>
        {/* 1 req max 4 */}
        <Grid item xs>
          <TextField
            value={code}
            onChange={e => codeSet(id, z2id, e.target.value.toUpperCase())}
            label="РЦ/МДП"
            inputProps={{ maxLength: 4, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 2 req max 11 */}
        <Grid item xs>
          <InputMask
            mask="9999С9999В"
            value={entryPoint}
            onChange={e => entryPointSet(id, z2id, e.target.value.toUpperCase())}
            abel="Вход в ВП к. A/C"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 3 req */}
        <Grid item xs>
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
              value={moment(entryTime)}
              onChange={v => entryTimeSet(id,z2id,v)}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 4 req */}
        <Grid item xs>
          <InputMask
            mask="9999С9999В"
            value={exitPoint}
            onChange={e => exitPointSet(id, z2id, e.target.value.toUpperCase())}
            label="Выход из ВП к. A/C"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 5 req */}
        <Grid item xs>
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
              value={moment(exitTime)}
              onChange={v => exitTimeSet(id,z2id,v)}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 6 max 3 */}
        <Grid item xs>
          <Autocomplete
            disabled
            options={null}
            value={null}
            size="small"
            inputParams={{ label: 'Вид полёта', name: 'mdp' }}
            renderOptionFunc={option => { return (<React.Fragment>{option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 7 max 1 need SELECT */}
        <Grid item xs>
          <Autocomplete
            disabled
            options={null}
            value={null}
            size="small"
            inputParams={{ label: 'Кол-во первонач. вылетов', name: 'cfd' }}
            renderOptionFunc={option => { return (<React.Fragment>{option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 8  max 2*/}
        <Grid item xs>
          <TextField
            disabled
            label="кол-во заходов на посадку"
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 9 null */}
        <Grid item xs>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => removeZ2(id, z2id)}
          >
            <DeleteIcon />
            <b className={classes.marginSides}>Удалить</b>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mstp = state => ({
  summary: state.summary
});
const mdtp = dispatch => ({
  removeZ2:     (id, z2id) => dispatch(summaryAction.removeSummaryZ2({id, z2id})),
  codeSet:         (id, z2id, code)         => dispatch(summaryAction.z2.({id, flyDate})),
  entryPointSet:   (id, z2id, entryPoint)   => dispatch(summaryAction.z2.ACFTIDENT_SET({id, acftIdent})),
  entryTimeSet:    (id, z2id, entryTime)    => dispatch(summaryAction.z2.AIRCRAFTTYPE_SET({id, aircraftType})),
  exitPointSet:    (id, z2id, exitPoint)    => dispatch(summaryAction.z2.DEPAIRPORT_SET({id, depAirport})),
  exitTimeSet:     (id, z2id, exitTime)     => dispatch(summaryAction.z2.DESTAIRPORT_SET({id, destAirport})),
  flyCtgSet:       (id, z2id, flyCtg)       => dispatch(summaryAction.z2.ENTRYPOINT_SET({id, entryPoint})),
  countOfDepSet:   (id, z2id, countOfDep)   => dispatch(summaryAction.z2.ENTRYTIME_SET({id, entryTime})),
  countOfAppSet:   (id, z2id, countOfApp)   => dispatch(summaryAction.z2.EXITPOINT_SET({id, exitPoint})),
});

export default connect(mstp, mdtp)(z2View);