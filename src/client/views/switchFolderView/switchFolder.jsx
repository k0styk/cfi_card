// import './archive.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faThList } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  marginRight: {
    marginRight: theme.spacing(1)
  }
}));

const switchFolder = ({archiveSet, archieve}) => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      <Button color={`${!archieve?'secondary':'primary'}`}
        onClick={() => archiveSet(false)}
      >
        <FontAwesomeIcon icon={faThList} className={classes.marginRight} />
        Список
      </Button>
      <Button color={`${archieve?'secondary':'primary'}`}
        onClick={() => archiveSet(true)}
      >
        <FontAwesomeIcon icon={faArchive} className={classes.marginRight} />
        Для отправления
      </Button>
    </ButtonGroup>
  </div>);
};

const mstp = state => ({
  archieve: state.ui.app.archieve
});

const mdtp = dispatch => ({
  archiveSet: archieve => dispatch(uiAction.app.setArchieve({archieve})),
});

export default connect(mstp, mdtp)(switchFolder);