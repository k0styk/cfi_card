import React from 'react';
import { connect } from 'react-redux';

const IndexPage = ({id, history}) => {
  React.useEffect(() => {
    console.log(id);
    if (!id) {
      history.push('/login');
    } else {
      history.push('/summary');
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

const mstp = state => ({
  id: state.user.id
});

const mdtp = dispatch => ({});

export default connect(mstp,mdtp)(IndexPage);