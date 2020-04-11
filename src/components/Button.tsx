import React from 'react';

interface IProps {
  isSubmitting: boolean
  text: string
  type?: 'submit' | 'button' | 'reset'
}

export default function Button(props: IProps) {
  const { isSubmitting, text, type } = props;

  return (
    <div className="mt-3">
      <button
        type={type || 'submit'}
        className="btn btn-primary mr-2 mb-2 mb-md-0"
        disabled={isSubmitting}
        style={{ minWidth: '100px' }}
      >
        {text}
      </button>

      {/* <button type="button" className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0">
      <i className="btn-icon-prepend" data-feather="twitter"></i>
      Login with twitter
      </button> */}
    </div>
  )
}