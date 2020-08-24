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
  handleValidate
}) => {
  const classes = useStyles();
  const curSummary = summary.value.filter(v => v.id === id);
  const {
    airspaceType,
    aircraftTypeName,
    depAirportCoord,
    destAirportCoord,
    // airspaceTypeGTime,
  } = curSummary[0].z3;
  const z2l = curSummary[0].z2.length;
  const [{z1}] = curSummary;

  const validationFields = {
    airspaceType: {
      name: 'airspaceType',
      mask: 1<<0
    },
    aircraftTypeName: {
      name: 'aircraftTypeName',
      mask: 1<<1
    },
    depAirport: {
      name: 'depAirport',
      mask: 1<<2
    },
    destAirport: {
      name: 'destAirport',
      mask: 1<<3
    }
  };
  const [errorField, setError] = React.useState({
    airspaceType: '',
    aircraftTypeName: '',
    depAirport: '',
    destAirport: ''
  });
  // TODO
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case validationFields.airspaceType.name:
      case validationFields.aircraftTypeName.name:
        // if(value._isValid) {
        //   setError({
        //     ...errorField,
        //     [fieldName]: ''
        //   });
        //   validation |= validationFields[fieldName].mask;
        //   handleValidate(validation);
        // } else {
        //   setError({
        //     ...errorField,
        //     [fieldName]: 'Некорректная дата'
        //   });
        //   validation &= (validationFields[fieldName].mask ^ 0xFFF);
        //   handleValidate(validation);
        // }
        // break;
      case validationFields.depAirport.name:
      case validationFields.destAirport.name:
        // if (value.length) {
        //   setError({
        //     ...errorField,
        //     [fieldName]: ''
        //   });
        //   validation |= validationFields[fieldName].mask;
        //   handleValidate(validation);
        // } else {
        //   setError({
        //     ...errorField,
        //     [fieldName]: 'Обязательное поле'
        //   });
        //   validation &= (validationFields[fieldName].mask ^ 0xFFF);
        //   handleValidate(validation);
        // }
        // break;
    }
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
            error={!!(airspaceType==='G' & z2l)}
            helperText={(airspaceType==='G' & z2l)?'Измените выбор':''}
            fullWidth
            id="select"
            label="Класс ВП"
            value={airspaceType}
            onChange={e => {
              airspaceTypeSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            inputProps={{
              maxLength: 2,
              style: { textTransform: 'uppercase' },
              name: validationFields.airspaceType
            }}
            select
          >
            {['A','C','G','CG'].map((v,i) => {
              if(v==='G' & z2l) {
                return <MenuItem disabled key={i} value={v}>{v}</MenuItem>;
              }
              return <MenuItem key={i} value={v}>{v}</MenuItem>;
            })}
          </TextField>
        </Grid>
        {/* 2 req if z1 3 stay ZZZZ*/}
        <Grid item xs className={classes.two}>
          <TextField
            error={(z1.aircraftType==='ZZZZ'&(aircraftTypeName.length?false:true))?true:false}
            helperText={(z1.aircraftType==='ZZZZ'&(aircraftTypeName.length?false:true))?'Заполнить':''}
            value={aircraftTypeName}
            onChange={e => {
              aircraftTypeNameSet(id, e.target.value.toUpperCase());
              validateField(e.target.name, e.target.value);
            }}
            label="Наименование типа ВС"
            inputProps={{
              maxLength: 25,
              style: { textTransform: 'uppercase' },
              name: validationFields.aircraftTypeName
            }}
          />
        </Grid>
        {/* 3 req if z1 4 ZZZZ*/}
        <Grid item xs className={classes.three}>
          <InputMask
            error={(z1.depAirport==='ZZZZ'&(depAirportCoord.length?false:true))?true:false}
            helperText={(z1.depAirport==='ZZZZ'&(depAirportCoord.length?false:true))?'Заполнить':''}
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
              name: validationFields.depAirport
            }}
          />
        </Grid>
        {/* 4 req if z1 5 ZZZZ*/}
        <Grid item xs className={classes.four}>
          <InputMask
            error={(z1.destAirport==='ZZZZ'&(destAirportCoord.length?false:true))?true:false}
            helperText={(z1.destAirport==='ZZZZ'&(destAirportCoord.length?false:true))?'Заполнить':''}
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
              name: validationFields.destAirport
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
  airspaceTypeSet:      (id, airspaceType) => dispatch(summaryAction.z3.AIRSPACETYPE_SET({id, airspaceType})),
  aircraftTypeNameSet:  (id, aircraftTypeName) => dispatch(summaryAction.z3.AIRCRAFTTYPENAME_SET({id, aircraftTypeName})),
  depAirportCoordSet:   (id, depAirportCoord) => dispatch(summaryAction.z3.DEPAIRPORTCOORD_SET({id, depAirportCoord})),
  destAirportCoordSet:  (id, destAirportCoord) => dispatch(summaryAction.z3.DESTAIRPORTCOORD_SET({id, destAirportCoord})),
  airspaceTypeGTimeSet: (id, airspaceTypeGTime) => dispatch(summaryAction.z3.AIRSPACETYPEGTIME_SET({id, airspaceTypeGTime})),
});
/* eslint-enable */

export default connect(mstp, mdtp)(z3View);