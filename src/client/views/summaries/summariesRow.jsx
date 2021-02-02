import React from 'react';
import { summaries as summariesEvents } from '@client/Events';

import { makeStyles, withStyles, lighten  } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileExcel, faFileArchive } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { Clear, Done, GetApp, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  infoTable: {
    width: 0
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
  infoRow: {
    paddingBottom: 0,
    paddingTop: 0
  },
  borderTop: {
    borderTop: '1px solid #3f51b5',
    borderLeft: '1px solid #3f51b5',
    borderRight: '1px solid #3f51b5',
  },
  border: {
    borderLeft: '1px solid #3f51b5',
    borderRight: '1px solid #3f51b5',
  },
  borderBottom: {
    borderBottom: '1px solid #3f51b5',
    borderLeft: '1px solid #3f51b5',
    borderRight: '1px solid #3f51b5',
  },
  selected:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
}));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const SummariesRow = ({ row, idx, length, socket, selected }) => {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(undefined);

  const handleOpenMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleInfoClick = (state, userId) => {
    setOpen(state);

    if(state) {
      if (socket.emit) {
        socket.emit(summariesEvents.getUserInfoById,
          userId, usrInfo => {
            setUserInfo(usrInfo);
          });
      }
    } else {
      setUserInfo(undefined);
    }
  };

  const delimiter = param => (
    param ?
      <React.Fragment>
        <IconButton
          color="primary"
          component="span"
          onClick={handleOpenMenu}
        >
          <Done />
        </IconButton>
        <StyledMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faFile} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Скачать TXT" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faFileExcel} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Скачать XLSX" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faFileArchive} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Скачать всё" />
          </StyledMenuItem>
        </StyledMenu>
      </React.Fragment>
      :
      <IconButton aria-label="clear" color="secondary">
        <Clear />
      </IconButton>
  );

  const getClassForRowCell = (index, len, day, today, dayOfWeek) => {
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
      if(!!~(selected.indexOf(dayOfWeek)))
        resultClass = clsx(resultClass, classes.selected);
    }
    return resultClass;
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => handleInfoClick(!open, row.userId)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {row.department}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,0,row.today,'monday')} align="center">
          {delimiter(row.monday)}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,1,row.today,'tuesday')} align="center">
          {delimiter(row.tuesday)}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,2,row.today,'wednesday')} align="center">
          {delimiter(row.wednesday)}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,3,row.today,'thursday')} align="center">
          {delimiter(row.thursday)}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,4,row.today,'friday')} align="center">
          {delimiter(row.friday)}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,5,row.today,'saturday')} align="center">
          {delimiter(row.saturday)}
        </TableCell>
        <TableCell
          className={getClassForRowCell(idx,length,6,row.today,'sunday')} align="center">
          {delimiter(row.sunday)}
        </TableCell>
      </TableRow>
      {/* USER INFO */}
      <TableRow>
        <TableCell className={classes.infoRow} colSpan={10} >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">Информация о пользователе</Typography>
              {userInfo ?
                <Table size="small" aria-label="infos" className={classes.infoTable}>
                  <TableBody>
                    {userInfo.map((u, i) => (
                      <TableRow key={i}>
                        <TableCell>{u[0]}</TableCell>
                        <TableCell>{u[1]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> : null
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SummariesRow;