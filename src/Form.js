import React, { Component } from 'react';
import PropTypes from 'prop-types';

const checkForError = (errors, name, required, validate, value) => {
  console.log(required, value)
  if (required && (value === '' || value === null)) {
    errors[name] = `${name} is required`;
  } else if (validate && !validate({ name, value })) {
    errors[name] = `${name} is invalid`;
  } else {
    delete errors[name];
  }

  return errors;
};

/**
 * Form is a cool form thing
 */
export default class Form extends Component {
  static propTypes = {
    /**
     * onChange gets called when any form field changes
     */
    onChange: PropTypes.func,
    /**
     * onUpdate gets called when the component mounts, resets, or when the values change
     */
    onUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      initialData: { ...this.props.data },
      data: { ...this.props.data },
      errors: {},
      valid: !Object.keys(this.validate(this.props.data)).length,
    };

    if (props.onUpdate) {
      props.onUpdate({
        data: this.state.data,
        errors: this.state.errors,
        valid: this.state.valid,
      });
    }
  }

  handleChange = changed => {
    const { onChange, onUpdate } = this.props;
    const { name, value, validate, required } = changed;

    const { data, errors } = this.state;
    data[name] = value;

    const updatedErrors = checkForError(
      errors,
      name,
      required,
      validate,
      value
    );

    const updatedState = {
      data,
      errors: updatedErrors,
      valid: !Object.keys(updatedErrors).length,
    };

    this.setState({
      ...updatedState,
    });

    if (onChange) onChange(updatedState);
    if (onUpdate) onUpdate(updatedState);
  };

  validate = data => {
    const errors = {};
    const { children } = this.props;

    React.Children.forEach(children, child => {
      if (child.type.name === 'Field') {
        const { name, required, validate } = child.props;
        const value = data[name];

        if (required && (value === '' || value === null)) {
          errors[name] = `${name} is required`;
        }

        if (validate && !validate(value)) {
          errors[name] = `${name} is invalid`;
        }
      }
    });

    return errors;
  };

  // reset = () => {
  //   const valid = !Object.keys(this.validate(this.state.initialData)).length;

  //   this.setState({
  //     errors: {},
  //     data: this.state.initialData,
  //     valid
  //   });

  //   onChange(data, {}, valid);
  // };

  handleSubmit() {
    const { data } = this.state;
    const { onSubmit } = this.props;

    const errors = this.validate(data);

    this.setState({
      errors,
      valid: !Object.keys(errors).length,
    });

    if (onSubmit) {
      onSubmit(data);
    }
  }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child => {
      // Add value, onChange, and error props to each field
      if (child.type.name === 'Field') {
        return React.cloneElement(child, {
          value: this.state.data[child.props.name],
          onChange: this.handleChange,
          error: !!this.state.errors[child.props.name],
        });
      }

      // Add onClick prop to any submit buttons
      if (child.type.name === 'Submit') {
        return React.cloneElement(child, {
          onClick: this.handleSubmit,
        });
      }
    });

    return (
      <form onSubmit={this.handleSubmit}>
        {childrenWithProps} <br /> {JSON.stringify(this.state, null, 2)}
      </form>
    );
  }
}
