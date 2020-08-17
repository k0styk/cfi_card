// @ts-check
import React from 'react';
import cx from 'classnames';

import './logo.scss';

/**
 * @param {{ [x: string]: any; small: boolean; medium: boolean; large: boolean; }} props properties
 * - default is 70x70 px
 * - small is 32x32 px
 * - medium is 100x100 px
 * - large is 150x150 px
 */
const Logo = props => {
  const {
    small,
    medium,
    large,
    ...elementProps
  } = props;

  const css = cx(
    'header-a-div-icon',
    {
      small,
      medium,
      large
    }
  );

  return (
    <a {...elementProps} className='header-a-brand'
      href='http://www.ans.aero'
      title='Аэронавигация Севера Сибири'
      target='_blank'>
      <div className={css} />
    </a>
  );
};

export default Logo;