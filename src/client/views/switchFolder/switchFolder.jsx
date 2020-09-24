// import './archive.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Badge } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faThList } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

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

const switchFolder = ({archiveSet, archive, summary}) => {
  const classes = useStyles();
  const getLengthList = () => summary.value.filter(v => v.archive === false).length;
  const getLengthArchive = () => summary.value.filter(v => v.archive === true).length;
  const [render, setRender] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setRender(/summary/gi.test(location.pathname));
  }, [location]);

  return render?(<div className={classes.root}>
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      <Button color={`${!archive?'secondary':'primary'}`}
        onClick={() => archiveSet(false)}
      >
        Список
        <Badge
          className={classes.marginR}
          badgeContent={getLengthList()}
          max={99}
          color={`${!archive?'secondary':'primary'}`}
          showZero
        >
          <FontAwesomeIcon icon={faThList} className={classes.margin} />
        </Badge>
      </Button>
      <Button color={`${archive?'secondary':'primary'}`}
        onClick={() => archiveSet(true)}
      >
        Для отправления
        <Badge
          className={classes.marginR}
          badgeContent={getLengthArchive()}
          max={99}
          color={`${archive?'secondary':'primary'}`}
          showZero
        >
          <FontAwesomeIcon icon={faArchive} className={classes.margin} />
        </Badge>
      </Button>
    </ButtonGroup>
  </div>):null;
};

const mstp = ({ui, summary}) => ({
  archive: ui.app.archive,
  summary
});

const mdtp = dispatch => ({
  archiveSet: archive => dispatch(uiAction.app.setArchive({archive})),
});

export default connect(mstp, mdtp)(switchFolder);