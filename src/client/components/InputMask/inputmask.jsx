import React from 'react';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';

const MaskedInput = ({mask, value, onChange, ...otherProps}) => (
  <InputMask mask={mask} value={value} onChange={onChange} {...otherProps}>
    {inputProps => <TextField {...inputProps} />}
  </InputMask>
);

export default MaskedInput;