import './summaries.scss';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
// import { uiAction } from '@redux/actions';
import { uiAction } from '../../redux/actions';
import { summaries as summariesEvents } from '@client/Events';

import { makeStyles, lighten } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import Row from './summariesRow';
import MyToolbar from './summariesTableToolbar';
import MyTableHead from './summariesTableHead';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getMonthString(momentObj) {
  const monthsStr = [
    'Январь','Февраль','Март',
    'Апрель','Май','Июнь',
    'Июль','Август','Сентябрь',
    'Октябрь','Ноябрь','Декабрь'
  ];

  return monthsStr[momentObj.month()];
};

function getSliceWeekOfDateString(dateObj) {
  const date = dateObj ? moment(dateObj) : moment();
  const startWeek = moment(date).startOf('week');
  const endWeek = moment(date).endOf('week');

  return `${getMonthString(date)}: ${moment(startWeek).date()} - ${moment(endWeek).date()}`;
};

function checkCanNext(dateObj) {
  return moment(dateObj).isSame(moment(), 'week');
};

const headCells = [
  { id: 'id',         label: '№',             minWidth: 25, maxWidth: 25 },
  { id: 'department', label: 'Подразделение', minWidth: 200 },
  { id: 'monday',     dayOfWeek: 0, label: 'ПН.', minWidth: 150, align: 'center' },
  { id: 'tuesday',    dayOfWeek: 1, label: 'ВТ.', minWidth: 150, align: 'center' },
  { id: 'wednesday',  dayOfWeek: 2, label: 'СР.', minWidth: 150, align: 'center' },
  { id: 'thursday',   dayOfWeek: 3, label: 'ЧТ.', minWidth: 150, align: 'center' },
  { id: 'friday',     dayOfWeek: 4, label: 'ПТ.', minWidth: 150, align: 'center' },
  { id: 'saturday',   dayOfWeek: 5, label: 'СБ.', minWidth: 150, align: 'center' },
  { id: 'sunday',     dayOfWeek: 6, label: 'ВС.', minWidth: 150, align: 'center' },
];

const useStyless = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  rootT: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  tableContainerFlex: {
    flex: '1 1 auto',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  toolbar: {
    flex: '0 1 auto'
  },
  tableRelativeContainer: {
    flex: '1 0 auto',
    position: 'relative',
  },
  tableAbsoluteContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    overflow: 'auto',
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
  tablePaginationFlex: {
    background: '#CCCCCC',
    flex: '0 1 auto',
    overflow: 'hidden',
    minHeight: '52px'
  }
}));

const customFunc1 = () => {
  console.log('Hello from customFunc1');
};

const SummariesView = ({socket, notify,setLoader}) => {
  moment.locale('ru');
  const classes = useStyless();
  const [date, setDate] = React.useState(moment());
  const [departments, setDepartments] = React.useState([]);
  const [today, setToday] = React.useState(undefined);
  const [disableNext, setDisableNext] = React.useState(true);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getListOfDepartmentsByWeek = date => {
    socket.emit(summariesEvents.getListDepartments, date, ({departmentsListWithDays, today}) => {
      if(departmentsListWithDays) {
        setLoader(false);
        console.log(departmentsListWithDays);
        setDepartments(departmentsListWithDays);
      }
      setToday(today);
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const findSelectedDay = React.useCallback(dayOfWeek =>
    selected.findIndex(s => s.dayOfWeek===dayOfWeek&&s.date===moment(date).format('DD.MM.YY')),[date,selected]);

  const handleSelectAllClick = dayOfWeek => {
    const selectedIndex = findSelectedDay(dayOfWeek);
    let newSelected = [];

    // if new selected
    if (selectedIndex === -1) {
      const departmentsWithDocuments = departments
        .filter(d => d[moment().locale('en').day(dayOfWeek+1).format('dddd').toLowerCase()])
        .map(d => ({
          department: d.department,
          userId: d.userId,
          dayId: d[moment().locale('en').day(dayOfWeek+1).format('dddd').toLowerCase()].dayId
        }));

      newSelected = newSelected.concat(selected, {
        date:moment(date).format('DD.MM.YY'),
        dayOfWeek,
        departmentsWithDocuments
      });
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    console.log(newSelected);
    setSelected(newSelected);
  };

  const handleDeselectAllClick = () => {
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNextWeekClick = () => {
    const bufDate = moment(date).add(7,'days');

    if(socket.emit) {
      getListOfDepartmentsByWeek(bufDate);
      setDisableNext(checkCanNext(bufDate));
      setDate(bufDate);
    }
  };

  const handlePrevWeekClick = () => {
    const bufDate = moment(date).subtract(7,'days');

    if(socket.emit) {
      getListOfDepartmentsByWeek(bufDate);
      setDisableNext(checkCanNext(bufDate));
      setDate(bufDate);
    }
  };

  /*****/ /*** DOWNLOAD BLOCK ***/
  const downloadHandler = React.useCallback((socketMessage,socketArgs) => {
    if(socket.emit) {
      socket.emit(socketMessage, socketArgs, ({err, message, fileId}) => {
        if(err) {
          console.log(err);
          notify({
            message,
            options: {
              autoHideDuration: 3000,
              variant: 'warning',
            }
          });
        } else {
          setTimeout(() => {
            window.open(`/download/${fileId}`);
          },5000);
          notify({
            message,
            options: {
              autoHideDuration: 4500,
              variant: 'success',
            }
          });
        }
      });
    }
  },[socket]);
  const downloadSelectedClick = option => {
    const filtered = selected.map(s => s.departmentsWithDocuments).filter(s => s);

    console.log(filtered);
    switch (option) {
      case 'txt': downloadHandler(summariesEvents.createTxtForAll,filtered); break;
      case 'excel': downloadHandler(summariesEvents.createExcelForAll,filtered); break;
      case 'archive': downloadHandler(summariesEvents.createArchiveForAll,filtered); break;
    }
  };
  /*****/ /*********************/

  React.useLayoutEffect(() => {
    setLoader(true);
    if(socket.emit) {
      getListOfDepartmentsByWeek(date);
    }
  }, [socket]);

  return (
    <Paper className={classes.rootT}>
      <TableContainer className={classes.tableContainerFlex}>
        <MyToolbar
          className={classes.toolbar}
          date={getSliceWeekOfDateString(date)}
          canNext={disableNext}
          numSelected={selected.length}
          handleNext={handleNextWeekClick}
          handlePrev={handlePrevWeekClick}
          downloadSelectedClick={downloadSelectedClick}
          handleDeselectAllClick={handleDeselectAllClick}
          // downloadTxtClick={downloadTxtClick}
          // downloadExcelClick={downloadExcelClick}
          // downloadAllClick={downloadAllClick}
        />
        <TableContainer className={classes.tableRelativeContainer}>
          <TableContainer className={classes.tableAbsoluteContainer}>
            {departments.length ?<Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
              stickyHeader
            >
              <MyTableHead
                classes={classes}
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                today={today}
                date={date}
                selected={selected}
                findSelectedDay={findSelectedDay}
                handleSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {stableSort(departments, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (<Row
                    key={index}
                    idx={index}
                    length={Math.min(rowsPerPage,departments.length)}
                    row={row}
                    socket={socket}
                    selected={selected}
                    today={today}
                    downloadTxtClick={id => downloadHandler(summariesEvents.createTxt,id)}
                    downloadExcelClick={id => downloadHandler(summariesEvents.createExcel,id)}
                    downloadAllClick={id => downloadHandler(summariesEvents.createArchive,id)}
                    findSelectedDay={findSelectedDay}
                  />
                  ))}
              </TableBody>
            </Table>:<h2>Список пользователей пуст</h2>}
          </TableContainer>
        </TableContainer>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Строк на странице"
        className={classes.tablePaginationFlex}
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={departments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default connect(
  ({socket}) => ({
    socket,
  }),
  dispatch => ({
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
    setLoader:  uiLoader       => dispatch(uiAction.app.setLoader({uiLoader})),
  })
)(SummariesView);