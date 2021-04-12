import React from 'react';

import { Button, TableCell, TableRow, } from '@material-ui/core';
import moment from 'moment';

const SummariesRow = ({
  row,
  idx,
  headCells,
  editClick,
  adminEdit,
}) => (
  <React.Fragment>
    <TableRow hover>
      <TableCell
        align={headCells.id.alignRow}
        width={headCells.id.width}
      >
        {idx}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align={headCells.login.alignRow}
        width={headCells.login.width}
      >
        {row.login}
        <React.Fragment>
          <br />
          {row.lastActive?moment(row.lastActive).format('DD.MM.YYYY - HH:mm:ss'):'нет активности'}
        </React.Fragment>
      </TableCell>
      <TableCell
        align={headCells.department.alignRow}
        width={headCells.department.width}
      >
        {row.department}
      </TableCell>
      <TableCell
        align={headCells.description.alignRow}
        width={headCells.description.width}
      >
        {row.description}
      </TableCell>
      <TableCell
        align={headCells.rights.alignRow}
        width={headCells.rights.width}
      >
        {row.rights}
      </TableCell>
      <TableCell
        align={headCells.edit.alignRow}
      >
        <Button disabled={adminEdit} variant="outlined" onClick={editClick}>редактировать</Button>
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default SummariesRow;