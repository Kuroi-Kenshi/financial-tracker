import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration, DefinePlugin } from 'webpack';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, options) => {
    const paths = {
      src: path.resolve(__dirname, '..', 'src'),
    };
    config!.resolve!.alias = {
      ...config!.resolve!.alias,
      '@': paths.src,
    };

    config!.plugins!.push(
      //@ts-ignore
      new DefinePlugin({
        _IS_DEV_: JSON.stringify(true),
        _API_: JSON.stringify('http://localhost:3333/api'),
        // __PROJECT__: JSON.stringify('storybook'),
      })
    );
    return config;
  },
};
export default config;
