import React, { Component } from 'react';

export default class Submit extends Component {
  render() {
    const { component, error, name, value, ...extra } = this.props;

    // default to Input
    const Component = component;

    return <Component onClick={this.props.handleSubmit} {...extra} />;
  }
}
