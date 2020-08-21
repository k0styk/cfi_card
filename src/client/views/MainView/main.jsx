import './main.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
import { SummaryView } from '@views';

const mainView = ({ summary, archieve }) => {
  const filteredSummary = summary.value.filter(v => v.archieve === archieve);

  return (
    <div className="main-view-content grid-content">
      <div className="work-area">
        <div className="wrapper-summary">
          {filteredSummary.map((i, idx) => (<SummaryView key={idx} id={i.id} />))}
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
  closeSnack: () => dispatch(uiAction.alert.setAlert({message:'', open: false, severity: 'info'}))
});

export default connect(mstp, mdtp)(mainView);