import React from 'react';

import { makeStyles, lighten } from '@material-ui/core/styles';
import { Toolbar, Typography, Button } from '@material-ui/core';
import { GetApp, ChevronLeft, ChevronRight } from '@material-ui/icons';

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

const SummariesTableToolbar = ({
  numSelected,
  date,
  handleNext,
  handlePrev,
  canNext,
  selected,
  downloadSelectedClick
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      {
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Сводки {date}
        </Typography>
      }
      {
        <div className={classes.titleButtonBlock}>
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<GetApp />}
            onClick={downloadSelectedClick}
            disabled={!numSelected}
          >
            скачать выбранные
          </Button>
        </div>
      }
    </Toolbar>
  );
};

export default SummariesTableToolbar;