import React from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions';
import { InputMask  } from '@components';
import { z2Validator } from '../../validators/validators';
import replaceLayout from '../../helpers/layoutReplacer';

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
  curZ2,
  removeZ2,
  codeSet,
  entryPointSet,
  entryTimeSet,
  exitPointSet,
  exitTimeSet,
  // flyCtgSet,
  // countOfDepSet,
  // countOfAppSet
  setValid,
  setError,
}) => {
  const classes = useStyles();
  const {
    code,
    entryPoint,
    entryTime,
    exitPoint,
    exitTime,
    // flyCtg,
    // countOfDep,
    // countOfApp
    validation,
    errors,
  } = curZ2;
  const [values, setValues] = React.useState(() => ({
    code: code,
    entryPoint: entryPoint,
    exitPoint: exitPoint,
  }));
  const [entryTimeState, setEntryTimeState] = React.useState(entryTime);
  const [exitTimeState, setExitTimeState] = React.useState(exitTime);

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
    const v = z2Validator.validateField(fieldName, value);

    if(v.error[fieldName] !== errors[fieldName]) {
      setError(id, z2id, {...v.error});
    }
    handleValidateWrapper(v);
  };

  React.useEffect(() => {
    setValues({
      code,
      entryPoint,
      exitPoint,
      entryTime,
      exitTime,
    });
  },[
    code,
    entryPoint,
    exitPoint,
    entryTime,
    exitTime,
  ]);
  React.useEffect(() => {
    setEntryTimeState(moment(entryTime, 'HH:mm'));
  },[entryTime]);
  React.useEffect(() => {
    setExitTimeState(moment(exitTime, 'HH:mm'));
  },[exitTime]);

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
            error={!!errors.code}
            helperText={errors.code}
            value={values.code}
            onChange={e => {
              const value = replaceLayout(e.target.value).toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                code: value
              });
            }}
            onBlur={() => {
              if(code !== values.code) {
                codeSet(id, z2id, values.code);
              }
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
            error={!!errors.entryPoint}
            helperText={errors.entryPoint}
            mask="9999N99999E"
            value={values.entryPoint}
            onChange={e => {
              const value = e.target.value.toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                entryPoint: value
              });
            }}
            onBlur={() => {
              if(entryPoint !== values.entryPoint) {
                entryPointSet(id, z2id, values.entryPoint);
              }
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
              value={entryTimeState}
              onChange={v => {
                validateField('entryTime', v);
                setEntryTimeState(v);
              }}
              onBlur={() => {
                if(moment(entryTimeState).isValid()) {
                  if(!moment(entryTimeState).isSame(moment(entryTime,'HH:mm')))
                    entryTimeSet(id, z2id, moment(entryTimeState).format('HH:mm'));
                } else {
                  entryTimeSet(id, z2id, null);
                }
              }}
              onClose={() => {
                if(moment(entryTimeState).isValid()) {
                  if(!moment(entryTimeState).isSame(moment(entryTime,'HH:mm')))
                    entryTimeSet(id, z2id, moment(entryTimeState).format('HH:mm'));
                } else {
                  entryTimeSet(id, z2id, null);
                }
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
            error={!!errors.exitPoint}
            helperText={errors.exitPoint}
            mask="9999N99999E"
            value={values.exitPoint}
            onChange={e => {
              const value = e.target.value.toUpperCase();

              validateField(e.target.name, value);
              setValues({
                ...values,
                exitPoint: value
              });
            }}
            onBlur={() => {
              if(exitPoint !== values.exitPoint) {
                exitPointSet(id, z2id, values.exitPoint);
              }
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
              error={!!errors.exitTime}
              helperText={errors.exitTime}
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
              value={exitTimeState}
              onChange={v => {
                validateField('exitTime', v);
                setExitTimeState(v);
              }}
              onBlur={() => {
                if(moment(exitTimeState).isValid()) {
                  if(!moment(exitTimeState).isSame(moment(exitTime,'HH:mm')))
                    exitTimeSet(id, z2id, moment(exitTimeState).format('HH:mm'));
                } else {
                  exitTimeSet(id, z2id, null);
                }
              }}
              onClose={() => {
                if(moment(exitTimeState).isValid()) {
                  if(!moment(exitTimeState).isSame(moment(exitTime,'HH:mm')))
                    exitTimeSet(id, z2id, moment(exitTimeState).format('HH:mm'));
                } else {
                  exitTimeSet(id, z2id, null);
                }
              }}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 6 80 */}
        <Grid item xs className={classes.six}>
          <TextField
            disabled
            label="Приказ 80"
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 7 80 */}
        <Grid item xs className={classes.seven}>
          <TextField
            disabled
            label="Приказ 80"
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 8  80 */}
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
  setValid:        (id, z2id, state)        => dispatch(summaryAction.z2.VALIDATION_SET({id, z2id, state})),
  setError:        (id, z2id, field)        => dispatch(summaryAction.z2.ERROR_SET({id, z2id, field})),
});

export default /*React.memo(*/connect(mstp, mdtp)(z2View)/*)*/;