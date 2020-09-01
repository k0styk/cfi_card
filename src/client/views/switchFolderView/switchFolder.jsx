// import './archive.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Badge } from '@material-ui/core';
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
  margin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  marginR: {
    marginRight: theme.spacing(1),
  }
}));

const switchFolder = ({archiveSet, archieve, summary}) => {
  const classes = useStyles();
  const getLengthList = () => summary.value.filter(v => v.archieve === false).length;
  const getLengthArchieve = () => summary.value.filter(v => v.archieve === true).length;

  return (<div className={classes.root}>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      <Button color={`${!archieve?'secondary':'primary'}`}
        onClick={() => archiveSet(false)}
      >
        Список
        <Badge
          className={classes.marginR}
          badgeContent={getLengthList()}
          max={99}
          color={`${!archieve?'secondary':'primary'}`}
          showZero
        >
          <FontAwesomeIcon icon={faThList} className={classes.margin} />
        </Badge>
      </Button>
      <Button color={`${archieve?'secondary':'primary'}`}
        onClick={() => archiveSet(true)}
      >
        Для отправления
        <Badge
          className={classes.marginR}
          badgeContent={getLengthArchieve()}
          max={99}
          color={`${archieve?'secondary':'primary'}`}
          showZero
        >
          <FontAwesomeIcon icon={faArchive} className={classes.margin} />
        </Badge>
      </Button>
    </ButtonGroup>
  </div>);
};

const mstp = ({ui, summary}) => ({
  archieve: ui.app.archieve,
  summary
});

const mdtp = dispatch => ({
  archiveSet: archieve => dispatch(uiAction.app.setArchieve({archieve})),
});

export default connect(mstp, mdtp)(switchFolder);