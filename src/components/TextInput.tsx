
import React from 'react';
import { Label, ErrorLabel } from './';


interface IProps {
  label: string;
  placeholder: string;
  type?: 'email' | 'password' | 'text' | 'number';
  name: string;
  value: string | number;
  required?: boolean;
  onChange: any;
  error: string
}

export default function TextInput(props: IProps) {
  const { placeholder, label, type, onChange, name, value, required, error } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />

      <input
        type={type || 'text'}
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        required={required || false}
      />
      <ErrorLabel message={error} />
    </div>
  )
}