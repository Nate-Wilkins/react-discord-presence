// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cleanup, configure } = require('@testing-library/react');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchMock = require('fetch-mock');

configure({
  asyncUtilTimeout: 500,
  // https://github.com/testing-library/dom-testing-library/issues/552
  defaultHidden: true,
});

afterEach(() => {
  cleanup();
  fetchMock.reset();
});
