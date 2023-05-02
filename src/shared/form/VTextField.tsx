import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextField = TextFieldProps & {
    name: string;
}

export const VTextField: React.FC<TVTextField> = ({name, ...rest}: TVTextField) => {
  const {defaultValue,error,fieldName,registerField,clearError} = useField(name);

  const [value,setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_,newValue) => setValue(newValue)
    });
  },[registerField, value, fieldName]);

  return (
    <TextField 
      {...rest} 
      value={value} 

      defaultValue={defaultValue}
      error={!!error}
      helperText={error}
      
      onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e);}}
      onChange={(e) => { setValue(e.target.value); rest.onChange?.(e);}}
    />    
  );
};