/* eslint-env jest */

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const {ScrollView} = require('react-native');
  return {
    KeyboardProvider: ({children}) => children,
    KeyboardAwareScrollView: ({children, ...props}) =>
      React.createElement(ScrollView, props, children),
  };
});
