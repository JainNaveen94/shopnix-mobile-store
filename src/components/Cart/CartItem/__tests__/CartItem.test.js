
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import CartItem from '..\CartItem';


describe('CartItem test', () => {
  it('CartItem should match snapshot', () => {
    const component = renderer.create(<CartItem
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
