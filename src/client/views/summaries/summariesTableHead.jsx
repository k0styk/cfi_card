import React from 'react';

import { makeStyles, lighten } from '@material-ui/core/styles';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox } from '@material-ui/core';
import clsx from 'clsx';

const useHeadStyles = makeStyles(theme => ({
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
  today:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
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

const SummariesTableHead = ({ order, orderBy, rowCount, onRequestSort, headCells, selected, onSelectClick, today }) => {
  const classes = useHeadStyles();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const getClassForHeadCell = dayOfWeek => {
    let resultClass;

    if(today) {
      if (dayOfWeek === today) {
        resultClass = clsx(classes.today);
      }
    }
    if(selected.length) {
      if(!!~(selected.indexOf(dayOfWeek)))
        resultClass = clsx(classes.selected, resultClass);
    }
    return resultClass;
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell,i) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            className={getClassForHeadCell(headCell.dayOfWeek)}
          >
            { i > 1 ? (
              <Checkbox
                checked={!!(~selected.indexOf(headCell.dayOfWeek))}
                onChange={() => onSelectClick(headCell.dayOfWeek)}
                inputProps={{ 'aria-label': 'select all' }}
              />
            ):null}
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SummariesTableHead;