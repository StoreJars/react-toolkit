import React from 'react';

interface IProps {
  message: string
  style?: object
}

export default function ErrorLabel(props: IProps) {
  const { message, style } = props;

  return (
    <p style={{ color: 'red', fontSize: '13px', marginTop: 5, ...style }}>
      {message}
    </p>
  )
}