const { describe, it } = global;
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
// import { stub } from 'sinon';
import TestExample from '../index';

describe('app.components.TestExample', () => {
  describe('if prop says "Hello"', () => {
    it('should respond with "Goodbye"', () => {
      const props = { words: 'Hello' };
      const el = shallow(<TestExample {...props} />);
      expect(el.text()).to.equal('Goodbye');
    });
  })

  describe('if prop says "Goodbye"', () => {
    it('should respond with "greeting"', () => {
      const props = { words: 'Goodbye' };
      const el = shallow(<TestExample {...props} />);
      expect(el.text()).to.equal('Hello!');
    });
  })

  describe('if prop is undefined', () => {
    it('should respond with "lame saying"', () => {
      const el = shallow(<TestExample />);
      expect(el.text()).to.equal('props.words was empty. Sad!');
    });
  })
});
