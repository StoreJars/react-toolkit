import React from 'react';
import { Label, ErrorLabel } from './';

const IMAGE_TYPES = '.png, .jpeg, .jpg';

interface IProps {
  label: any;
  onChange: any;
  name: string;
  error: string;
}

export default function MediaSelect(props: IProps) {
  const { onChange, label, name, error } = props;

  return (
    <div>
      <Label text={label} htmlFor={name} />
      <input
        type='file'
        accept={IMAGE_TYPES}
        className="form-control"
        id='validatedCustomFile'
        onChange={onChange}
      />
      <ErrorLabel message={error} />
    </div>
  );
}
