import React from 'react';
import Label from './Label';
import ErrorLabel from './ErrorLabel';

interface IProps {
  label?: string;
  placeholder: string;
  name: string;
  value: string | number;
  data: Array<any>;
  required?: boolean;
  onChange: any;
  onBlur: any;
  error: string;
  labelKey?: string;
  valueKey?: string;
}

export default function SelectInput(props: IProps) {
  const { placeholder, label, onChange, onBlur, name, value, required, error, data, labelKey, valueKey } = props;

  return (
    <div className="form-group">
      <Label text={label} htmlFor={name} />

      <select
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className="form-control"
        value={value}
        required={required || false}
      >
        <option value="">{placeholder}</option>
        {data.map((item) => {
          if (labelKey && valueKey) {
            return (
              <option key={item[valueKey]} value={item[valueKey]}>
                {item[labelKey]}
              </option>
            );
          } else {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          }
        })}
      </select>

      <ErrorLabel message={error} />
    </div>
  );
}
