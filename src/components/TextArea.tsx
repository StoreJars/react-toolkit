import React from 'react';
import { Label } from './';

interface IProps {
  label: string;
  name: string;
  value: string;
  onChange: any;
  errors: object;
}

export default function TextArea(props: IProps) {
  const { label, onChange, name, value, errors } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />

      <p style={{ color: 'red', marginTop: 10 }}>{errors[name]}</p>

      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows={5}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}