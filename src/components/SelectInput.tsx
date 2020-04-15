
import React from 'react';
import { Label, ErrorLabel } from './';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  data: Array<any>;
  required?: boolean;
  onChange: any;
  error: string
}

export default function SelectInput(props: IProps) {
  const { placeholder, label, onChange, name, value, required, error, data } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />

      <select
        id={name}
        name={name}
        onChange={onChange}
        className="form-control"
        value={value}
        required={required || false}
      >
        <option value=''>{placeholder}</option>
        {data.map(item => (
          <option key={item._id} value={item._id}> {item.name} </option>
        ))}
      </select>

      <ErrorLabel message={error} />
    </div>
  )
}