import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Field extends Component {
  static propTypes = {
    /**
     * The component to use for rendering the field
     */
    component: PropTypes.node,
    /**
     * Function that gets called when data changes
     */
    onChange: PropTypes.func,
  };

  handleChange = ({ target }) => {
    if (target) {
      this.props.onChange({
        name: this.props.name,
        value: target.value,
        required: this.props.required,
        validate: this.props.validate
      });
    }
  };

  render() {
    const { children, component, error, name, value, validate, ...extra } = this.props;

    // default to input
    const Component = component ? component : 'input';

    return (
      <Component {...extra} value={value} onChange={this.handleChange} error={error} />
    );
  }
}
