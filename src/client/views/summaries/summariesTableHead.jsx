import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox } from '@material-ui/core';

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
}));

const SummariesTableHead = ({ order, orderBy, rowCount, onRequestSort, headCells }) => {
  const classes = useHeadStyles();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell,i) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            { i > 1 ? (
              <Checkbox
                checked={false}
                // onChange={onSelectAllClick}
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