import React, { Component } from 'react';

type props = {};
type state = { hasError: boolean, error: string, info: any };

export default class ErrorBoundary extends Component<props, state> {
  // tslint:disable-next-line: member-access
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '', info: '' };
  }

  // tslint:disable-next-line: member-access
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  // tslint:disable-next-line: member-access
  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h6 style={{ fontSize: '12px', color: 'red' }}>
            Something went wrong,
            {error.toString()}
            {info.componentStack}
          </h6>
        </div>
      );
    }
    return children;
  }
}
