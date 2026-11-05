import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../*.mdx', '../src/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: ['../src/assets'],
};

export default config;
