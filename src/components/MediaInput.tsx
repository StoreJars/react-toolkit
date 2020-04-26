
import React, { Component } from 'react';

import imageValidator from '../imageValidator';
import { MediaSelect, MediaPreview } from './';

interface IProps {
  formDataName: any;
  getFile: any;
  label: string;
  alt: string;
  error: string;
}

interface IState {
  mediaPreview: any;
}

export default class MediaUpload extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      mediaPreview: '',
    };
  }

  public removeMediaPreview = () => {
    this.setState({ mediaPreview: '' });
  }

  public handleChange = (event) => {
    event.preventDefault();
    const { getFile } = this.props;

    const reader = new window.FileReader();
    const file = event.target.files[0];

    imageValidator(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({ mediaPreview: reader.result });
    };

    console.log(file);

    getFile(file);
  }

  public render() {
    const { mediaPreview } = this.state;
    const { label, alt, error } = this.props;

    return (
      <div style={{ marginTop: '20px', marginBottom: '50px' }}>
        <div className='form-group'>
          <div className='custom-file'>
            {mediaPreview ?
              <MediaPreview
                title={label}
                removePreview={this.removeMediaPreview}
                mediaPreview={mediaPreview}
                alt={alt}
              /> :
              <MediaSelect
                onChange={this.handleChange}
                label={label}
                name="image"
                error={error}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
