import React from 'react';
import ErrorLabel from './ErrorLabel';
import Label from './Label';

interface IProps {
  label: string;
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
  error: string;
}

export default function TextArea(props: IProps) {
  const { label, onChange, onBlur, name, value, error } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />

      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows={5}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <ErrorLabel message={error} />
    </div>
  );
}
