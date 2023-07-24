import { BrowserRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import React from 'react';
import { MantineProvider } from '../src/app/providers/MantineProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
