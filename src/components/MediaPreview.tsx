import React from 'react';
import { X } from 'react-feather';

import { Image } from './';

interface IProps {
  alt: string;
  removePreview: any;
  mediaPreview: any;
  previewStyle: any;
}

export default function MediaPreview(props: IProps) {
  const { removePreview, mediaPreview, previewStyle, alt } = props;

  return (
    <div className="preview-holder">
      {mediaPreview.map((item, index) => (
        <div key={index} style={{ marginBottom: 10, display: 'inline-block', padding: 10 }}>
          <Image alt={alt} src={item} style={previewStyle} />

          <button
            type="button"
            onClick={() => removePreview(index)}
            className="btn btn-secondary"
            style={{ padding: '2px 4px' }}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
