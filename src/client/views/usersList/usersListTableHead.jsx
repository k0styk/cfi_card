import React from 'react';

import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const UsersTableHead = ({ headCells }) => (
  <TableHead>
    <TableRow>
      <TableCell align={headCells.id.align} width={headCells.id.width} >
        <TableSortLabel hideSortIcon>
          {headCells.id.label}
        </TableSortLabel>
      </TableCell>
      <TableCell align={headCells.login.align} width={headCells.login.width} >
        <TableSortLabel hideSortIcon>
          {headCells.login.label}
        </TableSortLabel>
      </TableCell>
      <TableCell align={headCells.department.align} width={headCells.department.width} >
        <TableSortLabel hideSortIcon>
          {headCells.department.label}
        </TableSortLabel>
      </TableCell>
      <TableCell align={headCells.description.align} width={headCells.description.width} >
        <TableSortLabel hideSortIcon>
          {headCells.description.label}
        </TableSortLabel>
      </TableCell>
      <TableCell align={headCells.rights.align} width={headCells.rights.width}>
        <TableSortLabel hideSortIcon>
          {headCells.rights.label}
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel hideSortIcon>
          {headCells.edit.label}
        </TableSortLabel>
      </TableCell>
    </TableRow>
  </TableHead>
);

export default UsersTableHead;