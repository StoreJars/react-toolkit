import React, { Component } from 'react';
import { produce } from 'immer';

import imageValidator from '../imageValidator';
import MediaSelect from './MediaSelect';
import MediaPreview from './MediaPreview';
import Label from './Label';
import ErrorLabel from './ErrorLabel';

interface IProps {
  label: string;
  alt: string;
  getFile: any;
  error: string;
  multiple?: boolean;
  previewStyle?: any;
}

interface IState {
  mediaPreview: any;
}

export default class MediaInput extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      mediaPreview: [],
    };
  }

  public removeMediaPreview = (index) => {
    const { mediaPreview } = this.state;
    const res = produce(mediaPreview, (draft) => {
      const data = mediaPreview.filter((item, i) => index != i);
      draft = data;
      return draft;
    });

    this.setState({ mediaPreview: res });
  };

  public readFile = (file) => {
    // we make this a promise so the loop halts till this is over
    const reader = new window.FileReader();
    return new Promise((resolve, reject) => {
      try {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      } catch (ex) {
        reject('could not read image');
        console.log(ex);
      }
    });
  };

  public handleChange = async (event) => {
    event.preventDefault();
    const { getFile } = this.props;
    const files = event.target.files;

    let totalSize = 0;

    /**
     * files has a funny FileType prepended to it, but we want a pure array
     * so we create a counter for it instead
     */
    const data = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      data.push(file);
      imageValidator(file);
      totalSize += file.size;

      const { mediaPreview } = this.state;
      const result = await this.readFile(file);
      const res = produce(mediaPreview, (draft) => {
        draft.push(result);
        return draft;
      });

      this.setState({ mediaPreview: res });
    }

    if (totalSize > 2000000) {
      window.alert('Image is too large, images should be less than 2MB');
      return '';
    }

    getFile(data);
  };

  public render() {
    const { mediaPreview } = this.state;
    const { label, alt, error, multiple, previewStyle } = this.props;

    return (
      <div style={{ marginTop: '20px', marginBottom: '50px' }}>
        <div className="form-group">
          <div className="custom-file">
            <Label text={label} htmlFor={label} />

            {mediaPreview.length > 0 && (
              <MediaPreview
                removePreview={this.removeMediaPreview}
                mediaPreview={mediaPreview}
                alt={alt}
                previewStyle={previewStyle}
              />
            )}

            <MediaSelect onChange={this.handleChange} multiple={multiple} />

            <ErrorLabel message={error} />
          </div>
        </div>
      </div>
    );
  }
}
