import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileExcel, faFileArchive } from '@fortawesome/free-regular-svg-icons';

import { Clear, Done } from '@material-ui/icons';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

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

const MyButton = ({
  day,
  downloadTxtClick,
  downloadExcelClick,
  downloadAllClick
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseMenu = (handleDownload, id) => {
    setAnchorEl(null);
    handleDownload && handleDownload(id);
  };

  return (<React.Fragment>
    <Button
      variant={day ? 'contained' : 'outlined'}
      color={day ? 'primary' : 'secondary'}
      startIcon={day ? <Done /> : <Clear />}
      onClick={day?handleOpenMenu:null}
    >
      {`Кол-во: ${day ? day.summaryCount : 0}`}
    </Button>
    <StyledMenu
      keepMounted
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => handleCloseMenu()}
    >
      <StyledMenuItem onClick={() => handleCloseMenu(downloadTxtClick, day.dayId)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faFile} size="lg" />
        </ListItemIcon>
        <ListItemText primary="Скачать TXT" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => handleCloseMenu(downloadExcelClick, day.dayId)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faFileExcel} size="lg" />
        </ListItemIcon>
        <ListItemText primary="Скачать XLSX" />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => handleCloseMenu(downloadAllClick, day.dayId)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faFileArchive} size="lg" />
        </ListItemIcon>
        <ListItemText primary="Скачать всё" />
      </StyledMenuItem>
    </StyledMenu>
  </React.Fragment>);
};

export default MyButton;