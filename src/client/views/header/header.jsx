import './header.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { summaryAction } from '@redux/actions';
import { Logo, TimeView } from '@components';

import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const header = ({addSummary}) => {
  const classes = useStyles();

  return (
    <div className='header-wrapper grid-header'>
      <div className='header'>
        <div className='header-block-icon'>
          <Logo />
          <TimeView />
        </div>
        <div className='block-buttons'>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.margin}
            onClick={() => addSummary()}
          >
            <AddIcon className={classes.extendedIcon}/>
            Добавить сводку
          </Fab>
        </div>
      </div>
    </div>
  );
};

const mstp = state => ({});
const mdtp = dispatch => ({
  addSummary: () =>  dispatch(summaryAction.addSummary())
});

export default connect(mstp, mdtp)(header);