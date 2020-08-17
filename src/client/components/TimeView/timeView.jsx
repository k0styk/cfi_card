// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';

import './timeView.scss';

const TimeView = ({date,...elementProps}) => {
  const css = cx('time-view-component');
  const [diffTime, setDiffTime] = React.useState(0);
  const [time, setTime] = React.useState('00:00:00');
  let timeId;

  const setTimer = () => {
    const date = new Date(new Date() - diffTime);

    setTime(moment(date).utc().format('HH:mm:ss'));
    timeId = setTimeout(setTimer, 1000);
  };

  React.useEffect(() => {
    const { server, client } = date;

    setDiffTime(client - server);
    setTimer();
    return () => timeId && clearTimeout(timeId);
  }, [time]);

  return (<div className={css} {...elementProps}>
    <i className="far fa-clock"></i>
    <span className="time-span">{time}</span>
  </div>);
};

const mstp = state => ({date: state.date});
const mdtp = dispatch => ({});

export default connect(mstp, mdtp)(TimeView);