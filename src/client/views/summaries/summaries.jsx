import './summaries.scss';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
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
  { id: 'monday',     label: 'ПН.',           minWidth: 150, align: 'center' },
  { id: 'tuesday',    label: 'ВТ.',           minWidth: 150, align: 'center' },
  { id: 'wednesday',  label: 'СР.',           minWidth: 150, align: 'center' },
  { id: 'thursday',   label: 'ЧТ.',           minWidth: 150, align: 'center' },
  { id: 'friday',     label: 'ПТ.',           minWidth: 150, align: 'center' },
  { id: 'saturday',   label: 'СБ.',           minWidth: 150, align: 'center' },
  { id: 'sunday',     label: 'ВС.',           minWidth: 150, align: 'center' },
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

const SummariesView = ({socket, notify}) => {
  moment.locale('ru');
  const classes = useStyless();
  // const classes = useStyles();
  const [date, setDate] = React.useState(moment());
  const [users, setUsers] = React.useState([]);
  const [disableNext, setDisableNext] = React.useState(true);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useLayoutEffect(() => {
    if(socket.emit) {
      getListOfUsersByWeek(date);
    }
  }, [date]);

  const getListOfUsersByWeek = date => {
    socket.emit(summariesEvents.getListUsers, date, ({usersListWithDays}) => {
      console.log(usersListWithDays);
      if(usersListWithDays)
        setUsers(usersListWithDays);
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectClick = (event, name) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }

    // setSelected(newSelected);
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

    setDisableNext(checkCanNext(bufDate));
    setDate(bufDate);
  };

  const handlePrevWeekClick = () => {
    const bufDate = moment(date).subtract(7,'days');

    setDisableNext(checkCanNext(bufDate));
    setDate(bufDate);
  };

  React.useLayoutEffect(() => {
    console.log('SOCKET');
    if(socket.emit) {
      getListOfUsersByWeek(date);
    }
  }, [socket]);

  // const isSelected = name => selected.indexOf(name) !== -1;
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.rootT}>
      <TableContainer className={classes.tableContainerFlex}>
        <MyToolbar
          /*numSelected={selected.length}*/
          className={classes.toolbar}
          date={getSliceWeekOfDateString(date)}
          handleNext={handleNextWeekClick}
          handlePrev={handlePrevWeekClick}
          canNext={disableNext}
        />
        <TableContainer className={classes.tableRelativeContainer}>
          <TableContainer className={classes.tableAbsoluteContainer}>
            <Table
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
                onSelectAllClick={null}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
                numSelected={selected}
                onSelectAllClick={handleSelectClick}
              />
              <TableBody>
                {stableSort(users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return <Row
                      key={row.index}
                      row={row}
                      id={index+1}
                      socket={socket}
                    />;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Строк на странице"
        className={classes.tablePaginationFlex}
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // return (
  //   <Paper className={classes.rootT}>
  //     <TableContainer className={classes.flex1}>
  //       <TableContainer>
  //         <Table stickyHeader aria-label="sticky table">
  //           <TableHead>
  //             <TableRow>
  //               {columns.map(column => (
  //                 <TableCell
  //                   key={column.id}
  //                   align={column.align}
  //                   style={{
  //                     minWidth: column.minWidth,
  //                     maxWidth: column.maxWidth,
  //                   }}
  //                 >
  //                   {column.label}
  //                 </TableCell>
  //               ))}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {rows.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map(row => <Row key={row.id} row={row} />)}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </TableContainer>
  //     <TablePagination
  //       className={classes.flex2}
  //       rowsPerPageOptions={[10, 15, 30]}
  //       component="div"
  //       count={rows.length}
  //       rowsPerPage={rowsPerPage}
  //       page={page}
  //       onChangePage={handleChangePage}
  //       onChangeRowsPerPage={handleChangeRowsPerPage}
  //     />
  //   </Paper>
  // );
};

export default connect(
  ({socket}) => ({
    socket,
  }),
  dispatch => ({
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  })
)(SummariesView);