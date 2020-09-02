import './header.scss';
import React from 'react';
import { Logo, TimeView } from '@components';
import { SwitchFolder, ConnectAdd, UserView } from '@views';

const header = ({}) => (
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