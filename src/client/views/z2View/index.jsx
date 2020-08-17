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

const z2View = ({ id, z2id, removeZ2 }) => {
  const classes = useStyles();

  return (
    <div className="z1-view">
      <Grid container className={classes.root} spacing={1}>
        {/* 0 */}
        <Grid item xs={false}>
          <Paper className={classes.paperFirst} elevation={0} square>Z2</Paper>
        </Grid>
        {/* 1 req max 4 */}
        <Grid item xs>
          <Autocomplete
            options={null}
            value={null}
            size="small"
            inputParams={{ label: 'РЦ/МДП', name: 'mdp' }}
            onChange={(event, newValue) => {
              // if (typeof newValue === 'string') {
              //   setTimeout(() => {
              //     this.toggleOpen(true);
              //     this.setDialogValue({
              //       value: newValue,
              //       id: '',
              //     });
              //   });
              //   return;
              // }

              // if (newValue && newValue.inputValue) {
              //   this.toggleOpen(true);
              //   this.setDialogValue({
              //     value: newValue.inputValue,
              //     id: '',
              //   });

              //   return;
              // }
              console.log('suka');
              // this.aircraftHandleChange(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Добавить "${params.inputValue}"`,
                });
              }
              return filtered;
            }}
            getOptionLabel={option => {
              if (option.inputValue) {
                return option.inputValue;
              }
              if (option.title) {
                return option.title;
              }
              if (option.value) {
                return option.value;
              }
              return option;
            }}
            // renderOption={(option) => option.title}
            // onKeyDown={this.onInputKeyDown.bind(this)}
            renderOptionFunc={option => { return (<React.Fragment>{option.title || option.value || option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 2 req max 11 */}
        <Grid item xs>
          <TextField
            label="Вход в ВП к. A/C"
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
              value={null}
              onChange={v => v}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 4 req */}
        <Grid item xs>
          <TextField
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
              value={null}
              onChange={v => v}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* 6 max 3 */}
        <Grid item xs>
          <Autocomplete
            options={null}
            value={null}
            size="small"
            inputParams={{ label: 'Вид полёта', name: 'mdp' }}
            onChange={(event, newValue) => {
              // if (typeof newValue === 'string') {
              //   setTimeout(() => {
              //     this.toggleOpen(true);
              //     this.setDialogValue({
              //       value: newValue,
              //       id: '',
              //     });
              //   });
              //   return;
              // }

              // if (newValue && newValue.inputValue) {
              //   this.toggleOpen(true);
              //   this.setDialogValue({
              //     value: newValue.inputValue,
              //     id: '',
              //   });

              //   return;
              // }
              console.log('suka');
              // this.aircraftHandleChange(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Добавить "${params.inputValue}"`,
                });
              }
              return filtered;
            }}
            getOptionLabel={option => {
              if (option.inputValue) {
                return option.inputValue;
              }
              if (option.title) {
                return option.title;
              }
              if (option.value) {
                return option.value;
              }
              return option;
            }}
            // renderOption={(option) => option.title}
            // onKeyDown={this.onInputKeyDown.bind(this)}
            renderOptionFunc={option => { return (<React.Fragment>{option.title || option.value || option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 7 max 1 need SELECT */}
        <Grid item xs>
          <Autocomplete
            options={null}
            value={null}
            size="small"
            inputParams={{ label: 'Кол-во первонач. вылетов', name: 'cfd' }}
            onChange={(event, newValue) => {
              // if (typeof newValue === 'string') {
              //   setTimeout(() => {
              //     this.toggleOpen(true);
              //     this.setDialogValue({
              //       value: newValue,
              //       id: '',
              //     });
              //   });
              //   return;
              // }

              // if (newValue && newValue.inputValue) {
              //   this.toggleOpen(true);
              //   this.setDialogValue({
              //     value: newValue.inputValue,
              //     id: '',
              //   });

              //   return;
              // }
              console.log('suka');
              // this.aircraftHandleChange(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Добавить "${params.inputValue}"`,
                });
              }
              return filtered;
            }}
            getOptionLabel={option => {
              if (option.inputValue) {
                return option.inputValue;
              }
              if (option.title) {
                return option.title;
              }
              if (option.value) {
                return option.value;
              }
              return option;
            }}
            // renderOption={(option) => option.title}
            // onKeyDown={this.onInputKeyDown.bind(this)}
            renderOptionFunc={option => { return (<React.Fragment>{option.title || option.value || option}</React.Fragment>); }} // eslint-disable-line
            clearOnEscape
            freeSolo
          />
        </Grid>
        {/* 8  max 2*/}
        <Grid item xs>
          <TextField
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

const mstp = state => ({});
const mdtp = dispatch => ({
  removeZ2: (id, z2id) => dispatch(summaryAction.removeSummaryZ2({id, z2id}))
});

export default connect(mstp, mdtp)(z2View);