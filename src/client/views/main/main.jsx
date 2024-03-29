import './main.scss';
import React from 'react';
import { connect } from 'react-redux';
import { SummaryView } from '@views';

const mainView = ({ summary, archive }) => {
  const filteredSummary = summary.value.filter(v => v.archive === archive);

  return (
    <div className="main-view-content grid-content">
      <div className="work-area">
        <div className="wrapper-summary">
          {filteredSummary.map((i, idx) =>
            (<SummaryView
              key={'SummaryView:'+idx}
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
  null
)(mainView);