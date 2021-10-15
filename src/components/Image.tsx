import React from 'react';

interface IProps {
  src: string;
  alt: string;
  style: Record<string, any>;
}

export default function Image(props: IProps) {
  const { src, alt, style } = props;

  return (
    <img
      src={src}
      style={{ height: 'auto', width: '300px', paddingBottom: '10px', display: 'block', ...style }}
      alt={alt || 'Storejars Image'}
    />
  );
}
