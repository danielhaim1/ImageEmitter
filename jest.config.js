// jest.config.js
module.exports = {
  transform: {
    '^.+\\.js$': 'jest-esbuild'
  },
  testTimeout: 10000,
  testEnvironment: 'jsdom',
};
