import './main.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
import { SummaryView } from '@views';

const mainView = ({ summary, alert, closeSnack }) => (
  <div className="main-view-content grid-content">
    <div className="work-area">
      <div className="wrapper-summary">
        {summary.value.map((i, idx) => (<SummaryView key={idx} id={i.id} />))}
      </div>
    </div>
  </div>
);

const mstp = state => ({
  summary: state.summary,
  alert: state.ui.alert
});
const mdtp = dispatch => ({
  closeSnack: () => dispatch(uiAction.alert.setAlert({message:'', open: false, severity: 'info'}))
});

export default connect(mstp, mdtp)(mainView);