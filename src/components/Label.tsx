import React from 'react';

interface IProps {
  htmlFor: string
  text: string
}

export default function Label(props: IProps) {
  const { htmlFor, text } = props;

  return (
    <label htmlFor={htmlFor}>{text}</label>
  )
}