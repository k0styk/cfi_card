import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions';
import { Autocomplete, InputMask  } from '@components';

import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MomentUtils from '@date-io/moment';
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
  one:    { minWidth: '80px'  },
  two:    { minWidth: '140px' },
  three:  { minWidth: '110px' },
  four:   { minWidth: '160px' },
  five:   { minWidth: '110px' },
  six:    { minWidth: '90px'  },
  seven:  { minWidth: '90px'  },
  eight:  { minWidth: '90px'  },
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
  curZ2,
  codeSet,
  entryPointSet,
  entryTimeSet,
  exitPointSet,
  exitTimeSet,
  // flyCtgSet,
  // countOfDepSet,
  // countOfAppSet
  setValid
}) => {
  const classes = useStyles();
  // const [curSummary] = summary.value.filter(v => v.id === id);
  // const curZ2 = curSummary.z2.filter(v => v.id === z2id);
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
    // flyCtg,
    // countOfDep,
    // countOfApp
    validation
  } = curZ2;
  const [errorField, setError] = React.useState({
    code: '',
    entryPoint: '',
    entryTime: '',
    exitPoint: '',
    exitTime: '',
  });
  const handleValidateWrapper = ({mask, operation}) => {
    let val = 0;

    if(operation) {
      val = validation | mask;
    } else {
      val = validation & (mask ^ 0xFFF);
    }
    setValid(id,z2id,val);
  };
  const validateField = (fieldName, value) => {
    const validation = z2Validator.validateField(fieldName, value);

    if(validation.error[fieldName] !== errorField[fieldName]) {
      setError({
        ...errorField,
        ...validation.error
      });
    }
    handleValidateWrapper(validation);
  };

  return (
    <div className="z2-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z2</Paper>
        </Grid>
        {/* 1 req max 4 */}
        <Grid item xs className={classes.one}>
          <TextField
            error={!!errorField.code}
            helperText={errorField.code}
            value={code}
            onChange={e => {
              codeSet(id, z2id, e.target.value.toUpperCase());
              // validateField(e.target.name, e.target.value);
            }}
            label="РЦ/МДП"
            inputProps={{
              maxLength: 4,
              style: { textTransform: 'uppercase' },
              name: 'code',
              autoComplete: 'off',
            }}
          />
        </Grid>
        {/* 2 req max 11 */}
        <Grid item xs className={classes.two}>
          <InputMask
            error={!!errorField.entryPoint}
            helperText={errorField.entryPoint}
            mask="9999N99999E"
            value={entryPoint}
            onChange={e => {
              entryPointSet(id, z2id, e.target.value.toUpperCase());
              // validateField(e.target.name, e.target.value);
            }}
            label="Вход в ВП к. A/C"
            inputProps={{
              maxLength: 12,
              style: { textTransform: 'uppercase' },
              name: 'entryPoint'
            }}
          />
        </Grid>
        {/* 3 req */}
        <Grid item xs className={classes.three}>
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
              value={moment(entryTime, 'HH:mm')}
              onChange={(d,v) => {
                entryTimeSet(id,z2id,moment(d).format('HH:mm'));
                // validateField(validationFields.entryTime.name, d);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 4 req */}
        <Grid item xs className={classes.four}>
          <InputMask
            error={!!errorField.exitPoint}
            helperText={errorField.exitPoint}
            mask="9999N99999E"
            value={exitPoint}
            onChange={e => {
              exitPointSet(id, z2id, e.target.value.toUpperCase());
              // validateField(e.target.name, e.target.value);
            }}
            label="Выход из ВП к. A/C"
            inputProps={{
              maxLength: 12,
              style: { textTransform: 'uppercase' },
              name: 'exitPoint'
            }}
          />
        </Grid>
        {/* 5 req */}
        <Grid item xs className={classes.five}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardTimePicker
              error={!!errorField.exitTime}
              helperText={errorField.exitTime}
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
              value={moment(exitTime, 'HH:mm')}
              onChange={(d,v) => {
                exitTimeSet(id,z2id,moment(d).format('HH:mm'));
                // validateField(validationFields.exitTime.name, d);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 6 max 3 */}
        <Grid item xs className={classes.six}>
          <Autocomplete
            disabled
            options={[]}
            value={''}
            size="small"
            inputParams={{ label: 'Приказ 80', name: 'mdp' }}
            renderOptionFunc={option => { return (<React.Fragment>{option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 7 max 1 need SELECT */}
        <Grid item xs className={classes.seven}>
          <Autocomplete
            disabled
            options={[]}
            value={''}
            size="small"
            inputParams={{ label: 'Приказ 80', name: 'cfd' }}
            renderOptionFunc={option => { return (<React.Fragment>{option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 8  max 2*/}
        <Grid item xs className={classes.eight}>
          <TextField
            disabled
            label="Приказ 80"
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 9 null */}
        <Grid item xs>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              removeZ2(id, z2id);
            }}
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
  codeSet:         (id, z2id, code)         => dispatch(summaryAction.z2.CODE_SET({id, z2id, code})),
  entryPointSet:   (id, z2id, entryPoint)   => dispatch(summaryAction.z2.ENTRYPOINT_SET({id, z2id, entryPoint})),
  entryTimeSet:    (id, z2id, entryTime)    => dispatch(summaryAction.z2.ENTRYTIME_SET({id, z2id, entryTime})),
  exitPointSet:    (id, z2id, exitPoint)    => dispatch(summaryAction.z2.EXITPOINT_SET({id, z2id, exitPoint})),
  exitTimeSet:     (id, z2id, exitTime)     => dispatch(summaryAction.z2.EXITTIME_SET({id, z2id, exitTime})),
  flyCtgSet:       (id, z2id, flyCtg)       => dispatch(summaryAction.z2.FLYCTG_SET({id, z2id, flyCtg})),
  countOfDepSet:   (id, z2id, countOfDep)   => dispatch(summaryAction.z2.COUNTOFDEP_SET({id, z2id, countOfDep})),
  countOfAppSet:   (id, z2id, countOfApp)   => dispatch(summaryAction.z2.COUNTOFAPP_SET({id, z2id, countOfApp})),
  setValid:        (id, z2id, state)        => dispatch(summaryAction.z2.VALIDATION_SET({id, z2id, state}))
});

export default /*React.memo(*/connect(mstp, mdtp)(z2View)/*)*/;