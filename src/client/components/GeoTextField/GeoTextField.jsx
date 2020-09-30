import React from 'react';
import InputMask from 'react-input-mask';
import { IconButton, InputAdornment, Input, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import { Explore, ExploreOff } from '@material-ui/icons';

const GeoTextField = ({
  id,
  state,
  handleState,
  mask,
  maskChar,
  value,
  onChange,
  onBlur,
  label,
  helperText,
  ...otherProps
}) => {
  const [compass, setCompass] = React.useState(state?state:false);

  const handleClickIcon = () => {
    setCompass(!compass);
    handleState && handleState(!compass);
  };

  const handleMouseDownIcon = e => {
    e.preventDefault();
  };

  return (
    <FormControl >
      <InputLabel
        htmlFor={id}
        error={!!helperText}
      >
        {label}
      </InputLabel>
      <InputMask
        mask={compass ? mask[0] : mask[1]}
        maskChar={compass ? maskChar[0] : maskChar[1]}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {inputProps => (
          <Input
            id={id}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle"
                  onClick={handleClickIcon}
                  onMouseDown={handleMouseDownIcon}
                >
                  {compass ? <Explore /> : <ExploreOff />}
                </IconButton>
              </InputAdornment>
            }
            {...inputProps}
            {...otherProps}
          />
        )}
      </InputMask>
      {helperText &&
      <FormHelperText error={!!helperText} id="standard-geo-text-field">
        {helperText}
      </FormHelperText>}
    </FormControl>
  );
};

export default GeoTextField;