import './summary.scss';
import React from 'react';
import { connect } from 'react-redux';
import { summaryAction, uiAction, notifyAction } from '@redux/actions';
import { Z1View, Z2View, Z3View } from '@views';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  greenBtn: {
    margin: theme.spacing(1),
    backgroundColor: '#32C332',
    '&:hover': {
      backgroundColor: '#329332',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#329332',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginRight: {
    marginRight: theme.spacing(3),
  },
  marginSides: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2)
  }
}));

const summaryView = ({
  id,
  summary,
  removeSummary,
  addZ2,
  // setSnack,
  enqueueSnackbar
}) => {
  const DeleteButton = ({...elementProps}) =>
    (<div className="summary-button-delete" {...elementProps}>
      <CancelIcon />
    </div>);
  const classes = useStyles();
  const curSummary = summary.value.filter(v => v.id === id);

  const handleClick = () => {
    enqueueSnackbar({
      message: 'SUKA',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
        // action: key => (
        //   <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        // ),
      },
    });
  };

  return (
    <div className="summary-view">
      <div className="summary-box">
        <DeleteButton onClick={() => removeSummary(id)}/>
        <div className="summary-header">
          <div className="summary-h-l">
            <Typography variant="button" display="block" gutterBottom>
              СВОДКА {moment().format('DDMMYY')} <span className={classes.margin}>#{id}</span>
            </Typography>
          </div>
          <div className="summary-h-r">
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => addZ2(id)}
            >
              <AddIcon className={classes.marginRight} />
              <b className={classes.marginSides}>Z2</b>
            </Button>
          </div>
        </div>
        <Divider />
        <div className="summary-content">
          <Z1View id={id} />
          {curSummary[0].z2.map((v,idx) => <Z2View key={idx} id={id} z2id={v.id} />)}
          <Z3View id={id} />
        </div>
        <Divider />
        <div className="summary-footer">
          <Button
            onClick={() => handleClick()}
            variant="contained"
            color="primary"
            className={classes.greenBtn}
            endIcon={<Send />}
            // disabled
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

const mstp = state => ({
  summary: state.summary
});
const mdtp = dispatch => ({
  removeSummary: id => dispatch(summaryAction.removeSummary({id})),
  addZ2: id => dispatch(summaryAction.addSummaryZ2({id})),
  // setSnack: () => dispatch(uiAction.alert.setAlert({message: 'suka', open: true, severity: 'success'})),
  enqueueSnackbar: (...args) => dispatch(notifyAction.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(summaryView);