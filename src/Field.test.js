import React from 'react';
import { shallow } from 'enzyme';

import Field from './Field.js';

describe('Field', () => {
  test('renders input if no component is set', () => {
    const wrapper = shallow(<Field value={7}/>);
    expect(wrapper).toMatchSnapshot();
  })
})
