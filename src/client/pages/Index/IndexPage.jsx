import React from 'react';
import { connect } from 'react-redux';

const IndexPage = props => {
  React.useEffect(() => {
    const {token} = props;

    console.log(token);
    if (!token) {
      props.history.push('/login');
    } else {
      props.history.push('/summary');
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

const mstp = state => ({
  token: state.user.token
});

const mdtp = dispatch => ({});

export default connect(mstp,mdtp)(IndexPage);