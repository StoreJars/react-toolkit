import React from 'react';

interface IProps {
  onChange: any;
  multiple?: boolean;
}

export default function MediaSelect(props: IProps) {
  const { onChange, multiple } = props;

  return (
    <input type="file" multiple={multiple || false} accept="image/*" className="form-control" onChange={onChange} />
  );
}
