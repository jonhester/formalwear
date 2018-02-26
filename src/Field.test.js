import React from 'react';
import { mount, shallow } from 'enzyme';

import Field from './Field.js';

describe('Field', () => {
  test('renders input if no component is set', () => {
    const onChange = jest.fn();
    const validate = jest.fn();

    const wrapper = shallow(
      <Field
        value=""
        name="firstName"
        onChange={onChange}
        validate={validate}
      />
    );

    // verify that component rendered properly
    expect(wrapper).toMatchSnapshot();

    const input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'Jon' } });

    // verify that compnent updated to new input value
    expect(wrapper).toMatchSnapshot();

    expect(onChange).toHaveBeenCalledWith({
      name: 'firstName',
      required: false,
      validate,
      value: 'Jon',
    });
  });

  test('gracefully handles bad onChange', () => {
    const onChange = jest.fn();

    const wrapper = shallow(
      <Field
        value=""
        name="firstName"
        onChange={onChange}
        component="input"
      />
    );

    // verify that component rendered properly
    expect(wrapper).toMatchSnapshot();
  });

  test('gracefully handles bad onChange', () => {
    const onChange = jest.fn();
    const validate = jest.fn();

    const wrapper = shallow(
      <Field
        value=""
        name="firstName"
        onChange={onChange}
      />
    );

    // verify that component rendered properly
    expect(wrapper).toMatchSnapshot();

    const input = wrapper.find('input').first();
    input.simulate('change', { value: 'Jon' });

    // verify that the onChange callback was not called since we don't have any good data
    expect(onChange).toHaveBeenCalledTimes(0);

    // verify that compnent updated to new input value
    expect(wrapper).toMatchSnapshot();
  });

  test('extra props are passed through', () => {
    const onChange = jest.fn();
    const validate = jest.fn();

    const wrapper = mount(
      <Field
        value=""
        name="something"
        onChange={onChange}
        validate={validate}
        required
        style={{ fontWeight: 'bold' }}
      />
    );

    // verify that component rendered properly with extra props passed through to input
    const input = wrapper
      .find('input')
      .first()
      .instance();

    expect(input.style.fontWeight).toBe('bold');
  });
});
