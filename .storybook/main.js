module.exports = {
  features: {
    postcss: true,
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-css-modules',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
    '@storybook/addon-postcss',
  ],
  webpackFinal: async config => {
    return config;
  },
};
