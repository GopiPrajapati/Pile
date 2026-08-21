module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-native-async-storage|@react-navigation|@reduxjs|immer|react-native-reanimated|react-native-keyboard-controller|react-native-svg|react-redux|redux-persist)/)',
  ],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
  },
};
