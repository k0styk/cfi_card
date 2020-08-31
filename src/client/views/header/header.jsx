import './header.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Logo, TimeView } from '@components';
import { SwitchFolder, ConnectAdd, UserView } from '@views';

const header = ({userId}) => (
  <div className='header-wrapper grid-header'>
    <div className='header'>
      <div className='header-block-icon'>
        <Logo />
        <TimeView />
        <UserView />
      </div>
      <div className="center-block">
        {userId?<SwitchFolder />:null}
      </div>
      <div className='block-buttons'>
        {userId?<ConnectAdd />:null}
      </div>
    </div>
  </div>
);

const mstp = ({user}) => ({
  userId: user.id
});
const mdtp = dispatch => ({});

export default connect(mstp,mdtp)(header);