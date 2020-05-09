
import React from 'react';
import { Label, ErrorLabel } from './';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  value: string | number;
  data: Array<any>;
  required?: boolean;
  onChange: any;
  error: string;
  labelKey?: string;
  valueKey?: string;
}

export default function SelectInput(props: IProps) {
  const { placeholder, label, onChange, name, value, required, error, data, labelKey, valueKey } = props;

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
        {data.map(item => {
          if (labelKey && valueKey) {
            return <option key={item[valueKey]} value={item[valueKey]}> {item[labelKey]} </option>
          } else {
            return <option key={item} value={item}> {item} </option>
          }
        })}
      </select>

      <ErrorLabel message={error} />
    </div>
  )
}