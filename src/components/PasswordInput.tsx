
import React from 'react';
import { TextInput } from './';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: any;
  errors: object;
}

export default function PasswordInput(props: IProps) {
  const { placeholder, label, onChange, name, value, errors } = props;

  return (
    <TextInput
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      label={label}
      type="password"
      value={value}
      errors={errors}
      required
    />
  )
}