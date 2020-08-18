import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './main.scss';

import SummaryView from '@views/summaryView/';

const mainView = ({ summary }) => (
  <div className="main-view-content grid-content">
    <div className="work-area">
      <div className="wrapper-summary">
        {summary.value.map((i, idx) => (<SummaryView key={idx} id={i.id} />))}
      </div>
    </div>
  </div>
);

const mstp = state => ({
  summary: state.summary
});
const mdtp = dispatch => ({});

export default connect(mstp, mdtp)(mainView);