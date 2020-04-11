
import React from 'react';
import { Label } from './';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  data: Array<any>;
  required: boolean;
  onChange: any;
  errors: object
}

export default function SelectInput(props: IProps) {
  const { placeholder, label, onChange, name, value, required, errors, data } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />
      <p style={{ color: 'red', marginTop: 10 }}>{errors[name]}</p>

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
    </div>
  )
}