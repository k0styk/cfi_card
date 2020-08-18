import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '../../redux/actions/';

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputMask from '../../components/InputMask/inputmask';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
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

const z3View = ({
  id,
  summary,
  airspaceTypeSet,
  aircraftTypeNameSet,
  depAirportCoordSet,
  destAirportCoordSet,
  airspaceTypeGTimeSet
}) => {
  const classes = useStyles();
  const curSummary = summary.value.filter(v => v.id === id);
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
    airspaceTypeGTime,
  } = curSummary[0].z3;

  return (
    <div className="z3-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z3</Paper>
        </Grid>
        {/* 1 req */}
        <Grid item xs>
          <Autocomplete
            autoHighlight={false}
            options={['A','C','G','CG']}
            value={airspaceType}
            size="small"
            inputParams={{
              label: 'Тип воздушного судна',
              name: 'airspaceType',
              inputProps: {
                maxLength: 2,
                style: { textTransform: 'uppercase' }
              }
            }}
            // onInputChange={(e, v) => airspaceTypeSet(id, v.toUpperCase())}
            onChange={(e, v) => airspaceTypeSet(id, v.toUpperCase())}
            renderOptionFunc={option => (<React.Fragment>{option}</React.Fragment>)} // eslint-disable-line
            clearOnEscape
          />
        </Grid>
        {/* 2 */}
        <Grid item xs>
          <TextField
            value={aircraftTypeName}
            onChange={e => aircraftTypeNameSet(id, e.target.value.toUpperCase())}
            label="Наименование типа ВС"
            inputProps={{ maxLength: 25, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 3 */}
        <Grid item xs>
          <InputMask
            mask="9999С9999В"
            value={depAirportCoord}
            onChange={e => depAirportCoordSet(id, e.target.value.toUpperCase())}
            label="Коорд А/П вылета"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 4 */}
        <Grid item xs>
          <InputMask
            mask="9999С9999В"
            value={destAirportCoord}
            onChange={e => destAirportCoordSet(id, e.target.value.toUpperCase())}
            label="Коорд А/П посадки"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 5 if class G */}
        <Grid item xs>
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
        {/* 7 req */}
        <Grid item xs></Grid>
        {/* 8 */}
        <Grid item xs></Grid>
        {/* 9 req */}
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

/* eslint-disable */
const mstp = state => ({ summary: state.summary });
const mdtp = dispatch => ({
  airspaceTypeSet:      (id, airspaceType) => dispatch(summaryAction.z3.AIRSPACETYPE_SET({id, airspaceType})),
  aircraftTypeNameSet:  (id, aircraftTypeName) => dispatch(summaryAction.z3.AIRCRAFTTYPENAME_SET({id, aircraftTypeName})),
  depAirportCoordSet:   (id, depAirportCoord) => dispatch(summaryAction.z3.DEPAIRPORTCOORD_SET({id, depAirportCoord})),
  destAirportCoordSet:  (id, destAirportCoord) => dispatch(summaryAction.z3.DESTAIRPORTCOORD_SET({id, destAirportCoord})),
  airspaceTypeGTimeSet: (id, airspaceTypeGTime) => dispatch(summaryAction.z3.AIRSPACETYPEGTIME_SET({id, airspaceTypeGTime})),
});
/* eslint-enable */

export default connect(mstp, mdtp)(z3View);