import './main.scss';
import React from 'react';
import { connect } from 'react-redux';
import { uiAction } from '@redux/actions';
import { SummaryView } from '@views';

const mainView = ({ summary, archive }) => {
  const filteredSummary = summary.value.filter(v => v.archive === archive);

  return (
    <div className="main-view-content grid-content">
      <div className="work-area">
        <div className="wrapper-summary">
          {filteredSummary.map((i, idx) =>
            (<SummaryView
              key={'SummaryView:'+idx+':'+new Date().getTime().toString().substr(-6)}
              id={i.id}
              curSummary={i}
            />))}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({summary, ui}) => ({
    summary,
    archive: ui.app.archive,
  }),
  dispatch => ({})
)(mainView);