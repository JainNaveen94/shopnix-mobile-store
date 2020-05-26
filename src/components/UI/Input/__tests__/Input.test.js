
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Input from '..\Input';


describe('Input test', () => {
  it('Input should match snapshot', () => {
    const component = renderer.create(<Input
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
