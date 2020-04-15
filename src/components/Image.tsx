
import React from 'react';

interface IProps {
  src: string;
  alt: string;
}

export default function Image(props: IProps) {
  const { src, alt } = props;

  return (
    <img
      src={src}
      style={{ height: 'auto', width: '200px', paddingBottom: '10px' }}
      alt={alt || 'Storejars Image'}
    />
  )
}
