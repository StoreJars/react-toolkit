
import React from 'react';

interface IProps {
  message: string;
  reset: any;
  type?: string;
}

function Banner(props: IProps) {
  const { message, reset, type } = props;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role='alert'>
      <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={reset}>
        <span aria-hidden='true'>×</span>
      </button>
      <strong>!</strong> {message || ''}.
  </div>
  );
}

function Error(props: IProps) {
  return <Banner {...props} type='danger' />
}

function Success(props: IProps) {
  return <Banner {...props} type='success' />
}

export default {
  Error, Success
}
