module.exports = {
  rootDir: __dirname,
  roots: ['<rootDir>/src'],
  // Stop running tests after the first failure
  bail: false,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Show a native notification on your machine when tests are run
  notify: false,
  notifyMode: 'change',
  // The path to a module that runs some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./jest.setup'],
  testEnvironment: 'jsdom',
  // `runScripts` is already set by jsdom environment
  // See https://github.com/facebook/jest/blob/6392dbd9a097f688ef8d90228b7c86738e80e9e3/packages/jest-environment-jsdom/src/index.ts
  testEnvironmentOptions: {
    resources: 'usable',
    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    url: 'http://localhost',
  },
  // The glob patterns Jest uses to detect test files. If you want jest to run
  // your test, make sure it matches this pattern.
  testMatch: ['**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['jest-date-mock'],
  reporters: ['default'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
