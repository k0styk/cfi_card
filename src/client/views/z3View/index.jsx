import React from 'react';
import { connect } from 'react-redux';
// import './z3.scss';

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

const z3View = ({ }) => {
  const classes = useStyles();

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
            options={[1, 2, 3, 4, 5]}
            value={1}
            size="small"
            inputParams={{ label: 'Класс ВП', name: 'aircraftType', maxLength: 2 }}
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
        {/* 2 */}
        <Grid item xs>
          <TextField
            label="Наименование типа ВС"
            inputProps={{ maxLength: 25, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 3 */}
        <Grid item xs>
          <TextField
            label="Коорд А/П вылета"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 4 */}
        <Grid item xs>
          <TextField
            label="Коорд А/П посадки"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        {/* 5 if class G */}
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
              placeholder="ЧЧ:ММ"
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

const mstp = state => ({});
const mdtp = dispatch => ({});

export default connect(mstp, mdtp)(z3View);