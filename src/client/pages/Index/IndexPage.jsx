import React from 'react';

const IndexPage = ({history}) => {
  React.useEffect(() => {
    const id = localStorage.getItem('userId');

    if (!id) {
      history.push('/login');
    } else {
      history.push('/summary');
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;