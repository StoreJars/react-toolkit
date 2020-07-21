import React from 'react';
import { X } from 'react-feather';

import { Image } from './';

interface IProps {
  alt: string;
  removePreview: any;
  mediaPreview: any;
}

export default function MediaPreview(props: IProps) {
  const { removePreview, mediaPreview, alt } = props;

  return (
    <div className="preview-holder">
      {mediaPreview.map((item, index) => (
        <div key={index} style={{ marginBottom: 50 }}>
          <Image alt={alt} src={item} />

          <button
            type="button"
            onClick={() => removePreview(index)}
            className="btn btn-secondary"
            style={{ padding: '0px 4px' }}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
