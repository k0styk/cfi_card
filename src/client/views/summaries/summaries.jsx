import './summaries.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
import { summaries as summariesEvents } from '@client/Events';

import { makeStyles, lighten } from '@material-ui/core/styles';
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
  rootT: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  flex1: {
    flex: '1 1 auto',
    '&::-webkit-scrollbar-track': {
      borderRadius: '3px',
      background: '#a6a6a6',
    },
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '3px',
      background: '#cccccc',
    },
  },
  flex2: {
    backgroundColor: '#fafafa',
    flex: '0 1 auto',
    overflow: 'hidden',
    minHeight: '52px'
  }
}));

function sleep(delay = 0) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

const columns = [
  { id: 'id', label: '№', minWidth: 25, maxWidth: 25 },
  { id: 'department', label: 'Department', minWidth: 200 },
  { id: 'monday', label: 'Mon.', minWidth: 150, align: 'center' },
  { id: 'tuesday', label: 'Tue.', minWidth: 150, align: 'center' },
  { id: 'wednesday', label: 'Wed.', minWidth: 150, align: 'center' },
  { id: 'thursday', label: 'Thu.', minWidth: 150, align: 'center' },
  { id: 'friday', label: 'Fri.', minWidth: 150, align: 'center' },
  { id: 'saturday', label: 'Sat.', minWidth: 150, align: 'center' },
  { id: 'sunday', label: 'Sun.', minWidth: 150, align: 'center' },
];

function createData(id,department,monday,tuesday,wednesday,thursday,friday,saturday,sunday) {
  return {id,department,monday,tuesday,wednesday,thursday,friday,saturday,sunday,
    userInfo: [
      { login: 'Login'},
      {'Отображаемое имя': 'Имя'},
      {'Описание':'описание'},
      {'Время посещения': ''},
    ]
  };
}

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  infoT: {
    width: 0
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Row({ row }) {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(false);

  const delimiter = param => (param?
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<DoneIcon />}
      onClick={() => console.log('click')}
    >скачать</Button>:
    <IconButton aria-label="clear" color="secondary">
      <ClearIcon />
    </IconButton>);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.department}
        </TableCell>
        <TableCell align="center">{delimiter(row.monday)}</TableCell>
        <TableCell align="center">{delimiter(row.tuesday)}</TableCell>
        <TableCell align="center">{delimiter(row.wednesday)}</TableCell>
        <TableCell align="center">{delimiter(row.thursday)}</TableCell>
        <TableCell align="center">{delimiter(row.friday)}</TableCell>
        <TableCell align="center">{delimiter(row.saturday)}</TableCell>
        <TableCell align="center">{delimiter(row.sunday)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10} >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                User info
              </Typography>
              <Table size="small" aria-label="infos" className={classes.infoT}>
                {/* USER INFO */}
                <TableBody>
                  {row.userInfo.map((info,i) => {
                    const entries = Object.entries(info);

                    return (<TableRow key={i}>
                      <TableCell>{entries[0][0]}</TableCell>
                      <TableCell>{entries[0][1]}</TableCell>
                    </TableRow>);
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1,'Tyumen','1','23','','','','',''),
  createData(2,'Tobolsk','','','2','','','',''),
  createData(3,'Tolka','','','','','','',''),
  createData(4,'Salekhard','','','','','','',''),
  createData(5,'Tyumen','','','','','3','',''),
  createData(6,'Tobolsk','','','','','','',''),
  createData(7,'Tolka','','','','','','',''),
  createData(8,'Salekhard','','','','','','',''),
  createData(9,'Tyumen','','','','','','',''),
  createData(10,'Tobolsk','','','','','','',''),
  createData(11,'Tolka','','','','','','',''),
  createData(12,'Salekhard','','','','','','',''),
  createData(13,'Tyumen','','','','','','',''),
  createData(14,'Tobolsk','','','','','','',''),
  createData(15,'Tolka','','','','','','',''),
  createData(16,'Salekhard','','','','','','',''),
  createData(17,'Tyumen','','','','','','',''),
  createData(18,'Tobolsk','','','','','','',''),
  createData(19,'Tolka','','','','','','',''),
  createData(20,'Salekhard','','','','','','',''),
  createData(21,'Tyumen','','','','','','',''),
  createData(22,'Tobolsk','','','','','','',''),
  createData(23,'Tolka','','','','','','',''),
  createData(24,'Salekhard','','','','','','',''),
];

const summariesView = ({socket, notify}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.rootT}>
      <TableContainer className={classes.flex1}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth && column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map(row => <Row key={row.id} row={row} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainer>
      <TablePagination
        className={classes.flex2}
        rowsPerPageOptions={[10, 15, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );

  // const classes = useStyles();
  // const [loading, setLoading] = React.useState(false);
  // const [success, setSuccess] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [options, setOptions] = React.useState([]);
  // const [dateValue, setDateValue] = React.useState('');
  // const [dateInputValue, setDateInputValue] = React.useState('');
  // const loadingDates = open && options.length === 0;
  // const notFound = 'ничего нет';

  const setupDownloadTimer = async () => {
    for (let i = 3; i > 0; i--) {
      await sleep(1e3);
    }
    setSuccess(false);
  };

  React.useEffect(() => {
    let active = true;

    if (!loadingDates) {
      return undefined;
    }

    (async () => {

      socket.emit(summariesEvents.getDates, null, async ({ dates }) => {
        await sleep(6e2);
        if (active) {
          if(dates.length) {
            setOptions(dates);
          } else {
            setOptions([notFound]);
          }
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
      socket.emit(summariesEvents.generate, {date:dateValue}, ({generated,message,link}) => {
        if(generated) {
          setLoading(false);
          setSuccess(true);
          window.open(link);
          setupDownloadTimer();
          notify({
            message,
            options: {
              autoHideDuration: 1500,
              variant: 'success',
            }
          });
        } else {
          setLoading(false);
          setSuccess(false);
          notify({
            message,
            options: {
              autoHideDuration: 1500,
              variant: 'error',
            }
          });
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
              getOptionDisabled={option => option === notFound}
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
              style={{ width: 300 }}
              variant="contained"
              color="primary"
              className={success ? classes.buttonSuccess : ''}
              onClick={handleButtonClick}
              disabled={loading||!dateInputValue}
            >
              {success?'Успешно созданы':loading?'создаём':'Создать файлы сводки'}
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
  dispatch => ({
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  })
)(summariesView);