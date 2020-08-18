/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const autocomplete = props => {
  const classes = useStyles();
  const { options,
    optionLabelFunc,
    renderOptionFunc,
    inputParams,
    handleCancel,
    handleOk,
    handleOutside,
    closed,
    classesAutocomplete,
    ...autocompleteProps
  } = props;
  const {
    label,
    variant,
    inputProps,
    ...otherInputParams
  } = inputParams;

  return (<div className="autocomplete-component">
    <Autocomplete
      style={{ width: '100%' }}
      classes={{ option: classes.option, ...classesAutocomplete }}
      autoHighlight
      options={options}
      getOptionLabel={optionLabelFunc}
      renderOption={renderOptionFunc}
      {...autocompleteProps}
      renderInput={params => <TextField
        {...params}
        {...otherInputParams}
        label={label}
        variant={variant}
        fullWidth
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
          ...inputProps
        }}
      />}
    />
  </div>
  );
};

export default autocomplete;