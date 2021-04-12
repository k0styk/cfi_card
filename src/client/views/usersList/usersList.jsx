import './usersList.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
import { user as usersEvents } from '@client/Events';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import Row from './usersListRow';
import MyToolbar from './usersListTableToolbar';
import MyTableHead from './usersListTableHead';
import UserModal from './userModalView';

const headCells = {
  'id':           { label: '№', width: '56px', align: 'center', alignRow: 'center' },
  'login':        { label: 'Логин', align: 'center', alignRow: 'center', width: '232px' },
  'department':   { label: 'Подразделение', align: 'center', alignRow: 'left', width: '482px' },
  'description':  { label: 'Описание', align: 'center', alignRow: 'left', width: '832px' },
  'rights':       { label: 'Права', align: 'center', alignRow: 'center', width: '103px' },
  'edit':         { label: '', alignRow: 'center',},
};

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 750,
    '& td,th': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
    }
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

function sortUsersByAdm({rights: a},{rights: b}) {
  if(a.toLowerCase() === 'admin'    && b.toLowerCase() === 'manager') return -1;
  if(a.toLowerCase() === 'admin'    && b.toLowerCase() === 'user')    return -1;
  if(a.toLowerCase() === 'manager'  && b.toLowerCase() === 'user')    return -1;
  if(a.toLowerCase() === 'manager'  && b.toLowerCase() === 'admin')   return 1;
  if(a.toLowerCase() === 'user'     && b.toLowerCase() === 'admin')   return 1;
  if(a.toLowerCase() === 'user'     && b.toLowerCase() === 'manager') return 1;
  return 0;
}

const UsersListView = ({socket, notify, user}) => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getListOfUsers = () => {
    socket.emit(usersEvents.getListUsers, null, ({users: usersList, err}) => {
      if(err) {
        console.error(err);
        notify({
          message: err,
          options: {
            autoHideDuration: 1500,
            variant: 'error',
          }
        });
      } else {
        if(usersList) {
          setUsers(usersList.sort(sortUsersByAdm));
        }
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterFields = ({id,login,department,description,lastActive,rights}) =>
    ({id,login,department,description,lastActive,rights});

  const editClick = userInfo => {
    setUserInfo(userInfo);
    setOpen(true);
  };

  const registerUser = () => {
    setOpen(true);
  };

  const handleClose = reload => {
    setUserInfo(null);
    setOpen(false);
    if(reload) getListOfUsers();
  };

  React.useLayoutEffect(() => {
    if(socket.emit) {
      getListOfUsers();
    }
  }, [socket]);

  return (
    <Paper className={classes.rootT}>
      <TableContainer className={classes.tableContainerFlex}>
        <MyToolbar className={classes.toolbar} registerUser={registerUser} />
        <TableContainer className={classes.tableRelativeContainer}>
          <TableContainer className={classes.tableAbsoluteContainer}>
            {users.length ? <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
              stickyHeader
            >
              <MyTableHead
                classes={classes}
                headCells={headCells}
                rowCount={users.length}
                // onSelectClick={handleSelectClick}
              />
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <Row
                      editClick={() => editClick(row)}
                      headCells={headCells}
                      key={index}
                      idx={index + 1}
                      length={rowsPerPage}
                      row={filterFields(row)}
                      socket={socket}
                      adminEdit={row.rights==='admin'?(user.rights === 'admin'?false:true):false}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {open ?
        <UserModal
          userInfo={userInfo}
          open={open}
          handleClose={handleClose}
        />
        : null}
    </Paper>
  );

};

export default connect(
  ({socket,user}) => ({
    socket,
    user
  }),
  dispatch => ({
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  })
)(UsersListView);