import React from 'react';
import { summaries as summariesEvents } from '@client/Events';

import { makeStyles, withStyles, lighten  } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileExcel, faFileArchive } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';

import RowButton from './RowButton';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Typography,
  Popover,
  Fade,
  Paper,
} from '@material-ui/core';

import { KeyboardArrowDown } from '@material-ui/icons';

const useRowStyles = makeStyles(theme => ({
  infoTable: {
    width: 0
  },
  border: {
    boxShadow: 'inset 1px 0px 0px 0px rgb(63 81 181), inset -1px 0px 0px 0px rgb(63 81 181)',
  },
  borderTop: {
    boxShadow: 'inset 0px 1px 0px 0px rgb(63 81 181), inset 1px 0px 0px 0px rgb(63 81 181), inset -1px 0px 0px 0px rgb(63 81 181)', // eslint-disable-line
  },
  borderBottom: {
    boxShadow: 'inset 0px -1px 0px 0px rgb(63 81 181), inset 1px 0px 0px 0px rgb(63 81 181), inset -1px 0px 0px 0px rgb(63 81 181)', // eslint-disable-line
  },
  selected: theme.palette.type === 'light' ? {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  } : {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const SummariesRow = ({
  row,
  idx,
  today,
  length,
  socket,
  selected,
  findSelectedDay,
  downloadTxtClick,
  downloadAllClick,
  downloadExcelClick,
}) => {
  const classes = useRowStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [departmentInfo, setDepartmentInfo] = React.useState(undefined);

  const handleInfoClick = (event, userId) => {
    if (socket.emit) {
      setAnchorEl(event.currentTarget);
      socket.emit(summariesEvents.getDepartmentInfoById, userId, usrInfo => setDepartmentInfo(usrInfo));
    }
  };

  const getClassForRowCell = (index, len, day) => {
    let todayClass, resultClass;

    if (day === today) {
      if (index) {
        todayClass = classes.border;
      } else {
        todayClass = clsx(classes.border, classes.borderTop);
      }
      if (index === len - 1) {
        todayClass = clsx(classes.border, classes.borderBottom);
      }
    }
    resultClass = clsx(todayClass);
    if(selected.length) {
      if(!!~findSelectedDay(day))
        resultClass = clsx(resultClass, classes.selected);
    }
    return resultClass;
  };

  return (<React.Fragment>
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => {
        setAnchorEl(null);
        setDepartmentInfo(undefined);
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box margin={1}>
        <Typography variant="h6" gutterBottom component="div">Информация о пользователе</Typography>
        {departmentInfo ?
          <Table size="small" aria-label="infos" className={classes.infoTable}>
            <TableBody>
              {departmentInfo.map((u, i) => (
                <TableRow key={i}>
                  <TableCell>{u[0]}</TableCell>
                  <TableCell>{u[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> : null
        }
      </Box>
    </Popover>
    <TableRow>
      <TableCell>{row.id}</TableCell>
      <TableCell component="th" scope="row">
        <IconButton size="small" onClick={event => handleInfoClick(event, row.userId)}>
          <KeyboardArrowDown />
        </IconButton>
        {row.department}
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 0)} align="center">
        <RowButton
          day={row.monday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 1)} align="center">
        <RowButton
          day={row.tuesday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 2)} align="center">
        <RowButton
          day={row.wednesday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 3)} align="center">
        <RowButton
          day={row.thursday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 4)} align="center">
        <RowButton
          day={row.friday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 5)} align="center">
        <RowButton
          day={row.saturday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
      <TableCell className={getClassForRowCell(idx, length, 6)} align="center">
        <RowButton
          day={row.sunday}
          downloadTxtClick={downloadTxtClick}
          downloadExcelClick={downloadExcelClick}
          downloadAllClick={downloadAllClick}
        />
      </TableCell>
    </TableRow>
  </React.Fragment>);
};

export default SummariesRow;