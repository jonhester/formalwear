import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Field extends Component {
  static propTypes = {
    /**
     * The component to use for rendering the field
     */
    component: PropTypes.node,
    /**
     * error sets whether an error state should be shown
     */
    error: PropTypes.bool,
    /**
     * Function that gets called when data changes
     */
    onChange: PropTypes.func,
    /**
     * name is the name for the field and is used to key the data for this field
     */
    name: PropTypes.string.isRequired,
    /**
     * required sets whether or not a field is reuqired to be valid
     */
    required: PropTypes.bool,
    /**
     * validate is an optional function that returns true or false to determine if a value is valid or not
     */
    validate: PropTypes.func,
  };

  static defaultProps = {
    required: false,
  }

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

    // default to using html input
    const Component = component ? component : 'input';

    return (
      <Component {...extra} value={value} onChange={this.handleChange} error={error} />
    );
  }
}
