// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
    'dist',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
