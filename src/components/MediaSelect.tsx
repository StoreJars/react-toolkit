import React from 'react';
import Label from './Label';

const IMAGE_TYPES = '.png, .jpeg, .jpg';

interface IProps {
  label: any;
  onChange: any;
  name: string;
}

export default function MediaSelect(props: IProps) {
  const { onChange, label, name } = props;

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
    </div>
  );
}
