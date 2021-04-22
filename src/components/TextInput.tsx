import React from 'react';
import ErrorLabel from './ErrorLabel';
import Label from './Label';

interface IProps {
  label: string;
  placeholder: string;
  type?: 'email' | 'password' | 'text' | 'number' | 'date' | 'tel';
  name: string;
  value: string | number;
  required?: boolean;
  onChange: any;
  onBlur: any;
  error: string;
  readonly?: boolean;
  disabled?: boolean;
}

export default function TextInput(props: IProps) {
  const { placeholder, label, type, onChange, onBlur, name, value, required, error, readonly, disabled } = props;

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
        onBlur={onBlur}
        value={value}
        required={required || false}
        style={error && { borderColor: 'red' }}
        readOnly={readonly}
        disabled={disabled}
      />
      <ErrorLabel message={error} />
    </div>
  );
}
