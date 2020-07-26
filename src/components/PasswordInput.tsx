import React, { useState } from 'react';
import Eye from 'react-feather/dist/icons/eye';
import EyeOff from 'react-feather/dist/icons/eye-off';

import { TextInput } from './';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: any;
  error: string;
}

export default function PasswordInput(props: IProps) {
  const { placeholder, label, onChange, name, value, error } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  console.log('here');

  return (
    <div>
      <TextInput
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        label={label}
        type={passwordVisible ? 'text' : 'password'}
        value={value}
        error={error}
        required
      />

      <span
        // className={`fa ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
        style={{ position: 'absolute', top: '45px', right: '5%' }}
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? <Eye /> : <EyeOff />}
      </span>
    </div>
  );
}
