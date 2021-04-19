import React from 'react';

import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import { Toolbar, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import { GetApp, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileExcel, faFileArchive } from '@fortawesome/free-regular-svg-icons';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    background: '#CCCCCC',
  },
  button: {
    margin: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ?
      {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      :
      {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  titleButtonBlock: {
    flex: '1 0 auto',
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

const SummariesTableToolbar = ({
  date,
  canNext,
  handleNext,
  handlePrev,
  numSelected,
  downloadSelectedClick,
  handleDeselectAllClick,
}) => {
  const classes = useToolbarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseMenu = option => event => {
    setAnchorEl(null);
    downloadSelectedClick && option && downloadSelectedClick(option);
  };

  return (
    <Toolbar className={classes.root}>
      {
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Сводки {date}
        </Typography>
      }
      {
        <div className={classes.titleButtonBlock}>
          {numSelected?
            (<Button
              color="secondary"
              onClick={handleDeselectAllClick}
            >
              Отменить выделение
            </Button>):
            null
          }
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ChevronLeft />}
            onClick={handlePrev}
          >
            Пред. неделя
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<ChevronRight />}
            onClick={handleNext}
            disabled={canNext}
          >
            След. неделя
          </Button>
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<GetApp />}
              onClick={handleOpenMenu}
              disabled={!numSelected}
            >
              скачать выбранные
            </Button>
            <StyledMenu
              keepMounted
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu()}
            >
              <StyledMenuItem onClick={handleCloseMenu('txt')}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faFile} size="lg" />
                </ListItemIcon>
                <ListItemText primary="Скачать TXT" />
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseMenu('excel')}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faFileExcel} size="lg" />
                </ListItemIcon>
                <ListItemText primary="Скачать XLSX" />
              </StyledMenuItem>
              <StyledMenuItem onClick={handleCloseMenu('archive')}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faFileArchive} size="lg" />
                </ListItemIcon>
                <ListItemText primary="Скачать всё" />
              </StyledMenuItem>
            </StyledMenu>
          </React.Fragment>
        </div>
      }
    </Toolbar>
  );
};

export default SummariesTableToolbar;