// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cleanup, configure } = require('@testing-library/react');

configure({
  asyncUtilTimeout: 1000,
  // https://github.com/testing-library/dom-testing-library/issues/552
  defaultHidden: true,
});

afterEach(() => {
  cleanup();
});
