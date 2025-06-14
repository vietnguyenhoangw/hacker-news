module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^@react-navigation/stack$': '<rootDir>/__mocks__/@react-navigation/stack.js',
    '^@react-navigation/native$': '<rootDir>/__mocks__/@react-navigation/native.js',
    '^@react-navigation/drawer$': '<rootDir>/__mocks__/@react-navigation/drawer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
    '|@react-native' +
    '|@react-navigation' +
    '|@react-navigation/stack' +
    '|@react-navigation/native' +
    '|@rneui' +
    '|react-native-reanimated' +
    '|react-native-gesture-handler' +
    '|react-native-screens' +
    '|react-native-safe-area-context' +
    '|react-native-drawer-layout' +
    '|react-native-size-matters' +
    '|react-native-ratings' +
    '|react-native-vector-icons' +
    ')/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
};
