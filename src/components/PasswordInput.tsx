import React, { Component } from 'react';
import { Eye, EyeOff } from 'react-feather';

import { TextInput } from './';

interface IProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
  error: string;
}

interface IState {
  passwordVisible: boolean;
}

export default class PasswordInput extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };

  render() {
    const { placeholder, label, onChange, onBlur, name, value, error } = this.props;
    const { passwordVisible } = this.state;

    return (
      <div>
        <i style={{ position: 'absolute', padding: '2.2rem', right: '4%' }} onClick={this.togglePasswordVisibility}>
          {passwordVisible ? <Eye size={15} color="grey" /> : <EyeOff size={15} color="grey" />}
        </i>
        <TextInput
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          label={label}
          type={passwordVisible ? 'text' : 'password'}
          value={value}
          error={error}
          required
        />
      </div>
    );
  }
}
