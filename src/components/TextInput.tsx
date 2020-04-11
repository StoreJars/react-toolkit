
import React from 'react';
import { Label } from './';


interface IProps {
  label: string;
  placeholder: string;
  type: 'email' | 'password' | 'text' | 'number';
  name: string;
  value: string | number;
  required: boolean;
  onChange: any;
  errors: object
}

export default function TextInput(props: IProps) {
  const { placeholder, label, type, onChange, name, value, required, errors } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />
      <p style={{ color: 'red', marginTop: 10 }}>{errors[name]}</p>

      <input
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        required={required || false}
      />
    </div>
  )
}