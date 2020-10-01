import './header.scss';
import React from 'react';
import { Logo, Time } from '@components';
import { SwitchFolderView, ServerButtonView, UserMenuView } from '@views';

const header = ({}) => (
  <div className='header-wrapper grid-header'>
    <div className='header'>
      <div className='header-block-icon'>
        <Logo />
        <Time />
        <UserMenuView />
      </div>
      <div className="center-block">
        <SwitchFolderView />
      </div>
      <div className='block-buttons'>
        <ServerButtonView />
      </div>
    </div>
  </div>
);

export default header;