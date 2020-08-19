import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '../../redux/actions';
import './main.scss';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

import SummaryView from '@views/summaryView/';

const mainView = ({ summary, alert, closeSnack }) => {
  const Alert = React.forwardRef((props, ref) => (<MuiAlert elevation={6} variant="filled" {...props} ref={ref} />));
  const TransitionRight = React.forwardRef((props, ref) => (<Slide {...props} direction="left" ref={ref} />));

  return (<div className="main-view-content grid-content">
    <div className="work-area">
      <div className="wrapper-summary">
        {summary.value.map((i, idx) => (<SummaryView key={idx} id={i.id} />))}
      </div>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={alert.open}
        onClose={closeSnack}
        TransitionComponent={TransitionRight}
        key={alert.message+'#'+'bottomright'}
        // onClose={(e,r) => console.log(r)}
      >
        <Alert onClose={closeSnack} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  </div>);
};

const mstp = state => ({
  summary: state.summary,
  alert: state.ui.alert
});
const mdtp = dispatch => ({
  closeSnack: () => dispatch(uiAction.alert.setAlert({message:'', open: false, severity: 'info'}))
});

export default connect(mstp, mdtp)(mainView);