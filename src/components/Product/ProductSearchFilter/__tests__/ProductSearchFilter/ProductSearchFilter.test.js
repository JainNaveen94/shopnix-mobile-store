
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductSearchFilter\ProductSearchFilter from '..\ProductSearchFilter\ProductSearchFilter';


describe('ProductSearchFilter\ProductSearchFilter test', () => {
  it('ProductSearchFilter\ProductSearchFilter should match snapshot', () => {
    const component = renderer.create(<ProductSearchFilter\ProductSearchFilter
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
