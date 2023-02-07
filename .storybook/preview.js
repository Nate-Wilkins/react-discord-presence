import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { withScreenshot } from 'storycap';

import '@storybook/addon-console';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(withScreenshot);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  screenshot: {
    fullPage: true,
    // TODO: storybook theme: 'transparent' and ommitBackground: false
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
    delay: 200,
  },
};
