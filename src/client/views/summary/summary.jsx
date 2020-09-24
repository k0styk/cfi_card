import './summary.scss';
import React from 'react';
import { connect } from 'react-redux';
import { summaryAction, uiAction } from '../../redux/actions';
import { Z1View, Z2View, Z3View } from '@views';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Typography } from '@material-ui/core';
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
  curSummary,
  removeSummary,
  addZ2,
  archiveSet,
  notify,
  archive,
  validationSet
}) => {
  const DeleteButton = ({ ...elementProps }) => (<div className="summary-button-delete" {...elementProps}>
    <CancelIcon />
  </div>);
  const ToArchive = ({...elementProps}) => (<React.Fragment>
    <FontAwesomeIcon icon={faBox} className={classes.marginRight} {...elementProps} />в список на отправление
  </React.Fragment>);
  const FromArchive = ({...elementProps}) => (<React.Fragment>
    <FontAwesomeIcon icon={faBoxOpen} className={classes.marginRight} {...elementProps} />в список
  </React.Fragment>);
  const classes = useStyles();
  // const [curSummary] = summary.value.filter(v => v.id === id);

  const handleClick = () => {
    const val = curSummary.z1.validation+
                curSummary.z3.validation+
                curSummary.z2.reduce((a,r) => a+r.validation,0);

    archiveSet(id, !archive);
    validationSet(id, val, eqValidationsHandle());
    notify({
      message: archive?'Отправлено в список':'Отправлено в папку для отправления',
      options: {
        autoHideDuration: 3000,
        variant: 'info',
        action: () => (
          <Button onClick={() => archiveSet(id, archive)}>отмена</Button>
        ),
      }
    });
  };
  const eqValidationsHandle = () => {
    const {z1,z2} = curSummary;
    /* default difinition */
    let retVal = 64; // 63 z1 + 1 z3

    if(z1.aircraftType ==='ZZZZ') retVal+=(1<<1);
    if(z1.depAirport   ==='ZZZZ') retVal+=(1<<2);
    if(z1.destAirport  ==='ZZZZ') retVal+=(1<<3);
    retVal += (31*z2.length);
    /* default difinition */

    return retVal;
  };

  console.log('SUMMARY');

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
          <Z1View id={id} curSummary={curSummary} />
          {curSummary.z2.map((v,i) =>
            <Z2View
              key={'Z2View:'+i+':'+new Date().getTime().toString().substr(-6)}
              id={id}
              z2id={v.id}
              curZ2={v}
            />)
          }
          <Z3View id={id} curSummary={curSummary} />
        </div>
        <Divider />
        <div className="summary-footer">
          <Button
            disabled={
              archive?false:
                !(curSummary.z1.validation+
                  curSummary.z3.validation+
                  curSummary.z2.reduce((a,r) => a+r.validation,0) === eqValidationsHandle())
            }
            onClick={() => handleClick()}
            variant="contained"
            color="default"
            className={classes.button}
          >
            {archive?(<FromArchive />):(<ToArchive />)}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mstp = state => ({
  archive: state.ui.app.archive
});
/* eslint-disable */
const mdtp = dispatch => ({
  archiveSet:      (id, archive)  => dispatch(summaryAction.archiveSet({id, archive})),
  removeSummary:    id              => dispatch(summaryAction.removeSummary({id})),
  addZ2:            id              => dispatch(summaryAction.addSummaryZ2({id})),
  notify:           (...args)       => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  validationSet:    (id, fieldValidation, factValidation)  => dispatch(summaryAction.validationSet({id, fieldValidation, factValidation})),
});
/* eslint-enable */

export default React.memo(connect(mstp, mdtp)(summaryView));