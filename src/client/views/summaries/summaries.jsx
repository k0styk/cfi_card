import './summaries.scss';
import React from 'react';
import { connect } from 'react-redux';
import { SummaryView } from '@views';
import { summaries as summariesEvents } from '@client/Events';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function sleep(delay = 0) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const summariesView = ({socket}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [dateValue, setDateValue] = React.useState('');
  const [dateInputValue, setDateInputValue] = React.useState('');
  const loadingDates = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loadingDates) {
      return undefined;
    }

    (async () => {

      socket.emit(summariesEvents.getDates, null, async ({ dates }) => {
        await sleep(1e3);
        if (active) {
          setOptions(dates);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loadingDates]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      socket.emit(summariesEvents.generate, {date: dateValue}, ({generated}) => {
        if(generated) {
          setLoading(false);
          setSuccess(true);
        }
      });

    }
  };

  return (
    <div className="summaries-view-content">
      <div className="generate-button-block">
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Autocomplete
              style={{ width: 250 }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) => option === value}
              getOptionLabel={option => option}
              options={options}
              loading={loadingDates}
              value={dateValue}
              onChange={(event, newValue) => {
                setDateValue(newValue);
              }}
              inputValue={dateInputValue}
              onInputChange={(event, newInputValue) => {
                setDateInputValue(newInputValue);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  label="Выберите дату"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingDates ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              className={success ? classes.buttonSuccess : ''}
              disabled={loading}
              onClick={handleButtonClick}
            >
              {success ? 'созданы' : loading ? 'создаём' : 'Создать файлы сводки'}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({socket}) => ({
    socket,
  }),
  dispatch => ({})
)(summariesView);