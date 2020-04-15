import React from 'react';
import { X } from 'react-feather';

import { Image } from './';

interface IProps {
  removePreview: any;
  title: any;
  mediaPreview: any;
  alt: string;
}

export default function MediaPreview(props: IProps) {
  const { removePreview, title, mediaPreview, alt } = props;

  return (
    <div className='m-b-30'>
      <p>{title}</p>

      <div className='preview-holder'>
        <Image alt={alt} src={mediaPreview} />
      </div>

      <button
        type='button'
        onClick={() => removePreview()}
        className='m-10 btn btn-secondary'
      >
        {/* <i className='mdi mdi-close' /> */}
        <X />
      </button>
    </div>
  );
}
