import './header.scss';
import React from 'react';
import { SwitchFolder, ConnectAdd, UserView } from '@views';
import { Logo, TimeView } from '@components';

const header = ({ }) => (
  <div className='header-wrapper grid-header'>
    <div className='header'>
      <div className='header-block-icon'>
        <Logo />
        <TimeView />
        <UserView />
      </div>
      <div className="center-block">
        <SwitchFolder />
      </div>
      <div className='block-buttons'>
        <ConnectAdd />
      </div>
    </div>
  </div>
);

export default header;