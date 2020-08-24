import './summary.scss';
import React from 'react';
import { connect } from 'react-redux';
import { summaryAction, uiAction } from '../../redux/actions';
import { Z1View, Z2View, Z3View } from '@views';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  marginSides: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

const summaryView = ({
  id,
  summary,
  removeSummary,
  addZ2,
  archieveSet,
  enqueueSnackbar,
  archieve
}) => {
  const DeleteButton = ({ ...elementProps }) => (<div className="summary-button-delete" {...elementProps}>
    <CancelIcon />
  </div>);
  const ToArchieve = ({...elementProps}) => (<React.Fragment>
    <FontAwesomeIcon icon={faBox} className={classes.marginRight} {...elementProps} />в список на отправление
  </React.Fragment>);
  const FromArchieve = ({...elementProps}) => (<React.Fragment>
    <FontAwesomeIcon icon={faBoxOpen} className={classes.marginRight} {...elementProps} />в список
  </React.Fragment>);
  const classes = useStyles();
  const curSummary = summary.value.filter(v => v.id === id);

  const [validation, setValidation] = React.useState({
    z1Validated: 0, // 63
    z2Validated: 15, // 31
    z3Validated: 15, // 1 | 3 | 7 | 15
    formValidated: 0 // 95 | 97 | 101 | 109
  });
  const z1ValidateHandle = state => {
    // console.log(state);
    setValidation({
      ...validation,
      formValidated: state + validation.z2Validated + validation.z3Validated,
      z1Validated: state
    });
  };
  const z2ValidateHandle = state => setValidation({
    ...validation,
    formValidated: state & validation.z1Validated & validation.z3Validated,
    z2Validated: state
  });
  const z3ValidateHandle = state => setValidation({
    ...validation,
    formValidated: state & validation.z2Validated & validation.z1Validated,
    z3Validated: state
  });

  const handleClick = () => {
    archieveSet(id, !archieve);
    enqueueSnackbar({
      message: archieve?'Отправлено в список':'Отправлено в папку для отправления',
      options: {
        autoHideDuration: 3000,
        variant: 'info',
        action: () => (
          <Button onClick={() => archieveSet(id, archieve)}>отмена</Button>
        ),
      }
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
              <b className={classes.marginSides}>Добавить Z2</b>
            </Button>
          </div>
        </div>
        <Divider />
        <div className="summary-content">
          <Z1View id={id} handleValidate={z1ValidateHandle} />
          {curSummary[0].z2.map((v,idx) => <Z2View key={idx} id={id} z2id={v.id} handleValidate={z2ValidateHandle} />)}
          <Z3View id={id} handleValidate={z2ValidateHandle} />
        </div>
        <Divider />
        <div className="summary-footer">
          <Button
            disabled={validation.formValidated===109?false:true}
            onClick={() => handleClick()}
            variant="contained"
            color="default"
            className={classes.button}
          >
            {archieve?(<FromArchieve />):(<ToArchieve />)}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mstp = state => ({
  summary: state.summary,
  archieve: state.ui.app.archieve
});
const mdtp = dispatch => ({
  archieveSet: (id, archieve) => dispatch(summaryAction.archieveSet({id, archieve})),
  removeSummary: id => dispatch(summaryAction.removeSummary({id})),
  addZ2: id => dispatch(summaryAction.addSummaryZ2({id})),
  enqueueSnackbar: (...args) => dispatch(uiAction.notify.enqueueSnackbar(...args)),
});

export default connect(mstp, mdtp)(summaryView);