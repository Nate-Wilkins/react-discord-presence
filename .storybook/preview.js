import { withConsole } from '@storybook/addon-console';
import { withScreenshot } from 'storycap';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import '@storybook/addon-console';

export const decorators = [
  (storyFn, context) => withConsole()(storyFn)(context),
  mockDateDecorator,
  withScreenshot,
];

export const parameters = {
  mockingDate: new Date(1994, 4, 10),
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  screenshot: {
    fullPage: true,
    omitBackground: true,
    viewports: {
      large: {
        width: 1024,
        height: 1080,
      },
      small: {
        width: 430,
        height: 915,
      },
      xsmall: {
        width: 300,
        height: 600,
      },
    },
    waitAssets: true,
    delay: 15 * 1000,
  },
};
